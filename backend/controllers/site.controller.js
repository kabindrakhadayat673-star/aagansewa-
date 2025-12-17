import db from "../config/db.connect.js";

// add inquiry
export const addInquiry = async (req, res) => {
  try {
    const { name, phone, email, address, description, branch_id } = req.body;
    // console.log(name);
    // console.log(phone);
    // console.log(email);
    // console.log(address);
    // console.log(description);
    // console.log(branch_id);
    if (!name || !phone || !email || !address || !description || !branch_id) {
      return res.status(400).json({ message: "All fields are required" });
    }
    await db.query(
      "INSERT INTO inquiry (name,phone,email,address,description,branch_id) VALUES (?,?,?,?,?,?)",
      [name, phone, email, address, description, branch_id]
    );
    return res.status(200).json({ message: "Inquiry added successfully" });
  } catch (error) {
    console.log(error);
  }
};

// get inquiry
export const getInquiry = async (req, res) => {
  try {
    const [allInquiry] = await db.query(
      `SELECT i.inquiry_id, i.name,i.phone,i.email,i.address,i.description,b.branch_id,b.branch_name FROM inquiry i LEFT JOIN branch b ON i.branch_id = b.branch_id`
    );
    return res.status(200).json({
      message: "available inquiry",
      data: allInquiry,
    });
  } catch (error) {
    console.log(error);
  }
};

// delete inquiry
export const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "id required" });
    } else {
      const [inquiry] = await db.query(
        "SELECT * FROM inquiry WHERE inquiry_id = ?",
        [id]
      );
      if (inquiry.length === 0) {
        return res.status(400).json({ message: "Inquiry not found" });
      } else {
        await db.query("DELETE from inquiry WHERE inquiry_id=?", [id]);
        return res.status(400).json({ message: "inquiry deleted sucessfully" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

//  add review
export const addreview = async (req, res) => {
  try {
    const {  star, description, branch_id, created_id } = req.body;
    if ( !star || !description || !branch_id ) {
      return res.status(400).json({ message: "ALL field required" });
    }
    await db.query(
      "INSERT INTO review (star,description,branch_id,created_at) VALUES (?,?,?,?)",
      [ star, description, branch_id, created_id]
    );

    res.status(400).json({ meaagae: "review add sucessfully" });
  } catch (error) {
    console.log(error);
  }
};

// get review
export const getreview = async (req, res) => {
  try {
    const [allreview] = await db.query(
      `SELECT r.star,r.description,b.branch_id,b.branch_name FROM review r LEFT JOIN branch b ON r.branch_id = b.branch_id `
    );
    return res.status(200).json({
      message: "available review",
      data: allreview,
    });
  } catch (error) {
    console.log(error);
  }
};
