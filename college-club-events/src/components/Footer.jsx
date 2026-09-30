import React from "react";
import { Link } from "react-router-dom";
import { Terminal, Heart, Mail, MapPin, Globe } from "lucide-react";

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-col brand-col">
          <div className="navbar-brand">
            <div className="brand-logo-icon">
              <Terminal size={20} />
            </div>
            <div className="brand-text">
              <span className="brand-name">TechNova</span>
              <span className="brand-tag">TECH CLUB</span>
            </div>
          </div>
          <p className="footer-desc">
            Empowering students to build, create, and connect through workshops,
            hackathons, technical seminars, and innovation projects.
          </p>
          <div className="footer-socials">
            {/* GitHub SVG */}
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            {/* Twitter / X SVG */}
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            {/* LinkedIn SVG */}
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            {/* Campus Web Link */}
            <a href="https://technovaclub.edu" target="_blank" rel="noreferrer" aria-label="Campus Portal" className="social-icon" title="Official Web Portal">
              <Globe size={18} />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">Navigation</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/events">All Events</Link></li>
            <li><Link to="/admin">Admin Dashboard</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">Club Domains</h4>
          <ul className="footer-links">
            <li><span>Full-Stack Web & Cloud</span></li>
            <li><span>AI & Machine Learning</span></li>
            <li><span>Competitive Programming</span></li>
            <li><span>Robotics & Embedded IoT</span></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">Contact & Campus</h4>
          <ul className="footer-links contact-info">
            <li>
              <MapPin size={16} className="text-secondary" />
              <span>Student Activity Center, Room 402, Main Campus</span>
            </li>
            <li>
              <Mail size={16} className="text-secondary" />
              <span>contact@technovaclub.edu</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; {CURRENT_YEAR} TechNova College Tech Club. All rights reserved.</p>
          <p className="footer-made-with">
            Built with <Heart size={14} className="heart-icon" /> for student builders
          </p>
        </div>
      </div>
    </footer>
  );
}
