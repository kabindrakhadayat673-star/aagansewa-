import db from "../config/db.connect.js";
// add service
export const addservice = async (req, res) => {
  try {
    const { service_name, service_description, branch_id } = req.body;
    if (!service_name || !service_description || !branch_id) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const [rows] = await db.query("SELECT * FROM branch WHERE branch_id = ?", [
      branch_id,
    ]);
    if (rows.length === 0) {
      return res.status(400).json({ message: "Branch not found" });
    }

    const [row] = await db.query(
      "SELECT * FROM services WHERE service_name = ?",
      [service_name]
    );
    if (row.length > 0) {
      return res.status(400).json({ message: "Service already exists" });
    }
    await db.query(
      "INSERT INTO services (service_name, description,branch_id) VALUES (?, ?,?)",
      [service_name, service_description, branch_id]
    );
    return res.status(200).json({ message: "Service added successfully" });
  } catch (error) {
    console.log(error);
  }
};

// get service
export const getservice = async (req, res) => {
  try {
    const [allService] = await db.query(
      `SELECT s.service_id, s.service_name,s.description,b.branch_id,b.branch_name FROM services s LEFT JOIN branch b ON s.branch_id = b.branch_id`
    );
    return res.status(200).json({
      messgae: "available service",
      data: allService,
    });
  } catch (error) {
    console.log(error);
  }
};

// delete service
export const deleteservice = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "All fields are required" });
    } else {
      const [service] = await db.query(
        "SELECT * FROM services WHERE service_id = ?",
        [id]
      );
      if (service.length === 0) {
        return res.status(400).json({ message: "Service not found" });
      } else {
        await db.query("DELETE FROM services WHERE service_id = ?", [id]);
        return res
          .status(200)
          .json({ message: "Services deleted successfully" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
