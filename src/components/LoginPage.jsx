import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { HardDrive, Shield, Sparkles } from 'lucide-react';

export function LoginPage({ onSignIn, isLoading }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md bg-card/95 backdrop-blur">
          <CardHeader className="text-center space-y-2">
            <motion.div
              className="flex justify-center mb-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <div className="relative">
                <HardDrive className="w-16 h-16 text-primary" />
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-6 h-6 text-blue-400" />
                </motion.div>
              </div>
            </motion.div>

            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Google Drive Analyzer
            </CardTitle>
            <CardDescription className="text-base">
              Enterprise Storage Analytics Dashboard
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Feature
                icon={<HardDrive className="w-5 h-5" />}
                title="Visual Storage Analytics"
                description="Interactive treemaps, charts, and insights"
              />
              <Feature
                icon={<Shield className="w-5 h-5" />}
                title="Secure & Private"
                description="Read-only access, data stays in your browser"
              />
              <Feature
                icon={<Sparkles className="w-5 h-5" />}
                title="Smart Insights"
                description="Identify storage hogs and optimize your Drive"
              />
            </div>

            <Button
              onClick={onSignIn}
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold"
              size="lg"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <HardDrive className="w-5 h-5 mr-2" />
                </motion.div>
              ) : (
                'Sign in with Google Drive'
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              We only request read-only access to analyze your Drive structure. No data is stored or transmitted to external servers.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function Feature({ icon, title, description }) {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
