const Alert = require('../models/Alert');

// GET /alerts?country=&status=&page=&limit=
async function getAlerts(req, res, next) {
  try {
    const { country, status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (country) filter.country = country;
    if (status) filter.status = status;

    const skip = (Math.max(1, parseInt(page)) - 1) * parseInt(limit);
    const docs = await Alert.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit));
    const total = await Alert.countDocuments(filter);
    res.json({ data: docs, meta: { total, page: parseInt(page), limit: parseInt(limit) } });
  } catch (err) {
    next(err);
  }
}

async function createAlert(req, res, next) {
  try {
    const { country, city, visaType } = req.body;
    if (!country || !city || !visaType) return res.status(400).json({ message: 'country, city and visaType are required' });
    const alert = new Alert({ country, city, visaType });
    await alert.save();
    res.status(201).json(alert);
  } catch (err) {
    next(err);
  }
}

async function updateAlert(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const alert = await Alert.findByIdAndUpdate(id, updates, { new: true });
    if (!alert) return res.status(404).json({ message: 'Alert not found' });
    res.json(alert);
  } catch (err) {
    next(err);
  }
}

async function deleteAlert(req, res, next) {
  try {
    const { id } = req.params;
    const alert = await Alert.findByIdAndDelete(id);
    if (!alert) return res.status(404).json({ message: 'Alert not found' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = { getAlerts, createAlert, updateAlert, deleteAlert };
