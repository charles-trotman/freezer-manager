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
