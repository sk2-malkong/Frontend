import React from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom'
import Layout from '../pages/layout/Layout';
import MainContainer from '../pages/main/MainContainer';
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
import PdMain from '../pages/layout/index/apiIntroMain/PdMainContainer'
import DocsLayout from "../pages/layout/index/docspages/DocsLayout";
import StartPage from "../pages/layout/index/docspages/views/StartPage";
import FAQPage from "../pages/layout/index/docspages/views/FAQPage";
import AuthPage from "../pages/layout/index/docspages/views/AuthPage";
import JwthashPage from "../pages/layout/index/docspages/views/Jwthash";
import RequestPage from "../pages/layout/index/docspages/views/Request";
import SecurityPage from "../pages/layout/index/docspages/views/Security";
import DetailPage from 'src/pages/layout/index/detailpage/DetailPage';
import MyPostListContainer from '../pages/mypostlist/MyPostListContainer';
import AIMessagePurifier from 'src/pages/layout/index/apiIntroMain/AIMessagePurifier';

const routes: RouteObject[] = [
  {
    path: "/",
    element: <PdMain />,  // 루트 경로에 PdMain 컴포넌트 직접 배치
    index: true,
  },
  {
    path: "/post",  // 기존 루트 경로를 /layout으로 변경
    element: <Layout/>,
    children: [
      {
        path: '/post/main',
        element: <MainContainer/>
      },
      {
        path: '/post/mypage',
        element: <MyPageContainer/>
      },
      {
        path: "/post/profilefix",
        element: <ProfileFixContainer/>
      },
      {
        path: '/post/limitlog',
        element: <LimitationLogContainer/>
      },
      {
        path: '/post/postcreate',
        element: <PostCreateContainer/>
      },
      {
        path: '/post/post/:id',
        element: <PostDetailContainer/>
      },
      {
        path: '/post/edit/:id',
        element: <PostEditContainer />
      },
      {
        path: '/post/search',
        element: <Search/>
      },
      {
        path: '/post/myposts',
        element: <MyPostListContainer />,
      },
    ]
  },
  {
    path: "/join",
    element: <JoinContainer/>
  },
  {
    path: "/login",
    element: <LoginContainer/>
  },
  {
    path: "/findid",
    element: <FindIdContainer/>
  },
  {
    path: "/findpassword",
    element: <FindPasswordContainer/>
  },
  // "/developers" 경로는 제거 (이미 루트 경로에 설정됨)
  {
    path : "/detail",
    element : <DetailPage/>
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
  },
  // 원래 경로로도 접근할 수 있도록 유지 (선택 사항)

  // {
  //   path: "/chat",
  //   element: <Chat/>
  // },

];

const router = createBrowserRouter(routes);

export default router;