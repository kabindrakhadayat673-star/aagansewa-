import db from "../config/db.connect.js";
import { removeImg } from "../utlis/removeimg.js";
import { compressImg } from "../utlis/sharphandler.js";

// add gallery
export const addgallery = async (req, res, next) => {
  try {
    const { title, gallery_date, location, branch_id } = req.body;
    const images = req.files;
    if (
      !title ||
      !gallery_date ||
      !location ||
      !branch_id ||
      !images ||
      images.length === 0
    ) {
      for (const i of images) {
        removeImg(i.path);
      }
      return res.status(400).json({
        message: "All fields  are required",
      });
    }
    // Check if branch exists
    const [branch] = await db.execute(
      "SELECT * FROM branch WHERE branch_id = ?",
      [branch_id]
    );
    if (branch.length === 0) {
      for (const i of images) {
        removeImg(i.path);
      }

      return res.status(404).json({ message: "Branch not found" });
    }
    // Compress and save all images
    const imagePaths = [];
    for (const i of images) {
      const outputPath = `uploads/gallery/${i.filename}`; // i is a variable
      await compressImg(i.path, outputPath);
      imagePaths.push(outputPath);
    }

    // it is use for separating images path by comma.
    const imageStiring = imagePaths.join(",");
    // Save gallery info in DB
    // Option 1: save multiple images as JSON in one column
    await db.execute(
      `INSERT INTO gallery (title, gallery_date, location, branch_id, image)
       VALUES (?, ?, ?, ?,  ?)`,
      [title, gallery_date, location, branch_id, imageStiring]
    );

    res.status(201).json({
      message: "photos are  added successfully",
      images: imagePaths,
    });
  } catch (error) {
    next(error);
  }
};

// get gallery
export const getgallery = async (req, res, next) => {
  try {
    const [galleries] = await db.execute(
      "SELECT * FROM gallery ORDER BY created_at DESC"
    );

    if (galleries.length === 0)
      return res.status(404).json({ message: "No gallery entries found" });

    res.status(200).json({
      message: "Gallery fetched successfully",
      galleries,
    });
  } catch (error) {
    next(error);
  }
};

// delete gallery
export const deletegallery = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [existing] = await db.execute(
      "SELECT * FROM gallery WHERE gallery_id = ?",
      [id]
    );
    if (existing.length === 0)
      return res.status(404).json({ message: "Gallery entry not found" });

    const gallery = existing[0];

    // Remove image
    if (gallery.image) removeImg(gallery.image);

    // Delete DB record
    await db.execute("DELETE FROM gallery WHERE gallery_id = ?", [id]);

    res.status(200).json({ message: "Gallery deleted successfully" });
  } catch (error) {
    next(error);
  }
};