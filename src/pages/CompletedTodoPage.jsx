import React, { Suspense, lazy } from 'react';
import MainLayout from '../layout/MainLayout';
import Loader from '../components/Loader';
const CompletedTodo = lazy(()=>import ("../components/CompletedTodo"))
const CompletedTodoPage = () => {
  return (
    <div>
      <Suspense fallback={<Loader/>}>
        <MainLayout>
          <CompletedTodo></CompletedTodo>
        </MainLayout>
      </Suspense>
    </div>
  );
};

export default CompletedTodoPage;