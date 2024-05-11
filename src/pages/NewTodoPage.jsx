import React, { Suspense, lazy } from 'react';
import Loader from '../components/Loader';
import MainLayout from '../layout/MainLayout';
const NewTodo = lazy(() => import("../components/NewTodo"))

const NewTodoPage = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <MainLayout>
          <NewTodo />
        </MainLayout>
      </Suspense>
    </div>
  );
};

export default NewTodoPage;