# KeyNote

**KeyNote** is a full-stack note-making web application built using the MERN stack. It offers a secure and user-friendly interface for managing personal notes with essential CRUD (Create, Read, Update, Delete) functionalities.

**Try it Live**: [KeyNote on Render](https://keynote-f51i.onrender.com/)

## Learning Experience

KeyNote was a milestone project in my MERN stack learning journey, integrating the full stack into one cohesive application. It provided hands-on experience with:  

- Building a secure backend using **Express** and **Node.js**.
- Implementing authentication using **JWT** (JSON Web Token).
- Hashing passwords securely with **bcrypt**.
- Utilizing **MongoDB Atlas** for database management.
- Creating a modular and functional UI with **React** and **Bootstrap**.
- Leveraging **Context API** for state management.

## Features

- **Secure Authentication:** User login and registration with JWT-based authentication and password hashing using bcrypt.
  
- **Note Management:** Fully functional CRUD operations for creating, viewing, updating, and deleting notes.
  
- **Responsive UI:** A clean and simple user interface designed using Bootstrap for a seamless user experience.
  
- **Context API Integration:** Efficient state management for user authentication and note handling.

## Tech Stack

- **Frontend:** React, Bootstrap, Context API
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas
- **Authentication:** JWT, bcrypt

## Installation

1. Clone the repository:
   
   ```bash
   git clone https://github.com/parthJuneja0/KeyNote.git
2. Navigate to the project directory:

   ```bash
   cd KeyNote
3. Create an `.env` file in the root directory and add the following environment variables:
   
   ```makefile
   MONGO_URI=<your_mongo_connection_string>
   JWT_SECRET=<your_jwt_secret>
4. Install server and client dependencies:
   
   ```bash
   npm install
5. Build the React application:
   
   ```bash
   npm run build
6. Start the server
   
   ```bash
   npm run serve
7. Open your browser and go to `http://localhost:5000` to use KeyNote.

## Contributing

Contributions are welcome! If you'd like to contribute to KeyNote, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/new-feature`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature/new-feature`.
5. Submit a pull request.

## Future Scope

KeyNote is a simple note-making application with room for enhancements. Potential improvements include:
  
- **Cloud Storage:** Allowing users to upload and store files along with their notes.
  
- **User Roles:** Differentiating access levels for admins and regular users.
  
- **Search Functionality:** Enabling users to search through notes efficiently.
  
- **Theming:** Providing customizable themes for a personalized user experience.
