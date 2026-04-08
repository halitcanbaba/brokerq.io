import { motion } from "framer-motion";
import { Globe, Shield, Zap, Award, Users, TrendingUp, Server, Clock } from "lucide-react";
import ParticlesBackground from "@/components/background/ParticlesBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const stats = [
  { value: "50+", label: "Broker Clients", icon: Users },
  { value: "12+", label: "Years Experience", icon: Award },
  { value: "99.9%", label: "Platform Uptime", icon: TrendingUp },
  { value: "24/7", label: "Support Coverage", icon: Clock },
];

const values = [
  {
    icon: Shield,
    title: "Security First",
    description:
      "Every product is built around institutional-grade security standards. Your client data and trading infrastructure are treated as mission-critical assets.",
  },
  {
    icon: Zap,
    title: "Zero Downtime Philosophy",
    description:
      "We architect every migration, update, and integration to preserve trading continuity. Downtime costs brokers money — we take that seriously.",
  },
  {
    icon: Globe,
    title: "Global Expertise",
    description:
      "We have deployed MetaTrader infrastructure across 30+ countries, understanding regional regulatory and connectivity requirements from the inside out.",
  },
  {
    icon: Server,
    title: "Deep Platform Knowledge",
    description:
      "Our engineers have spent years embedded in MetaTrader internals — server configuration, plugin APIs, and data architecture — not just the surface.",
  },
];

const team = [
  {
    name: "Arman Demir",
    role: "Chief Executive Officer",
    bio: "15 years in FX infrastructure. Previously led platform engineering at a tier-1 FX prime broker.",
    initials: "AD",
    color: "#00d4aa",
  },
  {
    name: "Lena Hoffmann",
    role: "Head of Engineering",
    bio: "Former MetaQuotes certified developer. Specializes in server-side MT4/MT5 plugin architecture.",
    initials: "LH",
    color: "#0ea5e9",
  },
  {
    name: "Marcus Webb",
    role: "VP of Sales",
    bio: "Built broker technology partnerships across EMEA and APAC for over a decade.",
    initials: "MW",
    color: "#7c3aed",
  },
  {
    name: "Sophie Nguyen",
    role: "Lead Support Engineer",
    bio: "Leads our 24/7 incident response team. Certified in MetaTrader server operations and risk systems.",
    initials: "SN",
    color: "#f59e0b",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen text-foreground dark">
      <ParticlesBackground />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        {/* Hero */}
        <section className="container mx-auto px-4 md:px-6 text-center mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0ea5e9] border border-[#0ea5e9]/30 bg-[#0ea5e9]/10 px-4 py-1.5 rounded-full mb-6">
              About MBox
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-8 leading-tight">
              Built by brokers,<br />
              <span className="text-[#00d4aa]">for brokers.</span>
            </h1>
            <p className="text-[#a7a7b8] text-lg max-w-3xl mx-auto leading-relaxed">
              MBox Technologies was founded by a team of FX infrastructure veterans who knew firsthand how much complexity hides behind running a MetaTrader brokerage. We built the tools we wished existed — and turned them into products that power brokers worldwide.
            </p>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="border-y border-[#2a2a4a] bg-[#111127]/60 py-16 mb-28">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <motion.div key={stat.label} variants={itemVariants} className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-xl bg-[#0a0a1a] border border-[#2a2a4a] flex items-center justify-center mb-4 text-[#00d4aa]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-4xl font-extrabold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-[#a7a7b8]">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="container mx-auto px-4 md:px-6 mb-28">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#111127] border border-[#2a2a4a] rounded-2xl p-10 md:p-14 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00d4aa]/5 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#00d4aa] mb-6 block">Our Mission</span>
                <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
                  "To eliminate the technical friction that prevents FX brokers from competing at the highest level — so they can focus on their clients, not their infrastructure."
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="container mx-auto px-4 md:px-6 mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-extrabold text-white mb-4">What we stand for</h2>
            <p className="text-[#a7a7b8] max-w-xl mx-auto">
              These principles shape every line of code, every support ticket, and every broker relationship we build.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  variants={itemVariants}
                  className="bg-[#111127] border border-[#2a2a4a] rounded-2xl p-8 hover:border-[#00d4aa]/40 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0a0a1a] border border-[#2a2a4a] flex items-center justify-center mb-6 text-[#00d4aa] group-hover:border-[#00d4aa]/50 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{v.title}</h3>
                  <p className="text-[#a7a7b8] leading-relaxed">{v.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Team */}
        <section className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-extrabold text-white mb-4">The team</h2>
            <p className="text-[#a7a7b8] max-w-xl mx-auto">
              Practitioners who have spent careers inside FX brokerages, not consultants looking in from outside.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                data-testid={`card-team-${member.name.replace(/\s+/g, "-").toLowerCase()}`}
                className="bg-[#111127] border border-[#2a2a4a] rounded-2xl p-7 text-center hover:border-[#00d4aa]/30 transition-all duration-300"
              >
                <div
                  className="mx-auto w-16 h-16 rounded-full flex items-center justify-center text-[#0a0a1a] font-bold text-xl mb-5"
                  style={{ backgroundColor: member.color }}
                >
                  {member.initials}
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-[#00d4aa] text-xs font-medium uppercase tracking-wider mb-4">{member.role}</p>
                <p className="text-[#a7a7b8] text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
