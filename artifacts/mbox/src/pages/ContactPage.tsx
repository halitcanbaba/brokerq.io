import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send, CheckCircle, Clock, MessageSquare, Briefcase } from "lucide-react";
import ParticlesBackground from "@/components/background/ParticlesBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { useBrand } from "@/hooks/use-brand";

const inquiryTypes = [
  { value: "sales", label: "Sales Inquiry", icon: Briefcase },
  { value: "demo", label: "Schedule Demo", icon: MessageSquare },
  { value: "support", label: "Technical Support", icon: Clock },
  { value: "partnership", label: "Partnership", icon: Mail },
];

const PHONE_INFO = { icon: Phone, title: "Phone", lines: ["+44 7537 121984", "Mon–Fri, 08:00–20:00 GMT"] };

const WHATSAPP_NUMBER = "447537121984";

// Web3Forms: get your free access key at https://web3forms.com
const WEB3FORMS_KEY = "ab2c7cbd-a79f-424f-80f3-ed4a39a8a256";

export default function ContactPage() {
  const { siteName, email, supportEmail } = useBrand();
  const contactInfo = [
    { icon: Mail, title: "Email", lines: [email, supportEmail] },
    PHONE_INFO,
  ];
  const [inquiryType, setInquiryType] = useState("sales");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");

    const typeLabel = inquiryTypes.find((t) => t.value === inquiryType)?.label ?? "Inquiry";

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `[${siteName}] ${typeLabel} from ${form.name} — ${form.company}`,
          from_name: `${form.name} (${form.company})`,
          replyto: form.email,
          inquiry_type: typeLabel,
          name: form.name,
          company: form.company,
          email: form.email,
          message: form.message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setError("Failed to send message. Please try WhatsApp instead.");
      }
    } catch {
      setError("Network error. Please try WhatsApp instead.");
    } finally {
      setSending(false);
    }
  };

  const handleWhatsApp = () => {
    const typeLabel = inquiryTypes.find((t) => t.value === inquiryType)?.label ?? inquiryType;
    const body = [
      `Inquiry Type: ${typeLabel}`,
      `Name: ${form.name}`,
      `Company: ${form.company}`,
      `Email: ${form.email}`,
      "",
      `Message:`,
      form.message,
    ].join("\n");
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isFormValid = form.name && form.company && form.email && form.message;

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact brokerQ.io",
    url: "https://brokerq.io/contact",
    mainEntity: {
      "@type": "Organization",
      name: "brokerQ.io",
      url: "https://brokerq.io",
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
  };

  return (
    <div className="relative min-h-screen text-foreground dark">
      <Seo
        title="Contact brokerQ.io — Request a Demo or Consultation"
        description="Talk to our team about MT4/MT5 installation, broker migration, copy trading, PAMM/MAMM, risk management or custom MetaTrader plugin development. Response within 1 business day."
        keywords={["contact brokerQ", "MetaTrader consultation", "FX broker demo", "broker technology contact"]}
        jsonLd={[contactSchema]}
      />
      <ParticlesBackground />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          {/* Page Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0ea5e9] border border-[#0ea5e9]/30 bg-[#0ea5e9]/10 px-4 py-1.5 rounded-full mb-6">
              Get in Touch
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Let's talk about<br />
              <span className="text-[#00d4aa]">your brokerage.</span>
            </h1>
            <p className="text-[#a7a7b8] text-lg max-w-2xl mx-auto">
              Whether you're evaluating a migration, need platform support, or want a live demo — we respond within one business day.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {submitted ? (
                <div className="bg-[#111127] border border-[#00d4aa]/30 rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <CheckCircle className="w-16 h-16 text-[#00d4aa] mx-auto mb-6" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-white mb-3">Message sent!</h2>
                  <p className="text-[#a7a7b8] max-w-sm mx-auto leading-relaxed mb-6">
                    We've received your inquiry and will get back to you within one business day.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setError(""); setForm({ name: "", company: "", email: "", message: "" }); }}
                    className="text-[#00d4aa] hover:underline text-sm"
                    data-testid="btn-send-another"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-[#111127] border border-[#2a2a4a] rounded-2xl p-8 md:p-10"
                  data-testid="form-contact"
                >
                  {/* Inquiry Type */}
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-white mb-3">What can we help you with?</label>
                    <div className="grid grid-cols-2 gap-3">
                      {inquiryTypes.map((t) => {
                        const Icon = t.icon;
                        return (
                          <button
                            key={t.value}
                            type="button"
                            onClick={() => setInquiryType(t.value)}
                            aria-pressed={inquiryType === t.value}
                            data-testid={`inquiry-${t.value}`}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${
                              inquiryType === t.value
                                ? "bg-[#00d4aa]/10 border-[#00d4aa]/50 text-[#00d4aa]"
                                : "bg-[#0a0a1a] border-[#2a2a4a] text-[#a7a7b8] hover:border-[#00d4aa]/30 hover:text-white"
                            }`}
                          >
                            <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                            <span>{t.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name + Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-sm font-medium text-[#a7a7b8] mb-2" htmlFor="name">
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        data-testid="input-name"
                        className="w-full px-4 py-3 rounded-xl bg-[#0a0a1a] border border-[#2a2a4a] text-white placeholder-[#4a4a6a] focus:outline-none focus:border-[#00d4aa]/60 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#a7a7b8] mb-2" htmlFor="company">
                        Company / Brokerage
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        required
                        autoComplete="organization"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Acme Brokers Ltd."
                        data-testid="input-company"
                        className="w-full px-4 py-3 rounded-xl bg-[#0a0a1a] border border-[#2a2a4a] text-white placeholder-[#4a4a6a] focus:outline-none focus:border-[#00d4aa]/60 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-[#a7a7b8] mb-2" htmlFor="email">
                      Work Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@acmebrokers.com"
                      data-testid="input-email"
                      className="w-full px-4 py-3 rounded-xl bg-[#0a0a1a] border border-[#2a2a4a] text-white placeholder-[#4a4a6a] focus:outline-none focus:border-[#00d4aa]/60 transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-[#a7a7b8] mb-2" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your infrastructure, current platform, and what you're looking to achieve..."
                      data-testid="input-message"
                      className="w-full px-4 py-3 rounded-xl bg-[#0a0a1a] border border-[#2a2a4a] text-white placeholder-[#4a4a6a] focus:outline-none focus:border-[#00d4aa]/60 transition-colors resize-none"
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  {/* Submit Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={sending || !isFormValid}
                      data-testid="btn-submit"
                      className="flex-1 flex items-center justify-center gap-2 bg-[#00d4aa] hover:bg-[#00b38f] disabled:opacity-50 disabled:cursor-not-allowed text-[#0a0a1a] font-semibold py-3.5 px-6 rounded-xl transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      {sending ? "Sending..." : "Send Message"}
                    </button>
                    <button
                      type="button"
                      disabled={!isFormValid}
                      onClick={handleWhatsApp}
                      className="flex-1 flex items-center justify-center gap-2 bg-[#111127] border border-[#2a2a4a] hover:border-[#00d4aa]/50 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-6 rounded-xl transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#00d4aa" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z"/></svg>
                      Send via WhatsApp
                    </button>
                  </div>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="lg:col-span-2 flex flex-col gap-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div
                    key={info.title}
                    className="bg-[#111127] border border-[#2a2a4a] rounded-2xl p-7 hover:border-[#00d4aa]/30 transition-colors"
                    data-testid={`contact-${info.title.toLowerCase()}`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#0a0a1a] border border-[#2a2a4a] flex items-center justify-center text-[#00d4aa]" aria-hidden="true">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h2 className="text-white font-semibold">{info.title}</h2>
                    </div>
                    <div className="space-y-1">
                      {info.lines.map((line, i) => (
                        <p key={i} className="text-[#a7a7b8] text-sm leading-relaxed">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* SLA Badge */}
              <div className="bg-gradient-to-br from-[#00d4aa]/10 to-[#0ea5e9]/5 border border-[#00d4aa]/20 rounded-2xl p-7">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-[#00d4aa] animate-pulse" />
                  <span className="text-[#00d4aa] text-sm font-semibold">Response SLA</span>
                </div>
                <p className="text-white font-bold text-xl mb-2">Within 1 business day</p>
                <p className="text-[#a7a7b8] text-sm leading-relaxed">
                  Enterprise clients on active SLA contracts receive responses within 4 hours around the clock.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
