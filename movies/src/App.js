import './App.css';
import PageLayout from './Components/PageLayout';
import { Backend } from './Features/api';


function App() {
  return (
    <div>
        <Backend>
          <PageLayout />
        </Backend>
    </div>
  );
}

export default App;
