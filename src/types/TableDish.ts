export type Dish = {
  id: string;
  name: string;
};

export type TableDish = Dish & {
  quantity: number;
};
