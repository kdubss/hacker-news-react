import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './SearchBar';
import renderer from 'react-test-renderer';

describe('SearchBar component has a valid snapshot.', () => {

    it('SearchBar component renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(<SearchBar />, div);
        ReactDOM.unmountComponentAtNode(div);
    });


    test('SearchBar has a valid snapshot', () => {
        const component = renderer.create(
            <SearchBar></SearchBar>
        );
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
    });
});
