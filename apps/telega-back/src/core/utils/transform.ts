export const toCamel = (e) => {
  return e.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
};

export const toCamelObj = <T extends object>(data: object) =>
  Object.keys(data).reduce((newObj, key) => {
    const value = data[key];
    const camelKey = toCamel(key);
    console.log({ camelKey });
    if (['message', 'update', 'from', 'chat'].includes(camelKey)) {
      console.log(value.constructor.name, ' is Object\n');
      return { ...newObj, [camelKey]: toCamelObj(value) };
    }
    return { ...newObj, [camelKey]: value };
  }, {} as T);
