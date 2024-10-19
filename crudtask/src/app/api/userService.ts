import { User } from "../types/user";

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = async () => {
  const response = await fetch(API_URL);
  return response.json();
};


export const getUserById = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};



export const createUser = async (user: User) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),  
  });
  return response.json();
};

// Update a user
export const updateUser = async (user: User) => {
  const response = await fetch(`${API_URL}/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),  
  });
  return response.json();
};

export const deleteUser = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return response.ok;
};