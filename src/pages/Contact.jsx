import React, { useState } from 'react';
import { contactService } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactService.sendContact({
        name: formData.name,
        email: formData.email,
        message: formData.message
      });
      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      // Optionally handle error
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  // FAQ data
  const faqs = [
    {
      question: "How does FoodBridge Connect work?",
      answer: "Our platform connects restaurants with excess food to nearby NGOs who can distribute it to those in need. Restaurants list available food donations, and NGOs can browse and request pickups based on their location and capacity."
    },
    {
      question: "Is there a cost to use the platform?",
      answer: "No, FoodBridge Connect is completely free for both restaurants and NGOs. Our mission is to reduce food waste and fight hunger, so we've made our platform accessible to all."
    },
    {
      question: "What types of food can be donated?",
      answer: "Restaurants can donate any excess food that is still safe for consumption. This includes prepared meals, ingredients, bakery items, and more. All food must meet safety guidelines provided on our platform."
    },
    {
      question: "How is food safety ensured?",
      answer: "We provide guidelines for food safety and require restaurants to verify that donated food meets these standards. NGOs are also trained to check the quality of food before accepting donations. Our platform tracks food from donation to distribution."
    },
    {
      question: "Can individuals donate or receive food?",
      answer: "Currently, our platform focuses on connecting restaurants with NGOs. However, individuals can volunteer with our partner NGOs to help with food distribution efforts."
    }
  ];

  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-md-8 mx-auto text-center">
          <h2 className="fw-bold mb-3">Contact Us</h2>
          <p className="lead">
            Have questions about FoodBridge Connect? We're here to help! Reach out to our team through the form below.
          </p>
        </div>
      </div>
      
      <div className="row">
        {/* Contact Form */}
        <div className="col-lg-7 mb-5 mb-lg-0">
          <div className="card border-0 shadow">
            <div className="card-body p-5">
              {formSubmitted ? (
                <div className="text-center py-5">
                  <div className="bg-success text-white rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                    <i className="fas fa-check fa-3x"></i>
                  </div>
                  <h4 className="mb-3">Thank You!</h4>
                  <p className="mb-4">
                    Your message has been received. We'll get back to you as soon as possible.
                  </p>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => setFormSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <select 
                      className="form-select" 
                      id="subject" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Partnership Opportunities">Partnership Opportunities</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea 
                      className="form-control" 
                      id="message" 
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  
                  <div className="d-grid">
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="col-lg-5">
          <div className="card border-0 shadow mb-4">
            <div className="card-body p-4">
              <h5 className="card-title fw-bold mb-3">Contact Information</h5>
              <ul className="list-unstyled mb-0">
                <li className="d-flex mb-3">
                  <div className="bg-primary rounded-circle text-white p-2 me-3">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h6 className="mb-1">Location</h6>
                    <p className="mb-0">123 City, EC 12345</p>
                  </div>
                </li>
                <li className="d-flex mb-3">
                  <div className="bg-primary rounded-circle text-white p-2 me-3">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h6 className="mb-1">Email</h6>
                    <p className="mb-0">
                      <a href="mailto:info@FoodBridge.org" className="text-decoration-none">
                        info@foodbridge.org
                      </a>
                    </p>
                  </div>
                </li>
                <li className="d-flex mb-3">
                  <div className="bg-primary rounded-circle text-white p-2 me-3">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h6 className="mb-1">Phone</h6>
                    <p className="mb-0">
                      <a href="+91 (123) 456-7890" className="text-decoration-none">
                        +91 (123) 456-7890
                      </a>
                    </p>
                  </div>
                </li>
                <li className="d-flex">
                  <div className="bg-primary rounded-circle text-white p-2 me-3">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div>
                    <h6 className="mb-1">Office Hours</h6>
                    <p className="mb-0">Monday - Friday: 9AM - 5PM</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="card border-0 shadow">
            <div className="card-body p-4">
              <h5 className="card-title fw-bold mb-3">Follow Us</h5>
              <div className="d-flex">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary rounded-circle me-2">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary rounded-circle me-2">
                  <i className="fab fa-x-twitter"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary rounded-circle me-2">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary rounded-circle">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="row mt-5">
        <div className="col-12">
          <h3 className="fw-bold mb-4 text-center">Frequently Asked Questions</h3>
          <div className="accordion" id="faqAccordion">
            {faqs.map((faq, index) => (
              <div className="accordion-item border mb-3 shadow-sm" key={index}>
                <h2 className="accordion-header" id={`heading${index}`}>
                  <button 
                    className="accordion-button collapsed" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target={`#collapse${index}`} 
                    aria-expanded="false" 
                    aria-controls={`collapse${index}`}
                  >
                    {faq.question}
                  </button>
                </h2>
                <div 
                  id={`collapse${index}`} 
                  className="accordion-collapse collapse" 
                  aria-labelledby={`heading${index}`} 
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 