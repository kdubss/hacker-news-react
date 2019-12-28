const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';
const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '50';

const url = PATH_BASE + PATH_SEARCH + '?' + PARAM_SEARCH + DEFAULT_QUERY + '&' + PARAM_PAGE + 0 + '&\
' + PARAM_HPP + DEFAULT_HPP;

const promise = new Promise((resolve, reject) => {
  resolve(fetch(url)), reject(err => console.error(err));
});

promise
  .then(res => console.log(res))
  .catch(err => console.error(err));