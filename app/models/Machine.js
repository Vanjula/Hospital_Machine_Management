var mongoose = require('mongoose');

// Machine Schema
var MachineSchema = mongoose.Schema({
    machine_name: {
        type: String,
        required: true,
        maxlength: 200
    },
    machine_code: {
        type: String,
        required: true,
        maxlength: 200
    },
    serial_no: {
        type: String,
        required: true,
        maxlength: 50
    },
    vault_approval_no: {
        type: String,
        required: true,
        maxlength: 200
    },
    vault_approval_date: {
        type: Date,
        required: true
    },
    vault_approval_document: {
        type: Buffer,
        required: true
    },
    license_number: {
        type: String,
        required: true,
        maxlength: 200
    },
    license_document: {
        type: Buffer,
        required: true
    },
    license_validity: {
        type: Date,
        required: true
    },
    first_clinic_approval_date: {
        type: Date,
        required: true
    },
    clinic_approval_from: {
        type: Date,
        required: true
    },
    clinic_approval_to: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value > this.clinic_approval_from;
            },
            message: 'Clinic approval "to" date must be greater than "from" date.'
        }
    },
    uptime_weekdays: {
        type: Number,
        required: true,
        max: 170
    },
    uptime_saturday: {
        type: Number,
        required: true,
        max: 170
    },
    contract_from: {
        type: Date,
        required: true
    },
    contract_to: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value > this.contract_from;
            },
            message: 'Contract "to" date must be greater than "from" date.'
        }
    },
    hospital_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },
    treatment_type_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TreatmentType',
        required: true
    },
    machine_type_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MachineType',
        required: true
    },
    machine_protocol_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MachineProtocol',
        required: true
    },
    preventive_maintenance_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PreventiveMaintenance',
        required: true
    },
    photon_ff_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PhotonFF',
        required: true
    },
    photon_fff_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PhotonFFF',
        required: true
    },
    electron_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Electron',
        required: true
    },
    brachy_source_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BrachySource',
        required: true
    },
    machine_model_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MachineModel',
        required: true
    }
});

var Machine = module.exports = mongoose.model('Machine', MachineSchema);
