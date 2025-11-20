"use strict";exports.id=2251,exports.ids=[2251],exports.modules={33971:(e,t,i)=>{i.d(t,{ZP:()=>n});var a=i(10326);function n({value:e,onChange:t,required:i=!1}){let n=[{value:"cash",label:"كاش \uD83D\uDCB5",icon:"\uD83D\uDCB5",color:"bg-green-100 border-green-500"},{value:"visa",label:"فيزا \uD83D\uDCB3",icon:"\uD83D\uDCB3",color:"bg-blue-100 border-blue-500"},{value:"instapay",label:"إنستا باي \uD83D\uDCF1",icon:"\uD83D\uDCF1",color:"bg-purple-100 border-purple-500"},{value:"wallet",label:"محفظة إلكترونية \uD83D\uDCB0",icon:"\uD83D\uDCB0",color:"bg-orange-100 border-orange-500"}];return(0,a.jsxs)("div",{children:[(0,a.jsxs)("label",{className:"block text-sm font-medium mb-2",children:["طريقة الدفع ",i&&a.jsx("span",{className:"text-red-600",children:"*"})]}),a.jsx("div",{className:"grid grid-cols-2 gap-3",children:n.map(i=>(0,a.jsxs)("button",{type:"button",onClick:()=>t(i.value),className:`
              flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all
              ${e===i.value?`${i.color} border-2 shadow-md scale-105`:"bg-white border-gray-300 hover:border-gray-400"}
            `,children:[a.jsx("span",{className:"text-3xl",children:i.icon}),a.jsx("span",{className:"font-medium text-sm",children:i.label})]},i.value))}),e&&a.jsx("div",{className:"mt-3 text-center",children:(0,a.jsxs)("p",{className:"text-sm text-gray-600",children:["الطريقة المختارة:",a.jsx("span",{className:"font-bold text-blue-600 mr-1",children:n.find(t=>t.value===e)?.label})]})})]})}},79330:(e,t,i)=>{i.d(t,{e:()=>s});var a=i(10326);i(17577);var n=i(36977);function s({receiptNumber:e,type:t,amount:i,details:s,date:o,paymentMethod:r,onClose:d}){return a.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 no-print",children:(0,a.jsxs)("div",{className:"bg-white rounded-2xl p-6 max-w-md shadow-2xl",children:[(0,a.jsxs)("div",{className:"flex justify-between items-center mb-6",children:[a.jsx("h3",{className:"text-xl font-bold text-gray-800",children:"طباعة الإيصال"}),a.jsx("button",{onClick:d,className:"text-gray-400 hover:text-gray-600 text-3xl font-light transition",children:"\xd7"})]}),a.jsx("div",{className:"bg-gray-50 rounded-lg p-4 mb-6",children:(0,a.jsxs)("div",{className:"text-center text-gray-600",children:[a.jsx("div",{className:"text-5xl mb-3",children:"\uD83D\uDDA8️"}),(0,a.jsxs)("p",{className:"font-medium",children:["إيصال رقم ",(0,a.jsxs)("span",{className:"text-blue-600",children:["#",e]})]})]})}),(0,a.jsxs)("div",{className:"space-y-3",children:[a.jsx("button",{onClick:()=>{(0,n.p)(e,t,i,s,o,r||s.paymentMethod||"cash")},className:"w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium text-lg shadow-md hover:shadow-lg",children:"\uD83D\uDDA8️ طباعة"}),a.jsx("button",{onClick:d,className:"w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium",children:"إغلاق"})]}),a.jsx("div",{className:"mt-4 text-xs text-gray-500 text-center",children:a.jsx("p",{children:"\uD83D\uDCA1 تأكد من تشغيل الطابعة قبل الطباعة"})})]})})}},36977:(e,t,i)=>{function a(e){if(!e)return"-";let t="string"==typeof e?new Date(e):e,i=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${i}-${a}-${n}`}function n(e,t,i,n,s,o){let r=s instanceof Date?s:new Date(s);!function(e){let t=function(e){let{receiptNumber:t,type:i,amount:n,details:s,date:o}=e,r=o.toLocaleDateString("ar-EG",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"}),d=i.includes("تجديد")||!0===s.isRenewal,l={cash:"كاش \uD83D\uDCB5",visa:"فيزا \uD83D\uDCB3",instapay:"إنستا باي \uD83D\uDCF1",wallet:"محفظة إلكترونية \uD83D\uDCB0"}[s.paymentMethod||"cash"]||"كاش \uD83D\uDCB5",p=s.staffName||"";return`
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
    <p>${i}</p>
    
    ${d?'<div class="type-badge renewal">\uD83D\uDD04 تجديد اشتراك</div>':'<div class="type-badge new">✨ اشتراك جديد</div>'}
    
    <div class="payment-method-badge">${l}</div>
    
    ${p?`<div class="staff-badge">👷 ${p}</div>`:""}
  </div>

  <div class="info-row">
    <strong>رقم الإيصال:</strong>
    <span>#${t}</span>
  </div>
  <div class="info-row">
    <strong>التاريخ:</strong>
    <span>${r}</span>
  </div>

  <div class="details">
    <h3>تفاصيل العملية:</h3>
    
    ${s.memberNumber?`
      <div class="member-number">
        رقم العضوية: ${s.memberNumber}
      </div>
    `:""}
    
    ${s.ptNumber?`
      <div class="member-number">
        رقم PT: ${s.ptNumber}
      </div>
    `:""}
    
    ${s.memberName?`
      <div class="detail-item">
        <strong>الاسم:</strong> ${s.memberName}
      </div>
    `:""}
    
    ${s.clientName?`
      <div class="detail-item">
        <strong>العميل:</strong> ${s.clientName}
      </div>
    `:""}
    
    ${s.name?`
      <div class="detail-item">
        <strong>الاسم:</strong> ${s.name}
      </div>
    `:""}
    
    ${s.startDate||s.expiryDate?`
      <div class="date-box">
        <p><strong>📅 فترة الاشتراك:</strong></p>
        ${s.startDate?`<p>من: <span class="date-value">${a(s.startDate)}</span></p>`:""}
        ${s.expiryDate?`<p>إلى: <span class="date-value">${a(s.expiryDate)}</span></p>`:""}
        ${s.subscriptionDays?`<p>المدة: <span class="date-value">${s.subscriptionDays} يوم</span></p>`:""}
      </div>
    `:""}
    
    ${d&&(s.newStartDate||s.newExpiryDate)?`
      <div class="renewal-info">
        <p><strong>🔄 معلومات التجديد:</strong></p>
        ${s.newStartDate?`<p>• من: ${a(s.newStartDate)}</p>`:""}
        ${s.newExpiryDate?`<p>• إلى: ${a(s.newExpiryDate)}</p>`:""}
        ${s.subscriptionDays?`<p>• المدة: ${s.subscriptionDays} يوم</p>`:""}
      </div>
    `:""}
    
    ${d&&(void 0!==s.oldSessionsRemaining||void 0!==s.newSessionsRemaining)?`
      <div class="renewal-info">
        <p><strong>🔄 تفاصيل التجديد:</strong></p>
        ${void 0!==s.oldSessionsRemaining?`<p>• الجلسات قبل التجديد: ${s.oldSessionsRemaining}</p>`:""}
        ${void 0!==s.newSessionsRemaining?`<p>• الجلسات بعد التجديد: ${s.newSessionsRemaining}</p>`:""}
      </div>
    `:""}
    
    ${s.subscriptionPrice?`
      <div class="detail-item">
        <strong>سعر الاشتراك:</strong> ${s.subscriptionPrice} جنيه
      </div>
    `:""}
    
    ${s.sessionsPurchased?`
      <div class="detail-item">
        <strong>عدد الجلسات:</strong> ${s.sessionsPurchased}
      </div>
      ${s.pricePerSession?`
        <div class="detail-item">
          <strong>سعر الجلسة:</strong> ${s.pricePerSession} جنيه
        </div>
      `:""}
    `:""}
    
    ${s.coachName?`
      <div class="detail-item">
        <strong>المدرب:</strong> ${s.coachName}
      </div>
    `:""}
    
    ${s.staffName?`
      <div>
        <strong> الموظف المسجل:</strong> ${s.staffName}
      </div>
    `:""}
    
    ${s.serviceType?`
      <div class="detail-item">
        <strong>نوع الخدمة:</strong> ${"DayUse"===s.serviceType?"يوم استخدام":"InBody"}
      </div>
    `:""}
    
    ${void 0!==s.paidAmount?`
      <div class="detail-item">
        <strong>المبلغ المدفوع:</strong> ${s.paidAmount} جنيه
      </div>
    `:""}
    
    ${s.remainingAmount&&s.remainingAmount>0?`
      <div class="detail-item remaining">
        <strong>المتبقي:</strong> ${s.remainingAmount} جنيه
      </div>
    `:""}
  </div>

  <div class="total">
    <span>الإجمالي:</span>
    <span>${n} جنيه</span>
  </div>

  <div class="footer">
    ${d?'<p style="color: #10b981; font-weight: bold;">تم تجديد اشتراكك بنجاح \uD83C\uDF89</p>':'<p style="color: #3b82f6; font-weight: bold;">مرحباً بك معنا \uD83C\uDF89</p>'}
    <p style="font-size: 10px; margin-top: 8px;">
      مدة استرداد الأشتراك 24 ساعه
    </p>
  </div>
</body>
</html>
  `}(e),i=window.open("","_blank","width=302,height=600,scrollbars=no");if(!i){alert("يرجى السماح بالنوافذ المنبثقة لطباعة الإيصال");return}i.document.open(),i.document.write(t),i.document.close(),i.onload=function(){setTimeout(()=>{i.focus(),i.print(),i.onafterprint=function(){i.close()},setTimeout(()=>{i.closed||i.close()},1e3)},500)}}({receiptNumber:e,type:t,amount:i,details:o?{...n,paymentMethod:o}:n,date:r})}i.d(t,{p:()=>n})},57481:(e,t,i)=>{i.r(t),i.d(t,{default:()=>n});var a=i(66621);let n=e=>[{type:"image/x-icon",sizes:"16x16",url:(0,a.fillMetadataSegment)(".",e.params,"favicon.ico")+""}]}};