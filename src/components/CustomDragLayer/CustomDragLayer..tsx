import { useDragLayer } from 'react-dnd';
import { Column } from '../../containers/Column/Column';
import { useAppState } from '../../state/AppStateContext';
import { Card } from '../Card/Card';
import { DragPreviewWrapper } from '../DragPreview/DragPreview';
import style from './CustomDragLayer.module.css';

export const CustomDragLayer: FC = () => {
  const { draggedItem } = useAppState();
  const { currentOffset } = useDragLayer((monitor) => ({
    currentOffset: monitor.getSourceClientOffset(),
  }));

  return draggedItem && currentOffset ? (
    <DragPreviewWrapper position={currentOffset}>
      <div className={style.CustomDargLayer}>
        {draggedItem.type === 'COLUMN' ? (
          <Column {...draggedItem} isPreview />
        ) : (
          <Card {...draggedItem} isPreview />
        )}
      </div>
    </DragPreviewWrapper>
  ) : null;
};
