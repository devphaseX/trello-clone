import { nanoid } from 'nanoid';
import type { Action } from './action';
import { findItemIndexById, moveItem } from '../utils/arrayUtils';

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
      break;
    }
    default: {
      break;
    }
  }
};
