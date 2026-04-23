import { Link } from "wouter";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import ParticlesBackground from "@/components/background/ParticlesBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";

export default function NotFound() {
  return (
    <div className="relative min-h-screen text-foreground dark">
      <Seo
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Browse our MetaTrader plugins, migration tools, copy trading and broker infrastructure solutions."
        noIndex
      />
      <ParticlesBackground />
      <Navbar />

      <main className="relative z-10 pt-40 pb-24">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
          <span className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00d4aa] to-[#0ea5e9]">
            404
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-6 mb-4">
            Page not found
          </h1>
          <p className="text-[#a7a7b8] text-lg mb-10 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Let us help you find what you need.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto bg-[#00d4aa] hover:bg-[#00b38f] text-[#0a0a1a] font-semibold px-8">
                Back to Home
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-[#2a2a4a] text-white hover:bg-[#2a2a4a] hover:text-white px-8">
                <Search className="w-4 h-4 mr-2" />
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
