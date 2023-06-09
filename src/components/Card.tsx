import Image from "next/image";
import { motion } from "framer-motion";

type CardProps = {
  name: string;
  quantity?: number;
  onClick: () => void;
};

export const Card = ({ onClick, name, quantity = 0 }: CardProps) => {
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`relative flex h-24 w-24 cursor-pointer select-none flex-col items-center justify-center rounded-md p-3 ${
        quantity > 0
          ? "bg-[#d55a5a] hover:bg-[#b94848]"
          : "bg-[#5A887C] hover:bg-[#3A685C]"
      }`}
    >
      {quantity !== 0 && (
        <div className="rounded-e-bottom-left absolute left-3/4 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-300 text-xs font-semibold text-[#4c4c4c]">
          {quantity}
        </div>
      )}
      <Image width={32} height={32} src="/images/dish/sushi.png" alt={name} />
      <div className="mt-2 text-center text-sm font-bold text-white">
        {name}
      </div>
    </motion.div>
  );
};
