import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { useAuth } from "./customHook/authHook";
import { LoadingProvider } from "./context/loadingContext";
function ProtectedRoute() {
  const isAuthenticated = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/sign-in" replace />;
}


function App() {
  return (
    <LoadingProvider>
    <Routes>
      <Route path="/auth/*" element={<Auth />} />
      
      {/* Protected Route */}
      <Route element={<ProtectedRoute />}>
        <Route  path="/dashboard/*" element={<Dashboard />} />
        {/* Add more nested routes inside /dashboard if needed */}
      </Route>
      
      {/* Redirect all other routes */}
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
    </LoadingProvider>
  );
}

export default App;
