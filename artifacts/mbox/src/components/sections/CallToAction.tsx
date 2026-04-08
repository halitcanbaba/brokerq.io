import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00d4aa]/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center p-12 md:p-20 rounded-3xl bg-[#111127] border border-[#2a2a4a] relative overflow-hidden"
        >
          {/* Inner glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#00d4aa]/20 rounded-full blur-[100px] pointer-events-none" />
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white relative z-10">
            Ready to upgrade your brokerage?
          </h2>
          <p className="text-xl text-[#a7a7b8] mb-10 max-w-2xl mx-auto relative z-10">
            Join the leading FX brokers running their infrastructure on MBox enterprise solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 h-14 bg-[#00d4aa] hover:bg-[#00b38f] text-[#0a0a1a] font-bold" data-testid="btn-schedule-demo">
                Schedule Demo
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 h-14 border-[#2a2a4a] text-white hover:bg-[#2a2a4a] hover:text-white" data-testid="btn-view-docs">
              View Documentation
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
