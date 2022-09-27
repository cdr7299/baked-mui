import _reduce from 'lodash/reduce';

export const checkIfCartIsEmpty = (cartItems) => {
  const count = _reduce(
    cartItems,
    (acc, currItem) => {
      if (!currItem.currentCount) return acc;
      return acc + Number(currItem.currentCount);
    },
    0
  );
  return count === 0;
};

export const getCostOfItem = (currentCount, cost) => {
  console.log(currentCount, cost);
  return `$ ${Number(currentCount * cost).toFixed(2)}`;
};

export const getTotalCartValue = (cartItems) => {
  const cost = _reduce(
    cartItems,
    (acc, currItem) => {
      if (!currItem.currentCount) return acc;
      return acc + Number(currItem.currentCount * currItem.cost);
    },
    0
  );
  return `$ ${cost.toFixed(2)}`;
};

export const getTotalCartItems = (cartItems) => {
  const count = _reduce(
    cartItems,
    (acc, currItem) => {
      if (!currItem.currentCount) return acc;
      return acc + Number(currItem.currentCount);
    },
    0
  );
  return ` Total Items: ${count} `;
};
