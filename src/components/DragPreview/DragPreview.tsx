import { RefObject } from 'react';
import { XYCoord } from 'react-dnd';
import styled from 'styled-components';
import style from './DragPreview.module.css';

export interface DragPreviewContainerProps {
  isHidden?: boolean;
  divRef?: RefObject<HTMLDivElement>;
  isPreview?: boolean;
}

export const DragPreviewContainer: FC<DragPreviewContainerProps> = ({
  children,
  isHidden,
  isPreview,
  divRef,
}) => {
  const className = style[!isHidden ? 'visible' : 'slightVisible'].concat(
    isPreview ? ' rotate' : ''
  );
  return (
    <div className={className} ref={divRef}>
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
