import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/records.css";

const MachineList = () => {
  const [machines, setMachines] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchMachines();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Machine List</h2>
      <table className="machine-table">
        <thead>
          <tr>
            <th>Machine Name</th>
            <th>Machine Code</th>
            <th>Serial No</th>
            <th>Vault Approval No</th>
            <th>License Number</th>
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
              {/* Add more columns for other data */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MachineList;
