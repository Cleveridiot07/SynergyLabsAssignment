import React, { useState, lazy, Suspense } from 'react';
import './App.css';
import Loader from './components/Loader'; 

const HomePage = lazy(() => import('./pages/HomePage'));
const CreateUserForm = lazy(() => import('./pages/CreateUserForm'));

function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <CreateUserForm />
      </Suspense>
    </div>
  );
}

export default App;
