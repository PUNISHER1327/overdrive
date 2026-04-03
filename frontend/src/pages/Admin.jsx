import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Image as ImageIcon, CalendarDays, Users, LogOut, Plus, Trash2, Save, X, Lock } from 'lucide-react';
import { getEvents, setEvents, getGallery, setGallery, getRegistrations } from '../utils/dataStore';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('od_admin_auth') === 'true');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('registrations');
  
  // Data States
  const [events, setLocalEvents] = useState([]);
  const [gallery, setLocalGallery] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@overdrive.com' && password === '200413') {
      setIsAuthenticated(true);
      sessionStorage.setItem('od_admin_auth', 'true');
      setError('');
    } else {
      setError('Invalid credentials. Access denied.');
    }
  };

  // Fetch initial data exactly once on mount
  useEffect(() => {
    setLocalEvents(getEvents());
    setLocalGallery(getGallery());
    setRegistrations(getRegistrations());
  }, []);

  // --- EVENTS HANDLERS ---
  const handleAddEvent = () => {
    const newEvent = {
        id: Date.now(),
        title: "NEW TOURNAMENT",
        sport: "SPORT",
        date: "TBD",
        location: "COURT X",
        tag: "New",
        prize: "₹0",
        img: "https://images.unsplash.com/photo-1543326727-b52932ebd629?q=80&w=2000"
    };
    setLocalEvents([...events, newEvent]);
  };

  const updateEvent = (index, field, value) => {
    const newEvents = [...events];
    newEvents[index][field] = value;
    setLocalEvents(newEvents);
  };

  const deleteEvent = (index) => {
    setLocalEvents(events.filter((_, i) => i !== index));
  };

  const saveEvents = () => {
    setEvents(events);
    alert("Live Events updated successfully! They will now show up on the Homepage.");
  };

  // --- GALLERY HANDLERS ---
  const updateGalleryImage = (index, newUrl) => {
    const newGallery = [...gallery];
    newGallery[index].url = newUrl;
    setLocalGallery(newGallery);
  };

  const addGalleryImage = () => {
    // Array of sizes to loop through to maintain the awesome Bento Grid look
    const gridSizes = [
      "md:col-span-1 md:row-span-1",
      "md:col-span-2 md:row-span-2",
      "md:col-span-1 md:row-span-2",
      "md:col-span-2 md:row-span-1",
    ];
    
    const newImage = {
        id: Date.now(),
        size: gridSizes[gallery.length % gridSizes.length],
        url: "https://images.unsplash.com/photo-1543326727-b52932ebd629?q=80&w=800"
    };
    
    setLocalGallery([...gallery, newImage]);
  };

  const removeGalleryImage = (index) => {
      setLocalGallery(gallery.filter((_, i) => i !== index));
  };

  const saveGallery = () => {
    setGallery(gallery);
    alert("Gallery images updated securely! Changes live on homepage.");
  };

  // --- SUB-COMPONENTS FOR CLEANLINESS ---

  const RegistrationsPanel = () => (
    <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-[#1F1F1F]">
           <h3 className="text-white font-bebas text-3xl tracking-widest">Recent Registrations</h3>
           <p className="text-white/50 text-sm font-dm mt-1">Teams that have signed up via the Upcoming Series billboard.</p>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left font-dm text-sm text-white/80">
                <thead className="bg-[#1A1A1A] text-xs uppercase tracking-widest text-primary">
                    <tr>
                        <th className="px-6 py-4">Reg ID</th>
                        <th className="px-6 py-4">Team Name</th>
                        <th className="px-6 py-4">Event</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#1F1F1F]">
                    {registrations.map(reg => (
                        <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-bold">{reg.id}</td>
                            <td className="px-6 py-4 text-white">{reg.teamName}</td>
                            <td className="px-6 py-4">{reg.event}</td>
                            <td className="px-6 py-4 text-white/50">{reg.date}</td>
                            <td className="px-6 py-4">
                               <span className={`px-3 py-1 rounded-full text-xs font-bold ${reg.status === 'Confirmed' ? 'bg-primary/20 text-primary' : 'bg-yellow-500/20 text-yellow-500'}`}>
                                   {reg.status}
                               </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );

  const EventsPanel = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
            <div>
               <h3 className="text-white font-bebas text-4xl tracking-widest">Digital Billboard Manager</h3>
               <p className="text-white/50 text-sm font-dm">Add or update featured events on the homepage slider.</p>
            </div>
            <button onClick={saveEvents} className="bg-primary text-black flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm tracking-widest hover:bg-white transition-colors">
                <Save size={16} /> PUBLISH CHANGES
            </button>
        </div>

        {events.map((evt, idx) => (
            <div key={evt.id} className="bg-[#111111] border border-[#1F1F1F] p-6 rounded-2xl relative overflow-hidden flex flex-col md:flex-row gap-8">
                {/* Image Preview */}
                <div className="w-full md:w-64 h-48 bg-[#080808] rounded-xl overflow-hidden shrink-0 border border-[#1A1A1A]">
                   <img src={evt.img} className="w-full h-full object-cover opacity-80" alt="Preview"/>
                </div>
                
                {/* Form Fields */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 font-dm">
                    <div>
                        <label className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Event Title</label>
                        <input value={evt.title} onChange={(e) => updateEvent(idx, 'title', e.target.value)} className="w-full bg-[#1A1A1A] border-none text-white px-4 py-3 rounded-lg focus:ring-1 focus:ring-primary mt-1" />
                    </div>
                    <div>
                        <label className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Background Image URL</label>
                        <input value={evt.img} onChange={(e) => updateEvent(idx, 'img', e.target.value)} className="w-full bg-[#1A1A1A] border-none text-white px-4 py-3 rounded-lg focus:ring-1 focus:ring-primary mt-1" />
                    </div>
                    <div>
                        <label className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Sport</label>
                        <input value={evt.sport} onChange={(e) => updateEvent(idx, 'sport', e.target.value)} className="w-full bg-[#1A1A1A] border-none text-white px-4 py-3 rounded-lg focus:ring-1 focus:ring-primary mt-1" />
                    </div>
                    <div>
                        <label className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Date</label>
                        <input value={evt.date} onChange={(e) => updateEvent(idx, 'date', e.target.value)} className="w-full bg-[#1A1A1A] border-none text-white px-4 py-3 rounded-lg focus:ring-1 focus:ring-primary mt-1" />
                    </div>
                     <div>
                        <label className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Prize Pool / Info</label>
                        <input value={evt.prize} onChange={(e) => updateEvent(idx, 'prize', e.target.value)} className="w-full bg-[#1A1A1A] border-none text-white px-4 py-3 rounded-lg focus:ring-1 focus:ring-primary mt-1" />
                    </div>
                </div>

                <button onClick={() => deleteEvent(idx)} className="absolute top-6 right-6 text-white/20 hover:text-red-500 transition-colors">
                    <Trash2 size={20} />
                </button>
            </div>
        ))}
        
        <button onClick={handleAddEvent} className="w-full border border-dashed border-[#1F1F1F] bg-[#0A0A0A] hover:bg-[#111111] text-white/50 hover:text-white transition-colors py-8 rounded-2xl flex flex-col items-center justify-center font-bebas text-2xl tracking-widest">
            <Plus className="mb-2 text-primary" size={24} /> ADD NEW EVENT
        </button>
    </div>
  );

  const GalleryPanel = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
            <div>
               <h3 className="text-white font-bebas text-4xl tracking-widest">Gallery Injection</h3>
               <p className="text-white/50 text-sm font-dm">Swap out images or add entirely new ones to the horizontal carousel.</p>
            </div>
            <button onClick={saveGallery} className="bg-primary text-black flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm tracking-widest hover:bg-white transition-colors">
                <Save size={16} /> PUBLISH GALLERY
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {gallery.map((img, idx) => (
             <div key={img.id} className="relative bg-[#111111] border border-[#1F1F1F] p-4 rounded-xl group overflow-hidden">
                 <div className="w-full h-32 bg-black rounded-lg overflow-hidden mb-4 relative">
                     <img src={img.url} className="w-full h-full object-cover" alt={`Gallery ${img.id}`} />
                 </div>
                 <label className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-2 block">
                     Image URL (Slot {idx + 1}) - {img.size.includes('2') ? 'Large' : 'Small'}
                 </label>
                 <input 
                   type="text"
                   value={img.url} 
                   onChange={(e) => updateGalleryImage(idx, e.target.value)} 
                   className="w-full bg-[#1A1A1A] border-none text-white/80 text-xs px-3 py-2 rounded focus:ring-1 focus:ring-primary" 
                 />

                 <button onClick={() => removeGalleryImage(idx)} className="absolute top-6 right-6 text-white/20 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 bg-black/50 p-2 rounded-full backdrop-blur-md">
                    <Trash2 size={16} />
                 </button>
             </div>
           ))}

           {/* Add New Button Card */}
           <button onClick={addGalleryImage} className="border border-dashed border-[#1F1F1F] bg-[#0A0A0A] hover:bg-[#111111] text-white/50 hover:text-white transition-colors h-full min-h-[220px] rounded-xl flex flex-col items-center justify-center font-bebas text-2xl tracking-widest">
               <Plus className="mb-2 text-primary" size={24} /> ADD PHOTO
           </button>
        </div>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111111] p-8 rounded-2xl border border-[#1F1F1F] w-full max-w-md"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Lock size={32} />
            </div>
          </div>
          <h2 className="font-bebas text-4xl text-white text-center tracking-widest mb-2">ACCESS RESTRICTED</h2>
          <p className="font-dm text-white/50 text-center text-sm mb-8">Please login to access the Overdrive CMS.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-1 block">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white px-4 py-3 rounded-lg focus:ring-1 focus:ring-primary font-dm outline-none transition-all"
                placeholder="admin@overdrive.com"
                required
              />
            </div>
            <div>
              <label className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-1 block">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white px-4 py-3 rounded-lg focus:ring-1 focus:ring-primary font-dm outline-none transition-all"
                placeholder="••••••"
                required
              />
            </div>
            
            {error && <p className="text-red-500 font-dm text-xs font-bold text-center">{error}</p>}

            <button 
              type="submit"
              className="w-full bg-primary text-black font-bebas text-xl tracking-widest py-4 rounded-lg hover:bg-white transition-colors mt-4"
            >
              LOGIN TO CMS
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] flex">
      {/* Sidebar (Sticky) */}
      <div className="w-64 h-screen sticky top-0 bg-[#0A0A0A] border-r border-[#1F1F1F] flex flex-col hidden md:flex">
         <div className="p-8 border-b border-[#1F1F1F]">
            <h1 className="font-bebas text-3xl text-white tracking-widest">OVERDRIVE <span className="text-primary italic">CMS</span></h1>
         </div>
         <nav className="flex-1 p-4 space-y-2">
            <button onClick={() => setActiveTab('registrations')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold font-dm text-sm transition-colors ${activeTab === 'registrations' ? 'bg-primary text-black' : 'text-white/50 hover:bg-[#111111] hover:text-white'}`}>
                <Users size={18} /> Registrations
            </button>
            <button onClick={() => setActiveTab('events')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold font-dm text-sm transition-colors ${activeTab === 'events' ? 'bg-primary text-black' : 'text-white/50 hover:bg-[#111111] hover:text-white'}`}>
                <CalendarDays size={18} /> Upcoming Series
            </button>
            <button onClick={() => setActiveTab('gallery')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold font-dm text-sm transition-colors ${activeTab === 'gallery' ? 'bg-primary text-black' : 'text-white/50 hover:bg-[#111111] hover:text-white'}`}>
                <ImageIcon size={18} /> Gallery Media
            </button>
         </nav>
         <div className="p-4 border-t border-[#1F1F1F]">
             <button onClick={() => { sessionStorage.removeItem('od_admin_auth'); window.location.href = '/' }} className="w-full flex items-center justify-start gap-3 px-4 py-3 text-white/50 hover:text-white font-dm text-sm font-bold transition-colors">
                 <LogOut size={18} /> Exit Admin
             </button>
         </div>
      </div>

      {/* Main Content Area (Natural Scroll) */}
      <div className="flex-1 flex flex-col min-h-screen">
         {/* Mobile Header */}
         <div className="md:hidden p-6 border-b border-[#1F1F1F] bg-[#0A0A0A] flex justify-between items-center sticky top-0 z-50">
            <h1 className="font-bebas text-2xl text-white tracking-widest">OVERDRIVE <span className="text-primary italic">CMS</span></h1>
            <select 
              value={activeTab} 
              onChange={(e) => setActiveTab(e.target.value)} 
              className="bg-[#111111] text-white border border-[#1F1F1F] rounded p-2 text-sm"
            >
                <option value="registrations">Registrations</option>
                <option value="events">Events</option>
                <option value="gallery">Gallery</option>
            </select>
         </div>

         {/* Workspace */}
         <div className="flex-1 p-6 md:p-12 pb-32">
             <AnimatePresence mode="wait">
                 <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                 >
                     {activeTab === 'registrations' && <RegistrationsPanel />}
                     {activeTab === 'events' && <EventsPanel />}
                     {activeTab === 'gallery' && <GalleryPanel />}
                 </motion.div>
             </AnimatePresence>
         </div>
      </div>
    </div>
  );
};

export default Admin;
