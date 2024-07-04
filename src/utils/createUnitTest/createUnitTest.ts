import { getProps } from "../getProps";
import { getComponentTestId } from "../getComponentTestId";
import { getTestIds } from "../getTestIds";

interface IGetHeadingProps {
  isOnEvent: boolean;
  componentName: string;
  componentContent: string;
  props?: string;
}

export const createUnitTest = ({
  isOnEvent,
  componentName,
  componentContent,
  props,
}: IGetHeadingProps): string => `
import { fireEvent, screen } from '@testing-library/react';
${isOnEvent ? 'import { vi } from "vitest";' : ""}
import { renderWithProviders as render } from 'helpers';
import { ${componentName} } from './${componentName}';

${getProps(props)}

describe("${componentName}", () => {
    it("should render", () => {
    render(<${componentName} ${props ? "{...props}" : ""} />);

    const content = screen.getByTestId('${getComponentTestId(componentName)}');

    expect(content).toBeInTheDocument();
    })

    it("should render content", () => {
      ${getTestIds(componentContent)};
    })
    
    it("should match snapshot", () => {\n
    render(<${componentName} ${props ? "{...mockData }" : ""} />);

    const content = screen.getByTestId('${getComponentTestId(componentName)}');

    expect(content).toMatchSnapshot();\n
    })   
})
    `;
