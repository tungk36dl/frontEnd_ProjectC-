import React from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import SERVER_URL from "../../Constant";

const DeleteMajor = ({ cohortId, onReload }) => {
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

        const response = await fetch(`${SERVER_URL}/delete-major/${cohortId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Xóa thất bại! Hãy thử lại.");
        }

        Swal.fire("Đã xóa!", "Cohort đã được xóa thành công.", "success");
        onReload(); // Cập nhật danh sách
      } catch (error) {
        Swal.fire("Lỗi!", error.message, "error");
      }
    }
  };

  return (
    <button onClick={handleDelete} className="delete-button">
      Xóa
    </button>
  );
};

export default DeleteMajor;
