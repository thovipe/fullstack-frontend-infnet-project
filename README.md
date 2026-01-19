# IDP Lite - Infrastructure Developer Portal Frontend

A Next.js-based frontend application for managing infrastructure services, applications, teams, and projects with integrated Keycloak authentication and Elasticsearch search capabilities.

## Overview

IDP Lite provides an intuitive web interface for managing:
- **Applications**: Service catalog with full CRUD operations
- **Projects**: Project management and ownership tracking
- **Teams**: Team composition and member management
- **Search**: Advanced search powered by Elasticsearch

## Technology Stack

- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - UI library
- **Next-Auth 4.24.13** - Authentication with Keycloak
- **Material-UI 7.3.7** - Component library
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Node.js 22.20** - Runtime environment

## Features

### Authentication
- OAuth2/OIDC integration with Keycloak
- Automatic token refresh
- Session management
- Protected routes

### Application Management
- Create, read, update, and delete applications
- View application details
- Associate applications with teams and projects
- Paginated application catalog

### Project Management
- Full CRUD operations for projects
- Owner assignment
- Project-application relationships
- Paginated project listing

### Team Management
- Create and manage teams
- Add/remove team members
- Team-application associations
- Team member tracking

### Search Functionality
- Full-text search across applications
- Real-time search with debouncing
- Elasticsearch-powered results
- Paginated search results

## Prerequisites

- Node.js 22.x or higher
- npm or yarn
- Running backend API (see backend README)
- Keycloak instance configured

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Keycloak Configuration
KEYCLOAK_CLIENT_ID=idp-lite
KEYCLOAK_CLIENT_SECRET=your-client-secret
KEYCLOAK_ISSUER=http://localhost:7080/realms/allthom

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Backend API
HTTP_API_URI=http://localhost:8080

# Node Environment
NODE_ENV=development
```

### Generating NextAuth Secret

```bash
openssl rand -base64 32
```

## Installation

### Local Development

```bash
# Install dependencies
npm install
# or
yarn install

# Run development server
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Docker Deployment

```bash
# Build Docker image
docker build -t idp-lite:0.0.2 .

# Run container
docker run -p 3000:3000 \
  -e KEYCLOAK_CLIENT_ID=idp-lite \
  -e KEYCLOAK_CLIENT_SECRET=your-secret \
  -e KEYCLOAK_ISSUER=http://keycloak:7080/realms/allthom \
  -e NEXTAUTH_URL=http://localhost:3000 \
  -e NEXTAUTH_SECRET=your-nextauth-secret \
  -e HTTP_API_URI=http://api:8080 \
  idp-lite:0.0.2
```

## Project Structure

```
├── app/                          # Next.js App Router
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/   # NextAuth configuration
│   ├── applications/            # Application pages
│   ├── projects/                # Project pages
│   ├── teams/                   # Team pages
│   ├── search/                  # Search page
│   ├── layout.tsx              # Root layout
│   ├── page.js                 # Home page
│   └── Providers.tsx           # Session provider
├── components/                  # Reusable components
│   ├── ApplicationForm/        # Application form component
│   ├── ProjectForm/            # Project form component
│   ├── TeamForm/               # Team form component
│   ├── Card/                   # Application card component
│   ├── ProjectCard/            # Project card component
│   ├── TeamCard/               # Team card component
│   ├── Search/                 # Search component
│   ├── Pagination/             # Pagination component
│   ├── Login/                  # Login component
│   ├── Logout/                 # Logout component
│   ├── Menu/                   # Navigation menu
│   ├── LitePortalHeader/       # Header component
│   ├── Input/                  # Input component
│   └── SessionGuard/           # Session guard component
├── src/
│   ├── actions/                # Server actions
│   └── types/                  # TypeScript definitions
├── public/                     # Static assets
├── Dockerfile                  # Docker configuration
├── next.config.mjs            # Next.js configuration
├── package.json               # Dependencies
└── tsconfig.json              # TypeScript configuration
```

## Key Components

### Authentication Flow

The application uses NextAuth.js with Keycloak provider:

