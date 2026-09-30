import React, { useState, useEffect, useMemo } from "react";
import { 
  Plus, 
  Calendar, 
  Users, 
  Sparkles, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  ShieldCheck, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  FileSpreadsheet,
  MapPin,
  TrendingUp,
  X
} from "lucide-react";
import { 
  getEvents, 
  addEvent, 
  updateEvent, 
  deleteEvent, 
  getRegistrations, 
  deleteRegistration, 
  resetToSampleData 
} from "../data/storage";
import EventModal from "../components/EventModal";
import { formatEventDate, getCategoryBadgeClass, getTodayDateString } from "../utils/formatters";

export default function Admin() {
  const [events, setEvents] = useState(() => getEvents());
  const [registrations, setRegistrations] = useState(() => getRegistrations());
  const [activeTab, setActiveTab] = useState("events"); // 'events' | 'registrations'

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Delete Confirmation State
  const [deleteConfirm, setDeleteConfirm] = useState(null); // { type: 'event'|'reg', id, name }

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState(null);

  // Registrations search & filter state
  const [regSearch, setRegSearch] = useState("");
  const [regEventFilter, setRegEventFilter] = useState("All");

  // Events search state in admin
  const [eventSearch, setEventSearch] = useState("");

  useEffect(() => {
    const handleEventsChange = () => setEvents(getEvents());
    const handleRegsChange = () => setRegistrations(getRegistrations());

    window.addEventListener("events_changed", handleEventsChange);
    window.addEventListener("registrations_changed", handleRegsChange);

    return () => {
      window.removeEventListener("events_changed", handleEventsChange);
      window.removeEventListener("registrations_changed", handleRegsChange);
    };
  }, []);

  const showToast = (msg, type = "success") => {
    setToastMessage({ text: msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Calculations for stats
  const totalEvents = events.length;
  const totalRegistrations = registrations.length;
  
  const upcomingEventsCount = useMemo(() => {
    const today = getTodayDateString();
    return events.filter((e) => !e.date || e.date >= today).length;
  }, [events]);

  // Add / Edit Handlers
  const handleOpenAddModal = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (formData) => {
    if (editingEvent) {
      updateEvent({ ...formData, id: editingEvent.id });
      showToast(`Event "${formData.name}" updated successfully!`);
    } else {
      addEvent(formData);
      showToast(`Event "${formData.name}" added successfully!`);
    }
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  // Delete Handlers
  const confirmDelete = () => {
    if (!deleteConfirm) return;
    if (deleteConfirm.type === "event") {
      deleteEvent(deleteConfirm.id);
      showToast(`Event "${deleteConfirm.name}" deleted.`);
    } else if (deleteConfirm.type === "reg") {
      deleteRegistration(deleteConfirm.id);
      showToast(`Registration for "${deleteConfirm.name}" deleted.`);
    }
    setDeleteConfirm(null);
  };

  const handleResetData = () => {
    if (window.confirm("Reset all events and registrations to initial sample data?")) {
      resetToSampleData();
      showToast("Data reset to sample events and registrations.");
    }
  };

  // Filtered registrations
  const filteredRegistrations = registrations.filter((reg) => {
    const searchLower = regSearch.toLowerCase().trim();
    const matchesSearch =
      reg.fullName.toLowerCase().includes(searchLower) ||
      reg.email.toLowerCase().includes(searchLower) ||
      reg.phone.includes(searchLower);
    const matchesEvent =
      regEventFilter === "All" ||
      reg.eventId === regEventFilter ||
      reg.eventName === regEventFilter;
    return matchesSearch && matchesEvent;
  });

  // Filtered events for admin table/list
  const filteredEvents = events.filter((e) =>
    e.name.toLowerCase().includes(eventSearch.toLowerCase().trim()) ||
    e.category.toLowerCase().includes(eventSearch.toLowerCase().trim()) ||
    e.venue.toLowerCase().includes(eventSearch.toLowerCase().trim())
  );

  return (
    <div className="admin-page container fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`toast-alert toast-${toastMessage.type} fade-in`}>
          {toastMessage.type === "success" ? (
            <CheckCircle2 size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          <span>{toastMessage.text}</span>
          <button className="toast-close" onClick={() => setToastMessage(null)}>
            <X size={14} />
          </button>
        </div>
      )}

      {/* Admin Header */}
      <div className="admin-header-row">
        <div>
          <div className="page-badge">
            <ShieldCheck size={14} />
            <span>ADMINISTRATIVE PORTAL</span>
          </div>
          <h1 className="page-title">Club Event Management</h1>
          <p className="page-subtitle">
            Manage events, monitor live attendee registrations, and configure campus highlights.
          </p>
        </div>

        <div className="admin-header-actions">
          <button onClick={handleResetData} className="btn btn-secondary btn-sm" title="Restore Default Sample Data">
            <RefreshCw size={14} />
            <span>Reset Demo Data</span>
          </button>
          <button onClick={handleOpenAddModal} className="btn btn-primary">
            <Plus size={18} />
            <span>Add New Event</span>
          </button>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="admin-stats-grid">
        <div className="card stat-card">
          <div className="stat-icon-wrapper stat-primary">
            <Calendar size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Events</span>
            <span className="stat-value">{totalEvents}</span>
            <span className="stat-subtext">All time events scheduled</span>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon-wrapper stat-secondary">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Upcoming Events</span>
            <span className="stat-value">{upcomingEventsCount}</span>
            <span className="stat-subtext">Scheduled from today onwards</span>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon-wrapper stat-success">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Registrations</span>
            <span className="stat-value">{totalRegistrations}</span>
            <span className="stat-subtext">Verified attendee sign-ups</span>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="admin-tabs-nav">
        <button
          className={`admin-tab-btn ${activeTab === "events" ? "active" : ""}`}
          onClick={() => setActiveTab("events")}
        >
          <Calendar size={18} />
          <span>Events Management ({events.length})</span>
        </button>

        <button
          className={`admin-tab-btn ${activeTab === "registrations" ? "active" : ""}`}
          onClick={() => setActiveTab("registrations")}
        >
          <Users size={18} />
          <span>Registrations ({registrations.length})</span>
        </button>
      </div>

      {/* TAB 1: EVENTS MANAGEMENT */}
      {activeTab === "events" && (
        <div className="admin-tab-content fade-in">
          <div className="admin-table-controls card">
            <div className="search-input-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search events by name, venue or category..."
                value={eventSearch}
                onChange={(e) => setEventSearch(e.target.value)}
              />
              {eventSearch && (
                <button
                  onClick={() => setEventSearch("")}
                  className="clear-search-btn"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <button onClick={handleOpenAddModal} className="btn btn-primary btn-sm">
              <Plus size={16} />
              <span>Add Event</span>
            </button>
          </div>

          {filteredEvents.length > 0 ? (
            <div className="table-responsive card no-padding">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Event Details</th>
                    <th>Category</th>
                    <th>Date & Time</th>
                    <th>Venue</th>
                    <th>Featured</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map((evt) => (
                    <tr key={evt.id}>
                      <td className="event-title-cell">
                        <div className="table-event-name">{evt.name}</div>
                        <div className="table-event-desc">{evt.description}</div>
                      </td>
                      <td>
                        <span className={`badge ${getCategoryBadgeClass(evt.category)}`}>
                          {evt.category}
                        </span>
                      </td>
                      <td>
                        <div className="table-date-time">
                          <div>{formatEventDate(evt.date)}</div>
                          <small className="text-muted">{evt.time}</small>
                        </div>
                      </td>
                      <td className="table-venue-cell">
                        <MapPin size={14} className="inline-icon text-muted" />
                        <span>{evt.venue}</span>
                      </td>
                      <td>
                        {evt.featured ? (
                          <span className="badge badge-featured">
                            <Sparkles size={11} /> Featured
                          </span>
                        ) : (
                          <span className="badge badge-other">Standard</span>
                        )}
                      </td>
                      <td>
                        <div className="table-actions-cell">
                          <button
                            onClick={() => handleOpenEditModal(evt)}
                            className="btn btn-secondary btn-sm"
                            title="Edit Event"
                          >
                            <Edit3 size={15} />
                            <span className="action-label">Edit</span>
                          </button>
                          <button
                            onClick={() =>
                              setDeleteConfirm({
                                type: "event",
                                id: evt.id,
                                name: evt.name
                              })
                            }
                            className="btn btn-danger btn-sm"
                            title="Delete Event"
                          >
                            <Trash2 size={15} />
                            <span className="action-label">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <Calendar className="empty-state-icon" />
              <h3 className="empty-state-title">No events found</h3>
              <p className="empty-state-desc">
                {eventSearch
                  ? `No events match "${eventSearch}". Try a different keyword.`
                  : "No events are currently registered in the database."}
              </p>
              <button onClick={handleOpenAddModal} className="btn btn-primary">
                <Plus size={16} /> Add Your First Event
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: REGISTRATIONS */}
      {activeTab === "registrations" && (
        <div className="admin-tab-content fade-in">
          {/* Controls: Search by Name/Email + Filter by Event */}
          <div className="admin-table-controls card">
            <div className="search-input-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search registration by student name, email or phone..."
                value={regSearch}
                onChange={(e) => setRegSearch(e.target.value)}
              />
              {regSearch && (
                <button
                  onClick={() => setRegSearch("")}
                  className="clear-search-btn"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="filter-select-wrapper">
              <Filter size={16} className="filter-icon" />
              <select
                className="category-select"
                value={regEventFilter}
                onChange={(e) => setRegEventFilter(e.target.value)}
              >
                <option value="All">All Events ({registrations.length})</option>
                {events.map((evt) => {
                  const count = registrations.filter(
                    (r) => r.eventId === evt.id || r.eventName === evt.name
                  ).length;
                  return (
                    <option key={evt.id} value={evt.id}>
                      {evt.name} ({count})
                    </option>
                  );
                })}
              </select>
            </div>

            {(regSearch || regEventFilter !== "All") && (
              <button
                onClick={() => {
                  setRegSearch("");
                  setRegEventFilter("All");
                }}
                className="btn btn-secondary btn-sm"
              >
                <RefreshCw size={14} />
                <span>Reset</span>
              </button>
            )}
          </div>

          {filteredRegistrations.length > 0 ? (
            <div className="table-responsive card no-padding">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Email Address</th>
                    <th>College / Year</th>
                    <th>Phone</th>
                    <th>Registered Event</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegistrations.map((reg) => (
                    <tr key={reg.id}>
                      <td className="font-semibold text-main">
                        {reg.fullName}
                      </td>
                      <td className="text-muted">
                        <a href={`mailto:${reg.email}`} className="table-link">
                          {reg.email}
                        </a>
                      </td>
                      <td className="text-muted">
                        {reg.collegeYear}
                      </td>
                      <td className="text-muted font-mono">
                        {reg.phone}
                      </td>
                      <td>
                        <span className="badge badge-technical">
                          {reg.eventName}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions-cell">
                          <button
                            onClick={() =>
                              setDeleteConfirm({
                                type: "reg",
                                id: reg.id,
                                name: `${reg.fullName} (${reg.eventName})`
                              })
                            }
                            className="btn btn-danger btn-sm"
                            title="Delete registration"
                          >
                            <Trash2 size={15} />
                            <span className="action-label">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <FileSpreadsheet className="empty-state-icon" />
              <h3 className="empty-state-title">No registrations found</h3>
              <p className="empty-state-desc">
                {regSearch || regEventFilter !== "All"
                  ? "No registrations match your search and filter criteria."
                  : "No students have registered for events yet."}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Add / Edit Event Modal */}
      <EventModal
        key={editingEvent ? editingEvent.id : (isModalOpen ? "add-open" : "add-closed")}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingEvent(null);
        }}
        onSave={handleSaveEvent}
        initialData={editingEvent}
      />

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div className="modal-backdrop" onClick={() => setDeleteConfirm(null)}>
          <div className="modal-container delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="delete-modal-icon">
              <AlertCircle size={32} className="text-danger" />
            </div>
            <h3 className="modal-title text-center">Confirm Deletion</h3>
            <p className="delete-modal-text">
              Are you sure you want to delete <strong>"{deleteConfirm.name}"</strong>?
              This action cannot be undone.
            </p>
            <div className="modal-actions justify-center">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={confirmDelete}
              >
                <Trash2 size={16} />
                <span>Yes, Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
