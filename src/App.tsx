import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import AdminPanel from "./components/admin/AdminPanel";
import UserProfile from "./components/profile/UserProfile";
import CreateTierList from "./components/create/CreateTierList";
import { useAuth } from "./lib/auth";
import routes from "tempo-routes";
import { Layout } from "./components/layout/Layout";

function App() {
  const { isAuthenticated, user, login } = useAuth();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Layout isAuthenticated={isAuthenticated}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <div className="min-h-screen bg-background flex items-center justify-center">
                  <LoginForm onLogin={login} />
                </div>
              )
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <div className="min-h-screen bg-background flex items-center justify-center">
                  <SignUpForm />
                </div>
              )
            }
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                <UserProfile />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/create"
            element={
              isAuthenticated ? (
                <CreateTierList />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/admin"
            element={
              isAuthenticated && user?.role === "admin" ? (
                <AdminPanel />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </Layout>
    </Suspense>
  );
}

export default App;
