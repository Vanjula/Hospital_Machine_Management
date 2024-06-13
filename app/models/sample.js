const mongoose = require('mongoose');

const HospitalSchema = mongoose.Schema({
  name: { type: String, required: true }
});

const TreatmentTypeSchema = mongoose.Schema({
  name: { type: String, required: true }
});

const MachineTypeSchema = mongoose.Schema({
  name: { type: String, required: true }
});

const MachineProtocolSchema = mongoose.Schema({
  name: { type: String, required: true }
});

const PreventiveMaintenanceSchema = mongoose.Schema({
  name: { type: String, required: true }
});

const PhotonFFSchema = mongoose.Schema({
  name: { type: String, required: true }
});

const PhotonFFFSchema = mongoose.Schema({
  name: { type: String, required: true }
});

const ElectronSchema = mongoose.Schema({
  name: { type: String, required: true }
});

const BrachySourceSchema = mongoose.Schema({
  name: { type: String, required: true }
});

const MachineModelSchema = mongoose.Schema({
  name: { type: String, required: true }
});

const Hospital = mongoose.model('Hospital', HospitalSchema);
const TreatmentType = mongoose.model('TreatmentType', TreatmentTypeSchema);
const MachineType = mongoose.model('MachineType', MachineTypeSchema);
const MachineProtocol = mongoose.model('MachineProtocol', MachineProtocolSchema);
const PreventiveMaintenance = mongoose.model('PreventiveMaintenance', PreventiveMaintenanceSchema);
const PhotonFF = mongoose.model('PhotonFF', PhotonFFSchema);
const PhotonFFF = mongoose.model('PhotonFFF', PhotonFFFSchema);
const Electron = mongoose.model('Electron', ElectronSchema);
const BrachySource = mongoose.model('BrachySource', BrachySourceSchema);
const MachineModel = mongoose.model('MachineModel', MachineModelSchema);

module.exports = {
  Hospital,
  TreatmentType,
  MachineType,
  MachineProtocol,
  PreventiveMaintenance,
  PhotonFF,
  PhotonFFF,
  Electron,
  BrachySource,
  MachineModel
};
