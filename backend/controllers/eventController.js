const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  const { description, startTime, endTime, invitees } = req.body;
  try {
    const event = new Event({ 
      description, 
      startTime, 
      endTime, 
      user: req.user.id, 
      invitees 
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({ user: req.user.id })
      .populate('invitees', 'username email');
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateEvent = async (req, res) => {
  const { description, startTime, endTime, invitees } = req.body;
  try {
    let event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    if (event.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }
    event.description = description || event.description;
    event.startTime = startTime || event.startTime;
    event.endTime = endTime || event.endTime;
    event.invitees = invitees || event.invitees;

    await event.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    if (event.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }
    await event.deleteOne();
    res.json({ msg: 'Event removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
