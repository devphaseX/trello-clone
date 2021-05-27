import { DragItem } from '../DragItem';

interface AddListAction {
  type: 'ADD_LIST';
  payload: string;
}
interface AddTaskAction {
  type: 'ADD_TASK';
  payload: { text: string; listId: string };
}

interface MoveListAction {
  type: 'MOVE_LIST';
  payload: {
    draggedId: string;
    hoverId: string;
  };
}

interface MoveTaskAction {
  type: 'MOVE_TASK';
  payload: {
    draggedItemId: string;
    sourceColumnId: string;
    targetColumnId: string;
  };
}

interface SetDragItemAction {
  type: 'SET_DRAGGED_ITEM';
  payload: DragItem | null;
}

interface SetCurrentHoveredColumn {
  type: 'SET_CURRENT_HOVERED_COLUMN';
  payload: {
    columnId: string;
    draggedItem: DragItem;
  };
}

interface SwapTaskPosition {
  type: 'SWAP_TASK_POSITION';
  payload: {
    dragItemId: string;
    hoveredItemId: string;
    columnId: string;
  };
}
export type Action =
  | AddListAction
  | AddTaskAction
  | MoveListAction
  | SetDragItemAction
  | MoveTaskAction
  | SetCurrentHoveredColumn
  | SwapTaskPosition;

export const addTask = (text: string, listId: string): Action => ({
  type: 'ADD_TASK',
  payload: { text, listId },
});

export const addList = (text: string): Action => ({
  type: 'ADD_LIST',
  payload: text,
});

export const moveList = (draggedId: string, hoverId: string): Action => {
  return { type: 'MOVE_LIST', payload: { draggedId, hoverId } };
};

export const setDraggedItem = (draggedItem: DragItem | null): Action => ({
  type: 'SET_DRAGGED_ITEM',
  payload: draggedItem,
});

export const setCurrentHoveredColumn = (
  columnId: string,
  draggedItem: DragItem
): Action => ({
  type: 'SET_CURRENT_HOVERED_COLUMN',
  payload: { columnId, draggedItem },
});

export const moveTask = (
  draggedItemId: string,

  sourceColumnId: string,
  targetColumnId: string
): Action => ({
  type: 'MOVE_TASK',
  payload: { draggedItemId, sourceColumnId, targetColumnId },
});

export const swapTaskPosition = (
  dragItemId: string,
  hoveredItemId: string,
  columnId: string
): Action => ({
  type: 'SWAP_TASK_POSITION',
  payload: { dragItemId, hoveredItemId, columnId },
});
