import { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import SERVER_URL from "../../Constant";
import { MajorFilter } from "../Helper/MajorFilter";
import { CohortFilter } from "../Helper/CohortFilter";

const CreateClass = ({ onReload }) => {
  const [selectedCohort, setSelectedCohort] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");
  const [show, setShow] = useState(false);
  const [data, setData] = useState({ classesName: "" });

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

  const handleCohortChange = (value) => {
    setSelectedCohort(value);
    setData((prev) => ({ ...prev, cohortId: value }));
  };
  const handleMajorChange = (value) => {
    setSelectedMajor(value);
    setData((prev) => ({ ...prev, majorId: value }));
  };

  const openModal = () => setShow(true);
  const closeModal = () => {
    setShow(false);
    setData({ classesName: "" }); // 🔹 Reset input khi đóng modal
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const jwtToken = localStorage.getItem("jwtToken");

      const response = await fetch(SERVER_URL + "/create-classes", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create cohort");
      }

      // 🔹 Reset input & đóng modal sau khi tạo thành công
      setData({ classesName: "" });
      setShow(false);
      onReload();

      Swal.fire({ title: "Tạo Class thành công!", icon: "success" });
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
        + Tạo Class
      </button>
      <Modal isOpen={show} onRequestClose={closeModal} style={customStyles}>
        <h2>Tạo Class Mới</h2>
        <form onSubmit={handleSubmit}>
          <table className="create-cohort-table">
            <tbody>
              <tr>
                <td>
                  <label>Chọn Chuyên ngành</label>
                </td>
                <MajorFilter
                  selectedMajor={selectedMajor}
                  onChangeMajor={handleMajorChange}
                  excludeAll={true}
                />
              </tr>
              <tr>
                <td>
                  <label>Chọn Khóa </label>
                </td>
                <CohortFilter
                  selectedCohort={selectedCohort}
                  onChangeCohort={handleCohortChange}
                  excludeAll={true}
                />
              </tr>
              <tr>
                <td>
                  <label>Tên Class:</label>
                </td>

                <td>
                  <input
                    type="text"
                    name="classesName"
                    value={data.classesName}
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

export default CreateClass;
