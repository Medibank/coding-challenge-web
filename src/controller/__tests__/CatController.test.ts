import { CatController } from '../CatController';
import { CatDataSource, Person } from '../../model/CatDataSource';

// Mock the CatDataSource
jest.mock('../../model/CatDataSource');

describe('CatController', () => {
  let controller: CatController;
  let mockDataSource: jest.Mocked<CatDataSource>;
  
  beforeEach(() => {
    mockDataSource = new CatDataSource() as jest.Mocked<CatDataSource>;
    controller = new CatController(mockDataSource);
    jest.clearAllMocks();
  });
  
  it('should group cats by owner gender and sort alphabetically', async () => {
    const mockPeopleData: Person[] = [
      {
        name: 'John',
        gender: 'Male',
        age: 30,
        pets: [
          { name: 'Felix', type: 'Cat' },
          { name: 'Buddy', type: 'Cat' }
        ]
      },
      {
        name: 'Jane',
        gender: 'Female',
        age: 25,
        pets: [
          { name: 'Whiskers', type: 'Cat' }
        ]
      },
      {
        name: 'Mark',
        gender: 'Male',
        age: 40,
        pets: [
          { name: 'Amber', type: 'Cat' }
        ]
      },
      {
        name: 'Sarah',
        gender: 'Female',
        age: 35,
        pets: null
      }
    ];
    
    mockDataSource.fetchPeopleData.mockResolvedValueOnce(mockPeopleData);
    
    const result = await controller.getCatsByOwnerGender();
    
    expect(result).toEqual({
      'Male': ['Amber', 'Buddy', 'Felix'],
      'Female': ['Whiskers']
    });
    
    expect(mockDataSource.fetchPeopleData).toHaveBeenCalledTimes(1);
  });
  
  it('should filter only cats from pets', async () => {
    const mockPeopleData: Person[] = [
      {
        name: 'John',
        gender: 'Male',
        age: 30,
        pets: [
          { name: 'Felix', type: 'Cat' },
          { name: 'Rover', type: 'Dog' }
        ]
      },
      {
        name: 'Jane',
        gender: 'Female',
        age: 25,
        pets: [
          { name: 'Whiskers', type: 'Cat' },
          { name: 'Goldie', type: 'Fish' }
        ]
      }
    ];
    
    mockDataSource.fetchPeopleData.mockResolvedValueOnce(mockPeopleData);
    
    const result = await controller.getCatsByOwnerGender();
    
    expect(result).toEqual({
      'Male': ['Felix'],
      'Female': ['Whiskers']
    });
    
    expect(mockDataSource.fetchPeopleData).toHaveBeenCalledTimes(1);
  });
  
    const mockPeopleData: Person[] = [
      {
        name: 'John',
        gender: 'Male',
        age: 30,
        pets: []
      },
      {
        name: 'Jane',
        gender: 'Female',
        age: 25,
        pets: [
          { name: 'Whiskers', type: 'Cat' }
        ]
      }
    ];
    
    mockDataSource.fetchPeopleData.mockResolvedValueOnce(mockPeopleData);
    
    const result = await controller.getCatsByOwnerGender();
    
    expect(result).toEqual({
      'Female': ['Whiskers']
    });
    
    expect(mockDataSource.fetchPeopleData).toHaveBeenCalledTimes(1);
  });
  
  it('should handle errors from data source', async () => {
    mockDataSource.fetchPeopleData.mockRejectedValueOnce(new Error('API Error'));
    
    await expect(controller.getCatsByOwnerGender()).rejects.toThrow('Failed to get cats by owner gender');
    
    expect(mockDataSource.fetchPeopleData).toHaveBeenCalledTimes(1);
  });
});