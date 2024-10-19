import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { User } from '../../types/user';
import inputHelper from '@/app/helpers/inputHelper';
import { useParams } from 'next/navigation'; 

interface UserFormProps {
  userData?: User; 
  onCreateUser?: (user: User) => Promise<void>; 
  onUpdateUser?: (user: User) => Promise<void>; 
}

function UserForm({ userData, onCreateUser, onUpdateUser }: UserFormProps) {
  const { userId } = useParams(); 
  const [formData, setFormData] = useState<User>({
    id: 0, 
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
  });

  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userData) {
      await onUpdateUser?.(formData);
    } else {
      await onCreateUser?.(formData);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(inputHelper(e, userData));
  };

  return (
    <FormContainer>
      <h1 style={ {textAlign:"center"}} >{userId ? 'Edit User' : 'Create User'}</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="website"
          placeholder="Website"
          value={formData.website}
          onChange={handleChange}
          required
        />
        <Button type="submit">{userId ? 'Update User' : 'Create User'}</Button>
      </Form>
    </FormContainer>
  );
};

export default UserForm;

const FormContainer = styled.div`
  padding: 20px;
  background-color: #eef2f6;
  min-height: 100vh;
;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: auto;
;`

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
;`

const Button = styled.button`
  padding: 10px;
  background-color: #002147;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #003366;
  }
;`