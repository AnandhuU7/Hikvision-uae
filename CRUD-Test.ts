/**
 * HIKVISION UAE - CRUD OPERATIONS TESTING
 * ========================================
 * 
 * Terminal-based CRUD testing for all entities
 * Supports both public (without token) and admin (with token) operations
 */

interface TestResult {
  success: boolean;
  status: number;
  message: string;
  data?: any;
}

interface EntityData {
  name?: string;
  description?: string;
  [key: string]: any;
}

class CRUDTester {
  private baseURL: string;
  private adminToken: string | null = null;

  constructor(baseURL: string = 'http://localhost:3000') {
    this.baseURL = baseURL;
  }

  // Set admin token
  setAdminToken(token: string) {
    this.adminToken = token;
  }

  // Clear admin token
  clearAdminToken() {
    this.adminToken = null;
  }

  // Make HTTP request
  private async makeRequest(endpoint: string, method: string, body?: any): Promise<TestResult> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    // Add auth token if available
    if (this.adminToken) {
      headers['Cookie'] = `auth-token=${this.adminToken}`;
    }

    const requestOptions: RequestInit = {
      method,
      headers,
      credentials: 'include'
    };

    if (body && method !== 'GET') {
      requestOptions.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, requestOptions);
      const responseText = await response.text();
      
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch {
        responseData = responseText;
      }

