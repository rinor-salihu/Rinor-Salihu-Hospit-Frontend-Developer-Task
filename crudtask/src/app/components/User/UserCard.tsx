"use client";
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUsers, deleteUser } from '../../api/userService';
import { User } from '../../types/user'; 
import toastNotify from '../../helpers/toastNotify';
import Link from 'next/link';

// Styled Components
function UserCard  ()  {

  const [users, setUsers] = useState<User[]>([]);
  const [isCardView, setIsCardView] = useState(true); 
  const [isLoading, setIsLoading] = useState(true); 
  const userIcon = 'https://alhathal.net/wp-content/uploads/2019/07/516-5167304_transparent-background-white-user-icon-png-png-download.png'; // Replace with your desired image URL

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
      setIsLoading(false);
    };
    fetchUsers();
  }, []);



 

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    setUsers(users.filter(user => user.id !== id));
    toastNotify('User has been deleted');
  };


  const toggleView = () => {
    setIsCardView(!isCardView); 
  };

  return (
    <Container>
      <HeaderContainer>
        <Title>User List</Title>
        <Link href="/users/new" passHref>
        <CreateUserButtonContainer>
          <Link href="/users/new" passHref>
            <CreateUserButton>Create New User</CreateUserButton>
          </Link>
        </CreateUserButtonContainer>        </Link>
        <ToggleButton onClick={toggleView}>
          {isCardView ? 'List' : 'Card'}
        </ToggleButton>
      </HeaderContainer>

      {isLoading ? (
        <p>Loading users...</p> 
      ) : isCardView ? (
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
                <Link href={`/users/${user.id}`} passHref>
                <UpdateButton>Update</UpdateButton>
                </Link>
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
                      <Link href={`/users/${user.id}`} passHref>
                      <UpdateButton>Update</UpdateButton>
                      </Link>
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

const Container = styled.div`
  padding: 20px;
  background-color: #eef2f6; 
  min-height: 100vh; 
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center; 
`;

const CreateUserButtonContainer = styled.div`
  flex: 1; // Allow this container to grow and fill the space
  display: flex;
  justify-content: center; // Center the button horizontally
`;
const CreateUserButton = styled.button`
  background-color: #002147; // Green color for 'Create New User'
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem; 
  transition: background-color 0.2s;

  &:hover {
    background-color: darkblue; // Darker green on hover

  }
`;
const Title = styled.h1`
  text-align: center;
  font-size: 1.3rem; 
  color: #002147; 
  margin-bottom: 10px; 
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
`;



const ToggleButton = styled.button`
  background-color: #002147;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 1rem; 
  &:hover {
    background-color: darkblue; // Darker green on hover

  } 
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
  background-color: #ffffff; 
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.03);
  }
`;

const UserInfo = styled.div`
  text-align: center; 
  margin-bottom: 16px; 
`;

const UserImage = styled.img`
  border-radius: 50%; 
  width: 100px; 
  height: 100px; 
  object-fit: cover; 
  margin-bottom: 10px; 
`;

const UserName = styled.h2`
  font-size: 1.3rem; 
  color: #0066b2; 
  margin-bottom: 8px; 
`;

const UserDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  height: 100px; 
  margin-bottom:20px;
`;

const UserDetail = styled.p`
  font-size: 1rem; 
  color: #555; 
  margin: 4px 0; 
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
`;

const TableContainer = styled.div`
  margin-top: 20px;
  overflow-x: auto; 
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
  justify-content: center; 
  gap: 20px; 
  margin-top:5px;
`;

const UpdateButton = styled.button`
  background-color: #f39c12; 
  color: white;
  border: none;
  padding: 10px 15px; 
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem; 
  transition: background-color 0.2s;

  &:hover {
    background-color: #e67e22; 
  }
`;

const DeleteButton = styled.button`
  background-color: #c0392b; 
  color: white;
  border: none;
  padding: 10px 15px; 
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem; 
  transition: background-color 0.2s;

  &:hover {
    background-color: #a93226; 
  }
`;

