# Savii Benefits Portal

A comprehensive healthcare benefits management platform for employers, employees, brokers, and advisors.

## Overview

Savii Benefits is an ICHRA (Individual Coverage Health Reimbursement Arrangement) management platform that streamlines the process of offering, selecting, and managing health benefits. The application serves four distinct user roles:

1. **Platform Administrators**: Manage the entire system, including employers, advisors, and system-wide settings
2. **Employers**: Offer and manage benefits for their employees
3. **Brokers/Advisors**: Assist employers and employees with benefits selection
4. **Employees**: Browse, select, and manage their healthcare coverage

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **UI Framework**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router v6
- **Data Fetching**: SWR
- **Backend**: Express.js with Node.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth

## Project Structure

```
/home/project/
├── public/               # Static assets
├── server/               # Express server files
│   ├── environment.cjs   # Environment configuration
│   ├── index.cjs         # Server entry point
│   └── logger.cjs        # Logging utilities
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── admin/        # Admin-specific components
│   │   ├── advisor/      # Advisor-specific components
│   │   ├── broker/       # Broker-specific components
│   │   ├── employer/     # Employer-specific components
│   │   └── enrollment/   # Enrollment flow components
│   ├── context/          # React context providers
│   ├── pages/            # Page components for each route
│   │   ├── admin/        # Admin pages
│   │   ├── advisor/      # Advisor pages
│   │   ├── broker/       # Broker pages
│   │   └── employer/     # Employer pages
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main application component with routes
│   └── main.tsx          # Application entry point
├── supabase/             # Supabase configuration
│   └── migrations/       # Database migration files
└── vite.config.ts        # Vite configuration
```

## Key Features by User Role

### Platform Admin
- Dashboard with organization and user metrics
- Employee management
- ICHRA feasibility analysis tools
- Carrier list management
- Email campaign tracking
- System-wide settings

### Employer Admin
- Organization dashboard with employee enrollment metrics
- Employee management and enrollment tracking
- Document management
- Activity logs
- Settings management
- Reports generation

### Broker/Advisor
- Client management across multiple organizations
- Employee management and support
- Documents repository
- Analytics and reporting
- Activity tracking
- Available in both full-access and read-only modes

### Employee
- Benefits enrollment workflow
- Family member management
- Personal information verification
- Insurance plan shopping
- Coverage details
- Benefits advisor scheduling

## Database Design

The application uses a Supabase PostgreSQL database with Row Level Security (RLS) for data protection. Key tables include:

- **users**: Authentication and user profile data
- **organizations**: Employer organizations
- **employees**: Employee records linked to organizations
- **enrollment_periods**: Timeframes for enrollment
- **attestations**: Employee opt-in/opt-out records
- **plans**: Available insurance plans
- **selections**: Employee plan selections
- **documents**: Document metadata and storage

## Installation & Setup

### Prerequisites
- Node.js v18 or higher
- NPM v9 or higher
- Supabase account

### Environment Variables
Create a `.env` file in the project root with the following variables:

```
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation Steps

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. The application will be available at http://localhost:5173

## Development Workflow

### Component Structure

The application follows a component-based architecture:

1. **Pages**: High-level components that correspond to routes
2. **Layout Components**: Define the structure of each page type
3. **Feature Components**: Implement specific features within pages
4. **UI Components**: Reusable UI elements used across the application

### State Management

- **Context API**: Used for shared state (FamilyMembersContext, BrokerContext)
- **Component State**: Local state management with useState
- **SWR**: For data fetching, caching and revalidation

### Role-Based Access Control

The application implements role-based access through:

1. **Route structure**: Different route namespaces for each role (e.g., /admin/, /employer/)
2. **Role-specific components**: Each role has dedicated components
3. **Contextual rendering**: Content adapts based on user role

### Adding New Features

When adding new features:

1. Create necessary database migrations in `supabase/migrations/`
2. Add any new components in the appropriate folders
3. Update routing in `src/App.tsx` if adding new pages
4. Ensure consistent styling with Tailwind CSS

## Deployment

### Frontend

The application is built for production using Vite:

```bash
npm run build
```

This generates optimized static assets in the `dist/` directory that can be deployed to any static hosting service.

### Backend

The Express server can be deployed to any Node.js hosting platform:

```bash
npm run start
```

For production, consider environment-specific configuration and proper error handling.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Considerations

- Lazy loading of route components
- Pagination for large datasets
- SWR for efficient data fetching and caching
- Responsive design for mobile and desktop views

## Maintenance

### Regular Maintenance Tasks

1. **Dependency Updates**: Regularly update NPM dependencies for security patches
2. **Database Migrations**: Create and test migrations for schema changes
3. **Performance Monitoring**: Track and optimize performance bottlenecks
4. **Browser Compatibility**: Test with latest browser versions

### Troubleshooting Common Issues

1. **API Connectivity**: Check Supabase connection and API endpoints
2. **State Management**: Debug using React DevTools
3. **Styling Issues**: Verify Tailwind classes and responsive breakpoints

## License

Proprietary - All rights reserved