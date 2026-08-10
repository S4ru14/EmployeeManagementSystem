# Employee Management System

## Technologies
- ReactJS
- Ant Design
- ASP.NET Core
- Microsoft SQL Server
- Entity Framework Core
- RESTful API
- JWT Authentication
- Git/GitHub

## Features
- Login
- JWT authentication
- Dashboard
- Employee Create
- Employee Retrieve
- Employee Update
- Employee Delete
- Duplicate EmployeeCode validation
- Employee report
- Print report

## Project Structure
- `backend/`: ASP.NET Core Web API backend, Entity Framework Core, SQL Server integration.
- `frontend/`: React Vite application with Ant Design, React Router, Axios.

## Prerequisites
- .NET SDK (10.0 or later)
- Node.js (16 or later)
- SQL Server or SQL Server Express
- Git

## Backend Setup
1. Open a terminal in the `backend` folder.
2. Restore dependencies:
   ```bash
   dotnet restore
   ```
3. Build the backend:
   ```bash
   dotnet build
   ```
4. Run the backend:
   ```bash
   dotnet run
   ```

Backend URL: `http://localhost:5027`

Swagger: `http://localhost:5027/swagger`

## Database Setup
The backend uses SQL Server and the connection string is configured in `backend/appsettings.json`.

If EF Core CLI is required:
```bash
dotnet tool install --global dotnet-ef
```

To apply migrations:
```bash
cd backend
dotnet ef database update
```

## Frontend Setup
1. Open a terminal in the `frontend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm run dev
   ```

Frontend URL: `http://localhost:5173`

## Login Credentials
The development admin account is:
- Username: `admin`
- Password: `Admin123!`

## API Endpoints
- `POST /api/Auth/login`
  - Authenticate a user and receive a JWT token.
  - Expected responses: `200 OK`, `401 Unauthorized`.

- `GET /api/Employees`
  - Retrieve all employees.
  - Expected response: `200 OK`.

- `GET /api/Employees/{id}`
  - Retrieve a specific employee by ID.
  - Expected responses: `200 OK`, `404 Not Found`.

- `POST /api/Employees`
  - Create a new employee.
  - Expected responses: `201 Created`, `400 Bad Request`, `409 Conflict`.

- `PUT /api/Employees/{id}`
  - Update an existing employee.
  - Expected responses: `204 No Content`, `400 Bad Request`, `404 Not Found`, `409 Conflict`.

- `DELETE /api/Employees/{id}`
  - Delete an employee.
  - Expected responses: `204 No Content`, `404 Not Found`.

## How to Test
1. Start SQL Server.
2. Start the backend:
   ```bash
   cd backend
   dotnet run
   ```
3. Open Swagger at `http://localhost:5027/swagger`.
4. Test login with the admin credentials.
5. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```
6. Open `http://localhost:5173` in a browser.
7. Login using the test account.
8. Verify the dashboard loads.
9. Verify employee CRUD operations.
10. Verify duplicate `EmployeeCode` returns a proper error.
11. Verify the report page loads and prints.
12. Verify logout works.
13. Verify protected routes redirect unauthenticated users to `/login`.

## Challenges Encountered
- JWT secret key configuration and validation for HS256.
- Duplicate `EmployeeCode` validation in the backend.
- EF Core migration issue due to missing `ApplicationDbContext` reference in a migration designer file.
- Frontend/backend CORS configuration to allow the React app at `http://localhost:5173`.
- Connecting React frontend to the ASP.NET Core REST API using Axios and protected routes.

## Git Development History
The project is intended to be developed by feature branches and commits, such as:
- Initial project setup
- Implement employee CRUD API
- Add duplicate employee validation
- Add login authentication
- Add React frontend
- Add dashboard
- Add employee management UI
- Add report
- Add documentation
