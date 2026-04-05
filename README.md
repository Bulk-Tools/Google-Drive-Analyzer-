# Google Drive Analyzer

A web-based tool to analyze and visualize your Google Drive structure in an interactive tree format.

## Features

- 📁 Interactive tree visualization of your Google Drive
- 🔍 View file sizes, thumbnails, and metadata
- 🌳 Expandable/collapsible folder structure
- 🔐 Secure OAuth 2.0 authentication
- 📊 Paginated fetching of all Drive files

## Setup Instructions

### Prerequisites

To use this application, you need to set up OAuth 2.0 credentials in Google Cloud Console.

### Configuring Google Cloud Console

**IMPORTANT:** The `Error 400: redirect_uri_mismatch` occurs when the JavaScript origin is not properly configured in your Google Cloud Console. Follow these steps to fix it:

#### 1. Create/Access Your Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Drive API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Drive API"
   - Click "Enable"

#### 2. Configure OAuth Consent Screen

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

#### 3. Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Web application"
4. Configure the application:
   - **Name:** "Google Drive Analyzer Web Client"
   - **Authorized JavaScript origins:** Add the following URL(s):
     - `https://bulk-tools.github.io` (for GitHub Pages deployment)
     - `http://localhost:8000` (for local testing, optional)
   - **Authorized redirect URIs:** Leave empty (not needed for this implementation)
5. Click "Create"
6. Copy the **Client ID** that appears

#### 4. Update the Application

1. Open `index.html`
2. Find line 172 where `CLIENT_ID` is defined
3. Replace the existing Client ID with your new Client ID:
   ```javascript
   const CLIENT_ID = 'YOUR-CLIENT-ID-HERE.apps.googleusercontent.com';
   ```

### Why This Error Occurs

The `redirect_uri_mismatch` error happens because:

1. **Google's OAuth 2.0 requires registered origins:** When using Google Identity Services (the modern OAuth flow), Google requires that the JavaScript origin (the domain where your app is hosted) must be explicitly registered in the OAuth client configuration.

2. **Security measure:** This prevents unauthorized websites from using your OAuth credentials to access user data.

3. **Origin mismatch:** The error message shows:
   ```
   origin=https://bulk-tools.github.io
   ```
   This means the app is running on GitHub Pages, but this origin wasn't registered in the Google Cloud Console OAuth client settings.

### Solution

The fix is simple: **Add `https://bulk-tools.github.io` to the "Authorized JavaScript origins"** in your OAuth 2.0 client configuration in Google Cloud Console.

Once you've added the authorized JavaScript origin and updated the Client ID in the code, the authentication will work correctly.

## Usage

1. Open the application in your web browser
2. Click "Log In to Google Drive"
3. Grant permissions to view your Drive files (read-only access)
4. Click "Analyze My Drive" to fetch and visualize your files
5. Expand/collapse folders by clicking the arrow icons
6. View file details including thumbnails and sizes

## Local Development

To test locally:

1. Add `http://localhost:8000` (or your preferred port) to the Authorized JavaScript origins
2. Start a local web server:
   ```bash
   python -m http.server 8000
   # or
   npx http-server -p 8000
   ```
3. Open `http://localhost:8000` in your browser

## Security Notes

- The application only requests **read-only** access to your Google Drive (`drive.readonly` scope)
- No data is stored or transmitted to any server - everything runs in your browser
- Authentication tokens are managed by Google's Identity Services library
- Always keep your Client ID public-facing only (Client Secret is not used for JavaScript applications)

## Troubleshooting

### Error 400: redirect_uri_mismatch

**Solution:** Follow the setup instructions above to add your domain to Authorized JavaScript origins.

### "This app isn't verified" warning

This is normal for apps in testing mode. You can:
- Click "Advanced" > "Go to [App Name] (unsafe)" to proceed
- Or publish your app (requires Google verification for production use)

### Files not loading

- Check browser console for errors
- Ensure you've granted the necessary permissions
- Verify the Google Drive API is enabled in your project

## License

MIT License - feel free to use and modify as needed.