import React, { useEffect, useState } from "react";
import EditSubjectDetail from "./EditSubjectDetail"; // Import component Edit
import DeleteSubjectDetail from "./DeleteSubjectDetail"; // Import component Delete
import "../Cohort/style.scss";
import SERVER_URL from "../../Constant";

const SubjectDetailList = ({ reload }) => {
  const [subjectDetails, setSubjectDetails] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  // 🔹 Gọi API lấy danh sách SubjectDetail
  const getSubjectDetails = async () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");

      const response = await fetch(SERVER_URL + "/get-all-subject-detail", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageIndex: pageIndex, // Nếu backend bắt đầu từ 1, thử pageIndex + 1
          pageSize: pageSize,
          keyword: "",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch subjectDetails");
      }

      const data = await response.json();
      console.log("API Response:", data); // Debug dữ liệu API

      setSubjectDetails(data.data || []);
      setTotalItems(data.totalCount || 0);
    } catch (error) {
      console.error("Error fetching subjectDetails:", error);
    }
  };

  // 🔹 Gọi API khi pageIndex hoặc pageSize thay đổi
  useEffect(() => {
    getSubjectDetails();
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
    <div className="cohort-container">
      <table className="cohort-table">
        <thead>
          <tr>
            <th className="cohort-th">ID</th>
            <th className="cohort-th">SubjectName</th>
            <th className="cohort-th">Teacher</th>
            <th className="cohort-th">ClassName</th>
            <th className="cohort-th">Credit</th>
            <th className="cohort-th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjectDetails.length > 0 ? (
            subjectDetails.map((row) => (
              <tr key={row.id}>
                <td className="cohort-td">{row.subjectDetailId}</td>
                <td className="cohort-td">{row.subjectName}</td>
                <td className="cohort-td">{row.teacherName}</td>
                <td className="cohort-td">{row.className}</td>
                <td className="cohort-td">{row.credits}</td>
                <td className="edit_delete cohort-td">
                  <EditSubjectDetail subjectDetail={row} onReload={getSubjectDetails} />
                  <DeleteSubjectDetail subjectDetailId={row.subjectDetailId} onReload={getSubjectDetails} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="cohort-td">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className="pagination">
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
      </div>
    </div>
  );
};

export default SubjectDetailList;
