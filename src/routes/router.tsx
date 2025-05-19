import React from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

import Layout from '../pages/layout/Layout';
import MainContainer from '../pages/main/MainContainer';
import IndexContainer from '../pages/layout/index/IndexContainer';
import MyPageContainer from '../pages/mypage/MyPageContainer';
import JoinContainer from '../pages/login/JoinContainer';
import LoginContainer from '../pages/login/LoginContainer';
import PostCreateContainer from '../pages/postcreate/PostCreateContainer';
import PostDetailContainer from '../pages/postdetail/PostDetailContainer';
import FindIdContainer from '../pages/login/findid/FindIdContainer';
import FindPasswordContainer from '../pages/login/findpassword/FindPasswordContainer';
import ProfileFixContainer from '../pages/profileFix/ProfileFixContainer';
import LimitationLogContainer from '../pages/limitationlog/LimitationLogContainer';
import Search from '../pages/search/Search';
import PostEditContainer from '../pages/postcreate/PostEditContainer';

// ✅ 문서 레이아웃 및 문서 페이지 import
import DocsLayout from '../pages/layout/index/docspages/DocsLayout';
import StartPage from '../pages/layout/index/docspages/views/StartPage';
import FAQPage from 'src/pages/layout/index/docspages/views/FAQPage';
import AuthPage from 'src/pages/layout/index/docspages/views/AuthPage';
import JwthashPage from 'src/pages/layout/index/docspages/views/Jwthash';
import RequestPage from 'src/pages/layout/index/docspages/views/Request';
import SecurityPage from 'src/pages/layout/index/docspages/views/Security';

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <IndexContainer /> },
      { path: "/main", element: <MainContainer /> },
      { path: "/mypage", element: <MyPageContainer /> },
      { path: "/profilefix", element: <ProfileFixContainer /> },
      { path: "/limitlog", element: <LimitationLogContainer /> },
      { path: "/postcreate", element: <PostCreateContainer /> },
      { path: "/post/:id", element: <PostDetailContainer /> },
      { path: "/edit/:id", element: <PostEditContainer /> },
      { path: "/search", element: <Search /> }
    ]
  },
  {
    path: "/join",
    element: <JoinContainer />
  },
  {
    path: "/login",
    element: <LoginContainer />
  },
  {
    path: "/findid",
    element: <FindIdContainer />
  },
  {
    path: "/findpassword",
    element: <FindPasswordContainer />
  },
  
  {
    path: "/docs",
    element: <DocsLayout />,
    children: [
      {
        path: "start",
        element: <StartPage />
      },
      {
        path: "faq",
        element: <FAQPage />
      },
      {
        path: "auth",
        element: <AuthPage />
      },
      {
        path: "jwthash",
        element: <JwthashPage />
      },
      {
        path: "request",
        element: <RequestPage />
      },
      {
        path: "security",
        element: <SecurityPage />
      },
      
    ]
  }
];

const router = createBrowserRouter(routes);
export default router;
