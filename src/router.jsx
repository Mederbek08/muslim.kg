import { Route, Routes } from 'react-router-dom';



import Home from './components/pages/Home';
import Admin from './components/pages/Admin';
import Login from './components/Login';
import About from './components/pages/About';
import AS from './components/pages/Policy';


const App = () => {
    return (
        <div>

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/login' element={<Login />} />
                <Route path='/about' element={<About />} />
                <Route path='/policy' element={<AS />} />
            </Routes>

        </div>
    );
}

export default App;