import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Product } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Dynamically get the icon component from lucide-react
  const IconComponent = (Icons as any)[product.icon];

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
      <Card 
        className="h-full bg-[#111127] border-[#2a2a4a] overflow-hidden group hover:border-[#00d4aa] hover:shadow-[0_0_25px_rgba(0,212,170,0.15)] transition-all duration-300 cursor-pointer"
        data-testid={`card-product-${product.id}`}
      >
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#0a0a1a] rounded-lg border border-[#2a2a4a] group-hover:border-[#00d4aa] group-hover:text-[#00d4aa] transition-colors">
              {IconComponent ? <IconComponent className="w-6 h-6" /> : <Icons.Box className="w-6 h-6" />}
            </div>
            <Badge 
              variant="outline" 
              className="bg-[#0ea5e9]/10 text-[#0ea5e9] border-[#0ea5e9]/30"
              data-testid={`badge-${product.category.toLowerCase()}`}
            >
              {product.category}
            </Badge>
          </div>
          
          <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#00d4aa] transition-colors">
            {product.title}
          </h3>
          
          <p className="text-[#a7a7b8] flex-grow leading-relaxed">
            {product.description}
          </p>
          
          <div className="mt-6 flex items-center text-[#00d4aa] font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
            Learn more <Icons.ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
