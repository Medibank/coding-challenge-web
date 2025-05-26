# Medibank Coding Challenge

## Overview

A web service has been setup at the following URL: 
-	https://gist.githubusercontent.com/medibank-digital/a1fc81a93200a7b9d5f8b7eae0fac6f8/raw/de10a4fcf717e6c431e88c965072c784808fd6b2/people.json

## Requirements
You need to:
- Write some code to consume the json hosted on the above web service.
- Output a list of all the cats in alphabetical order under a heading of the gender of their owner.
- Output must be presentable on a web browser.
- Submissions will only be accepted via GitHub or Bitbucket.

Please note:
- It can be written in any language you like.
- Use any libraries/frameworks/SDKs you choose.
- Use industry best practices.
- Use the code to showcase your skill and what you value in a software application.

## Example

```
Male

Angel
Molly
Tigger


Female

Gizmo
Jasper
Notes

```

## Solution

This solution is implemented using React with TypeScript and follows SOLID principles with a separation of concerns inspired by MVC (Model-View-Controller) architecture.

### Architecture

The application is structured as follows:

#### Model
- `CatDataSource.ts` - Handles data fetching from the API using Axios
  - Defines data interfaces and provides methods to fetch data

#### Controller
- `CatController.ts` - Processes the data from the model
  - Filters pet data to get only cats
  - Groups cats by owner gender
  - Sorts cats alphabetically

#### View
- `CatList.tsx` - Main component that orchestrates data fetching and rendering
- `GenderSection.tsx` - Component that renders a gender section with its cats list

### Technologies Used

- React for the UI
- TypeScript for type safety
- Axios for API calls
- Tailwind CSS for styling

### SOLID Principles Application

1. **Single Responsibility Principle**
   - Each class has a single responsibility:
     - `CatDataSource` is responsible for data fetching
     - `CatController` is responsible for data processing
     - View components are responsible for rendering UI

2. **Open/Closed Principle**
   - Components are designed to be extended without modification
   - New view components can be added without changing existing code

3. **Liskov Substitution Principle**
   - Components use interfaces for type definitions, allowing for polymorphism

4. **Interface Segregation Principle**
   - Small, focused interfaces are used

5. **Dependency Inversion Principle**
   - High-level modules don't depend on low-level modules directly
   - Dependencies are injected (e.g., CatDataSource into CatController)

### How to Run

1. Clone the repository
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the development server
   ```bash
   npm start
   ```
4. Open your browser and navigate to http://localhost:3000

### Building for Production

To build the application for production:
```bash
npm run build
```

This will create a `build` directory with optimized production build.
