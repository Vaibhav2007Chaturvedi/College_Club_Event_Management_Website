import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Terminal, Calendar, ShieldCheck, Menu, X, Sparkles } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <div className="brand-logo-icon">
            <Terminal size={22} className="text-primary-accent" />
          </div>
          <div className="brand-text">
            <span className="brand-name">TechNova</span>
            <span className="brand-tag">TECH CLUB</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar-nav desktop-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Events
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <ShieldCheck size={16} />
            Admin
          </NavLink>
        </nav>

        <div className="navbar-actions desktop-nav">
          <Link to="/events" className="btn btn-primary btn-sm">
            <Sparkles size={16} />
            Explore Events
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMenu}>
          <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-links">
              <NavLink
                to="/"
                end
                className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
                onClick={closeMenu}
              >
                Home
              </NavLink>
              <NavLink
                to="/events"
                className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
                onClick={closeMenu}
              >
                <Calendar size={18} />
                Events
              </NavLink>
              <NavLink
                to="/admin"
                className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
                onClick={closeMenu}
              >
                <ShieldCheck size={18} />
                Admin Dashboard
              </NavLink>
              <div className="mobile-menu-cta">
                <Link to="/events" className="btn btn-primary" onClick={closeMenu} style={{ width: "100%" }}>
                  <Sparkles size={16} />
                  Explore All Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
