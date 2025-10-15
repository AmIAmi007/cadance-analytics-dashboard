# Cadence Analytics Dashboard

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=nodedotjs)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql)

A full-stack, interactive web application designed to upload, visualize, and manage ticket data from XLSX files. Data is parsed by a Node.js backend, stored persistently in a MySQL database, and displayed in a real-time, feature-rich React dashboard.

---

## Live Demo Screenshot

![Dashboard Screenshot](<[Link to your screenshot here]>)

---

## 📖 About The Project

This project was built to transform the static, manual process of analyzing ticket data in spreadsheets into a dynamic and persistent web experience. It provides a user-friendly interface to upload an XLSX file, which is then automatically processed and saved to a central database. The dashboard presents this data through aggregated summaries, interactive charts, and a detailed data table, allowing for efficient filtering, sorting, and management of records.

## ✨ Key Features

* **XLSX File Upload:** Seamlessly upload data files via a simple user interface.
* **Persistent Data Storage:** A robust Node.js backend parses files and stores all data in a MySQL database, ensuring data integrity and persistence.
* **Interactive Dashboard:**
    * Aggregated "Dashboard Overview" of tickets by priority (P0/P1).
    * Drill-down modals to view the specific data behind any statistic.
    * Toggle between Bar and Pie charts for powerful data visualization.
* **Advanced Data Management:**
    * Sortable columns for Key, Ticket, and Priority.
    * Inline editing for remarks with a full, automatically generated audit trail.
    * Dynamic filtering of the entire dataset by `Key`.

---

## 🚀 Tech Stack

This project is a full-stack application built with a modern and efficient technology stack.

**Frontend:**
* **Framework:** [React 19](https://react.dev/) (with Vite)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Charting:** [Recharts](https://recharts.org/)
* **Icons:** [Lucide React](https://lucide.dev/)

**Backend:**
* **Runtime:** [Node.js](https://nodejs.org/)
* **Framework:** [Express](https://expressjs.com/)
* **File Handling:** [Multer](https://github.com/expressjs/multer)
* **XLSX Parsing:** [SheetJS (xlsx)](https://sheetjs.com/)

**Database:**
* [MySQL](https://www.mysql.com/)

---

## 🛠️ Getting Started

To get a local copy up and running, follow these simple installation and setup steps.

### Prerequisites

You must have the following software installed on your machine:
* [Node.js](https://nodejs.org/en/download/) (v18 or later is recommended)
* npm (comes with Node.js)
* [MySQL Server](https://dev.mysql.com/downloads/mysql/) installed and running.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/AmIAmi007/cadance-analytics-dashboard.git](https://github.com/AmIAmi007/cadance-analytics-dashboard.git)
    cd cadance-analytics-dashboard
    ```

2.  **Install project dependencies:**
    ```sh
    npm install
    ```

3.  **Setup the Database:**
    * Connect to your local MySQL instance.
    * Run the following SQL commands to create the database and the required `tickets` table:
        ```sql
        CREATE DATABASE IF NOT EXISTS cadence_db;
        USE cadence_db;
        CREATE TABLE IF NOT EXISTS tickets (
            id INT AUTO_INCREMENT PRIMARY KEY,
            `Key` VARCHAR(255),
            Ticket INT UNIQUE,
            RSU VARCHAR(255),
            Escalation VARCHAR(255),
            Priority INT,
            Date VARCHAR(255),
            ProdLevel2 VARCHAR(255),
            RemarkExists CHAR(1),
            Remarks TEXT,
            AuditTrail TEXT
        );
        ```

4.  **Configure the Backend Server:**
    * In the project root, open the `server.cjs` file.
    * Update the `mysql.createConnection` object with your MySQL credentials.
        ```javascript
        // In server.cjs
        const db = mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: 'YOUR_MYSQL_PASSWORD', // <-- IMPORTANT: Add your password here
          database: 'cadence_db'
        }).promise();
        ```

### Running the Application

This project requires both the backend and frontend servers to be running simultaneously. You will need **two separate terminals** for this.

1.  **Terminal 1: Start the Backend Server**
    ```sh
    node server.cjs
    ```
    *You should see the confirmation message: "Server running on http://localhost:3001"*

2.  **Terminal 2: Start the Frontend React App**
    ```sh
    npm run dev
    ```
    *Your browser should open to the local URL provided (e.g., http://localhost:5173)*

---

##  usage

Once the application is running, use the **"Upload File"** button to select an XLSX file from your computer. The dashboard will automatically populate with the data from the file. All subsequent visits to the app will load the data directly from the database.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
