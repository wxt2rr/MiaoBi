// final-diagnosis.js
import { execSync } from 'child_process';
import { HttpsProxyAgent } from 'https-proxy-agent';

const line = '---------------------------------------------------------';
const proxyUrl = 'http://127.0.0.1:7899';
const testUrl = 'https://registry.npmjs.org/react'; // A reliable JSON endpoint

async function runDiagnostics() {
  console.log(line);
  console.log('🔬 STARTING ULTIMATE DIAGNOSIS 🔬');
  console.log(line);

  // 1. Environment Info
  console.log('\n✅ 1. ENVIRONMENT VARIABLES');
  console.log(`Node Version: ${process.version}`);
  console.log(`Platform: ${process.platform}`);
  console.log(`SHELL: ${process.env.SHELL || 'Not Set'}`);
  console.log(`HTTPS_PROXY: ${process.env.HTTPS_PROXY || 'Not Set'}`);
  console.log(`HTTP_PROXY: ${process.env.HTTP_PROXY || 'Not Set'}`);
  console.log(`SSL_CERT_FILE: ${process.env.SSL_CERT_FILE || 'Not Set'}`);
  console.log(line);

  // 2. Curl Test
  try {
    console.log('\n✅ 2. TESTING WITH cURL (via Proxy)');
    const curlOutput = execSync(`curl --verbose --proxy "${proxyUrl}" "${testUrl}"`, { encoding: 'utf8', stdio: 'pipe' });
    console.log('cURL test PASSED. Connectivity with proxy is working at system level.');
    // console.log(curlOutput); // Too verbose, we just need to know it passed
  } catch (e) {
    console.error('cURL test FAILED. This is a critical problem.');
    console.error(e.stderr || e.stdout || e.message);
  }
  console.log(line);

  // 3. Node.js Direct Connection Test
  try {
    console.log('\n✅ 3. TESTING WITH Node.js (Direct Connection - Expected to Fail)');
    await fetch(testUrl);
    console.log('Node.js direct connection PASSED. (This is unexpected!)');
  } catch (e) {
    console.error('Node.js direct connection FAILED as expected. Error:');
    console.error(e.cause ? e.cause : e);
  }
  console.log(line);

  // 4. Node.js Proxied Connection Test
  try {
    console.log('\n✅ 4. TESTING WITH Node.js (via Proxy - The Decisive Test)');
    const agent = new HttpsProxyAgent(proxyUrl);
    const response = await fetch(testUrl, { agent: agent });
    if (!response.ok) throw new Error(`HTTP Status ${response.status}`);
    const data = await response.json();
    console.log(`Node.js proxied connection PASSED. Successfully fetched package: ${data.name}`);
  } catch (e) {
    console.error('Node.js proxied connection FAILED. This is the core issue.');
    console.error(e.cause ? e.cause : e);
  }
  console.log(line);
}

runDiagnostics();
