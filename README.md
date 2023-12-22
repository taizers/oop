# The Employee Records Project

Main directory contains Frontend part of project and `/backend` directory contains backend part of project.

## Backend part of project

### Local env requirements

- Node.js 16
- PostgreSQL 14

### Setup local

1. Create the database:

    ```

    psql postgres
    create user oop with password '1234';
    alter user oop with superuser;
    create database employee_records with owner = oop;
    grant all privileges on database employee_records to oop;
    alter user oop createdb;
    exit

    ```

1. Istall modules `npm install`
2. Create `.env` file based on `.env.examle`
3. Run server `npm run start`

## Available Scripts in the Frontend part

In the project directory, you can run:

1. `npm dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

2. `npm test`

Launches the test runner in the interactive watch mode.

3. `npm pretty`

Runs the prettier that that edit all code files to one style.\

4. `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
App is ready to be deployed!
