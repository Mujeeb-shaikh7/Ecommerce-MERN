import {Routes,Route} from 'react-router-dom'
import Layout from './components/layouts/Layout';
import HomePage from './pages/HomePage';
import Contact from './pages/Contact';
import About from './pages/About';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/policy' element={<Policy/>}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
    </>
  );
}

export default App;
