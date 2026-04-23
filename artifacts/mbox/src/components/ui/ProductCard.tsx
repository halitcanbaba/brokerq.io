import { motion } from "framer-motion";
import {
  Server,
  Wrench,
  ArrowRightLeft,
  ArrowLeftRight,
  Shield,
  Users,
  LayoutDashboard,
  ArrowRight,
  Box,
  Copy,
  Trophy,
  PieChart,
  CalendarClock,
  BarChart3,
  Globe,
  Wallet,
  LineChart,
  type LucideIcon,
} from "lucide-react";
import { Link } from "wouter";
import { Product } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const iconMap: Record<string, LucideIcon> = {
  Server,
  Wrench,
  ArrowRightLeft,
  ArrowLeftRight,
  Shield,
  Users,
  LayoutDashboard,
  Box,
  Copy,
  Trophy,
  PieChart,
  CalendarClock,
  BarChart3,
  Globe,
  Wallet,
  LineChart,
};

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product }: ProductCardProps) {
  const IconComponent = iconMap[product.icon] || Box;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link href={`/products/${product.id}`}>
        <Card
          className="h-full bg-[#111127] border-[#2a2a4a] overflow-hidden group active:border-[#00d4aa] hover:border-[#00d4aa] active:shadow-[0_0_25px_rgba(0,212,170,0.15)] hover:shadow-[0_0_25px_rgba(0,212,170,0.15)] transition-[border-color,box-shadow] duration-300 cursor-pointer"
          data-testid={`card-product-${product.id}`}
        >
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-[#0a0a1a] rounded-lg border border-[#2a2a4a] group-hover:border-[#00d4aa] group-active:border-[#00d4aa] group-hover:text-[#00d4aa] group-active:text-[#00d4aa] transition-colors">
                {IconComponent ? <IconComponent className="w-6 h-6" /> : <Box className="w-6 h-6" />}
              </div>
              <Badge
                variant="outline"
                className="bg-[#0ea5e9]/10 text-[#0ea5e9] border-[#0ea5e9]/30"
                data-testid={`badge-${product.category.toLowerCase()}`}
              >
                {product.category}
              </Badge>
            </div>

            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#00d4aa] group-active:text-[#00d4aa] transition-colors">
              {product.title}
            </h3>

            <p className="text-[#a7a7b8] flex-grow leading-relaxed">
              {product.description}
            </p>

            <div className="mt-6 flex items-center text-[#00d4aa] font-medium text-sm md:opacity-0 md:group-hover:opacity-100 transition-opacity md:translate-x-[-10px] md:group-hover:translate-x-0">
              Learn more <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
