import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [content, setContent] = useState(null);
  const [formData, setFormData] = useState({ name: "", contact: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const ICONS = {
    Phone: "📞",
    Email: "✉️",
    Address: "📍",
  };

  // Fetch landing page text/content
  useEffect(() => {
    axios.get("http://localhost:3001/api/content")
      .then(res => setContent(res.data))
      .catch(() => setErrorMsg("Failed to load content."));
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      await axios.post("http://localhost:3001/api/contact", formData);
      setSubmitted(true);
      setFormData({ name: "", contact: "", email: "" });
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  if (!content) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="body-bg">
      {/* Header */}
      <header className="header">
        <div className="brand">Acme Co</div>
        <nav className="menu">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
          <button className="menu-btn">Get Started</button>
        </nav>
      </header>

      <main className="main-container">
        {/* Connect with Us */}
        <section className="connect-section">
          <img
            src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80"
            alt="Team Support"
            className="connect-img"
          />
          <div className="connect-overlay">
            <h1 className="big-title">{content.connect_title}</h1>
            <p className="subtitle">{content.connect_desc}</p>
          </div>
        </section>

        {/* How to Reach Us */}
        <section className="reach-section">
          <h2 className="section-title">{content.reach_title}</h2>
          <p className="section-desc">{content.reach_desc}</p>
          <div className="reach-cards">
            {content.reach_options.map(opt => (
              <div key={opt.label} className="reach-card updated-reach-card">
                <div className="reach-icon">{ICONS[opt.label] || "❔"}</div>
                <div className="reach-label">{opt.label}</div>
                <div className="reach-desc reach-desc-blue">{opt.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="form-section">
  <p className="form-desc">
    Interested in learning more? Fill out the form below to request a demo or ask about our services.
  </p>
  <form onSubmit={handleSubmit} className="the-form">
    <div className="form-group">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="form-input"
      />
    </div>

    <div className="form-group">
      <label htmlFor="contact">Contact Number</label>
      <input
        type="text"
        id="contact"
        name="contact"
        placeholder="Your Contact Number"
        value={formData.contact}
        onChange={handleChange}
        required
        className="form-input"
      />
    </div>

    <div className="form-group">
      <label htmlFor="email">Email Address</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Your Email Address"
        value={formData.email}
        onChange={handleChange}
        required
        className="form-input"
      />
    </div>

    <button type="submit" className="form-btn">Submit</button>
  </form>

  {submitted && <div className="form-success">Thanks! We’ll be in touch soon.</div>}
  {errorMsg && <div className="form-error">{errorMsg}</div>}
</section>


        {/* Static Map */}
        <div className="map-section">
          <img
            src="https://maps.wikimedia.org/img/osm-intl,12,37.7749,-122.4194,800x260.png"
            alt="San Francisco Map"
            className="map-img"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div>Privacy Policy</div>
        <div>©2024 Acme Co. All rights reserved.</div>
        <div>Terms of Service</div>
      </footer>
    </div>
  );
}

export default App;
