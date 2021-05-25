/// <reference types="./react-app-env.d.ts" />

import { DragItem } from './DragItem';

declare global {
  type FC<Props = {}> = React.FC<Props>;

  interface Task {
    id: string;
    text: string;
  }

  interface List {
    id: string;
    text: string;
    tasks: Task[];
  }

  interface AppState {
    lists: List[];
    draggedItem: DragItem | null;
  }
}
