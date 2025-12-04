# Freezer Manager

A web application for managing freezer items, helping you keep track of what's frozen and when to use it.

## Features

- ✨ Add, edit, and delete freezer items
- 📅 Track frozen date and use-by date
- 🏷️ Categorize items (Meat, Vegetables, Prepared Meals, etc.)
- 📝 Add notes for each item
- 💾 Server-side JSON storage for data persistence
- 🎨 Clean, modern UI with responsive design

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Express + TypeScript
- **Storage**: JSON file-based storage
- **Styling**: Vanilla CSS

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd freezer-manager
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

Start both frontend and backend servers:

```bash
npm run dev:all
```

This will start:
- Frontend (Vite) on [http://localhost:5173](http://localhost:5173)
- Backend (Express) on [http://localhost:3001](http://localhost:3001)

Alternatively, run them separately:

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run dev:server
```

### Building for Production

Build the frontend:
```bash
npm run build
```

Build the backend:
```bash
npm run build:server
```

## Docker Deployment

### Using Docker Compose (Recommended for Portainer)

1. **Deploy via Portainer**:
   - Go to Portainer → Stacks → Add Stack
   - Name: `freezer-manager`
   - Build method: Repository
   - Repository URL: `https://github.com/YOUR_USERNAME/freezer-manager`
   - Compose path: `docker-compose.yml`
   - Click "Deploy the stack"

2. **Or deploy via command line**:
```bash
docker-compose up -d
```

The application will be available at `http://YOUR_SERVER_IP:8080`

### Manual Docker Build

Build and run individual services:

```bash
# Build backend
docker build -f Dockerfile.backend -t freezer-manager-backend .

# Build frontend
docker build -f Dockerfile.frontend -t freezer-manager-frontend .

# Run with docker-compose
docker-compose up -d
```

### Portainer Stack Configuration

When deploying in Portainer, you can customize the port by adding environment variables in the stack editor:

```yaml
version: '3.8'

services:
  backend:
    container_name: freezer-manager-backend
    build:
      context: .
      dockerfile: Dockerfile.backend
    volumes:
      - freezer-data:/app/data
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    networks:
      - freezer-network

  frontend:
    container_name: freezer-manager-frontend
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "8080:80"  # Change 8080 to your preferred port
    depends_on:
      - backend
    restart: unless-stopped
    networks:
      - freezer-network

volumes:
  freezer-data:
    driver: local

networks:
  freezer-network:
    driver: bridge
```

### Data Persistence

The `freezer-data` volume persists your JSON data across container restarts. To backup your data:

```bash
# Find the volume location
docker volume inspect freezer-manager_freezer-data

# Or copy data from container
docker cp freezer-manager-backend:/app/data/freezer-items.json ./backup.json
```

## Project Structure

```
freezer-manager/
├── server/              # Backend Express server
│   ├── server.ts       # API endpoints
│   └── storage.ts      # JSON file storage module
├── src/                # Frontend React application
│   ├── components/     # React components
│   ├── types.ts        # TypeScript type definitions
│   ├── useFreezerItems.ts  # Custom hook for API calls
│   └── App.tsx         # Main application component
├── data/               # JSON data storage (gitignored)
│   └── freezer-items.json
├── Dockerfile.backend  # Backend Docker image
├── Dockerfile.frontend # Frontend Docker image
├── docker-compose.yml  # Docker Compose configuration
├── nginx.conf          # Nginx configuration for frontend
└── package.json
```

## API Endpoints

- `GET /api/items` - Fetch all freezer items
- `POST /api/items` - Add a new item
- `PUT /api/items/:id` - Update an existing item
- `DELETE /api/items/:id` - Delete an item

## Data Storage

Items are stored in `data/freezer-items.json` as a JSON array. The storage module uses atomic file operations to ensure data integrity.

## Development

### Available Scripts

- `npm run dev` - Start frontend development server
- `npm run dev:server` - Start backend development server
- `npm run dev:all` - Start both frontend and backend
- `npm run build` - Build frontend for production
- `npm run build:server` - Build backend for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## License

MIT
