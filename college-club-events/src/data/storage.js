import { SAMPLE_EVENTS, SAMPLE_REGISTRATIONS } from "./initialData";

const EVENTS_KEY = "college_club_events";
const REGISTRATIONS_KEY = "college_club_registrations";

// Helper to notify listeners within the same tab
const dispatchUpdate = (eventName) => {
  window.dispatchEvent(new Event(eventName));
};

// Events Storage
export const getEvents = () => {
  try {
    const data = localStorage.getItem(EVENTS_KEY);
    if (!data) {
      localStorage.setItem(EVENTS_KEY, JSON.stringify(SAMPLE_EVENTS));
      return SAMPLE_EVENTS;
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : SAMPLE_EVENTS;
  } catch (e) {
    console.error("Error reading events from localStorage", e);
    return SAMPLE_EVENTS;
  }
};

export const saveEvents = (events) => {
  try {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
    dispatchUpdate("events_changed");
  } catch (e) {
    console.error("Error saving events to localStorage", e);
  }
};

export const addEvent = (eventData) => {
  const events = getEvents();
  const newEvent = {
    ...eventData,
    id: `evt-${Date.now()}`,
    featured: Boolean(eventData.featured)
  };
  const updated = [newEvent, ...events];
  saveEvents(updated);
  return newEvent;
};

export const updateEvent = (updatedEvent) => {
  const events = getEvents();
  const updated = events.map((ev) =>
    ev.id === updatedEvent.id ? { ...ev, ...updatedEvent, featured: Boolean(updatedEvent.featured) } : ev
  );
  saveEvents(updated);
  return updated;
};

export const deleteEvent = (eventId) => {
  const events = getEvents();
  const updated = events.filter((ev) => ev.id !== eventId);
  saveEvents(updated);
  return updated;
};

// Registrations Storage
export const getRegistrations = () => {
  try {
    const data = localStorage.getItem(REGISTRATIONS_KEY);
    if (!data) {
      localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(SAMPLE_REGISTRATIONS));
      return SAMPLE_REGISTRATIONS;
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : SAMPLE_REGISTRATIONS;
  } catch (e) {
    console.error("Error reading registrations from localStorage", e);
    return SAMPLE_REGISTRATIONS;
  }
};

export const saveRegistrations = (registrations) => {
  try {
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
    dispatchUpdate("registrations_changed");
  } catch (e) {
    console.error("Error saving registrations to localStorage", e);
  }
};

export const addRegistration = (registrationData) => {
  const registrations = getRegistrations();
  const newReg = {
    ...registrationData,
    id: `reg-${Date.now()}`,
    registeredAt: new Date().toISOString()
  };
  const updated = [newReg, ...registrations];
  saveRegistrations(updated);
  return newReg;
};

export const deleteRegistration = (regId) => {
  const registrations = getRegistrations();
  const updated = registrations.filter((r) => r.id !== regId);
  saveRegistrations(updated);
  return updated;
};

export const resetToSampleData = () => {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(SAMPLE_EVENTS));
  localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(SAMPLE_REGISTRATIONS));
  dispatchUpdate("events_changed");
  dispatchUpdate("registrations_changed");
};
