const Employee = require("../modal/employeeModal");

const employeesData = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ msg: "error in the employeeData Contoller" });
  }
};

const addFields = async (req, res) => {
  try {
    const { fullname, dob, gender } = req.body;

    // const employeeExists = await Employee.findOne({ fullname });

    // if (employeeExists) {
    //   return res.status(400).json({ msg: "email already exists" });
    // }

    await Employee.create({
      fullname,
      dob,
      gender,
    });

    res.status(200).json({ msg: `new employee ${fullname} Added` });
  } catch (error) {
    res.status(400).json({ msg: "error in the contoller" });
  }
};

const delField = async (req, res) => {
  const { fullname } = req.params;
  try {
    const userFound = await Employee.findOne({ fullname });

    if (!userFound) {
      res.status(400).json({ msg: "User not found" });
    }

    await Employee.deleteOne({ fullname });
    res.status(200).json({ msg: "successfully deleted a field" });
  } catch (error) {
    res.status(400).json({ msg: "error in removing field" });
  }
};

module.exports = { addFields, employeesData, delField };
