import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Hero({ searchQuery, setSearchQuery }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Glow effect behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00d4aa]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight"
          >
            MetaTrader Solutions for <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4aa] to-[#0ea5e9]">
              Modern Brokers
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-[#a7a7b8] max-w-2xl mx-auto leading-relaxed"
          >
            Enterprise-grade platform tools, migration services, and risk management for FX brokers.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="max-w-xl mx-auto pt-8 relative"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00d4aa] to-[#0ea5e9] rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-500" />
              <div className="relative flex items-center bg-[#111127] border border-[#2a2a4a] rounded-lg overflow-hidden focus-within:border-[#00d4aa] transition-colors">
                <div className="pl-4 text-[#a7a7b8]">
                  <Search className="w-5 h-5" />
                </div>
                <Input 
                  type="text"
                  placeholder="Search products, services, integrations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 bg-transparent text-white placeholder:text-[#a7a7b8] focus-visible:ring-0 focus-visible:ring-offset-0 h-14 text-lg"
                  data-testid="input-hero-search"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
