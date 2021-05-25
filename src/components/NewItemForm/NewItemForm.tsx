import React, { useState } from 'react';
import { useFocus } from '../../hooks/useFocus';
import { NewItemButton } from '../NewItemButton/NewItemButton';
import { NewItemInput } from '../NewItemInput/NewItemInput';
import style from './NewItemForm.module.css';

interface NewItemFormProps {
  onAdd(text: string): void;
}
export const NewItemForm: FC<NewItemFormProps> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const inputRef = useFocus();

  return (
    <div className={style.NewItemForm}>
      <NewItemInput
        value={text}
        onChange={(e) => setText(e.target.value)}
        inputRef={inputRef}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onAdd(text);
          }
        }}
      />
      <NewItemButton onClick={() => onAdd(text)}>Create</NewItemButton>
    </div>
  );
};
