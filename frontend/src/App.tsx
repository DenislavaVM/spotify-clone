import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import ChatPage from "./pages/chat-page/ChatPage";
import AlbumPage from "./pages/album-page/AlbumPage";
import AdminPage from "./pages/admin-page/AdminPage";
import { Toaster } from "react-hot-toast";
import NotFoundPage from "./pages/not-found-page/NotFoundPage";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {

  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback
            signUpForceRedirectUrl={"/auth-callback"}
          />} />
          <Route path="/auth-callback" element={<AuthCallbackPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route element={<MainLayout />} >
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/albums/:albumId" element={<AlbumPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ErrorBoundary>
      <Toaster />
    </>
  );
};

export default App;