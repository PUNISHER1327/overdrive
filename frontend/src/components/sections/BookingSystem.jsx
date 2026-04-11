import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Phone, CheckCircle2, ChevronRight } from 'lucide-react';
import { API_URL } from '../../config';

const sportsList = ['Football', 'Cricket', 'Badminton', 'Pickleball'];

const getSlotsForDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDay();
  const isWeekend = day === 0 || day === 6; // Sunday = 0, Saturday = 6

  const start = isWeekend ? 6 : 7;
  const end = isWeekend ? 26 : 24; // 24 = 12 AM, 26 = 2 AM (next day)

  const slots = [];
  for (let i = start; i < end; i += 0.5) {
    const hour = Math.floor(i) % 24;
    const minutes = i % 1 === 0 ? "00" : "30";
    slots.push(`${hour < 10 ? '0' : ''}${hour}:${minutes}`);
  }
  return slots;
};

const calculatePrice = (dateString, slot) => {
  if (!slot) return 0;
  const date = new Date(dateString);
  const day = date.getDay();
  const isWeekend = day === 0 || day === 6;
  const hour = parseInt(slot.split(':')[0]);

  let hourlyPrice;
  if (isWeekend) {
    hourlyPrice = hour < 18 && hour >= 6 ? 1350 : 1500;
  } else {
    hourlyPrice = hour < 18 && hour >= 7 ? 1200 : 1350;
  }
  return hourlyPrice / 2;
};

const BookingSystem = () => {
  const [selectedSport, setSelectedSport] = useState(sportsList[0]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({ name: '', phone: '' });
  const [bookingStatus, setBookingStatus] = useState('idle'); // idle, loading, success
  const [bookedSlots, setBookedSlots] = useState([]);

  // Fetch available slots from backend
  useEffect(() => {
     if (!selectedDate) return;
    setBookingStatus('idle');
    setSelectedSlot(null);
    
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${API_URL}/api/bookings/${selectedDate}`);
        if (!response.ok) throw new Error('Failed to fetch bookings');
        const data = await response.json();
        setBookedSlots(data.map(booking => booking.startTime));
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookedSlots([]);
      }
    };

    fetchBookings();
  }, [selectedDate]);

  const handleBooking = async (e) => {
  e.preventDefault();

  if (!selectedSlot || !bookingDetails.name || !bookingDetails.phone) return;

  setBookingStatus('loading');

  try {
    const [h, m] = selectedSlot.split(':').map(Number);
    let endHour = h;
    let endMinute = m + 30;
    if (endMinute >= 60) {
      endHour = (endHour + 1) % 24;
      endMinute = 0;
    }
    const endTime = `${endHour < 10 ? '0' : ''}${endHour}:${endMinute === 0 ? '00' : '30'}`;

    const data = {
      name: bookingDetails.name,
      phone: bookingDetails.phone,
      date: selectedDate,
      startTime: selectedSlot,
      endTime: endTime,
      amount: calculatePrice(selectedDate, selectedSlot),
    };

    // ✅ CALL CREATE ORDER
    const res = await fetch(`${API_URL}/api/payment/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message);
    }

    const { order, bookingId } = await res.json();

    // ✅ OPEN PAYMENT POPUP
    openRazorpay(order, bookingId);

  } catch (error) {
    console.error("Error:", error);
    alert(error.message);
    setBookingStatus('idle');
  }
};

