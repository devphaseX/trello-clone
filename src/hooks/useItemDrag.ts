import { setCurrentHoveredColumn } from './../state/action';
import { useEffect } from 'react';
import { CardDragItem, DragItem, ColumnDragItem } from './../DragItem';
import { ConnectDragSource, useDrag } from 'react-dnd';
import { useAppState } from '../state/AppStateContext';
import { setDraggedItem } from '../state/action';
import { getEmptyImage } from 'react-dnd-html5-backend';

interface UseItemDrag {
  (item: CardDragItem, colId: string): { drag: ConnectDragSource };
  (item: ColumnDragItem): { drag: ConnectDragSource };
}
export const useItemDrag: UseItemDrag = (item: DragItem, colId?: string) => {
  const { dispatch } = useAppState();
  const [, drag, preview] = useDrag({
    type: item.type,
    item: () => {
      dispatch(setDraggedItem(item));
      if (item.type === 'CARD') {
        dispatch(setCurrentHoveredColumn(colId as string, item));
      }
      return item;
    },
    end() {
      return dispatch(setDraggedItem(null));
    },
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);
  return { drag };
};
