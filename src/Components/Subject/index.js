import { useState } from "react";
import SubjectList from "./SubjectList";
import CreateSubject from "./CreateSubject";

function Subject() {
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(!reload); // Kích hoạt cập nhật danh sách Cohort
  };

  return (
    <>
      <h2 className="h2-cohort">Subject List</h2>
      <CreateSubject onReload={handleReload} />
      <SubjectList reload={reload} />
    </>
  );
}

export default Subject;
