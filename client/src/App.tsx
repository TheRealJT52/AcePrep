import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import CoursesPage from "@/pages/CoursesPage";
import APUSHTutorPage from "@/pages/APUSHTutorPage";
import APWHTutorPage from "@/pages/APWHTutorPage";
import APEuroTutorPage from "@/pages/APEuroTutorPage";
import APEScienceTutorPage from "@/pages/APEScienceTutorPage";
import APMacroTutorPage from "@/pages/APMacroTutorPage";
import APMicroTutorPage from "@/pages/APMicroTutorPage";
import APGovTutorPage from "@/pages/APGovTutorPage";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/courses" component={CoursesPage} />
          <Route path="/apush-tutor" component={APUSHTutorPage} />
          <Route path="/apwh-tutor" component={APWHTutorPage} />
          <Route path="/apeuro-tutor" component={APEuroTutorPage} />
          <Route path="/apes-tutor" component={APEScienceTutorPage} />
          <Route path="/apmacro-tutor" component={APMacroTutorPage} />
          <Route path="/apmicro-tutor" component={APMicroTutorPage} />
          <Route path="/apgov-tutor" component={APGovTutorPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
