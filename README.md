# Crypto Exchange Web App

A **MERN stack** crypto exchange platform that allows users to trade cryptocurrencies, access crypto news, educational tutorials, and manage their portfolios. This project also supports interactive learning through quizzes and video tutorials.

## Features

- **User Authentication:** Secure login, registration, and two-factor authentication (2FA).
- **Crypto Trading:** Buy, sell, and trade cryptocurrencies with real-time price updates.
- **Portfolio Management:** Track your holdings, monitor market trends, and get personalized suggestions.
- **Crypto News:** Get real-time news updates and search/filter news articles by cryptocurrency.
- **Educational Content:** Video tutorials, text-based guides, and quizzes to enhance learning.
- **Admin Dashboard:** Manage users, tutorials, and view platform analytics.

## Tech Stack

| **Frontend**               | **Backend**                        | **Extended Features**               |
|----------------------------|------------------------------------|-------------------------------------|
| React.js                   | Node.js, Express.js                | Web3.js, Ethers.js (Blockchain Interaction) |
| Redux (Optional)            | MongoDB                            | JWT (User Authentication)          |
| React Router                | Mongoose                           | Socket.IO (Real-time Price Updates) |
| Axios (API calls)           | Passport.js/Auth0 (OAuth)          | Redis (Caching)                    |
| Chart.js/D3.js (Charts)     | Bcrypt.js (Password Encryption)    | Firebase (Push Notifications)      |

## Folder Structure

```bash
crypto-exchange-app/
│
├── backend/               # Node.js, Express.js, MongoDB server-side code
│   ├── src/               # Source code for the backend
│   ├── dist/              # Compiled JS (if using TypeScript)
│   └── package.json       # Backend dependencies
│
├── frontend/              # React.js client-side code
│   ├── public/            # Static assets
│   └── src/               # Source code for the frontend
│
├── docs/                  # Project documentation
├── docker-compose.yml     # Docker configuration
└── README.md              # Project overview and setup instructions
