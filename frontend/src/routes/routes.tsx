import { RouteObject } from "react-router-dom";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

import HomePage from "@/pages/home/HomePage";
import AuthCallbackPage from "@/pages/auth-callback/AuthCallbackPage";
import ChatPage from "@/pages/chat-page/ChatPage";
import AlbumPage from "@/pages/album-page/AlbumPage";
import AdminPage from "@/pages/admin-page/AdminPage";
import NotFoundPage from "@/pages/not-found-page/NotFoundPage";
import MainLayout from "@/layout/MainLayout";

import ProtectedRoute from "@/components/ProtectedRoute";
import ProtectedRouteUser from "@/components/ProtectedRouteUser";
import PublicRoute from "@/components/PublicRoute";

export const appRoutes: RouteObject[] = [
  {
    path: "/sso-callback",
    element: (
      <PublicRoute>
        <AuthenticateWithRedirectCallback signUpForceRedirectUrl="/auth-callback" />
      </PublicRoute>
    ),
  },
  {
    path: "/auth-callback",
    element: (
      <PublicRoute>
        <AuthCallbackPage />
      </PublicRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminPage />
      </ProtectedRoute>
    ),
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/chat",
        element: (
          <ProtectedRouteUser>
            <ChatPage />
          </ProtectedRouteUser>
        ),
      },
      {
        path: "/albums/:albumId",
        element: (
          <ProtectedRouteUser>
            <AlbumPage />
          </ProtectedRouteUser>
        ),
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
];