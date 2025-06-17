import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container px-4">
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-8 text-center">
              <h1 className="display-5 fw-bold mb-3">About FoodBridge</h1>
              <p className="lead mb-0">
                Bridging the gap between restaurants and NGOs to combat food wastage
                and feed those in need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-5">
        <div className="container px-4">
          <div className="row gx-5 align-items-center">
            <div className="col-lg-6">
              <h2 className="fw-bold mb-3">Our Mission</h2>
              <p className="lead mb-4">
                FoodBridge aims to minimize food wastage in urban areas by creating
                a seamless connection between food providers and distributors.
              </p>
              <p>
                In a world where over 1.3 billion tons of food is wasted annually while
                millions go hungry, we believe technology can bridge this gap. Our platform
                ensures that excess, untouched, and safe-to-eat food from restaurants
                reaches those who need it most, rather than ending up in landfills.
              </p>
              <p>
                By connecting restaurants with nearby NGOs and community kitchens through
                a user-friendly platform, we're building a more sustainable and compassionate
                food ecosystem in our cities.
              </p>
            </div>
            <div className="col-lg-6 mt-4 mt-lg-0">
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" 
                alt="People packaging food for donation" 
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-5 bg-light">
        <div className="container px-4">
          <div className="row gx-5 justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-3">The Problem We're Solving</h2>
              <p className="lead">
                Food wastage and hunger are two sides of the same coin that we aim to address.
              </p>
            </div>
          </div>
          <div className="row gx-5">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card h-100 border-0 shadow">
                <div className="card-body p-4">
                  <div className="feature bg-primary bg-gradient text-white rounded-circle mb-3 d-flex align-items-center justify-content-center" style={{ width: '4rem', height: '4rem' }}>
                    <i className="fas fa-trash fs-2"></i>
                  </div>
                  <h5 className="card-title mb-3">Food Wastage</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <i className="fas fa-check text-primary me-2"></i>
                      Restaurants discard large quantities of edible food daily
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-check text-primary me-2"></i>
                      End-of-day leftovers often go to waste due to lack of storage
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-check text-primary me-2"></i>
                      Food waste in landfills produces harmful greenhouse gases
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-check text-primary me-2"></i>
                      Resources used to produce wasted food are also wasted
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow">
                <div className="card-body p-4">
                  <div className="feature bg-primary bg-gradient text-white rounded-circle mb-3 d-flex align-items-center justify-content-center" style={{ width: '4rem', height: '4rem' }}>
                    <i className="fas fa-hands-helping fs-2"></i>
                  </div>
                  <h5 className="card-title mb-3">Our Solution</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <i className="fas fa-check text-primary me-2"></i>
                      Real-time platform connecting restaurants with nearby NGOs
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-check text-primary me-2"></i>
                      Location-based matching for efficient food redistribution
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-check text-primary me-2"></i>
                      Instant notifications for available donations
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-check text-primary me-2"></i>
                      Verified NGO partners to ensure food reaches those in need
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-5">
        <div className="container px-4">
          <div className="row gx-5 justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-3">How It Works</h2>
              <p className="lead">
                A simple process that creates meaningful impact
              </p>
            </div>
          </div>
          <div className="row gx-5">
            <div className="col-lg-4 mb-5 mb-lg-0">
              <div className="card h-100 border-0 shadow">
                <div className="card-body p-4 text-center">
                  <div className="feature bg-primary bg-gradient text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '4rem', height: '4rem' }}>
                    <i className="fas fa-utensils fs-2"></i>
                  </div>
                  <h5 className="card-title mb-3">For Restaurants</h5>
                  <ol className="text-start">
                    <li className="mb-2">Register your restaurant</li>
                    <li className="mb-2">List available food for donation</li>
                    <li className="mb-2">Set pickup window and details</li>
                    <li className="mb-2">Get matched with nearby NGOs</li>
                    <li className="mb-2">Confirm pickup and track impact</li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-5 mb-lg-0">
              <div className="card h-100 border-0 shadow">
                <div className="card-body p-4 text-center">
                  <div className="feature bg-primary bg-gradient text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '4rem', height: '4rem' }}>
                    <i className="fas fa-hands-helping fs-2"></i>
                  </div>
                  <h5 className="card-title mb-3">For NGOs</h5>
                  <ol className="text-start">
                    <li className="mb-2">Register and verify your organization</li>
                    <li className="mb-2">Set your service area radius</li>
                    <li className="mb-2">Receive notifications of nearby donations</li>
                    <li className="mb-2">Accept and schedule pickups</li>
                    <li className="mb-2">Distribute food to those in need</li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card h-100 border-0 shadow">
                <div className="card-body p-4 text-center">
                  <div className="feature bg-primary bg-gradient text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '4rem', height: '4rem' }}>
                    <i className="fas fa-chart-line fs-2"></i>
                  </div>
                  <h5 className="card-title mb-3">Tracking Impact</h5>
                  <ol className="text-start">
                    <li className="mb-2">Monitor donation history</li>
                    <li className="mb-2">Track meals saved from waste</li>
                    <li className="mb-2">Calculate environmental impact</li>
                    <li className="mb-2">View people helped through donations</li>
                    <li className="mb-2">Generate impact reports</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-5 bg-light">
        <div className="container px-4">
          <div className="row gx-5 justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-3">Our Impact</h2>
              <p className="lead">
                Together we're making a difference
              </p>
            </div>
          </div>
          <div className="row gx-5 text-center">
            <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
              <div className="display-1 fw-bold text-primary mb-2">2500+</div>
              <div className="h5 fw-bold">Meals Saved</div>
              <p className="text-muted">
                Every meal saved is one step closer to eliminating food waste
              </p>
            </div>
            <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
              <div className="display-1 fw-bold text-primary mb-2">50+</div>
              <div className="h5 fw-bold">Restaurant Partners</div>
              <p className="text-muted">
                Restaurants committed to social responsibility
              </p>
            </div>
            <div className="col-lg-3 col-md-6 mb-5 mb-md-0">
              <div className="display-1 fw-bold text-primary mb-2">30+</div>
              <div className="h5 fw-bold">NGO Partners</div>
              <p className="text-muted">
                Organizations dedicated to serving their communities
              </p>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="display-1 fw-bold text-primary mb-2">1.2</div>
              <div className="h5 fw-bold">Tons of CO₂ Saved</div>
              <p className="text-muted">
                Reducing food waste helps combat climate change
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-5">
        <div className="container px-4">
          <div className="row gx-5 justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-3">Our Team</h2>
              <p className="lead">
                Passionate individuals dedicated to reducing food waste and fighting hunger
              </p>
            </div>
          </div>
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-3 col-md-4 mb-4 text-center">
              <div className="team-member">
                <div className="team-member-img-wrapper">
                  <img 
                    src="https://ik.imagekit.io/fer380x7d/Adrish?updatedAt=1749674286740" 
                    alt="Adrish Das" 
                    className="rounded-circle mb-1 shadow-sm team-member-img"
                    style={{ 
                      width: '150px', 
                      height: '150px', 
                      objectFit: 'cover',
                      border: '3px solid #e9ecef',
                      transition: 'all 0.3s ease-in-out'
                    }}
                  />
                </div>
                <h5 className="mb-2 team-member-name">Adrish Das</h5>
                <div className="d-flex justify-content-center">
                  <a href="https://www.linkedin.com/in/adrish-das-83b494330/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm rounded-circle mx-1">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm rounded-circle mx-1">
                    <i className="fab fa-x-twitter"></i>
                  </a>
                  <a href="mailto:adrishd1512@gmail.com" className="btn btn-outline-primary btn-sm rounded-circle mx-1">
                    <i className="fas fa-envelope"></i>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-4 mb-4 text-center">
              <div className="team-member">
                <div className="team-member-img-wrapper">
                  <img 
                    src="https://ik.imagekit.io/probal/probal.jpg?updatedAt=1749223743993" 
                    alt="Probal Sen" 
                    className="rounded-circle mb-1 shadow-sm team-member-img"
                    style={{ 
                      width: '150px', 
                      height: '150px', 
                      objectFit: 'cover',
                      border: '3px solid #e9ecef',
                      transition: 'all 0.3s ease-in-out'
                    }}
                  />
                </div>
                <h5 className="mb-2 team-member-name">Probal Sen</h5>
                <div className="d-flex justify-content-center">
                  <a href="https://www.linkedin.com/in/probal-sen/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm rounded-circle mx-1">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm rounded-circle mx-1">
                    <i className="fab fa-x-twitter"></i>
                  </a>
                  <a href="mailto:9probalsen@gmail.com" className="btn btn-outline-primary btn-sm rounded-circle mx-1">
                    <i className="fas fa-envelope"></i>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-4 mb-4 text-center">
              <div className="team-member">
                <div className="team-member-img-wrapper">
                  <img 
                    src="https://ik.imagekit.io/probal/panja.jpg?updatedAt=1749224509352" 
                    alt="Suman Panja" 
                    className="rounded-circle mb-1 shadow-sm team-member-img"
                    style={{ 
                      width: '150px', 
                      height: '150px', 
                      objectFit: 'cover',
                      border: '3px solid #e9ecef',
                      transition: 'all 0.3s ease-in-out'
                    }}
                  />
                </div>
                <h5 className="mb-2 team-member-name">Suman Panja</h5>
                <div className="d-flex justify-content-center">
                  <a href="https://www.linkedin.com/in/suman-panja-934694314/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm rounded-circle mx-1">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="https://x.com/panjasuman2005" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm rounded-circle mx-1">
                    <i className="fab fa-x-twitter"></i>
                  </a>
                  <a href="mailto:sumanpanja2005@gmail.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm rounded-circle mx-1">
                    <i className="fas fa-envelope"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>
          {`
            .team-member {
              cursor: pointer;
              transition: all 0.3s ease-in-out;
              display: flex;
              flex-direction: column;
              align-items: center;
            }

            .team-member:hover .team-member-img-wrapper {
              transform: scale(1.05);
            }
            
            .team-member:hover .team-member-img img {
              border-color: var(--bs-primary) !important;
              box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
            }

            .team-member:hover .team-member-name {
              color: var(--bs-primary);
              transform: scale(1.05);
            }

            .team-member-img-wrapper {
              display: inline-block;
              padding: 4px;
              border-radius: 50%;
              transition: all 0.3s ease-in-out;
            }

            .team-member-name {
              transition: all 0.3s ease-in-out;
              display: block;
              text-align: center;
              margin-top: 0.5rem;
            }
          `}
        </style>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container px-4">
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-3">Join Our Mission</h2>
              <p className="lead mb-4">
                Whether you're a restaurant with excess food or an NGO serving those in need,
                join us in creating a world with zero food waste and zero hunger.
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

export default About; 