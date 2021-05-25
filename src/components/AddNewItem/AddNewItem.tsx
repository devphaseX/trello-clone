import { useState } from 'react';
import { NewItemForm } from '../NewItemForm/NewItemForm';
import style from './AddNewItem.module.css';

interface AddItemProps {
  dark?: boolean;
  onAdd(text: string): void;
  toggleButtonText: string;
}

export const AddNewItem: FC<AddItemProps> = (props) => {
  const { dark, onAdd, toggleButtonText } = props;
  const buttonColour = dark ? ' DarkColour' : ' LightColour';
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return (
      <NewItemForm
        onAdd={(text) => {
          onAdd(text);
          setShowForm(false);
        }}
      />
    );
  }

  return (
    <button
      className={style.AppItemButton.concat(buttonColour)}
      onClick={() => setShowForm(true)}
    >
      {toggleButtonText}
    </button>
  );
};
