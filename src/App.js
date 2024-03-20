import './App.css';
import LandingPage from './components/LandingPage';
import Main from './components/Main';

import { BrowserRouter as Router , Routes , Route , Link} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      
      <Router>
        
        <Routes>
          <Route path='/' Component={LandingPage}/>
          <Route path='/pageOne' Component={Main}/>
        </Routes>

      </Router>

    </div>
  );
}

export default App;

