import React, { useState, useEffect } from "react";
import axios from "axios";

const MachineForm = () => {
  const [formData, setFormData] = useState({
    machine_name: "",
    machine_code: "",
    serial_no: "",
    vault_approval_no: "",
    vault_approval_date: "",
    vault_approval_document: null,
    license_number: "",
    license_document: null,
    license_validity: "",
    first_clinic_approval_date: "",
    clinic_approval_from: "",
    clinic_approval_to: "",
    uptime_weekdays: "",
    uptime_saturday: "",
    contract_from: "",
    contract_to: "",
    hospital_id: "",
    treatment_type_id: "",
    machine_type_id: "",
    machine_protocol_id: "",
    preventive_maintenance_id: "",
    photon_ff_id: "",
    photon_fff_id: "",
    electron_id: "",
    brachy_source_id: "",
    machine_model_id: "",
  });

  const [dropdownOptions, setDropdownOptions] = useState({
    hospitals: [],
    treatmentTypes: [],
    machineTypes: [],
    machineProtocols: [],
    preventiveMaintenances: [],
    photonFFs: [],
    photonFFFs: [],
    electrons: [],
    brachySources: [],
    machineModels: [],
  });

  useEffect(() => {
    // Fetch dropdown data from API and set it in the state
    const fetchData = async () => {
      try {
        const [
          hospitals,
          treatmentTypes,
          machineTypes,
          machineProtocols,
          preventiveMaintenances,
          photonFFs,
          photonFFFs,
          electrons,
          brachySources,
          machineModels,
        ] = await Promise.all([
          axios.get("/api/hospitals"),
          axios.get("/api/treatmentTypes"),
          axios.get("/api/machineTypes"),
          axios.get("/api/machineProtocols"),
          axios.get("/api/preventiveMaintenances"),
          axios.get("/api/photonFFs"),
          axios.get("/api/photonFFFs"),
          axios.get("/api/electrons"),
          axios.get("/api/brachySources"),
          axios.get("/api/machineModels"),
        ]);

        setDropdownOptions({
          hospitals: hospitals.data,
          treatmentTypes: treatmentTypes.data,
          machineTypes: machineTypes.data,
          machineProtocols: machineProtocols.data,
          preventiveMaintenances: preventiveMaintenances.data,
          photonFFs: photonFFs.data,
          photonFFFs: photonFFFs.data,
          electrons: electrons.data,
          brachySources: brachySources.data,
          machineModels: machineModels.data,
        });
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataObj = new FormData();
      for (let key in formData) {
        formDataObj.append(key, formData[key]);
      }

      await axios.post("/api/machines", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Machine data submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Machine Name:</label>
        <input
          type="text"
          name="machine_name"
          value={formData.machine_name}
          onChange={handleChange}
          maxLength="200"
          required
        />
      </div>
      <div>
        <label>Machine Code:</label>
        <input
          type="text"
          name="machine_code"
          value={formData.machine_code}
          onChange={handleChange}
          maxLength="200"
          required
        />
      </div>
      <div>
        <label>Serial No:</label>
        <input
          type="text"
          name="serial_no"
          value={formData.serial_no}
          onChange={handleChange}
          maxLength="50"
          required
        />
      </div>
      <div>
        <label>Vault Approval No:</label>
        <input
          type="text"
          name="vault_approval_no"
          value={formData.vault_approval_no}
          onChange={handleChange}
          maxLength="200"
          required
        />
      </div>
      <div>
        <label>Vault Approval Date:</label>
        <input
          type="date"
          name="vault_approval_date"
          value={formData.vault_approval_date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Vault Approval Document:</label>
        <input
          type="file"
          name="vault_approval_document"
          onChange={handleFileChange}
          required
        />
      </div>
      <div>
        <label>License Number:</label>
        <input
          type="text"
          name="license_number"
          value={formData.license_number}
          onChange={handleChange}
          maxLength="200"
          required
        />
      </div>
      <div>
        <label>License Document:</label>
        <input
          type="file"
          name="license_document"
          onChange={handleFileChange}
          required
        />
      </div>
      <div>
        <label>License Validity:</label>
        <input
          type="date"
          name="license_validity"
          value={formData.license_validity}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>First Clinic Approval Date:</label>
        <input
          type="date"
          name="first_clinic_approval_date"
          value={formData.first_clinic_approval_date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Clinic Approval From:</label>
        <input
          type="date"
          name="clinic_approval_from"
          value={formData.clinic_approval_from}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Clinic Approval To:</label>
        <input
          type="date"
          name="clinic_approval_to"
          value={formData.clinic_approval_to}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Uptime Weekdays:</label>
        <input
          type="number"
          name="uptime_weekdays"
          value={formData.uptime_weekdays}
          onChange={handleChange}
          max="170"
          required
        />
      </div>
      <div>
        <label>Uptime Saturday:</label>
        <input
          type="number"
          name="uptime_saturday"
          value={formData.uptime_saturday}
          onChange={handleChange}
          max="170"
          required
        />
      </div>
      <div>
        <label>Contract From:</label>
        <input
          type="date"
          name="contract_from"
          value={formData.contract_from}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Contract To:</label>
        <input
          type="date"
          name="contract_to"
          value={formData.contract_to}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Hospital:</label>
        <select
          name="hospital_id"
          value={formData.hospital_id}
          onChange={handleChange}
          required
        >
          {dropdownOptions.hospitals.map((hospital) => (
            <option key={hospital._id} value={hospital._id}>
              {hospital.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Treatment Type:</label>
        <select
          name="treatment_type_id"
          value={formData.treatment_type_id}
          onChange={handleChange}
          required
        >
          {dropdownOptions.treatmentTypes.map((treatmentType) => (
            <option key={treatmentType._id} value={treatmentType._id}>
              {treatmentType.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Machine Type:</label>
        <select
          name="machine_type_id"
          value={formData.machine_type_id}
          onChange={handleChange}
          required
        >
          {dropdownOptions.machineTypes.map((machineType) => (
            <option key={machineType._id} value={machineType._id}>
              {machineType.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Machine Protocol:</label>
        <select
          name="machine_protocol_id"
          value={formData.machine_protocol_id}
          onChange={handleChange}
          required
        >
          {dropdownOptions.machineProtocols.map((machineProtocol) => (
            <option key={machineProtocol._id} value={machineProtocol._id}>
              {machineProtocol.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Preventive Maintenance:</label>
        <select
          name="preventive_maintenance_id"
          value={formData.preventive_maintenance_id}
          onChange={handleChange}
          required
        >
          {dropdownOptions.preventiveMaintenances.map(
            (preventiveMaintenance) => (
              <option
                key={preventiveMaintenance._id}
                value={preventiveMaintenance._id}
              >
                {preventiveMaintenance.name}
              </option>
            )
          )}
        </select>
      </div>
      <div>
        <label>Photon FF:</label>
        <select
          name="photon_ff_id"
          value={formData.photon_ff_id}
          onChange={handleChange}
          required
        >
          {dropdownOptions.photonFFs.map((photonFF) => (
            <option key={photonFF._id} value={photonFF._id}>
              {photonFF.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Photon FFF:</label>
        <select
          name="photon_fff_id"
          value={formData.photon_fff_id}
          onChange={handleChange}
          required
        >
          {dropdownOptions.photonFFFs.map((photonFFF) => (
            <option key={photonFFF._id} value={photonFFF._id}>
              {photonFFF.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Electron:</label>
        <select
          name="electron_id"
          value={formData.electron_id}
          onChange={handleChange}
          required
        >
          {dropdownOptions.electrons.map((electron) => (
            <option key={electron._id} value={electron._id}>
              {electron.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Brachy Source:</label>
        <select
          name="brachy_source_id"
          value={formData.brachy_source_id}
          onChange={handleChange}
          required
        >
          {dropdownOptions.brachySources.map((brachySource) => (
            <option key={brachySource._id} value={brachySource._id}>
              {brachySource.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Machine Model:</label>
        <select
          name="machine_model_id"
          value={formData.machine_model_id}
          onChange={handleChange}
          required
        >
          {dropdownOptions.machineModels.map((machineModel) => (
            <option key={machineModel._id} value={machineModel._id}>
              {machineModel.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MachineForm;
