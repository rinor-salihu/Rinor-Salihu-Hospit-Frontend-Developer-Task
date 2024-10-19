"use client";

import React from 'react';
import { createUser } from '../../api/userService';
import toastNotify from '../../helpers/toastNotify';
import { useRouter } from 'next/navigation';
import UserForm from '@/app/components/User/UserForm';
import { User } from '@/app/types/user';

const NewUserPage = () => {
  const router = useRouter();

  const handleCreateUser = async (user:User) => {
    await createUser(user);
    toastNotify('User created successfully');
    router.push('/users');
  };

  return (
    <div>
      <UserForm onCreateUser={handleCreateUser} />
    </div>
  );
};

export default NewUserPage;
