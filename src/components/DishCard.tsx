import Image from "next/image";
type DishProps = {
  name: string;
  quantity?: number;
  onClick: () => void;
};

export const DishCard = ({ onClick, name, quantity = 0 }: DishProps) => {
  return (
    <div
      onClick={onClick}
      className={`relative flex w-24 cursor-pointer select-none flex-col items-center justify-center rounded-md p-3 ${
        quantity > 0
          ? "bg-dish-selected hover:bg-dish-selected-hover"
          : "bg-dish-hover"
      }`}
    >
      {quantity !== 0 && (
        <div className="rounded-e-bottom-left absolute left-3/4 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-300 text-xs font-semibold text-[#4c4c4c]">
          {quantity}
        </div>
      )}
      <Image width={32} height={32} src="/images/dish/sushi.png" alt={name} />
      <div className="mt-2 text-sm font-bold text-white">{name}</div>
    </div>
  );
};
