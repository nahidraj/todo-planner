import React, { Suspense, lazy } from 'react';
import MainLayout from '../layout/MainLayout';
import Loader from '../components/Loader';
const CanceledTodo = lazy(() => import("../components/CanceledTodo"))

const CanceledTodoPage = () => {
  return (
    <div>
      <Suspense fallback={<Loader/>}>
        <MainLayout>
          <CanceledTodo />
        </MainLayout>
      </Suspense>
    </div>
  );
};

export default CanceledTodoPage;