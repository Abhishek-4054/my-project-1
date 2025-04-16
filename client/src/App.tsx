import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import TimelinePage from "@/pages/timeline-page";
import UploadPage from "@/pages/upload-page";
import SettingsPage from "@/pages/settings-page";
import MemoriesPage from "@/pages/memories-page";
import MilestonesPage from "@/pages/milestones-page";
import { Footer } from "@/components/layout/footer";
import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider, useAuth } from "./hooks/use-auth";
import { Loader2 } from "lucide-react";

function AppRoutes() {
  const { isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/" component={HomePage} />
      <ProtectedRoute path="/timeline" component={TimelinePage} />
      <ProtectedRoute path="/upload" component={UploadPage} />
      <ProtectedRoute path="/settings" component={SettingsPage} />
      <ProtectedRoute path="/memories" component={MemoriesPage} />
      <ProtectedRoute path="/milestones" component={MilestonesPage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
