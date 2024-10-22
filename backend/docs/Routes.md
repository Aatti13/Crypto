# Routes
<br>

| **Feature**                          | **HTTP Method** | **Route**                          | **Description**                                            |
|--------------------------------------|----------------|------------------------------------|------------------------------------------------------------|
| **User Authentication & Profile**    |                |                                    |                                                            |
|                                      | POST           | `/api/auth/register`               | Registers a new user                                        |
|                                      | POST           | `/api/auth/login`                  | Authenticates the user and returns a JWT token              |
|                                      | POST           | `/api/auth/reset-password`         | Initiates password reset                                    |
|                                      | GET            | `/api/auth/profile`                | Retrieves user profile details (JWT-protected)              |
| **Crypto Trading**                   |                |                                    |                                                            |
|                                      | GET            | `/api/trades/prices`               | Fetches real-time cryptocurrency prices                     |
|                                      | POST           | `/api/trades/place`                | Places a new trade order (buy/sell)                         |
|                                      | GET            | `/api/trades/history`              | Retrieves transaction history for a user                    |
| **Portfolio Management**             |                |                                    |                                                            |
|                                      | GET            | `/api/portfolio`                   | Retrieves current holdings and portfolio value              |
|                                      | POST           | `/api/portfolio/update`            | Updates the user’s portfolio with a new trade               |
|                                      | GET            | `/api/portfolio/gains-losses`      | Displays gain/loss reports based on historical data         |
| **Crypto News Feed**                 |                |                                    |                                                            |
|                                      | GET            | `/api/news`                        | Fetches latest cryptocurrency news articles                 |
|                                      | GET            | `/api/news/:topic`                 | Filters news by a specific topic or cryptocurrency          |
| **Educational Tutorials & Quizzes**  |                |                                    |                                                            |
|                                      | GET            | `/api/tutorials`                   | Fetches a list of available tutorials                       |
|                                      | GET            | `/api/tutorials/:id`               | Retrieves details of a specific tutorial                    |
|                                      | GET            | `/api/tutorials/:id/quiz`          | Fetches the associated quiz for a tutorial                  |
|                                      | POST           | `/api/tutorials/:id/quiz/submit`   | Submits quiz answers and returns a score                    |
| **Admin Dashboard**                  |                |                                    |                                                            |
|                                      | GET            | `/api/admin/users`                 | Fetches a list of all users                                 |
|                                      | POST           | `/api/admin/tutorials`             | Allows an admin to create new tutorials                     |
|                                      | DELETE         | `/api/admin/users/:id`             | Deletes a user from the system                              |
|                                      | GET            | `/api/admin/stats`                 | Retrieves platform usage analytics                          |
| **Blockchain Integration (Optional)**|                |                                    |                                                            |
|                                      | POST           | `/api/wallets/link`                | Links a new crypto wallet to a user’s profile               |
|                                      | GET            | `/api/wallets/balance`             | Retrieves the current balance of a user’s linked wallet     |
|                                      | POST           | `/api/wallets/transaction`         | Initiates a blockchain transaction via the connected wallet |
| **Error Handling & Logging**         |                |                                    |                                                            |
|                                      | N/A            | Centralized error handling         | Manages error responses and logging                         |
