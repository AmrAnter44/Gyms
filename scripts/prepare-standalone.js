const fs = require('fs');
const path = require('path');

// وظيفة لنسخ المجلدات بشكل متكرر
function copyFolderRecursive(source, target) {
  if (!fs.existsSync(source)) {
    console.log(`Source folder not found: ${source}`);
    return;
  }

  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  if (fs.lstatSync(source).isDirectory()) {
    const files = fs.readdirSync(source);
    files.forEach((file) => {
      const curSource = path.join(source, file);
      const curTarget = path.join(target, file);
      
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursive(curSource, curTarget);
      } else {
        if (!fs.existsSync(curTarget)) {
          fs.copyFileSync(curSource, curTarget);
        }
      }
    });
  }
}

// وظيفة لإنشاء package.json للـ standalone
function createStandalonePackage() {
  const standaloneDir = path.join(__dirname, '..', '.next', 'standalone');
  
  if (!fs.existsSync(standaloneDir)) {
    console.log('Standalone directory not found. Make sure to run "next build" first.');
    return;
  }

  // إنشاء package.json مبسط للـ standalone
  const standalonePackage = {
    name: "gym-management-standalone",
    version: "1.0.0",
    private: true,
    scripts: {
      start: "node server.js"
    },
    dependencies: {
      // فقط الحد الأدنى المطلوب
    }
  };

  fs.writeFileSync(
    path.join(standaloneDir, 'package.json'),
    JSON.stringify(standalonePackage, null, 2)
  );

  console.log('✓ Created standalone package.json');
}

// وظيفة رئيسية
function prepareStandalone() {
  console.log('Preparing standalone build...');

  const projectRoot = path.join(__dirname, '..');
  const standaloneDir = path.join(projectRoot, '.next', 'standalone');
  const staticDir = path.join(projectRoot, '.next', 'static');

  // التحقق من وجود مجلد standalone
  if (!fs.existsSync(standaloneDir)) {
    console.error('❌ Standalone directory not found!');
    console.log('Please run "next build" with output: "standalone" in next.config.js');
    process.exit(1);
  }

  // نسخ الملفات الثابتة
  const standaloneStaticDir = path.join(standaloneDir, '.next', 'static');
  if (fs.existsSync(staticDir) && !fs.existsSync(standaloneStaticDir)) {
    console.log('Copying static files...');
    copyFolderRecursive(staticDir, standaloneStaticDir);
    console.log('✓ Static files copied');
  }

  // نسخ public
  const publicDir = path.join(projectRoot, 'public');
  const standalonePublicDir = path.join(standaloneDir, 'public');
  if (fs.existsSync(publicDir) && !fs.existsSync(standalonePublicDir)) {
    console.log('Copying public files...');
    copyFolderRecursive(publicDir, standalonePublicDir);
    console.log('✓ Public files copied');
  }

  // نسخ .next/static إلى المستوى الأعلى (للوصول السهل)
  const topStaticDir = path.join(projectRoot, '.next', 'static');
  if (fs.existsSync(staticDir) && !fs.existsSync(topStaticDir)) {
    copyFolderRecursive(staticDir, topStaticDir);
  }

  // إنشاء package.json للـ standalone
  createStandalonePackage();

  // التحقق من server.js
  const serverPath = path.join(standaloneDir, 'server.js');
  if (!fs.existsSync(serverPath)) {
    console.error('❌ server.js not found in standalone directory!');
    process.exit(1);
  }

  console.log('✅ Standalone preparation complete!');
  console.log(`Standalone directory: ${standaloneDir}`);
}

// تشغيل السكريبت
prepareStandalone();