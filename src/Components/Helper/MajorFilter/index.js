import { useEffect, useState } from "react";
import SERVER_URL from "../../../Constant";

// Component mới MajorFilter.js
export function MajorFilter({ selectedMajor, onChangeMajor }) {
    const [major, setMajor] = useState([]);
    const jwtToken = localStorage.getItem("jwtToken");
  
    useEffect(() => {
      const fetchMajor = async () => {
        try {
          const response = await fetch(`${SERVER_URL}/get-all-major`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ pageIndex: 0, pageSize: 10000, keyword: "" }),
          });
          if (!response.ok) throw new Error("Failed to fetch major");
          const data = await response.json();
          setMajor(data.data || []);
          onChangeMajor(data.data.length > 0 ? data.data[0].id : "");
        } catch (error) {
          console.error("Error fetching major:", error);
        }
      };
      fetchMajor();
    }, []);
  
    return (
      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px" }}>Lọc theo lớp:</label>
        <select value={selectedMajor} onChange={(e) => onChangeMajor(e.target.value)}>
          {major.map((option) => (
            <option key={option.id} value={option.id}>
              {option.majorName}
            </option>
          ))}
        </select>
      </div>
    );
  }