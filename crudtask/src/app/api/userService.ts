const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Fetch all users
export const getUsers = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

// Create a user (normally you'd pass user data here, but for simplicity, we'll just send an empty object)
export const createUser = async () => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),  // Simulated API call
  });
  return response.json();
};

// Update a user
export const updateUser = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),  // Simulated API call
  });
  return response.json();
};

// Delete a user
export const deleteUser = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return response.ok;
};
