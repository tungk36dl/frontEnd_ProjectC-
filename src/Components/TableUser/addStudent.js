import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SERVER_URL from "../../Constant";
import "./addStudent.css";
import { ClassFilter } from "../Helper/ClassFilter";

function AddStudent() {
  const [selectedClass, setSelectedClass] = useState("");
  const [formData, setFormData] = useState({
    code: "",
    fullName: "",
    userName: "",
    password: "",
    email: "",
    phoneNumber: "",
    address: "",
    classesId: "", // Được cập nhật khi chọn lớp
    dateOfBirth: "",
    roleName: "student",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClassChange = (value) => {
    setSelectedClass(value);
    setFormData((prev) => ({ ...prev, classesId: value }));
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const validatePhone = (phoneNumber) => {
    const re = /^\d{10,11}$/;
    return re.test(phoneNumber);
  };

  const validateDateOfBirth = (dob) => {
    const re = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return re.test(dob);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      alert("Invalid email format");
      return;
    }
    if (!validateDateOfBirth(formData.dateOfBirth)) {
      alert("Invalid date of birth format (dd/mm/yyyy)");
      return;
    }
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const response = await fetch(`${SERVER_URL}/create-user`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to create student");
      navigate("/");
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };

  return (
    <div className="container">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <label>Code</label>
        <input name="code" placeholder="Code" onChange={handleChange} required />

        <label>Full Name</label>
        <input name="fullName" placeholder="Full Name" onChange={handleChange} required />

        <label>UserName</label>
        <input name="userName" placeholder="User Name" onChange={handleChange} required />

        <label>Password</label>
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

        <label>Email</label>
        <input name="email" placeholder="Email" onChange={handleChange} required />

        <label>Phone</label>
        <input name="phoneNumber" placeholder="Phone" onChange={handleChange} required />

        <label>Address</label>
        <input name="address" placeholder="Address" onChange={handleChange} required />

        <label>Class Name</label>
        <ClassFilter selectedClass={selectedClass} onChangeClass={handleClassChange} />

        <label>Date of Birth</label>
        <input name="dateOfBirth" placeholder="dd/mm/yyyy" onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddStudent;
