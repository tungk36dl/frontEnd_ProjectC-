import { useState } from "react";
import CreateClass from "./CreateClass";
import ClassList from "./ClassList";
// import FindClass from "./FindClass";

function Class() {
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(!reload); // Kích hoạt cập nhật danh sách Cohort
  };

  return (
    <>
      <h2 className="h2-cohort">ClassList</h2>
      <div className="findClass">
        <CreateClass onReload={handleReload} />
        {/* <FindClass /> */}
      </div>
      <ClassList reload={reload} />
    </>
  );
}

export default Class;
