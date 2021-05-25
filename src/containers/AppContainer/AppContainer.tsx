import style from './AppContainer.module.css';

const AppContainer: FC = ({ children }) => (
  <div className={style.Container}>{children}</div>
);

export { AppContainer };
