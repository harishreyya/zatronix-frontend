import './App.css'; 
import { SignUp } from './components/Signup';
import { BrowserRouter} from 'react-router-dom';

const App = () => {
  return (
    <div className='App'>

       <BrowserRouter>
           <SignUp/>
      </BrowserRouter>
    </div>
  );
};

export default App;
