import { Edit, Trash2 } from 'lucide-react';

interface UserCardProps {
  user: any;
  setUserToDelete: (user: any) => void;
  setIsDeleteModalOpen: (open: boolean) => void;
}

export default function UserCard({ user, setUserToDelete, setIsDeleteModalOpen }: UserCardProps) {
  return (
    <div key={user.id} className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <p className="text-gray-600">{user.email}</p>
      <p className="text-gray-600">{user.phone}</p>
      <div className="mt-4 flex justify-end space-x-2">
        <button className="text-blue-500 hover:text-blue-600">
          <Edit className="h-5 w-5" />
        </button>
        <button
          className="text-red-500 hover:text-red-600"
          onClick={() => {
            setUserToDelete(user);
            setIsDeleteModalOpen(true);
          }}
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
