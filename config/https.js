import https from 'https';
import fs from 'fs';
import path from 'path';

// SSL Certificate configuration
export const createHTTPSOptions = () => {
  try {
    // For development, you can generate self-signed certificates
    // For production, use proper SSL certificates from a CA
    const certPath = path.join(process.cwd(), 'ssl');
    
    // Check if SSL certificates exist
    const keyPath = path.join(certPath, 'private-key.pem');
    const certPath1 = path.join(certPath, 'certificate.pem');
    
    if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
      return {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath)
      };
    } else {
      console.warn('SSL certificates not found. Using HTTP for development.');
      return null;
    }
  } catch (error) {
    console.error('Error loading SSL certificates:', error);
    return null;
  }
};

// Create HTTPS server
export const createHTTPSServer = (app, options) => {
  if (!options) {
    console.warn('HTTPS options not provided. Using HTTP server.');
    return null;
  }
  
  try {
    return https.createServer(options, app);
  } catch (error) {
    console.error('Error creating HTTPS server:', error);
    return null;
  }
};

// Generate self-signed certificates for development
export const generateSelfSignedCertificates = () => {
  const { execSync } = require('child_process');
  const certPath = path.join(process.cwd(), 'ssl');
  
  // Create SSL directory if it doesn't exist
  if (!fs.existsSync(certPath)) {
    fs.mkdirSync(certPath, { recursive: true });
  }
  
  const keyPath = path.join(certPath, 'private-key.pem');
  const certPath1 = path.join(certPath, 'certificate.pem');
  
  // Generate private key
  const keyCommand = `openssl genrsa -out "${keyPath}" 2048`;
  
  // Generate certificate
  const certCommand = `openssl req -new -x509 -key "${keyPath}" -out "${certPath}" -days 365 -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"`;
  
  try {
    execSync(keyCommand);
    execSync(certCommand);
    console.log('Self-signed certificates generated successfully.');
    return true;
  } catch (error) {
    console.error('Error generating certificates:', error);
    return false;
  }
};

// Security headers for HTTPS
export const securityHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
}; 