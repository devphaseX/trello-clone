import { DragPreviewContainer } from '../DragPreview/DragPreview';
import style from './Card.module.css';

interface CardProps {
  id: string;
  text: string;
}

export const Card: FC<CardProps> = ({ text }) => (
  <DragPreviewContainer>
    <div className={style.Card}>{text}</div>
  </DragPreviewContainer>
);
