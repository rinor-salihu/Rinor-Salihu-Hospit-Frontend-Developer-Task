"use client"; // Add this line

import React, { useState } from 'react';
import { createUser, updateUser } from '../../api/userService';

const UserForm = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  const handleCreateUser = async () => {
    await createUser();
    alert('User created (mock API)');
  };

  const handleUpdateUser = async () => {
    if (userId !== null) {
      await updateUser(userId);
      alert('User updated (mock API)');
    }
  };

  return (
    <div>
      <h2>{isUpdating ? 'Update User' : 'Create User'}</h2>
      {isUpdating && (
        <input
          type="number"
          placeholder="User ID"
          value={userId || ''}
          onChange={(e) => setUserId(parseInt(e.target.value))}
        />
      )}
      <button onClick={isUpdating ? handleUpdateUser : handleCreateUser}>
        {isUpdating ? 'Update User' : 'Create User'}
      </button>
      <button onClick={() => setIsUpdating(!isUpdating)}>
        {isUpdating ? 'Switch to Create' : 'Switch to Update'}
      </button>
    </div>
  );
};

export default UserForm;
