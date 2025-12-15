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
    const [provience] = await db.query(
      `SELECT p.province_id, p.province_name,GROUP_CONCAT(d.district_name) as district FROM province p LEFT JOIN district d ON p.province_id=d.province_id GROUP BY p.province_id, p.province_name`
    );

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

// add district
export const addDistrict = async (req, res) => {
  try {
    const { district_name, province_id } = req.body;

    if (!district_name || !province_id) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const [province] = await db.query(
      "SELECT * FROM province WHERE province_id = ?",
      [province_id]
    );
    if (province.length === 0) {
      return res.status(400).json({ message: "Province not found" })
    }
    const [checkDistrict] = await db.query(
      "SELECT * FROM district WHERE district_name = ? ",
      [district_name]
    );

    if (checkDistrict.length > 0) {
      return res.status(400).json({ message: "District already exists" })
    }
  await db.query(
      "INSERT INTO district (district_name, province_id) VALUES (?, ?)",
      [district_name, province_id]
    );
    return res.status(400).json({ message: "District added successfully" });
  } catch (error) {
    console.log(error);
  }
};

// get district
export const getDistrict = async (req, res) => {
  try {
    const [alldistrict]=await db.query(`SELECT * FROM district `);
    return res.status(200).json({
      messgae:"available diatrict",
      data:alldistrict
    })
    
} catch (error) {
  console.log(error);
     }
};

// delete district
export const deleteDistrict = async (req,res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "All fields are required" });
    } else {
      const [district] = await db.query(
        "SELECT * FROM district WHERE district_id = ?",
        [id]
      );
      if (district.length === 0) {
        return res.status(400).json({ message: "District not found" });
      } else {
        await db.query("DELETE FROM district WHERE district_id = ?", [id]);
        return res.status(200).json({ message: "District deleted successfully" });
      }
      
    }
    
  } catch (error) {
    
  }
};

// add branch
export const addbranch= async =>{
  try {
    
  } catch (error) {
    
  }

} 


