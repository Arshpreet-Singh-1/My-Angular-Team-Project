import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Member } from './member';


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  createDb() {
    const members = [
      { "id": 1, "name": "Maya" },
      { "id": 2, "name": "Rohan" },
      { "id": 3, "name": "Priya" },
      { "id": 4, "name": "Aryan" },
      { "id": 5, "name": "Sneha" },
      { "id": 6, "name": "Siddharth" },
      { "id": 7, "name": "Riya" },
      { "id": 8, "name": "Arjun" },
      { "id": 9, "name": "Pooja" },
      { "id": 10, "name": "Karan" }
    ];
    return {members};
  }
  
  genId(heroes: Member[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
