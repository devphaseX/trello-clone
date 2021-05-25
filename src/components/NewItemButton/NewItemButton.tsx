import React from 'react';
import style from './NewItemButton.module.css';

interface NewItemButtonProps {
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
}

export const NewItemButton: FC<NewItemButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <button onClick={onClick} className={style.NewItemButton}>
      {children}
    </button>
  );
};
