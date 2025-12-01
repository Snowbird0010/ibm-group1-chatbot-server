const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());

// POST /upload (this is the endpoint your chatbot calls)
app.post("/upload", upload.single("uploaded_file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  console.log("Received file:", req.file.originalname);

  return res.json({
    msg: `Your file '${req.file.originalname}' was uploaded successfully!`
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
