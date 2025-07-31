import { generateSelfSignedCertificates } from '../config/https.js';
import fs from 'fs';
import path from 'path';

console.log('🔐 Generating SSL certificates for development...');

// Create SSL directory if it doesn't exist
const sslDir = path.join(process.cwd(), 'ssl');
if (!fs.existsSync(sslDir)) {
  fs.mkdirSync(sslDir, { recursive: true });
  console.log('📁 Created SSL directory');
}

// Generate certificates
const success = generateSelfSignedCertificates();

if (success) {
  console.log('✅ SSL certificates generated successfully!');
  console.log('📁 Certificates saved in:', sslDir);
  console.log('🔒 You can now run the server with HTTPS support');
  console.log('⚠️  Note: These are self-signed certificates for development only');
  console.log('🚀 For production, use proper SSL certificates from a CA');
} else {
  console.log('❌ Failed to generate SSL certificates');
  console.log('💡 Make sure OpenSSL is installed on your system');
  console.log('🔗 Download OpenSSL from: https://www.openssl.org/');
} 