import { CatDataSource, CatsByGender, Person } from "../model/CatDataSource";

// CatController class to handle the business logic
export class CatController {
  private dataSource: CatDataSource;

  constructor(dataSource: CatDataSource = new CatDataSource()) {
    this.dataSource = dataSource;
  }

  // Get cats grouped by their owner's gender
  public async getCatsByOwnerGender(): Promise<CatsByGender> {
    try {
      // Fetch people data from the API
      const people: Person[] = await this.dataSource.fetchPeopleData();
      
      // Group cats by their owner's gender
      const catsByGender: CatsByGender = {};
      
      people.forEach(person => {
        if (person.pets) {
          // Filter out only cats from pets array
          const cats = person.pets.filter(pet => pet && pet.type === 'Cat');
          
          if (cats.length > 0) {
            if (!catsByGender[person.gender]) {
              catsByGender[person.gender] = [];
            }
            // Add cat names to the corresponding gender group
            cats.forEach(cat => {
              catsByGender[person.gender].push(cat.name);
            });
          }
        }
      });
      
      // Sort cat names alphabetically for each gender
      Object.keys(catsByGender).forEach(gender => {
        catsByGender[gender].sort();
      });
      
      return catsByGender;
    } catch (error) {
      console.error('Error getting cats by owner gender:', error);
      throw new Error('Failed to get cats by owner gender');
    }
  }
}