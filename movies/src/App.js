import './App.css';
import { Lecteur } from './Components/Lecteur';
import { Chat } from './Components/Chat';
import { JsonDataProvider } from './api';

function App() {

  return (
    <div>
      <JsonDataProvider>
        <Chat></Chat>
      </JsonDataProvider>
    </div>
  );
}

export default App;

