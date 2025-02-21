import React, { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import SERVER_URL from "../../Constant";
import { Edit as EditIcon } from "@mui/icons-material";
import { ServerRouter } from "react-router-dom";

const EditMajor = ({ onReload, major = {} }) => {
  const [showModal, setShowModal] = useState(false);
  const [cohortData, setCohortData] = useState({ majorName: "" });

  // Hàm gọi API lấy thông tin chi tiết của Cohort
  const fetchCohortDetails = async () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");

      const response = await fetch(SERVER_URL + `/get-major`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: major.id,
          Keyword: "",
        }),
      });

      if (!response.ok) {
        throw new Error("Lấy thông tin chi tiết thất bại!");
      }

      const data = await response.json();
      // Giả sử API trả về đối tượng chứa trường majorName (có thể có các trường khác nếu cần)
      setCohortData({ majorName: data.majorName });
    } catch (error) {
      console.error("Error fetching cohort details:", error);
      throw error;
    }
  };

  // Hàm mở modal, trước đó gọi API để lấy thông tin mới nhất
  const openModal = async () => {
    try {
      if (!major.id) {
        throw new Error("Không tìm thấy major ID!");
      }
      await fetchCohortDetails();
      setShowModal(true);
    } catch (error) {
      Swal.fire({ title: "Lỗi!", text: error.message, icon: "error" });
    }
  };

  const handleChange = (e) => {
    setCohortData({ majorName: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jwtToken = localStorage.getItem("jwtToken");

      if (!major.id) {
        throw new Error("Không tìm thấy Cohort ID!");
      }

      const response = await fetch(SERVER_URL + "/update-major", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: major.id,
          majorName: cohortData.majorName,
        }),
      });

      if (!response.ok) {
        let errorDetails = {};
        try {
          errorDetails = await response.json();
        } catch (e) {
          console.error("Không có dữ liệu JSON trong response:", e);
        }
        console.error("Lỗi từ API:", errorDetails);
        throw new Error(
          errorDetails.message || "Cập nhật thất bại! Vui lòng thử lại sau."
        );
      }

      setShowModal(false);
      onReload();
      Swal.fire({ title: "Cập nhật thành công!", icon: "success" });
    } catch (error) {
      Swal.fire({ title: "Lỗi!", text: error.message, icon: "error" });
    }
  };

  return (
    <>
      <button className="editCohort" onClick={openModal}>
        <EditIcon />
      </button>

      <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
        <form onSubmit={handleSubmit}>
          <h2>Chỉnh sửa Major</h2>
          <table className="edit-cohort-table">
            <tbody>
              <tr>
                <td>Tên Major:</td>
                <td>
                  <input
                    type="text"
                    name="majorName"
                    value={cohortData.majorName}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="modal-actions">
            <button type="button" onClick={() => setShowModal(false)}>
              Hủy
            </button>
            <button type="submit">Cập nhật</button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditMajor;
