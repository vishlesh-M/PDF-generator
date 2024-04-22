import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

/** import all components */
import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';
import Recovery from './components/Recovery';

import { Authorization,protectRoute } from './middleware/auth';
/**root routes */


const router = createBrowserRouter([
    {
        path:'/',
        element :<Username></Username>
    },
    {
        path:'/register',
        element : <Register></Register>
    },
    {
        path:'/password',
        element :<protectRoute><Password /></protectRoute> 
    },
    {
        path:'/profile',
        element : <Authorization><Profile /></Authorization>
    },
    {
        path:'/recovery',
        element : <Recovery></Recovery>
    },
    {
        path:'/reset',
        element : <Reset></Reset>
    },
    {
        path:'*',
        element : <PageNotFound></PageNotFound>
    },
])
export default function App(){
    return(
        <main>
            <RouterProvider router={router}></RouterProvider>
        </main>
    )
}