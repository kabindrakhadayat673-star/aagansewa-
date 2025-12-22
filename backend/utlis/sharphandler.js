import sharp from "sharp";
import fs from "fs/promises";
export const compressImg = async (inputPath, outputPath) => {
  try {
    await sharp(inputPath)
      .resize({ width: 80 })
      .jpeg({ quality: 70 })
      .toFile(outputPath);
    await fs.unlink(inputPath);
    return outputPath;
  } catch (error) {
    console.log(error);
  }
};
