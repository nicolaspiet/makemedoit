import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import HomeScreen from './screens/homeScreen.js'
import TasksScreen from './screens/tasksScreen.js'
import LoginScreen from './screens/loginScreen.js'
import RegisterScreen from './screens/registerScreen.js'


const Router = () =>{
    return(

        <BrowserRouter>
            <Routes>
              <Route exact path='/' element={<HomeScreen/>}/>
              <Route exact path='/tasks' element={<TasksScreen/>}/>
              <Route exact path='/login' element={<LoginScreen/>}/>
              <Route exact path='/register' element={<RegisterScreen/>}/>
            </Routes>
        </BrowserRouter>

    )
}
export default Router