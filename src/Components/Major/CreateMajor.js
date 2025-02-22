import { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import SERVER_URL from "../../Constant";

const CreateMajor = ({ onReload }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({ majorName: "" });

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const openModal = () => setShow(true);
  const closeModal = () => {
    setShow(false);
    setData({ majorName: "" }); // 🔹 Reset input khi đóng modal
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const jwtToken = localStorage.getItem("jwtToken");

      const response = await fetch(SERVER_URL + "/create-major", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create Major");
      }

      // 🔹 Reset input & đóng modal sau khi tạo thành công
      setData({ majorName: "" });
      setShow(false);
      onReload();

      Swal.fire({ title: "Tạo Major thành công!", icon: "success" });
    } catch (error) {
      Swal.fire({
        title: "Có lỗi xảy ra!",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <>
      <button onClick={openModal} className="createCohort">
        + Tạo Major
      </button>
      <Modal isOpen={show} onRequestClose={closeModal} style={customStyles}>
        <h2>Tạo Major Mới</h2>
        <form onSubmit={handleSubmit}>
          <table className="create-cohort-table">
            <tbody>
              <tr>
                <td>
                  <label>Tên Major:</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="majorName"
                    value={data.majorName}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="modal-actions">
            <button type="button" onClick={closeModal}>
              Hủy
            </button>
            <button type="submit">Tạo mới</button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateMajor;
