// test-dns.js
console.log('Starting Node.js network test...');
const url = 'https://template.tiptap.dev/r/index.json';

fetch(url)
  .then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    console.log('Success! Received a response from the server.');
    return res.json();
  })
  .then(data => {
    console.log('Successfully parsed JSON data.');
    // console.log(data); // Uncomment to see the data
  })
  .catch(e => {
    console.error('Test Failed! An error occurred:');
    console.error(e);
  });
