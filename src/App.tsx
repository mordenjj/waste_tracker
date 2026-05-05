<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-NLNXL6X0GX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-NLNXL6X0GX');
</script>









import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CookieBanner } from "@/components/cookie-banner";
import NotFound from "@/pages/not-found";

import LandingPage from "@/pages/landing";
import LogScreen from "@/pages/log";
import HistoryScreen from "@/pages/history";
import ReviewScreen from "@/pages/review";
import CookiePolicyPage from "@/pages/cookie-policy";
import PrivacyPolicyPage from "@/pages/privacy-policy";
import TermsPage from "@/pages/terms";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/app" component={LogScreen} />
      <Route path="/app/history" component={HistoryScreen} />
      <Route path="/app/review" component={ReviewScreen} />
      
      {/* Legal Routes merged from Replit */}
      <Route path="/cookie-policy" component={CookiePolicyPage} />
      <Route path="/privacy-policy" component={PrivacyPolicyPage} />
      <Route path="/terms" component={TermsPage} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* IMPORTANT: Preserving the base URL logic below. 
          This ensures routing works correctly when deployed to Azure Static Web Apps.
        */}
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
          <CookieBanner />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;