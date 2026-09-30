import React, { useState } from "react";
import { X, Calendar, Clock, MapPin, Tag, FileText, CheckCircle2 } from "lucide-react";
import { CATEGORIES } from "../data/initialData";

export default function EventModal({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState(() => ({
    name: initialData?.name || "",
    date: initialData?.date || "",
    time: initialData?.time || "",
    venue: initialData?.venue || "",
    category: initialData?.category || "Technical",
    description: initialData?.description || "",
    featured: Boolean(initialData?.featured)
  }));

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Event name is required";
    if (!formData.date.trim()) errs.date = "Event date is required";
    if (!formData.time.trim()) errs.time = "Event time is required";
    if (!formData.venue.trim()) errs.venue = "Venue location is required";
    if (!formData.category.trim()) errs.category = "Category is required";
    if (!formData.description.trim()) errs.description = "Short description is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">
              {initialData ? "Edit Event" : "Create New Event"}
            </h2>
            <p className="modal-subtitle">
              {initialData
                ? "Update event details and schedule"
                : "Fill out the fields below to publish a college club event"}
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Event Name <span className="required">*</span>
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className={`form-input ${errors.name ? "error" : ""}`}
              placeholder="e.g. Hackathon 2026: Code for Change"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label" htmlFor="date">
                <span className="flex-inline-icon"><Calendar size={14} /> Date <span className="required">*</span></span>
              </label>
              <input
                id="date"
                type="date"
                name="date"
                className={`form-input ${errors.date ? "error" : ""}`}
                value={formData.date}
                onChange={handleChange}
              />
              {errors.date && <span className="form-error">{errors.date}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="time">
                <span className="flex-inline-icon"><Clock size={14} /> Time <span className="required">*</span></span>
              </label>
              <input
                id="time"
                type="text"
                name="time"
                className={`form-input ${errors.time ? "error" : ""}`}
                placeholder="e.g. 10:00 AM - 01:00 PM"
                value={formData.time}
                onChange={handleChange}
              />
              {errors.time && <span className="form-error">{errors.time}</span>}
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label" htmlFor="venue">
                <span className="flex-inline-icon"><MapPin size={14} /> Venue <span className="required">*</span></span>
              </label>
              <input
                id="venue"
                type="text"
                name="venue"
                className={`form-input ${errors.venue ? "error" : ""}`}
                placeholder="e.g. Auditorium / CS Lab 3"
                value={formData.venue}
                onChange={handleChange}
              />
              {errors.venue && <span className="form-error">{errors.venue}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="category">
                <span className="flex-inline-icon"><Tag size={14} /> Category <span className="required">*</span></span>
              </label>
              <select
                id="category"
                name="category"
                className={`form-select ${errors.category ? "error" : ""}`}
                value={formData.category}
                onChange={handleChange}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <span className="form-error">{errors.category}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="description">
              <span className="flex-inline-icon"><FileText size={14} /> Short Description <span className="required">*</span></span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className={`form-textarea ${errors.description ? "error" : ""}`}
              placeholder="Provide a concise description of the event agenda, topics covered, and who should attend..."
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <span className="form-error">{errors.description}</span>}
          </div>

          <div className="form-checkbox-group">
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />
              <span className="checkbox-custom"></span>
              <div className="checkbox-text">
                <span className="checkbox-title">Feature on Home Page</span>
                <span className="checkbox-desc">Highlights this event in the featured hero showcase on the home page.</span>
              </div>
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <CheckCircle2 size={16} />
              {initialData ? "Save Changes" : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
