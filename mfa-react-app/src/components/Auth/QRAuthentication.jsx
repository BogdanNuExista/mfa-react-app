import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { generateQRCode, verifyToken } from '../../services/qrAuthService';
import { useAuth } from '../../contexts/AuthContext';
import './QRAuthentication.css';

const QRAuthentication = () => {
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [secret, setSecret] = useState('');
    const [manualEntryKey, setManualEntryKey] = useState('');
    const [token, setToken] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [verificationError, setVerificationError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const { currentUser, completeMfaVerification } = useAuth();

    // This ensures we generate a fresh QR code every time the component mounts
    useEffect(() => {
        if (currentUser) {
            setIsLoading(true);
            setQrCodeUrl(''); // Clear any existing QR code
            setSecret('');
            setManualEntryKey('');
            
            // Generate new QR code
            generateQRCode(currentUser.email)
                .then((data) => {
                    setSecret(data.secret); // This will be the user's email
                    setQrCodeUrl(data.qrCodeUrl);
                    setManualEntryKey(data.manualEntryKey);
                    console.log("QR code generated successfully");
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error generating QR code:", error);
                    setVerificationError("Error generating QR code. Please try again.");
                    setIsLoading(false);
                });
        }
    }, [currentUser]);

    const handleVerify = () => {
        setVerificationError('');
        setIsLoading(true);
        
        try {
            if (!token.trim()) {
                setVerificationError('Please enter the verification code');
                setIsLoading(false);
                return;
            }
            
            if (!secret) {
                setVerificationError('Security setup incomplete. Please refresh the page.');
                setIsLoading(false);
                return;
            }
            
            // Use the user's email as the secret reference
            const isValid = verifyToken(secret, token);
            
            if (isValid) {
                setIsVerified(true);
                completeMfaVerification(); // Set MFA verification status
                console.log("Verification successful!");
                setTimeout(() => {
                    history.push('/dashboard');
                }, 1000);
            } else {
                console.log("Verification failed");
                setVerificationError('Verification failed. Please check the code and try again.');
            }
        } catch (error) {
            console.error('Verification error:', error);
            setVerificationError('An error occurred during verification. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!currentUser) {
        return <div>Please login first</div>;
    }

    return (
        <div className="qr-auth-container">
            <h2>Two-Factor Authentication</h2>
            <div className="instructions">
                <h3>Setup Instructions:</h3>
                <ol>
                    <li>Open Microsoft Authenticator app on your phone</li>
                    <li>Tap + to add an account</li>
                    <li>Select "Other account (Google, Facebook, etc.)"</li>
                    <li>Scan the QR code below</li>
                    <li>Enter the 6-digit code shown in the app</li>
                </ol>
            </div>
            
            {isLoading ? (
                <div className="loading-spinner"></div>
            ) : (
                <>
                    {qrCodeUrl && (
                        <div className="qr-code-container">
                            <img src={qrCodeUrl} alt="QR Code" className="qr-code" />
                        </div>
                    )}
                    
                    {manualEntryKey && (
                        <div className="manual-entry">
                            <h4>If you can't scan the QR code:</h4>
                            <p>Open Microsoft Authenticator, add an account manually, and enter:</p>
                            <p>Account name: <strong>MFA-React-App:{currentUser.email}</strong></p>
                            <p>Key: <strong>{manualEntryKey}</strong></p>
                        </div>
                    )}
                </>
            )}
            
            <div className="verification-input">
                <input
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Enter 6-digit code from Authenticator app"
                    maxLength="6"
                />
                <button onClick={handleVerify} disabled={isLoading}>
                    {isLoading ? 'Verifying...' : 'Verify'}
                </button>
            </div>
            {verificationError && <p className="error-message">{verificationError}</p>}
            {isVerified && <p className="success-message">Verification successful! Redirecting to dashboard...</p>}
        </div>
    );
};

export default QRAuthentication;