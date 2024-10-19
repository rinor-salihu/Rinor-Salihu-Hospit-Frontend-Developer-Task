"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { getUserById, updateUser } from '@/app/api/userService';
import toastNotify from '@/app/helpers/toastNotify';
import { User } from '@/app/types/user';
import UserForm from '@/app/components/User/UserForm';

const EditUserPage = () => {
  const router = useRouter();
  const { userId } = useParams();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserById(Number(userId));
      setUserData(user);
    };

    fetchUser();
  }, [userId]);

  const handleUpdateUser = async (user:User) => {
    await updateUser({ ...user, id: Number(userId) });
    toastNotify('User updated successfully');
    router.push('/users');
  };

  if (!userData) return <p>Loading user data...</p>;

  return (
      <UserForm userData={userData} onUpdateUser={handleUpdateUser} />
  );
};

export default EditUserPage;
