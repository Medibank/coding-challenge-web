import React from 'react';

// Props interface for GenderSection component
interface GenderSectionProps {
  gender: string;
  catNames: string[];
}

// GenderSection component to display a gender heading and list of cat names
const GenderSection: React.FC<GenderSectionProps> = ({ gender, catNames }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{gender}</h2>
      <ul className="space-y-2">
        {catNames.map((catName, index) => (
          <li key={`${catName}-${index}`} className="text-gray-700">
            {catName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenderSection;