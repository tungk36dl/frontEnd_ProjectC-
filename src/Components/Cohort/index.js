import { useState } from "react";
import CohortList from "./CohortList";
import CreateCohort from "./CreateCohort";

function Cohort() {
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(!reload); // Kích hoạt cập nhật danh sách Cohort
  };

  return (
    <>
      <h2 className="h2-cohort">Cohort List</h2>
      <CreateCohort onReload={handleReload} />
      <CohortList reload={reload} />
    </>
  );
}

export default Cohort;
