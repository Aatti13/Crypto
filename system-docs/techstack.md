# Crypto: Tech-stack

Here’s the tech stack in a tabular format:

| **Category**               | **Technology**                                      | **Purpose**                                                              |
|----------------------------|----------------------------------------------------|--------------------------------------------------------------------------|
| **Frontend**                | React.js                                           | Core framework for building the user interface                           |
|                            | Redux (optional)                                  | State management for complex data (e.g., price updates, user sessions)    |
|                            | Chart.js / D3.js                                   | Data visualization for price charts, portfolio graphs                    |
|                            | Video.js                                           | Embedding and playing video tutorials                                    |
|                            | TinyMCE / Quill.js                                 | Rich text editor for tutorials and discussion forums                     |
|                            | Material-UI / Ant Design                           | UI components for building admin dashboard and user interface             |
| **Backend**                 | Node.js                                            | Server-side JavaScript runtime                                           |
|                            | Express.js                                         | Web framework for routing and handling API requests                      |
|                            | MongoDB                                            | NoSQL database for storing user data, transactions, and tutorial content  |
| **Authentication & Security** | JWT (JSON Web Tokens)                             | Session management and user authentication                               |
|                            | bcrypt                                             | Password hashing and encryption                                          |
|                            | Auth0 / Passport.js                                | OAuth and third-party authentication (Google, Facebook login)            |
|                            | speakeasy                                          | Two-factor authentication (2FA)                                          |
| **Real-time Data & WebSockets** | Socket.IO                                       | Real-time updates for prices, user interactions (forum, trades)           |
|                            | Web3.js / Ethers.js                                | Interacting with blockchain wallets and transactions                     |
| **API Integrations**        | CoinGecko API / CoinMarketCap API                  | Real-time cryptocurrency prices and market data                          |
|                            | Binance API / Coinbase API                         | Crypto trading and market data                                           |
| **Additional Tools & Services** | Redis                                          | Caching for performance improvement (news feed, API responses)            |
|                            | Firebase                                           | Push notifications (tutorial reminders, market updates)                  |
|                            | Puppeteer / Cheerio                                | Web scraping for aggregating crypto news                                 |
|                            | RSS Feeds                                          | Continuously updating crypto-related news                                |
| **Cloud & DevOps**          | Docker                                             | Containerization of applications                                         |
|                            | Kubernetes                                         | Managing containers and services at scale                                |
|                            | CI/CD (GitHub Actions / Travis CI)                 | Automated testing and continuous deployment                              |
| **Performance Optimization** | Content Delivery Network (CDN)                    | Fast content delivery for static assets (images, videos, etc.)            |
