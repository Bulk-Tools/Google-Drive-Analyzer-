// Google Drive API Configuration
export const GOOGLE_CONFIG = {
  CLIENT_ID: '1082194279992-76lg6issm569spcojof6n1ei0g60qnij.apps.googleusercontent.com',
  SCOPES: 'https://www.googleapis.com/auth/drive.readonly',
  DISCOVERY_DOCS: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
};

// Chart Colors
export const CHART_COLORS = [
  'hsl(217, 91%, 60%)',  // Primary blue
  'hsl(142, 71%, 45%)',  // Green
  'hsl(38, 92%, 50%)',   // Orange
  'hsl(271, 76%, 53%)',  // Purple
  'hsl(0, 72%, 51%)',    // Red
  'hsl(199, 89%, 48%)',  // Cyan
  'hsl(45, 93%, 47%)',   // Yellow
  'hsl(340, 82%, 52%)',  // Pink
];

// File size thresholds
export const SIZE_THRESHOLDS = {
  LARGE_FILE: 100 * 1024 * 1024, // 100MB
  VERY_LARGE_FILE: 500 * 1024 * 1024, // 500MB
};

// Date thresholds
export const DATE_THRESHOLDS = {
  RECENT_DAYS: 30,
};
