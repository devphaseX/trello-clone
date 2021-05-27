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

export const isString = (value: unknown): value is string =>
  typeof value === 'string';

export const isNotEmpty = <T extends unknown>(
  value: T
): value is NonNullable<T> => {
  return value != null;
};

export const moveTaskTo = <TItem extends Item>(
  sourceDetail: { source: TItem[]; itemId: string },
  target: TItem[]
) => {
  const { source, itemId } = sourceDetail;
  const itemIdx = source.findIndex((task) => task.id === itemId);
  if (itemIdx >= 0) {
    const removedTask = source.splice(itemIdx, 1).pop()!;
    target.unshift(removedTask);
  }
  return target;
};
