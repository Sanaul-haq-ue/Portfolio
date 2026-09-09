import { NavLink } from "react-router-dom";

import illustration from "../assets/images/illustration.jpg";

export default function ContactMe() {
  return (
    <main className="contact-screen">
      <section className="contact-visual" aria-label="Sanaul profile">
        <a className="contact-logo" href="index.html" aria-label="Back to Sanaul portfolio">Sanaul</a>
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
          <p className="contact-kicker">Start a conversation</p>
          <h2 id="contactPageTitle">Tell me about<br /><em>your project.</em></h2>
          <p className="contact-intro">Share a few details and I&apos;ll get back to you at the earliest opportunity.</p>
          <form className="contact-form" id="contactForm">
            <div className="contact-field-row">
              <label className="contact-field">
                <span>Your email</span>
                <input type="email" name="email" autocomplete="email" placeholder="you@example.com" required />
              </label>
              <label className="contact-field">
                <span>Subject</span>
                <input type="text" name="subject" placeholder="Project enquiry" required />
              </label>
            </div>
            <label className="contact-field">
              <span>Project description</span>
              <textarea name="description" rows="4" placeholder="What are you looking to build?" required></textarea>
            </label>
            <button className="contact-submit" type="submit">Send enquiry <i className="fa-solid fa-arrow-up-right-from-square"></i></button>
          </form>
        </div>
        <a className="contact-email" href="mailto:saimhaque55@gmail.com">saimhaque55@gmail.com <i className="fa-solid fa-arrow-up-right-from-square"></i></a>
      </section>
    </main>
  )
}
