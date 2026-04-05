import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StorageOverview } from '@/components/StorageOverview';
import { DashboardSkeleton } from '@/components/DashboardSkeleton';
import { driveService } from '@/lib/googleDriveService';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { RefreshCw, LogOut, Download } from 'lucide-react';

export function Dashboard() {
  const { signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState(null);
  const [fileTree, setFileTree] = useState(null);
  const [stats, setStats] = useState(null);
  const [progress, setProgress] = useState(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setProgress({ filesCount: 0, pageCount: 0 });

    try {
      // Fetch all files with progress updates
      const allFiles = await driveService.fetchAllFiles((progressData) => {
        setProgress(progressData);
      });

      setFiles(allFiles);

      // Build tree structure
      const tree = driveService.buildFileTree(allFiles);
      setFileTree(tree);

      // Calculate statistics
      const statistics = driveService.calculateStats(allFiles);
      setStats(statistics);

      setProgress(null);
    } catch (error) {
      console.error('Error analyzing drive:', error);
      alert('Failed to analyze drive: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardSkeleton />
        {progress && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 right-8 bg-card border border-border rounded-lg p-4 shadow-lg"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <RefreshCw className="w-5 h-5 text-primary" />
              </motion.div>
              <div>
                <div className="font-semibold">Scanning Drive...</div>
                <div className="text-sm text-muted-foreground">
                  {progress.filesCount.toLocaleString()} items found
                  {progress.hasMore && ' (loading more...)'}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-50"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Google Drive Analyzer
              </h1>
              <p className="text-sm text-muted-foreground">
                Enterprise Storage Analytics Dashboard
              </p>
            </div>
            <div className="flex items-center gap-2">
              {files && (
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              )}
              <Button
                onClick={handleAnalyze}
                variant={files ? 'outline' : 'default'}
                size="sm"
                disabled={loading}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {files ? 'Refresh' : 'Analyze Drive'}
              </Button>
              <Button onClick={signOut} variant="ghost" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {!files ? (
          <EmptyState onAnalyze={handleAnalyze} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <StorageOverview stats={stats} totalFiles={files.length} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>File Type Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    Chart will be implemented in next step
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Storage Treemap</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    Treemap will be implemented in next step
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>File Explorer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  File tree will be implemented in next step
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>
    </div>
  );
}

function EmptyState({ onAnalyze }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center min-h-[60vh] space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Ready to Analyze</h2>
        <p className="text-muted-foreground max-w-md">
          Click the button below to start scanning your Google Drive and unlock powerful insights about your storage.
        </p>
      </div>
      <Button onClick={onAnalyze} size="lg" className="h-12 px-8">
        <RefreshCw className="w-5 h-5 mr-2" />
        Start Analysis
      </Button>
    </motion.div>
  );
}
