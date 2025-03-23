import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { ReactNode } from "react";

function protectRoutes(element: ReactNode) {
  return <ProtectedRoute>{element}</ProtectedRoute>;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={protectRoutes(<Dashboard />)} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
