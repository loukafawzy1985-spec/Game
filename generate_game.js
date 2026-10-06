const fs = require('fs');

const boardB64 = fs.readFileSync('board.png').toString('base64');
const titleB64 = fs.readFileSync('title.png').toString('base64');
const avatarB64 = fs.readFileSync('avatar.png').toString('base64');

const boardDataUri = `data:image/png;base64,${boardB64}`;
const titleDataUri = `data:image/png;base64,${titleB64}`;
const avatarDataUri = `data:image/png;base64,${avatarB64}`;

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Snakes and Ladder</title>
  <meta name="description" content="Educational snakes and ladders board game with custom questions, trophies, and 3D dice." />
  <meta property="og:title" content="Snakes and Ladder" />
  <meta property="og:description" content="Educational snakes and ladders board game with custom questions, trophies, and 3D dice." />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <style>
    /* CSS will be injected here */
  </style>
</head>
<body>
  <!-- Body will be injected here -->
  <script>
    /* Script will be injected here */
  </script>
</body>
</html>`;

console.log("Template test ok");
