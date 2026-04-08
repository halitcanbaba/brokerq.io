import React, { useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ParticlesBackground from "./components/background/ParticlesBackground";
import Hero from "./components/sections/Hero";
import ProductsGrid from "./components/sections/ProductsGrid";
import Features from "./components/sections/Features";
import CallToAction from "./components/sections/CallToAction";
import ProductsPage from "./pages/ProductsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

const queryClient = new QueryClient();

function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="relative min-h-screen text-foreground dark">
      <ParticlesBackground />
      <Navbar />

      <main className="relative z-10">
        <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ProductsGrid searchQuery={searchQuery} />
        <Features />
        <CallToAction />
      </main>

      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
