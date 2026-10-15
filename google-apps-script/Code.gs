const SPREADSHEET_ID = "1W_iGkvD6jcY-yQT5-14vYBajspqm2pWd";
const SHEET_ID = 1813516910;

function doPost(e) {
  const requestId = String(e && e.parameter && e.parameter.requestId || "");
  try {
    const data = e.parameter || {};
    const email = String(data.email || "").trim();
    const subject = String(data.subject || "").trim();
    const description = String(data.description || "").trim();
    const wordCount = value => value.split(/\s+/).filter(Boolean).length;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Invalid email");
    if (!subject || wordCount(subject) > 100) throw new Error("Invalid subject");
    if (!description || wordCount(description) > 500) throw new Error("Invalid description");

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheets().find(item => item.getSheetId() === SHEET_ID);
    if (!sheet) throw new Error("Target sheet tab was not found");

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Submitted at", "Email", "Subject", "Project description"]);
    }
    sheet.appendRow([new Date(), email, subject, description]);

    return resultPage_(requestId, true);
  } catch (error) {
    console.error(error);
    return resultPage_(requestId, false);
  }
}

function resultPage_(requestId, success) {
  const payload = JSON.stringify({
    type: "portfolio-contact-result",
    requestId: requestId,
    success: success
  }).replace(/</g, "\\u003c");
  const html = "<!doctype html><html><body><script>window.top.postMessage(" + payload + ", '*');</script></body></html>";
  return HtmlService.createHtmlOutput(html)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
