import { GOOGLE_CONFIG } from './constants';

class GoogleDriveService {
  constructor() {
    this.tokenClient = null;
    this.accessToken = null;
  }

  // Initialize the Google API client
  async initClient() {
    return new Promise((resolve, reject) => {
      window.gapi.load('client', async () => {
        try {
          await window.gapi.client.init({
            discoveryDocs: GOOGLE_CONFIG.DISCOVERY_DOCS,
          });
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  // Initialize the token client for OAuth
  initTokenClient(callback) {
    this.tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CONFIG.CLIENT_ID,
      scope: GOOGLE_CONFIG.SCOPES,
      callback: callback,
    });
  }

  // Request access token
  requestAccessToken() {
    if (!this.tokenClient) {
      throw new Error('Token client not initialized');
    }

    return new Promise((resolve, reject) => {
      try {
        this.tokenClient.requestAccessToken({
          prompt: window.gapi.client.getToken() ? '' : 'consent',
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  // Revoke token
  revokeToken() {
    const token = window.gapi.client.getToken();
    if (token) {
      window.google.accounts.oauth2.revoke(token.access_token);
      window.gapi.client.setToken('');
    }
  }

  // Fetch all files from Google Drive
  async fetchAllFiles(onProgress) {
    let files = [];
    let pageToken = null;
    let pageCount = 0;

    try {
      do {
        const response = await window.gapi.client.drive.files.list({
          pageSize: 1000,
          fields: 'nextPageToken, files(id, name, mimeType, parents, size, modifiedTime, owners, thumbnailLink, iconLink)',
          pageToken: pageToken || '',
        });

        const newFiles = response.result.files || [];
        files = files.concat(newFiles);
        pageToken = response.result.nextPageToken;
        pageCount++;

        if (onProgress) {
          onProgress({
            filesCount: files.length,
            pageCount,
            hasMore: !!pageToken
          });
        }
      } while (pageToken);

      return files;
    } catch (error) {
      console.error('Error fetching files:', error);
      throw error;
    }
  }

  // Build hierarchical tree from flat file list
  buildFileTree(files) {
    const fileMap = {};
    const root = {
      id: 'root',
      name: 'My Drive',
      mimeType: 'application/vnd.google-apps.folder',
      children: [],
      size: 0,
    };

    // First pass: create map of all files
    files.forEach(file => {
      fileMap[file.id] = {
        ...file,
        children: [],
        size: parseInt(file.size) || 0,
      };
    });

    // Second pass: build tree structure
    files.forEach(file => {
      const fileNode = fileMap[file.id];

      if (!file.parents || file.parents.length === 0) {
        root.children.push(fileNode);
      } else {
        const parentId = file.parents[0];
        if (fileMap[parentId]) {
          fileMap[parentId].children.push(fileNode);
        } else {
          // Parent not found, add to root
          root.children.push(fileNode);
        }
      }
    });

    // Calculate folder sizes recursively
    const calculateSize = (node) => {
      if (node.mimeType === 'application/vnd.google-apps.folder') {
        node.size = node.children.reduce((sum, child) => {
          return sum + calculateSize(child);
        }, 0);
      }
      return node.size;
    };

    calculateSize(root);

    // Sort children: folders first, then by name
    const sortChildren = (node) => {
      if (node.children && node.children.length > 0) {
        node.children.sort((a, b) => {
          const aIsFolder = a.mimeType === 'application/vnd.google-apps.folder';
          const bIsFolder = b.mimeType === 'application/vnd.google-apps.folder';

          if (aIsFolder && !bIsFolder) return -1;
          if (!aIsFolder && bIsFolder) return 1;

          return a.name.localeCompare(b.name);
        });

        node.children.forEach(sortChildren);
      }
    };

    sortChildren(root);

    return root;
  }

  // Calculate storage statistics
  calculateStats(files) {
    const stats = {
      totalFiles: files.length,
      totalSize: 0,
      fileTypeBreakdown: {},
      largestFiles: [],
      emptyFolders: [],
      recentlyModified: [],
    };

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    files.forEach(file => {
      const size = parseInt(file.size) || 0;
      stats.totalSize += size;

      // File type breakdown
      const category = this.getMimeTypeCategory(file.mimeType);
      if (!stats.fileTypeBreakdown[category]) {
        stats.fileTypeBreakdown[category] = { count: 0, size: 0 };
      }
      stats.fileTypeBreakdown[category].count++;
      stats.fileTypeBreakdown[category].size += size;

      // Track largest files
      if (size > 0) {
        stats.largestFiles.push({ ...file, size });
      }

      // Track empty folders
      if (file.mimeType === 'application/vnd.google-apps.folder' && size === 0) {
        stats.emptyFolders.push(file);
      }

      // Track recently modified
      const modifiedDate = new Date(file.modifiedTime);
      if (modifiedDate > thirtyDaysAgo) {
        stats.recentlyModified.push(file);
      }
    });

    // Sort largest files by size
    stats.largestFiles.sort((a, b) => b.size - a.size);
    stats.largestFiles = stats.largestFiles.slice(0, 100);

    return stats;
  }

  getMimeTypeCategory(mimeType) {
    if (!mimeType) return 'Other';

    if (mimeType.includes('folder')) return 'Folders';
    if (mimeType.includes('pdf')) return 'PDFs';
    if (mimeType.includes('image')) return 'Images';
    if (mimeType.includes('video')) return 'Videos';
    if (mimeType.includes('audio')) return 'Audio';
    if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) return 'Spreadsheets';
    if (mimeType.includes('document') || mimeType.includes('word')) return 'Documents';
    if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return 'Presentations';
    if (mimeType.includes('zip') || mimeType.includes('tar') || mimeType.includes('compressed')) return 'Archives';

    return 'Other';
  }
}

export const driveService = new GoogleDriveService();
