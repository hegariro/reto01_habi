const initValue = (key) => (JSON.parse(localStorage.getItem(key)));
const map2array = (data) => (!!data && Object.values(Object.fromEntries(data.entries())));
const map2obj = (data) => (!!data && Object.fromEntries(data.entries()));
const array2map = (data, label) => {
  const res = new Map();
  if (Array.isArray(data) && !!data.length) {
    data.map(item => res.set(item[label], item));
  }
  return res;
};
const getLinks = ({ first, prev, next, last }, { links }) => {
  links.shift();
  links.pop();
  links.unshift(
    { url: first, label: 'first', active: false, disabled: !first },
    { url: prev, label: 'previous', active: false, disabled: !prev }
  );
  links.push(
    { url: next, label: 'next', active: false, disabled: !next },
    { url: last, label: 'last', active: false, disabled: !last }
  );
  return links;
};

export { initValue, map2obj, map2array, array2map, getLinks };