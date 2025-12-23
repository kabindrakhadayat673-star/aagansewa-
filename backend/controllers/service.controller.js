import db from "../config/db.connect.js";
// add service
export const addservice = async (req, res, next) => {
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
    next(error);
  }
};

// get service
export const getservice = async (req, res, next) => {
  try {
    const [allService] = await db.query(
      `SELECT s.service_id, s.service_name,s.description,b.branch_id,b.branch_name FROM services s LEFT JOIN branch b ON s.branch_id = b.branch_id`
    );
    return res.status(200).json({
      messgae: "available service",
      data: allService,
    });
  } catch (error) {
    next(error);
  }
};

// delete service
export const deleteservice = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "id required" });
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
    next(error);
  }
};

// update service
export const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { service_name, description } = req.body;
    // console.log(id);
    // console.log(service_name, description);
    if (!id) {
      return res.ststus(404).json({ message: "id not found" });
    }

    const [result] = await db.query(
      "SELECT  *  FROM services  WHERE service_id = ?",
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Service not found" });
    }
    const updateresult = result[0];
    console.log(updateresult);

    const updateservice_name = service_name || updateresult.service_name;
    const updatedescription = description || updateresult.description;
    await db.query(
      "UPDATE services SET service_name = ?, description = ? WHERE service_id = ?",
      [updateservice_name, updatedescription, id]
    );

    res.json({ message: "Service updated successfully" });
  } catch (error) {
    next(error);
  }
};
