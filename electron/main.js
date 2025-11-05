// const { app, BrowserWindow, Menu, dialog } = require('electron')
// const path = require('path')
// const { spawn } = require('child_process')
// const isDev = require('electron-is-dev')
// const fs = require('fs')

// let mainWindow
// let serverProcess

// function createWindow() {
//   // إنشاء النافذة
//   mainWindow = new BrowserWindow({
//     width: 1400,
//     height: 900,
//     minWidth: 1200,
//     minHeight: 700,
//     center: true,
//     icon: path.join(__dirname, '../build/icon.ico'),
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//       webSecurity: false // للسماح بتحميل الملفات المحلية
//     },
//     autoHideMenuBar: !isDev,
//     title: 'نظام إدارة الصالة الرياضية',
//     backgroundColor: '#ffffff'
//   })

//   // Start Next.js server
//   if (!isDev) {
//     startProductionServer()
//   }

//   // تحميل التطبيق
//   const startUrl = isDev
//     ? 'http://localhost:4001'
//     : 'http://localhost:4001'

//   // انتظار بدء السيرفر
//   const loadApp = () => {
//     mainWindow.loadURL(startUrl).catch(() => {
//       setTimeout(loadApp, 1000) // حاول مرة أخرى بعد ثانية
//     })
//   }

//   setTimeout(loadApp, isDev ? 100 : 2000)

//   // فتح DevTools في development
//   if (isDev) {
//     mainWindow.webContents.openDevTools()
//   }

//   // إزالة القائمة في production
//   if (!isDev) {
//     mainWindow.removeMenu()
//     Menu.setApplicationMenu(null)
//   }

//   mainWindow.on('closed', () => {
//     mainWindow = null
//     if (serverProcess) {
//       serverProcess.kill()
//     }
//   })
// }

// function startProductionServer() {
//   try {
//     // نحاول إيجاد السيرفر في جميع الأماكن المحتملة
//     const possiblePaths = [
//       path.join(process.resourcesPath, 'app.asar.unpacked/.next/standalone/server.js'),
//       path.join(process.resourcesPath, 'app.asar/.next/standalone/server.js'),
//       path.join(__dirname, '../.next/standalone/server.js'),
//       path.join(process.resourcesPath, '.next/standalone/server.js'),
//       path.join(process.resourcesPath, 'app/.next/standalone/server.js'),
//     ]

//     const serverPath = possiblePaths.find(fs.existsSync)

//     if (!serverPath) {
//       dialog.showErrorBox(
//         'خطأ في التشغيل',
//         'لم يتم العثور على ملفات التطبيق. يرجى إعادة تثبيت البرنامج.'
//       )
//       app.quit()
//       return
//     }

//     serverProcess = spawn('node', [serverPath], {
//       env: { ...process.env, PORT: 4001 },
//       stdio: 'pipe'
//     })

//     serverProcess.stdout.on('data', (data) => {
//       console.log(`Server: ${data}`)
//     })

//     serverProcess.stderr.on('data', (data) => {
//       console.error(`Server Error: ${data}`)
//     })

//     serverProcess.on('error', (err) => {
//       dialog.showErrorBox('خطأ في السيرفر', err.message)
//       app.quit()
//     })
//   } catch (error) {
//     dialog.showErrorBox('خطأ', 'فشل في بدء الخادم: ' + error.message)
//     app.quit()
//   }
// }

// // Event Handlers
// app.whenReady().then(createWindow)

// app.on('window-all-closed', () => {
//   if (serverProcess) {
//     serverProcess.kill()
//   }
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow()
//   }
// })

// // معالجة الأخطاء
// process.on('uncaughtException', (error) => {
//   console.error('Uncaught Exception:', error)
//   dialog.showErrorBox('خطأ غير متوقع', error.message)
// })
const { app, BrowserWindow, Menu, dialog } = require('electron')
const path = require('path')
const { spawn, exec } = require('child_process')
const isDev = require('electron-is-dev')
const fs = require('fs')
const http = require('http')

let mainWindow
let serverProcess

// وظيفة للتحقق من توفر المنفذ
function checkPort(port) {
  return new Promise((resolve) => {
    const server = http.createServer()
    server.once('error', () => resolve(false))
    server.once('listening', () => {
      server.close()
      resolve(true)
    })
    server.listen(port)
  })
}

