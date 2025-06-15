import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white text-center py-5">
        <div className="container px-4">
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-8">
              <h1 className="display-5 fw-bold mb-3">FoodBridge</h1>
              <p className="lead mb-4">
                Every Meal Matters, Every Connection Counts
              </p>
              <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                <Link to="/register" className="btn btn-lg btn-light px-4 me-sm-3">Get Started</Link>
                <Link to="/about" className="btn btn-lg btn-outline-light px-4">Learn More</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-5">
        <div className="container px-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold">How It Works</h2>
            <p className="lead">Simple steps to reduce food waste and help those in need</p>
          </div>
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-4 mb-5 mb-lg-0">
              <div className="card h-100 shadow border-0">
                <div className="card-body p-4">
                  <div className="feature bg-primary bg-gradient text-white rounded-circle mb-3 d-flex align-items-center justify-content-center" style={{ width: '4rem', height: '4rem' }}>
                    <i className="fas fa-utensils fs-2"></i>
                  </div>
                  <h5 className="card-title mb-3">For Restaurants</h5>
                  <p className="card-text">
                    Register your restaurant, list excess food available for donation,
                    and get connected with nearby NGOs who can collect the food.
                  </p>
                </div>
                <div className="card-footer p-4 pt-0 bg-transparent border-top-0">
                  <div className="d-grid">
                    <Link to="/register" className="btn btn-primary">Register as Restaurant</Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4 mb-5 mb-lg-0">
              <div className="card h-100 shadow border-0">
                <div className="card-body p-4">
                  <div className="feature bg-primary bg-gradient text-white rounded-circle mb-3 d-flex align-items-center justify-content-center" style={{ width: '4rem', height: '4rem' }}>
                    <i className="fas fa-hands-helping fs-2"></i>
                  </div>
                  <h5 className="card-title mb-3">For NGOs</h5>
                  <p className="card-text">
                    Register your organization, set your service area, and receive
                    real-time notifications about food donations available nearby.
                  </p>
                </div>
                <div className="card-footer p-4 pt-0 bg-transparent border-top-0">
                  <div className="d-grid">
                    <Link to="/register" className="btn btn-primary">Register as NGO</Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="card h-100 shadow border-0">
                <div className="card-body p-4">
                  <div className="feature bg-primary bg-gradient text-white rounded-circle mb-3 d-flex align-items-center justify-content-center" style={{ width: '4rem', height: '4rem' }}>
                    <i className="fas fa-map-marked-alt fs-2"></i>
                  </div>
                  <h5 className="card-title mb-3">Location-Based Matching</h5>
                  <p className="card-text">
                    Our platform uses location data to match restaurants with nearby
                    NGOs, ensuring quick and efficient food redistribution.
                  </p>
                </div>
                <div className="card-footer p-4 pt-0 bg-transparent border-top-0">
                  <div className="d-grid">
                    <Link to="/about" className="btn btn-primary">Learn More</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-5 bg-light">
        <div className="container px-4">
          <div className="row gx-5 align-items-center justify-content-center">
            <div className="col-lg-8 col-xl-7 col-xxl-6">
              <div className="my-5">
                <h2 className="fw-bold mb-3">Our Impact</h2>
                <p className="lead mb-4">
                  Together we can make a difference in reducing food waste and
                  fighting hunger in our communities.
                </p>
                <div className="row mb-4">
                  <div className="col-md-4 text-center">
                    <div className="display-4 fw-bold text-primary">2500+</div>
                    <p className="text-muted">Meals Saved</p>
                  </div>
                  <div className="col-md-4 text-center">
                    <div className="display-4 fw-bold text-primary">50+</div>
                    <p className="text-muted">Restaurant Partners</p>
                  </div>
                  <div className="col-md-4 text-center">
                    <div className="display-4 fw-bold text-primary">30+</div>
                    <p className="text-muted">NGO Partners</p>
                  </div>
                </div>
                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                  <Link to="/register" className="btn btn-primary btn-lg px-4 me-sm-3">Join Now</Link>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
              <img className="img-fluid rounded-3 my-5" src="https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="People volunteering at a food bank" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-5">
        <div className="container px-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Testimonials</h2>
            <p className="lead">What our partners say about us</p>
          </div>
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-4 mb-4">
              <div className="card h-100 shadow">
                <div className="card-body p-4">
                  <div className="d-flex">
                    <div className="flex-shrink-0">
                      <i className="fas fa-quote-left text-primary fs-1"></i>
                    </div>
                    <div className="ms-4">
                      <p className="mb-1">FoodBridge has been a game-changer for our restaurant. We feel good knowing our excess food is helping people in need rather than going to waste.</p>
                      <div className="small text-muted">- John Smith, Restaurant Owner</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card h-100 shadow">
                <div className="card-body p-4">
                  <div className="d-flex">
                    <div className="flex-shrink-0">
                      <i className="fas fa-quote-left text-primary fs-1"></i>
                    </div>
                    <div className="ms-4">
                      <p className="mb-1">We've been able to serve 30% more meals to our community thanks to this platform. The process is simple and the restaurants are wonderful partners.</p>
                      <div className="small text-muted">- Sarah Johnson, NGO Coordinator</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card h-100 shadow">
                <div className="card-body p-4">
                  <div className="d-flex">
                    <div className="flex-shrink-0">
                      <i className="fas fa-quote-left text-primary fs-1"></i>
                    </div>
                    <div className="ms-4">
                      <p className="mb-1">The real-time notifications and location-based matching make food redistribution efficient and effective. A truly innovative solution.</p>
                      <div className="small text-muted">- Michael Chen, Food Bank Director</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container px-4">
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold">Ready to Make a Difference?</h2>
              <p className="lead mb-4">
                Join our growing community of restaurants and NGOs working together to reduce food waste
                and fight hunger. Registration is quick and free.
              </p>
              <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                <Link to="/register" className="btn btn-lg btn-light px-4 me-sm-3">Register Now</Link>
                <Link to="/contact" className="btn btn-lg btn-outline-light px-4">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 