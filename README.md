# Votezy – Digital Online Voting Application

Votezy is a **Digital Online Voting Application** developed using **Spring Boot and React.js**. The application provides a simple, secure, and user-friendly platform for voter registration, candidate management, online voting, duplicate-vote prevention, and election result tracking.

The project demonstrates a full-stack implementation with a **RESTful Spring Boot backend** and a **React.js frontend**.

---

## 🚀 Features

### 👤 Voter Management

* Register new voters
* View registered voters
* Delete voter records
* Validate voter information
* Prevent duplicate voter registration

### 🗳️ Online Voting

* Cast votes digitally
* Prevent duplicate voting
* Validate voter and candidate details
* Automatically update candidate vote counts
* Maintain vote records

### 👨‍💼 Candidate Management

* Add candidates
* View candidate list
* Update candidate information
* Delete candidates
* Track candidate vote counts

### 📊 Election Results

* Display election results
* Calculate candidate rankings based on vote count
* Display total votes received by candidates
* Keep results synchronized with voting data

### 🔐 Validation & Exception Handling

* Request validation using Jakarta Bean Validation
* Centralized exception handling
* Custom exceptions for application-specific errors
* Meaningful API error responses

### 🌐 REST APIs

* RESTful API architecture
* JSON-based request and response
* Separate DTOs for API communication
* Clean controller-service-repository architecture

---

## 🛠️ Tech Stack

### Backend

* Java 17
* Spring Boot
* Spring Web
* Spring Data JPA
* Hibernate
* MySQL
* Maven
* RESTful APIs
* Jakarta Bean Validation

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Axios
* Vite

### Tools

* IntelliJ IDEA / Spring Tool Suite
* Visual Studio Code
* Postman
* Git
* GitHub
* MySQL Workbench

---

## 🏗️ Project Architecture

```text
                 ┌──────────────────────┐
                 │      React.js        │
                 │      Frontend        │
                 └──────────┬───────────┘
                            │
                       REST API / JSON
                            │
                            ▼
                 ┌──────────────────────┐
                 │    Spring Boot       │
                 │      Backend         │
                 └──────────┬───────────┘
                            │
             ┌──────────────┼──────────────┐
             │              │              │
             ▼              ▼              ▼
        Controller       Service       Repository
             │              │              │
             └──────────────┼──────────────┘
                            │
                            ▼
                     ┌─────────────┐
                     │    MySQL    │
                     │  Database   │
                     └─────────────┘
```

---

## 📁 Project Structure

```text
Spring_Boot-Application/
│
├── VOTEZY/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/
│   │   │   │       └── votezy/
│   │   │   │           ├── controller/
│   │   │   │           │   ├── CandidateController.java
│   │   │   │           │   ├── ElectionResultController.java
│   │   │   │           │   ├── VoterCotroller.java
│   │   │   │           │   └── VotingController.java
│   │   │   │           │
│   │   │   │           ├── dto/
│   │   │   │           │   ├── ElectionResultRequestDTO.java
│   │   │   │           │   ├── ElectionResultResponseDTO.java
│   │   │   │           │   ├── VoteRequestDTO.java
│   │   │   │           │   └── VoteResponseDTO.java
│   │   │   │           │
│   │   │   │           ├── entity/
│   │   │   │           │   ├── Candidate.java
│   │   │   │           │   ├── ElectionResult.java
│   │   │   │           │   ├── Vote.java
│   │   │   │           │   └── Voter.java
│   │   │   │           │
│   │   │   │           ├── repository/
│   │   │   │           ├── service/
│   │   │   │           └── exception/
│   │   │   │               ├── DuplicateResourceException.java
│   │   │   │               ├── ResourceNotFoundException.java
│   │   │   │               ├── VoteNotAllowedException.java
│   │   │   │               ├── ErrorResponse.java
│   │   │   │               └── GlobalExceptionHandler.java
│   │   │   │
│   │   │   └── resources/
│   │   │
│   │   └── test/
│   │
│   └── pom.xml
│
└── votezy-frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Candidates.jsx
    │   │   ├── Home.jsx
    │   │   ├── Results.jsx
    │   │   ├── Vote.jsx
    │   │   └── Voters.jsx
    │   │
    │   └── services/
    │       └── api.js
    │
    ├── package.json
    └── vite.config.js
```

---

## 🔄 Application Workflow

```text
User
 │
 ▼
React.js Frontend
 │
 ▼
REST API
 │
 ▼
Spring Boot Controller
 │
 ▼
Service Layer
 │
 ├── Validate Request
 ├── Check Voter
 ├── Check Candidate
 └── Prevent Duplicate Vote
 │
 ▼
Repository Layer
 │
 ▼
MySQL Database
 │
 ▼
Updated Vote Count
 │
 ▼
Election Results
```

---

## 🗳️ Voting Flow

