import React, { useState } from "react";
import { useEmployee } from "../context/EmployeeContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const AddNames = () => {
  const { handleInput, handleRegister, employeeObj } = useEmployee();
  const [startDate, setStartDate] = useState();
  const navigate = useNavigate();
  const handleback = () => navigate("/");

  return (
    <div className="addfields__outterbox">
      <form onSubmit={handleRegister} className="addfields__form">
        <label>
          Fullname
          <input
            type="text"
            value={employeeObj ? employeeObj.fullname : ""}
            placeholder="Enter fullname"
            name="fullname"
            onChange={handleInput}
          />
        </label>
        <div className="addfields__details">
          <label>
            Date
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                handleInput({ target: { name: "dob", value: date } });
              }}
              name="dob"
              placeholderText="Enter Date"
              className="datepicker"
              wrapperClassName="datePicker"
            />
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={employeeObj.gender === "male"}
              onChange={handleInput}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={employeeObj.gender === "female"}
              onChange={handleInput}
            />
            Female
          </label>
        </div>
        <input type="submit" value="Submit" />
        <button onClick={handleback} className="addfields__button">
          Back
        </button>
      </form>
    </div>
  );
};

export default AddNames;
