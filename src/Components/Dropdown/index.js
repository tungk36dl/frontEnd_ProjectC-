import React from "react";

const classOptions = ["Tất cả", "12A1", "12A2", "11B1", "12A3"];

function Dropdown({ selectedClass, onClassChange }) {
  return (
    <div style={{ minWidth: "150px", marginBottom: "10px" }}>
      <label style={{ display: "block", marginBottom: "5px" }}>
        Lọc theo lớp:
      </label>
      <select
        value={selectedClass}
        onChange={(e) => onClassChange(e.target.value)}
        style={{
          width: "100%",
          padding: "5px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      >
        {classOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
