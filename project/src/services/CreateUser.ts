import axios from 'axios';
import { User } from '../types/userTypes';


export const createUser = async (user: User): Promise<User> => {
  try {
    const response = await axios.post<User>('https://jsonplaceholder.typicode.com/users', user);
    return response.data; 
  } catch (error) {
    throw new Error('Failed to create user');
  }
};
