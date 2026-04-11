import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Image as ImageIcon, CalendarDays, Users, LogOut, Plus, Trash2, Save, X, Lock, Star, MessageSquare } from 'lucide-react';
import { getEvents, setEvents, getGallery, setGallery, getRegistrations } from '../utils/dataStore';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('od_admin_auth') === 'true');
  const [email, setEmail] = useState('admin@overdrive.com');
  const [password, setPassword] = useState('admin');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Data States
  const [events, setLocalEvents] = useState([]);
  const [gallery, setLocalGallery] = useState([]);
  const [dbBookings, setDbBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState(null);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('od_admin_token')}` }
      });
      if(response.ok) setStats(await response.json());
    } catch(err) { console.error(err) }
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/admin/bookings', {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('od_admin_token')}` }
      });
      if(response.ok) setDbBookings(await response.json());
    } catch(err) { console.error(err) }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:8000/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        sessionStorage.setItem('od_admin_auth', 'true');
        sessionStorage.setItem('od_admin_token', data.token);
      } else {
        setError(data.message || 'Invalid credentials. Access denied.');
      }
    } catch (err) {
      setError('Network error. Could not connect to server.');
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/reviews/admin', {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('od_admin_token')}` }
      });
      const json = await response.json();
      if(json.success) setReviews(json.data);
    } catch(err) { console.error(err) }
  };

  // Fetch initial protected data
  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardStats();
      fetchBookings();
      fetchReviews();
    }
  }, [isAuthenticated]);

  // Fetch initial public components
  useEffect(() => {
    setLocalEvents(getEvents());
    setLocalGallery(getGallery());
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
  const updateGalleryItem = (index, field, value) => {
    const newGallery = [...gallery];
    newGallery[index][field] = value;
    setLocalGallery(newGallery);
  };

  const addGalleryItem = () => {
    const newItem = {
        id: Date.now(),
        type: "image",
        url: "https://images.unsplash.com/photo-1543326727-b52932ebd629?q=80&w=800"
    };
    
    setLocalGallery([...gallery, newItem]);
  };

  const removeGalleryImage = (index) => {
      setLocalGallery(gallery.filter((_, i) => i !== index));
  };

  const saveGallery = () => {
    setGallery(gallery);
    alert("Gallery images updated securely! Changes live on homepage.");
  };

  const handleFileUpload = async (index, file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('media', file);

    try {
      const response = await fetch('http://localhost:8000/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('od_admin_token')}`
        },
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        updateGalleryItem(index, 'url', data.url);
        updateGalleryItem(index, 'type', data.type);
        alert('Upload successful!');
      } else {
        alert(data.message || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Network error during upload');
    }
  };

  // --- SUB-COMPONENTS FOR CLEANLINESS ---

  const DashboardPanel = () => {
    const [blockDate, setBlockDate] = useState('');
    const [blockTime, setBlockTime] = useState('');

    const handleBlockSlot = async (e) => {
      e.preventDefault();
      try {
        const endTimeHour = parseInt(blockTime) + 1;
        const endTime = `${endTimeHour < 10 ? '0' : ''}${endTimeHour}:00`;
        
        const res = await fetch('http://localhost:8000/api/admin/block-slot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('od_admin_token')}`
          },
          body: JSON.stringify({ date: blockDate, startTime: blockTime, endTime })
        });
        if(res.ok) {
          alert('Slot blocked successfully!');
          fetchBookings(); // refresh the bookings
        } else {
          alert((await res.json()).message);
        }
      } catch(err) { console.error(err) }
    };

    return (
      <div className="space-y-8">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-[#111111] p-6 rounded-2xl border border-[#1F1F1F]">
               <h4 className="text-white/50 text-xs font-dm uppercase tracking-widest font-bold mb-2">Today's Revenue</h4>
               <p className="text-3xl font-bebas tracking-widest text-primary">₹{stats?.revenue?.daily || 0}</p>
            </div>
            <div className="bg-[#111111] p-6 rounded-2xl border border-[#1F1F1F]">
               <h4 className="text-white/50 text-xs font-dm uppercase tracking-widest font-bold mb-2">Weekly Revenue</h4>
               <p className="text-3xl font-bebas tracking-widest text-primary">₹{stats?.revenue?.weekly || 0}</p>
            </div>
            <div className="bg-[#111111] p-6 rounded-2xl border border-[#1F1F1F]">
               <h4 className="text-white/50 text-xs font-dm uppercase tracking-widest font-bold mb-2">Monthly Revenue</h4>
               <p className="text-3xl font-bebas tracking-widest text-primary">₹{stats?.revenue?.monthly || 0}</p>
            </div>
            <div className="bg-[#111111] p-6 rounded-2xl border border-[#1F1F1F]">
               <h4 className="text-white/50 text-xs font-dm uppercase tracking-widest font-bold mb-2">Weekly Bookings</h4>
               <p className="text-3xl font-bebas tracking-widest text-white">{stats?.weeklyBookingsCount || 0}</p>
            </div>
         </div>

         <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6">
            <h3 className="text-white font-bebas text-3xl tracking-widest mb-4">Quick Block Slot</h3>
            <form onSubmit={handleBlockSlot} className="flex flex-col md:flex-row gap-4 items-end">
               <div className="w-full md:w-auto">
                 <label className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-1 block">Condition Date</label>
                 <input type="date" required value={blockDate} onChange={e=>setBlockDate(e.target.value)} className="w-full bg-[#1A1A1A] border-none text-white px-4 py-3 rounded-lg focus:ring-1 focus:ring-primary [color-scheme:dark]" />
               </div>
               <div className="w-full md:w-auto">
                 <label className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-1 block">Start Time</label>
                 <select required value={blockTime} onChange={e=>setBlockTime(e.target.value)} className="w-full bg-[#1A1A1A] border-none text-white px-4 py-3 rounded-lg focus:ring-1 focus:ring-primary">
                    <option value="">Select Time</option>
                    {['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00'].map(t=>(<option key={t} value={t}>{t}</option>))}
                 </select>
               </div>
               <button type="submit" className="w-full md:w-auto bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-black font-bold font-dm text-sm px-8 py-3 rounded-lg transition-colors border border-red-500/20">BLOCK SLOT</button>
            </form>
         </div>
      </div>
    );
  };

  const BookingsPanel = () => (
    <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-[#1F1F1F]">
           <h3 className="text-white font-bebas text-3xl tracking-widest">Database Bookings</h3>
           <p className="text-white/50 text-sm font-dm mt-1">All confirmed, cancelled, or blocked slots synchronized directly from MongoDB.</p>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left font-dm text-sm text-white/80">
                <thead className="bg-[#1A1A1A] text-xs uppercase tracking-widest text-primary">
                    <tr>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Phone</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Start Time</th>
                        <th className="px-6 py-4">Amount</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#1F1F1F]">
                    {dbBookings.map(b => (
                        <tr key={b._id} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4">
                               <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                 b.status === 'confirmed' ? 'bg-primary/20 text-primary' : 
                                 b.status === 'blocked' ? 'bg-red-500/20 text-red-500' : 'bg-gray-500/20 text-gray-500'
                               }`}>
                                   {b.status.toUpperCase()}
                               </span>
                            </td>
                            <td className="px-6 py-4 text-white font-bold">{b.name}</td>
                            <td className="px-6 py-4 text-white/50">{b.phone}</td>
                            <td className="px-6 py-4">{isNaN(new Date(b.date).getTime()) ? b.date : new Date(b.date).toLocaleDateString()}</td>
                            <td className="px-6 py-4 font-bold">{b.startTime}</td>
                            <td className="px-6 py-4 text-primary">₹{b.amount}</td>
                        </tr>
                    ))}
                    {dbBookings.length === 0 && (
                        <tr><td colSpan="6" className="text-center py-8 text-white/40">No entries found</td></tr>
                    )}
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
           {gallery.map((item, idx) => (
             <div key={item.id} className="relative bg-[#111111] border border-[#1F1F1F] p-5 rounded-xl group overflow-hidden space-y-4">
                 <div className="w-full aspect-[9/16] bg-black rounded-lg overflow-hidden relative border border-white/5">
                    <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-1000">
                      {item.type === 'video' ? (
                        <video
                          src={item.url.startsWith('http') ? item.url : `http://localhost:8000${item.url}`}
                          className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700 pointer-events-none"
                          muted
                          loop
                          playsInline
                          autoPlay
                        />
                      ) : (
                        <img
                          src={item.url.startsWith('http') ? item.url : `http://localhost:8000${item.url}`}
                          className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700 pointer-events-none shadow-2xl"
                          alt={`Arena Gallery ${item.id}`}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent pointer-events-none"></div>
                    </div>
                     <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[8px] font-bold text-primary uppercase border border-primary/20">
                        {item.type}
                     </div>
                 </div>
                 
                 <div className="space-y-3">
                    <div>
                        <label className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-1 block">Media Type</label>
                        <select 
                          value={item.type || 'image'} 
                          onChange={(e) => updateGalleryItem(idx, 'type', e.target.value)}
                          className="w-full bg-[#1A1A1A] border-none text-white text-xs px-3 py-2 rounded focus:ring-1 focus:ring-primary"
                        >
                           <option value="image">Image</option>
                           <option value="video">Video</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-1 block">Media Source</label>
                        <div className="flex gap-2">
                           <input 
                             type="text"
                             value={item.url} 
                             onChange={(e) => updateGalleryItem(idx, 'url', e.target.value)} 
                             className="flex-1 bg-[#1A1A1A] border-none text-white/80 text-xs px-3 py-2 rounded focus:ring-1 focus:ring-primary" 
                             placeholder="URL or Path"
                           />
                           <label className="bg-primary/10 text-primary hover:bg-primary hover:text-black p-2 rounded cursor-pointer transition-colors flex items-center justify-center">
                              <Plus size={14} />
                              <input 
                                type="file" 
                                className="hidden" 
                                onChange={(e) => handleFileUpload(idx, e.target.files[0])}
                                accept="image/*,video/*"
                              />
                           </label>
                        </div>
                    </div>
                 </div>

                 <button onClick={() => removeGalleryImage(idx)} className="absolute top-4 right-4 text-white/20 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 bg-black/50 p-2 rounded-full backdrop-blur-md">
                    <Trash2 size={16} />
                 </button>
             </div>
           ))}

           {/* Add New Button Card */}
           <button onClick={addGalleryItem} className="border border-dashed border-[#1F1F1F] bg-[#0A0A0A] hover:bg-[#111111] text-white/50 hover:text-white transition-colors h-full min-h-[300px] rounded-xl flex flex-col items-center justify-center font-bebas text-2xl tracking-widest">
               <Plus className="mb-2 text-primary" size={24} /> ADD MEDIA
           </button>
        </div>
    </div>
  );

  const ReviewsPanel = () => {
    const toggleApproval = async (id, currentStatus) => {
      try {
        const res = await fetch(`http://localhost:8000/api/reviews/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('od_admin_token')}`
          },
          body: JSON.stringify({ isApproved: !currentStatus })
        });
        if(res.ok) fetchReviews();
      } catch(err) { console.error(err) }
    };

    const deleteReview = async (id) => {
      if(!window.confirm("Are you sure you want to delete this review?")) return;
      try {
        const res = await fetch(`http://localhost:8000/api/reviews/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${sessionStorage.getItem('od_admin_token')}` }
        });
        if(res.ok) fetchReviews();
      } catch(err) { console.error(err) }
    };

    return (
      <div className="space-y-6">
          <div className="mb-8">
             <h3 className="text-white font-bebas text-4xl tracking-widest text-primary">Player Feedbacks</h3>
             <p className="text-white/50 text-sm font-dm">Moderate user-submitted testimonials before they go live on the site.</p>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
              {reviews.map(r => (
                <div key={r._id} className="bg-[#111111] border border-[#1F1F1F] p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex gap-4 items-center">
                        <img src={r.imgSrc} className="w-12 h-12 rounded-full grayscale border border-white/10" alt={r.name} />
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-white font-bold font-dm text-sm">{r.name}</h4>
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={10} className={i < r.rating ? "text-primary fill-primary" : "text-white/10"} />
                                    ))}
                                </div>
                            </div>
                            <p className="text-white/60 text-sm italic font-dm max-w-xl">"{r.comment}"</p>
                        </div>
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                        <button 
                          onClick={() => toggleApproval(r._id, r.isApproved)}
                          className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold font-dm transition-colors ${
                            r.isApproved ? 'bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-black' : 'bg-primary/10 text-primary hover:bg-primary hover:text-black'
                          }`}
                        >
                            {r.isApproved ? 'APPROVED' : 'APPROVE'}
                        </button>
                        <button 
                          onClick={() => deleteReview(r._id)}
                          className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-black rounded-lg transition-colors"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
              ))}
              {reviews.length === 0 && (
                <div className="text-center py-20 border-2 border-dashed border-[#1F1F1F] rounded-2xl">
                    <p className="text-white/30 font-dm">No reviews found in the database.</p>
                </div>
              )}
          </div>
      </div>
    );
  };

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
            <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold font-dm text-sm transition-colors ${activeTab === 'dashboard' ? 'bg-primary text-black' : 'text-white/50 hover:bg-[#111111] hover:text-white'}`}>
                <LayoutDashboard size={18} /> Dashboard Overview
            </button>
            <button onClick={() => setActiveTab('bookings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold font-dm text-sm transition-colors ${activeTab === 'bookings' ? 'bg-primary text-black' : 'text-white/50 hover:bg-[#111111] hover:text-white'}`}>
                <Users size={18} /> Bookings
            </button>
{/* <button onClick={() => setActiveTab('events')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold font-dm text-sm transition-colors ${activeTab === 'events' ? 'bg-primary text-black' : 'text-white/50 hover:bg-[#111111] hover:text-white'}`}>
                <CalendarDays size={18} /> Upcoming Series
            </button> */}
            <button onClick={() => setActiveTab('gallery')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold font-dm text-sm transition-colors ${activeTab === 'gallery' ? 'bg-primary text-black' : 'text-white/50 hover:bg-[#111111] hover:text-white'}`}>
                <ImageIcon size={18} /> Gallery Media
            </button>
            <button onClick={() => setActiveTab('reviews')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold font-dm text-sm transition-colors ${activeTab === 'reviews' ? 'bg-primary text-black' : 'text-white/50 hover:bg-[#111111] hover:text-white'}`}>
                <MessageSquare size={18} /> Player Reviews
            </button>
         </nav>
         <div className="p-4 border-t border-[#1F1F1F]">
             <button onClick={() => { sessionStorage.removeItem('od_admin_auth'); sessionStorage.removeItem('od_admin_token'); window.location.href = '/' }} className="w-full flex items-center justify-start gap-3 px-4 py-3 text-white/50 hover:text-white font-dm text-sm font-bold transition-colors">
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
                <option value="dashboard">Dashboard</option>
                <option value="bookings">Bookings</option>
                <option value="gallery">Gallery</option>
                <option value="reviews">Reviews</option>
                {/* <option value="events">Events</option> */}
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
                     {activeTab === 'dashboard' && <DashboardPanel />}
                     {activeTab === 'bookings' && <BookingsPanel />}
                     {/* {activeTab === 'events' && <EventsPanel />} */}
                     {activeTab === 'gallery' && <GalleryPanel />}
                     {activeTab === 'reviews' && <ReviewsPanel />}
                 </motion.div>
             </AnimatePresence>
         </div>
      </div>
    </div>
  );
};

export default Admin;