1. Voter registers in the system.
2. Candidate information is maintained by the application.
3. Voter selects a candidate.
4. The backend validates the voter and candidate.
5. The system checks whether the voter has already voted.
6. If the voter has already voted, the request is rejected.
7. If the voter has not voted:

   * A new vote record is created.
   * Candidate vote count is increased.
8. Updated election results can then be displayed.

---

## 🔌 API Endpoints

### Voter APIs

| Method | Endpoint           | Description      |
| ------ | ------------------ | ---------------- |
| GET    | `/api/voters`      | Get all voters   |
| POST   | `/api/voters`      | Register a voter |
| DELETE | `/api/voters/{id}` | Delete a voter   |

### Candidate APIs

| Method | Endpoint               | Description        |
| ------ | ---------------------- | ------------------ |
| GET    | `/api/candidates`      | Get all candidates |
| POST   | `/api/candidates`      | Add candidate      |
| PUT    | `/api/candidates/{id}` | Update candidate   |
| DELETE | `/api/candidates/{id}` | Delete candidate   |

### Voting APIs

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| POST   | `/api/votes/cast` | Cast a vote      |
| GET    | `/api/votes`      | Get vote records |

### Election Result APIs

| Method | Endpoint       | Description          |
| ------ | -------------- | -------------------- |
| GET    | `/api/results` | Get election results |

> Endpoint paths may vary depending on the current controller configuration.

---

## 🗄️ Database Design

The application uses MySQL for persistent data storage.

Main entities include:

```text
Voter
  │
  │
  └──────── Vote ──────── Candidate
                              │
                              │
                         Vote Count
```

### Main Tables

* `voter`
* `candidate`
* `vote`
* `election_result`

---

## ⚙️ Backend Setup

### 1. Clone the Repository

```bash
git clone https://github.com/dipak-nilewar/Votezy-Digital-Online-Voting-Application.git
```

### 2. Navigate to Backend

```bash
cd Votezy-Digital-Online-Voting-Application/VOTEZY
```

### 3. Configure MySQL

Create a database:

```sql
CREATE DATABASE votezy;
```

Update the database configuration in:

```text
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/votezy
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

**Do not commit real database passwords, API keys, JWT secrets, or other sensitive credentials to GitHub.**

### 4. Run the Backend

Using Maven:

```bash
mvn spring-boot:run
```

Or using the Maven wrapper on Windows:

```bash
.\mvnw.cmd spring-boot:run
```

Backend will run on the configured Spring Boot port.

---

## 💻 Frontend Setup

### 1. Navigate to Frontend

```bash
cd votezy-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start React Application

```bash
npm run dev
```

The Vite development server will display the local frontend URL in the terminal.

---

## 🧪 Testing

The backend APIs can be tested using **Postman**.

Typical testing flow:

```text
1. Create Voter
       ↓
2. Create Candidate
       ↓
3. Cast Vote
       ↓
4. Try Duplicate Vote
       ↓
5. Verify Duplicate Vote Rejected
       ↓
6. Check Candidate Vote Count
       ↓
7. Check Election Results
```

---

## 🧠 Key Backend Concepts Demonstrated

This project demonstrates practical usage of:

* Object-Oriented Programming
* Spring Boot
* Dependency Injection
* REST API development
* Spring Data JPA
* Hibernate ORM
* Entity relationships
* DTO pattern
* Repository pattern
* Service layer architecture
* Request validation
* Exception handling
* Transaction management
* MySQL database integration
* Frontend-backend integration
* JSON request/response handling
* Git and GitHub

---

## 🔒 Data Integrity

Vote processing is designed to maintain consistency between:

```text
Voter
   ↓
Vote
   ↓
Candidate
   ↓
Vote Count
```

The application checks voting conditions before creating a vote and updates the candidate's vote count when a valid vote is recorded.

---

## 📸 Screenshots

Add screenshots of your application here.

Recommended screenshots:

### Home Page

```text
Add Home Page Screenshot
```

### Voter Management

```text
Add Voter Management Screenshot
```

### Candidate Management

```text
Add Candidate Management Screenshot
```

### Voting Page

```text
Add Voting Page Screenshot
```

### Election Results

```text
Add Results Page Screenshot
```

---

## 🔮 Future Enhancements

Possible improvements for future versions:

* JWT-based authentication
* Role-based access control
* Admin dashboard
* Election start and end dates
* Email/OTP verification
* Candidate profile management
* Advanced election analytics
* Docker containerization
* Cloud deployment
* Automated unit and integration testing
* CI/CD pipeline
* API documentation with Swagger/OpenAPI

---

## 👨‍💻 Developer

**Dipak Nilewar**

Java Full Stack / Backend Developer

* GitHub: [GitHub Profile](https://github.com/dipak-nilewar)
* LinkedIn: [LinkedIn Profile](https://www.linkedin.com/in/dipaknilewar8/)

---

## 📄 License

This project is developed for **learning, demonstration, and portfolio purposes**.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

**Votezy – Making digital voting simple, organized, and accessible.**
