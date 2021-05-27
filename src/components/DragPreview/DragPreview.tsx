import { RefObject } from 'react';
import { XYCoord } from 'react-dnd';
import { isString } from '../../utils/arrayUtils';
import style from './DragPreview.module.css';

export interface DragPreviewContainerProps {
  isHidden?: boolean;
  divRef?: RefObject<HTMLDivElement>;
  isPreview?: boolean;
  importClassName?: string;
}

export const DragPreviewContainer: FC<DragPreviewContainerProps> = ({
  children,
  isHidden,
  isPreview,
  divRef,
  importClassName,
}) => {
  const visibilityType = !isHidden ? 'visible' : 'slightVisible';
  const classes = [style[visibilityType], importClassName]
    .filter(isString)
    .concat(isPreview ? 'rotate' : '')
    .join(' ');

  return (
    <div className={classes} ref={divRef}>
      {children}
    </div>
  );
};

type DragPreviewWrapperProps = {
  position: XYCoord;
};

export const DragPreviewWrapper: FC<DragPreviewWrapperProps> = ({
  position: { x, y },
  children,
}) => <div style={{ transform: `translate(${x}px, ${y}px)` }}>{children}</div>;
