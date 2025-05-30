import { authenticator } from 'otplib';
import QRCode from 'qrcode';

// Store secrets in memory (for demo only - in production this would be in a database)
const secretStore = new Map();

/**
 * Clears a user's stored secret when they log out
 * @param {string} userId User identifier to clear
 */
export const clearUserSecret = (userId) => {
  if (secretStore.has(userId)) {
    secretStore.delete(userId);
    console.log(`Cleared secret for ${userId}`);
  }
};

/**
 * Generates a secret key and QR code URL for Microsoft Authenticator app
 * @param {string} userId User identifier (email or ID)
 * @returns {Object} Object containing secret and QR code data URL
 */
export const generateQRCode = async (userId) => {
  try {
    // Generate a new secret
    const secret = authenticator.generateSecret();
    
    // Clear any existing secret first
    clearUserSecret(userId);
    
    // Store the new secret
    secretStore.set(userId, secret);
    
    // For debugging only - would remove in production
    console.log(`Secret for ${userId}: ${secret}`);
    
    // Create a properly formatted otpauth URL specifically for Microsoft Authenticator
    // Format: otpauth://totp/[issuer]:[account]?secret=[secret]&issuer=[issuer]
    const encodedUserId = encodeURIComponent(userId);
    const issuer = encodeURIComponent('MFA-React-App');
    const otpAuthUrl = `otpauth://totp/${issuer}:${encodedUserId}?secret=${secret}&issuer=${issuer}&algorithm=SHA1&digits=6&period=30`;
    
    console.log("Generated otpauth URL:", otpAuthUrl);
    
    // Generate QR code with the otpauth URL that Microsoft Authenticator can scan
    const qrCodeUrl = await QRCode.toDataURL(otpAuthUrl, {
      errorCorrectionLevel: 'H',
      margin: 1,
      scale: 8
    });
    
    return {
      secret: userId, // Return userId as a reference
      qrCodeUrl,
      manualEntryKey: secret // Provide this for manual entry if QR scan fails
    };
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw error;
  }
};

/**
 * Verifies a token against a stored secret
 * @param {string} userId The user ID used as reference
 * @param {string} token Token provided by the user
 * @returns {boolean} Whether verification succeeded
 */
export const verifyToken = (userId, token) => {
  try {
    const cleanToken = String(token).replace(/\s+/g, '');
    const secret = secretStore.get(userId);
    
    if (!secret) {
      console.error("No secret found for user");
      return false;
    }
    
    // Reset authenticator options to defaults before each verification
    authenticator.resetOptions();
    
    // Configure for better compatibility with Microsoft Authenticator
    authenticator.options = {
      window: 2, // 2 periods before/after for better clock drift tolerance
      digits: 6,  // 6-digit codes
      algorithm: 'sha1' // SHA1 algorithm
    };
    
    // Verify token
    const isValid = authenticator.verify({ 
      token: cleanToken, 
      secret: secret 
    });
    
    if (isValid) {
      console.log("TOTP verification successful!");
      return true;
    }
    
    console.log("Verification failed");
    return false;
  } catch (error) {
    console.error("Verification error:", error);
    return false;
  }
};

// Legacy function to maintain compatibility
export const verifyQRCode = (secret, token) => {
  return verifyToken(secret, token);
};