      return {
        success: response.ok,
        status: response.status,
        message: responseData?.message || responseData?.error || response.statusText,
        data: responseData
      };
    } catch (error) {
      return {
        success: false,
        status: 0,
        message: error instanceof Error ? error.message : 'Network error'
      };
    }
  }

  // Load auth token
  loadAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('hikvision-admin-token');
    } else {
      try {
        const fs = require('fs');
        const tokenData = JSON.parse(fs.readFileSync('.auth-token.json', 'utf8'));
        return tokenData.token;
      } catch {
        return null;
      }
    }
  }

  // Generate auth token
  async generateAuthToken(): Promise<string | null> {
    console.log('🔐 Logging in as admin...');
    const result = await this.makeRequest('/api/admin/login', 'POST', {
      username: 'admin',
      password: 'admin@hikvisionuae'
    });

    if (result.success) {
      const token = `admin-token-${Date.now()}`;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('hikvision-admin-token', token);
      } else {
        const fs = require('fs');
        const tokenData = { token, timestamp: new Date().toISOString() };
        fs.writeFileSync('.auth-token.json', JSON.stringify(tokenData, null, 2));
      }
      
      console.log('✅ Auth token generated and saved');
      return token;
    } else {
      console.log('❌ Login failed:', result.message);
      return null;
    }
  }

  // PRODUCTS CRUD
  async testProducts(operation: string, data?: EntityData, id?: string): Promise<void> {
    console.log(`\n📦 PRODUCTS - ${operation.toUpperCase()}`);
    console.log('='.repeat(50));

    let endpoint = '/api/products';
    let method = 'GET';

    switch (operation.toLowerCase()) {
      case 'get':
        if (id) endpoint = `/api/products/${id}`;
        method = 'GET';
        break;
      case 'post':
        method = 'POST';
        break;
      case 'put':
        if (!id) {
          console.log('❌ ID required for PUT operation');
          return;
        }
        endpoint = `/api/products/${id}`;
        method = 'PUT';
        break;
      case 'delete':
        if (!id) {
          console.log('❌ ID required for DELETE operation');
          return;
        }
        endpoint = `/api/products/${id}`;
        method = 'DELETE';
        break;
      case 'patch':
        if (!id) {
          console.log('❌ ID required for PATCH operation');
          return;
        }
        endpoint = `/api/products/${id}`;
        method = 'PATCH';
        break;
    }

    const result = await this.makeRequest(endpoint, method, data);
    this.printResult(result);
  }

  // CATEGORIES CRUD
  async testCategories(operation: string, data?: EntityData, id?: string): Promise<void> {
    console.log(`\n📂 CATEGORIES - ${operation.toUpperCase()}`);
    console.log('='.repeat(50));

    let endpoint = '/api/categories';
    let method = 'GET';

    switch (operation.toLowerCase()) {
      case 'get':
        if (id) endpoint = `/api/categories/${id}`;
        method = 'GET';
        break;
      case 'post':
        method = 'POST';
        break;
      case 'put':
        if (!id) {
          console.log('❌ ID required for PUT operation');
          return;
        }
        endpoint = `/api/categories/${id}`;
        method = 'PUT';
        break;
      case 'delete':
        if (!id) {
          console.log('❌ ID required for DELETE operation');
          return;
        }
        endpoint = `/api/categories/${id}`;
        method = 'DELETE';
        break;
      case 'patch':
        if (!id) {
          console.log('❌ ID required for PATCH operation');
          return;
        }
        endpoint = `/api/categories/${id}`;
        method = 'PATCH';
        break;
    }

    const result = await this.makeRequest(endpoint, method, data);
    this.printResult(result);
  }

  // SUBCATEGORIES CRUD
  async testSubcategories(operation: string, data?: EntityData, id?: string): Promise<void> {
    console.log(`\n📁 SUBCATEGORIES - ${operation.toUpperCase()}`);
    console.log('='.repeat(50));

    let endpoint = '/api/subcategories';
    let method = 'GET';

    switch (operation.toLowerCase()) {
      case 'get':
        if (id) endpoint = `/api/subcategories/${id}`;
        method = 'GET';
        break;
      case 'post':
        method = 'POST';
        break;
      case 'put':
        if (!id) {
          console.log('❌ ID required for PUT operation');
          return;
        }
        endpoint = `/api/subcategories/${id}`;
        method = 'PUT';
        break;
      case 'delete':
        if (!id) {
          console.log('❌ ID required for DELETE operation');
          return;
        }
        endpoint = `/api/subcategories/${id}`;
        method = 'DELETE';
        break;
      case 'patch':
        if (!id) {
          console.log('❌ ID required for PATCH operation');
          return;
        }
        endpoint = `/api/subcategories/${id}`;
        method = 'PATCH';
        break;
    }

    const result = await this.makeRequest(endpoint, method, data);
    this.printResult(result);
  }

  // NAVBAR CATEGORIES CRUD
  async testNavbarCategories(operation: string, data?: EntityData, id?: string): Promise<void> {
    console.log(`\n🧭 NAVBAR CATEGORIES - ${operation.toUpperCase()}`);
    console.log('='.repeat(50));

    let endpoint = '/api/navbar-categories';
    let method = 'GET';

    switch (operation.toLowerCase()) {
      case 'get':
        if (id) endpoint = `/api/navbar-categories/${id}`;
        method = 'GET';
        break;
      case 'post':
        method = 'POST';
        break;
      case 'put':
        if (!id) {
          console.log('❌ ID required for PUT operation');
          return;
        }
        endpoint = `/api/navbar-categories/${id}`;
        method = 'PUT';
        break;
      case 'delete':
        if (!id) {
          console.log('❌ ID required for DELETE operation');
          return;
        }
        endpoint = `/api/navbar-categories/${id}`;
        method = 'DELETE';
        break;
      case 'patch':
        if (!id) {
          console.log('❌ ID required for PATCH operation');
          return;
        }
        endpoint = `/api/navbar-categories/${id}`;
        method = 'PATCH';
        break;
    }

    const result = await this.makeRequest(endpoint, method, data);
    this.printResult(result);
  }

  // CONTACTS CRUD
  async testContacts(operation: string, data?: EntityData, id?: string): Promise<void> {
    console.log(`\n📞 CONTACTS - ${operation.toUpperCase()}`);
    console.log('='.repeat(50));

    let endpoint = '/api/contacts';
    let method = 'GET';

    switch (operation.toLowerCase()) {
      case 'get':
        if (id) endpoint = `/api/contacts/${id}`;
        method = 'GET';
        break;
      case 'post':
        method = 'POST';
        break;
      case 'put':
        if (!id) {
          console.log('❌ ID required for PUT operation');
          return;
        }
        endpoint = `/api/contacts/${id}`;
        method = 'PUT';
        break;
      case 'delete':
        if (!id) {
          console.log('❌ ID required for DELETE operation');
          return;
        }
        endpoint = `/api/contacts/${id}`;
        method = 'DELETE';
        break;
      case 'patch':
        if (!id) {
          console.log('❌ ID required for PATCH operation');
          return;
        }
        endpoint = `/api/contacts/${id}`;
        method = 'PATCH';
        break;
    }

    const result = await this.makeRequest(endpoint, method, data);
    this.printResult(result);
  }

  // Print result
  private printResult(result: TestResult): void {
    const status = result.success ? '✅ SUCCESS' : '❌ FAILED';
    console.log(`${status} - Status: ${result.status}`);
    console.log(`Message: ${result.message}`);
    
    if (result.data && typeof result.data === 'object') {
      console.log('Data:', JSON.stringify(result.data, null, 2));
      
      // Highlight auto-generated ID for POST operations
      if (result.data._id || result.data.id) {
        const id = result.data._id || result.data.id;
        console.log(`\n🆔 Auto-generated ID: ${id}`);
        console.log('💡 Use this ID for GET, PUT, DELETE, or PATCH operations');
      }
    }
  }
}

