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
      
      const page = await context.newPage();
      const fullUrl = `${baseUrl}${project.url}`;
      
      try {
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
      } catch (error) {
        console.warn(`⚠️  Failed to screenshot ${project.name}: ${error.message}`);
        await generateSinglePlaceholder(outputDir, project);
      }
      
      await page.close();
    }
    
    await context.close();
    console.log('🎉 Screenshot generation completed!');
    
  } finally {
    await browser.close();
  }
}

async function startPreviewServer() {
  const { spawn } = await import('child_process');
  
  return new Promise((resolve, reject) => {
    console.log('🚀 Starting preview server...');
    
    const server = spawn('npx', ['vite', 'preview', '--port', '4173', '--host'], {
      cwd: join(__dirname, '..'),
      stdio: 'pipe'
    });
    
    let started = false;
    
    server.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('4173') && !started) {
        started = true;
        setTimeout(() => resolve('http://localhost:4173'), 2000);
      }
    });
    
    server.stderr.on('data', (data) => {
      console.log('Preview server output:', data.toString());
    });
    
    setTimeout(() => {
      if (!started) {
        server.kill();
        reject(new Error('Preview server failed to start'));
      }
    }, 10000);
    
    // Store server reference for cleanup
    process.on('exit', () => server.kill());
    process.on('SIGTERM', () => server.kill());
    process.on('SIGINT', () => server.kill());
  });
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

// Run the script
generateScreenshots().catch(console.error);