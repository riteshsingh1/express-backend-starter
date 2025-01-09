# Express Backend Starter

A production-ready Express.js backend starter template with TypeScript, MongoDB, Redis, RabbitMQ, and Elasticsearch integration.

## Features

- 🚀 **TypeScript** - Write better code with type safety
- 🔒 **Security First** - Helmet.js integration for secure HTTP headers
- 📦 **MongoDB Integration** - Using Mongoose for elegant MongoDB object modeling
- 🔑 **API Key Authentication** - Built-in API key middleware
- 🎯 **Environment Validation** - Using Joi for environment variable validation
- 📝 **Logging** - Winston logger with Elasticsearch integration
- 🔄 **Job Scheduling** - Built-in job scheduling system
- 🐇 **Message Queue** - RabbitMQ integration for async operations
- 💾 **Redis Support** - For caching and session management
- 🛠️ **Developer Experience** - Hot reloading and path aliases

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Redis
- RabbitMQ
- Elasticsearch (optional)

## Quick Start

1. Clone the repository:

```bash
git clone https://github.com/your-repo/express-backend-starter.git
cd express-backend-starter
```

2. Run the setup script:

```bash
chmod +x setup.sh
./setup.sh
```

3. Start development server:

```bash
npm run dev
```

4. For production build:

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env` file in the root directory. Required variables:

```env
APP_NAME=your-app-name
PORT=3000
BASE_PATH=/api/v1
ENV=development
API_KEY=your-api-key
RABBITMQ_URL=amqp://localhost
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
ELASTICSEARCH_URL=http://localhost:9200
ALLOW_ELASTIC_LOGGING=true
MONGO_URI=mongodb://localhost:27017/your-db
ENCRYPTION_KEY=your-encryption-key
LOG_LEVEL=debug
```

## Project Structure

```
src/
├── config/         # Configuration files
├── jobs/          # Background jobs
├── middlewares/   # Express middlewares
├── models/        # Mongoose models
├── router/        # Route definitions
├── services/      # Business logic
└── index.ts       # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests (to be implemented)

## Security Features

- Helmet.js integration for secure headers
- API key authentication
- XSS protection
- CSRF protection
- No-Sniff header
- Frame guard
- HSTS enabled
- Strict referrer policy

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.
