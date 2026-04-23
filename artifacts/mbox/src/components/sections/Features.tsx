import { motion } from "framer-motion";
import { Headphones, Zap, Activity, ShieldCheck, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Headphones,
    title: "24/7 Enterprise Support",
    description: "Dedicated engineering support with 4-hour SLA for critical broker infrastructure incidents. Your operations never wait.",
  },
  {
    icon: Zap,
    title: "Zero-Downtime Migration",
    description: "Seamless MT4-to-MT5 and server-to-server migrations with live position transfer — under 60 seconds of client impact.",
  },
  {
    icon: Activity,
    title: "Real-Time Risk Monitoring",
    description: "Tick-level exposure dashboards, automated alerts, and A-book/B-book analytics for complete dealing desk visibility.",
  },
  {
    icon: ShieldCheck,
    title: "Regulatory Compliance",
    description: "Audit-ready infrastructure with documented change control, KYC workflow automation, and GDPR-aligned data handling.",
  },
  {
    icon: Globe,
    title: "Global Deployment",
    description: "Infrastructure deployed across 30+ countries with regional connectivity optimisation and multi-jurisdiction regulatory support.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-[#0a0a1a]/50 border-y border-[#2a2a4a] relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Why leading brokers choose brokerQ.io</h2>
          <p className="text-[#a7a7b8] max-w-2xl mx-auto">
            Purpose-built capabilities that eliminate the technical friction of running an FX brokerage at scale.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className="bg-transparent border-none shadow-none text-center h-full">
                  <CardContent className="p-5">
                    <div
                      className="mx-auto w-14 h-14 rounded-2xl bg-[#111127] border border-[#2a2a4a] flex items-center justify-center mb-5 text-[#0ea5e9]"
                      aria-hidden="true"
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-white">{feature.title}</h3>
                    <p className="text-[#a7a7b8] leading-relaxed text-sm">{feature.description}</p>
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
