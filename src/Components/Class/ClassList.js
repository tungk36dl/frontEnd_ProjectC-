// import React, { useEffect, useState } from "react";
// import "./Class.scss";
// import SERVER_URL from "../../Constant";
// import EditClass from "./EditClass";
// import DeleteClass from "./DeleteClass";

// const ClassList = ({ reload }) => {
//   const [Class, setClass] = useState([]);
//   const [pageIndex, setPageIndex] = useState(1);
//   const [pageSize, setPageSize] = useState(5);
//   const [totalItems, setTotalItems] = useState(0);

//   // 🔹 Gọi API lấy danh sách Cohort
//   const getClass = async () => {
//     try {
//       const jwtToken = localStorage.getItem("jwtToken");

//       const response = await fetch(`${SERVER_URL}/get-all-classes`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${jwtToken}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           pageIndex: pageIndex,
//           pageSize: pageSize,
//           keyword: "",
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch Class");
//       }

//       const data = await response.json();
//       console.log("API Response:", data); // Debug dữ liệu API

//       setClass(data.data || []);
//       setTotalItems(data.totalCount || 0);
//     } catch (error) {
//       console.error("Error fetching Class:", error);
//     }
//   };

//   // 🔹 Gọi API khi pageIndex hoặc pageSize thay đổi
//   useEffect(() => {
//     getClass();
//   }, [pageIndex, pageSize, reload]);

//   const totalPages = Math.ceil(totalItems / pageSize);

//   const handlePageChange = (newPage) => {
//     if (newPage >= 0 && newPage <= totalPages) {
//       setPageIndex(newPage);
//     }
//   };

//   const handlePageSizeChange = (event) => {
//     setPageSize(parseInt(event.target.value));
//     setPageIndex(0); // Reset về trang đầu khi thay đổi số hàng
//   };

//   return (
//     <div className="cohort-container">
//       <table className="cohort-table">
//         <thead>
//           <tr>
//             <th className="cohort-th">ID</th>
//             <th className="cohort-th">Class</th>
//             <th className="cohort-th">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Class.length > 0 ? (
//             Class.map((row) => (
//               <>
//                 <tr key={row.id}>
//                   <td className="cohort-td">{row.id}</td>
//                   <td className="cohort-td">{row.classesName}</td>
//                   <td className="edit_delete cohort-td">
//                     <EditClass Class={row} onReload={getClass} />
//                     <DeleteClass ClassId={row.id} onReload={getClass} />
//                   </td>
//                 </tr>
//               </>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="3" className="cohort-td">
//                 No data available
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Phân trang */}
//       <div className="pagination">
//         <span>Rows per page: </span>
//         <select
//           className="RowsPerPage"
//           value={pageSize}
//           onChange={handlePageSizeChange}
//         >
//           <option value={5}>5</option>
//           <option value={10}>10</option>
//         </select>
//         <button
//           onClick={() => handlePageChange(pageIndex - 1)}
//           disabled={pageIndex === 1}
//           className="pagination-button"
//         >
//           Previous
//         </button>
//         <span>
//           Page {pageIndex} of {totalPages}
//         </span>
//         <button
//           onClick={() => handlePageChange(pageIndex + 1)}
//           disabled={pageIndex === totalPages}
//           className="pagination-button"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ClassList;
// ổn nhất
// import React, { useEffect, useState } from "react";
// import "./Class.scss";
// import SERVER_URL from "../../Constant";
// import EditClass from "./EditClass";
// import DeleteClass from "./DeleteClass";
// import { CohortFilter } from "../Helper/CohortFilter";
// import { MajorFilter } from "../Helper/MajorFilter";

// const ClassList = ({ reload }) => {
//   const [allClasses, setAllClasses] = useState([]);
//   const [filteredClasses, setFilteredClasses] = useState([]);
//   const [selectedCohort, setSelectedCohort] = useState("");
//   const [selectedMajor, setSelectedMajor] = useState("");
//   const [pageIndex, setPageIndex] = useState(1);
//   const [pageSize, setPageSize] = useState(5);
//   const [totalItems, setTotalItems] = useState(0);

//   // 🔹 Gọi API lấy danh sách lớp
//   const getClass = async () => {
//     try {
//       const jwtToken = localStorage.getItem("jwtToken");

