import Competition from "../models/Competition.js";

// @desc    Get all competitions
// @route   GET /api/competitions
// @access  Public
export const getCompetitions = async (req, res) => {
  try {
    const competitions = await Competition.find().sort({ createdAt: -1 });
    res.json(competitions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a competition
// @route   POST /api/competitions
// @access  Private/Admin
export const createCompetition = async (req, res) => {
  try {
    const { title, sport, date, location, tag, prize, img } = req.body;
    
    const competition = new Competition({
      title,
      sport,
      date,
      location,
      tag,
      prize,
      img
    });

    const createdCompetition = await competition.save();
    res.status(201).json(createdCompetition);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a competition
// @route   DELETE /api/competitions/:id
// @access  Private/Admin
export const deleteCompetition = async (req, res) => {
  try {
    const competition = await Competition.findById(req.params.id);

    if (competition) {
      await Competition.deleteOne({ _id: req.params.id });
      res.json({ message: 'Competition removed' });
    } else {
      res.status(404).json({ message: 'Competition not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Update a competition
// @route   PUT /api/competitions/:id
// @access  Private/Admin
export const updateCompetition = async (req, res) => {
  try {
    const { title, sport, date, location, tag, prize, img } = req.body;
    const competition = await Competition.findById(req.params.id);

    if (competition) {
      competition.title = title || competition.title;
      competition.sport = sport || competition.sport;
      competition.date = date || competition.date;
      competition.location = location || competition.location;
      competition.tag = tag || competition.tag;
      competition.prize = prize || competition.prize;
      competition.img = img || competition.img;

      const updatedCompetition = await competition.save();
      res.json(updatedCompetition);
    } else {
      res.status(404).json({ message: 'Competition not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