const openRazorpay = (order, bookingId) => {
  const options = {
    key: "rzp_test_SZAcyYhkLxcojR",
    amount: order.amount,
    currency: "INR",
    order_id: order.id,

    method: {
      upi: true,
    },

    // ✅ SUCCESS CASE
    handler: async function (response) {
      try {
        const verifyRes = await fetch(`${API_URL}/api/payment/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...response,
            bookingId,
          }),
        });

        if (!verifyRes.ok) throw new Error("Payment verification failed");

        setBookingStatus("success");
        setBookedSlots(prev => [...prev, bookingId.startTime]);

      } catch (error) {
        console.error(error);
        alert("Payment verification failed");
        setBookingStatus("idle");
      }
    },

    // ✅ CANCEL / CLOSE CASE
    modal: {
  ondismiss: async function () {
    await fetch(`${API_URL}/api/payment/cancel/${bookingId}`, {
      method: "DELETE",
    });

    setBookingStatus("idle");
  }
}
  };

  const rzp = new window.Razorpay(options);

  // ✅ FAILURE CASE
  rzp.on("payment.failed", async function () {
  await fetch(`${API_URL}/api/payment/cancel/${bookingId}`, {
    method: "DELETE",
  });

  setBookingStatus("idle");
});

  rzp.on("payment.failed", function (response) {
    console.log("Payment Failed:", response.error);

    alert("Payment failed. Please try again.");

    setBookingStatus("idle");
  });

  rzp.open();
};

  const resetBooking = () => {
    setBookingStatus('idle');
    setSelectedSlot(null);
    setBookingDetails({ name: '', phone: '' });
    // Keep date and sport same
  };

  return (
    <section id="book" className="relative py-24 md:py-32 bg-black overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-black to-black border-t border-white/5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-10 relative z-10 max-w-6xl">
        <div className="mb-16 text-center md:text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-bebas text-6xl md:text-8xl text-white tracking-widest uppercase"
          >
            Book Your <span className="text-primary">Slot</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-dm text-white/60 text-lg max-w-xl mt-4"
          >
            Select your sport, pick a time, and secure your arena in seconds. Real-time availability from 6 AM to 2 AM.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Configuration */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-[#111111] border border-white/5 rounded-[2rem] p-6 text-xl lg:p-10 text-white"
          >
            {bookingStatus === 'success' ? (
              <div className="flex flex-col items-center justify-center text-center py-16 h-full min-h-[400px]">
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                   <CheckCircle2 className="w-12 h-12 text-primary" />
                </div>
                <h3 className="font-bebas text-5xl tracking-wide mb-2">Booking Confirmed!</h3>
                <p className="font-dm text-white/50 mb-8 max-w-md">
                  Your {selectedSport} slot for {selectedDate} at {selectedSlot} has been successfully reserved. We'll see you at the arena.
                </p>
                <button 
                  onClick={resetBooking}
                  className="px-8 py-3 bg-white text-black font-dm font-bold tracking-widest uppercase text-sm rounded-full hover:bg-primary transition-colors"
                >
                  Book Another Slot
                </button>
              </div>
            ) : (
              <div className="space-y-10">
                {/* 1. Sport Selection */}
                <div>
                  <h3 className="font-bebas tracking-wide text-2xl text-white/90 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">1</span> 
                    Select Sport
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {sportsList.map(sport => (
                      <button
                        key={sport}
                        onClick={() => setSelectedSport(sport)}
                        className={`py-3 px-4 rounded-xl border transition-all text-sm font-dm font-bold ${
                          selectedSport === sport 
                          ? 'border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(var(--color-primary),0.2)]' 
                          : 'border-white/10 bg-black/40 text-white/60 hover:border-white/30 hover:text-white'
                        }`}
                      >
                        {sport}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Date Selection */}
                <div>
                  <h3 className="font-bebas tracking-wide text-2xl text-white/90 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">2</span> 
                    Choose Date
                  </h3>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input 
                      type="date" 
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white font-dm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-medium [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* 3. Time Slots */}
                <div>
                  <h3 className="font-bebas tracking-wide text-2xl text-white/90 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">3</span> 
                    Available Slots (30min)
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {getSlotsForDate(selectedDate).map(slot => {
                      const isBooked = bookedSlots.includes(slot);
                      return (
                        <button
                          key={slot}
                          disabled={isBooked}
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-3 flex items-center justify-center gap-2 rounded-xl border transition-all font-dm font-bold text-sm ${
                            isBooked 
                              ? 'opacity-30 border-white/5 bg-black text-white/50 cursor-not-allowed'
                              : selectedSlot === slot
                                ? 'border-primary bg-primary text-black'
                                : 'border-white/10 bg-black/40 text-white/80 hover:border-white/30 hover:bg-white/5'
                          }`}
                        >
                          <Clock className={`w-3.5 h-3.5 ${selectedSlot === slot && !isBooked ? 'text-black' : 'text-primary'}`} />
                          {slot}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Column: Checkout Form */}
          <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="lg:col-span-5 relative"
          >
            <div className="sticky top-32 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-[2rem] p-6 lg:p-8 overflow-hidden">
               {/* Decorative glow */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px]"></div>

               <h3 className="font-bebas text-4xl text-white tracking-wider mb-6">Booking Details</h3>
               
               {/* Order Summary box */}
               <div className="bg-black/50 border border-white/5 rounded-xl p-5 mb-8">
                 <div className="flex justify-between items-end pb-4 border-b border-white/5 mb-4">
                    <div>
                      <div className="text-white/40 font-dm text-xs uppercase tracking-widest font-bold mb-1">Sport</div>
                      <div className="text-white font-bebas text-2xl tracking-wide">{selectedSport}</div>
                    </div>
                    <div className="text-right">
                       <div className="text-primary font-dm text-xl font-bold">₹{calculatePrice(selectedDate, selectedSlot)}</div>
                       <div className="text-white/30 font-dm text-[10px] uppercase font-bold">Per Slot</div>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-white/40 font-dm text-xs uppercase tracking-widest font-bold mb-1">Date</div>
                      <div className="text-white font-dm text-sm font-medium">{new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})}</div>
                    </div>
                    <div>
                      <div className="text-white/40 font-dm text-xs uppercase tracking-widest font-bold mb-1">Time</div>
                      <div className="text-white font-dm text-sm font-medium">{selectedSlot ? `${selectedSlot} - ${(() => {
                        const [h, m] = selectedSlot.split(':').map(Number);
                        let eh = h;
                        let em = m + 30;
                        if (em >= 60) { eh = (eh + 1) % 24; em = 0; }
                        return `${eh < 10 ? '0' : ''}${eh}:${em === 0 ? '00' : '30'}`;
                      })()}` : 'Not selected'}</div>
                    </div>
                 </div>
               </div>

               <form onSubmit={handleBooking} className="space-y-4">
                 <div className="group relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-primary transition-colors" />
                    <input 
                      type="text" 
                      required
                      placeholder="Your Full Name"
                      value={bookingDetails.name}
                      onChange={(e) => setBookingDetails({...bookingDetails, name: e.target.value})}
                      disabled={bookingStatus !== 'idle'}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white font-dm placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-medium"
                    />
                 </div>
                 <div className="group relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-primary transition-colors" />
                    <input 
                      type="tel" 
                      required
                      placeholder="Phone Number"
                      value={bookingDetails.phone}
                      onChange={(e) => setBookingDetails({...bookingDetails, phone: e.target.value})}
                      disabled={bookingStatus !== 'idle'}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white font-dm placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-medium"
                    />
                 </div>

                 <button
                   type="submit"
                   disabled={!selectedSlot || bookingStatus !== 'idle'}
                   className={`w-full relative overflow-hidden group flex items-center justify-center mt-8 py-4 rounded-xl font-dm font-bold uppercase tracking-widest text-sm transition-all shadow-lg ${
                     !selectedSlot 
                       ? 'bg-white/5 text-white/40 cursor-not-allowed'
                       : 'bg-primary text-black hover:bg-white'
                   }`}
                 >
                    {bookingStatus === 'loading' ? (
                       <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                       </svg>
                    ) : (
                      <>
                        Confirm Booking
                        {selectedSlot && <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                      </>
                    )}
                 </button>
                 {!selectedSlot && bookingStatus === 'idle' && (
                    <p className="text-center font-dm text-xs text-primary mt-3 opacity-80">
                      Please select a time slot to continue
                    </p>
                 )}
               </form>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BookingSystem;
