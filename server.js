const express = require('express');
const path = require('path');
const fs = require('fs');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// Validate that the image file exists
const imagePath = path.join(__dirname, 'image.png');
if (!fs.existsSync(imagePath)) {
  console.error('Error: image.png not found in the current directory');
  process.exit(1);
}

// Rate limiting middleware to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all routes
app.use(limiter);

// Serve the image at the /image.png route
app.get('/image.png', (req, res) => {
  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).send('Error serving image');
    }
  });
});

// Serve the image at the /image route
app.get('/image', (req, res) => {
  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).send('Error serving image');
    }
  });
});

// Home route with information
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Image Server</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
          }
          h1 {
            color: #333;
          }
          .info {
            background: #f4f4f4;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
          }
          img {
            max-width: 100%;
            height: auto;
            border: 1px solid #ddd;
            border-radius: 5px;
            margin: 20px 0;
          }
          code {
            background: #e8e8e8;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
          }
        </style>
      </head>
      <body>
        <h1>Image Server</h1>
        <div class="info">
          <h2>Access the image via URL:</h2>
          <ul>
            <li><strong>Direct image URL:</strong> <code>http://localhost:${PORT}/image.png</code></li>
            <li><strong>Alternative route:</strong> <code>http://localhost:${PORT}/image</code></li>
          </ul>
        </div>
        <h2>Preview:</h2>
        <img src="/image.png" alt="Image Preview">
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Access the image at: http://localhost:${PORT}/image.png`);
  console.log(`Or use the route: http://localhost:${PORT}/image`);
});
