export const getProps = (props: string | undefined): string | undefined => {
  if (!props) {
    return;
  }

  const result = props
    .replace(/:\s*'([^']*)'/g, ': "$1"')
    .replace(/'([^']*)'/g, '"$1"')
    .replace(/(\w+):/g, '"$1":');

  return `const props = ${result};`;
};
