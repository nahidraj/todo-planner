import React, { lazy } from 'react';
const CreateTodo = lazy(() => import("../components/CreateTodo"))
import { Suspense } from 'react';
import MainLayout from '../layout/MainLayout';
import Loader from '../components/Loader';

const CreateTodoPage = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <MainLayout>
          <CreateTodo />
        </MainLayout>
      </Suspense>
    </div>
  );
};

export default CreateTodoPage;