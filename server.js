const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());

// POST /upload
app.post("/upload", upload.single("uploaded_file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  console.log("Received file:", req.file.originalname);

  try {
    const pdfData = await pdfParse(req.file.buffer);

    return res.json({
      msg: `File '${req.file.originalname}' uploaded successfully`,
      text: pdfData.text  // 🔥 Watson Assistant needs this text
    });

  } catch (err) {
    console.error("PDF parse error:", err);
    return res.status(500).json({ msg: "Error reading PDF file" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
