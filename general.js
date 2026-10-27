
const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

function displayResult(label, response) {
  if (response.status >= 200 && response.status < 300) {
    const data = response.data;

    if (
      data == null ||
      (typeof data === 'object' && Object.keys(data).length === 0)
    ) {
      console.log(`${label}: No books found.`);
      return;
    }

    console.log(`${label}: Success`);
    console.log(JSON.stringify(data, null, 2));
  } else {
    console.error(`${label}: HTTP error ${response.status}`);
  }
}

function handleError(label, error) {
  if (error.response) {
    if (error.response.status === 404) {
      console.log(`${label}: Book or resource not found.`);
    } else {
      console.error(
        `${label}: HTTP ${error.response.status}`,
        error.response.data
      );
    }
  } else {
    console.error(`${label}: Request failed - ${error.message}`);
  }
}

async function getAllBooks(books) {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    const result = books && typeof books === 'object'
      ? { ...books, ...response.data }
      : response.data;

    displayResult('All books', {
      ...response,
      data: result
    });
  } catch (error) {
    handleError('All books', error);
  }
}

async function getBookByISBN(isbn) {
  try {
    const response = await axios.get(
      `${BASE_URL}/isbn/${encodeURIComponent(isbn)}`
    );
    displayResult('Book by ISBN', response);
  } catch (error) {
    handleError('Book by ISBN', error);
  }
}

async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(
      `${BASE_URL}/author/${encodeURIComponent(author)}`
    );
    displayResult('Books by author', response);
  } catch (error) {
    handleError('Books by author', error);
  }
}

async function getBooksByTitle(title) {
  try {
    const response = await axios.get(
      `${BASE_URL}/title/${encodeURIComponent(title)}`
    );
    displayResult('Books by title', response);
  } catch (error) {
    handleError('Books by title', error);
  }
}

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle
};
