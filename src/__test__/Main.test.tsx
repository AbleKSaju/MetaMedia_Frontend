
import { render } from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Store, persistor } from '../utils/ReduxStore/Store/Store'; 

test('renders without crashing and configures providers correctly', () => {
  const { getByTestId } = render(
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );

  // Check if the root element is rendered
  const rootElement = getByTestId('root');
  expect(rootElement).toBeInTheDocument();

 
});
