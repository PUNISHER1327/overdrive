import mongoose from 'mongoose';

const analyticsSchema = mongoose.Schema({
  visits: { type: Number, default: 0 },
  bookNowClicks: { type: Number, default: 0 }
});

const Analytics = mongoose.model('Analytics', analyticsSchema);

export default Analytics;
