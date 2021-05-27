import { createContext, useContext, Dispatch } from 'react';
import { useImmerReducer } from 'use-immer';
import { Action } from './action';
import { appStateReducer } from './appStateReducer';

const appData: AppState = {
  lists: [
    {
      id: '0',
      text: 'To Do',
      tasks: [{ id: 'c0', text: 'Generate app scaffold' }],
    },
    {
      id: '1',
      text: 'In Progress',
      tasks: [{ id: 'c1', text: 'Learn Typescript' }],
    },
    {
      id: '2',
      text: 'Done',
      tasks: [{ id: 'c2', text: 'Begin to use static typing' }],
    },
  ],
  draggedItem: null,
  hoveredColumn: null,
};

type AppStateContextProps = AppState & {
  getTasksByListId(id: string): Array<Task>;
  dispatch: Dispatch<Action>;
};

const AppStateContext = createContext({} as AppStateContextProps);
export const AppStateProvider: FC = ({ children }) => {
  const [state, dispatch] = useImmerReducer(appStateReducer, appData);
  const { lists, draggedItem, hoveredColumn } = state;

  const getTasksByListId: AppStateContextProps['getTasksByListId'] = (id) => {
    return lists.find((list) => list.id === id)?.tasks ?? [];
  };
  return (
    <AppStateContext.Provider
      value={{ draggedItem, lists, getTasksByListId, dispatch, hoveredColumn }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppStateContext);
};
