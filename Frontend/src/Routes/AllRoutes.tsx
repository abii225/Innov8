import React from "react";
import { Route, Routes } from "react-router-dom";
import Interview from "../Pages/Interview";
import Results from "../Pages/Results";

const AllRoutes: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/interview" element={<Interview />}></Route>
        <Route path="/result" element={<Results />}></Route>
      </Routes>
    </div>
  );
};

export default AllRoutes;
