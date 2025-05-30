# MFA React App

This project is a multi-factor authentication (MFA) web application built using React. It utilizes Firebase Authentication for the first factor of authentication and a QR code generated for the second factor, which can be scanned using the Microsoft Authenticator app.

## Features

- User authentication using Firebase Auth
- Multi-factor authentication with QR code verification
- Protected routes for authenticated users
- User dashboard displaying user-specific information

## Project Structure

```
mfa-react-app
├── public
│   └── index.html
├── src
│   ├── components
│   │   ├── Auth
│   │   │   ├── Login.jsx
│   │   │   ├── QRAuthentication.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── Dashboard
│   │   │   └── Dashboard.jsx
│   │   └── Layout
│   │       ├── Header.jsx
│   │       └── Footer.jsx
│   ├── contexts
│   │   └── AuthContext.jsx
│   ├── services
│   │   ├── firebaseConfig.js
│   │   └── qrAuthService.js
│   ├── utils
│   │   └── helpers.js
│   ├── App.jsx
│   └── index.js
├── .env
├── .gitignore
├── firebase.json
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)
- Firebase account

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/mfa-react-app.git
   ```

2. Navigate to the project directory:
   ```
   cd mfa-react-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Set up Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Firebase Authentication and configure the sign-in methods you want to use.
   - Obtain your Firebase configuration and add it to the `.env` file.

### Running the Application

To start the development server, run:
```
npm start
```

The application will be available at `http://localhost:3000`.

### Usage

1. Users can log in using their email and password through the Firebase Authentication system.
2. After successful login, users will be prompted to scan a QR code using the Microsoft Authenticator app for the second factor of authentication.
3. Once authenticated, users will be redirected to the dashboard.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

### License

This project is licensed under the MIT License. See the LICENSE file for details.