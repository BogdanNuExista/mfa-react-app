import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import QRAuthentication from './components/Auth/QRAuthentication';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app-container">
                    <Header />
                    <main className="main-content">
                        <Switch>
                            <Route path="/" exact component={Login} />
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <ProtectedRoute path="/qr-auth" component={QRAuthentication} />
                            <ProtectedRoute path="/dashboard" component={Dashboard} requireMfa={true} />
                        </Switch>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;