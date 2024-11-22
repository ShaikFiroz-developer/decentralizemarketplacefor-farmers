// App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/authContext"; // Path to AuthProvider
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Farmer from "./Pages/Farmer";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import Orders from "./Pages/Orders";
import Product from "./Pages/Product";

// PrivateRoute component to handle protected routes with role-based access
function PrivateRoute({ children, allowedRoles }) {
  const { isLoggedIn } = useAuth();
  const userRole = localStorage.getItem("useRole");

  if (!isLoggedIn && userRole == undefined) {
    return <Navigate to="/login" />;
  }

  // Check if the user's role is allowed for this route
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return children;
}

function Mainroutes() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/register"
        element={isLoggedIn ? <Navigate to="/" /> : <Register />}
      />

      {/* Private Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute allowedRoles={["buyer"]}>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={["farmer"]}>
            <Farmer />
          </PrivateRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <PrivateRoute allowedRoles={["buyer"]}>
            <Cart />
          </PrivateRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <PrivateRoute allowedRoles={["buyer"]}>
            <Orders />
          </PrivateRoute>
        }
      />
      <Route
        path="/product/:id"
        element={
          <PrivateRoute allowedRoles={["buyer"]}>
            <Product />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Mainroutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
