# Google Drive Analyzer - Enterprise Storage Dashboard

A modern, enterprise-grade storage analytics dashboard for Google Drive built with React, Vite, Tailwind CSS, and shadcn/ui. Visualize your Drive data with interactive charts, treemaps, and powerful insights.

![Dashboard Preview](https://img.shields.io/badge/Status-In%20Development-yellow)
![React](https://img.shields.io/badge/React-18.2-blue)
![Vite](https://img.shields.io/badge/Vite-5.1-purple)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan)

## ✨ Features

### 📊 Visual Analytics
- **Storage Overview Dashboard** - At-a-glance view of total, used, and free space with elegant progress bars
- **File Type Breakdown** - Interactive donut charts (coming soon)
- **Treemap Visualization** - DaisyDisk-style visual representation (coming soon)

### 🗂️ Advanced Features (Coming Soon)
- Virtualized file tree for 50,000+ files
- Data grid view with sortable columns
- Real-time search and smart filters
- Professional PDF/CSV/JSON exports
- Intelligent insights (storage hogs, clutter detection)

### 🎨 Premium UI/UX
- Modern design with smooth animations (Framer Motion)
- Beautiful loading skeletons
- Fully responsive layout

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Google Cloud Project with Drive API enabled
- OAuth 2.0 credentials

### Installation

1. **Clone and install**
   ```bash
   git clone https://github.com/Bulk-Tools/Google-Drive-Analyzer-.git
   cd Google-Drive-Analyzer-
   npm install
   ```

2. **Configure Google OAuth** (see below)

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**: http://localhost:5173

## 🔐 Google Cloud Setup

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Drive API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Drive API"
   - Click "Enable"

### Step 2: Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type (unless you have a Google Workspace)
3. Fill in the required fields:
   - App name: "Google Drive Analyzer" (or your preferred name)
   - User support email: your email
   - Developer contact email: your email
4. Add scopes:
   - Click "Add or Remove Scopes"
   - Add `https://www.googleapis.com/auth/drive.readonly` (View files in your Google Drive)
5. Add test users (if in testing mode):
   - Add your email address and any other users who need access
6. Save and continue

### Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Web application"
4. Configure the application:
   - **Name:** "Google Drive Analyzer Web Client"
   - **Authorized JavaScript origins:**
     - `https://bulk-tools.github.io` (for GitHub Pages)
     - `http://localhost:5173` (for local development)
   - **Authorized redirect URIs:** Leave empty (not needed for this implementation)
5. Click "Create"
6. Copy the **Client ID** that appears

### Step 4: Update the Application

1. Open `src/lib/constants.js`
2. Replace the `CLIENT_ID` with your Client ID:
   ```javascript
   export const GOOGLE_CONFIG = {
     CLIENT_ID: 'YOUR-CLIENT-ID.apps.googleusercontent.com',
     // ... rest of config
   };
   ```

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Lint code
```

### Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── Dashboard.jsx    # Main dashboard
│   ├── LoginPage.jsx
│   └── StorageOverview.jsx
├── contexts/
│   └── AuthContext.jsx  # OAuth context
├── lib/
│   ├── constants.js     # Configuration
│   ├── googleDriveService.js
│   └── utils.js
├── App.jsx
└── main.jsx
```

## 🔒 Security & Privacy

- **Read-only access**: Only `drive.readonly` scope
- **No data storage**: All processing in-browser
- **No external servers**: Data never leaves your machine
- **Open source**: Full transparency

## 📦 Deployment

### GitHub Pages

1. **Enable GitHub Pages**: Settings > Pages > Source: GitHub Actions
2. **Push to main**: The workflow auto-deploys
3. **Update OAuth**: Add your GitHub Pages URL to authorized origins

## 🐛 Troubleshooting

### "Error 400: redirect_uri_mismatch"
Add your domain to **Authorized JavaScript origins** in Google Cloud Console.

### "This app isn't verified"
Normal for testing mode. Click **Advanced** > **Go to [App Name] (unsafe)**.

### Files not loading
- Check browser console for errors
- Verify Google Drive API is enabled
- Confirm OAuth credentials are correct

## 🗺️ Roadmap

**Phase 1 - Foundation** ✅
- [x] React + Vite + Tailwind setup
- [x] Google OAuth integration
- [x] Storage Overview dashboard
- [x] Loading states and animations

**Phase 2 - Visualizations** (In Progress)
- [ ] File Type Breakdown chart
- [ ] Treemap visualization
- [ ] Virtualized file tree
- [ ] Data grid with sorting

**Phase 3 - Advanced Features**
- [ ] PDF/CSV/JSON export
- [ ] Insights panel
- [ ] Search and filtering
- [ ] Dark mode

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Recharts](https://recharts.org/) - Data visualization
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Tailwind CSS](https://tailwindcss.com/) - Styling

---

**Built with ❤️ by the Bulk-Tools team**