import React from 'react';
import {Routes,Route} from "react-router-dom";
import { Home } from '../Pages/Home';
import { Info } from '../Pages/Info';
import { Interview } from '../Pages/Interview';


export const AllRoutes = () => {
  return (
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/info" element={<Info/>}/>    
    <Route path="/interview" element={<Interview/>}/>        
  </Routes>
  )
}

