import mongoose from 'mongoose';

const competitionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  sport: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  tag: { type: String, default: 'Open' },
  prize: { type: String, required: true },
  img: { type: String, required: true },
}, { timestamps: true });

const Competition = mongoose.model('Competition', competitionSchema);
export default Competition;