//       const response = await fetch(`${SERVER_URL}/get-all-classes`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${jwtToken}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           pageIndex: 0, // Lấy tất cả để lọc
//           pageSize: 10000,
//           keyword: "",
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch Class");
//       }

//       const data = await response.json();
//       setAllClasses(data.data || []);
//       setFilteredClasses(data.data || []);
//       setTotalItems(data.totalCount || 0);
//     } catch (error) {
//       console.error("Error fetching Class:", error);
//     }
//   };

//   // 🔹 Lọc danh sách lớp khi thay đổi khóa hoặc chuyên ngành
//   useEffect(() => {
//     let filtered = allClasses;
//     if (selectedCohort) {
//       filtered = filtered.filter((cls) => cls.cohortId === selectedCohort);
//     }
//     if (selectedMajor) {
//       filtered = filtered.filter((cls) => cls.majorId === selectedMajor);
//     }
//     setFilteredClasses(filtered);
//     setTotalItems(filtered.length);
//   }, [selectedCohort, selectedMajor, allClasses]);

//   // 🔹 Gọi API khi reload
//   useEffect(() => {
//     getClass();
//   }, [reload]);

//   const totalPages = Math.ceil(totalItems / pageSize);

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setPageIndex(newPage);
//     }
//   };

//   const handlePageSizeChange = (event) => {
//     setPageSize(parseInt(event.target.value));
//     setPageIndex(1); // Reset về trang đầu khi thay đổi số hàng
//   };

//   return (
//     <div className="cohort-container">
//       <h2>ClassList</h2>

//       {/* Bộ lọc */}
//       <div className="filter-container">
//         <label>Chọn Khóa: </label>
//         <CohortFilter
//           selectedCohort={selectedCohort}
//           onChangeCohort={setSelectedCohort}
//         />

//         <MajorFilter
//           selectedMajor={selectedMajor}
//           onChangeMajor={setSelectedMajor}
//         />
//       </div>

//       {/* Danh sách lớp */}
//       <table className="cohort-table">
//         <thead>
//           <tr>
//             <th className="cohort-th">ID</th>
//             <th className="cohort-th">Class</th>
//             <th className="cohort-th">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredClasses.length > 0 ? (
//             filteredClasses
//               .slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
//               .map((row) => (
//                 <tr key={row.id}>
//                   <td className="cohort-td">{row.id}</td>
//                   <td className="cohort-td">{row.classesName}</td>
//                   <td className="edit_delete cohort-td">
//                     <EditClass Class={row} onReload={getClass} />
//                     <DeleteClass ClassId={row.id} onReload={getClass} />
//                   </td>
//                 </tr>
//               ))
//           ) : (
//             <tr>
//               <td colSpan="3" className="cohort-td">
//                 No data available
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Phân trang */}
//       <div className="pagination">
//         <span>Rows per page: </span>
//         <select
//           className="RowsPerPage"
//           value={pageSize}
//           onChange={handlePageSizeChange}
//         >
//           <option value={5}>5</option>
//           <option value={10}>10</option>
//         </select>
//         <button
//           onClick={() => handlePageChange(pageIndex - 1)}
//           disabled={pageIndex === 1}
//           className="pagination-button"
//         >
//           Previous
//         </button>
//         <span>
//           Page {pageIndex} of {totalPages}
//         </span>
//         <button
//           onClick={() => handlePageChange(pageIndex + 1)}
//           disabled={pageIndex === totalPages}
//           className="pagination-button"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ClassList;
// gần hoàn thành
// import React, { useEffect, useState } from "react";
// import "./Class.scss";
// import SERVER_URL from "../../Constant";
// import EditClass from "./EditClass";
// import DeleteClass from "./DeleteClass";
// import { CohortFilter } from "../Helper/CohortFilter";
// import { MajorFilter } from "../Helper/MajorFilter";
// import Swal from "sweetalert2";

