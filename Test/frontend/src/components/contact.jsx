import React from "react";
import "./styles/contact.css";

const ContactUsPage = () => {
  return (
    <div className="contact-us-page">
      <h1>Contact Us</h1>

      <section className="contact-info">
        <h2>Get in Touch</h2>
        <div className="contact-details">
          <p>
            <i className="fas fa-phone-alt"></i> +1-800-123-4567
          </p>
          <p>
            <i className="fas fa-envelope"></i> info@tourismcompany.com
          </p>
          <p>
            <i className="fas fa-map-marker-alt"></i> 123 Main Street, Anytown,
            USA
          </p>
        </div>
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0199900819334!2d-122.41941608468195!3d37.774929779759504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085818c3d32b2f9%3A0xb0cfe1c8e0cb6b0b!2s123%20Main%20St%2C%20San%20Francisco%2C%20CA%2094105%2C%20USA!5e0!3m2!1sen!2s!4v1616161616161!5m2!1sen!2s"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

      <section className="operating-hours">
        <h2>Operating Hours</h2>
        <p>Monday to Friday: 9:00 AM - 6:00 PM</p>
        <p>Saturday: 10:00 AM - 4:00 PM</p>
        <p>Sunday: Closed</p>
      </section>
      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <ul>
          <li>
            <a href="/faq#booking">How to make a booking?</a>
          </li>
          <li>
            <a href="/faq#cancellation">What is the cancellation policy?</a>
          </li>
          <li>
            <a href="/faq#payment">What payment methods are accepted?</a>
          </li>
        </ul>
      </section>

      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial">
          <p>"Amazing experience! Highly recommend their services."</p>
          <p>- John Doe</p>
        </div>
        <div className="testimonial">
          <p>
            "The best travel agency I've ever dealt with. Great support and
            seamless booking process."
          </p>
          <p>- Jane Smith</p>
        </div>
      </section>

      <section className="contact-form">
        <h2>Contact Form</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" name="phone" />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </section>

      <section className="social-media">
        <h2>Follow Us</h2>
        <div className="social-icons">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a
            href="https://reddit.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-reddit"></i>
          </a>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;
