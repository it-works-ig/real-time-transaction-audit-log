
# 🧾 Real-time Transaction & Audit Log System

A full-stack **Identity Management & Financial Microservice Simulation** that enables secure peer-to-peer (P2P) fund transfers with **strong consistency guarantees** and an **immutable audit trail**.

---

## 🚀 Project Overview

This project simulates a real-world financial transaction system with a strong emphasis on **data integrity, atomicity, and traceability**.

### Key Features

* 🔐 **Atomic P2P Transactions** — ensures money is never lost or duplicated
* 📜 **Immutable Audit Logs** — every transaction is permanently recorded
* ⚡ **Real-time Dashboard** — instant visibility of balances and transaction history
* 🧱 **Microservice-Oriented Design** — clean separation of concerns

---

## 🛠️ Tech Stack

### Backend

* **Node.js + Express**
* **Prisma ORM**
* **SQLite** (lightweight relational database)
* **Atomic database transactions** using `Prisma.$transaction`

### Frontend

* **React.js**
* Interactive dashboard
* Sortable transaction history (by timestamp & amount)

---

## 🧠 System Design Highlights

* **Atomicity**: All transfers execute within a rollback-capable transaction block.
* **Consistency**: Sender debit and receiver credit occur as a single operation.
* **Auditability**: Every transaction is logged to a dedicated `AuditLog` table acting as the system’s *source of truth*.
* **Failure Safety**: Any error automatically rolls back the entire transaction.

---

## ⚙️ Setup & Run Instructions

### ✅ Prerequisites

* Node.js (LTS version)
* npm
* VS Code (recommended)

---

### 🔹 Step 1: Backend Setup

cd backend
npm install

Initialize the database and apply migrations:

npx prisma migrate dev --name init

Start the backend server:

node server.js


📍 Backend runs at: **[http://localhost:3001](http://localhost:3001)**

---

### 🔹 Step 2: Frontend Setup

Open a new terminal:


cd frontend
npm install
npm start

📍 Frontend runs at: **[http://localhost:3000](http://localhost:3000)**

---

## 📡 API Documentation

| Endpoint           | Method | Description                                             |
| ------------------ | ------ | ------------------------------------------------------- |
| `/seed`            | GET    | Initializes database with test users (Alice & Bob)      |
| `/transfer`        | POST   | Executes a fund transfer (senderId, receiverId, amount) |
| `/history/:userId` | GET    | Fetches audit logs for a specific user                  |
| `/users`           | GET    | Lists all users with current balances                   |

---

## 🗄️ Database Schema

### **User Table**

| Field   | Type     | Description                    |
| ------- | -------- | ------------------------------ |
| id      | Int (PK) | Unique user ID                 |
| name    | String   | User name                      |
| balance | Float    | Wallet balance (default: 1000) |

### **AuditLog Table**

| Field      | Type     | Description                        |
| ---------- | -------- | ---------------------------------- |
| id         | Int (PK) | Unique transaction ID              |
| senderId   | Int      | Sender user ID                     |
| receiverId | Int      | Receiver user ID                   |
| amount     | Float    | Transfer amount                    |
| status     | String   | Transaction status (e.g., SUCCESS) |
| timestamp  | DateTime | Commit time of transaction         |

---

## 🧪 Example Use Case

1. Seed the database with test users.
2. Initiate a transfer from Alice → Bob.
3. Balances update atomically.
4. Transaction appears instantly in the Audit Log.
5. Any failure rolls back all changes automatically.

---

## 🤖 AI Tool Usage Log (MANDATORY)

| Section                 | Details                                                                                                                                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **AI-Assisted Tasks**   | 1. Generated Prisma `$transaction` boilerplate for atomic fund transfers.<br>2. Created `TransactionTable.jsx` with dynamic sorting (timestamp & amount).<br>3. Refactored backend error handling for clear frontend feedback. |
| **Effectiveness Score** | ⭐⭐⭐⭐⭐ (5 / 5)                                                                                                                                                                                                                  |
| **Justification**       | AI tools (ChatGPT / Gemini) reduced development time by ~2 hours by providing reliable transaction patterns and UI boilerplate. This enabled greater focus on system correctness and data consistency.                         |

---

## ✅ Evaluation Criteria Checklist (Self-Assessment)

* **Backend Atomic Transactions**: ✅ Yes
* **Frontend Real-Time UI**: ✅ Yes
* **Audit Log as Source of Truth**: ✅ Yes
* **Clean Code & Structure**: ✅ Yes
* **AI Usage Transparently Documented**: ✅ Yes

---

## 📌 Future Enhancements (Optional)

* JWT-based authentication
* WebSocket-based real-time updates
* PostgreSQL support
* Role-based access control (RBAC)
* Transaction failure simulations

---

## 👤 Author

**Parth Gupta**
B.Tech Computer Engineering
Full-Stack & Systems-Oriented Developer
