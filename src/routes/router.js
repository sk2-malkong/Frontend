import { createBrowserRouter } from 'react-router-dom'
import Layout from '../pages/layout/Layout';
import Index from '../pages/layout/index/Index';
import MainContainer from '../pages/main/MainContainer';
import IndexContainer from '../pages/layout/index/IndexContainer';
import MyPageContainer from '../pages/mypage/MyPageContainer';
import JoinContainer from '../pages/login/JoinContainer';
import LoginContainer from '../pages/login/LoginContainer';
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
      }
    ]},
    {
      path : "/join",
      element : <JoinContainer/>
    },
    {
      path : "/login",
      element : <LoginContainer/>
    }
]);



export default router;