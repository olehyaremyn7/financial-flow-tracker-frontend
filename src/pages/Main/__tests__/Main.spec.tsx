import { describe, it, render } from '../../../tests/utils';
import Main from '../index';

describe('<Main />', (): void => {
  it('Main should be in the document', (): void => {
    const { container } = render(<Main />);

    expect(container).toBeInTheDocument();
  });
});
