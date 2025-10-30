import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccountProvider } from "./contexts/AccountContext";
import Index from "./pages/Index";
import Transactions from "./pages/Transactions";
import PensionWarning from "./pages/PensionWarning";
import MoveFunds from "./pages/MoveFunds";
import ReviewTransfer from "./pages/ReviewTransfer";
import TransferConfirmed from "./pages/TransferConfirmed";
import NotFound from "./pages/NotFound";
import AccountDetail from "./pages/AccountDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AccountProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/pension-warning" element={<PensionWarning />} />
            <Route path="/move-funds" element={<MoveFunds />} />
            <Route path="/review-transfer" element={<ReviewTransfer />} />
            <Route path="/transfer-confirmed" element={<TransferConfirmed />} />
            <Route path="/account/:id" element={<AccountDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AccountProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
