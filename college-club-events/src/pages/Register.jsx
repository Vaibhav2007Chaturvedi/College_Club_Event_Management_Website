import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  User, 
  Mail, 
  GraduationCap, 
  Phone,
  Sparkles,
  Ticket
} from "lucide-react";
import { getEvents, addRegistration } from "../data/storage";
import { formatEventDate, getCategoryBadgeClass } from "../utils/formatters";

export default function Register() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [events] = useState(() => getEvents());
  const [selectedEventId, setSelectedEventId] = useState(() => eventId || (getEvents()[0]?.id || ""));

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    collegeYear: "",
    phone: ""
  });
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedRegistration, setConfirmedRegistration] = useState(null);

  const selectedEvent = events.find((e) => e.id === selectedEventId) || events[0];

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) {
      errs.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address (e.g. name@college.edu)";
    }

    if (!formData.collegeYear.trim()) {
      errs.collegeYear = "College & Year is required (e.g. ABC College - 3rd Year)";
    }

    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required";
    } else {
      const cleanPhone = formData.phone.replace(/[\s\-()+]/g, "");
      if (cleanPhone.length < 10) {
        errs.phone = "Please enter a valid phone number (at least 10 digits)";
      }
    }

    if (!selectedEvent) {
      errs.event = "Please select an event to register for";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newReg = addRegistration({
      eventId: selectedEvent.id,
      eventName: selectedEvent.name,
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      collegeYear: formData.collegeYear.trim(),
      phone: formData.phone.trim()
    });

    setConfirmedRegistration(newReg);
    setIsSuccess(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetForAnother = () => {
    setFormData({
      fullName: "",
      email: "",
      collegeYear: "",
      phone: ""
    });
    setErrors({});
    setIsSuccess(false);
    setConfirmedRegistration(null);
  };

  return (
    <div className="register-page container fade-in">
      <div className="register-nav-back">
        <Link to="/events" className="btn btn-secondary btn-sm">
          <ArrowLeft size={16} />
          <span>Back to All Events</span>
        </Link>
      </div>

      {isSuccess && confirmedRegistration ? (
        /* Success Screen */
        <div className="card registration-success-card fade-in">
          <div className="success-icon-badge">
            <CheckCircle2 size={48} className="text-success" />
          </div>

          <h2 className="success-heading">Registration successful!</h2>
          <p className="success-subheading">
            Registration successful! We look forward to seeing you at the event.
          </p>

          <div className="confirmation-ticket">
            <div className="ticket-header">
              <div className="ticket-brand">
                <Ticket size={18} className="text-primary" />
                <span>OFFICIAL ADMISSION PASS</span>
              </div>
              <span className="ticket-id">#{confirmedRegistration.id.toUpperCase()}</span>
            </div>

            <div className="ticket-body">
              <h3 className="ticket-event-title">{confirmedRegistration.eventName}</h3>
              
              <div className="ticket-grid">
                <div>
                  <span className="ticket-label">Attendee Name</span>
                  <p className="ticket-val">{confirmedRegistration.fullName}</p>
                </div>
                <div>
                  <span className="ticket-label">Registered Email</span>
                  <p className="ticket-val">{confirmedRegistration.email}</p>
                </div>
                <div>
                  <span className="ticket-label">College & Year</span>
                  <p className="ticket-val">{confirmedRegistration.collegeYear}</p>
                </div>
                <div>
                  <span className="ticket-label">Contact Phone</span>
                  <p className="ticket-val">{confirmedRegistration.phone}</p>
                </div>
              </div>

              {selectedEvent && (
                <div className="ticket-meta-footer">
                  <div className="ticket-meta-item">
                    <Calendar size={14} />
                    <span>{formatEventDate(selectedEvent.date)}</span>
                  </div>
                  <div className="ticket-meta-item">
                    <Clock size={14} />
                    <span>{selectedEvent.time}</span>
                  </div>
                  <div className="ticket-meta-item">
                    <MapPin size={14} />
                    <span>{selectedEvent.venue}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="success-actions">
            <button onClick={handleResetForAnother} className="btn btn-secondary">
              Register Another Person
            </button>
            <Link to="/events" className="btn btn-primary">
              <Sparkles size={16} />
              <span>Explore More Events</span>
            </Link>
            <Link to="/admin" className="btn btn-secondary">
              <span>View in Admin Dashboard</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Registration Form & Event Details */
        <div className="registration-wrapper">
          {/* Selected Event Details Header Card */}
          {selectedEvent ? (
            <div className="card selected-event-banner">
              <div className="banner-top">
                <div className="banner-badges">
                  <span className={`badge ${getCategoryBadgeClass(selectedEvent.category)}`}>
                    {selectedEvent.category}
                  </span>
                  {selectedEvent.featured && (
                    <span className="badge badge-featured">
                      <Sparkles size={12} /> Featured Event
                    </span>
                  )}
                </div>

                {events.length > 1 && (
                  <div className="event-switch-dropdown">
                    <label htmlFor="event-switch" className="sr-only">Switch Event:</label>
                    <select
                      id="event-switch"
                      className="form-select form-select-sm"
                      value={selectedEvent.id}
                      onChange={(e) => {
                        setSelectedEventId(e.target.value);
                        navigate(`/register/${e.target.value}`);
                      }}
                    >
                      {events.map((ev) => (
                        <option key={ev.id} value={ev.id}>
                          Switch to: {ev.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <h1 className="banner-event-title">{selectedEvent.name}</h1>
              <p className="banner-event-desc">{selectedEvent.description}</p>

              <div className="banner-event-meta">
                <div className="banner-meta-item">
                  <Calendar size={16} className="text-primary" />
                  <span>{formatEventDate(selectedEvent.date)}</span>
                </div>
                <div className="banner-meta-item">
                  <Clock size={16} className="text-primary" />
                  <span>{selectedEvent.time}</span>
                </div>
                <div className="banner-meta-item">
                  <MapPin size={16} className="text-primary" />
                  <span>{selectedEvent.venue}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="alert alert-danger">
              <AlertCircle size={18} />
              <span>No events are currently scheduled. Please check back later.</span>
            </div>
          )}

          {/* Registration Form Card */}
          <div className="card registration-form-card">
            <div className="form-card-header">
              <h2 className="form-card-title">Attendee Registration</h2>
              <p className="form-card-subtitle">
                Please enter your information to reserve a seat. Registration is free for all college students.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label className="form-label" htmlFor="fullName">
                  <span className="flex-inline-icon">
                    <User size={15} /> Full Name <span className="required">*</span>
                  </span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  className={`form-input ${errors.fullName ? "error" : ""}`}
                  placeholder="e.g. John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && (
                  <span className="form-error">{errors.fullName}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  <span className="flex-inline-icon">
                    <Mail size={15} /> Student Email <span className="required">*</span>
                  </span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className={`form-input ${errors.email ? "error" : ""}`}
                  placeholder="e.g. john.doe@college.edu"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <span className="form-error">{errors.email}</span>
                )}
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="collegeYear">
                    <span className="flex-inline-icon">
                      <GraduationCap size={15} /> College / Year <span className="required">*</span>
                    </span>
                  </label>
                  <input
                    id="collegeYear"
                    type="text"
                    name="collegeYear"
                    className={`form-input ${errors.collegeYear ? "error" : ""}`}
                    placeholder="e.g. IIT Delhi - 3rd Year"
                    value={formData.collegeYear}
                    onChange={handleChange}
                  />
                  {errors.collegeYear && (
                    <span className="form-error">{errors.collegeYear}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">
                    <span className="flex-inline-icon">
                      <Phone size={15} /> Phone Number <span className="required">*</span>
                    </span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    className={`form-input ${errors.phone ? "error" : ""}`}
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <span className="form-error">{errors.phone}</span>
                  )}
                </div>
              </div>

              <div className="form-footer-action">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ width: "100%" }}
                  disabled={!selectedEvent}
                >
                  <CheckCircle2 size={18} />
                  <span>Confirm Registration</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
