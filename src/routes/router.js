import { createBrowserRouter } from 'react-router-dom'
import Layout from '../pages/layout/Layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
    ]}
]);



export default router;