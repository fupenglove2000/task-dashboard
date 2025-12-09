# Task Dashboard

A modern task management application with Kanban board functionality, built with Next.js 16. Features drag-and-drop task management, data visualization, and theme customization.

## Features

- **Kanban Board**: Intuitive drag-and-drop interface for task management
- **Task Organization**: Organize tasks by status (To Do, In Progress, Done)
- **Priority Management**: Set task priorities (Low, Medium, High)
- **Data Visualization**: Interactive charts and statistics with Recharts
- **Dark Mode**: Toggle between light and dark themes
- **User Authentication**: Secure authentication with NextAuth.js
- **Real-time Updates**: Optimistic UI updates for smooth user experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5
- **Drag & Drop**: @hello-pangea/dnd
- **Charts**: Recharts
- **Theming**: next-themes
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom components with Lucide icons

## Database Schema

### Models
- **User**: User accounts with authentication
- **Task**: Tasks with status, priority, and due dates
- **TaskStatus**: TODO, IN_PROGRESS, DONE
- **TaskPriority**: LOW, MEDIUM, HIGH

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

1. Clone the repository
```bash
git clone https://github.com/fupenglove2000/task-dashboard.git
cd task-dashboard
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/taskdb"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

4. Set up the database
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   └── tasks/         # Task CRUD operations
│   ├── dashboard/         # Dashboard pages
│   │   ├── page.tsx      # Analytics dashboard
│   │   └── tasks/        # Task board
│   ├── login/             # Authentication page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── charts/            # Chart components
│   ├── dashboard/         # Dashboard components
│   ├── tasks/             # Task-related components
│   │   ├── task-board.tsx # Kanban board
│   │   ├── task-card.tsx  # Task card
│   │   └── task-form.tsx  # Task form
│   ├── theme-provider.tsx # Theme context
│   ├── theme-toggle.tsx   # Theme switcher
│   └── ui/                # Reusable UI components
├── lib/                   # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   └── prisma.ts         # Prisma client
└── types/                 # TypeScript type definitions
```

## Key Features

### Dashboard Analytics
- Total task count
- Task breakdown by status
- Completion rate tracking
- Priority distribution
- 7-day completion trend chart
- Task distribution by status (pie chart)

### Task Management
- Create, read, update, delete tasks
- Drag-and-drop tasks between columns
- Set task priority levels
- Add due dates
- Rich text descriptions
- Real-time status updates

### Kanban Board
- Three columns: To Do, In Progress, Done
- Smooth drag-and-drop animations
- Optimistic UI updates
- Color-coded priority badges
- Task reordering within columns

### Theme System
- Light and dark mode support
- System theme detection
- Persistent theme preference
- Smooth theme transitions

## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks for authenticated user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/[id]` - Update a task
- `DELETE /api/tasks/[id]` - Delete a task

### Authentication
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

## Task Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | String | Unique identifier |
| `title` | String | Task title |
| `description` | String | Task description (optional) |
| `status` | Enum | TODO, IN_PROGRESS, or DONE |
| `priority` | Enum | LOW, MEDIUM, or HIGH |
| `dueDate` | DateTime | Task due date (optional) |
| `order` | Number | Display order in column |
| `userId` | String | Task owner |

## Database Commands

```bash
# Generate Prisma Client
npx prisma generate

# Push schema changes to database
npx prisma db push

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database
npx prisma db push --force-reset
```

## Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Secret key for NextAuth.js |
| `NEXTAUTH_URL` | Application URL |

## Features in Detail

### Drag-and-Drop
- Built with @hello-pangea/dnd for smooth interactions
- Supports moving tasks between columns
- Automatic status updates on drop
- Optimistic UI updates for instant feedback

### Data Visualization
- Line chart showing 7-day completion trend
- Pie chart for task distribution by status
- Statistics cards for quick overview
- Completion rate calculation

### Authentication
- Email/password authentication
- OAuth providers support ready
- Protected API routes
- Secure session management

## License

This project is for portfolio demonstration purposes.
