import React from 'react';

import Button from './Button';

const isSearched = searchTerm => {
  return item => {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  };
};

const Table = ({ list, pattern, onDismiss }) =>
  <div className="table">
    { list.filter(isSearched(pattern)).map(item =>
      <div key={ item.objectID } className="table-row">
        <span>
          <a href={ item.url }>{ item.title }</a>
        </span>
        <span>{ item.author }</span>
        <span>{ item.num_comments }</span>
        <span>{ item.points }</span>
        <Button
          className="button-inline"
          onClick={ () => onDismiss(item.objectID) }
        >
          Dismiss
        </Button>
      </div>
    )}
  </div>

export default Table;