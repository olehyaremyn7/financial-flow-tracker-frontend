import App from './App';
import { describe, it, render } from './tests/utils';

describe('<App />', (): void => {
  it('App should be in the document', (): void => {
    const { container } = render(<App />);

    expect(container).toBeInTheDocument();
  });
});
