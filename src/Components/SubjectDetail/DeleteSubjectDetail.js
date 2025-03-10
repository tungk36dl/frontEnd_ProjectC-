import React from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import SERVER_URL from "../../Constant";
import { Delete as DeleteIcon } from "@mui/icons-material";

const DeleteSubjectDetail = ({ subjectDetailId, onReload }) => {
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
          `${SERVER_URL}/delete-subject-detail/${subjectDetailId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Xóa thất bại! Hãy thử lại.");
        }

        Swal.fire("Đã xóa!", "SubjectDetail đã được xóa thành công.", "success");
        onReload(); // Cập nhật danh sách
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

export default DeleteSubjectDetail;
