import './App.css';
import LandingPage from './components/LandingPage';
import PageOne from "./components/PageOne"
import PageTwo from './components/PageTwo';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      
      <Router>
        
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/pageOne' element={<PageOne/>}/>
          <Route path='/pageTwo' element={<PageTwo/>}/>
        </Routes>

      </Router>

    </div>
  );
}

export default App;

