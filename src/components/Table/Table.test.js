import React from 'react';
import ReactDOM from 'react-dom';
import Table from './Table';
import renderer from 'react-test-renderer';

describe('Table component tests; ', () => {
    const list = [
        { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
        { title: '2', author: '1', num_comments: 1, points: 2, objectID: 'y' }
    ];

    list.map(l => console.log(l));

    it('Table component should successfully render without crashing', () => {
        const div = document.createElement('div');
        const list = [
            { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
            { title: '2', author: '1', num_comments: 1, points: 2, objectID: 'y' }
        ];

        ReactDOM.render(<Table />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
})


