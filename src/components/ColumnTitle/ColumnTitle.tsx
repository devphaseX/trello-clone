import style from './ColumnTitle.module.css';

export const ColumnTitle: FC = ({ children }) => {
  return <h3 className={style.ColumnTitle}>{children}</h3>;
};
