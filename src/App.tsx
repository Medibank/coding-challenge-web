import React from 'react';
import CatList from './view/CatList';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CatList />
    </div>
  );
};

export default App;