// const ClassList = ({ reload }) => {
//   const [allClasses, setAllClasses] = useState([]);
//   const [filteredClasses, setFilteredClasses] = useState([]);
//   const [selectedCohort, setSelectedCohort] = useState("");
//   const [selectedMajor, setSelectedMajor] = useState("");
//   const [pageIndex, setPageIndex] = useState(1);
//   const [pageSize, setPageSize] = useState(5);
//   const [totalItems, setTotalItems] = useState(0);

//   // Gọi API lấy danh sách lớp
//   const getClass = async () => {
//     try {
//       const jwtToken = localStorage.getItem("jwtToken");
//       const response = await fetch(`${SERVER_URL}/get-all-classes`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${jwtToken}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ pageIndex: 0, pageSize: 10000, keyword: "" }),
//       });

//       if (!response.ok) throw new Error("Failed to fetch Class");

//       const data = await response.json();
//       setAllClasses(data.data || []);
//       setFilteredClasses(data.data || []);
//       setTotalItems(data.totalCount || 0);
//     } catch (error) {
//       console.error("Error fetching Class:", error);
//     }
//   };

//   // Lọc danh sách lớp
//   useEffect(() => {
//     let filtered = allClasses;
//     if (selectedCohort)
//       filtered = filtered.filter((cls) => cls.cohortId === selectedCohort);
//     if (selectedMajor)
//       filtered = filtered.filter((cls) => cls.majorId === selectedMajor);
//     setFilteredClasses(filtered);
//     setTotalItems(filtered.length);
//   }, [selectedCohort, selectedMajor, allClasses]);

//   useEffect(() => {
//     getClass();
//   }, [reload]);

//   const totalPages = Math.ceil(totalItems / pageSize);

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setPageIndex(newPage);
//     }
//   };

//   const handlePageSizeChange = (event) => {
//     setPageSize(parseInt(event.target.value));
//     setPageIndex(1);
//   };

//   // Hiển thị form chọn khóa và chuyên ngành
//   const handleCreateClass = async () => {
//     const { value: formValues } = await Swal.fire({
//       title: "Tạo Lớp Mới",
//       html:
//         `<label>Chọn Khóa:</label>` +
//         `<select id="swal-cohort" class="swal2-select">` +
//         `<option value="">Chọn khóa</option>` +
//         allClasses
//           .map(
//             (cls) =>
//               `<option value="${cls.cohortId}">${cls.cohortName}</option>`
//           )
//           .join("") +
//         `</select>` +
//         `<br><label>Chọn Chuyên Ngành:</label>` +
//         `<select id="swal-major" class="swal2-select">` +
//         `<option value="">Chọn chuyên ngành</option>` +
//         allClasses
//           .map(
//             (cls) => `<option value="${cls.majorId}">${cls.majorName}</option>`
//           )
//           .join("") +
//         `</select>` +
//         `<br>`,
//       focusConfirm: false,
//       showCancelButton: true,
//       preConfirm: () => {
//         return {
//           cohort: document.getElementById("swal-cohort").value,
//           major: document.getElementById("swal-major").value,
//         };
//       },
//     });

//     if (formValues) {
//       setSelectedCohort(formValues.cohort);
//       setSelectedMajor(formValues.major);
//     }
//   };

//   return (
//     <div className="cohort-container">
//       <h2>ClassList</h2>

//       {/* Bộ lọc */}
//       <div className="filter-container">
//         <button onClick={handleCreateClass} className="create-button">
//           Lọc khóa và Chuyên Ngành
//         </button>
//       </div>

