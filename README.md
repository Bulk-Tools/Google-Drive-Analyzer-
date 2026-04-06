# Google Drive Analyzer with Bulk Rename

A lightweight, single-page application for analyzing and managing your Google Drive files. Visualize your Drive structure as an interactive tree and perform bulk operations like renaming files with specific prefixes.

![Status](https://img.shields.io/badge/Status-Active-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### 📊 Drive Analysis
- **File Tree Visualization** - Browse your entire Google Drive in an interactive tree structure
- **File Size Display** - See file sizes at a glance
- **Folder Export** - Export individual folders or entire drive tree to PDF or TXT

### 🔄 Bulk Rename Operations
- **Smart Search** - Find all files starting with a specific prefix (e.g., "Copy of")
- **Preview Changes** - See what files will be renamed before committing
- **Selective Rename** - Choose which files to rename with checkboxes
- **Batch Processing** - Rename multiple files at once
- **Progress Tracking** - Real-time feedback during bulk operations
- **Auto-refresh** - Drive tree automatically updates after renaming

### 🎨 User Experience
- Clean, modern Material Design interface
- No installation required - runs entirely in browser
- Fast and responsive
- Collapsible tree structure
- Color-coded file types

## 🚀 Quick Start

### No Installation Needed!

This is a standalone HTML application. Simply:

1. **Download** the `index.html` file or visit the hosted version
2. **Open** it in any modern web browser
3. **Authorize** with your Google account
4. **Start analyzing** and managing your Drive!

### For Development

If you want to run it locally:

```bash
git clone https://github.com/Bulk-Tools/Google-Drive-Analyzer-.git
cd Google-Drive-Analyzer-
# Serve with any HTTP server, e.g.:
python3 -m http.server 8000
# Then open http://localhost:8000 in your browser
```

## 🔐 Google Cloud Setup

### Prerequisites

You'll need a Google Cloud Project with the Drive API enabled. The application comes pre-configured with a Client ID, but you can use your own:

### Using Your Own OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Drive API**
4. Configure OAuth consent screen
5. Create OAuth 2.0 credentials (Web application type)
6. Add authorized JavaScript origins:
   - Your domain (e.g., `https://yourdomain.com`)
   - `http://localhost:8000` (for local testing)
7. Copy your Client ID
8. Update the `CLIENT_ID` constant in `index.html` (line 111)

### Required OAuth Scopes

The application uses:
- `https://www.googleapis.com/auth/drive.file` - Read and modify files that this app has accessed

**Note:** The app only modifies files you explicitly choose to rename. It cannot access or modify other files.

## 📖 How to Use

### Analyzing Your Drive

1. Click **"Log In to Drive"** and authorize the application
2. Click **"Analyze Drive"** to scan all your files
3. Explore the tree structure:
   - Click arrows to expand/collapse folders
   - Use "Expand All" / "Collapse All" for quick navigation
   - Export to PDF or TXT using the toolbar buttons

### Bulk Renaming Files

1. After analyzing your Drive, scroll to the **"Bulk Rename Files"** section
2. Enter a prefix to search for (default: "Copy of")
3. Click **"Search Files"** to find matching files
4. Review the search results:
   - Current name and new name preview shown for each file
   - Uncheck files you don't want to rename
   - Use "Select All" to quickly select/deselect all files
5. Click **"Preview Changes"** to see a summary (optional)
6. Click **"Remove Prefix from Selected"** to rename files
7. Confirm the operation
8. Wait for completion - the Drive tree will auto-refresh

### Example Use Case

If you have many files named:
- "Copy of Report.pdf"
- "Copy of Image.jpg"
- "Copy of Document.docx"

The bulk rename feature will:
1. Find all files starting with "Copy of"
2. Show you a preview: "Copy of Report.pdf" → "Report.pdf"
3. Let you select which ones to rename
4. Rename them all at once

## 🔒 Security & Privacy

- **Minimal permissions**: Only requests access to files it needs to modify
- **No data storage**: All processing happens in your browser
- **No external servers**: Your data never leaves your machine
- **Open source**: Full transparency - inspect the code yourself
- **Client-side only**: Pure JavaScript, no backend required

## 🛠️ Technical Details

### Built With
- Vanilla JavaScript (ES6+)
- Google Drive API v3
- Google Identity Services
- Material Icons
- html2pdf.js for exports

### Browser Compatibility
- Chrome/Edge (recommended)
- Firefox
- Safari
- Any modern browser with ES6 support

## 🐛 Troubleshooting

### "Error 400: redirect_uri_mismatch"
Your domain is not in the authorized JavaScript origins list. Add it in Google Cloud Console.

### "This app isn't verified"
Normal for apps in testing mode. Click **Advanced** > **Go to [App Name] (unsafe)**.

### Files not appearing in search
- Ensure you've run "Analyze Drive" first
- The search is case-sensitive and looks for files starting with the prefix
- Try refreshing by running "Analyze Drive" again

### Rename operation failed
- Check browser console for detailed error messages
- Ensure you have edit permissions for the files
- Files in shared drives may have restrictions

## 📋 Features Roadmap

- [x] Drive tree visualization
- [x] PDF/TXT export
- [x] Bulk rename with prefix search
- [x] Preview before rename
- [x] Selective file renaming
- [ ] Support for suffix removal
- [ ] Find and replace in file names
- [ ] Regular expression support
- [ ] Undo rename operation
- [ ] Batch move/copy operations
- [ ] File deduplication detection

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License - feel free to use this for any purpose.

---

**Built with ❤️ by the Bulk-Tools team**
