const mongoose = require('mongoose');

const appointmentsSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'clients', required: true }, 
  employes: { type: mongoose.Schema.Types.ObjectId, ref: 'employes', required: true },
});

const Appointments = mongoose.model('appointments', appointmentsSchema);

module.exports = Appointments;