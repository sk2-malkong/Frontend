import { createBrowserRouter } from 'react-router-dom'
import Layout from '../pages/layout/Layout';
import Index from '../pages/layout/index/Index';
import MainContainer from '../pages/main/MainContainer';
import IndexContainer from '../pages/layout/index/IndexContainer';

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
      }
    ]}
]);



export default router;