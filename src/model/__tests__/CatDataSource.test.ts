import axios from 'axios';
import { CatDataSource } from '../CatDataSource';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CatDataSource', () => {
  let dataSource: CatDataSource;
  
  beforeEach(() => {
    dataSource = new CatDataSource();
    jest.clearAllMocks();
  });
  
  it('should fetch people data successfully', async () => {
    const mockPeopleData = [
      {
        name: 'John',
        gender: 'Male',
        age: 30,
        pets: [{ name: 'Felix' }]
      },
      {
        name: 'Jane',
        gender: 'Female',
        age: 25,
        pets: null
      }
    ];
    
    mockedAxios.get.mockResolvedValueOnce({ data: mockPeopleData });
    
    const result = await dataSource.fetchPeopleData();
    
    expect(result).toEqual(mockPeopleData);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://gist.githubusercontent.com/medibank-digital/a1fc81a93200a7b9d5f8b7eae0fac6f8/raw/de10a4fcf717e6c431e88c965072c784808fd6b2/people.json'
    );
  });
  
  it('should handle errors when fetching people data', async () => {
    const errorMessage = 'Network Error';
    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));
    
    await expect(dataSource.fetchPeopleData()).rejects.toThrow('Failed to fetch people data');
    
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://gist.githubusercontent.com/medibank-digital/a1fc81a93200a7b9d5f8b7eae0fac6f8/raw/de10a4fcf717e6c431e88c965072c784808fd6b2/people.json'
    );
  });
});