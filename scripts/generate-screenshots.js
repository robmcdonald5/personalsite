import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Project configurations for screenshots
const projects = [
  {
    id: 'ai-menu-chatbot',
    url: '/work/ai-menu-chatbot',
    name: 'Chipotle AI Menu'
  },
  {
    id: 'poe-market-analyzer', 
    url: '/work/poe-market-analyzer',
    name: 'PoE Market Analyzer'
  },
  {
    id: 'ecommerce-price-tracker',
    url: '/work/ecommerce-price-tracker', 
    name: 'E-Commerce Price Tracker'
  },
  {
    id: 'creative-writing-assistant',
    url: '/work/creative-writing-assistant',
    name: 'Creative Writing AI Assistant'
  },
  {
    id: 'vec2art',
    url: '/work/vec2art',
    name: 'Vec2art - Image Vectorization'
  },
  {
    id: 'portfolio-site',
    url: '/work/portfolio-site',
    name: 'Personal Site'
  },
  {
    id: 'dune-spice-wars-wiki',
    url: '/work/dune-spice-wars-wiki',
    name: 'Dune Spice Wars Interactive Wiki'
  }
];

async function generateScreenshots() {
  console.log('🎬 Starting screenshot generation...');
  
  // Create output directory
  const outputDir = join(__dirname, '..', 'static', 'project-previews');
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
    console.log(`📁 Created directory: ${outputDir}`);
  }

  // Try to use Playwright if dependencies are available
  try {
    const { chromium } = await import('playwright');
    await generateWithPlaywright(outputDir);
  } catch (error) {
    console.log('⚠️  Playwright failed:', error.message);
    console.log('Generating placeholder images...');
    await generatePlaceholders(outputDir);
  }
}

async function generateWithPlaywright(outputDir) {
  const { chromium } = await import('playwright');
  
  console.log('🎭 Launching browser...');
  // Launch browser with proper settings for WSL
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu'
    ]
  });
  
  console.log('✅ Browser launched successfully');
  
  try {
    const context = await browser.newContext({
      viewport: { width: 1200, height: 800 },
      deviceScaleFactor: 1,
      ignoreHTTPSErrors: true
    });

    // Use dev server if available, otherwise start preview server
    const baseUrl = process.env.SCREENSHOT_BASE_URL || await startPreviewServer();
    console.log(`🌐 Using base URL: ${baseUrl}`);

    for (const project of projects) {
      console.log(`📸 Taking screenshot of ${project.name}...`);
      
      const success = await screenshotWithRetry(context, baseUrl, project, outputDir);
      if (!success) {
        console.warn(`⚠️  All retries failed for ${project.name}, generating placeholder`);
        await generateSinglePlaceholder(outputDir, project);
      }
    }
    
    await context.close();
    console.log('🎉 Screenshot generation completed!');
    
  } finally {
    await browser.close();
    cleanupPreviewServer();
  }
}

let previewServer = null;

async function startPreviewServer() {
  const { spawn } = await import('child_process');

  return new Promise((resolve, reject) => {
    console.log('🚀 Starting preview server...');

    // Try npm run preview first, then fallback to npx
    previewServer = spawn('npm', ['run', 'preview'], {
      cwd: join(__dirname, '..'),
      stdio: 'pipe',
      shell: true
    });
    
    let started = false;
    
    previewServer.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('4173') && !started) {
        started = true;
        console.log('🎯 Preview server detected, waiting for full startup...');
        // Wait longer and then verify the server is actually responding
        setTimeout(async () => {
          await waitForServerReady('http://localhost:4173');
          resolve('http://localhost:4173');
        }, 3000);
      }
    });
    
    previewServer.stderr.on('data', (data) => {
      console.log('Preview server output:', data.toString());
    });
    
    previewServer.on('error', (error) => {
      console.error('Preview server error:', error);
      reject(error);
    });
    
    setTimeout(() => {
      if (!started) {
        console.log('❌ Preview server timeout - killing process');
        previewServer?.kill('SIGTERM');
        reject(new Error('Preview server failed to start within 15 seconds'));
      }
    }, 15000);
  });
}

