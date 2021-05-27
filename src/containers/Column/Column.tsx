import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { AddNewItem } from '../../components/AddNewItem/AddNewItem';
import { Card } from '../../components/Card/Card';
import { ColumnTitle } from '../../components/ColumnTitle/ColumnTitle';
import { DragPreviewContainer } from '../../components/DragPreview/DragPreview';
import { DragItem } from '../../DragItem';
import { useItemDrag } from '../../hooks/useItemDrag';
import {
  addTask,
  moveList,
  moveTask,
  setCurrentHoveredColumn,
} from '../../state/action';
import { useAppState } from '../../state/AppStateContext';
import { isHidden } from '../../utils/isHidden';
import style from './Column.module.css';

interface ColumnProps {
  id: string;
  text: string;
  isPreview?: boolean;
}

export const Column: FC<ColumnProps> = ({ id, text, isPreview }) => {
  const { draggedItem, getTasksByListId, dispatch, hoveredColumn } =
    useAppState();
  const tasks = getTasksByListId(id);
  const divRef = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: ['COLUMN', 'CARD'],
    hover(item: DragItem) {
      const isHoveredOnSameCol =
        !item || (item.type === 'COLUMN' && item.id === id);
      if (isHoveredOnSameCol) {
        return;
      }

      if (item.type === 'COLUMN') {
        dispatch(moveList(item.id, id));
        return;
      }

      if (hoveredColumn && hoveredColumn.id !== id) {
        dispatch(moveTask(draggedItem!.id, hoveredColumn.id, id));
        dispatch(setCurrentHoveredColumn(id, item));
      }
    },
  });

  const { drag } = useItemDrag({ type: 'COLUMN', id, text });
  drag(drop(divRef));

  return (
    <DragPreviewContainer
      isHidden={isHidden(draggedItem, 'COLUMN', id, isPreview)}
      divRef={divRef}
      isPreview={isPreview}
      importClassName={style.Column}
    >
      <ColumnTitle>{text.concat(` id:${id}`)}</ColumnTitle>
      {tasks.map((task) => (
        <Card {...task} columnId={id} key={task.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={(text) => dispatch(addTask(text, id))}
        dark
      />
    </DragPreviewContainer>
  );
};
