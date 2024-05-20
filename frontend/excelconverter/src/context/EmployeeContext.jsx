import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

const employeesContext = createContext();

export const EmployeeContext = ({ children }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [employeeObj, setEmployeeObj] = useState({
    fullname: "",
    dob: "",
    gender: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const employessData = await axios.get(
      "http://localhost:5000/home/employeesData"
    );
    setData(employessData.data);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!employeeObj.fullname || !employeeObj.dob || !employeeObj.gender) {
      return alert("Fill all the details");
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/home/addFields",
        employeeObj
      );
      setEmployeeObj({
        fullname: "",
        dob: "",
        gender: "",
      });

      console.log(response.data.msg);

      fetchData();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (e) => {
    setEmployeeObj((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDel = async (name) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/home/delField/${name}`
      );
      fetchData();
      console.log(response.data.msg);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const exportToExcel = () => {
    // Create a new workbook and a worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Generate a binary string and create a Blob object
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
    const buf = new ArrayBuffer(wbout.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < wbout.length; ++i) {
      view[i] = wbout.charCodeAt(i) & 0xff;
    }
    const blob = new Blob([buf], { type: "application/octet-stream" });

    // Create a link element and trigger a download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "DataExport.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <employeesContext.Provider
      value={{
        data,
        handleInput,
        handleRegister,
        handleDel,
        exportToExcel,
        employeeObj,
      }}
    >
      {children}
    </employeesContext.Provider>
  );
};

export const useEmployee = () => {
  return useContext(employeesContext);
};