1. User clicks "Sign in with Keycloak"
2. Redirected to Keycloak login page
3. After successful login, receives JWT tokens
4. Tokens stored in session
5. Automatic token refresh before expiration
6. Session guard monitors token validity

### Server Actions

All API interactions use Next.js server actions located in `src/actions/actions.tsx`:

- `createProject()` - Create new project
- `createTeam()` - Create new team
- `createApp()` - Create new application
- `updateProject()` - Update project
- `updateTeam()` - Update team
- `updateApplication()` - Update application
- `deleteProject()` - Delete project
- `deleteTeam()` - Delete team
- `deleteApplication()` - Delete application
- `searchDoc()` - Search documents
- `fetchApplications()` - Get applications list
- `fetchProjects()` - Get projects list
- `fetchTeams()` - Get teams list

### Form Components

Three main form components for creating/editing entities:

**ApplicationForm**
```tsx
<ApplicationForm 
  items={[
    {name: 'name', type: 'text', placeholder: 'Application name'},
    {name: 'description', type: 'text', placeholder: 'Description'},
    {name: 'appTeamId', type: 'number', placeholder: 'Team ID'},
    {name: 'projectId', type: 'number', placeholder: 'Project ID'}
  ]} 
  buttonTitle="Create Application" 
/>
```

**ProjectForm**
```tsx
<ProjectForm 
  items={[
    {name: 'name', type: 'text', placeholder: 'Project name'},
    {name: 'description', type: 'text', placeholder: 'Description'},
    {name: 'ownerName', type: 'text', placeholder: 'Owner name'}
  ]} 
  buttonTitle="Create Project" 
/>
```

**TeamForm**
```tsx
<TeamForm 
  items={[
    {name: 'name', type: 'text', placeholder: 'Team name'},
    {name: 'description', type: 'text', placeholder: 'Description'},
    {name: 'memberIds', type: 'text', placeholder: 'Member IDs (comma-separated)'}
  ]} 
  buttonTitle="Create Team" 
/>
```

### Card Components

Display entities with edit/delete functionality:

- **Card** - Application cards with modal editing
- **ProjectCard** - Project cards with modal editing
- **TeamCard** - Team cards with modal editing

Each card includes:
- Entity details display
- Edit button (opens modal)
- Delete button (with confirmation)
- Link to detail page

### Pagination

Server-side pagination with URL params:

```tsx
<PaginationComponent 
  currentPage={currentPage} 
  totalPages={totalPages} 
/>
```

### Search Component

Real-time search with debouncing:

```tsx
<Search placeholder="Type your search here..." />
```

## Pages

### Home (`/`)
- Dashboard with create forms
- Quick access to all entities
- Search functionality

### Applications (`/applications`)
- Paginated application catalog
- Create, edit, delete applications
- Click cards to view details

### Projects (`/projects`)
- Paginated project listing
- Project management
- Owner information

### Teams (`/teams`)
- Team catalog
- Member management
- Team details

### Search (`/search`)
- Dedicated search page
- Advanced search interface
- Detailed results display

### Detail Pages
- `/applications/[id]` - Application details
- `/projects/[id]` - Project details
- `/teams/[id]` - Team details

## Styling

### Tailwind CSS

Global styles in `app/globals.css`:

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}
```

### CSS Modules

Component-specific styles using CSS modules:

- `card.modules.css` - Card styling
- `applicationform.modules.css` - Form styling
- `menu.module.css` - Navigation styling
- etc.

### Material-UI

Integrated with Emotion for styled components:

```tsx
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
```

## API Integration

All API calls use the `HTTP_API_URI` environment variable:

```typescript
const HTTP_URI = `${process.env.HTTP_API_URI}/api/applications`;

const response = await fetch(HTTP_URI, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session.accessToken}`
  }
});
```

## Authentication Configuration

### Keycloak Setup

1. Create realm: `allthom`
2. Create client: `idp-lite`
3. Configure client:
    - Client Protocol: `openid-connect`
    - Access Type: `confidential`
    - Valid Redirect URIs: `http://localhost:3000/*`
    - Web Origins: `http://localhost:3000`
4. Get client secret from Credentials tab

### NextAuth Configuration

Located in `app/api/auth/[...nextauth]/auth.ts`:

