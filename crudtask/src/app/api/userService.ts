import { User } from "../types/user";

const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Fetch all users
export const getUsers = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

// api/userService.ts

// Get user by ID
export const getUserById = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

// Delete a user
export const deleteUser = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return response.ok;
};

// Create a user (normally you'd pass user data here, but for simplicity, we'll just send an empty object)
// Create a user
export const createUser = async (user: User) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),  // Send the user data
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
    body: JSON.stringify(user),  // Send the updated user data
  });
  return response.json();
};

