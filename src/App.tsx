import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PensionWarning from "./pages/PensionWarning";
import MoveFunds from "./pages/MoveFunds";
import ReviewTransfer from "./pages/ReviewTransfer";
import TransferConfirmed from "./pages/TransferConfirmed";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pension-warning" element={<PensionWarning />} />
          <Route path="/move-funds" element={<MoveFunds />} />
          <Route path="/review-transfer" element={<ReviewTransfer />} />
          <Route path="/transfer-confirmed" element={<TransferConfirmed />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
