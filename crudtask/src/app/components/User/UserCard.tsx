"use client";

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUsers, deleteUser } from '../../api/userService';
import { User } from '../../types/user'; // Assuming you have a types file for User interface

// Styled Components
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between; /* Space between title and button */
  align-items: center; /* Center items vertically */
  margin-bottom: 20px; /* Space below the header */
`;

const Container = styled.div`
  padding: 20px;
  background-color: #eef2f6; /* Lighter background for contrast */
  min-height: 100vh; /* Ensure full height */
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.5rem; 
  color: #34495e; /* Darker color for contrast */
  margin-bottom: 10px; 
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* Align the button to the right */
  margin-bottom: 20px; /* Space below the button */
`;

const ToggleButton = styled.button`
  background-color: #0070f3; /* Blue color */
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff; /* White background for card */
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.03);
  }
`;

const UserInfo = styled.div`
  text-align: center; /* Center the image and name */
  margin-bottom: 16px; 
`;

const UserImage = styled.img`
  border-radius: 50%; /* Circular image */
  width: 100px; /* Set image width */
  height: 100px; /* Set image height */
  object-fit: cover; /* Cover the container without distortion */
  margin-bottom: 10px; /* Space below the image */
`;

const UserName = styled.h2`
  font-size: 1.3rem; /* Font size for the user's name */
  color: #0066b2; /* Blue color for emphasis */
  margin-bottom: 8px; 
`;

const UserDetailsContainer = styled.div`
  display: flex;
  flex-direction: column; /* Stack details vertically */
  align-items: flex-start; /* Align details to the left */
  height: 100px; /* Fixed height for consistency */
`;

const UserDetail = styled.p`
  font-size: 1rem; 
  color: #555; /* Gray color for less emphasis */
  margin: 4px 0; /* Space above and below the paragraphs */
  white-space: nowrap; /* Prevent wrapping */
  overflow: hidden; /* Hide overflow */
  text-overflow: ellipsis; /* Add ellipsis for overflowed text */
`;

const TableContainer = styled.div`
  margin-top: 20px;
  overflow-x: auto; /* Allow horizontal scrolling */
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: white;
  border-radius: 15px;


`;

const TableHeader = styled.th`
  color: black;
  padding: 10px;
  text-align: center;
`;

const TableCell = styled.td`
  padding: 10px;
    text-align: center;

`;
export const TableRow = styled.tr`
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: center; /* Center buttons horizontally */
  gap: 20px; /* Add space between buttons */
  margin-top:5px;
`;

const EditButton = styled.button`
  background-color: #f39c12; /* Orange color */
  color: white;
  border: none;
  padding: 10px 15px; /* Increased padding */
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem; /* Increased font size */
  transition: background-color 0.2s;

  &:hover {
    background-color: #e67e22; /* Darker orange */
  }
`;

const DeleteButton = styled.button`
  background-color: #c0392b; /* Red color */
  color: white;
  border: none;
  padding: 10px 15px; /* Increased padding */
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem; /* Increased font size */
  transition: background-color 0.2s;

  &:hover {
    background-color: #a93226; /* Darker red */
  }
`;

const UserCard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isCardView, setIsCardView] = useState(true); // State to manage view type

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    setUsers(users.filter(user => user.id !== id));
  };

  // Static image URL for all users
  const userIcon = 'https://alhathal.net/wp-content/uploads/2019/07/516-5167304_transparent-background-white-user-icon-png-png-download.png'; // Replace with your desired image URL

  const toggleView = () => {
    setIsCardView(!isCardView); // Toggle the view type
  };

  return (
    <Container>
      <HeaderContainer>
        <Title>User List</Title>
        <ToggleButton onClick={toggleView}>
          {isCardView ? 'List' : 'Card'}
        </ToggleButton>
      </HeaderContainer>

      {isCardView ? (
        <CardGrid>
          {users.map(user => (
            <Card key={user.id}>
              <UserInfo>
                <UserImage src={userIcon} alt="User Icon" />
                <UserName>{user.name}</UserName>
              </UserInfo>
              <UserDetailsContainer>
                <UserDetail><strong>Username:</strong> {user.username}</UserDetail>
                <UserDetail><strong>Email:</strong> {user.email}</UserDetail>
                <UserDetail><strong>Phone:</strong> {user.phone}</UserDetail>
                <UserDetail><strong>Website:</strong> {user.website}</UserDetail>
              </UserDetailsContainer>
              <ActionButtonContainer>
                <EditButton>Edit</EditButton>
                <DeleteButton onClick={() => handleDelete(user.id)}>Delete</DeleteButton>
              </ActionButtonContainer>
            </Card>
          ))}
        </CardGrid>
      ) : (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <TableHeader>Name</TableHeader>
                <TableHeader>Username</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Phone</TableHeader>
                <TableHeader>Website</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.website}</TableCell>
                  <TableCell>
                    <ActionButtonContainer>
                      <EditButton>Edit</EditButton>
                      <DeleteButton onClick={() => handleDelete(user.id)}>Delete</DeleteButton>
                    </ActionButtonContainer>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default UserCard;
