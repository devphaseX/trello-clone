import { nanoid } from 'nanoid';
import { Action } from './action';
import { findItemIndexById, moveItem, moveTaskTo } from '../utils/arrayUtils';

interface AppStateReducer {
  (state: AppState, action: Action): AppState | void;
}

export const appStateReducer: AppStateReducer = (draft, action) => {
  switch (action.type) {
    case 'ADD_LIST': {
      draft.lists.push({
        id: nanoid(),
        text: action.payload,
        tasks: [],
      });
      break;
    }
    case 'ADD_TASK': {
      const { listId, text } = action.payload;
      const targetListIndex = findItemIndexById(draft.lists, listId);

      draft.lists[targetListIndex].tasks.push({
        id: nanoid(),
        text,
      });
      break;
    }

    case 'MOVE_LIST': {
      const { draggedId, hoverId } = action.payload;
      const dragIndex = findItemIndexById(draft.lists, draggedId);
      const hoverIndex = findItemIndexById(draft.lists, hoverId);

      draft.lists = moveItem(draft.lists, dragIndex, hoverIndex);
      break;
    }

    case 'SET_DRAGGED_ITEM': {
      draft.draggedItem = action.payload;
      if (action.payload === null) {
        draft.hoveredColumn = null;
      }

      break;
    }

    case 'MOVE_TASK': {
      const { draggedItemId, sourceColumnId, targetColumnId } = action.payload;
      draft.draggedItem = {
        id: draggedItemId,
        type: 'CARD',
        columnId: targetColumnId,
        text: draft.draggedItem!.text,
      };

      const sourceColumn = findItemIndexById(draft.lists, sourceColumnId);
      const targetColumn = findItemIndexById(draft.lists, targetColumnId);
      const newlyHoveredColumnTasks = moveTaskTo(
        { source: draft.lists[sourceColumn].tasks, itemId: draggedItemId },
        draft.lists[targetColumn].tasks
      );

      draft.lists[targetColumn].tasks = newlyHoveredColumnTasks;
      break;
    }

    case 'SWAP_TASK_POSITION': {
      const { columnId, dragItemId, hoveredItemId } = action.payload;
      const columnIdx = findItemIndexById(draft.lists, columnId);
      const tasks = draft.lists[columnIdx].tasks;
      const dragItemIdx = findItemIndexById(tasks, dragItemId);
      const hoveredItemIdx = findItemIndexById(tasks, hoveredItemId);

      draft.lists[columnIdx].tasks = moveItem(
        tasks,
        hoveredItemIdx,
        dragItemIdx
      );
      break;
    }

    case 'SET_CURRENT_HOVERED_COLUMN': {
      if (action.payload.draggedItem.type === 'CARD') {
        if (
          !draft.hoveredColumn ||
          (draft.hoveredColumn &&
            draft.hoveredColumn.id !== action.payload.columnId)
        ) {
          const hoveredColumn = findItemIndexById(
            draft.lists,
            action.payload.columnId
          );
          draft.hoveredColumn = draft.lists[hoveredColumn];
        }
      }

      break;
    }
    default: {
      break;
    }
  }
};
