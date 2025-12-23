import db from "../config/db.connect.js";

// add staff
export const addstaff = async (req, res, next) => {
  try {
    const {
      name,
      position,
      role,
      email,
      password,
      phone,
      description,
      service_id,
      branch_id,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !position ||
      !role ||
      !email ||
      !password ||
      !phone ||
      !description ||
      !service_id ||
      !branch_id
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Branch validation
    const [[branchs]] = await db.query(
      "SELECT branch_id FROM branch WHERE branch_id = ?",
      [Number(branch_id)]
    );

    if (!branchs) {
      return res.status(400).json({ message: "Invalid branch ID" });
    }

    const [[service]] = await db.query(
      "SELECT service_id FROM services WHERE service_id = ?",
      [service_id]
    );
    if (!service) {
      return res.status(400).json({ message: "Invalid service ID" });
    }

    // Insert staff
    const [result] = await db.query(
      `INSERT INTO staff (name, position, role,email,password,phone, description, service_id,branch_id)
       VALUES (?, ?, ?, ?, ?,?,?,?,?)`,
      [
        name,
        position,
        role,
        email,
        password,
        phone,
        description,
        service_id,
        branch_id,
      ]
    );

    res.status(201).json({
      message: "Staff added successfully",
    });
  } catch (error) {
    next(error);
  }
};

// get staff
export const getstaff = async (req, res, next) => {
  try {
    const [allstaff] = await db.query(`SELECT s.*,b.branch_id FROM staff s
     LEFT JOIN branch b ON s.branch_id = b.branch_id`);
    return res
      .status(200)
      .json({ message: "staff added sucessfully", data: allstaff });
  } catch (error) {
    next(error);
  }
};

// delete staff
export const deletestaff = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "id required" });
    } else {
      const [check] = await db.query("SELECT * FROM staff WHERE staff_id = ?", [
        id,
      ]);
      if (check.length === 0) {
        return res.status(400).json({ message: "staff not found" });
      } else {
        await db.query("DELETE from staff WHERE staff_id=?", [id]);
        return res.status(200).json({ message: "staff deleted sucessfully" });
      }
    }
  } catch (error) {
    next(error);
  }
};

// update staff
export const updateStaff = async (req, res, next) => {
  try {
    const { id } = req.params; // staff_id
    const {
      name,
      position,
      role,
      email,
      password,
      phone,
      description,
      service_id,
      branch_id,
    } = req.body;

    // staff exist check
    const [staff] = await db.query(
      "SELECT staff_id FROM staff WHERE staff_id = ?",
      [id]
    );

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    await db.query(
      `UPDATE staff 
       SET 
         name = ?, 
         position = ?, 
         role = ?, 
         email = ?,
         password=?, 
         phone = ?, 
         description = ?, 
         service_id = ?,
         branch_id = ?
       WHERE staff_id = ?`,
      [
        name,
        position,
        role,
        email,
        password,
        phone,
        description,
        service_id,
        branch_id,
        id,
      ]
    );
    res.status(200).json({
      message: "Staff updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
