
import { Routes,Route } from 'react-router-dom'
import { Toaster } from 'sonner';

import AdminRouter from './Routes/AdminRouter';
import UserRouter from './Routes/UserRouter';
function App() {


  return (
    <>
    <Toaster/>
    <Routes>

    <Route path='/admin/*' element={<AdminRouter/>}/>
    <Route path='/*' element={<UserRouter/>}/>

    </Routes>
      
    </>
  )
}

export default App
