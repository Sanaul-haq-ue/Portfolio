
const SPREADSHEET_ID = "1BbHYA6UNb1xIhZfDyk2ym7dbcNZt4ysM184tCWCeKmc";
const SHEET_ID = 1813516910;
const OWNER_EMAIL = "saimhaque55@gmail.com";

function doPost(e) {
  const requestId = String(
    (e && e.parameter && e.parameter.requestId) || ""
  ).slice(0, 100);

  const mailStatus = {
    ownerNotificationSent: false,
    visitorReplySent: false
  };

  try {
    // This endpoint expects form-encoded data.
    if (!e || !e.parameter) {
      throw new Error("Missing form data");
    }

    const data = e.parameter;
    const email = String(data.email || "").trim();
    const subject = String(data.subject || "").trim();
    const description = String(data.description || "").trim();

    // Server-side validation.
    if (
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      throw new Error("Please provide a valid email address");
    }

    if (
      !subject ||
      subject.length > 200 ||
      subject.split(/\s+/).filter(Boolean).length > 100
    ) {
      throw new Error("Subject must be 1–200 characters");
    }

    if (
      !description ||
      description.length > 5000 ||
      description.split(/\s+/).filter(Boolean).length > 500
    ) {
      throw new Error("Description exceeds the allowed limit");
    }

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheets().find(
      item => item.getSheetId() === SHEET_ID
    );

    if (!sheet) {
      throw new Error("Target sheet tab was not found");
    }

    // Prevent spreadsheet formula injection in user-provided text.
    const safeCell = value =>
      /^[\s\u0000-\u0020]*[=+\-@]/.test(value)
        ? "'" + value
        : value;

    // Avoid overlapping writes from concurrent submissions.
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);

    try {
      if (sheet.getLastRow() === 0) {
        sheet.appendRow([
          "Submitted at",
          "Email",
          "Subject",
          "Project description"
        ]);
      }

      sheet.appendRow([
        new Date(),
        safeCell(email),
        safeCell(subject),
        safeCell(description)
      ]);
    } finally {
      lock.releaseLock();
    }

    // A successful sheet save is independent of email delivery.
    const safeSubject = subject.replace(/[\r\n]+/g, " ");

    try {
      MailApp.sendEmail({
        to: OWNER_EMAIL,
        subject: `New portfolio enquiry: ${safeSubject}`,
        replyTo: email,
        name: "Portfolio contact form",
        body:
          "A new enquiry was submitted through your portfolio.\n\n" +
          `From: ${email}\n` +
          `Subject: ${subject}\n\n` +
          `Project description:\n${description}`
      });

      mailStatus.ownerNotificationSent = true;
    } catch (error) {
      console.error("Owner email failed: " + error);
    }

    try {
      MailApp.sendEmail({
        to: email,
        subject: "Thanks for reaching out",
        replyTo: OWNER_EMAIL,
        name: "Sanaul Haque",
        body:
          "Hi there,\n\n" +
          `Thanks for reaching out about "${safeSubject}". ` +
          "I've received your message and appreciate you taking " +
          "the time to contact me. I'll review the details and " +
          "get back to you as soon as I can.\n\n" +
          "This is an automatic confirmation. Feel free to reply " +
          "if you'd like to add anything.\n\n" +
          "Best regards,\nSanaul Haque"
      });

      mailStatus.visitorReplySent = true;
    } catch (error) {
      console.error("Visitor confirmation failed: " + error);
    }

    return resultPage_(requestId, true, mailStatus);

  } catch (error) {
    console.error("Contact form failed: " + error);

    return resultPage_(requestId, false, mailStatus);
  }
}

function resultPage_(requestId, success, mailStatus) {
  const payload = JSON.stringify({
    type: "portfolio-contact-result",
    requestId: requestId,
    success: success,
    mailStatus: mailStatus || null
  }).replace(/</g, "\\u003c");

  const html =
    "<!doctype html><html><body><script>" +
    "window.top.postMessage(" + payload + ", '*');" +
    "</script></body></html>";

  return HtmlService.createHtmlOutput(html)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
