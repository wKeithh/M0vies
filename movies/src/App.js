import './App.css';
import { Lecteur } from './Components/Lecteur';
import { JsonDataProvider } from './api';

function App() {

  return (
    <div>
      <JsonDataProvider>
        <Lecteur />
      </JsonDataProvider>
    </div>
  );
}

export default App;