// Interactive CRUD testing menu
async function showCRUDMenu(): Promise<void> {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (query: string): Promise<string> => {
    return new Promise((resolve) => {
      rl.question(query, resolve);
    });
  };

  const tester = new CRUDTester();
  let isAdminMode = false;

  while (true) {
    console.log('\n🎯 HIKVISION UAE - CRUD TESTING MENU');
    console.log('='.repeat(60));
    console.log(`🔐 Mode: ${isAdminMode ? 'ADMIN (with token)' : 'PUBLIC (no token)'}`);
    console.log('='.repeat(60));
    console.log('1. 🔑 Generate/Set Auth Token (Admin Mode)');
    console.log('2. 🌐 Switch to Public Mode (No Token)');
    console.log('3. 📦 Test Products CRUD');
    console.log('4. 📂 Test Categories CRUD');
    console.log('5. 📁 Test Subcategories CRUD');
    console.log('6. 🧭 Test Navbar Categories CRUD');
    console.log('7. 📞 Test Contacts CRUD');
    console.log('8. 🔄 Test All Entities (GET only)');
    console.log('9. 🚪 Exit');
    console.log('='.repeat(60));

    const choice = await question('Enter your choice (1-9): ');

    switch (choice.trim()) {
      case '1':
        console.log('\n🔑 Generating Auth Token...');
        const token = await tester.generateAuthToken();
        if (token) {
          tester.setAdminToken(token);
          isAdminMode = true;
          console.log('✅ Switched to ADMIN mode');
        }
        await question('\nPress Enter to continue...');
        break;

      case '2':
        tester.clearAdminToken();
        isAdminMode = false;
        console.log('✅ Switched to PUBLIC mode');
        await question('\nPress Enter to continue...');
        break;

      case '3':
        await testEntityCRUD(tester, 'products', question);
        break;

      case '4':
        await testEntityCRUD(tester, 'categories', question);
        break;

      case '5':
        await testEntityCRUD(tester, 'subcategories', question);
        break;

      case '6':
        await testEntityCRUD(tester, 'navbar-categories', question);
        break;

      case '7':
        await testEntityCRUD(tester, 'contacts', question);
        break;

      case '8':
        console.log('\n🔄 Testing All Entities (GET operations)...');
        await tester.testProducts('get');
        await tester.testCategories('get');
        await tester.testSubcategories('get');
        await tester.testNavbarCategories('get');
        await tester.testContacts('get');
        await question('\nPress Enter to continue...');
        break;

      case '9':
        console.log('\n🚪 Exiting...');
        rl.close();
        return;

      default:
        console.log('\n❌ Invalid choice. Please enter 1-9.');
        await question('\nPress Enter to continue...');
    }
  }
}

