import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send } from 'lucide-react';
import { API_URL } from '../../config';

const SubmitReview = () => {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        try {
            const response = await fetch(`${API_URL}/api/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, comment, rating }),
            });

            if (response.ok) {
                setMessage({ type: 'success', text: 'Thank you! Your review has been sent for moderation.' });
                setName('');
                setComment('');
                setRating(5);
            } else {
                setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Network error. Please check your connection.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="bg-[#0A0A0A] py-24 border-t border-[#1F1F1F]">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="font-bebas text-6xl md:text-7xl text-white tracking-widest mb-4"
                    >
                        LEAVE A <span className="text-primary italic">REVIEW</span>
                    </motion.h2>
                    <p className="font-dm text-white/50 uppercase tracking-[0.3em] text-[10px] font-bold">
                        Share your experience with the Overdrive community.
                    </p>
                </div>

                <motion.form 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    onSubmit={handleSubmit}
                    className="bg-[#111111] p-8 md:p-12 rounded-[2rem] border border-[#1F1F1F] space-y-8"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-3 block">Your Name</label>
                            <input 
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-[#1A1A1A] border-2 border-transparent focus:border-primary/30 text-white px-6 py-4 rounded-xl outline-none transition-all font-dm"
                                placeholder="ALEX JOHNSON"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-3 block">Rating</label>
                            <div className="flex gap-2 bg-[#1A1A1A] p-3 rounded-xl justify-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className="transition-transform active:scale-95"
                                    >
                                        <Star 
                                            size={28} 
                                            className={star <= rating ? "text-primary fill-primary" : "text-white/10"} 
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-3 block">Experience</label>
                        <textarea 
                            required
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows="4"
                            className="w-full bg-[#1A1A1A] border-2 border-transparent focus:border-primary/30 text-white px-6 py-4 rounded-xl outline-none transition-all font-dm resize-none"
                            placeholder="TELL US ABOUT YOUR SESSION..."
                        />
                    </div>

                    {message && (
                        <div className={`p-4 rounded-xl font-dm text-sm text-center ${message.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                            {message.text}
                        </div>
                    )}

                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-black font-bebas text-2xl tracking-widest py-5 rounded-xl hover:bg-white transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        {isSubmitting ? "SUBMITTING..." : (
                            <>
                                SUBMIT FEEDBACK <Send size={20} />
                            </>
                        )}
                    </button>
                </motion.form>
            </div>
        </section>
    );
};

export default SubmitReview;
