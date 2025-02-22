import React, { useEffect, useState } from "react";

const SERVER_URL = "http://localhost:7024";

const StudentScoreForm = () => {
  const [students, setStudents] = useState([]);
  const className = "Lớp ABC"; // Lớp có sẵn
  const subject = "Môn XYZ"; // Môn học có sẵn
  const semester = "Học kì 1"; // Học kỳ có sẵn

  useEffect(() => {
    // Gọi API lấy danh sách sinh viên
    fetch(`${SERVER_URL}/get-student`)
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Lỗi tải danh sách sinh viên:", error));
  }, []);

  // Xử lý thay đổi điểm chuyên cần và điểm thi
  const handleChange = (studentId, field, value) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.studentId === studentId ? { ...student, [field]: value } : student
      )
    );
  };

  // Gửi dữ liệu đã chỉnh sửa lên API
  const handleSubmit = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/update-score-student`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(students),
      });

      if (!response.ok) throw new Error("Lỗi cập nhật điểm");
      alert("Cập nhật điểm thành công!");
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Cập nhật điểm thất bại!");
    }
  };

  return (
    <div>
      <h2>Nhập điểm sinh viên</h2>
      <p><strong>Lớp:</strong> {className}</p>
      <p><strong>Môn học:</strong> {subject}</p>
      <p><strong>Học kỳ:</strong> {semester}</p>

      <table border="1">
        <thead>
          <tr>
            <th>Mã sinh viên</th>
            <th>Họ và tên</th>
            <th>Điểm chuyên cần</th>
            <th>Điểm thi</th>
            <th>Điểm tổng</th>
            <th>Điểm chữ</th>
            <th>GPA</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentId}>
              <td>{student.studentId}</td>
              <td>{student.fullName}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={student.attendance || ""}
                  onChange={(e) =>
                    handleChange(student.studentId, "attendance", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={student.exam || ""}
                  onChange={(e) =>
                    handleChange(student.studentId, "exam", e.target.value)
                  }
                />
              </td>
              <td>{student.totalScore}</td>
              <td>{student.letterGrade}</td>
              <td>{student.gpa}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default StudentScoreForm;
