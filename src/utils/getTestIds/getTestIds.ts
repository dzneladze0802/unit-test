export const getTestIds = (componentContent: string): string => {
  const testIds = componentContent?.match(/data-testid="[^"]+"/g);
  const obj = testIds?.map((elem) => {
    const testidValue = elem.split("=")[1].replace(/^"|"$/g, "");
    const testIdKey = testidValue.replace(/-([a-z])/g, (_match, p1) =>
      p1.toUpperCase()
    );
    return { key: testIdKey, value: testidValue };
  });

  const topPart = obj?.reduce((prev, { key, value }) => {
    const item = `const ${key} = screen.getByTestId("${value}");`;

    return `${prev} ${item}\n`;
  }, "");

  const bottomPart = obj?.reduce((prev, { key }) => {
    const item = `expect(${key}).toBeInTheDocument();`;

    return `${prev} ${item}\n`;
  }, "");

  return `${topPart}\n${bottomPart}`;
};
