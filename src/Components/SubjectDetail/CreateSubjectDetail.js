import { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import SERVER_URL from "../../Constant";
import { ClassFilter } from "../Helper/ClassFilter";
import { SubjectFilter } from "../Helper/SubjectFilter";
import { TeacherFilter } from "../Helper/TeacherFilter/TeacherFilter";
import { SemesterFilter } from "../Helper/SemesterFilter";

const CreateSubjectDetail = ({ onReload }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({ credits: "" });

    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedTeacher, setSelectedTeacher] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");
  

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
    setData({ credits: "" }); // 🔹 Reset input khi đóng modal
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  
  const handleClassChange = (value) => {
    setSelectedClass(value);
    setData((prev) => ({ ...prev, classesId: value }));
  };
  const handleSubjectChange = (value) => {
    setSelectedSubject(value);
    setData((prev) => ({ ...prev, subjectId: value }));
  };
  const handleTeacherChange = (value) => {
    setSelectedTeacher(value);
    setData((prev) => ({ ...prev, teacherId: value }));
  };

  const handleSemesterChange = (value) => {
    setSelectedSemester(value);
    setData((prev) => ({ ...prev, semesterCode: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const jwtToken = localStorage.getItem("jwtToken");

      const response = await fetch(SERVER_URL + "/create-subject-detail", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create subjectDetail");
      }

      // 🔹 Reset input & đóng modal sau khi tạo thành công
      setData({ credits: "" });
      setShow(false);
      onReload();

      Swal.fire({ title: "Tạo SubjectDetail thành công!", icon: "success" });
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
      <button onClick={openModal} className="createSubjectDetail">
        + Tạo SubjectDetail
      </button>
      <Modal isOpen={show} onRequestClose={closeModal} style={customStyles}>
        <h2>Tạo SubjectDetail Mới</h2>
        <form onSubmit={handleSubmit}>
          <table className="create-cohort-table">
            <tbody>
              <tr>
                <td>
                  <label>Chọn lớp</label>
                </td>
                <ClassFilter selectedClass={selectedClass} onChangeClass={handleClassChange}  />
              </tr>
              <tr>
                <td>
                  <label>Chọn môn học</label>
                </td>
                <SubjectFilter selectedSubject={selectedSubject} onChangeSubject={handleSubjectChange}  />
              </tr>
              <tr>
                <td>
                  <label>Chọn Giáo viên</label>
                </td>
                <TeacherFilter selectedTeacher={selectedTeacher} onChangeTeacher={handleTeacherChange}  />
              </tr>

              <tr>
                <td>
                  <label>Chọn Kì họchọc</label>
                </td>
                <SemesterFilter selectedSemester={selectedSemester} onChangeSemester={handleSemesterChange}  />
              </tr>
              <tr>
                <td>
                  <label>Số tín chỉchỉ</label>
                </td>
                <td>
                  <input
                    type="number"
                    name="credits"
                    value={data.credits}
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

export default CreateSubjectDetail;
