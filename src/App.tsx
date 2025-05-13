
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Registration from "./pages/Registration";
import AboutUs from "./pages/AboutUs";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import { Analytics } from "@vercel/analytics/react";
import Gallery from "./pages/Gallery";
import DynamicOGImage from "./components/DynamicOGImage";
import InvitePage from "./pages/InvitePage";
import "./styles/inviteAnimations.css";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {

  
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <LoadingScreen onLoaded={() => setIsLoading(false)} />
    )
  }
  return(
    <>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/registration/:eventType" element={<Registration />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/og-image" element={<DynamicOGImage />} />
              <Route path="/invite" element={<InvitePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
      <Analytics />
    </>
  );
}

export default App;
