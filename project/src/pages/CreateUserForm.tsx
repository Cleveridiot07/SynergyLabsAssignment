import { useState } from 'react';
import { createUser } from '../services/createUser'; // Make sure the path is correct
import { User } from '../types/userTypes';
import Loader from '../components/Loader';
import ToastNotification from '../components/ToastNotification';

export default function CreateUserForm() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', visible: false, type: '' });
  const [user, setUser] = useState<User>({
    id: 0,
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

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUser(prevUser => {
      if (name.includes('.')) {
        const [key, subKey, subSubKey] = name.split('.');
        return {
          ...prevUser,
          [key]: {
            ...prevUser[key as keyof typeof prevUser],
            [subKey]: subSubKey
              ? {
                  ...prevUser[key as keyof typeof prevUser][subKey as keyof typeof prevUser[keyof typeof prevUser]],
                  [subSubKey]: value
                }
              : value
          }
        };
      }
      return { ...prevUser, [name]: value };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true while creating the user
    setError(null); // Reset any previous error

    try {
      const createdUser = await createUser(user); // Call the createUser service
      console.log('User created:', createdUser);
      setToast({ message: 'User created successfully!', visible: true, type: 'success' }); // Show success toast

      // Reset the user state after successful creation
      setUser({
        id: 0,
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
    } catch (error) {
      setError('Failed to create user'); 
      setToast({ message: 'Failed to create user', visible: true, type: 'error' }); 
      console.error('Error creating user:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      {loading && <Loader />} 
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create New User</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={user.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={user.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={user.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
            />
          </div>
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              value={user.website}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
            />
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-4">Address</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">Street</label>
          <input
            id="street"
            name="address.street"
            type="text"
            value={user.address.street}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
        <div>
          <label htmlFor="suite" className="block text-sm font-medium text-gray-700 mb-1">Suite</label>
          <input
            id="suite"
            name="address.suite"
            type="text"
            value={user.address.suite}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input
            id="city"
            name="address.city"
            type="text"
            value={user.address.city}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
        <div>
          <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700 mb-1">Zipcode</label>
          <input
            id="zipcode"
            name="address.zipcode"
            type="text"
            value={user.address.zipcode}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
        <div>
          <label htmlFor="lat" className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
          <input
            id="lat"
            name="address.geo.lat"
            type="text"
            value={user.address.geo.lat}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
        <div>
          <label htmlFor="lng" className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
          <input
            id="lng"
            name="address.geo.lng"
            type="text"
            value={user.address.geo.lng}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-4">Company</h3>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
          <input
            id="companyName"
            name="company.name"
            type="text"
            value={user.company.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
        <div>
          <label htmlFor="catchPhrase" className="block text-sm font-medium text-gray-700 mb-1">Catch Phrase</label>
          <input
            id="catchPhrase"
            name="company.catchPhrase"
            type="text"
            value={user.company.catchPhrase}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
        <div>
          <label htmlFor="bs" className="block text-sm font-medium text-gray-700 mb-1">BS</label>
          <textarea
            id="bs"
            name="company.bs"
            value={user.company.bs}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
          ></textarea>
        </div>
      </div>

        <button
          type="submit"
          className="w-full mt-6 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Create User
        </button>
      </form>
      <ToastNotification toast={toast} /> {/* Toast notification */}
    </>
  );
}
