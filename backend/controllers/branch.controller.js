import db from "../config/db.connect.js";

export const addProvience = async (req, res) => {
  try {
    const { provience_name } = req.body;

    const [existingprovience] = await db.query(
      "SELECT * FROM province WHERE province_name = ?",
      provience_name
    );
    if (existingprovience.length > 0) {
      return res.status(400).json({ message: "Provience already exists" });
    }
    await db.query("INSERT INTO province (province_name) VALUES (?)", [
      provience_name,
    ]);
    res.status(201).json({ message: "Province added successfully" });
  } catch (error) {
    console.log(error);
  }
};
// get all provience
export const getAllProvience = async (req, res) => {
  try {
    const [provience] = await db.query("SELECT * FROM province");
    return res.status(200).json({
      message: "All provience",
      data: provience,
    });
  } catch (error) {
    console.log(error);
  }
};
// delete provience
export const deleteProvience = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM province WHERE province_id = ?", [id]);
    res.status(200).json({ message: "Provience deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};