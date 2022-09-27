import cupcake from 'assets/images/cupcake.png';
import bake from 'assets/images/bake.png';
import book from 'assets/images/book.png';

export const NAV_ITEMS = [
  {
    title: 'Products',
    path: '/',
    imgSrc: cupcake,
    description: 'Have a look at our delicious products!'
  },
  {
    title: 'Cake Class',
    path: '/about',
    imgSrc: bake,
    description: 'Learn to bake fabolous cakes!'
  },
  {
    title: 'Recepie Book',
    path: '/whatever',
    imgSrc: book,
    description: 'Download recepies to save them for later!'
  }
];
