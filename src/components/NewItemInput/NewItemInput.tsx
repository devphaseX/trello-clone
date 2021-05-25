import type { RefObject } from 'react';
import style from './NewItemInput.module.css';

interface NewItemInputProps {
  value: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  inputRef: RefObject<HTMLInputElement>;
  onKeyPress?(event: React.KeyboardEvent<HTMLInputElement>): void;
}
export const NewItemInput: FC<NewItemInputProps> = ({
  value,
  onChange,
  inputRef,
  onKeyPress,
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={style.NewItemInput}
      ref={inputRef}
      onKeyPress={onKeyPress}
    />
  );
};
