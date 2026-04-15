const fs = require('fs');
const path = require('path');

const categories = [
  {
    name: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=400&q=80', // smartwatch
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80', // headphones
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80', // phone
    ],
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' // Using safe test video as stock placeholder
  },
  {
    name: 'Fashion',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80', 
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1550616110-38827798cece?auto=format&fit=crop&w=400&q=80'
    ],
    video: 'https://www.w3schools.com/html/mov_bbb.mp4' 
  },
  {
    name: 'Home',
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=400&q=80'
    ],
    video: 'https://media.w3.org/2010/05/sintel/trailer.mp4'
  },
  {
    name: 'Beauty',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=400&q=80'
    ],
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
  }
];

const adjectives = ['Premium', 'Luxury', 'Modern', 'Sleek', 'Ultra', 'Essential', 'Smart', 'Classic', 'Vibrant', 'Minimalist'];
const products = [];
let idCounter = 1;

for (let i = 0; i < 120; i++) {
  const cat = categories[Math.floor(Math.random() * categories.length)];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const img = cat.images[Math.floor(Math.random() * cat.images.length)];
  
  products.push({
    id: `prod_${idCounter++}`,
    name: `${adj} ${cat.name} Item ${idCounter}`,
    description: `Experience the best of ${cat.name.toLowerCase()} with this stunning ${adj.toLowerCase()} product.`,
    price: parseFloat((Math.random() * 400 + 10).toFixed(2)),
    category: cat.name,
    image: img,
    video: cat.video
  });
}

const fileContent = `export const products = ${JSON.stringify(products, null, 2)};`;

fs.writeFileSync(path.join(__dirname, 'products.js'), fileContent);
console.log('Successfully generated 120 products.');
