# Workflow Genie

Workflow Genie is a robust and intuitive task management application built using the MERN (MongoDB, Express.js, React, Node.js) stack. Designed with Tailwind CSS for a sleek user interface, Workflow Genie aims to streamline project management and enhance productivity for teams of all sizes.

## Features

- **Task Management**: Create, edit, and delete tasks with ease. Assign tasks to team members and set priorities and deadlines.
- **Project Overview**: Get a comprehensive view of all tasks in a project, categorized by status (Pending, In-Progress, Completed).
- **Real-Time Updates**: Experience seamless real-time updates across the application, ensuring all team members are on the same page.
- **User Authentication**: Secure login and registration functionality to protect user data and project information.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/workflow-genie.git
    cd workflow-genie
    ```

2. **Install server dependencies**:
    ```bash
    cd server
    npm install
    ```

3. **Install client dependencies**:
    ```bash
    cd ../client
    npm install
    ```

4. **Set up environment variables**:
    Create a `.env` file in the `server` directory and add the following:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

5. **Start the development server**:
    ```bash
    cd server
    npm run dev
    ```

6. **Start the client**:
    ```bash
    cd ../client
    npm start
    ```

## Usage

1. **User Registration and Login**: Register a new account or log in with existing credentials.
2. **Create a Project**: Start a new project and invite team members to collaborate.
3. **Manage Tasks**: Add new tasks, assign them to team members, set deadlines, and update their statuses.
4. **Track Progress**: Use the project overview to monitor the status of all tasks and ensure timely completion.

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
    ```bash
    git checkout -b feature-name
    ```
3. Commit your changes and push the branch to your fork.
    ```bash
    git commit -m "Description of your feature or fix"
    git push origin feature-name
    ```
4. Open a pull request with a detailed description of your changes.


## Acknowledgements

- **MongoDB**: For the powerful NoSQL database.
- **Express.js**: For the flexible and minimalist web framework for Node.js.
- **React**: For the efficient and declarative JavaScript library for building user interfaces.
- **Node.js**: For the JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Tailwind CSS**: For the highly customizable, low-level CSS framework.
