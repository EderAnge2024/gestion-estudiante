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
import DocenteForm from './components/form/DocenteForm'
import DocenteList from './components/lists/DocenteList'
import MatriculaForm from './components/form/MatriculaForm'
import MatriculaList from './components/lists/MatriculaList'
import NotaForm from './components/form/NotaForm'
import NotaList from './components/lists/NotaList'
import ActividadForm from './components/form/ActividadForm'
import ActividadList from './components/lists/ActividadList'
import CourseForm from './components/form/CourseForm'
import CourseList from './components/lists/CourseList'
import GestionGrupoForm from './components/form/GestionGrupoForm'
import GestionGrupoList from './components/lists/GestionGrupoList'
import Navegador from './components/navegador/Navegador'
import VerNotaList from './components/lists/verNotaList'
import PeriodoAcademicoFrom from './components/form/PeriodoAcademicoForm'
import PeriodoAcademicoList from './components/lists/PeriodoAcademicoList'
import PermisoFrom from './components/form/PermisoForm'
import PermisoList from './components/lists/PermisoList'

function App() {
 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login></Login>}/>
          <Route path='/menu' element={<Navegador></Navegador>}/>  
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
          <Route path='/docenteFrom' element={<DocenteForm></DocenteForm>}></Route>
          <Route path='/docenteList' element={<DocenteList></DocenteList>}></Route>
          <Route path='/matriculaFrom' element={<MatriculaForm></MatriculaForm>}></Route>
          <Route path='/matriculaList' element={<MatriculaList></MatriculaList>}></Route>
          <Route path='/notaFrom' element={<NotaForm></NotaForm>}></Route>
          <Route path='/notaList' element={<NotaList></NotaList>}></Route>
          <Route path='/actividadFrom' element={<ActividadForm></ActividadForm>}></Route>
          <Route path='/actividadList' element={<ActividadList></ActividadList>}></Route>
          <Route path='/courseFrom' element={<CourseForm></CourseForm>}></Route>
          <Route path='/courseList' element={<CourseList></CourseList>}></Route>
          <Route path='/gestioGrupoFrom' element={<GestionGrupoForm></GestionGrupoForm>}></Route>
          <Route path='/gestioGrupoList' element={<GestionGrupoList></GestionGrupoList>}></Route>
          <Route path='/verNotaList' element={<VerNotaList></VerNotaList>}></Route>
          <Route path='/periodoAcademicoFrom' element={<PeriodoAcademicoFrom></PeriodoAcademicoFrom>}></Route>
          <Route path='/periodoAcademicoList' element={<PeriodoAcademicoList></PeriodoAcademicoList>}></Route>
          <Route path='/permisoFrom' element={<PermisoFrom></PermisoFrom>}></Route>
          <Route path='/permisoList' element={<PermisoList></PermisoList>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
