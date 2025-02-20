import React, { useState, useMemo } from "react";

const classOptions = ["Tất cả", "12A1", "12A2", "11B1", "12A3"];

function createData(id, name, email, phone, code, address, age, className) {
  return { id, name, email, phone, code, address, age, className };
}

const rows = [
  createData(
    1,
    "Nguyễn Văn A",
    "a@gmail.com",
    "0123456789",
    "16TH402201",
    "Hà Nội",
    20,
    "12A1"
  ),
  createData(
    2,
    "Trần Thị B",
    "b@gmail.com",
    "0987654321",
    "16TH402201",
    "Hồ Chí Minh",
    21,
    "12A2"
  ),
  createData(
    3,
    "Lê Văn C",
    "c@gmail.com",
    "0345678912",
    "16TH402201",
    "Đà Nẵng",
    19,
    "11B1"
  ),
  createData(
    4,
    "Phạm Thị D",
    "d@gmail.com",
    "0765432198",
    "16TH402201",
    "Cần Thơ",
    22,
    "12A3"
  ),
  createData(
    4,
    "Phạm Thị D",
    "d@gmail.com",
    "0765432198",
    "16TH402201",
    "Cần Thơ",
    22,
    "12A3"
  ),
  createData(
    5,
    "Phạm Thị D",
    "d@gmail.com",
    "0765432198",
    "16TH402201",
    "Cần Thơ",
    22,
    "12A3"
  ),
  createData(
    6,
    "Phạm Thị D",
    "d@gmail.com",
    "0765432198",
    "16TH402201",
    "Cần Thơ",
    22,
    "12A3"
  ),
  createData(
    7,
    "Phạm Thị D",
    "d@gmail.com",
    "0765432198",
    "16TH402201",
    "Cần Thơ",
    22,
    "12A3"
  ),
  createData(
    8,
    "Phạm Thị D",
    "d@gmail.com",
    "0765432198",
    "16TH402201",
    "Cần Thơ",
    22,
    "12A3"
  ),
  createData(
    9,
    "Phạm Thị D",
    "d@gmail.com",
    "0765432198",
    "16TH402201",
    "Cần Thơ",
    22,
    "12A3"
  ),
  createData(
    10,
    "Phạm Thị D",
    "d@gmail.com",
    "0765432198",
    "16TH402201",
    "Cần Thơ",
    22,
    "12A3"
  ),
  createData(
    11,
    "Phạm Thị D",
    "d@gmail.com",
    "0765432198",
    "16TH402201",
    "Cần Thơ",
    22,
    "12A3"
  ),
  createData(
    12,
    "Phạm Thị D",
    "d@gmail.com",
    "0765432198",
    "16TH402201",
    "Cần Thơ",
    22,
    "12A3"
  ),
  createData(
    13,
    "Phạm Thị D",
    "d@gmail.com",
    "0765432198",
    "16TH402201",
    "Cần Thơ",
    22,
    "12A3"
  ),
];

const headCells = [
  { id: "code", label: "Code" },
  { id: "name", label: "Tên Sinh Viên" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Số Điện Thoại" },
  { id: "address", label: "Địa Chỉ" },
  { id: "age", label: "Tuổi" },
  { id: "className", label: "Lớp" },
];

function TableUser() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [selectedClass, setSelectedClass] = useState("Tất cả");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangeClass = (event) => {
    setSelectedClass(event.target.value);
  };

  const filteredRows =
    selectedClass === "Tất cả"
      ? rows
      : rows.filter((row) => row.className === selectedClass);

  const sortedRows = useMemo(() => {
    return [...filteredRows].sort((a, b) => {
      if (orderBy === "age") {
        return order === "asc" ? a.age - b.age : b.age - a.age;
      } else {
        return order === "asc"
          ? a[orderBy].localeCompare(b[orderBy])
          : b[orderBy].localeCompare(a[orderBy]);
      }
    });
  }, [filteredRows, order, orderBy]);

  const visibleRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <h2>Quản lý sinh viên</h2>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px" }}>Lọc theo lớp:</label>
        <select value={selectedClass} onChange={handleChangeClass}>
          {classOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {headCells.map((headCell) => (
              <th
                key={headCell.id}
                onClick={() => handleRequestSort(headCell.id)}
                style={{
                  cursor: "pointer",
                  borderBottom: "2px solid #ddd",
                  padding: "10px",
                }}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  order === "asc" ? (
                    <span> ▲</span>
                  ) : (
                    <span> ▼</span>
                  )
                ) : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((row) => (
            <tr key={row.id}>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {row.code}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {row.name}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {row.email}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {row.phone}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {row.address}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {row.age}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {row.className}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <button
          disabled={page === 0}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Trang trước
        </button>
        <span style={{ margin: "0 10px" }}>
          Trang {page + 1} / {totalPages}
        </span>
        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Trang sau
        </button>
      </div>
    </div>
  );
}

export default TableUser;
