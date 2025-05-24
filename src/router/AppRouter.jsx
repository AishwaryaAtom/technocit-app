// src/router/AppRouter.jsx
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import { Suspense, lazy } from "react";
import { Spinner } from "react-bootstrap";
import ProtectedRoute from "./ProtectedRoute";

const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));
const Home = lazy(() => import("../pages/Home"));

const AppRouter = () => (
  //   <Router>
  <Suspense
    fallback={
      <div className="flex justify-center items-center h-screen">
        <Spinner animation="border" variant="danger" />
      </div>
    }
  >
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  </Suspense>
  //   </Router>
);

export default AppRouter;
