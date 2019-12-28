import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import renderer from 'react-test-renderer';

describe('Button component tests.', () => {
    it('Button component renders succesfully without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(<Button />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('Button component has a valid snapshot: ', () => {
        const component = renderer.create(
            <Button>Show Next</Button>
        );
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
    })
})


