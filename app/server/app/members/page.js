(()=>{var e={};e.id=3607,e.ids=[3607],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},55315:e=>{"use strict";e.exports=require("path")},17360:e=>{"use strict";e.exports=require("url")},12357:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>i.a,__next_app__:()=>p,originalPathname:()=>m,pages:()=>c,routeModule:()=>x,tree:()=>o}),s(73441),s(84658),s(35866);var r=s(23191),a=s(88716),n=s(37922),i=s.n(n),l=s(95231),d={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>l[e]);s.d(t,d);let o=["",{children:["members",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,73441)),"C:\\Users\\amran\\Desktop\\gym\\gym-management\\app\\members\\page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(s.bind(s,84658)),"C:\\Users\\amran\\Desktop\\gym\\gym-management\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,35866,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["C:\\Users\\amran\\Desktop\\gym\\gym-management\\app\\members\\page.tsx"],m="/members/page",p={require:s,loadChunk:()=>Promise.resolve()},x=new r.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/members/page",pathname:"/members",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:o}})},93645:(e,t,s)=>{Promise.resolve().then(s.bind(s,40198))},40198:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>c});var r=s(10326),a=s(17577),n=s(35047),i=s(33971),l=s(58864),d=s(36977);function o({onSuccess:e}){let[t,s]=(0,a.useState)(!1),[n,o]=(0,a.useState)(""),[c,m]=(0,a.useState)(null),[p,x]=(0,a.useState)(""),u=(0,a.useRef)(null),[g,b]=(0,a.useState)({memberNumber:"",name:"",phone:"",profileImage:"",inBodyScans:0,invitations:0,freePTSessions:0,subscriptionPrice:0,remainingAmount:0,notes:"",startDate:(0,l.ze)(new Date),expiryDate:"",paymentMethod:"cash",staffName:"",isOther:!1}),h=e=>{console.log("\uD83D\uDD04 تغيير Other:",e),b(t=>({...t,isOther:e,memberNumber:e?"":c?.toString()||""}))},f=e=>{if(!g.startDate)return;let t=new Date(new Date(g.startDate));t.setMonth(t.getMonth()+e),b(e=>({...e,expiryDate:(0,l.ze)(t)}))},y=async t=>{if(t.preventDefault(),s(!0),o(""),!g.staffName.trim()){o("❌ يرجى إدخال اسم الموظف"),s(!1);return}if(g.startDate&&g.expiryDate){let e=new Date(g.startDate);if(new Date(g.expiryDate)<=e){o("❌ تاريخ الانتهاء يجب أن يكون بعد تاريخ البداية"),s(!1);return}}let r={...g,isOther:g.isOther,memberNumber:g.isOther?null:g.memberNumber?parseInt(g.memberNumber):c,inBodyScans:parseInt(g.inBodyScans.toString()),invitations:parseInt(g.invitations.toString()),freePTSessions:parseInt(g.freePTSessions.toString()),subscriptionPrice:parseInt(g.subscriptionPrice.toString()),remainingAmount:parseInt(g.remainingAmount.toString()),staffName:g.staffName.trim()};console.log("\uD83D\uDCE4 إرسال البيانات:",{isOther:r.isOther,memberNumber:r.memberNumber});try{let t=await fetch("/api/members",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}),s=await t.json();t.ok?(o("✅ تم إضافة العضو بنجاح!"),s.receipt&&(console.log("\uD83D\uDDA8️ طباعة الإيصال باستخدام النظام الموحد..."),setTimeout(()=>{let e=g.startDate&&g.expiryDate?(0,l.pi)(g.startDate,g.expiryDate):null,t=r.subscriptionPrice-r.remainingAmount,a={memberNumber:s.member.memberNumber,memberName:s.member.name,phone:s.member.phone,startDate:g.startDate,expiryDate:g.expiryDate,subscriptionDays:e,subscriptionPrice:r.subscriptionPrice,paidAmount:t,remainingAmount:r.remainingAmount,inBodyScans:r.inBodyScans,invitations:r.invitations,freePTSessions:r.freePTSessions,paymentMethod:g.paymentMethod,staffName:g.staffName};(0,d.p)(s.receipt.receiptNumber,"Member",r.subscriptionPrice,a,new Date(s.receipt.createdAt),g.paymentMethod)},500)),setTimeout(()=>{e()},2e3)):o(`❌ ${s.error||"حدث خطأ"}`)}catch(e){o("❌ حدث خطأ في الاتصال"),console.error("Error:",e)}finally{s(!1)}},v=g.startDate&&g.expiryDate?(0,l.pi)(g.startDate,g.expiryDate):null,j=g.subscriptionPrice-g.remainingAmount;return(0,r.jsxs)("form",{onSubmit:y,className:"space-y-6",children:[n&&r.jsx("div",{className:`p-4 rounded-lg text-center font-medium ${n.includes("✅")?"bg-green-100 text-green-800":"bg-red-100 text-red-800"}`,children:n}),(0,r.jsxs)("div",{className:"bg-gray-50 border-2 border-gray-200 rounded-lg p-4",children:[(0,r.jsxs)("h3",{className:"font-bold text-lg mb-4 flex items-center gap-2",children:[r.jsx("span",{children:"\uD83D\uDC64"}),r.jsx("span",{children:"المعلومات الأساسية"})]}),(0,r.jsxs)("div",{className:"mb-4",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,r.jsxs)("label",{className:"block text-sm font-medium",children:["رقم العضوية ",!g.isOther&&"*"]}),(0,r.jsxs)("label",{className:"flex items-center gap-2 cursor-pointer",children:[r.jsx("input",{type:"checkbox",checked:g.isOther,onChange:e=>h(e.target.checked),className:"w-4 h-4 rounded border-gray-300"}),r.jsx("span",{className:"text-sm font-medium text-gray-700",children:"Other (بدون رقم)"})]})]}),g.isOther?r.jsx("div",{className:"w-full px-3 py-2 border-2 border-dashed rounded-lg bg-gray-100 text-gray-500 text-center",children:"لا يوجد رقم عضوية (Other)"}):r.jsx("input",{type:"number",required:!g.isOther,value:g.memberNumber,onChange:e=>b({...g,memberNumber:e.target.value}),className:"w-full px-3 py-2 border-2 rounded-lg",placeholder:"مثال: 1001",disabled:g.isOther}),!g.isOther&&c&&(0,r.jsxs)("p",{className:"text-xs text-gray-500 mt-1",children:["\uD83D\uDCA1 الرقم التالي المقترح: ",c]})]}),(0,r.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium mb-1",children:"الاسم *"}),r.jsx("input",{type:"text",required:!0,value:g.name,onChange:e=>b({...g,name:e.target.value}),className:"w-full px-3 py-2 border-2 rounded-lg",placeholder:"أحمد محمد"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium mb-1",children:"رقم الهاتف"}),r.jsx("input",{type:"tel",value:g.phone,onChange:e=>b({...g,phone:e.target.value}),className:"w-full px-3 py-2 border-2 rounded-lg",placeholder:"01234567890",dir:"ltr"})]})]}),(0,r.jsxs)("div",{className:"mt-4",children:[r.jsx("label",{className:"block text-sm font-medium mb-1",children:"اسم الموظف *"}),r.jsx("input",{type:"text",required:!0,value:g.staffName,onChange:e=>b({...g,staffName:e.target.value}),className:"w-full px-3 py-2 border-2 rounded-lg",placeholder:"محمد علي"}),r.jsx("p",{className:"text-xs text-gray-500 mt-1",children:"\uD83D\uDC64 اسم الموظف الذي قام بإضافة العضو"})]})]}),(0,r.jsxs)("div",{className:"bg-purple-50 border-2 border-purple-200 rounded-lg p-4",children:[(0,r.jsxs)("h3",{className:"font-bold text-lg mb-4 flex items-center gap-2",children:[r.jsx("span",{children:"\uD83D\uDCF7"}),r.jsx("span",{children:"صورة البروفايل"})]}),(0,r.jsxs)("div",{className:"flex flex-col items-center gap-4",children:[p?(0,r.jsxs)("div",{className:"relative",children:[r.jsx("img",{src:p,alt:"Preview",className:"w-32 h-32 rounded-full object-cover border-4 border-purple-400"}),r.jsx("button",{type:"button",onClick:()=>{x(""),b(e=>({...e,profileImage:""})),u.current&&(u.current.value="")},className:"absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition",children:"✕"})]}):r.jsx("div",{className:"w-32 h-32 rounded-full border-4 border-dashed border-purple-300 flex items-center justify-center bg-purple-100",children:r.jsx("span",{className:"text-4xl text-purple-400",children:"\uD83D\uDC64"})}),r.jsx("input",{ref:u,type:"file",accept:"image/*",onChange:e=>{let t=e.target.files?.[0];if(!t)return;if(!t.type.startsWith("image/")){o("❌ يرجى اختيار صورة فقط");return}if(t.size>5242880){o("❌ حجم الصورة يجب أن يكون أقل من 5MB");return}let s=new FileReader;s.onloadend=()=>{let e=s.result;x(e),b(t=>({...t,profileImage:e}))},s.readAsDataURL(t)},className:"hidden",id:"profileImage"}),r.jsx("label",{htmlFor:"profileImage",className:"px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer transition",children:p?"\uD83D\uDCF7 تغيير الصورة":"\uD83D\uDCF7 رفع صورة"}),(0,r.jsxs)("p",{className:"text-xs text-gray-500 text-center",children:["يُفضل صورة بحجم 500\xd7500 بكسل أو أكبر",r.jsx("br",{}),"الحد الأقصى: 5MB"]})]})]}),(0,r.jsxs)("div",{className:"bg-blue-50 border-2 border-blue-200 rounded-lg p-4",children:[(0,r.jsxs)("h3",{className:"font-bold text-lg mb-3 flex items-center gap-2",children:[r.jsx("span",{children:"\uD83D\uDCC5"}),r.jsx("span",{children:"فترة الاشتراك"})]}),(0,r.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 mb-4",children:[(0,r.jsxs)("div",{children:[(0,r.jsxs)("label",{className:"block text-sm font-medium mb-1",children:["تاريخ البداية ",r.jsx("span",{className:"text-xs text-gray-500",children:"(yyyy-mm-dd)"})]}),r.jsx("input",{type:"text",value:g.startDate,onChange:e=>b({...g,startDate:e.target.value}),className:"w-full px-3 py-2 border-2 rounded-lg font-mono text-lg",placeholder:"2025-11-18",pattern:"\\d{4}-\\d{2}-\\d{2}"})]}),(0,r.jsxs)("div",{children:[(0,r.jsxs)("label",{className:"block text-sm font-medium mb-1",children:["تاريخ الانتهاء ",r.jsx("span",{className:"text-xs text-gray-500",children:"(yyyy-mm-dd)"})]}),r.jsx("input",{type:"text",value:g.expiryDate,onChange:e=>b({...g,expiryDate:e.target.value}),className:"w-full px-3 py-2 border-2 rounded-lg font-mono text-lg",placeholder:"2025-12-18",pattern:"\\d{4}-\\d{2}-\\d{2}"})]})]}),(0,r.jsxs)("div",{className:"mb-3",children:[r.jsx("p",{className:"text-sm font-medium mb-2",children:"⚡ إضافة سريعة:"}),r.jsx("div",{className:"flex flex-wrap gap-2",children:[1,2,3,6,9,12].map(e=>(0,r.jsxs)("button",{type:"button",onClick:()=>f(e),className:"px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg text-sm transition",children:["+ ",e," ",1===e?"شهر":"أشهر"]},e))})]}),null!==v&&r.jsx("div",{className:"bg-white border-2 border-blue-300 rounded-lg p-3",children:(0,r.jsxs)("p",{className:"text-sm",children:[r.jsx("span",{className:"font-medium",children:"\uD83D\uDCCA مدة الاشتراك: "}),(0,r.jsxs)("span",{className:"font-bold text-blue-600",children:[v," يوم",v>=30&&` (${Math.floor(v/30)} ${1===Math.floor(v/30)?"شهر":"أشهر"})`]})]})})]}),(0,r.jsxs)("div",{className:"bg-green-50 border-2 border-green-200 rounded-lg p-4",children:[(0,r.jsxs)("h3",{className:"font-bold text-lg mb-4 flex items-center gap-2",children:[r.jsx("span",{children:"\uD83C\uDF81"}),r.jsx("span",{children:"الخدمات الإضافية"})]}),(0,r.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium mb-1",children:"⚖️ InBody"}),r.jsx("input",{type:"number",min:"0",value:g.inBodyScans,onChange:e=>b({...g,inBodyScans:parseInt(e.target.value)||0}),className:"w-full px-3 py-2 border-2 rounded-lg"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium mb-1",children:"\uD83C\uDF9F️ دعوات"}),r.jsx("input",{type:"number",min:"0",value:g.invitations,onChange:e=>b({...g,invitations:parseInt(e.target.value)||0}),className:"w-full px-3 py-2 border-2 rounded-lg"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium mb-1",children:"\uD83D\uDCAA حصص PT مجانية"}),r.jsx("input",{type:"number",min:"0",value:g.freePTSessions,onChange:e=>b({...g,freePTSessions:parseInt(e.target.value)||0}),className:"w-full px-3 py-2 border-2 rounded-lg"})]})]})]}),(0,r.jsxs)("div",{className:"bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4",children:[(0,r.jsxs)("h3",{className:"font-bold text-lg mb-4 flex items-center gap-2",children:[r.jsx("span",{children:"\uD83D\uDCB0"}),r.jsx("span",{children:"المعلومات المالية"})]}),(0,r.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 mb-4",children:[(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium mb-1",children:"سعر الاشتراك *"}),r.jsx("input",{type:"number",required:!0,min:"0",value:g.subscriptionPrice,onChange:e=>b({...g,subscriptionPrice:parseInt(e.target.value)||0}),className:"w-full px-3 py-2 border-2 rounded-lg",placeholder:"0"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium mb-1",children:"المبلغ المتبقي"}),r.jsx("input",{type:"number",min:"0",value:g.remainingAmount,onChange:e=>b({...g,remainingAmount:parseInt(e.target.value)||0}),className:"w-full px-3 py-2 border-2 rounded-lg",placeholder:"0"})]})]}),(0,r.jsxs)("div",{className:"bg-white border-2 border-yellow-300 rounded-lg p-3",children:[(0,r.jsxs)("div",{className:"flex justify-between items-center mb-2",children:[r.jsx("span",{className:"text-sm font-medium",children:"المبلغ المدفوع:"}),(0,r.jsxs)("span",{className:"font-bold text-green-600 text-lg",children:[j," ج.م"]})]}),(0,r.jsxs)("div",{className:"flex justify-between items-center",children:[r.jsx("span",{className:"text-sm font-medium",children:"المتبقي:"}),(0,r.jsxs)("span",{className:"font-bold text-red-600 text-lg",children:[g.remainingAmount," ج.م"]})]})]}),(0,r.jsxs)("div",{className:"mt-4",children:[r.jsx("label",{className:"block text-sm font-medium mb-2",children:"طريقة الدفع"}),r.jsx(i.ZP,{value:g.paymentMethod,onChange:e=>b({...g,paymentMethod:e})})]})]}),(0,r.jsxs)("div",{className:"bg-gray-50 border-2 border-gray-200 rounded-lg p-4",children:[r.jsx("label",{className:"block text-sm font-medium mb-2",children:"\uD83D\uDCDD ملاحظات"}),r.jsx("textarea",{value:g.notes,onChange:e=>b({...g,notes:e.target.value}),className:"w-full px-3 py-2 border-2 rounded-lg",rows:3,placeholder:"ملاحظات إضافية..."})]}),r.jsx("div",{className:"flex gap-3",children:r.jsx("button",{type:"submit",disabled:t,className:"flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 font-bold text-lg transition",children:t?"⏳ جاري الحفظ...":"✅ حفظ العضو"})}),r.jsx("div",{className:"bg-blue-50 border-2 border-blue-300 rounded-lg p-4 text-center",children:(0,r.jsxs)("p",{className:"text-sm text-blue-800",children:["\uD83D\uDDA8️ ",r.jsx("strong",{children:"ملاحظة:"})," سيتم طباعة الإيصال تلقائياً بعد إضافة العضو بنجاح"]})})]})}function c(){let e=(0,n.useRouter)(),[t,s]=(0,a.useState)([]),[i,d]=(0,a.useState)([]),[c,m]=(0,a.useState)(!1),[p,x]=(0,a.useState)(!0),[u,g]=(0,a.useState)(""),[b,h]=(0,a.useState)(""),[f,y]=(0,a.useState)(""),[v,j]=(0,a.useState)("all"),[D,N]=(0,a.useState)(""),w=async()=>{try{let e=await fetch("/api/members"),t=await e.json();if(Array.isArray(t)){let e=t.map(e=>({...e,memberNumber:parseInt(e.memberNumber?.toString()||"0"),inBodyScans:parseInt(e.inBodyScans?.toString()||"0"),invitations:parseInt(e.invitations?.toString()||"0"),subscriptionPrice:parseInt(e.subscriptionPrice?.toString()||"0"),remainingAmount:parseInt(e.remainingAmount?.toString()||"0")}));s(e),d(e)}else console.error("Invalid data format:",t),s([]),d([])}catch(e){console.error("Error fetching members:",e),s([]),d([])}finally{x(!1)}},C=t=>{e.push(`/members/${t}`)},$=()=>{g(""),h(""),y(""),j("all"),N("")},S={total:t.length,active:t.filter(e=>{let t=!!e.expiryDate&&new Date(e.expiryDate)<new Date;return e.isActive&&!t}).length,expired:t.filter(e=>!!e.expiryDate&&new Date(e.expiryDate)<new Date).length,expiringSoon:t.filter(e=>{let t=(0,l.rY)(e.expiryDate);return null!==t&&t>0&&t<=7}).length,hasRemaining:t.filter(e=>e.remainingAmount>0).length};return(0,r.jsxs)("div",{className:"container mx-auto p-6",dir:"rtl",children:[(0,r.jsxs)("div",{className:"flex justify-between items-center mb-6",children:[r.jsx("h1",{className:"text-3xl font-bold",children:"إدارة الأعضاء"}),r.jsx("button",{onClick:()=>m(!c),className:"bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700",children:c?"إخفاء النموذج":"إضافة عضو جديد"})]}),c&&(0,r.jsxs)("div",{className:"bg-white p-6 rounded-lg shadow-md mb-6",children:[r.jsx("h2",{className:"text-xl font-semibold mb-4",children:"إضافة عضو جديد"}),r.jsx(o,{onSuccess:()=>{w(),m(!1)}})]}),(0,r.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-5 gap-4 mb-6",children:[(0,r.jsxs)("div",{className:"bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-xl shadow-lg",children:[r.jsx("div",{className:"text-3xl font-bold",children:S.total}),r.jsx("div",{className:"text-sm opacity-90",children:"إجمالي الأعضاء"})]}),(0,r.jsxs)("div",{className:"bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-xl shadow-lg",children:[r.jsx("div",{className:"text-3xl font-bold",children:S.active}),r.jsx("div",{className:"text-sm opacity-90",children:"أعضاء نشطين"})]}),(0,r.jsxs)("div",{className:"bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 rounded-xl shadow-lg",children:[r.jsx("div",{className:"text-3xl font-bold",children:S.expiringSoon}),r.jsx("div",{className:"text-sm opacity-90",children:"ينتهي قريباً (7 أيام)"})]}),(0,r.jsxs)("div",{className:"bg-gradient-to-br from-red-500 to-red-600 text-white p-4 rounded-xl shadow-lg",children:[r.jsx("div",{className:"text-3xl font-bold",children:S.expired}),r.jsx("div",{className:"text-sm opacity-90",children:"منتهي الاشتراك"})]}),(0,r.jsxs)("div",{className:"bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-4 rounded-xl shadow-lg",children:[r.jsx("div",{className:"text-3xl font-bold",children:S.hasRemaining}),r.jsx("div",{className:"text-sm opacity-90",children:"عليهم متبقي"})]})]}),(0,r.jsxs)("div",{className:"bg-white p-6 rounded-xl shadow-lg mb-6 border-2 border-purple-200",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,r.jsxs)("h3",{className:"text-xl font-bold flex items-center gap-2",children:[r.jsx("span",{children:"\uD83C\uDFAF"}),r.jsx("span",{children:"فلاتر سريعة"})]}),("all"!==v||D)&&r.jsx("button",{onClick:()=>{j("all"),N("")},className:"bg-purple-100 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 text-sm font-medium",children:"✖️ مسح الفلاتر"})]}),(0,r.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-5 gap-3 mb-4",children:[(0,r.jsxs)("button",{onClick:()=>j("all"),className:`px-4 py-3 rounded-lg font-medium transition ${"all"===v?"bg-blue-600 text-white shadow-lg":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`,children:["\uD83D\uDCCA الكل (",S.total,")"]}),(0,r.jsxs)("button",{onClick:()=>j("active"),className:`px-4 py-3 rounded-lg font-medium transition ${"active"===v?"bg-green-600 text-white shadow-lg":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`,children:["✅ نشط (",S.active,")"]}),(0,r.jsxs)("button",{onClick:()=>j("expiring-soon"),className:`px-4 py-3 rounded-lg font-medium transition ${"expiring-soon"===v?"bg-orange-600 text-white shadow-lg":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`,children:["⚠️ ينتهي قريباً (",S.expiringSoon,")"]}),(0,r.jsxs)("button",{onClick:()=>j("expired"),className:`px-4 py-3 rounded-lg font-medium transition ${"expired"===v?"bg-red-600 text-white shadow-lg":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`,children:["❌ منتهي (",S.expired,")"]}),(0,r.jsxs)("button",{onClick:()=>j("has-remaining"),className:`px-4 py-3 rounded-lg font-medium transition ${"has-remaining"===v?"bg-yellow-600 text-white shadow-lg":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`,children:["\uD83D\uDCB0 عليهم متبقي (",S.hasRemaining,")"]})]}),(0,r.jsxs)("div",{className:"border-t pt-4",children:[r.jsx("label",{className:"block text-sm font-medium mb-2",children:"\uD83D\uDCC5 فلتر حسب تاريخ انتهاء معين"}),(0,r.jsxs)("div",{className:"flex gap-2",children:[r.jsx("input",{type:"date",value:D,onChange:e=>N(e.target.value),className:"flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition"}),D&&r.jsx("button",{onClick:()=>N(""),className:"px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300",children:"✖️"})]}),D&&(0,r.jsxs)("p",{className:"text-sm text-purple-600 mt-2",children:["\uD83D\uDD0D عرض الأعضاء الذين ينتهي اشتراكهم في: ",new Date(D).toLocaleDateString("ar-EG")]})]})]}),(0,r.jsxs)("div",{className:"bg-white p-6 rounded-xl shadow-lg mb-6 border-2 border-blue-200",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,r.jsxs)("h3",{className:"text-xl font-bold flex items-center gap-2",children:[r.jsx("span",{children:"\uD83D\uDD0D"}),r.jsx("span",{children:"بحث مباشر"})]}),(u||b||f)&&r.jsx("button",{onClick:()=>{g(""),h(""),y("")},className:"bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 text-sm font-medium",children:"✖️ مسح البحث"})]}),(0,r.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium mb-2",children:"رقم العضوية (ID)"}),r.jsx("input",{type:"text",value:u,onChange:e=>g(e.target.value),className:"w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition",placeholder:"ابحث برقم العضوية..."})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium mb-2",children:"الاسم"}),r.jsx("input",{type:"text",value:b,onChange:e=>h(e.target.value),className:"w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition",placeholder:"ابحث بالاسم..."})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium mb-2",children:"رقم الهاتف"}),r.jsx("input",{type:"text",value:f,onChange:e=>y(e.target.value),className:"w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition",placeholder:"ابحث برقم الهاتف..."})]})]}),(u||b||f)&&r.jsx("div",{className:"mt-4 text-center",children:(0,r.jsxs)("span",{className:"bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium",children:["\uD83D\uDCCA عرض ",i.length," من ",t.length," عضو"]})})]}),(u||b||f||"all"!==v||D)&&(0,r.jsxs)("div",{className:"bg-yellow-50 border-2 border-yellow-300 p-4 rounded-xl mb-6 flex items-center justify-between",children:[(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[r.jsx("span",{className:"text-2xl",children:"\uD83D\uDD0E"}),(0,r.jsxs)("div",{children:[r.jsx("p",{className:"font-bold text-yellow-800",children:"الفلاتر نشطة"}),(0,r.jsxs)("p",{className:"text-sm text-yellow-700",children:["عرض ",i.length," من ",t.length," عضو"]})]})]}),r.jsx("button",{onClick:$,className:"bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 font-medium",children:"\uD83D\uDDD1️ مسح جميع الفلاتر"})]}),p?r.jsx("div",{className:"text-center py-12",children:"جاري التحميل..."}):(0,r.jsxs)("div",{className:"bg-white rounded-lg shadow-md overflow-hidden",children:[r.jsx("div",{className:"overflow-x-auto",children:(0,r.jsxs)("table",{className:"w-full",children:[r.jsx("thead",{className:"bg-gray-100",children:(0,r.jsxs)("tr",{children:[r.jsx("th",{className:"px-4 py-3 text-right",children:"الصورة"}),r.jsx("th",{className:"px-4 py-3 text-right",children:"رقم العضوية"}),r.jsx("th",{className:"px-4 py-3 text-right",children:"الاسم"}),r.jsx("th",{className:"px-4 py-3 text-right",children:"الهاتف"}),r.jsx("th",{className:"px-4 py-3 text-right",children:"InBody"}),r.jsx("th",{className:"px-4 py-3 text-right",children:"دعوات"}),r.jsx("th",{className:"px-4 py-3 text-right",children:"السعر"}),r.jsx("th",{className:"px-4 py-3 text-right",children:"المتبقي"}),r.jsx("th",{className:"px-4 py-3 text-right",children:"الحالة"}),r.jsx("th",{className:"px-4 py-3 text-right",children:"تاريخ البداية"}),r.jsx("th",{className:"px-4 py-3 text-right",children:"تاريخ الانتهاء"}),r.jsx("th",{className:"px-4 py-3 text-right",children:"إجراءات"})]})}),r.jsx("tbody",{children:Array.isArray(i)&&i.map(e=>{let t=!!e.expiryDate&&new Date(e.expiryDate)<new Date,s=(0,l.rY)(e.expiryDate),a=null!==s&&s>0&&s<=7;return(0,r.jsxs)("tr",{className:"border-t hover:bg-gray-50",children:[r.jsx("td",{className:"px-4 py-3",children:r.jsx("div",{className:"w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100",children:e.profileImage?r.jsx("img",{src:e.profileImage,alt:e.name,className:"w-full h-full object-cover"}):r.jsx("div",{className:"w-full h-full flex items-center justify-center text-gray-400",children:r.jsx("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"})})})})}),(0,r.jsxs)("td",{className:"px-4 py-3 font-bold text-blue-600",children:["#",e.memberNumber]}),r.jsx("td",{className:"px-4 py-3",children:e.name}),r.jsx("td",{className:"px-4 py-3",children:e.phone}),r.jsx("td",{className:"px-4 py-3",children:e.inBodyScans}),r.jsx("td",{className:"px-4 py-3",children:e.invitations}),(0,r.jsxs)("td",{className:"px-4 py-3",children:[e.subscriptionPrice," ج.م"]}),(0,r.jsxs)("td",{className:"px-4 py-3 text-red-600",children:[e.remainingAmount," ج.م"]}),r.jsx("td",{className:"px-4 py-3",children:r.jsx("span",{className:`px-2 py-1 rounded text-sm ${e.isActive&&!t?"bg-green-100 text-green-800":"bg-red-100 text-red-800"}`,children:e.isActive&&!t?"نشط":"منتهي"})}),r.jsx("td",{className:"px-4 py-3",children:r.jsx("span",{className:"text-gray-700 font-mono",children:(0,l.ze)(e.startDate)})}),r.jsx("td",{className:"px-4 py-3",children:e.expiryDate?(0,r.jsxs)("div",{children:[r.jsx("span",{className:`font-mono ${t?"text-red-600 font-bold":a?"text-orange-600 font-bold":""}`,children:(0,l.ze)(e.expiryDate)}),null!==s&&s>0&&(0,r.jsxs)("p",{className:`text-xs ${a?"text-orange-600":"text-gray-500"}`,children:[a&&"⚠️ "," باقي ",s," يوم"]}),t&&null!==s&&(0,r.jsxs)("p",{className:"text-xs text-red-600",children:["❌ منتهي منذ ",Math.abs(s)," يوم"]})]}):"-"}),r.jsx("td",{className:"px-4 py-3",children:r.jsx("button",{onClick:()=>C(e.id),className:"bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition shadow-md hover:shadow-lg font-medium",children:"\uD83D\uDC41️ عرض التفاصيل"})})]},e.id)})})]})}),0===i.length&&!p&&r.jsx("div",{className:"text-center py-12 text-gray-500",children:u||b||f||"all"!==v||D?(0,r.jsxs)(r.Fragment,{children:[r.jsx("div",{className:"text-6xl mb-4",children:"\uD83D\uDD0D"}),r.jsx("p",{className:"text-xl",children:"لا توجد نتائج مطابقة للبحث"}),r.jsx("button",{onClick:$,className:"mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700",children:"مسح جميع الفلاتر"})]}):(0,r.jsxs)(r.Fragment,{children:[r.jsx("div",{className:"text-6xl mb-4",children:"\uD83D\uDCCB"}),r.jsx("p",{className:"text-xl",children:"لا يوجد أعضاء حالياً"})]})})]})]})}},33971:(e,t,s)=>{"use strict";s.d(t,{ZP:()=>a});var r=s(10326);function a({value:e,onChange:t,required:s=!1}){let a=[{value:"cash",label:"كاش \uD83D\uDCB5",icon:"\uD83D\uDCB5",color:"bg-green-100 border-green-500"},{value:"visa",label:"فيزا \uD83D\uDCB3",icon:"\uD83D\uDCB3",color:"bg-blue-100 border-blue-500"},{value:"instapay",label:"إنستا باي \uD83D\uDCF1",icon:"\uD83D\uDCF1",color:"bg-purple-100 border-purple-500"},{value:"wallet",label:"محفظة إلكترونية \uD83D\uDCB0",icon:"\uD83D\uDCB0",color:"bg-orange-100 border-orange-500"}];return(0,r.jsxs)("div",{children:[(0,r.jsxs)("label",{className:"block text-sm font-medium mb-2",children:["طريقة الدفع ",s&&r.jsx("span",{className:"text-red-600",children:"*"})]}),r.jsx("div",{className:"grid grid-cols-2 gap-3",children:a.map(s=>(0,r.jsxs)("button",{type:"button",onClick:()=>t(s.value),className:`
              flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all
              ${e===s.value?`${s.color} border-2 shadow-md scale-105`:"bg-white border-gray-300 hover:border-gray-400"}
            `,children:[r.jsx("span",{className:"text-3xl",children:s.icon}),r.jsx("span",{className:"font-medium text-sm",children:s.label})]},s.value))}),e&&r.jsx("div",{className:"mt-3 text-center",children:(0,r.jsxs)("p",{className:"text-sm text-gray-600",children:["الطريقة المختارة:",r.jsx("span",{className:"font-bold text-blue-600 mr-1",children:a.find(t=>t.value===e)?.label})]})})]})}},58864:(e,t,s)=>{"use strict";function r(e){if(!e)return"-";let t="string"==typeof e?new Date(e):e;if(isNaN(t.getTime()))return"-";let s=t.getFullYear(),r=String(t.getMonth()+1).padStart(2,"0"),a=String(t.getDate()).padStart(2,"0");return`${s}-${r}-${a}`}function a(e,t){let s="string"==typeof e?new Date(e):e;return Math.ceil((("string"==typeof t?new Date(t):t).getTime()-s.getTime())/864e5)}function n(e){if(!e)return null;let t="string"==typeof e?new Date(e):e,s=new Date;return s.setHours(0,0,0,0),a(s,t)}function i(e){if(e<30)return`${e} يوم`;let t=Math.round(e/30);return`${e} يوم (≈ ${t} ${1===t?"شهر":"أشهر"})`}s.d(t,{DL:()=>i,pi:()=>a,rY:()=>n,ze:()=>r})},36977:(e,t,s)=>{"use strict";function r(e){if(!e)return"-";let t="string"==typeof e?new Date(e):e,s=t.getFullYear(),r=String(t.getMonth()+1).padStart(2,"0"),a=String(t.getDate()).padStart(2,"0");return`${s}-${r}-${a}`}function a(e,t,s,a,n,i){let l=n instanceof Date?n:new Date(n);!function(e){let t=function(e){let{receiptNumber:t,type:s,amount:a,details:n,date:i}=e,l=i.toLocaleDateString("ar-EG",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"}),d=s.includes("تجديد")||!0===n.isRenewal,o={cash:"كاش \uD83D\uDCB5",visa:"فيزا \uD83D\uDCB3",instapay:"إنستا باي \uD83D\uDCF1",wallet:"محفظة إلكترونية \uD83D\uDCB0"}[n.paymentMethod||"cash"]||"كاش \uD83D\uDCB5",c=n.staffName||"";return`
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=80mm">
  <title>إيصال ${t}</title>
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
    <p>${s}</p>
    
    ${d?'<div class="type-badge renewal">\uD83D\uDD04 تجديد اشتراك</div>':'<div class="type-badge new">✨ اشتراك جديد</div>'}
    
    <div class="payment-method-badge">${o}</div>
    
    ${c?`<div class="staff-badge">👷 ${c}</div>`:""}
  </div>

  <div class="info-row">
    <strong>رقم الإيصال:</strong>
    <span>#${t}</span>
  </div>
  <div class="info-row">
    <strong>التاريخ:</strong>
    <span>${l}</span>
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
        ${n.startDate?`<p>من: <span class="date-value">${r(n.startDate)}</span></p>`:""}
        ${n.expiryDate?`<p>إلى: <span class="date-value">${r(n.expiryDate)}</span></p>`:""}
        ${n.subscriptionDays?`<p>المدة: <span class="date-value">${n.subscriptionDays} يوم</span></p>`:""}
      </div>
    `:""}
    
    ${d&&(n.newStartDate||n.newExpiryDate)?`
      <div class="renewal-info">
        <p><strong>🔄 معلومات التجديد:</strong></p>
        ${n.newStartDate?`<p>• من: ${r(n.newStartDate)}</p>`:""}
        ${n.newExpiryDate?`<p>• إلى: ${r(n.newExpiryDate)}</p>`:""}
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
    <span>${a} جنيه</span>
  </div>

  <div class="footer">
    ${d?'<p style="color: #10b981; font-weight: bold;">تم تجديد اشتراكك بنجاح \uD83C\uDF89</p>':'<p style="color: #3b82f6; font-weight: bold;">مرحباً بك معنا \uD83C\uDF89</p>'}
    <p style="font-size: 10px; margin-top: 8px;">
      مدة استرداد الأشتراك 24 ساعه
    </p>
  </div>
</body>
</html>
  `}(e),s=window.open("","_blank","width=302,height=600,scrollbars=no");if(!s){alert("يرجى السماح بالنوافذ المنبثقة لطباعة الإيصال");return}s.document.open(),s.document.write(t),s.document.close(),s.onload=function(){setTimeout(()=>{s.focus(),s.print(),s.onafterprint=function(){s.close()},setTimeout(()=>{s.closed||s.close()},1e3)},500)}}({receiptNumber:e,type:t,amount:s,details:i?{...a,paymentMethod:i}:a,date:l})}s.d(t,{p:()=>a})},73441:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>r});let r=(0,s(68570).createProxy)(String.raw`C:\Users\amran\Desktop\gym\gym-management\app\members\page.tsx#default`)},57481:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>a});var r=s(66621);let a=e=>[{type:"image/x-icon",sizes:"16x16",url:(0,r.fillMetadataSegment)(".",e.params,"favicon.ico")+""}]}};var t=require("../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[8948,9206,6621,9797],()=>s(12357));module.exports=r})();