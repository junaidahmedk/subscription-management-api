<h1 align="center"> Subscription Management API </h1>

<p align="center">
  <img src="./assets/cover-image.png" alt="Subscription Management API Cover" width="800">
</p>


A **production-ready backend API** for managing user subscriptions and sending automated renewal reminders.

Built with **Node.js**, **Express**, **MongoDB**, and **Redis (BullMQ)**, this API provides a scalable, secure solution for handling authentication, core subscription management, and automated, queue-based email workflows.




## 📖 Outline

- [✨ Features](#-features)
- [🧰 Tech Stack](#-tech-stack)
- [🛠️ Setup and Installation](#%EF%B8%8F-setup-and-installation)
  - [Prerequisites](#prerequisites)
  - [Steps](#steps)
- [🔑 API Endpoints](#-api-endpoints)
  - [User Authentication](#user-authentication)
  - [Subscription Management](#subscription-management)
  - [Job Queue / Background Processing](#job-queue--background-processing)
- [🧠 Future Enhancements](#-future-enhancements)
- [📝 License](#-license)



## ✨ Features

- 🧠 **User Authentication** – Secure signup, signin, and **JWT-based access control** for protected routes.
- 💳 **Subscription Management** – Robust CRUD operations (Create, Update, Delete, Fetch) for tracking user subscriptions.
- ⏰ **Automated Email Reminders** – A reliable **queue-based system** powered by **BullMQ and Redis** for scheduling and sending subscription expiry reminders.
- 📧 **Dynamic Email Templates** – Personalized reminders sent via **Nodemailer**, complete with relevant subscription details.
- 🛡️ **Security & Middlewares** – Integrated **Arcjet** for efficient bot protection and rate limiting, along with comprehensive global error handling.
- 🗄️ **MongoDB Integration** – Uses **Mongoose** for clean, structured data models for users and subscriptions.
- ⚙️ **Production Config** – Modular structure, environment-based configuration using `dotenv` for development and production environments, ensuring a clean and organized codebase.



## 🧰 Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Backend** | **Node.js** & **Express** | The core runtime and web application framework. |
| **Database** | **MongoDB** & **Mongoose** | Flexible NoSQL database and its object data modeling (ODM) library. |
| **Job Queue** | **BullMQ** & **Redis** | High-performance job queue library and its message broker for handling background tasks (reminders). |
| **Email Service** | **Nodemailer** | Module for sending emails. |
| **Security** | **Arcjet** | Bot protection and intelligent rate limiting middleware. |
| **Utilities** | **Day.js**, **dotenv** | Lightweight date library and environment variable management. |



## 🛠️ Setup and Installation

### Prerequisites

You need the following installed on your machine:
* Node.js (LTS version recommended)
* MongoDB Instance (Local or remote)
* Redis Instance (Local or remote for BullMQ)

### Steps

1.  **Clone the Repository**
    ```bash
    git clone [YOUR_REPO_URL]
    cd subscription-tracker-api
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add the necessary environment variables (e.g., `PORT`, `MONGO_URI`, `REDIS_HOST`, `JWT_SECRET`, and email service credentials).

    **Example `.env` structure (partial):**
    ```env
    # Server Configuration
    PORT=3000

    # Database
    MONGO_URI=mongodb://localhost:27017/subscription_db

    # JWT Authentication
    JWT_SECRET=your_super_secret_key
    JWT_EXPIRES_IN=1d

    # Redis/BullMQ
    REDIS_HOST=localhost
    REDIS_PORT=6379

    # Email Service (Nodemailer - Use SMTP client Brevo/Mailtrap)
    EMAIL_HOST=smtp.example.com
    EMAIL_PORT=587
    EMAIL_USER=your_email_user
    EMAIL_PASS=your_email_password
    ```
    *(Note: You'll also need to configure your Arcjet keys if using that service in production.)*

4.  **Run the Server**

    **Development Mode (with auto-reload):**
    ```bash
    npm run dev
    ```

    **Production Mode:**
    ```bash
    npm start
    ```

The API will be running at `http://localhost:[PORT]` (e.g., `http://localhost:3000`).



## 🔑 API Endpoints

The following are the core endpoints provided by the API:

### User Authentication

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/signup` | Register a new user. | Public |
| `POST` | `/api/v1/auth/login` | Log in and receive a JWT. | Public |
| `GET` | `/api/v1/auth/me` | Fetch the current logged-in user's details. | Private (Requires JWT) |

### Subscription Management

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/subscriptions` | Create a new subscription. | Private (Requires JWT) |
| `GET` | `/api/v1/subscriptions` | Get all subscriptions for the authenticated user. | Private (Requires JWT) |
| `GET` | `/api/v1/subscriptions/:id` | Get a specific subscription by ID. | Private (Requires JWT) |
| `PATCH`| `/api/v1/subscriptions/:id` | Update an existing subscription. | Private (Requires JWT) |
| `DELETE`| `/api/v1/subscriptions/:id` | Delete a subscription. | Private (Requires JWT) |

### Job Queue / Background Processing

The job processing logic is handled internally:
* **Job Producer:** Enqueues new reminder jobs when a subscription is created or updated.
* **Job Consumer:** Processes jobs from the Redis queue, handles the email logic (Nodemailer), and sends the automated reminders.

#### 💌 Reminder Workflow

The API automatically schedules and sends email reminders before subscription renewal using BullMQ jobs.
Each reminder is personalized with user details, subscription plan, and remaining days before renewal.



## 🧠 Future Enhancements

* Add a frontend dashboard for managing subscriptions

* Introduce multi-channel reminders (SMS / Push notifications)

* Analytics dashboard for user engagement and renewal rates

## 📝 License

This project is licensed under the MIT License - see the `LICENSE` file for details.
