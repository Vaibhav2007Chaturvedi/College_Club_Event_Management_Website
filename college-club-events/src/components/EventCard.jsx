import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Sparkles, ArrowRight, Edit3, Trash2 } from "lucide-react";
import { formatEventDate, getCategoryBadgeClass } from "../utils/formatters";

export default function EventCard({
  event,
  isAdmin = false,
  onEdit,
  onDelete
}) {
  const { id, name, date, time, venue, category, description, featured } = event;

  return (
    <div className={`card event-card ${featured ? "featured-border" : ""}`}>
      <div className="event-card-header">
        <div className="event-badges">
          <span className={`badge ${getCategoryBadgeClass(category)}`}>
            {category || "General"}
          </span>
          {featured && (
            <span className="badge badge-featured">
              <Sparkles size={12} />
              Featured
            </span>
          )}
        </div>
      </div>

      <div className="event-card-body">
        <h3 className="event-title" title={name}>
          {name}
        </h3>

        <p className="event-description">
          {description}
        </p>

        <div className="event-meta-grid">
          <div className="event-meta-item">
            <Calendar size={15} className="meta-icon" />
            <span>{formatEventDate(date)}</span>
          </div>
          <div className="event-meta-item">
            <Clock size={15} className="meta-icon" />
            <span>{time}</span>
          </div>
          <div className="event-meta-item full-width">
            <MapPin size={15} className="meta-icon" />
            <span>{venue}</span>
          </div>
        </div>
      </div>

      <div className="event-card-footer">
        {isAdmin ? (
          <div className="admin-card-actions">
            <button
              onClick={() => onEdit?.(event)}
              className="btn btn-secondary btn-sm"
              title="Edit Event"
            >
              <Edit3 size={15} />
              Edit
            </button>
            <button
              onClick={() => onDelete?.(event.id, event.name)}
              className="btn btn-danger btn-sm"
              title="Delete Event"
            >
              <Trash2 size={15} />
              Delete
            </button>
          </div>
        ) : (
          <Link
            to={`/register/${id}`}
            className="btn btn-primary register-btn"
          >
            <span>Register Now</span>
            <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </div>
  );
}
