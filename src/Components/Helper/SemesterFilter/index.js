import React from "react";

const semesters = [
  { id: 1, name: "ki1" },
  { id: 2, name: "ki2" },
  { id: 3, name: "ki3" },
  { id: 4, name: "ki4" },
  { id: 5, name: "ki5" },
  { id: 6, name: "ki6" },
  { id: 7, name: "ki7" },
  { id: 8, name: "ki8" },
  { id: 9, name: "ki9" },
  { id: 10, name: "ki10" },
];

export const SemesterFilter = ({ selectedSemester, onChangeSemester }) => {
  return (
    <select
      value={selectedSemester}
      onChange={(e) => onChangeSemester(e.target.value)}
    >
      <option disabled value="">Select Semester</option>
      {semesters.map((semester) => (
        <option key={semester.id} value={semester.name}>
          {semester.name}
        </option>
      ))}
    </select>
  );
};
