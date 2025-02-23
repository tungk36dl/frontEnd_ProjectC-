import React, { useEffect, useState } from "react";
import { ClassFilter } from "../Helper/ClassFilter";
import { SubjectFilter } from "../Helper/SubjectFilter";

const ScoreStudent = ({ reload }) => {
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  
  const jwtToken = localStorage.getItem("jwtToken");

  const getStudents = async () => {
    try {
      const response = await fetch("https://localhost:7024/get-score-by-student", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageIndex: 0,
          pageSize: 0,
          keyword: ""
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch students");
      const data = await response.json();
      setStudents(data || []);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    getStudents();
  }, [reload]);

  return (
    <div>
      <h2>Danh sách điểm sinh viên</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Mã sinh viên</th>
            <th>Họ và tên</th>
            <th>Môn học</th>
            <th>Kỳ học</th>
            <th>Tín chỉ</th>
            <th>Điểm chuyên cần</th>
            <th>Điểm thi</th>
            <th>Điểm tổng</th>
            <th>Điểm chữ</th>
            <th>GPA</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.code}</td>
              <td>{student.fullName}</td>
              <td>{student.subjectName}</td>
              <td>{student.semesterName ?? "N/A"}</td>
              <td>{student.credits}</td>
              <td>{student.attendanceScore ?? "N/A"}</td>
              <td>{student.testScore ?? "N/A"}</td>
              <td>{student.finalScore ?? "N/A"}</td>
              <td>{student.letterGrades ?? "N/A"}</td>
              <td>{student.gpa ?? "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreStudent;
