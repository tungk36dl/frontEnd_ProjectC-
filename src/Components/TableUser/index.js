import React, { useEffect, useState } from "react";
import SERVER_URL from "../../Constant";
import { useNavigate } from "react-router-dom";
import { ClassFilter } from "../Helper/ClassFilter";

const headCells = [
  { id: "code", label: "Code" },
  { id: "name", label: "Tên Sinh Viên" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Số Điện Thoại" },
  { id: "address", label: "Địa Chỉ" },
  { id: "age", label: "Tuổi" },
  { id: "className", label: "Lớp" },
];

function TableUser({ reload }) {
  const [datas, setDatas] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const jwtToken = localStorage.getItem("jwtToken");
  const navigate = useNavigate();

  const getStudents = async (classId) => {
    try {
      const response = await fetch(`${SERVER_URL}/get-users-by-classId`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Id: classId, keyword: "", pageIndex, pageSize }),
      });
      if (!response.ok) throw new Error("Failed to fetch students");
      const data = await response.json();
      setDatas(data || []);
      setTotalItems(data.totalCount || 0);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    if (selectedClass) {
      getStudents(selectedClass);
    }
  }, [pageIndex, pageSize, reload, selectedClass]);

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <h2>Quản lý sinh viên</h2>
      <button onClick={() => navigate("/add-student")}>Add Student</button>
      <ClassFilter
        selectedClass={selectedClass}
        onChangeClass={(value) => {
          setSelectedClass(value);
          setPageIndex(1);
        }}
      />
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {headCells.map((headCell) => (
              <th key={headCell.id} style={{ borderBottom: "2px solid #ddd", padding: "10px" }}>
                {headCell.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datas.map((row) => (
            <tr key={row.userId}>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{row.code}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{row.fullName}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{row.email}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{row.phone}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{row.address}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{row.age}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{row.className}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableUser;