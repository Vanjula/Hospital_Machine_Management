import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/records.css";

const MachineList = () => {
  const [machines, setMachines] = useState([]);
  const [error, setError] = useState(null);

  // Define fetchMachines function
  const fetchMachines = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/Machine/machines"
      );
      setMachines(response.data);
    } catch (err) {
      console.error("Error fetching machines:", err);
      setError("Failed to fetch machines");
    }
  };

  useEffect(() => {
    fetchMachines(); // Call fetchMachines inside useEffect
  }, []);

//   const handleDelete = async (machineId) => {
//     try {
//       await axios.delete(
//         `http://localhost:5000/api/Machine/delete/${machineId}`
//       );
//       // After deletion, fetch machines again to update the list
//       fetchMachines();
//     } catch (err) {
//       console.error("Error deleting machine:", err);
//       // Handle delete error if needed
//     }
//   };
const handleDelete = async (machineId) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/Machine/delete/${machineId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if needed
        },
      }
    );
    console.log("Machine deleted successfully:", response.data);
          fetchMachines();

  } catch (error) {
    console.error("Error deleting machine:", error);
  }
};
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Machine List</h2>
      <button className="btn-add">
        <a href="/add-machine">Add Machine</a>
      </button>
      <table className="machine-table">
        <thead>
          <tr>
            <th>Machine Name</th>
            <th>Machine Code</th>
            <th>Serial No</th>
            <th>Vault Approval No</th>
            <th>License Number</th>
            <th>Action</th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>
          {machines.map((machine) => (
            <tr key={machine._id}>
              <td>{machine.machine_name}</td>
              <td>{machine.machine_code}</td>
              <td>{machine.serial_no}</td>
              <td>{machine.vault_approval_no}</td>
              <td>{machine.license_number}</td>
              <td>
                <button
                  onClick={() => handleDelete(machine._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
              {/* Add more columns for other data */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MachineList;
