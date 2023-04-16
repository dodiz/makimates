import { useCallback, useState } from "react";
import type { NextPage } from "next";
import { AnimatePresence, motion } from "framer-motion";

import type { TableDish, Dish } from "~/types";
import { DishCard } from "~/components";
import Dishes from "~/_data/dishes.json";

const TablePage: NextPage = () => {
  const [selectedDishes, setSelectedDishes] = useState<TableDish[]>([]);

  const handleAddDish = useCallback(
    (dish: Dish) => {
      const dishIndex = selectedDishes.findIndex((d) => d.id === dish.id);
      if (dishIndex === -1) {
        setSelectedDishes((prev) => [...prev, { ...dish, quantity: 1 }]);
      } else
        setSelectedDishes((prev) =>
          prev.map((d, i) =>
            i === dishIndex ? { ...d, quantity: d.quantity + 1 } : d
          )
        );
    },
    [selectedDishes]
  );

  const handleRemoveDish = useCallback((dish: TableDish) => {
    if (dish.quantity === 1) {
      setSelectedDishes((prev) => prev.filter((d) => d.id !== dish.id));
      return;
    }
    setSelectedDishes((prev) =>
      prev.map((d) =>
        d.id === dish.id ? { ...d, quantity: d.quantity - 1 } : d
      )
    );
  }, []);

  return (
    <main className="m-auto min-h-screen w-min">
      <h2 className="text-2xl">I tuoi piatti</h2>
      <div className="mt-4 grid grid-cols-[repeat(3,max-content)] gap-1">
        <AnimatePresence>
          {selectedDishes.map((dish) => (
            <motion.div
              key={dish.id}
              animate={{ scale: 1 }}
              initial={{ scale: 0 }}
              exit={{ scale: 0 }}
            >
              <DishCard
                onClick={() => handleRemoveDish(dish)}
                name={dish.name}
                quantity={dish.quantity}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <h2 className="mt-4 text-2xl">Piatti disponibili</h2>
      <div className="mt-2 grid grid-cols-[repeat(3,max-content)]  gap-1">
        {Dishes.map((dish) => (
          <DishCard
            onClick={() => handleAddDish(dish)}
            name={dish.name}
            key={dish.id}
          />
        ))}
      </div>
    </main>
  );
};

export default TablePage;
