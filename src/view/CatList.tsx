import React, { useEffect, useState } from 'react';
import { CatController } from '../controller/CatController';
import { CatsByGender } from '../model/CatDataSource';
import GenderSection from './GenderSection';

// CatList component to display cats grouped by owner's gender
const CatList: React.FC = () => {
  const [catsByGender, setCatsByGender] = useState<CatsByGender>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCatData = async () => {
      try {
        const controller = new CatController();
        const data = await controller.getCatsByOwnerGender();
        setCatsByGender(data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load cat data. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchCatData();
  }, []);

  if (isLoading) {
    return <div className="text-center py-10">Loading cat data...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-900">Cats By Owner Gender</h1>
      
      {Object.keys(catsByGender).length === 0 ? (
        <p className="text-center text-gray-700">No cats found.</p>
      ) : (
        Object.entries(catsByGender).map(([gender, catNames]) => (
          <GenderSection key={gender} gender={gender} catNames={catNames} />
        ))
      )}
    </div>
  );
};

export default CatList;