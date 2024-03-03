# Blog App using MySQL

A MERN application for basic CRUD operations , authentication and authorization.

## Table of Contents

- [Features](#features)
- [Tools and Technologies](#tools-and-technologies)
- [Dependencies](#dependencies)
- [Dev-dependencies](#dev-dependencies)
- [Prerequisites](#prerequisites)
- [Installation and setup](#installation-and-setup)
- [Backend API](#backend-api)
- [frontend pages](#frontend-pages)
- [npm scripts](#npm-scripts)
- [Useful Links](#useful-links)

## Features

### User-side features

- Signup
- Login
- Logout
- Add Post
- Similar Posts
- View Post
- Update Post
- Delete Post

### Developer-side features

- Form validations in frontend and backend
- Token based Authentication
- Use of 404 page for wrong urls
- Relevant redirects
- Use of layout component for pages
- Use of various React hooks
- Routes protection
- Use of different HTTP status codes for sending responses
- Standard pratices followed

## Tools and Technologies

- HTML
- CSS
- Javascript
- Node.js
- Express.js
- React
- Context-API
- MySQL

## Dependencies

Following are the major dependencies of the project:

- axios
- react
- react-dom
- react-router-dom
- sass
- bcrypt
- dotenv
- cors
- dotenv
- express
- jsonwebtoken
- mysql

## Dev-dependencies

Following are the major dev-dependencies of the project:

- nodemon

## Prerequisites

- Node.js must be installed on the system.
- You should have a mySQL database.
- You should have a code editor (preferred: VS Code)

## Installation and Setup

1. Install all the dependencies

   ```sh
   npm run install-all
   ```

2. Create a file named ".env" inside the backend folder. Add data from .env.example file and substitute your credentials there.

3. Start the application

   ```sh
   npm run dev
   ```

4. Go to http://localhost:3000

## Backend API

<pre>
- POST     /api/auth/register
- POST     /api/auth/login
- GET      /api/posts
- POST     /api/posts
- GET      /api/posts/:postId
- PUT      /api/posts/:postId
- DELETE   /api/tasks/:postId
</pre>

## Frontend pages

<pre>
- /                 Home Screen (Public home page for guests and private dashboard (tasks) for logged-in users)
- /register           Signup page
- /login            Login page
- /write        Add new post
- /post/postId   post Details
- /write/?edit=2   update a post
</pre>

## npm scripts

At root:

- `npm run dev`: Starts both backend and frontend
- `npm run dev-server`: Starts only backend
- `npm run dev-client`: Starts only frontend
- `npm run install-all`: Installs all dependencies and dev-dependencies required at root, at frontend and at backend.

Inside frontend folder:

- `npm start`: Starts frontend in development mode
- `npm run build`: Builds the frontend for production to the build folder
- `npm test`: Launches the test runner in the interactive watch mode
- `npm run eject`: This will remove the single build dependency from the frontend.

Inside backend folder:

- `npm run dev`: Starts backend using nodemon.
- `npm start`: Starts backend without nodemon.

## Useful Links

- This project

  - Github Repo: https://github.com/sachinsingh3232/BlogApp

- Official Docs

  - Reactjs docs: https://reactjs.org/docs/getting-started.html
  - npmjs docs: https://docs.npmjs.com/
  - Mongodb docs: https://docs.mongodb.com/manual/introduction/
  - Github docs: https://docs.github.com/en/get-started/quickstart/hello-world
