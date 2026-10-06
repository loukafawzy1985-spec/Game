const fs = require('fs');

let content = fs.readFileSync('generate_game.cjs', 'utf8');

// Let's inspect where default questions and question handlers are
console.log('File size:', content.length);
