import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useItemDrag } from '../../hooks/useItemDrag';
import { swapTaskPosition } from '../../state/action';
import { useAppState } from '../../state/AppStateContext';
import { isHidden } from '../../utils/isHidden';
import { DragPreviewContainer } from '../DragPreview/DragPreview';
import style from './Card.module.css';

interface CardProps {
  id: string;
  text: string;
  isPreview?: boolean;
  columnId: string;
}

export const Card: FC<CardProps> = (props) => {
  const { id, text, isPreview, columnId } = props;
  const { draggedItem, dispatch } = useAppState();
  const divRef = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ type: 'CARD', id, text, columnId }, columnId);
  const [, drop] = useDrop({
    accept: 'CARD',
    hover() {
      let isNotDragging =
        !draggedItem || draggedItem.type !== 'CARD' || draggedItem.id === id;
      if (isNotDragging) {
        return;
      }

      if (draggedItem!.id !== id) {
        dispatch(swapTaskPosition(draggedItem!.id, id, columnId));
      }
    },
  });

  drag(drop(divRef));

  return (
    <DragPreviewContainer
      isPreview={isPreview}
      divRef={divRef}
      isHidden={isHidden(draggedItem, 'CARD', props.id, isPreview)}
      importClassName={style.Card}
    >
      {text}
    </DragPreviewContainer>
  );
};
