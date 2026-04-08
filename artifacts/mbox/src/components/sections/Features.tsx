import { motion } from "framer-motion";
import { Headphones, Zap, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Headphones,
    title: "Enterprise Support",
    description: "24/7 dedicated engineering support for critical broker infrastructure and incident resolution."
  },
  {
    icon: Zap,
    title: "Seamless Migration",
    description: "Zero-downtime data transfers between environments ensuring continuous trading operations."
  },
  {
    icon: Activity,
    title: "Real-time Monitoring",
    description: "Deep observability into server health, latency metrics, and execution speeds."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-[#0a0a1a]/50 border-y border-[#2a2a4a] relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-transparent border-none shadow-none text-center">
                  <CardContent className="p-6">
                    <div className="mx-auto w-16 h-16 rounded-2xl bg-[#111127] border border-[#2a2a4a] flex items-center justify-center mb-6 text-[#0ea5e9]">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                    <p className="text-[#a7a7b8] leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
