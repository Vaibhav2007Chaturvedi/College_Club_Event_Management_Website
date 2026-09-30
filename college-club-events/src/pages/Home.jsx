import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  Clock, 
  MapPin, 
  Code2, 
  Cpu, 
  Users, 
  Trophy, 
  Compass, 
  Zap,
  CheckCircle2
} from "lucide-react";
import { getEvents } from "../data/storage";
import EventCard from "../components/EventCard";
import { formatEventDate, getCategoryBadgeClass } from "../utils/formatters";

export default function Home() {
  const [events, setEvents] = useState(() => getEvents());

  useEffect(() => {
    const handleUpdate = () => setEvents(getEvents());
    window.addEventListener("events_changed", handleUpdate);
    return () => window.removeEventListener("events_changed", handleUpdate);
  }, []);

  // Find featured event (or fall back to first event)
  const featuredEvent = events.find((e) => e.featured) || events[0];
  // Upcoming events (e.g. up to 3 events)
  const upcomingEvents = events.slice(0, 3);

  return (
    <div className="home-page fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-glow-blob top-left"></div>
        <div className="hero-glow-blob bottom-right"></div>
        <div className="container hero-container">
          <div className="hero-badge">
            <Zap size={14} className="hero-badge-icon" />
            <span>Official College Technology & Innovation Club</span>
          </div>

          <h1 className="hero-title">
            BUILD. CREATE. <span className="text-gradient">CONNECT.</span>
          </h1>

          <p className="hero-subtitle">
            Discover events, workshops, competitions and opportunities to learn,
            collaborate and grow.
          </p>

          <div className="hero-actions">
            <Link to="/events" className="btn btn-primary btn-lg">
              <span>Explore Events</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/admin" className="btn btn-secondary btn-lg">
              <span>Admin Portal</span>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="hero-metrics">
            <div className="metric-item">
              <span className="metric-number">500+</span>
              <span className="metric-label">Active Members</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-number">{events.length}+</span>
              <span className="metric-label">Live Events</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-number">100%</span>
              <span className="metric-label">Student Driven</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-number">4.9 / 5</span>
              <span className="metric-label">Attendee Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Short Club Introduction */}
      <section className="section intro-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">WHO WE ARE</span>
            <h2 className="section-title">Fueling Campus Innovation & Engineering</h2>
            <p className="section-description">
              TechNova Club is the premier student-led technical community on campus.
              We bridge the gap between academic theory and real-world tech industry practices
              through immersive programs.
            </p>
          </div>

          <div className="intro-grid">
            <div className="intro-card">
              <div className="intro-icon-wrapper icon-code">
                <Code2 size={24} />
              </div>
              <h3 className="intro-card-title">Technical Workshops</h3>
              <p className="intro-card-desc">
                Intensive hands-on labs covering Full-Stack Web, Artificial Intelligence, Mobile App dev, and Cloud Architecture.
              </p>
            </div>

            <div className="intro-card">
              <div className="intro-icon-wrapper icon-trophy">
                <Trophy size={24} />
              </div>
              <h3 className="intro-card-title">Hackathons & Duels</h3>
              <p className="intro-card-desc">
                Competitive algorithmic challenges and overnight hackathons with prizes, mentorship, and certificates.
              </p>
            </div>

            <div className="intro-card">
              <div className="intro-icon-wrapper icon-cpu">
                <Cpu size={24} />
              </div>
              <h3 className="intro-card-title">Founders & Keynotes</h3>
              <p className="intro-card-desc">
                Exclusive sessions with startup founders, tech leads, and campus alumni breaking boundaries in industry.
              </p>
            </div>

            <div className="intro-card">
              <div className="intro-icon-wrapper icon-users">
                <Users size={24} />
              </div>
              <h3 className="intro-card-title">Open Collaboration</h3>
              <p className="intro-card-desc">
                A warm, inclusive space for peer-to-peer learning, open source contribution, and cross-discipline teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Event Section */}
      {featuredEvent && (
        <section className="section featured-section">
          <div className="container">
            <div className="section-header">
              <div className="featured-badge-pill">
                <Sparkles size={14} />
                <span>SPOTLIGHT HIGHLIGHT</span>
              </div>
              <h2 className="section-title">Featured Event of the Month</h2>
              <p className="section-description">
                Don't miss our premier showcase event with limited seats and special guest mentors.
              </p>
            </div>

            <div className="featured-hero-card">
              <div className="featured-content">
                <div className="featured-top-meta">
                  <span className={`badge ${getCategoryBadgeClass(featuredEvent.category)}`}>
                    {featuredEvent.category}
                  </span>
                  <span className="badge badge-featured">
                    <Sparkles size={12} /> Featured Showcase
                  </span>
                </div>

                <h3 className="featured-title">{featuredEvent.name}</h3>

                <p className="featured-desc">{featuredEvent.description}</p>

                <div className="featured-details-grid">
                  <div className="featured-detail">
                    <Calendar size={18} className="text-primary" />
                    <div>
                      <span className="detail-label">Date</span>
                      <strong className="detail-value">{formatEventDate(featuredEvent.date)}</strong>
                    </div>
                  </div>

                  <div className="featured-detail">
                    <Clock size={18} className="text-primary" />
                    <div>
                      <span className="detail-label">Time</span>
                      <strong className="detail-value">{featuredEvent.time}</strong>
                    </div>
                  </div>

                  <div className="featured-detail">
                    <MapPin size={18} className="text-primary" />
                    <div>
                      <span className="detail-label">Venue</span>
                      <strong className="detail-value">{featuredEvent.venue}</strong>
                    </div>
                  </div>
                </div>

                <div className="featured-actions">
                  <Link to={`/register/${featuredEvent.id}`} className="btn btn-primary btn-lg">
                    <CheckCircle2 size={18} />
                    <span>Register For This Event</span>
                  </Link>
                  <Link to="/events" className="btn btn-secondary btn-lg">
                    <span>View All Events</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events Section */}
      <section className="section upcoming-section">
        <div className="container">
          <div className="section-header-flex">
            <div>
              <span className="section-subtitle">DON'T MISS OUT</span>
              <h2 className="section-title">Upcoming Club Events</h2>
            </div>
            <Link to="/events" className="btn btn-secondary">
              <span>View All Events</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="events-grid">
            {upcomingEvents.map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>
        </div>
      </section>

      {/* Community CTA Banner */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-content">
              <h3 className="cta-title">Ready to level up your campus journey?</h3>
              <p className="cta-desc">
                Register for an upcoming workshop or join our community discussions to build exciting projects with peers.
              </p>
            </div>
            <div className="cta-buttons">
              <Link to="/events" className="btn btn-primary btn-lg">
                <Compass size={18} />
                <span>Browse All Events</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
