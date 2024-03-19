import './App.css';
import './Styles/Pages.css';
import './Styles/Tables.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './Layout/Sidebar';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Clearance from './Pages/Clearance';
import CriminalRegister from './Pages/CriminalRegister';
import Incidents from './Pages/Incidents';
import Login from './Pages/Login';
import PSVInspection from './Pages/PSVInspection';
import Regions from './Pages/Regions';
import Users from './Pages/Users';
// import Reports from './Pages/Reports';
import WantedList from './Pages/WantedList';
// import Other from './Pages/Other';
import Cities from './Pages/Cities';
import Stations from './Pages/Stations';
import Chat from './Pages/Chat';
import Profile from './Pages/Profile';
import Reports from './Pages/Reports';

// Import Hooks
import { AuthHook } from './Hooks/AuthHook';

function App() {
  const {user} = AuthHook()
  return (
    <div className="App">
      <BrowserRouter>
        { user &&
        <Sidebar>
          <Routes>
            <Route path="/" element={ <Home/> } />
            <Route path='/home' element={ <Home/> } />
            <Route path='/regions' element={<Regions/>} />
            <Route path='/cities/:regionName' element={<Cities/>} />
            <Route path='/stations/:cityName' element={<Stations/>} />
            <Route path='/users' element={<Users/>} />
            <Route path='/clearance' element={<Clearance/>} />
            <Route path='/incidents' element={<Incidents/>} />
            <Route path='/psvInspection' element={<PSVInspection/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/criminalRegister' element={<CriminalRegister/>} />
            <Route path='/wantedList' element={<WantedList/>} />
            <Route path='/chat' element={<Chat user={user}/>} />
            <Route path='/profile' element={<Profile user={user}/>} />
            <Route path='/reports' element={<Reports />} />
            {/* <Route path='/reports' element={<Reports/>} />
            <Route path='/other' element={<Other/>} /> */}
          </Routes>
        </Sidebar> }

        {!user && <Routes>
          <Route path="/" element={ <Login/> } />
          <Route element={<Login/> } /> {/* Matches any route */}
        </Routes> }
      </BrowserRouter>
    </div>
  );
}

export default App;
