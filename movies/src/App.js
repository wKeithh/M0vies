import './App.css';
import PageLayout from './Components/PageLayout';
import { Backend } from './Features/api';
import { VideoProvider } from './Features/filmSlice';

function App() {
  return (
    <div>
      <VideoProvider>
        <Backend>
          <PageLayout />
        </Backend>
      </VideoProvider>
    </div>
  );
}

export default App;
