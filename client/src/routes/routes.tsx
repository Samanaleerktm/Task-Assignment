import React from "react";
import { Routes, Route } from "react-router-dom";
import PackageDetailsPage from "../pages/PackageDetailsPage"; 
import PackageSummaryPage from "../pages/PackageSummaryPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/details" element={<PackageDetailsPage />} />  
      <Route path="/summary" element={<PackageSummaryPage />} />
    </Routes>
  );
};

export default AppRoutes;
