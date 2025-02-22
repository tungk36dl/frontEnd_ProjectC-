import { useState } from "react";
import SubjectDetailList from "./SubjectDetailList";
import CreateSubjectDetail from "./CreateSubjectDetail";

function SubjectDetail() {
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(!reload); // Kích hoạt cập nhật danh sách SubjectDetail
  };

  return (
    <>
      <h2 className="h2-cohort">SubjectDetail List</h2>
      <CreateSubjectDetail onReload={handleReload} />
      <SubjectDetailList reload={reload} />
    </>
  );
}

export default SubjectDetail;
