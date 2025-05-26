import axios from 'axios';

// Define interfaces for Person and Cat data
export interface Cat {
  name: string;
}

export interface Person {
  name: string;
  gender: string;
  age: number;
  pets: Cat[] | null;
}

// Define interface for grouped cats
export interface CatsByGender {
  [gender: string]: string[];
}

// CatDataSource class to handle fetching data from the API
export class CatDataSource {
  private static readonly API_URL = 'https://gist.githubusercontent.com/medibank-digital/a1fc81a93200a7b9d5f8b7eae0fac6f8/raw/de10a4fcf717e6c431e88c965072c784808fd6b2/people.json';

  // Fetch people data from the API
  public async fetchPeopleData(): Promise<Person[]> {
    try {
      const response = await axios.get<Person[]>(CatDataSource.API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching people data:', error);
      throw new Error('Failed to fetch people data');
    }
  }
}