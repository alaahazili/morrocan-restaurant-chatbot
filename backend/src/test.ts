import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000/api';

async function testEndpoint(endpoint: string, expectedStatus: number) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    const data = await response.json();
    
    console.log(`\nTesting ${endpoint}:`);
    console.log(`Status: ${response.status} (Expected: ${expectedStatus})`);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (response.status !== expectedStatus) {
      throw new Error(`Expected status ${expectedStatus} but got ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error(`Error testing ${endpoint}:`, error);
    return false;
  }
}

async function runTests() {
  console.log('Starting backend tests...\n');

  // Test health check
  await testEndpoint('/health', 200);

  // Test get all menu items
  await testEndpoint('/menu', 200);

  // Test get by category (existing)
  await testEndpoint('/menu/category/starter', 200);

  // Test get by category (non-existing)
  await testEndpoint('/menu/category/nonexistent', 404);

  // Test get by ID (existing)
  await testEndpoint('/menu/item/1', 200);

  // Test get by ID (non-existing)
  await testEndpoint('/menu/item/999', 404);

  console.log('\nTests completed!');
}

runTests().catch(console.error); 