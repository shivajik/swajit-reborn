import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductAutomobile from "./pages/ProductAutomobile";
import ProductBoiler from "./pages/ProductBoiler";
import ProductCement from "./pages/ProductCement";
import ProductChemical from "./pages/ProductChemical";
import ProductOther from "./pages/ProductOther";
import ProductPaper from "./pages/ProductPaper";
import ProductRefractory from "./pages/ProductRefractory";
import ProductSolvent from "./pages/ProductSolvent";
import Infrastructure from "./pages/Infrastructure";
import Clients from "./pages/Clients";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/automobile" element={<ProductAutomobile />} />
          <Route path="/products/boiler-thermal-power" element={<ProductBoiler />} />
          <Route path="/products/cement-sector" element={<ProductCement />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
