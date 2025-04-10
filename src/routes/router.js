import { createBrowserRouter } from 'react-router-dom'
import Layout from '../pages/layout/Layout';
import MainContainer from '../pages/main/MainContainer';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path : '/main',
        element : <MainContainer/>
      }
    ]}
]);



export default router;