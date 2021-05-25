type Item = {
  id: string;
};

export const findItemIndexById = <TItem extends Item>(
  items: TItem[],
  id: string
) => {
  return items.findIndex((item) => item.id === id);
};

export const moveItem = <TItem extends Item>(
  array: TItem[],
  from: number,
  to: number
) => {
  const cloneState = array.slice();
  cloneState.splice(to, 0, ...cloneState.splice(from, 1));
  return cloneState;
};
