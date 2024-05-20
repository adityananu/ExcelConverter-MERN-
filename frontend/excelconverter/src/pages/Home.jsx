import React from "react";
import "../App.css";
import { useEmployee } from "../context/EmployeeContext";
import { Link } from "react-router-dom";
import svgTrash from "../assets/trash.svg";

const Home = () => {
  const { data, handleDel, exportToExcel } = useEmployee();

  return (
    <>
      <p style={{ fontSize: "25px", fontWeight: "600" }}>Employees Details</p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Link
          to="/addnames"
          style={{
            textDecoration: "none",
            padding: "9px",
            backgroundColor: "lightblue",
          }}
        >
          Addnames
        </Link>

        <button
          onClick={exportToExcel}
          style={{
            padding: "14px",
            backgroundColor: "lightblue",
            border: "none",
            fontWeight: "600",
          }}
        >
          Download Excel sheet
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>FullName</th>
            <th>DOB</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((employee, index) => (
            <tr key={employee._id}>
              <td>{index}</td>
              <td>{employee.fullname}</td>
              <td>{employee.dob}</td>
              <td>{employee.gender}</td>
              <td>
                <button
                  style={{ backgroundColor: "transparent", border: "none" }}
                  onClick={() => handleDel(employee.fullname)}
                >
                  <img src={svgTrash} alt="trash" style={{ height: "20px" }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
