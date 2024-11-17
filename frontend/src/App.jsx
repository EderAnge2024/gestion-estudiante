import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'  // esto envuelve todo
import StudentForm from './components/form/StudentForm'
import StudentList from './components/lists/StudentList'
import Login from './components/home/login'
import UserForm from './components/form/UserForm'
import UserList from './components/lists/UserList'


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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
