const multer = require('multer');
const express = require('express');
const uploadController = express.Router();
const fs = require('fs').promises;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    // Use the original filename
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// Route for uploading a single image
uploadController.post("/image", upload.single("image"), async (req, res) => {
  try {
    return res.status(200).json("File uploaded");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Error uploading file");
  }
});

// Route for uploading multiple images (up to 6)
uploadController.post("/image/property", upload.array("images", 6), async (req, res) => {
  try {
    if (req.files) {
      const uploadedFilenames = req.files.map(file => file.filename);
      return res.status(200).json({ message: "Files uploaded", filenames: uploadedFilenames });
    } else {
      return res.status(400).json({ error: "No files uploaded" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json("Error uploading files");
  }
});


uploadController.delete("/deleteImages", async (req, res) => {
  try {
    const { filenames } = req.body;
    if (!filenames || !Array.isArray(filenames) || filenames.length === 0) {
      return res.status(400).json({ error: "Invalid or empty filenames array" });
    }

    const deletePromises = filenames.map(async (filename) => {
      let deleted = false;

      // Try deleting the file with different extensions
      try {
        const filePath = `public/images/${filename}`;
        await fs.unlink(filePath);
        deleted = true;
      } catch (error) {
        // Ignore the error and try the next extension
      }

      if (deleted) {
        return filename;
      } else {
        throw new Error(`File not found: ${filename}`);
      }
    });

    const deletedFilenames = await Promise.all(deletePromises);

    return res.status(200).json("Files deleted");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Error deleting files");
  }
});


module.exports = uploadController;
