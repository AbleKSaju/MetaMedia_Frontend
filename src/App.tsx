
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import { Toaster } from 'sonner';

import AdminRouter from './Routes/AdminRouter';
import UserRouter from './Routes/UserRouter';
function App() {


  return (
    <>
    <Toaster/>
    <Router>

    <Routes>

    <Route path='/admin/*' element={<AdminRouter/>}/>
    <Route path='/*' element={<UserRouter/>}/>

    </Routes>
      
    </Router>
    </>
  )
}

export default App
