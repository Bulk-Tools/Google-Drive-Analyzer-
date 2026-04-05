import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatBytes } from '@/lib/utils';
import { motion } from 'framer-motion';
import { HardDrive, FolderOpen, FileText } from 'lucide-react';

export function StorageOverview({ stats, totalFiles }) {
  if (!stats) return null;

  const usedSpace = stats.totalSize;
  // Google Drive free tier is 15GB
  const totalSpace = 15 * 1024 * 1024 * 1024; // 15GB in bytes
  const freeSpace = totalSpace - usedSpace;
  const usagePercentage = (usedSpace / totalSpace) * 100;

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HardDrive className="w-5 h-5 text-primary" />
          Storage Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            icon={<HardDrive className="w-5 h-5" />}
            label="Total Storage"
            value={formatBytes(totalSpace)}
            color="text-blue-400"
            delay={0}
          />
          <StatCard
            icon={<FolderOpen className="w-5 h-5" />}
            label="Used Space"
            value={formatBytes(usedSpace)}
            color="text-primary"
            delay={0.1}
          />
          <StatCard
            icon={<FileText className="w-5 h-5" />}
            label="Free Space"
            value={formatBytes(freeSpace)}
            color="text-green-400"
            delay={0.2}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Storage Usage</span>
            <span className="font-semibold">{usagePercentage.toFixed(1)}%</span>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="origin-left"
          >
            <Progress value={usagePercentage} className="h-3" />
          </motion.div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{totalFiles.toLocaleString()} total items</span>
            <span>{formatBytes(usedSpace)} of {formatBytes(totalSpace)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatCard({ icon, label, value, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-secondary/50 rounded-lg p-4 space-y-2"
    >
      <div className="flex items-center gap-2">
        <div className={`${color}`}>{icon}</div>
        <span className="text-xs text-muted-foreground uppercase tracking-wide">
          {label}
        </span>
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </motion.div>
  );
}
