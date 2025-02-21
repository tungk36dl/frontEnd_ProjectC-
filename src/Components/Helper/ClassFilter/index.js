import { useEffect, useState } from "react";
import SERVER_URL from "../../../Constant";

// Component mới ClassFilter.js
export function ClassFilter({ selectedClass, onChangeClass }) {
    const [classes, setClasses] = useState([]);
    const jwtToken = localStorage.getItem("jwtToken");
  
    useEffect(() => {
      const fetchClasses = async () => {
        try {
          const response = await fetch(`${SERVER_URL}/get-all-classes`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ pageIndex: 0, pageSize: 0, keyword: "" }),
          });
          if (!response.ok) throw new Error("Failed to fetch classes");
          const data = await response.json();
          setClasses(data.data || []);
          onChangeClass(data.data.length > 0 ? data.data[0].id : "");
        } catch (error) {
          console.error("Error fetching classes:", error);
        }
      };
      fetchClasses();
    }, []);
  
    return (
      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px" }}>Lọc theo lớp:</label>
        <select value={selectedClass} onChange={(e) => onChangeClass(e.target.value)}>
          {classes.map((option) => (
            <option key={option.id} value={option.id}>
              {option.classesName}
            </option>
          ))}
        </select>
      </div>
    );
  }