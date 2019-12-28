import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import renderer from 'react-test-renderer';

describe('Home component snapshot test', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<Home />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('Home component has a valid snapshot.', () => {
    const component = renderer.create(
        <Home />
      );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});

