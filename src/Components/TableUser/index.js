import React, { useState, useEffect } from "react";
import SERVER_URL from "../../Constant";
import EditCohort from "../Cohort/EditCohort";
import DeleteCohort from "../Cohort/DeleteCohort";

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
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("https://localhost:7024/get-all-classes", {
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
        setSelectedClass(data.data.length > 0 ? data.data[0].id : ""); // Chọn lớp đầu tiên
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, []);

  const getStudents = async (classId) => {
    try {
      const response = await fetch(SERVER_URL + "/get-users-by-classId", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Id: classId,
          keyword: "",
          pageIndex,
          pageSize,
        }),
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

  const totalPages = Math.ceil(totalItems / pageSize);

  const handleChangeClass = (event) => {
    setSelectedClass(event.target.value);
    setPageIndex(1);
  };

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <h2>Quản lý sinh viên</h2>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px" }}>Lọc theo lớp:</label>
        <select value={selectedClass} onChange={handleChangeClass}>
          {classes.map((option) => (
            <option key={option.id} value={option.id}>
              {option.classesName}
            </option>
          ))}
        </select>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {headCells.map((headCell) => (
              <th
                key={headCell.id}
                style={{ borderBottom: "2px solid #ddd", padding: "10px" }}
              >
                {headCell.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datas.map((row) => (
            <tr key={row.userId}>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {row.code}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {row.fullName}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {row.email}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {row.phone}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {row.address}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {row.age}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {row.className}
              </td>
              <td>
                <EditCohort
                  cohort={row}
                  onReload={() => getStudents(selectedClass)}
                />
                <DeleteCohort
                  cohortId={row.id}
                  onReload={() => getStudents(selectedClass)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableUser;