//       {/* Danh sách lớp */}
//       <table className="cohort-table">
//         <thead>
//           <tr>
//             <th className="cohort-th">ID</th>
//             <th className="cohort-th">Class</th>
//             <th className="cohort-th">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredClasses.length > 0 ? (
//             filteredClasses
//               .slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
//               .map((row) => (
//                 <tr key={row.id}>
//                   <td className="cohort-td">{row.id}</td>
//                   <td className="cohort-td">{row.classesName}</td>
//                   <td className="edit_delete cohort-td">
//                     <EditClass Class={row} onReload={getClass} />
//                     <DeleteClass ClassId={row.id} onReload={getClass} />
//                   </td>
//                 </tr>
//               ))
//           ) : (
//             <tr>
//               <td colSpan="3" className="cohort-td">
//                 No data available
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Phân trang */}
//       <div className="pagination">
//         <span>Rows per page: </span>
//         <select
//           className="RowsPerPage"
//           value={pageSize}
//           onChange={handlePageSizeChange}
//         >
//           <option value={5}>5</option>
//           <option value={10}>10</option>
//         </select>
//         <button
//           onClick={() => handlePageChange(pageIndex - 1)}
//           disabled={pageIndex === 1}
//           className="pagination-button"
//         >
//           Previous
//         </button>
//         <span>
//           Page {pageIndex} of {totalPages}
//         </span>
//         <button
//           onClick={() => handlePageChange(pageIndex + 1)}
//           disabled={pageIndex === totalPages}
//           className="pagination-button"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ClassList;
import React, { useEffect, useState } from "react";
import "./Class.scss";
import SERVER_URL from "../../Constant";
import EditClass from "./EditClass";
import DeleteClass from "./DeleteClass";
import { CohortFilter } from "../Helper/CohortFilter";
import { MajorFilter } from "../Helper/MajorFilter";

const ClassList = ({ reload }) => {
  const [allClasses, setAllClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  // 🔹 Gọi API lấy danh sách lớp
  const getClass = async () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");

      const response = await fetch(`${SERVER_URL}/get-all-classes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageIndex: 0,
          pageSize: 10000,
          keyword: "",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch Class");
      }

      const data = await response.json();
      setAllClasses(data.data || []);
      setFilteredClasses(data.data || []);
      setTotalItems(data.totalCount || 0);
    } catch (error) {
      console.error("Error fetching Class:", error);
    }
  };

  // 🔹 Lọc danh sách lớp khi thay đổi khóa hoặc chuyên ngành
  useEffect(() => {
    if (selectedCohort === "" && selectedMajor === "") {
      getClass(); // Nếu chọn "Tất cả", gọi lại API
    } else {
      let filtered = allClasses;
      if (selectedCohort) {
        filtered = filtered.filter((cls) => cls.cohortId === selectedCohort);
      }
      if (selectedMajor) {
        filtered = filtered.filter((cls) => cls.majorId === selectedMajor);
      }
      setFilteredClasses(filtered);
      setTotalItems(filtered.length);
    }
  }, [selectedCohort, selectedMajor]);

  // 🔹 Gọi API khi reload
  useEffect(() => {
    getClass();
  }, [reload]);

  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageIndex(newPage);
    }
  };

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value));
    setPageIndex(1);
  };

  return (
    <div className="cohort-container">
      {/* Bộ lọc */}
      <div className="class-filter">
        <div className="filter-container">
          <label>Chọn Khóa: </label>
          <CohortFilter
            selectedCohort={selectedCohort}
            onChangeCohort={(value) => {
              setSelectedCohort(value);
              setPageIndex(1);
            }}
            includeAllOption={true} // 🔹 Thêm tùy chọn "Tất cả"
          />
        </div>
        <div className="filter-container">
          <label>Chọn Chuyên ngành: </label>

          <MajorFilter
            selectedMajor={selectedMajor}
            onChangeMajor={(value) => {
              setSelectedMajor(value);
              setPageIndex(1);
            }}
            includeAllOption={true} // 🔹 Thêm tùy chọn "Tất cả"
          />
        </div>
      </div>

      {/* Danh sách lớp */}
      <table className="cohort-table">
        <thead>
          <tr>
            <th className="cohort-th">ID</th>
            <th className="cohort-th">Class</th>
            <th className="cohort-th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredClasses.length > 0 ? (
            filteredClasses
              .slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
              .map((row) => (
                <tr key={row.id}>
                  <td className="cohort-td">{row.id}</td>
                  <td className="cohort-td">{row.classesName}</td>
                  <td className="edit_delete cohort-td">
                    <EditClass Class={row} onReload={getClass} />
                    <DeleteClass ClassId={row.id} onReload={getClass} />
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="3" className="cohort-td">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className="pagination">
        <span>Rows per page: </span>
        <select
          className="RowsPerPage"
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
        <button
          onClick={() => handlePageChange(pageIndex - 1)}
          disabled={pageIndex === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span>
          Page {pageIndex} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(pageIndex + 1)}
          disabled={pageIndex === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ClassList;
