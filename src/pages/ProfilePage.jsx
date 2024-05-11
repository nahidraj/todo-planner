import React, { Suspense, lazy } from 'react';
import MainLayout from '../layout/MainLayout';
import Loader from '../components/Loader';
const Profile = lazy(() => import("../components/Profile"))

const ProfilePage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <MainLayout>
        <Profile />
      </MainLayout>
    </Suspense>
  );
};

export default ProfilePage;