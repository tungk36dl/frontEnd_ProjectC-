import React, { useEffect, useState } from "react";
import "./Major.scss";
import SERVER_URL from "../../Constant";
import EditMajor from "./EditMajor";
import DeleteMajor from "./DeleteMajor";

const MajorList = ({ reload }) => {
  const [major, setmajor] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  // 🔹 Gọi API lấy danh sách Cohort
  const getmajor = async () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");

      const response = await fetch(`${SERVER_URL}/get-all-major`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageIndex: pageIndex,
          pageSize: pageSize,
          keyword: "",
          displayActiveItem: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch major");
      }

      const data = await response.json();
      console.log("API Response:", data); // Debug dữ liệu API

      setmajor(data.data || []);
      setTotalItems(data.totalCount || 0);
    } catch (error) {
      console.error("Error fetching major:", error);
    }
  };

  // 🔹 Gọi API khi pageIndex hoặc pageSize thay đổi
  useEffect(() => {
    getmajor();
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
            <th className="cohort-th">Major</th>
            <th className="cohort-th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {major.length > 0 ? (
            major.map((row) => (
              <>
                <tr key={row.id}>
                  <td className="cohort-td">{row.id}</td>
                  <td className="cohort-td">{row.majorName}</td>
                  <td className="edit_delete cohort-td">
                    <EditMajor major={row} onReload={getmajor} />
                    <DeleteMajor majorId={row.id} onReload={getmajor} />
                  </td>
                </tr>
              </>
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

export default MajorList;
