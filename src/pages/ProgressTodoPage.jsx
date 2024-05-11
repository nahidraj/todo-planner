import React, { Suspense, lazy } from 'react';
import Loader from '../components/Loader';
import MainLayout from '../layout/MainLayout';
const ProgressTodo = lazy(() => import("../components/ProgressTodo"))

const ProgressTodoPage = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <MainLayout>
          <ProgressTodo />
        </MainLayout>
      </Suspense>
    </div>
  );
};

export default ProgressTodoPage;