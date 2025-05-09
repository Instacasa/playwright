export const camelToSnake = (camel: string, upper?: boolean): string => {
  const snake = camel
    .replace(/[A-Z]/g, '_$&')
    .toLocaleLowerCase()
    .replaceAll(/__+/g, '_')
    .replace(/^_+/, '');
  return upper ? snake.toLocaleUpperCase() : snake;
};