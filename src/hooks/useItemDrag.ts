import { DragItem } from './../DragItem';
import { useDrag } from 'react-dnd';
import { useAppState } from '../state/AppStateContext';
import { setDraggedItem } from '../state/action';

export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState();
  const { 1: drag } = useDrag({
    type: item.type,
    item: () => {
      dispatch(setDraggedItem(item));
      return item;
    },
    end() {
      return dispatch(setDraggedItem(null));
    },
  });
  return { drag };
};
