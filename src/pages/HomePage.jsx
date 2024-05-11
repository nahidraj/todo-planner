import { Suspense, lazy } from "react";
import MainLayout from "../layout/MainLayout";
const Home = lazy(() => import("../components/Home"))
import Loader from './../components/Loader';

const HomePage = () => {
  return (
    <div>
      <MainLayout>
        <Suspense fallback={<Loader />}>
          <Home></Home>
        </Suspense>
      </MainLayout>
    </div>
  );
};

export default HomePage;