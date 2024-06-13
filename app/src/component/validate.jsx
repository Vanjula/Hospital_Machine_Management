import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  machine_name: Yup.string().max(200).required("Machine name is required"),
  machine_code: Yup.string().max(200).required("Machine code is required"),
  serial_no: Yup.string().max(50).required("Serial number is required"),
  vault_approval_no: Yup.string()
    .max(200)
    .required("Vault approval number is required"),
  vault_approval_date: Yup.date().required("Vault approval date is required"),
  vault_approval_document: Yup.mixed().required(
    "Vault approval document is required"
  ),
  license_number: Yup.string().max(200).required("License number is required"),
  license_document: Yup.mixed().required("License document is required"),
  license_validity: Yup.date().required("License validity date is required"),
  first_clinic_approval_date: Yup.date().required(
    "First clinic approval date is required"
  ),
  clinic_approval_from: Yup.date().required(
    "Clinic approval from date is required"
  ),
  clinic_approval_to: Yup.date()
    .required("Clinic approval to date is required")
    .when(
      "clinic_approval_from",
      (clinic_approval_from, schema) =>
        clinic_approval_from &&
        schema.min(
          clinic_approval_from,
          'Clinic approval "to" date must be greater than "from" date.'
        )
    ),
  uptime_weekdays: Yup.number()
    .max(170)
    .required("Uptime weekdays is required"),
  uptime_saturday: Yup.number()
    .max(170)
    .required("Uptime Saturday is required"),
  contract_from: Yup.date().required("Contract from date is required"),
  contract_to: Yup.date()
    .required("Contract to date is required")
    .when(
      "contract_from",
      (contract_from, schema) =>
        contract_from &&
        schema.min(
          contract_from,
          'Contract "to" date must be greater than "from" date.'
        )
    ),
  hospital_id: Yup.string().required("Hospital is required"),
  treatment_type_id: Yup.string().required("Treatment type is required"),
  machine_type_id: Yup.string().required("Machine type is required"),
  machine_protocol_id: Yup.string().required("Machine protocol is required"),
  preventive_maintenance_id: Yup.string().required(
    "Preventive maintenance is required"
  ),
  photon_ff_id: Yup.string().required("Photon FF is required"),
  photon_fff_id: Yup.string().required("Photon FFF is required"),
  electron_id: Yup.string().required("Electron is required"),
  brachy_source_id: Yup.string().required("Brachy source is required"),
  machine_model_id: Yup.string().required("Machine model is required"),
});
