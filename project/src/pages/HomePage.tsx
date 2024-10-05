import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import UserTable from '../components/UserTable';
import UserCard from '../components/UserCard';
import CreateUserModal from '../components/CreateUserModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModel';
import ToastNotification from '../components/ToastNotification';
import { fetchUsers } from '../services/FetchUsers';
import { User } from '../types/userTypes';
import Loader from '../components/Loader';

// Mock user data
const initialUsers:User[] = [];

export default function HomePage() {
  const [users, setUsers] = useState(initialUsers);
  const[loading,setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [newUser, setNewUser] = useState<User>({
    id: 0, // Or any default value
    name: '',
    username: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    },
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: ''
    }
  });
  
  const [isMobile, setIsMobile] = useState(false);
  const [toast, setToast] = useState({ message: '', visible: false, type: '' });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: User[] = await fetchUsers(); 
        if (!data) {
          showToast('Failed to Fetch Users', 'error');
        } else {
          setUsers(data); 
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        showToast('An error occurred while fetching users', 'error');
      }
    };
  
    fetchData(); 
  }, []);
  

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  const handleCreateUser = () => {
    setUsers([...users, { id: users.length + 1, ...newUser }]);
    setNewUser({ name: '', email: '', phone: '' });
    setIsCreateModalOpen(false);
    showToast('User created successfully!', 'success');
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
    setIsDeleteModalOpen(false);
    showToast('User deleted successfully!', 'success');
  };

  const showToast = (message:string, type:string) => {
    setToast({ message, visible: true, type });
    setTimeout(() => setToast({ message: '', visible: false, type: '' }), 3000);
  };



  return (
    <>
    {loading && <Loader/>}
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">User Management Dashboard</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus className="inline-block mr-2 h-4 w-4" /> Create User
            </button>
          </div>
          {isMobile ? (
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  setUserToDelete={setUserToDelete}
                  setIsDeleteModalOpen={setIsDeleteModalOpen}
                />
              ))}
            </div>
          ) : (
            <UserTable users={filteredUsers} setUserToDelete={setUserToDelete} setIsDeleteModalOpen={setIsDeleteModalOpen} />
          )}
        </div>
      </main>

      {isCreateModalOpen && (
        <CreateUserModal
          newUser={newUser}
          setNewUser={setNewUser}
          handleCreateUser={handleCreateUser}
          setIsCreateModalOpen={setIsCreateModalOpen}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal handleDeleteUser={() => handleDeleteUser(userToDelete?.id)} setIsDeleteModalOpen={setIsDeleteModalOpen} />
      )}

      <ToastNotification toast={toast} />
    </div>
    </>
  );
}
