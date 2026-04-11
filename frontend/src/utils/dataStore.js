// Default Data initialization and LocalStorage management

const DEFAULT_EVENTS = [
    {
      id: 1,
      title: "ARENA CUP: WINTER OPEN",
      sport: "FOOTBALL",
      date: "JAN 15, 2025",
      location: "OVERDRIVE TURF",
      tag: "Open",
      prize: "₹50,000",
      img: "https://images.unsplash.com/photo-1543326727-b52932ebd629?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "NIGHT SMASH LEAGUE",
      sport: "BADMINTON",
      date: "FEB 02, 2025",
      location: "COURT 1 & 2",
      tag: "Tournament",
      prize: "₹25,000",
      img: "https://images.unsplash.com/photo-1611250282006-4484dd3fba6b?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "PRO CRICKET BASH",
      sport: "BOX CRICKET",
      date: "MAR 10, 2025",
      location: "BOX ARENA",
      tag: "Championship",
      prize: "₹1,00,000",
      img: "https://images.unsplash.com/photo-1518605368461-1e12522201c1?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "PICKLEBALL SHOWDOWN",
      sport: "PICKLEBALL",
      date: "APR 22, 2025",
      location: "COURT 3",
      tag: "League",
      prize: "₹10,000",
      img: "https://images.unsplash.com/photo-1622359480749-3bcaf5655bd5?q=80&w=2000&auto=format&fit=crop"
    }
];

const DEFAULT_GALLERY = [
    { id: 1, type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-girl-playing-with-a-soccer-ball-487-large.mp4" },
    { id: 2, type: "image", url: "https://images.unsplash.com/photo-1543326727-b52932ebd629?q=80&w=1000&auto=format&fit=crop" },
    { id: 3, type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-stadium-lights-at-night-422-large.mp4" },
    { id: 4, type: "image", url: "https://images.unsplash.com/photo-1518605368461-1e12522201c1?q=80&w=1000&auto=format&fit=crop" },
    { id: 5, type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-young-man-playing-basketball-in-an-outdoor-court-4645-large.mp4" },
    { id: 6, type: "image", url: "https://images.unsplash.com/photo-1574629810360-7efbf5ce0063?q=80&w=1000&auto=format&fit=crop" },
    { id: 7, type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-basketball-player-doing-a-slam-dunk-2358-large.mp4" },
    { id: 8, type: "image", url: "https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=1000&auto=format&fit=crop" },
];

export const getEvents = () => {
  const data = localStorage.getItem('od_events');
  if (data) return JSON.parse(data);
  // Initialize defaults if empty
  localStorage.setItem('od_events', JSON.stringify(DEFAULT_EVENTS));
  return DEFAULT_EVENTS;
};

export const setEvents = (events) => {
  localStorage.setItem('od_events', JSON.stringify(events));
};

export const getGallery = () => {
    const data = localStorage.getItem('od_gallery');
    if (data) return JSON.parse(data);
    localStorage.setItem('od_gallery', JSON.stringify(DEFAULT_GALLERY));
    return DEFAULT_GALLERY;
};
  
export const setGallery = (images) => {
    localStorage.setItem('od_gallery', JSON.stringify(images));
};
  
export const getRegistrations = () => {
    const data = localStorage.getItem('od_registrations');
    if (data) return JSON.parse(data);
    
    // Mock default generic registrations payload
    const defaultRegs = [
      { id: "REG-001", teamName: "Jammu Strikers", event: "ARENA CUP: WINTER OPEN", date: "Oct 12, 2025", status: "Confirmed" },
      { id: "REG-002", teamName: "Neon Smashers", event: "NIGHT SMASH LEAGUE", date: "Oct 14, 2025", status: "Pending" },
      { id: "REG-003", teamName: "Downtown CC", event: "PRO CRICKET BASH", date: "Oct 15, 2025", status: "Confirmed" },
    ];
    localStorage.setItem('od_registrations', JSON.stringify(defaultRegs));
    return defaultRegs;
}

export const registerTeam = (teamName, eventName) => {
    const regs = getRegistrations();
    const newReg = {
        id: `REG-${String(regs.length + 1).padStart(3, '0')}`,
        teamName,
        event: eventName,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: "Pending"
    };
    localStorage.setItem('od_registrations', JSON.stringify([newReg, ...regs]));
}
