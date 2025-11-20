(()=>{var e={};e.id=2686,e.ids=[2686],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},55315:e=>{"use strict";e.exports=require("path")},17360:e=>{"use strict";e.exports=require("url")},3307:(e,s,t)=>{"use strict";t.r(s),t.d(s,{GlobalError:()=>l.a,__next_app__:()=>x,originalPathname:()=>m,pages:()=>c,routeModule:()=>p,tree:()=>o}),t(26939),t(84658),t(35866);var a=t(23191),r=t(88716),n=t(37922),l=t.n(n),i=t(95231),d={};for(let e in i)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>i[e]);t.d(s,d);let o=["",{children:["receipts",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,26939)),"C:\\Users\\amran\\Desktop\\gym\\gym-management\\app\\receipts\\page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(t.bind(t,84658)),"C:\\Users\\amran\\Desktop\\gym\\gym-management\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,35866,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["C:\\Users\\amran\\Desktop\\gym\\gym-management\\app\\receipts\\page.tsx"],m="/receipts/page",x={require:t,loadChunk:()=>Promise.resolve()},p=new a.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/receipts/page",pathname:"/receipts",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:o}})},6651:(e,s,t)=>{Promise.resolve().then(t.bind(t,76995))},76995:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>c});var a=t(10326),r=t(17577),n=t(35047);function l({message:e="ليس لديك صلاحية للوصول إلى هذه الصفحة",showBackButton:s=!0}){let t=(0,n.useRouter)();return a.jsx("div",{className:"min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50",dir:"rtl",children:(0,a.jsxs)("div",{className:"max-w-md w-full mx-4",children:[(0,a.jsxs)("div",{className:"bg-white rounded-2xl shadow-2xl p-8 text-center",children:[a.jsx("div",{className:"mb-6",children:a.jsx("div",{className:"inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full",children:a.jsx("svg",{className:"w-12 h-12 text-red-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:a.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"})})})}),a.jsx("h1",{className:"text-3xl font-bold text-gray-800 mb-4",children:"\uD83D\uDEAB الوصول مرفوض"}),a.jsx("p",{className:"text-lg text-gray-600 mb-8",children:e}),a.jsx("div",{className:"bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6",children:a.jsx("p",{className:"text-sm text-red-800",children:"إذا كنت تعتقد أن هذا خطأ، يرجى التواصل مع المسؤول للحصول على الصلاحيات المناسبة."})}),(0,a.jsxs)("div",{className:"space-y-3",children:[s&&a.jsx("button",{onClick:()=>t.back(),className:"w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition font-bold shadow-lg",children:"← العودة للخلف"}),a.jsx("button",{onClick:()=>t.push("/"),className:"w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-bold",children:"\uD83C\uDFE0 العودة للصفحة الرئيسية"})]})]}),a.jsx("div",{className:"mt-6 text-center",children:(0,a.jsxs)("p",{className:"text-sm text-gray-600",children:["\uD83D\uDCA1 ",a.jsx("strong",{children:"نصيحة:"})," تأكد من تسجيل الدخول بحساب يملك الصلاحيات المطلوبة"]})})]})})}function i({receipt:e,onDetailsClick:s}){let[t,n]=(0,r.useState)(!1),[l,i]=(0,r.useState)(""),[d,o]=(0,r.useState)(!1),c=JSON.parse(e.itemDetails),m=e=>`إيصال #${e.receiptNumber}
العميل: ${e.memberName}
المبلغ: ${e.amount} ج.م
طريقة الدفع: ${e.paymentMethod}
تاريخ: ${e.date}`,x=async()=>{if(!l||l.trim().length<10){alert("⚠️ يرجى إدخال رقم هاتف صحيح");return}o(!0);let s=m({receiptNumber:e.receiptNumber,type:e.type,amount:e.amount,memberName:c.memberName||c.clientName||c.name,memberNumber:c.memberNumber,date:e.createdAt,paymentMethod:e.paymentMethod,details:c});try{let e=await fetch("/api/send-receipt",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:l,message:s})});(await e.json()).success?(alert("✅ تم إرسال الرسالة عبر واتساب"),n(!1),i("")):alert("❌ فشل الإرسال")}catch(e){console.error(e),alert("❌ حدث خطأ أثناء الإرسال")}finally{o(!1)}};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:"flex gap-2",children:[s&&a.jsx("button",{onClick:s,className:"bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 flex items-center gap-1",children:"\uD83D\uDC41️"}),(c.phone||c.memberPhone||c.clientPhone)&&a.jsx("button",{onClick:()=>{let e=c.phone||c.memberPhone||c.clientPhone;if(!e){alert("⚠️ رقم الهاتف غير متوفر في تفاصيل الإيصال");return}i(e),n(!0)},className:"bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 flex items-center gap-1",children:"\uD83D\uDCF2"}),a.jsx("button",{onClick:()=>n(!0),className:"bg-purple-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-purple-700 flex items-center gap-1",children:"\uD83D\uDCF1"})]}),t&&a.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4",style:{zIndex:9999},onClick:e=>{e.target===e.currentTarget&&(n(!1),i(""))},children:(0,a.jsxs)("div",{className:"bg-white rounded-2xl shadow-2xl max-w-md w-full p-6",onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)("div",{className:"flex justify-between items-center mb-6",children:[(0,a.jsxs)("div",{className:"flex items-center gap-3",children:[a.jsx("span",{className:"text-4xl",children:"\uD83D\uDCF1"}),(0,a.jsxs)("div",{children:[a.jsx("h3",{className:"text-2xl font-bold",children:"إرسال تفاصيل الإيصال"}),(0,a.jsxs)("p",{className:"text-sm text-gray-500",children:["إيصال #",e.receiptNumber]})]})]}),a.jsx("button",{onClick:()=>{n(!1),i("")},className:"text-gray-400 hover:text-gray-600 text-3xl leading-none",children:"\xd7"})]}),(0,a.jsxs)("div",{className:"mb-6",children:[a.jsx("label",{className:"block text-sm font-bold text-gray-700 mb-2",children:"\uD83D\uDCDE رقم الهاتف *"}),a.jsx("input",{type:"tel",value:l,onChange:e=>i(e.target.value),placeholder:"01xxxxxxxxx",className:"w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 font-mono text-lg",dir:"ltr",autoFocus:!0})]}),(0,a.jsxs)("div",{className:"flex gap-3",children:[a.jsx("button",{onClick:x,disabled:d||!l||l.trim().length<10,className:"flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 flex items-center justify-center gap-2",children:d?a.jsx(a.Fragment,{children:"⏳ جاري الإرسال..."}):a.jsx(a.Fragment,{children:"\uD83D\uDCF2 إرسال عبر واتساب"})}),a.jsx("button",{onClick:()=>{n(!1),i("")},disabled:d,className:"px-6 py-3 bg-gray-200 text-gray-700 rounded-lg",children:"إلغاء"})]})]})})]})}var d=t(36977);function o({receipt:e,onClose:s}){var t;let r=JSON.parse(e.itemDetails);return a.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4",onClick:s,children:(0,a.jsxs)("div",{className:"bg-white rounded-2xl max-w-2xl w-full shadow-2xl",onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)("div",{className:`bg-gradient-to-r ${{Member:"from-blue-500 to-blue-600",PT:"from-green-500 to-green-600",DayUse:"from-purple-500 to-purple-600",InBody:"from-orange-500 to-orange-600"}[e.type]||"from-gray-500 to-gray-600"} text-white p-6 rounded-t-2xl`,children:[(0,a.jsxs)("div",{className:"flex justify-between items-start mb-4",children:[(0,a.jsxs)("div",{children:[a.jsx("h2",{className:"text-2xl font-bold mb-2",children:"تفاصيل الإيصال"}),a.jsx("p",{className:"text-sm opacity-90",children:{Member:"اشتراك عضوية",PT:"تدريب شخصي",DayUse:"يوم استخدام",InBody:"فحص InBody"}[t=e.type]||t})]}),a.jsx("button",{onClick:s,className:"text-white hover:bg-white hover:bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center transition text-2xl",children:"\xd7"})]}),a.jsx("div",{className:"bg-white bg-opacity-20 rounded-xl p-4",children:(0,a.jsxs)("div",{className:"flex justify-between items-center",children:[(0,a.jsxs)("div",{children:[a.jsx("p",{className:"text-sm opacity-90 mb-1",children:"رقم الإيصال"}),(0,a.jsxs)("p",{className:"text-3xl font-bold",children:["#",e.receiptNumber]})]}),a.jsx("div",{className:"text-6xl",children:"\uD83E\uDDFE"})]})})]}),(0,a.jsxs)("div",{className:"p-6 space-y-4",children:[r.memberNumber&&a.jsx("div",{className:"bg-blue-50 border-2 border-blue-200 rounded-xl p-4",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[a.jsx("p",{className:"text-sm text-blue-600 mb-1",children:"رقم العضوية"}),(0,a.jsxs)("p",{className:"text-3xl font-bold text-blue-600",children:["#",r.memberNumber]})]}),a.jsx("div",{className:"text-5xl",children:"\uD83D\uDC64"})]})}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[r.memberName&&(0,a.jsxs)("div",{className:"bg-gray-50 rounded-lg p-4",children:[a.jsx("p",{className:"text-sm text-gray-600 mb-1",children:"اسم العضو"}),a.jsx("p",{className:"text-lg font-bold text-gray-800",children:r.memberName})]}),r.clientName&&(0,a.jsxs)("div",{className:"bg-gray-50 rounded-lg p-4",children:[a.jsx("p",{className:"text-sm text-gray-600 mb-1",children:"اسم العميل"}),a.jsx("p",{className:"text-lg font-bold text-gray-800",children:r.clientName})]}),r.name&&(0,a.jsxs)("div",{className:"bg-gray-50 rounded-lg p-4",children:[a.jsx("p",{className:"text-sm text-gray-600 mb-1",children:"الاسم"}),a.jsx("p",{className:"text-lg font-bold text-gray-800",children:r.name})]})]}),(0,a.jsxs)("div",{className:"border-t-2 pt-4",children:[(0,a.jsxs)("h3",{className:"font-bold text-gray-800 mb-3 flex items-center gap-2",children:[a.jsx("span",{children:"\uD83D\uDCCB"}),a.jsx("span",{children:"تفاصيل الخدمة"})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[r.subscriptionPrice&&(0,a.jsxs)("div",{className:"flex justify-between py-2 border-b",children:[a.jsx("span",{className:"text-gray-600",children:"سعر الاشتراك"}),(0,a.jsxs)("span",{className:"font-bold",children:[r.subscriptionPrice," ج.م"]})]}),r.sessionsPurchased&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:"flex justify-between py-2 border-b",children:[a.jsx("span",{className:"text-gray-600",children:"عدد الجلسات"}),(0,a.jsxs)("span",{className:"font-bold",children:[r.sessionsPurchased," جلسة"]})]}),r.pricePerSession&&(0,a.jsxs)("div",{className:"flex justify-between py-2 border-b",children:[a.jsx("span",{className:"text-gray-600",children:"سعر الجلسة"}),(0,a.jsxs)("span",{className:"font-bold",children:[r.pricePerSession," ج.م"]})]})]}),r.coachName&&(0,a.jsxs)("div",{className:"flex justify-between py-2 border-b",children:[a.jsx("span",{className:"text-gray-600",children:"اسم المدرب"}),a.jsx("span",{className:"font-bold",children:r.coachName})]}),r.staffName&&(0,a.jsxs)("div",{className:"flex justify-between py-2 border-b",children:[a.jsx("span",{className:"text-gray-600",children:"اسم الموظف"}),a.jsx("span",{className:"font-bold",children:r.staffName})]}),r.serviceType&&(0,a.jsxs)("div",{className:"flex justify-between py-2 border-b",children:[a.jsx("span",{className:"text-gray-600",children:"نوع الخدمة"}),a.jsx("span",{className:"font-bold",children:"DayUse"===r.serviceType?"يوم استخدام":"InBody"})]})]})]}),(0,a.jsxs)("div",{className:"border-t-2 pt-4",children:[(0,a.jsxs)("h3",{className:"font-bold text-gray-800 mb-3 flex items-center gap-2",children:[a.jsx("span",{children:"\uD83D\uDCB0"}),a.jsx("span",{children:"تفاصيل الدفع"})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[void 0!==r.paidAmount&&(0,a.jsxs)("div",{className:"flex justify-between py-2 border-b",children:[a.jsx("span",{className:"text-gray-600",children:"المبلغ المدفوع"}),(0,a.jsxs)("span",{className:"font-bold text-green-600",children:[r.paidAmount," ج.م"]})]}),void 0!==r.remainingAmount&&r.remainingAmount>0&&(0,a.jsxs)("div",{className:"flex justify-between py-2 border-b",children:[a.jsx("span",{className:"text-gray-600",children:"المبلغ المتبقي"}),(0,a.jsxs)("span",{className:"font-bold text-red-600",children:[r.remainingAmount," ج.م"]})]}),(0,a.jsxs)("div",{className:"flex justify-between py-3 bg-green-50 px-3 rounded-lg mt-2",children:[a.jsx("span",{className:"font-bold text-gray-800",children:"الإجمالي"}),(0,a.jsxs)("span",{className:"font-bold text-2xl text-green-600",children:[e.amount," ج.م"]})]})]})]}),(0,a.jsxs)("div",{className:"bg-gray-50 rounded-lg p-4",children:[a.jsx("p",{className:"text-sm text-gray-600 mb-1",children:"تاريخ الإصدار"}),a.jsx("p",{className:"text-lg font-bold text-gray-800",children:new Date(e.createdAt).toLocaleDateString("ar-EG",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})})]})]}),(0,a.jsxs)("div",{className:"p-6 bg-gray-50 rounded-b-2xl flex gap-3",children:[(0,a.jsxs)("button",{onClick:()=>{(0,d.p)(e.receiptNumber,e.type,e.amount,r,e.createdAt)},className:"flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2",children:[a.jsx("span",{children:"\uD83D\uDDA8️"}),a.jsx("span",{children:"طباعة الإيصال"})]}),a.jsx("button",{onClick:s,className:"flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium",children:"إغلاق"})]})]})})}function c(){let e=(0,n.useRouter)(),{hasPermission:s,loading:t,user:c}=function(){let[e,s]=(0,r.useState)({user:null,permissions:null,loading:!0,isAdmin:!1}),t=async()=>{try{let e=await fetch("/api/auth/me");if(e.ok){let t=await e.json();s({user:t.user,permissions:t.user.permissions||null,loading:!1,isAdmin:"ADMIN"===t.user.role})}else s({user:null,permissions:null,loading:!1,isAdmin:!1})}catch(e){console.error("Error fetching permissions:",e),s({user:null,permissions:null,loading:!1,isAdmin:!1})}},a=s=>!!e.isAdmin||!!e.permissions&&e.permissions[s];return{...e,hasPermission:a,hasAnyPermission:s=>!!e.isAdmin||s.some(e=>a(e)),hasAllPermissions:s=>!!e.isAdmin||s.every(e=>a(e)),refreshPermissions:t}}(),[m,x]=(0,r.useState)([]),[p,u]=(0,r.useState)([]),[h,g]=(0,r.useState)(!0),[b,f]=(0,r.useState)(""),[j,y]=(0,r.useState)(""),[N,v]=(0,r.useState)("all"),[D,w]=(0,r.useState)("all"),[C,$]=(0,r.useState)(null),[k,P]=(0,r.useState)(null),[A,S]=(0,r.useState)(!1),[T,E]=(0,r.useState)({receiptNumber:0,amount:0,paymentMethod:"cash",staffName:""}),B=s("canEditReceipts"),M=s("canDeleteReceipts"),z=async()=>{try{let s=await fetch("/api/receipts");if(401===s.status){f("❌ يجب تسجيل الدخول أولاً"),setTimeout(()=>e.push("/login"),2e3);return}if(403===s.status){f("❌ ليس لديك صلاحية عرض الإيصالات"),x([]),u([]);return}if(s.ok){let e=await s.json();Array.isArray(e)?(x(e),u(e)):(console.error("البيانات المستلمة ليست array:",e),x([]),u([]))}else{let e=await s.json();f(`❌ ${e.error||"فشل جلب الإيصالات"}`),x([]),u([])}}catch(e){console.error("Error fetching receipts:",e),f("❌ حدث خطأ أثناء جلب الإيصالات"),x([]),u([])}finally{g(!1)}};if(t)return(0,a.jsxs)("div",{className:"container mx-auto p-6 text-center",dir:"rtl",children:[a.jsx("div",{className:"text-6xl mb-4",children:"⏳"}),a.jsx("p",{className:"text-xl",children:"جاري التحميل..."})]});if(!s("canViewReceipts"))return a.jsx(l,{message:"ليس لديك صلاحية عرض الإيصالات"});let F=e=>({Member:"\uD83C\uDD95 عضو جديد","تجديد عضويه":"\uD83D\uDD04 تجديد عضوية","اشتراك برايفت":"\uD83D\uDCAA PT جديد","تجديد برايفت":"\uD83D\uDD04 تجديد PT",PT:"\uD83D\uDCAA PT",DayUse:"\uD83D\uDCC5 Day Use",Payment:"\uD83D\uDCB0 دفع متبقي",InBody:"⚖️ InBody"})[e]||e,_=e=>({cash:"\uD83D\uDCB5 كاش",visa:"\uD83D\uDCB3 فيزا",vodafone_cash:"\uD83D\uDCF1 فودافون كاش",instapay:"\uD83D\uDCB8 إنستاباي"})[e]||e,I=async e=>{if(!M){f("❌ ليس لديك صلاحية حذف الإيصالات"),setTimeout(()=>f(""),3e3);return}if(confirm("هل أنت متأكد من حذف هذا الإيصال؟ لا يمكن التراجع عن هذا الإجراء!")){try{let s=await fetch(`/api/receipts/update?id=${e}`,{method:"DELETE"});if(s.ok)f("✅ تم حذف الإيصال بنجاح"),z();else{let e=await s.json();f(`❌ ${e.error||"فشل حذف الإيصال"}`)}}catch(e){console.error("Error:",e),f("❌ حدث خطأ في الحذف")}setTimeout(()=>f(""),3e3)}},U=e=>{if(!B){f("❌ ليس لديك صلاحية تعديل الإيصالات"),setTimeout(()=>f(""),3e3);return}P(e),E({receiptNumber:e.receiptNumber,amount:e.amount,paymentMethod:e.paymentMethod,staffName:e.staffName||""}),S(!0)},R=async()=>{if(k){try{let e=await fetch("/api/receipts/update",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({receiptId:k.id,receiptNumber:T.receiptNumber,amount:T.amount,paymentMethod:T.paymentMethod,staffName:T.staffName})});if(e.ok)f("✅ تم تحديث الإيصال بنجاح"),S(!1),P(null),z();else{let s=await e.json();f(`❌ ${s.error||"فشل تحديث الإيصال"}`)}}catch(e){console.error("Error:",e),f("❌ حدث خطأ في التحديث")}setTimeout(()=>f(""),3e3)}},G=e=>{try{let s=JSON.parse(e.itemDetails);(0,d.p)(e.receiptNumber,e.type,e.amount,s,e.createdAt,e.paymentMethod)}catch(e){console.error("Error printing receipt:",e),alert("❌ حدث خطأ في الطباعة")}};return h?(0,a.jsxs)("div",{className:"container mx-auto p-6 text-center",dir:"rtl",children:[a.jsx("div",{className:"text-6xl mb-4",children:"⏳"}),a.jsx("p",{className:"text-xl",children:"جاري التحميل..."})]}):(0,a.jsxs)("div",{className:"container mx-auto p-6",dir:"rtl",children:[a.jsx("div",{className:"flex justify-between items-center mb-6",children:(0,a.jsxs)("div",{children:[a.jsx("h1",{className:"text-3xl font-bold",children:"\uD83E\uDDFE الإيصالات"}),a.jsx("p",{className:"text-gray-600",children:"عرض وإدارة جميع الإيصالات"}),c&&(0,a.jsxs)("p",{className:"text-sm text-gray-500 mt-1",children:["\uD83D\uDC64 ",c.name," - ","ADMIN"===c.role?"\uD83D\uDC51 مدير":"MANAGER"===c.role?"\uD83D\uDCCA مشرف":"\uD83D\uDC77 موظف"]})]})}),b&&a.jsx("div",{className:`mb-6 p-4 rounded-lg ${b.includes("✅")?"bg-green-100 text-green-800":"bg-red-100 text-red-800"}`,children:b}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-4 mb-6",children:[a.jsx("div",{className:"bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[a.jsx("div",{className:"text-3xl font-bold",children:p.length}),a.jsx("div",{className:"text-sm opacity-90",children:"إجمالي الإيصالات"})]}),a.jsx("div",{className:"text-5xl opacity-20",children:"\uD83D\uDCCA"})]})}),a.jsx("div",{className:"bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[a.jsx("div",{className:"text-3xl font-bold",children:(Array.isArray(p)?p.reduce((e,s)=>e+s.amount,0):0).toLocaleString()}),a.jsx("div",{className:"text-sm opacity-90",children:"إجمالي الإيرادات (ج.م)"})]}),a.jsx("div",{className:"text-5xl opacity-20",children:"\uD83D\uDCB0"})]})}),a.jsx("div",{className:"bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[a.jsx("div",{className:"text-3xl font-bold",children:(()=>{if(!Array.isArray(p))return 0;let e=new Date().toDateString();return p.filter(s=>new Date(s.createdAt).toDateString()===e).length})()}),a.jsx("div",{className:"text-sm opacity-90",children:"إيصالات اليوم"})]}),a.jsx("div",{className:"text-5xl opacity-20",children:"\uD83D\uDCC5"})]})}),a.jsx("div",{className:"bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[a.jsx("div",{className:"text-3xl font-bold",children:(()=>{if(!Array.isArray(p))return 0;let e=new Date().toDateString();return p.filter(s=>new Date(s.createdAt).toDateString()===e).reduce((e,s)=>e+s.amount,0)})().toLocaleString()}),a.jsx("div",{className:"text-sm opacity-90",children:"إيرادات اليوم (ج.م)"})]}),a.jsx("div",{className:"text-5xl opacity-20",children:"\uD83D\uDCB5"})]})})]}),(0,a.jsxs)("div",{className:"bg-white rounded-xl shadow-lg p-6 mb-6",children:[a.jsx("h3",{className:"text-lg font-bold mb-4",children:"\uD83D\uDD0D البحث والفلاتر"}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-sm font-medium mb-2",children:"\uD83D\uDD0D بحث"}),a.jsx("input",{type:"text",value:j,onChange:e=>y(e.target.value),placeholder:"رقم الإيصال، اسم العميل، الهاتف، الموظف...",className:"w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-blue-500"})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-sm font-medium mb-2",children:"\uD83D\uDCCB نوع الإيصال"}),(0,a.jsxs)("select",{value:N,onChange:e=>v(e.target.value),className:"w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-blue-500",children:[a.jsx("option",{value:"all",children:"الكل"}),a.jsx("option",{value:"Member",children:"عضو جديد"}),a.jsx("option",{value:"تجديد عضويه",children:"تجديد عضوية"}),a.jsx("option",{value:"اشتراك برايفت",children:"PT جديد"}),a.jsx("option",{value:"تجديد برايفت",children:"تجديد PT"}),a.jsx("option",{value:"DayUse",children:"Day Use"}),a.jsx("option",{value:"InBody",children:"InBody"}),a.jsx("option",{value:"Payment",children:"دفع متبقي"})]})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-sm font-medium mb-2",children:"\uD83D\uDCB3 طريقة الدفع"}),(0,a.jsxs)("select",{value:D,onChange:e=>w(e.target.value),className:"w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-blue-500",children:[a.jsx("option",{value:"all",children:"الكل"}),a.jsx("option",{value:"cash",children:"كاش"}),a.jsx("option",{value:"visa",children:"فيزا"}),a.jsx("option",{value:"vodafone_cash",children:"فودافون كاش"}),a.jsx("option",{value:"instapay",children:"إنستاباي"})]})]})]}),(j||"all"!==N||"all"!==D)&&a.jsx("button",{onClick:()=>{y(""),v("all"),w("all")},className:"mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium",children:"❌ مسح الفلاتر"})]}),(0,a.jsxs)("div",{className:"bg-white rounded-xl shadow-lg overflow-hidden",children:[a.jsx("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"w-full",children:[a.jsx("thead",{className:"bg-gradient-to-r from-gray-100 to-gray-200",children:(0,a.jsxs)("tr",{children:[a.jsx("th",{className:"px-6 py-4 text-right font-bold",children:"رقم الإيصال"}),a.jsx("th",{className:"px-6 py-4 text-right font-bold",children:"النوع"}),a.jsx("th",{className:"px-6 py-4 text-right font-bold",children:"العميل"}),a.jsx("th",{className:"px-6 py-4 text-right font-bold",children:"المبلغ"}),a.jsx("th",{className:"px-6 py-4 text-right font-bold",children:"طريقة الدفع"}),a.jsx("th",{className:"px-6 py-4 text-right font-bold",children:"الموظف"}),a.jsx("th",{className:"px-6 py-4 text-right font-bold",children:"التاريخ"}),a.jsx("th",{className:"px-6 py-4 text-right font-bold",children:"إجراءات"})]})}),a.jsx("tbody",{children:p.map(e=>{let s={};try{s=JSON.parse(e.itemDetails)}catch{}let t=s.memberName||s.clientName||s.name||"-";return(0,a.jsxs)("tr",{className:"border-t hover:bg-blue-50 transition",children:[a.jsx("td",{className:"px-6 py-4",children:(0,a.jsxs)("span",{className:"font-bold text-blue-600",children:["#",e.receiptNumber]})}),a.jsx("td",{className:"px-6 py-4",children:a.jsx("span",{className:"px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800",children:F(e.type)})}),a.jsx("td",{className:"px-6 py-4",children:(0,a.jsxs)("div",{children:[a.jsx("p",{className:"font-semibold",children:t}),s.phone&&a.jsx("p",{className:"text-xs text-gray-600",children:s.phone}),s.memberNumber&&(0,a.jsxs)("p",{className:"text-xs text-blue-600",children:["عضوية #",s.memberNumber]}),s.ptNumber&&(0,a.jsxs)("p",{className:"text-xs text-green-600",children:["PT #",s.ptNumber]})]})}),a.jsx("td",{className:"px-6 py-4",children:(0,a.jsxs)("span",{className:"font-bold text-green-600",children:[e.amount.toLocaleString()," ج.م"]})}),a.jsx("td",{className:"px-6 py-4",children:a.jsx("span",{className:"text-sm",children:_(e.paymentMethod)})}),a.jsx("td",{className:"px-6 py-4",children:a.jsx("span",{className:"text-sm text-gray-600",children:e.staffName||"-"})}),a.jsx("td",{className:"px-6 py-4 text-sm text-gray-600",children:new Date(e.createdAt).toLocaleString("ar-EG",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}),a.jsx("td",{className:"px-6 py-4",children:(0,a.jsxs)("div",{className:"flex gap-2",children:[a.jsx(i,{receipt:e,onDetailsClick:()=>$(e)}),a.jsx("button",{onClick:()=>G(e),className:"bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-sm transition shadow-md hover:shadow-lg",title:"طباعة",children:"\uD83D\uDDA8️"}),B&&a.jsx("button",{onClick:()=>U(e),className:"bg-orange-600 text-white px-3 py-2 rounded-lg hover:bg-orange-700 text-sm transition shadow-md hover:shadow-lg",title:"تعديل",children:"✏️"}),M&&a.jsx("button",{onClick:()=>I(e.id),className:"bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 text-sm transition shadow-md hover:shadow-lg",title:"حذف",children:"\uD83D\uDDD1️"})]})})]},e.id)})})]})}),0===p.length&&!h&&(0,a.jsxs)("div",{className:"text-center py-20 text-gray-500",children:[a.jsx("div",{className:"text-6xl mb-4",children:"\uD83E\uDDFE"}),a.jsx("p",{className:"text-xl font-medium mb-2",children:j||"all"!==N||"all"!==D?"لا توجد نتائج للبحث":"لا توجد إيصالات"}),(j||"all"!==N||"all"!==D)&&a.jsx("button",{onClick:()=>{y(""),v("all"),w("all")},className:"mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700",children:"مسح الفلاتر"})]})]}),C&&a.jsx(o,{receipt:C,onClose:()=>$(null)}),A&&k&&a.jsx("div",{className:"fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4",children:(0,a.jsxs)("div",{className:"bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-6",children:[(0,a.jsxs)("div",{children:[a.jsx("h2",{className:"text-2xl font-bold",children:"✏️ تعديل الإيصال"}),(0,a.jsxs)("p",{className:"text-sm text-gray-600",children:["إيصال رقم #",k.receiptNumber]})]}),a.jsx("button",{onClick:()=>{S(!1),P(null)},className:"text-gray-400 hover:text-gray-600 text-3xl leading-none",children:"\xd7"})]}),a.jsx("div",{className:"bg-blue-50 border-r-4 border-blue-500 rounded-lg p-4 mb-6",children:(0,a.jsxs)("div",{className:"grid grid-cols-2 gap-3 text-sm",children:[(0,a.jsxs)("div",{children:[a.jsx("span",{className:"text-gray-600",children:"النوع:"}),a.jsx("span",{className:"font-bold mr-2",children:F(k.type)})]}),(0,a.jsxs)("div",{children:[a.jsx("span",{className:"text-gray-600",children:"التاريخ:"}),a.jsx("span",{className:"font-bold mr-2",children:new Date(k.createdAt).toLocaleDateString("ar-EG")})]})]})}),(0,a.jsxs)("div",{className:"space-y-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsxs)("label",{className:"block text-sm font-bold mb-2",children:["رقم الإيصال ",a.jsx("span",{className:"text-red-600",children:"*"})]}),a.jsx("input",{type:"number",value:T.receiptNumber,onChange:e=>E({...T,receiptNumber:parseInt(e.target.value)}),className:"w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"1000"}),a.jsx("p",{className:"text-xs text-amber-600 mt-1",children:"⚠️ تأكد من عدم تكرار رقم الإيصال"})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("label",{className:"block text-sm font-bold mb-2",children:["المبلغ (ج.م) ",a.jsx("span",{className:"text-red-600",children:"*"})]}),a.jsx("input",{type:"number",step:"0.01",value:T.amount,onChange:e=>E({...T,amount:parseFloat(e.target.value)}),className:"w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"0.00"})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("label",{className:"block text-sm font-bold mb-2",children:["طريقة الدفع ",a.jsx("span",{className:"text-red-600",children:"*"})]}),(0,a.jsxs)("select",{value:T.paymentMethod,onChange:e=>E({...T,paymentMethod:e.target.value}),className:"w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",children:[a.jsx("option",{value:"cash",children:"\uD83D\uDCB5 كاش"}),a.jsx("option",{value:"visa",children:"\uD83D\uDCB3 فيزا"}),a.jsx("option",{value:"vodafone_cash",children:"\uD83D\uDCF1 فودافون كاش"}),a.jsx("option",{value:"instapay",children:"\uD83D\uDCB8 إنستاباي"})]})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-sm font-bold mb-2",children:"اسم الموظف (اختياري)"}),a.jsx("input",{type:"text",value:T.staffName,onChange:e=>E({...T,staffName:e.target.value}),className:"w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"اسم الموظف المسؤول"})]}),a.jsx("div",{className:"bg-yellow-50 border-r-4 border-yellow-500 rounded-lg p-4",children:(0,a.jsxs)("div",{className:"flex items-start gap-3",children:[a.jsx("div",{className:"text-2xl",children:"⚠️"}),(0,a.jsxs)("div",{children:[a.jsx("p",{className:"font-bold text-yellow-800 mb-1",children:"تنبيه هام"}),a.jsx("p",{className:"text-sm text-yellow-700",children:"تعديل الإيصال سيؤثر فقط على البيانات المعروضة في النظام. لن يتم تعديل التفاصيل المرتبطة بالعضوية أو جلسات PT."})]})]})})]}),(0,a.jsxs)("div",{className:"flex gap-3 mt-6",children:[a.jsx("button",{onClick:R,className:"flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-bold shadow-lg hover:shadow-xl",children:"✅ حفظ التعديلات"}),a.jsx("button",{onClick:()=>{S(!1),P(null)},className:"px-6 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-bold",children:"إلغاء"})]})]})})]})}},36977:(e,s,t)=>{"use strict";function a(e){if(!e)return"-";let s="string"==typeof e?new Date(e):e,t=s.getFullYear(),a=String(s.getMonth()+1).padStart(2,"0"),r=String(s.getDate()).padStart(2,"0");return`${t}-${a}-${r}`}function r(e,s,t,r,n,l){let i=n instanceof Date?n:new Date(n);!function(e){let s=function(e){let{receiptNumber:s,type:t,amount:r,details:n,date:l}=e,i=l.toLocaleDateString("ar-EG",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"}),d=t.includes("تجديد")||!0===n.isRenewal,o={cash:"كاش \uD83D\uDCB5",visa:"فيزا \uD83D\uDCB3",instapay:"إنستا باي \uD83D\uDCF1",wallet:"محفظة إلكترونية \uD83D\uDCB0"}[n.paymentMethod||"cash"]||"كاش \uD83D\uDCB5",c=n.staffName||"";return`
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=80mm">
  <title>إيصال ${s}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    @page {
      size: 80mm auto;
      margin: 0;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      width: 80mm;
      padding: 8mm;
      background: white;
      color: #000;
      font-size: 13px;
      line-height: 1.4;
    }
    
    .header {
      text-align: center;
      border-bottom: 2px dashed #000;
      padding-bottom: 12px;
      margin-bottom: 15px;
    }
    
    .header h1 {
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 6px;
    }
    
    .header p {
      font-size: 12px;
      margin: 3px 0;
      color: #333;
    }
    
    .type-badge {
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: bold;
      display: inline-block;
      margin: 8px 0;
      color: white;
    }
    
    .type-badge.renewal {
      background: #10b981;
    }
    
    .type-badge.new {
      background: #3b82f6;
    }
    
    .payment-method-badge {
      background: #6366f1;
      color: white;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: bold;
      display: inline-block;
      margin: 8px 0;
    }
    
    .staff-badge {
      background: #f59e0b;
      color: white;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: bold;
      display: inline-block;
      margin: 8px 0;
    }
    
    .info-row {
      display: flex;
      justify-content: space-between;
      margin: 6px 0;
      font-size: 13px;
    }
    
    .info-row strong {
      font-weight: 600;
    }
    
    .details {
      border-top: 2px solid #000;
      border-bottom: 2px solid #000;
      padding: 12px 0;
      margin: 12px 0;
    }
    
    .details h3 {
      font-size: 15px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    
    .detail-item {
      margin: 6px 0;
      font-size: 13px;
    }
    
    .detail-item strong {
      font-weight: 600;
      margin-left: 5px;
    }
    
    .member-number {
      font-size: 19px;
      font-weight: bold;
      color: #2563eb;
      text-align: center;
      margin: 12px 0;
      padding: 10px;
      background: #eff6ff;
      border-radius: 6px;
      border: 2px solid #2563eb;
    }
    
    .date-box {
      background: #f0f9ff;
      border: 2px solid #3b82f6;
      border-radius: 8px;
      padding: 10px;
      margin: 10px 0;
      font-family: 'Courier New', monospace;
    }
    
    .date-box p {
      margin: 4px 0;
      font-size: 12px;
    }
    
    .date-value {
      font-weight: bold;
      color: #1e40af;
    }
    
    .renewal-info {
      background: #d1fae5;
      border: 2px solid #10b981;
      border-radius: 8px;
      padding: 10px;
      margin: 10px 0;
    }
    
    .renewal-info p {
      margin: 4px 0;
      font-size: 12px;
    }
    
    .total {
      display: flex;
      justify-content: space-between;
      font-size: 17px;
      font-weight: bold;
      margin: 15px 0;
      padding: 12px 0;
      border-top: 3px solid #000;
    }
    
    .footer {
      text-align: center;
      margin-top: 15px;
      font-size: 12px;
      color: #555;
      border-top: 2px dashed #000;
      padding-top: 12px;
    }
    
    .footer p {
      margin: 4px 0;
    }
    
    .remaining {
      color: #dc2626;
      font-weight: bold;
    }
    
    @media print {
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <img src='icon.png' alt="logo" style="width: 24px; height: 24px; display: inline-block;"/>
       <img src='qr.png' alt="logo" style="width: 24px; height: 24px; display: inline-block;"/>
      <h1>X GYM</h1>
    </div>
    <p>إيصال استلام</p>
    <p>${t}</p>
    
    ${d?'<div class="type-badge renewal">\uD83D\uDD04 تجديد اشتراك</div>':'<div class="type-badge new">✨ اشتراك جديد</div>'}
    
    <div class="payment-method-badge">${o}</div>
    
    ${c?`<div class="staff-badge">👷 ${c}</div>`:""}
  </div>

  <div class="info-row">
    <strong>رقم الإيصال:</strong>
    <span>#${s}</span>
  </div>
  <div class="info-row">
    <strong>التاريخ:</strong>
    <span>${i}</span>
  </div>

  <div class="details">
    <h3>تفاصيل العملية:</h3>
    
    ${n.memberNumber?`
      <div class="member-number">
        رقم العضوية: ${n.memberNumber}
      </div>
    `:""}
    
    ${n.ptNumber?`
      <div class="member-number">
        رقم PT: ${n.ptNumber}
      </div>
    `:""}
    
    ${n.memberName?`
      <div class="detail-item">
        <strong>الاسم:</strong> ${n.memberName}
      </div>
    `:""}
    
    ${n.clientName?`
      <div class="detail-item">
        <strong>العميل:</strong> ${n.clientName}
      </div>
    `:""}
    
    ${n.name?`
      <div class="detail-item">
        <strong>الاسم:</strong> ${n.name}
      </div>
    `:""}
    
    ${n.startDate||n.expiryDate?`
      <div class="date-box">
        <p><strong>📅 فترة الاشتراك:</strong></p>
        ${n.startDate?`<p>من: <span class="date-value">${a(n.startDate)}</span></p>`:""}
        ${n.expiryDate?`<p>إلى: <span class="date-value">${a(n.expiryDate)}</span></p>`:""}
        ${n.subscriptionDays?`<p>المدة: <span class="date-value">${n.subscriptionDays} يوم</span></p>`:""}
      </div>
    `:""}
    
    ${d&&(n.newStartDate||n.newExpiryDate)?`
      <div class="renewal-info">
        <p><strong>🔄 معلومات التجديد:</strong></p>
        ${n.newStartDate?`<p>• من: ${a(n.newStartDate)}</p>`:""}
        ${n.newExpiryDate?`<p>• إلى: ${a(n.newExpiryDate)}</p>`:""}
        ${n.subscriptionDays?`<p>• المدة: ${n.subscriptionDays} يوم</p>`:""}
      </div>
    `:""}
    
    ${d&&(void 0!==n.oldSessionsRemaining||void 0!==n.newSessionsRemaining)?`
      <div class="renewal-info">
        <p><strong>🔄 تفاصيل التجديد:</strong></p>
        ${void 0!==n.oldSessionsRemaining?`<p>• الجلسات قبل التجديد: ${n.oldSessionsRemaining}</p>`:""}
        ${void 0!==n.newSessionsRemaining?`<p>• الجلسات بعد التجديد: ${n.newSessionsRemaining}</p>`:""}
      </div>
    `:""}
    
    ${n.subscriptionPrice?`
      <div class="detail-item">
        <strong>سعر الاشتراك:</strong> ${n.subscriptionPrice} جنيه
      </div>
    `:""}
    
    ${n.sessionsPurchased?`
      <div class="detail-item">
        <strong>عدد الجلسات:</strong> ${n.sessionsPurchased}
      </div>
      ${n.pricePerSession?`
        <div class="detail-item">
          <strong>سعر الجلسة:</strong> ${n.pricePerSession} جنيه
        </div>
      `:""}
    `:""}
    
    ${n.coachName?`
      <div class="detail-item">
        <strong>المدرب:</strong> ${n.coachName}
      </div>
    `:""}
    
    ${n.staffName?`
      <div>
        <strong> الموظف المسجل:</strong> ${n.staffName}
      </div>
    `:""}
    
    ${n.serviceType?`
      <div class="detail-item">
        <strong>نوع الخدمة:</strong> ${"DayUse"===n.serviceType?"يوم استخدام":"InBody"}
      </div>
    `:""}
    
    ${void 0!==n.paidAmount?`
      <div class="detail-item">
        <strong>المبلغ المدفوع:</strong> ${n.paidAmount} جنيه
      </div>
    `:""}
    
    ${n.remainingAmount&&n.remainingAmount>0?`
      <div class="detail-item remaining">
        <strong>المتبقي:</strong> ${n.remainingAmount} جنيه
      </div>
    `:""}
  </div>

  <div class="total">
    <span>الإجمالي:</span>
    <span>${r} جنيه</span>
  </div>

  <div class="footer">
    ${d?'<p style="color: #10b981; font-weight: bold;">تم تجديد اشتراكك بنجاح \uD83C\uDF89</p>':'<p style="color: #3b82f6; font-weight: bold;">مرحباً بك معنا \uD83C\uDF89</p>'}
    <p style="font-size: 10px; margin-top: 8px;">
      مدة استرداد الأشتراك 24 ساعه
    </p>
  </div>
</body>
</html>
  `}(e),t=window.open("","_blank","width=302,height=600,scrollbars=no");if(!t){alert("يرجى السماح بالنوافذ المنبثقة لطباعة الإيصال");return}t.document.open(),t.document.write(s),t.document.close(),t.onload=function(){setTimeout(()=>{t.focus(),t.print(),t.onafterprint=function(){t.close()},setTimeout(()=>{t.closed||t.close()},1e3)},500)}}({receiptNumber:e,type:s,amount:t,details:l?{...r,paymentMethod:l}:r,date:i})}t.d(s,{p:()=>r})},26939:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>a});let a=(0,t(68570).createProxy)(String.raw`C:\Users\amran\Desktop\gym\gym-management\app\receipts\page.tsx#default`)},57481:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>r});var a=t(66621);let r=e=>[{type:"image/x-icon",sizes:"16x16",url:(0,a.fillMetadataSegment)(".",e.params,"favicon.ico")+""}]}};var s=require("../../webpack-runtime.js");s.C(e);var t=e=>s(s.s=e),a=s.X(0,[8948,9206,6621,9797],()=>t(3307));module.exports=a})();