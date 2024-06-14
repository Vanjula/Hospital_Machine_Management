var mongoose = require('mongoose');

// Machine Schema
var MachineSchema = mongoose.Schema({
    machine_name: {
        type: String,
        
        maxlength: 200
    },
    machine_code: {
        type: String,
        
        maxlength: 200
    },
    serial_no: {
        type: String,
        
        maxlength: 50
    },
    vault_approval_no: {
        type: String,
        
        maxlength: 200
    },
    vault_approval_date: {
        type: Date,
    },
    vault_approval_document: {
        type: Buffer,
    },
    license_number: {
        type: String,
        
        maxlength: 200
    },
    license_document: {
        type: Buffer,
    },
    license_validity: {
        type: Date,
    },
    first_clinic_approval_date: {
        type: Date,
    },
    clinic_approval_from: {
        type: Date,
    },
    clinic_approval_to: {
        type: Date,
        
        validate: {
            validator: function(value) {
                return value > this.clinic_approval_from;
            },
            message: 'Clinic approval "to" date must be greater than "from" date.'
        }
    },
    uptime_weekdays: {
        type: Number,
        
        max: 170
    },
    uptime_saturday: {
        type: Number,
        
        max: 170
    },
    contract_from: {
        type: Date,
    },
    contract_to: {
        type: Date,
        
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
    },
    treatment_type_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TreatmentType',
    },
    machine_type_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MachineType',
    },
    machine_protocol_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MachineProtocol',
    },
    preventive_maintenance_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PreventiveMaintenance',
    },
    photon_ff_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PhotonFF',
    },
    photon_fff_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PhotonFFF',
    },
    electron_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Electron',
    },
    brachy_source_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BrachySource',
    },
    machine_model_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MachineModel',
    }
});

var Machine = module.exports = mongoose.model('Machine', MachineSchema);
