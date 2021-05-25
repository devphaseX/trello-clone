import { AppContainer } from './containers/AppContainer/AppContainer';
import { AddNewItem } from './components/AddNewItem/AddNewItem';
import { Column } from './containers/Column/Column';
import { useAppState } from './state/AppStateContext';
import { addList } from './state/action';
import './App.css';
import { CustomDragLayer } from './components/CustomDragLayer/CustomDragLayer.';

const App: FC = () => {
  const { lists, dispatch } = useAppState();

  return (
    <AppContainer>
      <div className="flex-row">
        <CustomDragLayer />
        {lists.map((list) => (
          <Column {...list} key={list.id} />
        ))}
      </div>
      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={(text) => dispatch(addList(text))}
      />
    </AppContainer>
  );
};

export { App };