async function waitForServerReady(baseUrl, maxRetries = 10) {
  const { chromium } = await import('playwright');
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      console.log(`🔄 Checking server readiness (attempt ${i + 1}/${maxRetries})...`);
      
      const browser = await chromium.launch({ headless: true });
      const context = await browser.newContext();
      const page = await context.newPage();
      
      await page.goto(baseUrl, { 
        waitUntil: 'domcontentloaded', 
        timeout: 5000 
      });
      
      await browser.close();
      console.log('✅ Server is ready!');
      return;
    } catch (error) {
      console.log(`⏳ Server not ready yet, retrying in 1 second... (${error.message})`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  throw new Error('Server failed to become ready after maximum retries');
}

async function screenshotWithRetry(context, baseUrl, project, outputDir, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const page = await context.newPage();
    const fullUrl = `${baseUrl}${project.url}`;
    
    try {
      console.log(`🎯 Attempt ${attempt}/${maxRetries} for ${project.name}`);
      
      // Navigate to the page
      await page.goto(fullUrl, { 
        waitUntil: 'domcontentloaded',
        timeout: 30000 
      });
      
      // Wait for content to load
      await page.waitForTimeout(3000);
      
      // Wait for main content to be visible
      try {
        await page.waitForSelector('main', { timeout: 5000 });
      } catch (e) {
        console.log(`⚠️  Main content not found for ${project.name}, proceeding anyway`);
      }
      
      // Get header height to exclude it from screenshot
      let headerHeight = 0;
      try {
        headerHeight = await page.evaluate(() => {
          const header = document.querySelector('header');
          return header ? header.offsetHeight : 0;
        });
        console.log(`📏 Header height for ${project.name}: ${headerHeight}px`);
      } catch (e) {
        console.log(`⚠️  Could not determine header height for ${project.name}, using default offset`);
        headerHeight = 80; // Default header height fallback
      }
      
      // Take screenshot focusing on hero area (excluding header)
      const outputPath = join(outputDir, `${project.id}.png`);
      await page.screenshot({
        path: outputPath,
        type: 'png',
        fullPage: false,
        clip: { x: 0, y: headerHeight, width: 1200, height: 800 }
      });
      
      console.log(`✅ Generated: ${project.id}.png`);
      await page.close();
      return true;
      
    } catch (error) {
      console.warn(`⚠️  Attempt ${attempt} failed for ${project.name}: ${error.message}`);
      await page.close();
      
      if (attempt < maxRetries) {
        console.log(`🔄 Retrying in 2 seconds...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }
  
  return false;
}

function cleanupPreviewServer() {
  if (previewServer && !previewServer.killed) {
    console.log('🧹 Cleaning up preview server...');
    previewServer.kill('SIGTERM');
    previewServer = null;
  }
}

async function generatePlaceholders(outputDir) {
  for (const project of projects) {
    await generateSinglePlaceholder(outputDir, project);
  }
  console.log('🎉 Placeholder generation completed!');
}

async function generateSinglePlaceholder(outputDir, project) {
  // Generate a simple SVG placeholder
  const svgContent = `<svg width="1200" height="800" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="800" fill="#F8F9FA"/>
    <rect x="100" y="100" width="1000" height="600" fill="#FFFFFF" stroke="#EAEAEA" stroke-width="2" rx="16"/>
    <text x="600" y="380" font-family="Inter, sans-serif" font-size="32" font-weight="600" fill="#2D2D2D" text-anchor="middle">${project.name}</text>
    <text x="600" y="430" font-family="Inter, sans-serif" font-size="16" fill="#666666" text-anchor="middle">Project preview coming soon</text>
  </svg>`;
  
  const outputPath = join(outputDir, `${project.id}.svg`);
  writeFileSync(outputPath, svgContent);
  console.log(`📄 Generated placeholder: ${project.id}.svg`);
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Received SIGINT, cleaning up...');
  cleanupPreviewServer();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Received SIGTERM, cleaning up...');  
  cleanupPreviewServer();
  process.exit(0);
});

process.on('exit', () => {
  cleanupPreviewServer();
});

// Run the script
generateScreenshots()
  .then(() => {
    console.log('✨ All done!');
    cleanupPreviewServer();
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Screenshot generation failed:', error);
    cleanupPreviewServer();
    process.exit(1);
  });