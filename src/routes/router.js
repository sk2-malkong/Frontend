import { createBrowserRouter } from 'react-router-dom'
import Layout from '../pages/layout/Layout';
import Index from '../pages/layout/index/Index';
import MainContainer from '../pages/main/MainContainer';
import IndexContainer from '../pages/layout/index/IndexContainer';
import MyPageContainer from '../pages/mypage/MyPageContainer';
import JoinContainer from '../pages/login/JoinContainer';
import LoginContainer from '../pages/login/LoginContainer';
import PostCreateContainer from '../pages/postcreate/PostCreateContainer';
import PostDetailContainer from '../pages/postdetail/PostDetailContainer';
import FindIdContainer from '../pages/login/findid/FindIdContainer';
import FindPasswordContainer from '../pages/login/findpassword/FindPasswordContainer';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        index:true,
        element : <IndexContainer/>
      },
      {
        path : '/main',
        element : <MainContainer/>
      },
      {
        path : '/mypage',
        element : <MyPageContainer/>
      },{
        path : '/postcreate',
        element : <PostCreateContainer/>
      },
      {
        path : '/post/:id',
        element : <PostDetailContainer/>
      }
    ]},
    {
      path : "/join",
      element : <JoinContainer/>
    },
    {
      path : "/login",
      element : <LoginContainer/>
    },
    {
      path : "/findid",
      element : <FindIdContainer/>
    },
    {
      path : "/findpassword",
      element : <FindPasswordContainer/>
    }
]);



export default router;