import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RouterConfig } from '@/constants/routes';
import { Layout } from '@/containers';

const HomePage = lazy(() => import('@/pages/HomePage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const SignUpPage = lazy(() => import('@/pages/SignUpPage'));
const Settings = lazy(() => import('@/pages/Settings'));
const ArticleEditorPage = lazy(() => import('@/pages/ArticleEditorPage'));
const ErrorPage = lazy(() => import('@/pages/ErrorPage'));
const ArticlePage = lazy(() => import('@/pages/ArticlePage'));

export const router = createBrowserRouter([
  {
    path: RouterConfig.Home,
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: RouterConfig.LoginPage,
        element: <LoginPage />,
      },
      {
        path: RouterConfig.SignUpPage,
        element: <SignUpPage />,
      },
      {
        path: RouterConfig.Settings,
        element: <Settings />,
      },
      {
        path: RouterConfig.NewPost,
        element: <ArticleEditorPage />,
      },
      {
        path: RouterConfig.ArticleEdit,
        element: <ArticleEditorPage />,
      },
      {
        path: RouterConfig.ArticlePage,
        element: <ArticlePage />,
      },
    ],
  },
]);
