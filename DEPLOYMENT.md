# GitHub Deployment Guide for NubitTranscribe.AI

## 📋 Pre-deployment Checklist

### 1. Environment Variables
Before deploying, ensure you have the following environment variables set:

```bash
# .env.local (for local development)
REACT_APP_ANTHROPIC_API_KEY=your_actual_api_key_here

# For production deployment, set these in your hosting platform:
REACT_APP_ANTHROPIC_API_KEY=your_actual_api_key_here
```

### 2. Build Configuration
The project is configured for Azure Static Web Apps but can be deployed to any static hosting service.

## 🚀 Deployment Options

### Option 1: GitHub Pages
1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Set folder to `/build` after running `npm run build`

### Option 2: Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variables in Netlify dashboard

### Option 3: Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect React settings
3. Add environment variables in Vercel dashboard

### Option 4: Azure Static Web Apps (Current Setup)
The project already includes Azure deployment configuration in `.github/workflows/main.yml`

## 📁 Project Structure
```
src/
├── components/
│   ├── Header.js
│   ├── Footer.js
│   ├── Logo.js
│   └── TranscriptionTool.js
├── pages/
│   ├── Home.js
│   ├── About.js
│   ├── Pricing.js
│   ├── ApiDocs.js
│   ├── Contact.js
│   ├── Terms.js
│   └── Privacy.js
└── App.js
```

## 🔧 Build Commands
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Test the build locally
npx serve -s build
```

## 🌐 API Configuration
The app is configured to use:
- **Transcription API**: `https://whisper-api-app-2025.azurewebsites.net`
- **AI Analysis**: Anthropic Claude API (requires API key)

## 📝 Important Notes
1. The `.env.local` file should NOT be committed to GitHub
2. Set environment variables in your hosting platform's dashboard
3. The transcription API is already configured and working
4. AI analysis requires a valid Anthropic API key

## 🔒 Security Considerations
- Never commit API keys to the repository
- Use environment variables for all sensitive data
- The Anthropic API key is used client-side (consider server-side implementation for production)