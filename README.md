# Image

A simple image hosting server to serve `image.png` via URL.

## Accessing the Image as a URL

This repository includes a Node.js server that allows you to access `image.png` via HTTP URLs.

### Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Access the image:**
   - Open your browser and go to: `http://localhost:3000`
   - The image is available at:
     - `http://localhost:3000/image.png` (direct file access)
     - `http://localhost:3000/image` (dedicated route)

### URL Options

Once the server is running, you can access the image through:

- **Direct file URL:** `http://localhost:3000/image.png`
- **Image route:** `http://localhost:3000/image`
- **Web interface:** `http://localhost:3000` (displays the image with preview)

### Configuration

The server runs on port 3000 by default. You can change this by setting the `PORT` environment variable:

```bash
PORT=8080 npm start
```

### Using the Image URL in Your Application

You can now reference the image in your HTML, markdown, or applications:

```html
<img src="http://localhost:3000/image.png" alt="Image">
```

```markdown
![Image](http://localhost:3000/image.png)
```

### Deployment

To make the image accessible via a public URL, you can deploy this server to:
- Heroku
- Vercel
- Netlify
- AWS
- Any Node.js hosting platform

After deployment, replace `localhost:3000` with your deployed URL.