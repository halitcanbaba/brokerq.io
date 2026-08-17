import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { MonitorPlay, KeyRound } from "lucide-react";
import ParticlesBackground from "@/components/background/ParticlesBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import DemoCard from "@/components/ui/DemoCard";
import { demoProjects } from "@/data/demos";

export default function DemosPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "brokerQ.io Live Product Demos",
    itemListElement: demoProjects.map((d, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: d.url,
      name: d.title,
    })),
  };

  return (
    <div className="relative min-h-screen text-foreground dark">
      <Seo
        title="Live Demos — Try Our Broker Tools Online"
        description="Explore live demos of brokerQ.io products: broker reporting, real-time risk monitoring, copy trading, prop firm management and crypto payment gateway. Log in instantly with demo credentials."
        keywords={[
          "FX broker software demo",
          "risk monitoring demo",
          "copy trading demo",
          "prop firm software demo",
          "crypto payment gateway demo",
          "broker reporting tool demo",
        ]}
        jsonLd={[itemListSchema]}
      />
      <ParticlesBackground />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          {/* Page Header */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#0ea5e9] border border-[#0ea5e9]/30 bg-[#0ea5e9]/10 px-4 py-1.5 rounded-full mb-6">
              <MonitorPlay className="w-3.5 h-3.5" /> Live Demos
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              See It Running,<br />
              <span className="text-[#00d4aa]">Before You Buy</span>
            </h1>
            <p className="text-[#a7a7b8] text-lg max-w-2xl mx-auto">
              Every product below is a real, live deployment — not a video or a slideshow.
              Open any demo and explore it yourself with the shared demo account.
            </p>
          </motion.div>

          {/* Shared credentials banner */}
          <motion.div
            className="max-w-xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-[#111127] border border-[#2a2a4a] text-sm">
              <KeyRound className="w-4 h-4 text-[#00d4aa] shrink-0" />
              <span className="text-[#a7a7b8]">
                Self-serve demos share one login — username{" "}
                <span className="font-mono font-semibold text-white">demo</span>, password{" "}
                <span className="font-mono font-semibold text-white">demo123456</span>
              </span>
            </div>
          </motion.div>

          {/* Demo Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {demoProjects.map((demo, index) => (
              <DemoCard key={demo.id} demo={demo} index={index} />
            ))}
          </div>

          {/* Bottom note */}
          <motion.p
            className="text-center text-[#a7a7b8]/70 text-sm mt-14 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Demo environments run on isolated test data and reset periodically.
            Want a private demo connected to your own MT4/MT5 server?{" "}
            <Link href="/contact" className="text-[#00d4aa] hover:underline">
              Contact us
            </Link>
            .
          </motion.p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
