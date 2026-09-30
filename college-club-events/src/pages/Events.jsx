import React, { useState, useEffect } from "react";
import { Search, Filter, CalendarDays, RefreshCw, X } from "lucide-react";
import { getEvents } from "../data/storage";
import { CATEGORIES } from "../data/initialData";
import EventCard from "../components/EventCard";

export default function Events() {
  const [events, setEvents] = useState(() => getEvents());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const handleUpdate = () => setEvents(getEvents());
    window.addEventListener("events_changed", handleUpdate);
    return () => window.removeEventListener("events_changed", handleUpdate);
  }, []);

  // Filter events based on both search and category
  const filteredEvents = events.filter((evt) => {
    const matchesName = evt.name.toLowerCase().includes(searchTerm.toLowerCase().trim());
    const matchesCategory =
      selectedCategory === "All" ||
      evt.category?.toLowerCase() === selectedCategory.toLowerCase();
    return matchesName && matchesCategory;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
  };

  const hasActiveFilters = searchTerm.trim() !== "" || selectedCategory !== "All";

  return (
    <div className="events-page container fade-in">
      <div className="page-header">
        <div className="page-badge">
          <CalendarDays size={14} />
          <span>CLUB CALENDAR</span>
        </div>
        <h1 className="page-title">Explore College Events</h1>
        <p className="page-subtitle">
          Find workshops, competitions, technical meetups, and seminars hosted by the TechNova Club.
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="events-filter-bar card">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search events by name (e.g. Workshop, Hackathon, AI)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="clear-search-btn"
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="filter-select-wrapper">
          <Filter size={16} className="filter-icon" />
          <select
            className="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories ({events.length})</option>
            {CATEGORIES.map((cat) => {
              const count = events.filter(
                (ev) => ev.category?.toLowerCase() === cat.toLowerCase()
              ).length;
              return (
                <option key={cat} value={cat}>
                  {cat} ({count})
                </option>
              );
            })}
          </select>
        </div>

        {hasActiveFilters && (
          <button onClick={clearFilters} className="btn btn-secondary btn-sm clear-all-btn">
            <RefreshCw size={14} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Category Pills for quick desktop selection */}
      <div className="category-pills">
        <button
          className={`category-pill ${selectedCategory === "All" ? "active" : ""}`}
          onClick={() => setSelectedCategory("All")}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`category-pill ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events Results Count */}
      <div className="events-count-info">
        <span>
          Showing <strong>{filteredEvents.length}</strong> {filteredEvents.length === 1 ? "event" : "events"}
          {hasActiveFilters && " matching your criteria"}
        </span>
      </div>

      {/* Events Grid or Empty State */}
      {filteredEvents.length > 0 ? (
        <div className="events-grid">
          {filteredEvents.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <CalendarDays className="empty-state-icon" />
          <h3 className="empty-state-title">No events found</h3>
          <p className="empty-state-desc">
            We couldn't find any events matching "{searchTerm}" in the{" "}
            {selectedCategory === "All" ? "entire catalog" : `"${selectedCategory}" category`}.
          </p>
          <button onClick={clearFilters} className="btn btn-primary">
            Clear Filters & View All
          </button>
        </div>
      )}
    </div>
  );
}
