import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter()  });

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

