import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
// import { useAuth } from "./customHook/authHook";
import { LoadingProvider } from "./context/loadingContext";
import { AuthProvider, useAuth } from "./context/authContext";
import EntryHome from "./pages/EntryHome";
function  ProtectedRoute() {
  const {userInfo} = useAuth();
  return userInfo.auth ? <Outlet /> : <Navigate to="/auth/sign-in" replace />;
}
function  AuthProtectedRoute() {
  const {userInfo} = useAuth();
  return !userInfo.auth ? <Outlet /> : <Navigate to="/dashbord/home" replace />;
}

function App() {
  return (
    <LoadingProvider>
    <AuthProvider>
    <Routes>
  {/* SignIn Protected */}
    <Route element={<AuthProtectedRoute />}>
        <Route  path="/auth/*" element={<Auth />} />
        <Route  path="/" element={<EntryHome />} />
        {/* Add more nested routes inside /dashboard if needed */}
      </Route>
      
      {/*Home page Protected Route */}
      <Route element={<ProtectedRoute />}>
        <Route  path="/dashboard/*" element={<Dashboard />} />
        {/* Add more nested routes inside /dashboard if needed */}
      </Route>
      
      {/* Redirect all other routes */}
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
    </AuthProvider>
    </LoadingProvider>
  );
}

export default App;
