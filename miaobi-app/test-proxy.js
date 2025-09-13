// test-proxy.js
import { HttpsProxyAgent } from 'https-proxy-agent';

console.log('Starting Node.js network test THROUGH PROXY...');
const url = 'https://template.tiptap.dev/r/index.json';
const proxyUrl = 'http://127.0.0.1:7899';

const agent = new HttpsProxyAgent(proxyUrl);

fetch(url, { agent: agent })
  .then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    console.log('Success! Received a response from the server via proxy.');
    return res.json();
  })
  .then(data => {
    console.log('Successfully parsed JSON data.');
  })
  .catch(e => {
    console.error('Test Failed! An error occurred:');
    console.error(e);
  });
