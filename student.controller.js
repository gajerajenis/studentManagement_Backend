const sql = require("mssql");
const getDB = require("./db");

exports.addStudent = async (req, res) => {
  try {
    const { Name, Email, Age } = req.body;
    const pool = await getDB();

    await pool.request()
      .input("Name", sql.NVarChar, Name)
      .input("Email", sql.NVarChar, Email)  
      .input("Age", sql.Int, Age)
      .execute("sp_AddStudent");

    res.status(200).json({
      status: 200,
      message: "Student added successfully"
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getStudents = async (req, res) => {
  try {
    const pool = await getDB();
    const result = await pool.request().execute("sp_GetStudents");
    res.json(result.recordset);
      res.status(200).json({
      status: 200,
      message: "Student get data successfully"
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};


exports.deleteStudent = async (req, res) => {
  try {
    const pool = await getDB();

    await pool.request()
      .input("StudentId", sql.Int, req.params.id)
      .execute("sp_DeleteStudent");

    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
