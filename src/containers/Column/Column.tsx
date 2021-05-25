import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { AddNewItem } from '../../components/AddNewItem/AddNewItem';
import { Card } from '../../components/Card/Card';
import { ColumnTitle } from '../../components/ColumnTitle/ColumnTitle';
import { DragPreviewContainer } from '../../components/DragPreview/DragPreview';
import { useItemDrag } from '../../hooks/useItemDrag';
import { addTask, moveList } from '../../state/action';
import { useAppState } from '../../state/AppStateContext';
import { isHidden } from '../../utils/isHidden';
import style from './Column.module.css';

interface ColumnProps {
  id: string;
  text: string;
  isPreview?: boolean;
}

export const Column: FC<ColumnProps> = ({ id, text, isPreview }) => {
  const { draggedItem, getTasksByListId, dispatch } = useAppState();
  const tasks = getTasksByListId(id);
  const divRef = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: 'COLUMN',
    hover() {
      if (!draggedItem) {
        return;
      }

      if (draggedItem.type === 'COLUMN') {
        if (draggedItem.id === id) {
          return;
        }
      }

      dispatch(moveList(draggedItem.id, id));
    },
  });

  const { drag } = useItemDrag({ type: 'COLUMN', id, text });
  drag(drop(divRef));
  return (
    <DragPreviewContainer
      isHidden={isHidden(draggedItem, 'COLUMN', id, isPreview)}
      divRef={divRef}
    >
      <div className={style.Column}>
        <ColumnTitle>{text}</ColumnTitle>
        {tasks.map((task) => (
          <Card {...task} key={task.id} />
        ))}
        <AddNewItem
          toggleButtonText="+ Add another list"
          onAdd={(text) => dispatch(addTask(text, id))}
          dark
        />
      </div>
    </DragPreviewContainer>
  );
};
