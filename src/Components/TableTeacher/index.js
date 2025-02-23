import React, { useState, useMemo, useEffect } from "react";

import SERVER_URL from "../../Constant";
import EditCohort from "../Cohort/EditCohort";
import DeleteCohort from "../Cohort/DeleteCohort";
import { useNavigate } from "react-router-dom";

import "./TableTeacher.css";




const headCells = [
  { id: "code", label: "Code" },
  { id: "fullName", label: "Tên Giảng viên" },
  { id: "userName", label: "UserName" },
  { id: "dateOfBirth", label: "Năm sinh" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Số Điện Thoại" },
  { id: "address", label: "Địa Chỉ" },
];

function TableTeacher({ reload }) {
  const [datas, setDatas] = useState([]);

   const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalItems, setTotalItems] = useState(0);

    const navigate = useNavigate();


  //   const [order, setOrder] = useState("asc");
  // const [orderBy, setOrderBy] = useState("name");
  // const [selectedClass, setSelectedClass] = useState("Tất cả");
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);


  const getTeachers = async () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");

      const response = await fetch(SERVER_URL + "/get-users-by-rolename", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageIndex: pageIndex, // Nếu backend bắt đầu từ 1, thử pageIndex + 1
          pageSize: pageSize,
          keyword: "",
          roleName: "teacher",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cohorts");
      }

      const data = await response.json();
      console.log("API Response:", data); // Debug dữ liệu API

      setDatas(data.data || []);
      setTotalItems(data.totalCount || 0);
    } catch (error) {
      console.error("Error fetching teacher:", error);
    }
  };

  // 🔹 Gọi API khi pageIndex hoặc pageSize thay đổi
    useEffect(() => {
      getTeachers();
    }, [pageIndex, pageSize, reload]);
  
    const totalPages = Math.ceil(totalItems / pageSize);
  
    const handlePageChange = (newPage) => {
      if (newPage >= 0 && newPage <= totalPages) {
        setPageIndex(newPage);
      }
    };

    const handlePageSizeChange = (event) => {
      setPageSize(parseInt(event.target.value));
      setPageIndex(0); // Reset về trang đầu khi thay đổi số hàng
    };

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <h2>Quản lý Giảng viên</h2>
      <button onClick={() => navigate("/add-teacher")}>Add Teacher</button>

      {/* <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px" }}>Lọc theo lớp:</label>
        <select value={selectedClass} onChange={handleChangeClass}>
          {classOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div> */}

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {headCells.map((headCell) => (
              <th
                key={headCell.id}
                // onClick={() => handleRequestSort(headCell.id)}
                style={{
                  cursor: "pointer",
                  borderBottom: "2px solid #ddd",
                  
                }}
              >
                {headCell.label}
                {/* {orderBy === headCell.id ? (
                  order === "asc" ? (
                    <span> ▲</span>
                  ) : (
                    <span> ▼</span>
                  )
                ) : null} */}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datas.map((row) => (
            <tr key={row.id}>
              <td style={{  borderBottom: "1px solid #ddd" }}>
                {row.code}
              </td>
              <td style={{  borderBottom: "1px solid #ddd" }}>
                {row.fullName}
              </td>
              <td style={{  borderBottom: "1px solid #ddd" }}>
                {row.userName}
              </td>
              <td style={{  borderBottom: "1px solid #ddd" }}>
                {row.dateOfBith}
              </td>
              <td style={{  borderBottom: "1px solid #ddd" }}>
                {row.email}
              </td>
              <td style={{  borderBottom: "1px solid #ddd" }}>
                {row.phoneNumber}
              </td>
              <td style={{  borderBottom: "1px solid #ddd" }}>
                {row.address}
              </td>
             

              {/* <td className="cohort-td">
                  <EditStudent cohort={row} onReload={getTeachers} />
                  <DeleteStudent cohortId={row.id} onReload={getTeachers} />
                </td> */}
            </tr>
          ))}
        </tbody>
      </table>

       {/* Phân trang */}
       {/* <div className="pagination">
        <span>Rows per page: </span>
        <select
          className="RowsPerPage"
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
        <button
          onClick={() => handlePageChange(pageIndex - 1)}
          disabled={pageIndex === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span>
          Page {pageIndex} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(pageIndex + 1)}
          disabled={pageIndex === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div> */}
    </div>
  );
}

export default TableTeacher;
