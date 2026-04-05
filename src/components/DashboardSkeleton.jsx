import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-muted rounded skeleton" />
          <div className="h-4 w-96 bg-muted rounded skeleton" />
        </div>
        <div className="h-10 w-32 bg-muted rounded skeleton" />
      </div>

      {/* Storage Overview Skeleton */}
      <Card>
        <CardHeader>
          <div className="h-6 w-48 bg-muted rounded skeleton" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="h-4 w-24 bg-muted rounded skeleton" />
              <div className="h-8 w-32 bg-muted rounded skeleton" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-muted rounded skeleton" />
              <div className="h-8 w-32 bg-muted rounded skeleton" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-muted rounded skeleton" />
              <div className="h-8 w-32 bg-muted rounded skeleton" />
            </div>
          </div>
          <div className="h-4 w-full bg-muted rounded skeleton" />
        </CardContent>
      </Card>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="h-6 w-40 bg-muted rounded skeleton" />
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full bg-muted rounded skeleton" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="h-6 w-40 bg-muted rounded skeleton" />
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full bg-muted rounded skeleton" />
          </CardContent>
        </Card>
      </div>

      {/* File Tree Skeleton */}
      <Card>
        <CardHeader>
          <div className="h-6 w-32 bg-muted rounded skeleton" />
        </CardHeader>
        <CardContent className="space-y-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-10 w-full bg-muted rounded skeleton" />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
