import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import HomeComponent from './components/home/HomeComponent';
import StudentForm from './components/form/StudentForm';
import StudentList from './components/lists/StudentList';


function App() {
 

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeComponent/>}/>
        <Route path='/formStudent' element={<StudentForm/>}/>
        <Route path='/studentList' element={<StudentList/>}/>
        
      
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

