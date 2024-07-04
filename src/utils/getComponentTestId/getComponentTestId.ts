export const getComponentTestId = (componentName: string): string =>
  componentName.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
