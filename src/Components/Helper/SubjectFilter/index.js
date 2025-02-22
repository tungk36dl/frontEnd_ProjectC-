import { useEffect, useState } from "react";
import SERVER_URL from "../../../Constant";

// Component mới SubjectFilter.js
export function SubjectFilter({ selectedSubject, onChangeSubject }) {
    const [subject, setSubject] = useState([]);
    const jwtToken = localStorage.getItem("jwtToken");
  
    useEffect(() => {
      const fetchSubject = async () => {
        try {
          const response = await fetch(`${SERVER_URL}/get-all-subject`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ pageIndex: 0, pageSize: 10000, keyword: "" }),
          });
          if (!response.ok) throw new Error("Failed to fetch subject");
          const data = await response.json();
          setSubject(data.data || []);
          onChangeSubject(data.data.length > 0 ? data.data[0].id : "");
        } catch (error) {
          console.error("Error fetching subject:", error);
        }
      };
      fetchSubject();
    }, []);
  
    return (
      <div style={{ marginBottom: "20px" }}>
        <select value={selectedSubject} onChange={(e) => onChangeSubject(e.target.value)}>
        <option disabled value="">Select Subject</option>
          {subject.map((option) => (
            <option key={option.id} value={option.id}>
              {option.subjectName}
            </option>
          ))}
        </select>
      </div>
    );
  }