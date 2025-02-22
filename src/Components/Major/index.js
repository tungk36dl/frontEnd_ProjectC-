import { useState } from "react";
import MajorList from "./MajorList";
import CreateMajor from "./CreateMajor";

function Major() {
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(!reload); // Kích hoạt cập nhật danh sách Cohort
  };

  return (
    <>
      <h2 className="h2-cohort">Major List</h2>
      <CreateMajor onReload={handleReload} />
      <MajorList reload={reload} />
    </>
  );
}

export default Major;
