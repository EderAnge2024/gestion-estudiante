import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import HomeComponent from './components/home/HomeComponent';
import StudentForm from './components/form/StudentForm';
import StudentList from './components/lists/StudentList';
import TeacherForm from './components/form/TeacherForm';
import TeacherList from './components/lists/TeacherList';

function App() {
 

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeComponent/>}/>
        <Route path='/formStudent' element={<StudentForm/>}/>
        <Route path='/studentList' element={<StudentList/>}/>
        <Route path='/formteacher' element={<TeacherForm/>}/>
        <Route path='/teacherList' element={<TeacherList/>}/>
      
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

