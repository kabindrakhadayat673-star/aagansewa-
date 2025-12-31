import db from "../config/db.connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
    // check user
    const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const user = users[0];
    // password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log(process.env.EXPIRE);
    // jsonwebtoken
    const token =  jwt.sign(
      {
        // 1 your detalis
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      // 2.secret key
      process.env.SECRET_KEY,


      {
        // 3.Expire time
        expiresIn: process.env.EXPIRE,
      }
    );
    // console.log(process.env.SECRET_KEY)
    // storing token to cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
     maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    // success
    res.status(200).json({
      message: "Login successful",
      user: {
        user_id: user.user_id,
        email: user.email,
        role: user.role,
        branch_id: user.branch_id,
        token: token,
      },
    });
  } catch (error) {
    next(error);
  }
};

// logout
export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Sucessfully log out" });
  } catch (error) {
    next(error);
  }
};

// manager api

// add manager
export const addManager = async (req, res, next) => {
  try {
    const { name, email, password, branch_id } = req.body;

    // console.log(req.body);

    if (!name || !email || !password || !branch_id) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    //check the user already exist or not
    const [exist] = await db.execute("select email from users where email= ?", [
      email,
    ]);
    if (exist.length > 0) {
      return res.status(409).json({
        message: `email  already exist use diffrent email `,
      });
    }
   
    // Check branch exists
    const [branch] = await db.execute(
      "SELECT * FROM branch WHERE branch_id = ?",
      [branch_id]
    );
    if (branch.length === 0)
      return res.status(404).json({ message: "Branch not found" });
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.execute(
      `INSERT INTO users
      (name, email, password, branch_id)
      VALUES (?, ?, ?, ?)`,
      [name, email, hashedPassword, branch_id]
    );

    res.status(201).json({
      message: `Manager  added successfully in ${branch[0].branch_name} branch`,
    });
  } catch (error) {
    next(error);
  }
};

// get manager
export const getManager = async (req, res, next) => {
  try {
    const [manager] = await db.execute("SELECT * FROM users");
    if (manager.length === 0)
      return res.status(404).json({ message: "No manager found" });
    res.status(200).json({
      message: "Manager fetched successfully",
      managers: manager,
    });
  } catch (error) {
    next(error);
  }
};

// delete manager
export const deleteManager = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "manager id is required" });
    }
    const [manager] = await db.query("SELECT * from users from user_id");
    if (manager.length === 0) {
      return res.status(400).json({ messager: "manager not found" });
    } else {
      await db.query("DELETE FROM users WHERE user_id = ?", [id]);
      return res.status(200).json({ message: "manager deleted successfully" });
    }
  } catch (error) {
    next(error);
  }
};

// update manager
export const updateManager = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name,email,branch_id, } = req.body;

    const [existing] = await db.execute(
      `SELECT * FROM users WHERE user_id = ? `,
      [id]
    );
    if (existing.length === 0)
      return res.status(404).json({ message: "Manager not found" });
    if (email) {
      const [existEmail] = await db.execute(
        "select email from users where email = ? and user_id !=?",
        [email, id]
      );
      if (existEmail.length > 0) {
        return res.status(409).json({
          message: `email  already exist use diffrent email `,
        });
      }
    }
    const oldStaff = existing[0];

    // Optional: Validate service and branch if provided
 if (branch_id) {
      const [branch] = await db.execute(
        "SELECT * FROM branch WHERE branch_id = ?",
        [branch_id]
      );
      if (branch.length === 0)
        return res.status(404).json({ message: "Branch not found" });
    }
      const updateName = name || oldStaff.name;
     const updateEmail = email || oldStaff.email;
     const updteBranchId = branch_id || oldStaff.branch_id;
    await db.execute(
      "UPDATE users SET name=?, email=?,  branch_id=? WHERE user_id=?",
      [updateName, updateEmail, updteBranchId, id]
    ); res.status(200).json({ message: "Manager updated successfully" });
  } catch (error) {
    next(error);
  }
};
