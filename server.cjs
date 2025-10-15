const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const xlsx = require("xlsx");

const app = express();
const port = 3001;

// --- IMPORTANT: MYSQL DETAILS ---
const db = mysql
  .createConnection({
    host: "localhost",
    user: "THANDE_PAPA", 
    password: "password", 
    database: "cadence_db",
  })
  .promise();

// Middleware
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// API ENDPOINT 1: Fetch all ticket data
app.get("/api/data", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM tickets ORDER BY Date DESC");
    res.json(rows);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    res.status(500).json({ message: "Failed to fetch data" });
  }
});

// API ENDPOINT 2: Upload and process XLSX file
app.post("/api/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  try {
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    if (jsonData.length === 0) {
      return res.status(400).json({ message: "XLSX file is empty." });
    }

    // Prepare for bulk insert. ON DUPLICATE KEY UPDATE will update existing tickets.
    const query = `
      INSERT INTO tickets (\`Key\`, Ticket, RSU, Escalation, Priority, Date, ProdLevel2, RemarkExists, Remarks, AuditTrail) 
      VALUES ? 
      ON DUPLICATE KEY UPDATE 
        \`Key\`=VALUES(\`Key\`), RSU=VALUES(RSU), Escalation=VALUES(Escalation), Priority=VALUES(Priority), 
        Date=VALUES(Date), ProdLevel2=VALUES(ProdLevel2), RemarkExists=VALUES(RemarkExists), 
        Remarks=VALUES(Remarks), AuditTrail=VALUES(AuditTrail)
    `;

    const values = jsonData.map((row) => [
      row.Key,
      row.Ticket,
      row.RSU,
      row.Escalation,
      row.Priority,
      row.Date,
      row.ProdLevel2,
      row.RemarkExists,
      row.Remarks || "",
      row.AuditTrail || "",
    ]);

    await db.query(query, [values]);

    res
      .status(200)
      .json({ message: "File processed and data saved successfully." });
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).json({ message: "Error processing file." });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
