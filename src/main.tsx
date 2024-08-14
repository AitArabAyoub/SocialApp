import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "preline/preline";
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Signup from './pages/Signup.tsx';
import Login from './pages/Login.tsx';
import PrivateRoutes from './utils/PrivateRoutes.tsx';
import Posts from './pages/Posts.tsx';
import Profile from './pages/Profile.tsx';
import NewPost from './pages/NewPost.tsx';
import { Provider } from 'react-redux';
import store from './store/store.tsx';
import { PersistGate } from 'redux-persist/integration/react'
import {persistStore} from "redux-persist"
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import Post from './pages/Post.tsx';

const queryClient = new QueryClient()
const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}>
    <Route path='' element={<PrivateRoutes><Home><Posts/></Home></PrivateRoutes>}/>
    <Route path='post/:postid' element={<PrivateRoutes><Home><Post/></Home></PrivateRoutes>}/>
    <Route path='profile/' element={<PrivateRoutes><Home><Profile/></Home></PrivateRoutes>}>
      <Route path=':userid' element={<PrivateRoutes><Home><Profile/></Home></PrivateRoutes>}/>
    </Route>
    <Route path='new' element={<PrivateRoutes><Home><NewPost/></Home></PrivateRoutes>}/>
    <Route path='register' element={<Signup/>}/>
    <Route path='login' element={<Login/>}/>
  </Route>
))
let persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
