// Does a somewhat hacky thing to make serving media files work
// I used AI for this file, can't be bothered to learn express.js
import express from 'express';
import path from 'node:path';
import { handler } from './build/handler.js';

const UPLOADS = path.resolve(process.env.UPLOADS_PATH);

const app = express();

// Serve uploads
app.use('/uploads', express.static(UPLOADS));

// Let SvelteKit handle all other routes
app.use(handler);

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});