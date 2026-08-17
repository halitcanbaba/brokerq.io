import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  BarChart3,
  Shield,
  Copy,
  Trophy,
  Wallet,
  Box,
  ArrowRightLeft,
  ExternalLink,
  KeyRound,
  User,
  Check,
  ClipboardCopy,
  ArrowRight,
  Lock,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { DemoProject } from "@/data/demos";

const iconMap: Record<string, LucideIcon> = {
  BarChart3,
  Shield,
  Copy,
  Trophy,
  Wallet,
  ArrowRightLeft,
};

const SLIDE_INTERVAL_MS = 1500;

function CredentialChip({
  icon: Icon,
  label,
  value,
  testId,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  testId: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable (unsupported browser / insecure context) — ignore.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      title={`Copy ${label}`}
      data-testid={testId}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0a0a1a] border border-[#2a2a4a] hover:border-[#00d4aa]/50 transition-colors group/chip"
    >
      <Icon className="w-3.5 h-3.5 text-[#0ea5e9]" />
      <span className="text-xs text-[#a7a7b8]">{label}:</span>
      <span className="text-xs font-mono font-semibold text-white">{value}</span>
      {copied ? (
        <Check className="w-3.5 h-3.5 text-[#00d4aa]" />
      ) : (
        <ClipboardCopy className="w-3.5 h-3.5 text-[#a7a7b8] opacity-60 group-hover/chip:opacity-100 transition-opacity" />
      )}
    </button>
  );
}

interface DemoCardProps {
  demo: DemoProject;
  index?: number;
}

export default function DemoCard({ demo, index = 0 }: DemoCardProps) {
  const IconComponent = iconMap[demo.icon] || Box;
  const contactOnly = demo.contactOnly === true;
  const [activeSlide, setActiveSlide] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopSlideshow = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startSlideshow = useCallback(() => {
    if (intervalRef.current || demo.screenshots.length < 2) return;
    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % demo.screenshots.length);
    }, SLIDE_INTERVAL_MS);
  }, [demo.screenshots.length]);

  useEffect(() => stopSlideshow, [stopSlideshow]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card
        className="h-full bg-[#111127] border-[#2a2a4a] overflow-hidden group hover:border-[#00d4aa] hover:shadow-[0_0_25px_rgba(0,212,170,0.15)] transition-[border-color,box-shadow] duration-300"
        data-testid={`card-demo-${demo.id}`}
        onMouseEnter={startSlideshow}
        onMouseLeave={() => {
          stopSlideshow();
          setActiveSlide(0);
        }}
        onTouchStart={startSlideshow}
      >
        {/* Screenshot slideshow */}
        {(() => {
          const mediaClass =
            "relative block aspect-video overflow-hidden bg-[#0a0a1a] border-b border-[#2a2a4a]";
          const media = (
            <>
          {demo.screenshots.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${demo.title} screenshot ${i + 1}`}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                i === activeSlide ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* Slide indicator dots */}
          {demo.screenshots.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {demo.screenshots.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeSlide ? "w-5 bg-[#00d4aa]" : "w-1.5 bg-white/30"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-[#00d4aa]">
              {contactOnly ? (
                <>
                  Request access <ArrowRight className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  {demo.url?.replace("https://", "")} <ExternalLink className="w-3.5 h-3.5" />
                </>
              )}
            </span>
          </div>
            </>
          );
          return contactOnly ? (
            <Link
              href="/contact"
              aria-label={`Request a demo of ${demo.title}`}
              className={mediaClass}
            >
              {media}
            </Link>
          ) : (
            <a
              href={demo.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${demo.title} live demo`}
              className={mediaClass}
            >
              {media}
            </a>
          );
        })()}

        <CardContent className="p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#0a0a1a] rounded-lg border border-[#2a2a4a] group-hover:border-[#00d4aa] group-hover:text-[#00d4aa] transition-colors">
                <IconComponent className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-[#00d4aa] transition-colors">
                {demo.title}
              </h3>
            </div>
            <Badge
              variant="outline"
              className="bg-[#0ea5e9]/10 text-[#0ea5e9] border-[#0ea5e9]/30 shrink-0"
            >
              {demo.category}
            </Badge>
          </div>

          <p className="text-[#a7a7b8] text-sm leading-relaxed mb-5">{demo.description}</p>

          {/* Access block */}
          {contactOnly ? (
            <div className="mb-5">
              <p className="text-[10px] uppercase tracking-widest text-[#a7a7b8]/70 font-semibold mb-2">
                Private Deployment
              </p>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0a0a1a] border border-[#2a2a4a]">
                <Lock className="w-3.5 h-3.5 text-[#0ea5e9] shrink-0" />
                <span className="text-xs text-[#a7a7b8]">
                  Available on request — contact us for a guided demo.
                </span>
              </div>
            </div>
          ) : (
            demo.credentials && (
              <div className="mb-5">
                <p className="text-[10px] uppercase tracking-widest text-[#a7a7b8]/70 font-semibold mb-2">
                  Demo Access — click to copy
                </p>
                <div className="flex flex-wrap gap-2">
                  <CredentialChip
                    icon={User}
                    label="User"
                    value={demo.credentials.username}
                    testId={`copy-user-${demo.id}`}
                  />
                  <CredentialChip
                    icon={KeyRound}
                    label="Pass"
                    value={demo.credentials.password}
                    testId={`copy-pass-${demo.id}`}
                  />
                </div>
              </div>
            )
          )}

          <div className="mt-auto flex items-center gap-3">
            {contactOnly ? (
              <Button
                asChild
                className="bg-[#00d4aa] hover:bg-[#00b38f] text-[#0a0a1a] font-semibold flex-1"
                data-testid={`btn-request-${demo.id}`}
              >
                <Link href="/contact">
                  Request a Demo <MessageSquare className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                className="bg-[#00d4aa] hover:bg-[#00b38f] text-[#0a0a1a] font-semibold flex-1"
                data-testid={`btn-launch-${demo.id}`}
              >
                <a href={demo.url} target="_blank" rel="noopener noreferrer">
                  Launch Live Demo <ExternalLink className="w-4 h-4 ml-1.5" />
                </a>
              </Button>
            )}
            {demo.productId && (
              <Link
                href={`/products/${demo.productId}`}
                className="flex items-center text-sm font-medium text-[#a7a7b8] hover:text-[#00d4aa] transition-colors shrink-0"
                data-testid={`link-product-${demo.id}`}
              >
                Details <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