// إيقاف أي عملية تستخدم المنفذ
async function killProcessOnPort(port) {
  return new Promise((resolve) => {
    exec(`netstat -ano | findstr :${port}`, (error, stdout) => {
      if (error || !stdout) {
        resolve()
        return
      }
      
      const lines = stdout.split('\n')
      const pids = new Set()
      
      lines.forEach(line => {
        const parts = line.trim().split(/\s+/)
        const pid = parts[parts.length - 1]
        if (pid && !isNaN(pid)) {
          pids.add(pid)
        }
      })
      
      pids.forEach(pid => {
        try {
          process.kill(pid)
        } catch (e) {
          // تجاهل الأخطاء
        }
      })
      
      setTimeout(resolve, 1000)
    })
  })
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    center: true,
    icon: path.join(__dirname, '../build/icon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false
    },
    autoHideMenuBar: !isDev,
    title: 'نظام إدارة الصالة الرياضية',
    backgroundColor: '#ffffff',
    show: false // لا تظهر النافذة مباشرة
  })

  // إظهار النافذة عندما تكون جاهزة
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // Start Next.js server
  if (!isDev) {
    startProductionServer()
  }

  // تحميل التطبيق
  const startUrl = isDev
    ? 'http://localhost:4001'
    : 'http://localhost:4001'

  // انتظار بدء السيرفر مع محاولات متعددة
  let attempts = 0
  const maxAttempts = 30 // 30 محاولة = 30 ثانية
  
  const loadApp = () => {
    attempts++
    
    // فحص إذا كان السيرفر يعمل
    http.get(startUrl, (res) => {
      mainWindow.loadURL(startUrl)
    }).on('error', () => {
      if (attempts < maxAttempts) {
        setTimeout(loadApp, 1000)
      } else {
        dialog.showErrorBox(
          'خطأ في التشغيل',
          'فشل في بدء خادم التطبيق. يرجى إعادة تشغيل البرنامج.'
        )
        app.quit()
      }
    })
  }

  setTimeout(loadApp, isDev ? 100 : 3000)

  if (isDev) {
    mainWindow.webContents.openDevTools()
  }

  if (!isDev) {
    mainWindow.removeMenu()
    Menu.setApplicationMenu(null)
  }

  mainWindow.on('closed', () => {
    mainWindow = null
    if (serverProcess) {
      try {
        serverProcess.kill()
      } catch (e) {
        // تجاهل الخطأ
      }
    }
  })
}

async function startProductionServer() {
  try {
    // التحقق من المنفذ أولاً
    const portAvailable = await checkPort(4001)
    if (!portAvailable) {
      console.log('Port 4001 is in use, killing process...')
      await killProcessOnPort(4001)
    }

    // البحث عن مجلد standalone
    const possibleStandalonePaths = [
      path.join(process.resourcesPath, 'app.asar.unpacked', '.next', 'standalone'),
      path.join(process.resourcesPath, 'app', '.next', 'standalone'),
      path.join(process.resourcesPath, '.next', 'standalone'),
      path.join(__dirname, '..', '.next', 'standalone'),
      path.join(process.cwd(), '.next', 'standalone')
    ]

    const standalonePath = possibleStandalonePaths.find(p => {
      const serverPath = path.join(p, 'server.js')
      return fs.existsSync(serverPath)
    })

    if (!standalonePath) {
      // محاولة تشغيل Next.js مباشرة
      console.log('Standalone not found, trying direct Next.js start...')
      
      const nextPaths = [
        path.join(process.resourcesPath, 'app.asar.unpacked'),
        path.join(process.resourcesPath, 'app'),
        path.join(process.resourcesPath),
        path.join(__dirname, '..'),
        process.cwd()
      ]

      const appPath = nextPaths.find(p => {
        return fs.existsSync(path.join(p, 'package.json'))
      })

      if (!appPath) {
        throw new Error('لم يتم العثور على ملفات التطبيق')
      }

      // تشغيل Next.js production server
      serverProcess = spawn('npx', ['next', 'start', '-p', '4001'], {
        cwd: appPath,
        env: { 
          ...process.env, 
          PORT: 4001,
          NODE_ENV: 'production'
        },
        shell: true,
        stdio: 'pipe'
      })
    } else {
      // تشغيل standalone server
      const serverPath = path.join(standalonePath, 'server.js')
      
      // نسخ ملفات static و public إذا لزم الأمر
      const staticSource = path.join(standalonePath, '..', 'static')
      const staticDest = path.join(standalonePath, '.next', 'static')
      
      if (fs.existsSync(staticSource) && !fs.existsSync(staticDest)) {
        const staticDir = path.dirname(staticDest)
        if (!fs.existsSync(staticDir)) {
          fs.mkdirSync(staticDir, { recursive: true })
        }
        copyFolderRecursive(staticSource, staticDest)
      }

      serverProcess = spawn('node', [serverPath], {
        cwd: standalonePath,
        env: { 
          ...process.env, 
          PORT: 4001,
          NODE_ENV: 'production',
          HOSTNAME: 'localhost'
        },
        stdio: 'pipe'
      })
    }

    serverProcess.stdout.on('data', (data) => {
      console.log(`Server: ${data}`)
    })

    serverProcess.stderr.on('data', (data) => {
      console.error(`Server Error: ${data}`)
    })

    serverProcess.on('error', (err) => {
      console.error('Failed to start server:', err)
      dialog.showErrorBox('خطأ في السيرفر', err.message)
    })

    serverProcess.on('exit', (code) => {
      if (code !== 0 && code !== null) {
        console.error(`Server exited with code ${code}`)
      }
    })

  } catch (error) {
    console.error('Error starting server:', error)
    dialog.showErrorBox('خطأ', 'فشل في بدء الخادم: ' + error.message)
  }
}

// وظيفة لنسخ المجلدات
function copyFolderRecursive(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true })
  }
  
  if (fs.lstatSync(source).isDirectory()) {
    const files = fs.readdirSync(source)
    files.forEach((file) => {
      const curSource = path.join(source, file)
      const curTarget = path.join(target, file)
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursive(curSource, curTarget)
      } else {
        fs.copyFileSync(curSource, curTarget)
      }
    })
  }
}

// Event Handlers
app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (serverProcess) {
    try {
      serverProcess.kill()
    } catch (e) {
      // تجاهل الخطأ
    }
  }
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// معالجة الأخطاء
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error)
  if (error.code !== 'EPIPE') {
    dialog.showErrorBox('خطأ غير متوقع', error.message)
  }
})

// تنظيف عند الإغلاق
app.on('before-quit', async () => {
  if (serverProcess) {
    serverProcess.kill()
  }
  await killProcessOnPort(4001)
})