import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

// Configure multer for secure file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp and random string
    const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(8).toString('hex');
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Define allowed file types
  const allowedMimeTypes = {
    'image/jpeg': true,
    'image/jpg': true,
    'image/png': true,
    'image/gif': true,
    'image/webp': true,
    'application/pdf': true,
    'application/msword': true,
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': true,
    'application/vnd.ms-excel': true,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': true,
    'text/plain': true
  };

  // Check if file type is allowed
  if (allowedMimeTypes[file.mimetype]) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images, PDFs, and documents are allowed.'), false);
  }
};

// Configure multer with security options
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 5, // Maximum 5 files per request
    fieldSize: 2 * 1024 * 1024 // 2MB field size limit
  }
});

// Single file upload middleware
export const uploadSingle = upload.single('file');

// Multiple files upload middleware
export const uploadMultiple = upload.array('files', 5);

// Profile image upload middleware (single image)
export const uploadProfileImage = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedImageTypes = {
      'image/jpeg': true,
      'image/jpg': true,
      'image/png': true,
      'image/gif': true,
      'image/webp': true
    };

    if (allowedImageTypes[file.mimetype]) {
      cb(null, true);
    } else {
      cb(new Error('Invalid image type. Only JPEG, PNG, GIF, and WebP are allowed.'), false);
    }
  },
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit for profile images
    files: 1
  }
}).single('profileImage');

// Gig images upload middleware (multiple images)
export const uploadGigImages = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedImageTypes = {
      'image/jpeg': true,
      'image/jpg': true,
      'image/png': true,
      'image/gif': true,
      'image/webp': true
    };

    if (allowedImageTypes[file.mimetype]) {
      cb(null, true);
    } else {
      cb(new Error('Invalid image type. Only JPEG, PNG, GIF, and WebP are allowed.'), false);
    }
  },
  limits: {
    fileSize: 3 * 1024 * 1024, // 3MB limit per image
    files: 5 // Maximum 5 images per gig
  }
}).array('gigImages', 5);

// Resume upload middleware
export const uploadResume = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedDocTypes = {
      'application/pdf': true,
      'application/msword': true,
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': true,
      'text/plain': true
    };

    if (allowedDocTypes[file.mimetype]) {
      cb(null, true);
    } else {
      cb(new Error('Invalid document type. Only PDF, DOC, DOCX, and TXT files are allowed.'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit for resumes
    files: 1
  }
}).single('resume');

// Error handling middleware for multer
export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        error: 'File too large. Maximum size is 5MB.' 
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ 
        error: 'Too many files. Maximum 5 files allowed.' 
      });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ 
        error: 'Unexpected file field.' 
      });
    }
    return res.status(400).json({ 
      error: 'File upload error: ' + err.message 
    });
  }
  
  if (err.message.includes('Invalid file type')) {
    return res.status(400).json({ 
      error: err.message 
    });
  }
  
  next(err);
};

// Clean up uploaded files on error
export const cleanupUploads = (req, res, next) => {
  // Store file paths for cleanup
  req.uploadedFiles = [];
  
  // Add cleanup function to response
  res.on('finish', () => {
    if (res.statusCode >= 400 && req.uploadedFiles.length > 0) {
      // Clean up uploaded files on error
      req.uploadedFiles.forEach(filePath => {
        try {
          require('fs').unlinkSync(filePath);
        } catch (error) {
          console.error('Error cleaning up file:', error);
        }
      });
    }
  });
  
  next();
};

// Validate file content (basic check)
export const validateFileContent = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  // Read first few bytes to check file signature
  const fs = require('fs');
  const filePath = req.file.path;
  
  try {
    const buffer = fs.readFileSync(filePath);
    const fileSignature = buffer.toString('hex', 0, 4);
    
    // Check for common file signatures
    const signatures = {
      'ffd8ffe0': 'image/jpeg',
      'ffd8ffe1': 'image/jpeg',
      '89504e47': 'image/png',
      '47494638': 'image/gif',
      '52494646': 'image/webp',
      '25504446': 'application/pdf'
    };
    
    if (signatures[fileSignature] && signatures[fileSignature] !== req.file.mimetype) {
      // MIME type mismatch - potential security risk
      fs.unlinkSync(filePath);
      return res.status(400).json({ 
        error: 'File content does not match declared type.' 
      });
    }
    
    // Store file path for potential cleanup
    req.uploadedFiles.push(filePath);
    
  } catch (error) {
    console.error('Error validating file content:', error);
  }
  
  next();
}; 