```typescript
export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  // Token refresh logic
  // Logout handling
  // Session callbacks
};
```

## Development

### Running Locally

1. Start the backend API (see backend README)
2. Start Keycloak
3. Configure environment variables
4. Run the development server:

```bash
npm run dev
```

5. Navigate to `http://localhost:3000`

### Hot Reload

Next.js provides automatic hot reload during development. Changes to files will instantly reflect in the browser.

### Debugging

Enable debug mode in NextAuth:

```typescript
export const authOptions: AuthOptions = {
  debug: process.env.NODE_ENV === "development",
  // ...
};
```

## Building for Production

### Standalone Output

The application uses Next.js standalone output for optimal Docker deployment:

```javascript
// next.config.mjs
const nextConfig = {
  output: "standalone"
};
```

### Build Process

```bash
# Install dependencies
npm ci

# Build application
npm run build

# Output located in .next/standalone
```

### Docker Multi-Stage Build

The Dockerfile uses multi-stage build for optimization:

1. **deps** - Install dependencies
2. **builder** - Build application
3. **runner** - Production runtime

Final image includes only necessary files for running the application.

## Environment-Specific Configuration

### Development
```env
NODE_ENV=development
NEXTAUTH_URL=http://localhost:3000
HTTP_API_URI=http://localhost:8080
KEYCLOAK_ISSUER=http://localhost:7080/realms/allthom
```

### Production
```env
NODE_ENV=production
NEXTAUTH_URL=https://your-domain.com
HTTP_API_URI=https://api.your-domain.com
KEYCLOAK_ISSUER=https://keycloak.your-domain.com/realms/allthom
```

### Docker Compose
```env
NEXTAUTH_URL=http://front:3000
HTTP_API_URI=http://api:8080
KEYCLOAK_ISSUER=http://keycloak:7080/realms/allthom
```

## Troubleshooting

### Authentication Issues

**Problem**: "User is not authenticated" error

**Solution**:
- Verify Keycloak is running
- Check KEYCLOAK_ISSUER URL is correct
- Ensure client secret matches Keycloak
- Clear browser cookies and try again

### Token Refresh Issues

**Problem**: Frequent logouts or "RefreshAccessTokenError"

**Solution**:
- Check token expiration settings in Keycloak
- Verify refresh token is being stored
- Check SessionGuard is properly configured

### API Connection Issues

**Problem**: "Failed to fetch" errors

**Solution**:
- Verify backend API is running
- Check HTTP_API_URI environment variable
- Ensure CORS is configured on backend
- Check network connectivity

### Build Errors

**Problem**: Build fails with module errors

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### Docker Issues

**Problem**: Container won't start

**Solution**:
- Check environment variables are set
- Verify network connectivity to backend
- Check container logs: `docker logs idplite`
- Ensure ports aren't already in use

## Performance Optimization

### Image Optimization

Next.js automatically optimizes images:

```tsx
import Image from "next/image";

<Image 
  src="/logo.png" 
  alt="Logo" 
  width={128} 
  height={100} 
/>
```

### Code Splitting

Next.js automatically code-splits by route. Use dynamic imports for heavy components:

```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'));
```

### Caching

Server actions use `revalidatePath()` for cache invalidation:

```typescript
import { revalidatePath } from 'next/cache';

// After mutation
revalidatePath('/applications');
```

## Security

### Environment Variables

- Never commit `.env.local` to version control
- Use different secrets for each environment
- Rotate secrets regularly

### Authentication

- Tokens are HTTP-only and secure
- Automatic token refresh prevents exposure
- Session guard monitors token validity

### API Calls

- All API calls include Authorization header
- Server-side rendering protects tokens
- CORS configured on backend

## Testing

While not included in current codebase, recommended testing approach:

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom jest

# Run tests
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of an educational program at INFNET.

## Support

For issues or questions:
- Check the troubleshooting section
- Review backend API documentation
- Consult Next.js documentation
- Contact the development team

## Related Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [Material-UI Documentation](https://mui.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Version History

- **0.1.0** - Initial release
    - Basic CRUD operations
    - Keycloak authentication
    - Search functionality
    - Pagination support