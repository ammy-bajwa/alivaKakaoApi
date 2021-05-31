(this["webpackJsonpaliva-kakao-client-ts"]=this["webpackJsonpaliva-kakao-client-ts"]||[]).push([[0],{34:function(e,t,n){},39:function(e,t,n){},40:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),c=n(16),s=n.n(c),o=n(5),i=(n(34),n(24)),l=n(25),u=n(4),d={user:{email:"",chatList:{},accessToken:""},chat:[],currentFocus:"",ws:null,loading:!1},b=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||i.a,m=Object(i.b)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN":return console.log(t),e=Object(u.a)(Object(u.a)({},e),{},{user:t.payload});case"LOGOUT":return e;case"LOAD_CHAT":return e=Object(u.a)(Object(u.a)({},e),{},{chat:e.user.chatList[t.payload].messages});case"START_LOADING":return e=Object(u.a)(Object(u.a)({},e),{},{loading:!0});case"STOP_LOADING":return e=Object(u.a)(Object(u.a)({},e),{},{loading:!1});case"SET_FOCUSED_USER":return e=Object(u.a)(Object(u.a)({},e),{},{currentFocus:t.payload});case"SET_WS":return e=Object(u.a)(Object(u.a)({},e),{},{ws:t.payload});case"NEW_MESSAGE":var n=t.payload,a=n.receiverUserName,r=n.message,c=n.senderName;return e=Object(u.a)(Object(u.a)({},e),{},{chat:[].concat(Object(l.a)(e.chat),[Object(u.a)(Object(u.a)({receiverUserName:a},r),{},{senderName:c})])});default:return e}}),b()),j=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,46)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),a(e),r(e),c(e),s(e)}))},O=n(10),p=n(3),h=n(6),f=n.n(h),v=n(12),x={12:"LOGIN_FAILED_REASON",13:"TOO_MANY_TRY_LOGIN",30:"LOGIN_FAILED",32:"MOBILE_UNREGISTERED","-100":"DEVICE_NOT_REGISTERED","-101":"ANOTHER_LOGON","-102":"DEVICE_REGISTER_FAILED","-110":"INVALID_DEVICE_REGISTER","-111":"INCORRECT_PASSCODE","-112":"PASSCODE_REQUEST_FAILED","-997":"ACCOUNT_RESTRICTED"},g=function(){var e=Object(v.a)(f.a.mark((function e(t,n,a,r){var c;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=new Promise(function(){var e=Object(v.a)(f.a.mark((function e(c,s){var o,i,l;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,o={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,password:n,deviceName:a,deviceId:r})},e.next=4,fetch("/login",o);case 4:return i=e.sent,e.next=7,i.json();case 7:(i=e.sent).error?((l=x["".concat(i.error)])||(l=i.message),console.log("result errorMessage: ",l),s(l)):(console.log("result: ",i),c(i)),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),s(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(t,n){return e.apply(this,arguments)}}()),e.next=3,c;case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t,n,a,r){return e.apply(this,arguments)}}(),N=function(e){return{type:"LOGIN",payload:e}},y=function(e){return{type:"NEW_MESSAGE",payload:e}},E=function(){m.dispatch({type:"STOP_LOADING"})},S=n(0),I=Object(o.b)((function(e){return{chatList:e.user.chatList}}))((function(e){var t=Object(p.g)(),n=function(){var n=Object(v.a)(f.a.mark((function n(a){var r,c,s,o,i,l,u,d,b;return f.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(a.preventDefault(),r=document.getElementById("userEmail"),c=r.value,s=document.getElementById("userPassword"),o=s.value,i=localStorage.getItem("deviceName")||"",l=localStorage.getItem("deviceId")||"",i&&l){n.next=11;break}alert("Please register device first"),n.next=23;break;case 11:return m.dispatch({type:"START_LOADING"}),n.next=14,g(c,o,i,l);case 14:u=n.sent,console.log("user: ",u),d=window.location.origin.replace(/^http/,"ws"),(b=new WebSocket(d)).onopen=function(){console.log("Socket is open"),b.send(JSON.stringify({key:"setEmail",value:c})),e.dispatch({type:"SET_WS",payload:b})},b.onmessage=function(t){try{var n=JSON.parse(t.data);if("newMesssage"===n.key){var a=n.text,r=n.sender,c=n.receiverUser,s={text:a,sender:r,receiverUser:c,sendAt:n.sendAt};console.log("We have a message: ",s);var o=Object.keys(c)[0];e.dispatch(y({receiverUserName:o,message:{text:a,received:!0},senderName:r.nickname}))}}catch(i){console.log(i),E(),console.log("We have a message: ",t.data)}},e.dispatch(N(u)),t.push("/"),E();case 23:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}();return Object(S.jsxs)("form",{className:"m-3",onSubmit:n,children:[Object(S.jsxs)("div",{className:"mb-3",children:[Object(S.jsx)("label",{htmlFor:"userEmail",className:"form-label",children:"Email address"}),Object(S.jsx)("input",{type:"email",className:"form-control",id:"userEmail",required:!0,"aria-describedby":"emailHelp"}),Object(S.jsx)("div",{id:"emailHelp",className:"form-text",children:"We'll never share your email with anyone else."})]}),Object(S.jsxs)("div",{className:"mb-3",children:[Object(S.jsx)("label",{htmlFor:"userPassword",className:"form-label",children:"Password"}),Object(S.jsx)("input",{type:"password",className:"form-control",autoComplete:"true",required:!0,id:"userPassword"})]}),Object(S.jsx)("button",{type:"submit",className:"btn btn-outline-dark m-2",children:"Login"}),Object(S.jsx)(O.b,{to:"/register",children:Object(S.jsx)("button",{type:"submit",className:"btn btn-outline-info",children:"Register Device"})})]})})),w=n(45),k=function(){var e=Object(v.a)(f.a.mark((function e(t,n,a,r){var c,s,o;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({deviceName:t,deviceId:n,email:a,password:r})},e.next=3,fetch("/device/sendCode",c);case 3:return s=e.sent,e.next=6,s.json();case 6:(s=e.sent).error?(o=s.message,console.log("result: ",o)):console.log(s.message);case 8:case"end":return e.stop()}}),e)})));return function(t,n,a,r){return e.apply(this,arguments)}}(),T=function(){var e=Object(v.a)(f.a.mark((function e(t,n,a){var r,c,s;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:t,email:n,password:a})},e.next=3,fetch("/device/setCode",r);case 3:return c=e.sent,e.next=6,c.json();case 6:(c=e.sent).error?((s=x["".concat(c.error)])||(s=c.message),console.log("result: ",c),console.log("errorMessage: ",s)):console.log(c);case 8:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),C=function(){var e=function(){var e=Object(v.a)(f.a.mark((function e(t){var n,a,r,c,s,o,i;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),n=document.getElementById("userEmail"),a=n.value,r=document.getElementById("userPassword"),c=r.value,s=document.getElementById("machineName"),o=s.value,i=(i=Object(w.a)()).split("-").join(""),console.log("deviceId: ",i),e.next=12,k(o,i,a,c);case 12:localStorage.setItem("deviceName",o),localStorage.setItem("deviceId",i),console.log("deviceName: ",o),console.log("deviceId: ",i);case 16:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),t=function(){var e=Object(v.a)(f.a.mark((function e(t){var n,a,r,c,s,o;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),n=document.getElementById("userEmail"),a=n.value,r=document.getElementById("userPassword"),c=r.value,s=document.getElementById("registerCode"),o=s.value,e.next=9,T(o,a,c);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(S.jsxs)("div",{children:[Object(S.jsxs)("form",{className:"m-3",onSubmit:e,children:[Object(S.jsxs)("div",{className:"mb-3",children:[Object(S.jsx)("label",{htmlFor:"userEmail",className:"form-label",children:"Email address"}),Object(S.jsx)("input",{type:"email",className:"form-control",id:"userEmail",required:!0,"aria-describedby":"emailHelp"}),Object(S.jsx)("div",{id:"emailHelp",className:"form-text",children:"We'll never share your email with anyone else."})]}),Object(S.jsxs)("div",{className:"mb-3",children:[Object(S.jsx)("label",{htmlFor:"userPassword",className:"form-label",children:"Password"}),Object(S.jsx)("input",{type:"password",className:"form-control",autoComplete:"true",required:!0,id:"userPassword"})]}),Object(S.jsxs)("div",{className:"mb-3",children:[Object(S.jsx)("label",{htmlFor:"machineName",className:"form-label",children:"Enter Device Name To Save"}),Object(S.jsx)("input",{type:"text",className:"form-control",placeholder:"Office Pc",id:"machineName",required:!0})]}),Object(S.jsx)("button",{type:"submit",className:"btn btn-outline-dark m-2",children:"Send Code"}),Object(S.jsx)(O.b,{to:"/login",children:Object(S.jsx)("button",{type:"submit",className:"btn btn-outline-info",children:"Login"})})]}),Object(S.jsxs)("form",{className:"m-3",onSubmit:t,children:[Object(S.jsxs)("div",{className:"mb-3",children:[Object(S.jsx)("label",{htmlFor:"registerCode",className:"form-label",children:"Enter code"}),Object(S.jsx)("input",{type:"number",placeholder:"1234",className:"form-control",id:"registerCode",required:!0})]}),Object(S.jsx)("button",{type:"submit",className:"btn btn-outline-dark m-2",children:"Register"})]})]})},L=n.p+"static/media/profile.a9136072.png",_=(n(39),function(e){var t=e.name,n=e.profileImage,a=e.onClickHandler,r=Object(o.d)((function(e){return e.currentFocus}));return Object(S.jsxs)("div",{className:"chatListItemContainer border d-flex flex-row w-10 m-2 p-2 ".concat(r===t&&"focusedContact"),onClick:a,children:[Object(S.jsx)("img",{src:n||L,className:"rounded-circle profileWidth",alt:"profileImage"}),Object(S.jsx)("h3",{className:"d-inline contactName",children:t})]})}),D=(n(40),function(e){var t=Object(o.d)((function(e){return console.log("useSelector"),e.chat}));return Object(S.jsxs)("div",{className:"ChatWindowContainer m-2",children:[console.log("props: ",e),Object(S.jsx)("h1",{children:"Chat Window"}),t.map((function(e,t){var n=e.text,a=e.received,r=e.receiverUserName,c=e.senderName;return Object(S.jsx)("div",{className:a?"d-flex border-bottom m-2":"d-flex flex-row-reverse",children:Object(S.jsxs)("span",{className:a?"receiverMessage m-2 p-2 d-block w-100":"senderMessage m-2 p-2 d-block",children:[Object(S.jsx)("b",{children:"text: "}),n,Object(S.jsx)("b",{children:" from: "}),c,Object(S.jsx)("b",{children:" to: "}),r]})},t)}))]})}),A=n(26),P=(n(41),function(){var e=Object(o.d)((function(e){return e.currentFocus})),t=Object(o.d)((function(e){return e.user.email})),n=Object(o.d)((function(e){return e.user.chatList})),r=Object(o.d)((function(e){return e.ws})),c=Object(o.c)(),s=Object(a.useState)(""),i=Object(A.a)(s,2),l=i[0],u=i[1];return Object(S.jsx)("div",{className:"messageInputContainer",children:Object(S.jsx)("form",{onSubmit:function(a){if(a.preventDefault(),e){console.log(e);var s=n[e].channelId;r.send(JSON.stringify({key:"newMessage",value:{message:l,receiver:e,email:t,channelId:s}})),c(y({receiverUserName:e,message:{text:l,received:!0},senderName:"Self"}))}else alert("Please a contact first")},children:Object(S.jsxs)("div",{className:"m-2",children:[Object(S.jsx)("input",{type:"text",className:"form-control",onInput:function(e){return u(e.target.value)},required:!0}),Object(S.jsx)("button",{className:"btn btn-info mt-2",type:"submit",children:"Send"})]})})})}),R=function(){return Object(S.jsxs)("div",{children:[Object(S.jsx)(D,{}),Object(S.jsx)(P,{})]})},F=(n(42),Object(o.b)((function(e){return{user:e.user}}))((function(e){return Object(S.jsxs)("div",{className:"d-flex",id:"homeMainContainer",children:[Object(S.jsx)("div",{className:"chatListContainer border d-flex flex-column flex-wrap m-2 justify-content-center",children:e.user.chatList?function(){var t=[],n=0,a=e.user.chatList;for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&function(){var c=a[r];t.push(Object(S.jsx)(_,{profileImage:c.displayUserList[0].profileURL,name:c.displayUserList[0].nickname,onClickHandler:function(){return t=c.displayUserList[0].nickname,void e.dispatch(function(e){return{type:"SET_FOCUSED_USER",payload:e}}(t));var t}},n)),n++}();return t}():""}),Object(S.jsx)("div",{className:"border m-2 messageContainer",children:Object(S.jsx)(R,{})})]})}))),U=function(){return Object(S.jsxs)(S.Fragment,{children:[Object(S.jsx)("li",{className:"nav-item",children:Object(S.jsx)(O.b,{className:"nav-link active","aria-current":"page",to:"/",children:"Home"})}),Object(S.jsx)("li",{className:"nav-item",children:Object(S.jsx)("span",{className:"nav-link active",children:"Logout"})})]})},G=function(){return Object(S.jsx)(S.Fragment,{children:Object(S.jsx)("li",{className:"nav-item",children:Object(S.jsx)(O.b,{className:"nav-link active",to:"/login",children:"Login"})})})},M=Object(o.b)((function(e){return{token:e.user.accessToken}}))((function(e){var t=e.token;return Object(S.jsx)("nav",{className:"navbar navbar-expand-lg navbar-dark bg-dark",children:Object(S.jsxs)("div",{className:"container-fluid",children:[Object(S.jsx)("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#alivaNavbar","aria-controls":"alivaNavbar","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(S.jsx)("span",{className:"navbar-toggler-icon"})}),Object(S.jsxs)("div",{className:"collapse navbar-collapse",id:"alivaNavbar",children:[Object(S.jsx)(O.b,{className:"navbar-brand",to:"/",children:"AlivaTech"}),Object(S.jsx)("ul",{className:"navbar-nav me-auto mb-2 mb-lg-0",children:t?Object(S.jsx)(U,{}):Object(S.jsx)(G,{})})]})]})})})),W=n(19),B=function(e){var t=e.component,n=(e.token,Object(W.a)(e,["component","token"]));return Object(S.jsx)(p.b,Object(u.a)(Object(u.a)({},n),{},{render:function(e){return Object(S.jsx)(t,Object(u.a)({},e))}}))},H=Object(o.b)((function(e){return{token:e.user.accessToken}}))((function(e){var t=e.component,n=e.token,a=Object(W.a)(e,["component","token"]);return Object(S.jsx)(p.b,Object(u.a)(Object(u.a)({},a),{},{render:function(e){return n?Object(S.jsx)(t,Object(u.a)({},e)):Object(S.jsx)(p.a,{to:{pathname:"/login"}})}}))})),J=function(){return Object(o.d)((function(e){return e.loading}))?Object(S.jsx)("div",{children:Object(S.jsx)("h1",{children:"Loading .........."})}):Object(S.jsx)("div",{children:Object(S.jsxs)(O.a,{children:[Object(S.jsx)(M,{}),Object(S.jsxs)(p.d,{children:[Object(S.jsx)(B,{path:"/login",component:I}),Object(S.jsx)(B,{path:"/register",component:C}),Object(S.jsx)(H,{path:"/",component:F})]})]})})};s.a.render(Object(S.jsx)(r.a.StrictMode,{children:Object(S.jsx)(o.a,{store:m,children:Object(S.jsx)(J,{})})}),document.getElementById("root")),j()}},[[43,1,2]]]);
//# sourceMappingURL=main.7cf08f22.chunk.js.map