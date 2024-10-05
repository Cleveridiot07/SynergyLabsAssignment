import { User } from '../types/userTypes';
  
  import axios from 'axios';
  

  export const fetchUsers = async (): Promise<User[]> => {
    try {
      const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  };
  