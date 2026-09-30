export const SAMPLE_EVENTS = [
  {
    id: "evt-1",
    name: "TechFest 2026: Next-Gen Innovation Summit",
    date: "2026-10-18",
    time: "09:30 AM - 05:00 PM",
    venue: "Main University Auditorium",
    category: "Technical",
    description: "Our flagship annual technology festival featuring robotics showdowns, keynotes from industry pioneers, and interactive tech exhibitions.",
    featured: true,
  },
  {
    id: "evt-2",
    name: "AI & Machine Learning Hands-on Workshop",
    date: "2026-10-24",
    time: "10:00 AM - 01:30 PM",
    venue: "Computer Science Lab 4, Block B",
    category: "Workshop",
    description: "Build neural network models and real-time computer vision pipelines using Python and PyTorch. Bring your laptop with Python 3.10+ installed.",
    featured: true,
  },
  {
    id: "evt-3",
    name: "Full-Stack Web Development Bootcamp",
    date: "2026-11-02",
    time: "02:00 PM - 06:00 PM",
    venue: "Seminar Hall 2, Science Wing",
    category: "Workshop",
    description: "Intensive 4-hour crash course on modern React, RESTful APIs, responsive design principles, and zero-downtime cloud deployments.",
    featured: false,
  },
  {
    id: "evt-4",
    name: "Code Challenge: Algorithmic Duel",
    date: "2026-11-10",
    time: "11:00 AM - 04:00 PM",
    venue: "Central Computing Center",
    category: "Competition",
    description: "Test your speed, algorithmic rigor, and problem-solving prowess against top campus coders. Cash prizes, certificates, and club swag for winners.",
    featured: false,
  },
  {
    id: "evt-5",
    name: "Innovation & Startup Founders Seminar",
    date: "2026-11-20",
    time: "03:00 PM - 05:30 PM",
    venue: "University Incubation Hub, 3rd Floor",
    category: "Seminar",
    description: "Hear from alumni unicorn founders on turning campus projects into venture-backed startups, securing angel funding, and scaling products.",
    featured: false,
  },
  {
    id: "evt-6",
    name: "Campus Open Source Jam & Social",
    date: "2026-11-28",
    time: "04:30 PM - 08:00 PM",
    venue: "Student Activity Center Lounge",
    category: "Cultural",
    description: "Casual community gathering combining lightning talks, beginner git mentoring, open mic tech discussions, pizza, and live acoustic music.",
    featured: false,
  }
];

export const SAMPLE_REGISTRATIONS = [
  {
    id: "reg-1",
    eventId: "evt-1",
    eventName: "TechFest 2026: Next-Gen Innovation Summit",
    fullName: "Aarav Sharma",
    email: "aarav.sharma@college.edu",
    collegeYear: "Apex Institute of Tech - 3rd Year CSE",
    phone: "9876543210",
    registeredAt: "2026-09-25T10:30:00.000Z"
  },
  {
    id: "reg-2",
    eventId: "evt-2",
    eventName: "AI & Machine Learning Hands-on Workshop",
    fullName: "Sneha Patel",
    email: "sneha.p@college.edu",
    collegeYear: "Govt Engineering College - 2nd Year IT",
    phone: "9812345678",
    registeredAt: "2026-09-26T14:15:00.000Z"
  },
  {
    id: "reg-3",
    eventId: "evt-1",
    eventName: "TechFest 2026: Next-Gen Innovation Summit",
    fullName: "Rohan Verma",
    email: "rohan.v@college.edu",
    collegeYear: "Apex Institute of Tech - 4th Year ECE",
    phone: "9765432109",
    registeredAt: "2026-09-27T09:40:00.000Z"
  },
  {
    id: "reg-4",
    eventId: "evt-4",
    eventName: "Code Challenge: Algorithmic Duel",
    fullName: "Priya Nair",
    email: "priya.nair@college.edu",
    collegeYear: "National Tech University - 3rd Year AI",
    phone: "9988776655",
    registeredAt: "2026-09-28T16:20:00.000Z"
  }
];

export const CATEGORIES = [
  "Technical",
  "Workshop",
  "Competition",
  "Cultural",
  "Seminar",
  "Other"
];