// Helper function to call the correct test method based on entity name
function callTestMethod(tester: CRUDTester, entity: string, operation: string, data?: EntityData, id?: string): Promise<void> {
  const methodMap: { [key: string]: string } = {
    'products': 'testProducts',
    'categories': 'testCategories', 
    'subcategories': 'testSubcategories',
    'navbar-categories': 'testNavbarCategories',
    'contacts': 'testContacts'
  };

  const methodName = methodMap[entity];
  if (!methodName) {
    throw new Error(`Unknown entity: ${entity}`);
  }

  return (tester as any)[methodName](operation, data, id);
}

// Helper function to test entity CRUD operations
async function testEntityCRUD(tester: CRUDTester, entity: string, question: (query: string) => Promise<string>): Promise<void> {
  while (true) {
    console.log(`\n📋 ${entity.toUpperCase()} CRUD Operations`);
    console.log('='.repeat(40));
    console.log('1. GET (all) - View all records with auto-generated IDs');
    console.log('2. GET (by ID) - View specific record (requires existing ID)');
    console.log('3. POST (create) - Create new record (auto-generates ID)');
    console.log('4. PUT (update) - Update existing record (requires ID)');
    console.log('5. DELETE - Delete existing record (requires ID)');
    console.log('6. PATCH (partial update) - Update specific fields (requires ID)');
    console.log('7. Back to main menu');

    const choice = await question('Enter operation (1-7): ');

    switch (choice.trim()) {
      case '1':
        await callTestMethod(tester, entity, 'get');
        break;

      case '2':
        console.log('⚠️  GET by ID requires an existing ID. Please run GET (all) first to see available IDs.');
        await question('Press Enter to continue...');
        break;

      case '3':
        const createData = await getEntityData(entity, question);
        await callTestMethod(tester, entity, 'post', createData);
        break;

      case '4':
        console.log('⚠️  PUT requires an existing ID. Please run GET (all) first to see available IDs.');
        await question('Press Enter to continue...');
        break;

      case '5':
        console.log('⚠️  DELETE requires an existing ID. Please run GET (all) first to see available IDs.');
        await question('Press Enter to continue...');
        break;

      case '6':
        console.log('⚠️  PATCH requires an existing ID. Please run GET (all) first to see available IDs.');
        await question('Press Enter to continue...');
        break;

      case '7':
        return;

      default:
        console.log('❌ Invalid choice');
    }
    
    // Wait for user to press Enter before showing menu again
    await question('\nPress Enter to continue...');
  }
}

// Helper function to get entity data
async function getEntityData(entity: string, question: (query: string) => Promise<string>): Promise<EntityData> {
  const data: EntityData = {};

  data.name = await question('Enter name: ');

  switch (entity) {
    case 'products':
      data.description = await question('Enter description: ');
      data.keyFeatures = await question('Enter key features (JSON array): ');
      data.navbarCategory = await question('Enter navbar category ID: ');
      data.category = await question('Enter category ID: ');
      data.subcategory = await question('Enter subcategory ID: ');
      break;

    case 'categories':
      data.description = await question('Enter description: ');
      data.navbarCategory = await question('Enter navbar category ID: ');
      break;

    case 'subcategories':
      data.description = await question('Enter description: ');
      data.category = await question('Enter category ID: ');
      break;

    case 'navbar-categories':
      data.description = await question('Enter description: ');
      break;

    case 'contacts':
      data.email = await question('Enter email: ');
      data.subject = await question('Enter subject: ');
      data.message = await question('Enter message: ');
      data.phone = await question('Enter phone (optional): ');
      break;
  }

  return data;
}

// Export functions
export { CRUDTester, showCRUDMenu };

// Run if executed directly
if (typeof window === 'undefined' && typeof process !== 'undefined') {
  showCRUDMenu().catch(console.error);
}

// Browser environment
if (typeof window !== 'undefined') {
  (window as any).CRUDTester = CRUDTester;
  (window as any).showCRUDMenu = showCRUDMenu;
} 