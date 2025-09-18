# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
My Asset App - A Node.js proxy server with React frontend for asset management that forwards data to Google Apps Script. The application can be deployed both locally and on Cloudflare Pages.

## Architecture

### Dual Deployment Architecture
- **Local Development**: Express.js server (`index.js`) serves both the React frontend and proxy API
- **Production (Cloudflare Pages)**: Uses Cloudflare Functions (`functions/post/submit.js`) instead of Express

### Core Components
1. **Express Server** (`index.js`): Development server that serves static files and proxies requests to Google Apps Script
2. **Cloudflare Functions** (`functions/post/submit.js`): Production serverless function for API handling
3. **React Frontend** (`build/`): Pre-built static files for the UI
4. **Google Apps Script Integration**: External endpoint for data storage/processing

## Common Development Commands

### Local Development
```bash
npm start         # Run Express server on port 3001
npm run dev       # Run with nodemon for auto-reload
```

### Deployment
```bash
npm run deploy    # Deploy to Cloudflare Pages using wrangler
git push origin main  # Auto-deploy via GitHub integration (recommended)
```

### Testing
Currently no test framework is configured. To add tests, first install a test framework like Jest or Mocha.

## Key Configuration Files

### `wrangler.toml`
Cloudflare Pages configuration for production deployment. Specifies build output directory and environment settings.

### `package.json` Scripts
- `start`: Runs the Express server for local development
- `dev`: Runs with nodemon for development with auto-reload
- `deploy`: Deploys to Cloudflare Pages using wrangler CLI

## API Endpoints

### `/post/submit` (POST)
- **Local**: Handled by Express server (`index.js`)
- **Production**: Handled by Cloudflare Function (`functions/post/submit.js`)
- **Purpose**: Forwards form data to Google Apps Script
- **Response**: Text response from Google Apps Script ("SUCCESS" or error message)
- **CORS**: Enabled for cross-origin requests

## Environment-Specific Behavior

### Local Development (Express)
- Server runs on `http://localhost:3001`
- Automatically opens browser on startup
- Serves React app from `/build` directory
- All routes except API endpoints serve `index.html` (SPA support)

### Production (Cloudflare Pages)
- Static files served from `/build` directory
- API handled by Cloudflare Functions
- Automatic HTTPS
- Global CDN distribution
- GitHub integration for automatic deployments

## Important URLs and Secrets

### Google Apps Script Endpoint
The Google Apps Script URL is hardcoded in both:
- `index.js` (line 17-18)
- `functions/post/submit.js` (line 9)

**Current URL**: `https://script.google.com/macros/s/AKfycby_iiH0Nok4Lx-SMVmJzS7PMlG938Tep89YzwQ0OnvMeT_Vdy89rIjMxqn_spLYRSyQ/exec`

⚠️ **Note**: This should be moved to environment variables for security and flexibility.

## File Organization

### Required Directories
- `/build` - React production build (tracked in Git for Cloudflare Pages)
- `/functions` - Cloudflare Functions for serverless API
- `/node_modules` - Dependencies (gitignored)

### Key Files
- `index.js` - Express server for local development
- `functions/post/submit.js` - Cloudflare Function for production API
- `DEPLOY.md` - Detailed deployment instructions (Thai language)
- `wrangler.toml` - Cloudflare Pages configuration

## Development Workflow

1. **Local Testing**: Use `npm start` to run Express server with hot-reload
2. **Frontend Changes**: Rebuild React app and place in `/build`
3. **API Changes**: Update both `index.js` (local) and `functions/post/submit.js` (production)
4. **Deployment**: Push to GitHub main branch for automatic Cloudflare deployment

## Common Issues and Solutions

### Port Already in Use
If port 3001 is occupied, the PORT can be changed via environment variable:
```bash
PORT=3002 npm start
```

### Google Apps Script Connection Issues
- Verify the Apps Script URL is correct and publicly accessible
- Check CORS headers in both Express and Cloudflare Function
- Ensure Google Apps Script is deployed as a Web App with proper permissions

### Build Directory
The `/build` directory is intentionally tracked in Git (not gitignored) because Cloudflare Pages needs these files for deployment without a build step.

## Security Considerations

1. **API Keys**: Google Apps Script URL should be moved to environment variables
2. **CORS**: Currently allows all origins (`*`), should be restricted to specific domains in production
3. **Input Validation**: Add validation for form data before forwarding to Google Apps Script
4. **Rate Limiting**: Consider adding rate limiting for the API endpoint