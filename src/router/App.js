import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import React from 'react'

import Home from '../pages/Home'
import Login from '../pages/Login';

function App(){
    return (
        <>
        <BrowserRouter>
            <Switch>
                <Route exact path='/'>
                    <Home/>
                </Route>
                <Route exact path='/login'>
                    <Login/>
                </Route>
            </Switch>
        </BrowserRouter>
        <ToastContainer/>
        </>
    )
}

export default App;