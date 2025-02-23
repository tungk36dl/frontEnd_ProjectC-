import { useEffect, useState } from "react";
import SERVER_URL from "../../../Constant";

// Component mới SubjectDetailFilter.js
export function SubjectDetailFilter({ selectedSubjectDetail, onChangeSubjectDetail }) {
    const [subjectDetail, setSubjectDetail] = useState([]);
    const jwtToken = localStorage.getItem("jwtToken");
  
    useEffect(() => {
      const fetchSubjectDetail = async () => {
        try {
            const response = await fetch(SERVER_URL + "/get-subject-by-teacher", {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${jwtToken}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  pageIndex: 0,
                  pageSize: 10000,
                  keyword: "",
                }),
              });
          if (!response.ok) throw new Error("Failed to fetch subjectDetail");
          const data = await response.json();
          setSubjectDetail(data || []);
          onChangeSubjectDetail(data.length > 0 ? data.data[0].id : "");
        } catch (error) {
          console.error("Error fetching subjectDetail:", error);
        }
      };
      fetchSubjectDetail();
    }, []);
  
    return (
      <div style={{ marginBottom: "20px" }}>
        <select value={selectedSubjectDetail} onChange={(e) => onChangeSubjectDetail(e.target.value)}>
        <option disabled value="">Select SubjectDetail</option>

          {subjectDetail.map((option) => (
            <option key={option.subjectDetailId} value={option.subjectDetailId}>
              {option.className} - (MGV: {option.subjectName} )
            </option>
          ))}
        </select>
      </div>
    );
  }