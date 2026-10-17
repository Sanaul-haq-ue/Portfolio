import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import SocialDock from "../components/SocialDock";

import illustration from "../assets/images/illustration.jpg";

export default function ContactMe() {
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const noticeTimer = useRef(null);
  const submissionTimer = useRef(null);
  const pendingRequestId = useRef(null);

  useEffect(() => {
    function handleSheetResponse(event) {
      let messageHost = "";
      try {
        messageHost = new URL(event.origin).hostname;
      } catch {
        return;
      }
      if (messageHost !== "script.google.com" && !messageHost.endsWith(".googleusercontent.com")) return;

      const result = event.data;
      if (result?.type !== "portfolio-contact-result" || result.requestId !== pendingRequestId.current) return;

      window.clearTimeout(submissionTimer.current);
      pendingRequestId.current = null;
      setIsSubmitting(false);

      if (!result.success) {
        setNotice({ type: "error", text: "We couldn’t save your enquiry to the spreadsheet. Please try again." });
        return;
      }

      document.getElementById("contactForm")?.reset();
      setErrors({});
      const emailsSent = result.mailStatus?.ownerNotificationSent && result.mailStatus?.visitorReplySent;
      setNotice({
        type: "success",
        text: emailsSent
          ? "Thanks! Your enquiry is saved, and confirmation emails have been sent."
          : "Your enquiry is saved, but one or more email notifications could not be sent.",
      });
      window.clearTimeout(noticeTimer.current);
      noticeTimer.current = window.setTimeout(() => setNotice(null), 5000);
    }

    window.addEventListener("message", handleSheetResponse);
    return () => {
      window.removeEventListener("message", handleSheetResponse);
      window.clearTimeout(noticeTimer.current);
      window.clearTimeout(submissionTimer.current);
    };
  }, []);

  function validateForm(formData) {
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const countWords = value => value.split(/\s+/).filter(Boolean).length;
    const nextErrors = {};

    if (!email) nextErrors.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Enter a valid email address.";

    if (!subject) nextErrors.subject = "Please enter a subject.";
    else if (countWords(subject) > 100) nextErrors.subject = "Subject must be 100 words or fewer.";

    if (!description) nextErrors.description = "Please describe your project.";
    else if (countWords(description) > 500) nextErrors.description = "Description must be 500 words or fewer.";

    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setNotice(null);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const nextErrors = validateForm(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const endpoint = import.meta.env.VITE_GOOGLE_SHEETS_WEB_APP_URL;
    if (!endpoint) {
      setNotice({ type: "error", text: "Your form is valid, but spreadsheet saving is not connected yet." });
      return;
    }

    const requestId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    pendingRequestId.current = requestId;
    form.elements.requestId.value = requestId;
    form.action = endpoint;
    form.target = "contactSheetFrame";
    setIsSubmitting(true);
    form.submit();
    window.clearTimeout(submissionTimer.current);
    submissionTimer.current = window.setTimeout(() => {
      if (pendingRequestId.current !== requestId) return;
      pendingRequestId.current = null;
      setIsSubmitting(false);
      setNotice({ type: "error", text: "No confirmation came back from Google Sheets. Check that the latest Apps Script version is deployed with access set to Anyone, then try again." });
    }, 20000);
  }

  return (
    <>
      <main className="contact-screen">
        <section className="contact-visual" aria-label="Sanaul profile">
          <a className="contact-logo" href="/" aria-label="Back to Sanaul portfolio">Sanaul</a>
          <div className="contact-visual__image-wrap">
            <img src={illustration}
              alt="Creative workspace illustration" />
          </div>
          <div className="contact-visual__caption">
            <p className="contact-kicker">Let&apos;s make something useful</p>
            <h1>Good ideas deserve<br /><em>good execution.</em></h1>
            <p className="contact-location"><i className="fa-solid fa-location-dot"></i> Dhaka, Bangladesh</p>
          </div>
        </section>

        <section className="contact-form-panel" aria-labelledby="contactPageTitle">
          <NavLink className="contact-back" to="/"><i className="fa-solid fa-arrow-left"></i> Back to portfolio</NavLink>
          <div className="contact-form-content">
            {notice && <p className={`contact-form-notice is-${notice.type}`} role={notice.type === "error" ? "alert" : "status"}>{notice.text}</p>}
            <p className="contact-kicker">Start a conversation</p>
            <h2 id="contactPageTitle">Tell me about<br /><em>your project.</em></h2>
            <p className="contact-intro">Share a few details and I&apos;ll get back to you at the earliest opportunity.</p>
            <form className="contact-form" id="contactForm" method="post" noValidate onSubmit={handleSubmit}>
              <input type="hidden" name="requestId" value="" readOnly />
              <div className="contact-field-row">
                <label className="contact-field">
                  <span>Your email</span>
                  <input type="email" name="email" autoComplete="email" placeholder="you@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contactEmailError" : undefined} />
                  {errors.email && <span className="contact-field-error" id="contactEmailError">{errors.email}</span>}
                </label>
                <label className="contact-field">
                  <span>Subject</span>
                  <input type="text" name="subject" placeholder="Project enquiry" aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "contactSubjectError" : undefined} />
                  {errors.subject && <span className="contact-field-error" id="contactSubjectError">{errors.subject}</span>}
                </label>
              </div>
              <label className="contact-field">
                <span>Project description</span>
                <textarea name="description" rows="4" placeholder="What are you looking to build?" aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? "contactDescriptionError" : undefined}></textarea>
                {errors.description && <span className="contact-field-error" id="contactDescriptionError">{errors.description}</span>}
              </label>
              <button className="contact-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending…" : "Send enquiry"} <i className="fa-solid fa-arrow-up-right-from-square"></i></button>
            </form>
          </div>
          {/* <a className="contact-email" href="mailto:saimhaque55@gmail.com">saimhaque55@gmail.com <i className="fa-solid fa-arrow-up-right-from-square"></i></a> */}
        </section>
      </main>
      <iframe className="contact-submit-frame" name="contactSheetFrame" title="Contact form submission" aria-hidden="true" tabIndex="-1" />
      <SocialDock />
    </>
  )
}
