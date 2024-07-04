import { createUnitTest } from "../createUnitTest";
import { downloadFile } from "../downloadFile";

export const handleInput = (file: unknown, props?: string): void => {
  const isValid = file && file instanceof File;

  if (!isValid) {
    return;
  }

  const reader = new FileReader();

  reader.onload = (e) => {
    const componentName = file.name.split(".")[0];
    const testComponentName = `${componentName}.test.tsx`;
    const result = createUnitTest({
      isOnEvent: false,
      componentName: componentName,
      componentContent: String(e.target?.result),
      props,
    });

    downloadFile(result, testComponentName);
  };
  reader.readAsText(file);
};
