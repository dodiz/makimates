import { useCallback, useState } from "react";
import type { NextPage } from "next";
import { AnimatePresence, motion } from "framer-motion";

import type { TableDish, Dish } from "~/types";
import { Card, SearchBar } from "~/components";
import dishes from "~/_data/dishes.json";

const TablePage: NextPage = () => {
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>(dishes);
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

  const handleFilter = useCallback((search: string) => {
    if (search === "") {
      setFilteredDishes(dishes);
      return;
    }
    setFilteredDishes(
      dishes.filter((dish) => dish.name.toLowerCase().includes(search))
    );
  }, []);

  return (
    <main className="h-screen overflow-auto">
      <div className="m-auto min-h-full max-w-3xl">
        <h2 className="p-6 text-center text-3xl font-bold uppercase">
          Il tuo tavolo
        </h2>
        <h2 className="p-6 text-2xl">I tuoi piatti</h2>
        <div className="m-auto mt-4 grid w-min grid-cols-[repeat(3,max-content)] gap-1">
          <AnimatePresence>
            {selectedDishes.map((dish) => (
              <motion.div
                key={dish.id}
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                exit={{ scale: 0 }}
              >
                <Card
                  onClick={() => handleRemoveDish(dish)}
                  name={dish.name}
                  quantity={dish.quantity}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <h2 className="mt-4 p-6 text-2xl">Piatti disponibili</h2>
        <div className="m-auto mt-2 grid w-min grid-cols-[repeat(3,max-content)] gap-1 md:grid-cols-[repeat(6,max-content)]">
          {filteredDishes.map((dish) => (
            <Card
              key={dish.id}
              onClick={() => handleAddDish(dish)}
              name={dish.name}
            />
          ))}
        </div>
      </div>
      <SearchBar onSearch={(search) => handleFilter(search)} />
    </main>
  );
};

export default TablePage;
