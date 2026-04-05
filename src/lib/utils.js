import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatBytes(bytes, decimals = 2) {
  if (!bytes || bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function getMimeTypeIcon(mimeType) {
  if (!mimeType) return 'File';

  if (mimeType.includes('folder')) return 'Folder';
  if (mimeType.includes('pdf')) return 'FileText';
  if (mimeType.includes('image')) return 'Image';
  if (mimeType.includes('video')) return 'Video';
  if (mimeType.includes('audio')) return 'Music';
  if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) return 'Sheet';
  if (mimeType.includes('document') || mimeType.includes('word')) return 'FileText';
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return 'Presentation';
  if (mimeType.includes('zip') || mimeType.includes('tar') || mimeType.includes('compressed')) return 'Archive';

  return 'File';
}

export function getMimeTypeCategory(mimeType) {
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
  if (mimeType.includes('text/plain')) return 'Text Files';

  return 'Other';
}
