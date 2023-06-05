import { describe, it, render } from '../../../tests/utils';
import Title from '../index';

describe('<Title />', (): void => {
  it('Title should be in the document', (): void => {
    const { container } = render(<Title text="Test title" />);

    expect(container).toBeInTheDocument();
  });
});
