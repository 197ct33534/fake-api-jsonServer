const faker = require('faker');

const fs = require('fs');
faker.locale = 'vi';
const randomCategory = (n) => {
  if (n <= 0) return [];
  const categoryList = [];

  Array.from(new Array(n)).forEach(() => {
    const categoryItem = {
      id: faker.random.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    categoryList.push(categoryItem);
  });
  return categoryList;
};
const randomProductList = (categoryList, numberOfProducts) => {
  if (numberOfProducts <= 0) return [];
  // random data
  const productList = [];
  for (const category of categoryList) {
    Array.from(new Array(numberOfProducts)).forEach(() => {
      const product = {
        categoryId: category.id,
        id: faker.random.uuid(),
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        price: Number.parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        thumbnailUrl: faker.image.imageUrl(400, 400),
      };
      productList.push(product);
    });
  }
  return productList;
};

(() => {
  const catelogy = randomCategory(4);
  const product = randomProductList(catelogy, 10);
  const db = {
    categories: catelogy,
    products: product,
  };
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('random data successfully =))');
  });
})();
