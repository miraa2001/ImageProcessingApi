# **Image Processing API Project**

#### A Node.js + TypeScript API for uploading, resizing, caching, and processing images, with a simple frontend for uploading, viewing, and transforming images.

## Features

1-Resize images by width and height via query params

2-Caching: Resized images are stored in assets/resized/ and reused on subsequent requests

3-Optional Black & White effect (&bw=true)

4-Upload new images through a frontend form

5-Gallery to view cached images

6-Interactive processing frontend to pick an image and resize/apply effects

## Getting Started

1. Clone the repo

<pre> bash git clone https://github.com/&lt;your-username&gt;/ImageProcessingApi.git 
 cd ImageProcessingApi </pre>

2. Install dependencies

<pre>npm install</pre>

3. Build and test the project

<pre>npm run test</pre>

4. Start the server

<pre>npm run start</pre>

## Frontend

-Upload images → [<http://localhost:3000/upload.html>]

-Gallery of cached thumbnails → [<http://localhost:3000/index.html>]

-Process image (resize + grayscale) → [<http://localhost:3000/process.html>]

## API Endpoints

### Resize Image

<pre>GET /resize?filename=<name>&width=<w>&height=<h>&bw=<true|false></pre>

`filename` → image name (without extension)

`width` / `height` → target size

`bw` (optional) → true for black & white

#### Example:

<pre>/resize?filename=test&width=200&height=200&bw=true</pre>

### Upload Image

<pre>POST /upload</pre>

### Get Gallery

<pre>GET /gallery</pre>

## Scripts

`npm run build` → Compile TypeScript

`npm run start` → Run compiled server (dist/src/.)

`npm run lint` → Run ESLint

`npm run format` → Run Prettier

`npm run test` → Build + run Jasmine tests

## Screenshots

#### Upload page: takes an image and uploads it to the assets folder

<img width="2560" height="1440" alt="image" src="https://github.com/user-attachments/assets/0320177d-5eea-469e-bc9c-3d594e936157" />

#### Process page: takes an image name and the preferred size and an optional black and white filter option and resizes the image after clicking process

#### Before processing

<img width="2560" height="1440" alt="image" src="https://github.com/user-attachments/assets/326976ee-7e98-4d31-8024-1626868fc5ee" />

#### After processing

<img width="2560" height="1440" alt="image" src="https://github.com/user-attachments/assets/5787da98-e4ee-43fd-84fc-4f440c5c163c" />

#### Cached Images Gallery

#### This page contains all of the previously cached already resized images

<img width="2560" height="1440" alt="image" src="https://github.com/user-attachments/assets/abfe903c-785b-4aab-bd4c-331549d38287" />
