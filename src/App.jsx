import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Payslip from "./pages/Payslip";
import GeneratedPayslip from "./pages/GeneratedPayslip";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/payslip" element={<Payslip />} />
       <Route path="/generated" element={<GeneratedPayslip />} />
    </Routes>
  );
}
