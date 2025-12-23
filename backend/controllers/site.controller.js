import db from "../config/db.connect.js";
import { removeImg } from "../utlis/removeimg.js";
import { compressImg } from "../utlis/sharphandler.js";

// add inquiry
export const addInquiry = async (req, res, next) => {
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
    next(error);
  }
};

// get inquiry
export const getInquiry = async (req, res, next) => {
  try {
    const [allInquiry] = await db.query(
      `SELECT i.inquiry_id, i.name,i.phone,i.email,i.address,i.description,b.branch_id,b.branch_name FROM inquiry i LEFT JOIN branch b ON i.branch_id = b.branch_id`
    );
    return res.status(200).json({
      message: "available inquiry",
      data: allInquiry,
    });
  } catch (error) {
    next(error);
  }
};

// delete inquiry
export const deleteInquiry = async (req, res, next) => {
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
    next(error);
  }
};

//  add review
export const addreview = async (req, res, next) => {
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
    next(error);
  }
};

// get review
export const getreview = async (req, res, next) => {
  try {
    const [allreview] = await db.query(
      `SELECT r.star,r.description,b.branch_id,b.branch_name FROM review r LEFT JOIN branch b ON r.branch_id = b.branch_id `
    );
    return res.status(200).json({
      message: "available review",
      data: allreview,
    });
  } catch (error) {
    next(error);
  }
};

// add trust_customer
export const addTrustedCostumer = async (req, res, next) => {
  try {
    const { name } = req.body;
    const trusted_image = req.file;
    console.log(name);
    console.log(trusted_image);
   

    if (!name || !trusted_image) {
      if (req.file) {
        removeImg(req.file.path);
      }
      return res.status(400).json({ message: "Name and image are required" });
    }

    // compress and save

    let imagePath = "";
    if (req.file) {
      const outputPath = `uploads/costumer/school-${req.file.filename}`;
      await compressImg(req.file.path, outputPath);
      imagePath = outputPath;
    }
    // const photopath = `uploads/trusted/${trusted_image.filename}`;
    // await compressImg(trusted_image.path, imagePath);

    // save to DB
    await db.execute(
      "INSERT INTO trusted_costumer (name, image) VALUES (?, ?)",
      [name, imagePath]
    );

    res.status(201).json({ message: "Trusted customer added successfully" });
  } catch (error) {
    if (req.file) {
      removeImg(req.file.path);
    }
    next(error);
  }
};

// get trust_customer
export const getTrustedCustomers = async (req, res, next) => {
  try {
    // Fetch all trusted customers
    const [customers] = await db.execute(
      "SELECT * FROM  trusted_costumer ORDER BY created_at DESC"
    );

    if (customers.length === 0) {
      return res.status(404).json({ message: "No trusted customers found" });
    }

    res.status(200).json({
      message: "Trusted costumer fetched successfully",
      trustedCustomers: customers,
    });
  } catch (error) {
    next(error);
  }
};

// delete trust_customer
export const deleteTrustedCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "id required" });
    } else {
      const [customer] = await db.query(
        "SELECT * FROM trusted_costumer WHERE costumer_id = ?",
        [id]
      );
      if (customer.length === 0) {
        return res.status(400).json({ message: "customer not found" });
      } else {
        await db.query("DELETE from trusted_costumer WHERE costumer_id=?", [id]);
        return res
          .status(400)
          .json({ message: "customer deleted sucessfully" });
      }
    }
  } catch (error) {
    next(error);
  }
};
