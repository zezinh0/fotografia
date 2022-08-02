import fs from 'fs';

const filenames = fs.readdirSync(
  'C:/Users/José Costa/Documents/gallery/frontend/public/images'
);

const images = [];
var count = 1;
filenames.map((filename) => {
  const image = {
    _id: count,
    imageSrc: '/images/' + filename,
    price: 5,
  };
  images.push(image);
  count = count + 1;
});

images.map((image2) => {
  console.log(image2);
});
