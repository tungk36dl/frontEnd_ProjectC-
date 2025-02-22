// import { useEffect, useState } from "react";
// import SERVER_URL from "../../../Constant";

// // Component mới CohortFilter.js
// export function CohortFilter({ selectedCohort, onChangeCohort }) {
//   const [Cohort, setCohort] = useState([]);
//   const jwtToken = localStorage.getItem("jwtToken");

//   useEffect(() => {
//     const fetchCohort = async () => {
//       try {
//         const response = await fetch(`${SERVER_URL}/get-all-cohort`, {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${jwtToken}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ pageIndex: 0, pageSize: 10000, keyword: "" }),
//         });
//         if (!response.ok) throw new Error("Failed to fetch Cohort");
//         const data = await response.json();
//         setCohort(data.data || []);
//         onChangeCohort(data.data.length > 0 ? data.data[0].id : "");
//       } catch (error) {
//         console.error("Error fetching Cohort:", error);
//       }
//     };
//     fetchCohort();
//   }, []);

//   return (
//     <div style={{ marginBottom: "20px" }}>
//       <select
//         value={selectedCohort}
//         onChange={(e) => onChangeCohort(e.target.value)}
//       >
//         <option disabled value="">
//           Select Cohort
//         </option>

//         {Cohort.map((option) => (
//           <option key={option.id} value={option.id}>
//             {option.cohortName}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }
//////////////////////////////////////////////////////////////////
import { useEffect, useState } from "react";
import SERVER_URL from "../../../Constant";

// export function CohortFilter({ selectedCohort, onChangeCohort }) {
//   const [cohorts, setCohorts] = useState([]);
//   const jwtToken = localStorage.getItem("jwtToken");

//   useEffect(() => {
//     const fetchCohort = async () => {
//       try {
//         const response = await fetch(`${SERVER_URL}/get-all-cohort`, {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${jwtToken}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ pageIndex: 0, pageSize: 10000, keyword: "" }),
//         });
//         if (!response.ok) throw new Error("Failed to fetch Cohort");
//         const data = await response.json();
//         setCohorts([{ id: "", cohortName: "Tất cả" }, ...data.data]); // 🔹 Thêm "Tất cả"
//         onChangeCohort(""); // Mặc định chọn "Tất cả"
//       } catch (error) {
//         console.error("Error fetching Cohort:", error);
//       }
//     };
//     fetchCohort();
//   }, []);

//   return (
//     <div style={{ marginBottom: "20px" }}>
//       <select
//         value={selectedCohort}
//         onChange={(e) => onChangeCohort(e.target.value)}
//       >
//         {cohorts.map((option) => (
//           <option key={option.id} value={option.id}>
//             {option.cohortName}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }
export function CohortFilter({ selectedCohort, onChangeCohort, excludeAll }) {
  const [cohorts, setCohorts] = useState([]);

  useEffect(() => {
    const fetchCohort = async () => {
      const response = await fetch(`${SERVER_URL}/get-all-cohort`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pageIndex: 0, pageSize: 10000, keyword: "" }),
      });

      const data = await response.json();
      const cohortList = excludeAll
        ? data.data
        : [{ id: "", cohortName: "Tất cả" }, ...data.data];
      setCohorts(cohortList);
      onChangeCohort(
        excludeAll ? (data.data.length > 0 ? data.data[0].id : "") : ""
      );
    };

    fetchCohort();
  }, []);

  return (
    <select
      value={selectedCohort}
      onChange={(e) => onChangeCohort(e.target.value)}
    >
      {cohorts.map((option) => (
        <option key={option.id} value={option.id}>
          {option.cohortName}
        </option>
      ))}
    </select>
  );
}
