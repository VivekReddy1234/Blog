import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './components/Signup'
import Signin from './components/Signin'
import  Blog from './components/Blog.jsx'
import BlogCard from './components/Card.jsx'
import Preview from './components/preview.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
    <Routes>
  
    <Route path='/' element={<App/>} />
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/signin' element={<Signin/>} />
    <Route path='/addBlog' element={<Blog/>} />
    <Route path='/preview' element={<Preview/>} />
    <Route path='/blog/:id' element={<BlogCard/>} />

    </Routes>
  </BrowserRouter>
   
  </React.StrictMode>


)
