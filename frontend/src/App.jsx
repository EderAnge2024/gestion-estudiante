import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'  // esto envuelve todo
import StudentForm from './components/form/StudentForm'
import StudentList from './components/lists/StudentList'
import Login from './components/Login/login'
import UserForm from './components/form/UserForm'
import UserList from './components/lists/UserList'
import GestionAulaFrom from './components/form/gestioAulaForm'
import GestionAulaList from './components/lists/GestionAulaList'
import PlanEstudioFrom from './components/form/planEstudioForm'
import PlanEstudioList from './components/lists/PlanEstudioList'
import PreriquisitoCursoFrom from './components/form/prerrequisitoCursoForm'
import PreriquisitoCursoList from './components/lists/PrerrequisitoCursoList'
import RolFrom from './components/form/rolForm'
import RolList from './components/lists/RolList'

function App() {
 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login></Login>}/>
          <Route path='/studentForm' element={<StudentForm></StudentForm>}/>
          <Route path='/studentList' element={<StudentList></StudentList>}></Route>
          <Route path='/userFrom' element={<UserForm></UserForm>}></Route>
          <Route path='/userList' element={<UserList></UserList>}></Route>
          <Route path='/gestionAulaFrom' element={<GestionAulaFrom></GestionAulaFrom>}></Route>
          <Route path='/gestionAulaList' element={<GestionAulaList></GestionAulaList>}></Route>
          <Route path='/planEstudioFrom' element={<PlanEstudioFrom></PlanEstudioFrom>}></Route>
          <Route path='/planEstudioList' element={<PlanEstudioList></PlanEstudioList>}></Route>
          <Route path='/preriquisitoCursoFrom' element={<PreriquisitoCursoFrom></PreriquisitoCursoFrom>}></Route>
          <Route path='/preriquisitoCursoList' element={<PreriquisitoCursoList></PreriquisitoCursoList>}></Route>
          <Route path='/rolFrom' element={<RolFrom></RolFrom>}></Route>
          <Route path='/rolList' element={<RolList></RolList>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
