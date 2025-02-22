import React from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import SERVER_URL from "../../Constant";
import { Delete as DeleteIcon } from "@mui/icons-material";
const DeleteClass = ({ ClassId, onReload }) => {
  const handleDelete = async () => {
    const confirmDelete = await Swal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const jwtToken = localStorage.getItem("jwtToken");

        const response = await fetch(
          `${SERVER_URL}/delete-classes/${ClassId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        // 🔹 Đọc dữ liệu JSON từ phản hồi API
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message || "Xóa thất bại! Hãy thử lại.");
        } else if (responseData.statusCode === 409) {
          Swal.fire("Lỗi!", responseData.message, "error");
          onReload();
        } else {
          onReload(); // Cập nhật danh sách
          Swal.fire("Đã xóa!", "Class đã được xóa thành công.", "success");
        }
        console.log(typeof responseData.statusCode);
        console.log(responseData.statusCode);
      } catch (error) {
        Swal.fire("Lỗi!", error.message, "error");
      }
    }
  };

  return (
    <button onClick={handleDelete} className="delete-button">
      <DeleteIcon />
    </button>
  );
};

export default DeleteClass;
