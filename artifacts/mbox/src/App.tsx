import React, { useState, lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import ProductsGrid from "./components/sections/ProductsGrid";
import Features from "./components/sections/Features";
import CallToAction from "./components/sections/CallToAction";
import WhatsAppButton from "./components/WhatsAppButton";
import Seo, { SITE } from "./components/Seo";

// Lazy loaded
const ParticlesBackground = lazy(() => import("./components/background/ParticlesBackground"));

// Lazy loaded pages
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const MetaTraderPluginsPage = lazy(() => import("./pages/MetaTraderPluginsPage"));
const DemosPage = lazy(() => import("./pages/DemosPage"));
const InsightsPage = lazy(() => import("./pages/InsightsPage"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));

const queryClient = new QueryClient();

const LANDING_JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.siteName,
    url: SITE.baseUrl,
    logo: `${SITE.baseUrl}/favicon.svg`,
    description:
      "Enterprise-grade platform tools, migration services, and risk management for FX brokers worldwide.",
    foundingDate: "2014",
    areaServed: "Worldwide",
    knowsAbout: [
      "FX Broker Infrastructure",
      "MetaTrader 4",
      "MetaTrader 5",
      "MetaTrader Plugin Development",
      "MT4 to MT5 Migration",
      "Copy Trading",
      "PAMM MAMM",
      "Risk Management Systems",
      "CRM Integration",
      "White-label Broker Solutions",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "sales@brokerq.io",
        contactType: "sales",
        availableLanguage: ["English"],
      },
      {
        "@type": "ContactPoint",
        email: "support@brokerq.io",
        contactType: "technical support",
        availableLanguage: ["English"],
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.siteName,
    url: SITE.baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.baseUrl}/products?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
];

function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="relative min-h-screen text-foreground dark">
      <Seo
        title="Enterprise FX Broker Infrastructure & Platform Solutions"
        description="Enterprise-grade platform tools, migration services, and risk management for FX brokers. MT4/MT5 installation, MetaTrader plugin development, copy trading, PAMM/MAMM, CRM integration and real-time risk monitoring."
        keywords={[
          "FX broker infrastructure",
          "MT4 MT5 setup",
          "MetaTrader plugin development",
          "MT4 to MT5 migration",
          "copy trading software for brokers",
          "PAMM MAMM plugin",
          "broker risk management",
          "white-label broker solutions",
        ]}
        jsonLd={LANDING_JSON_LD}
      />
      <Suspense fallback={null}>
        <ParticlesBackground />
      </Suspense>
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

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/products/:id">{(params) => <ProductDetailPage id={params.id} />}</Route>
        <Route path="/services/metatrader-plugins" component={MetaTraderPluginsPage} />
        <Route path="/demos" component={DemosPage} />
        <Route path="/insights" component={InsightsPage} />
        <Route path="/insights/:slug">{(params) => <ArticlePage slug={params.slug} />}</Route>
        <Route path="/about" component={AboutPage} />
        <Route path="/faq" component={FAQPage} />
        <Route path="/contact" component={ContactPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <WhatsAppButton />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
