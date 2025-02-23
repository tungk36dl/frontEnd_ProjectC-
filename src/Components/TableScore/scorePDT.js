import React, { useEffect, useState } from "react";
import SERVER_URL from "../../Constant";
import { ClassFilter } from "../Helper/ClassFilter";
import { SubjectFilter } from "../Helper/SubjectFilter";

const StudentScoreForm = ({ reload }) => {
  const [students, setStudents] = useState([]);
  const [updatedScores, setUpdatedScores] = useState([]); // Lưu danh sách sinh viên đã chỉnh sửa điểm
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const jwtToken = localStorage.getItem("jwtToken");

  // Hàm gọi API lấy danh sách sinh viên
  const getStudents = async (classId, subjectId) => {
    if (!classId || !subjectId) return;
    try {
      const response = await fetch(`${SERVER_URL}/get-score-by-pdt`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ClassesId: classId,
          SubjectId: subjectId,
          keyword: "",
          pageIndex: 0,
          pageSize: 10000,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch students");
      const data = await response.json();
      setStudents(data || []);
      setUpdatedScores([]); // Reset danh sách điểm chỉnh sửa
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Gọi API khi class hoặc subject thay đổi
  useEffect(() => {
    if (selectedClass && selectedSubject) {
      getStudents(selectedClass, selectedSubject);
    }
  }, [selectedClass, selectedSubject, reload]);

  // Xử lý thay đổi điểm chuyên cần và điểm thi
  const handleChange = (studentId, field, value) => {
    const newValue = value ? parseFloat(value) : 0;
    
    // Cập nhật điểm trong danh sách sinh viên
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId ? { ...student, [field]: newValue } : student
      )
    );

    // Kiểm tra nếu sinh viên đã có trong danh sách cập nhật
    setUpdatedScores((prevScores) => {
      const existingIndex = prevScores.findIndex((s) => s.Id === studentId);
      if (existingIndex !== -1) {
        // Nếu đã có, cập nhật giá trị
        const updatedList = [...prevScores];
        updatedList[existingIndex] = { ...updatedList[existingIndex], [field]: newValue };
        return updatedList;
      } else {
        // Nếu chưa có, thêm mới vào danh sách cập nhật
        return [
          ...prevScores,
          {
            Id: studentId,
            UserId: students.find((s) => s.id === studentId)?.userId || "",
            SubjectDetailId: students.find((s) => s.id === studentId)?.subjectDetailId || "",
            AttendanceScore: field === "attendanceScore" ? newValue : students.find((s) => s.id === studentId)?.attendanceScore || 0,
            TestScore: field === "testScore" ? newValue : students.find((s) => s.id === studentId)?.testScore || 0,
          },
        ];
      }
    });
  };

  // Gửi dữ liệu đã chỉnh sửa lên API
  const handleSubmit = async () => {
    if (updatedScores.length === 0) {
      alert("Không có dữ liệu để cập nhật.");
      return;
    }

    try {
      const response = await fetch(`${SERVER_URL}/update-score-by-teacher`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedScores),
      });

      if (!response.ok) throw new Error("Lỗi cập nhật điểm");
      alert("Cập nhật điểm thành công!");
      getStudents(selectedClass, selectedSubject); // Load lại dữ liệu sau khi cập nhật
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Cập nhật điểm thất bại!");
    }
  };

  return (
    <div>
      <h2>Nhập điểm sinh viên</h2>
      <div>
        <label style={{ marginRight: "10px" }}>Lọc theo lớp:</label>
        <ClassFilter
          selectedClass={selectedClass}
          onChangeClass={(value) => setSelectedClass(value)}
        />
      </div>
      <div>
        <label style={{ marginRight: "10px" }}>Lọc theo môn học:</label>
        <SubjectFilter
          selectedSubject={selectedSubject}
          onChangeSubject={(value) => setSelectedSubject(value)}
        />
      </div>

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
            <tr key={student.id}>
              <td>{student.code}</td>
              <td>{student.fullName}</td>
              <td>
                <input
                  type="text"
                  min="0"
                  max="10"
                  value={student.attendanceScore ?? ""}
                  onChange={(e) =>
                    handleChange(student.id, "attendanceScore", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  min="0"
                  max="10"
                  value={student.testScore ?? ""}
                  onChange={(e) =>
                    handleChange(student.id, "testScore", e.target.value)
                  }
                />
              </td>
              <td>{student.finalScore ?? "N/A"}</td>
              <td>{student.letterGrades ?? "N/A"}</td>
              <td>{student.gpa ?? "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default StudentScoreForm;
