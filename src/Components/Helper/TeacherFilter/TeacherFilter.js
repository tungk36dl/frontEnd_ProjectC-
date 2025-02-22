import { useEffect, useState } from "react";
import SERVER_URL from "../../../Constant";

// Component mới TeacherFilter.js
export function TeacherFilter({ selectedTeacher, onChangeTeacher }) {
    const [teacher, setTeacher] = useState([]);
    const jwtToken = localStorage.getItem("jwtToken");
  
    useEffect(() => {
      const fetchTeacher = async () => {
        try {
            const response = await fetch(SERVER_URL + "/get-users-by-rolename", {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${jwtToken}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  pageIndex: 0, // Nếu backend bắt đầu từ 1, thử pageIndex + 1
                  pageSize: 10000,
                  keyword: "",
                  roleName: "teacher",
                }),
              });
          if (!response.ok) throw new Error("Failed to fetch teacher");
          const data = await response.json();
          setTeacher(data.data || []);
          onChangeTeacher(data.data.length > 0 ? data.data[0].id : "");
        } catch (error) {
          console.error("Error fetching teacher:", error);
        }
      };
      fetchTeacher();
    }, []);
  
    return (
      <div style={{ marginBottom: "20px" }}>
        <select value={selectedTeacher} onChange={(e) => onChangeTeacher(e.target.value)}>
        <option disabled value="">Select Teacher</option>

          {teacher.map((option) => (
            <option key={option.userId} value={option.userId}>
              {option.fullName} - (MGV: {option.code} )
            </option>
          ))}
        </select>
      </div>
    );
  }