(this["webpackJsonpaliva-kakao-client-ts"]=this["webpackJsonpaliva-kakao-client-ts"]||[]).push([[0],{34:function(e,t,n){},39:function(e,t,n){},40:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),c=n(16),s=n.n(c),o=n(5),i=(n(34),n(24)),l=n(25),u=n(4),d={user:{email:"",chatList:{},accessToken:""},chat:[],currentFocus:"",ws:null,loading:!1},b=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||i.a,m=Object(i.b)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN":return console.log(t),e=Object(u.a)(Object(u.a)({},e),{},{user:t.payload});case"LOGOUT":return e;case"LOAD_CHAT":return e=Object(u.a)(Object(u.a)({},e),{},{chat:e.user.chatList[t.payload].messages});case"START_LOADING":return e=Object(u.a)(Object(u.a)({},e),{},{loading:!0});case"STOP_LOADING":return e=Object(u.a)(Object(u.a)({},e),{},{loading:!1});case"SET_FOCUSED_USER":return e=Object(u.a)(Object(u.a)({},e),{},{currentFocus:t.payload});case"SET_WS":return e=Object(u.a)(Object(u.a)({},e),{},{ws:t.payload});case"NEW_MESSAGE":var n=t.payload,r=n.receiverUserName,a=n.message,c=n.senderName;return e=Object(u.a)(Object(u.a)({},e),{},{chat:[].concat(Object(l.a)(e.chat),[Object(u.a)(Object(u.a)({receiverUserName:r},a),{},{senderName:c})])});default:return e}}),b()),j=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,46)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),r(e),a(e),c(e),s(e)}))},O=n(10),p=n(3),h=n(6),v=n.n(h),f=n(11),x={12:"LOGIN_FAILED_REASON",13:"TOO_MANY_TRY_LOGIN",30:"LOGIN_FAILED",32:"MOBILE_UNREGISTERED","-100":"DEVICE_NOT_REGISTERED","-101":"ANOTHER_LOGON","-102":"DEVICE_REGISTER_FAILED","-110":"INVALID_DEVICE_REGISTER","-111":"INCORRECT_PASSCODE","-112":"PASSCODE_REQUEST_FAILED","-997":"ACCOUNT_RESTRICTED"},g=function(){var e=Object(f.a)(v.a.mark((function e(t,n,r,a){var c;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=new Promise(function(){var e=Object(f.a)(v.a.mark((function e(c,s){var o,i,l,u;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,o={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,password:n,deviceName:r,deviceId:a})},i="",i="/login",e.next=6,fetch(i,o);case 6:return l=e.sent,e.next=9,l.json();case 9:(l=e.sent).error?((u=x["".concat(l.error)])||(u=l.message),alert(u),console.log("result errorMessage: ",u),s(u)):(console.log("result: ",l),c(l)),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),s(e.t0);case 16:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(t,n){return e.apply(this,arguments)}}()),e.next=3,c;case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t,n,r,a){return e.apply(this,arguments)}}(),N=function(e){return{type:"LOGIN",payload:e}},y=function(e){return{type:"NEW_MESSAGE",payload:e}},E=function(){m.dispatch({type:"STOP_LOADING"})},S=n(0),w=Object(o.b)((function(e){return{chatList:e.user.chatList}}))((function(e){var t=Object(p.g)(),n=function(){var n=Object(f.a)(v.a.mark((function n(r){var a,c,s,o,i,l,u,d,b,j,O;return v.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(r.preventDefault(),a=document.getElementById("userEmail"),c=a.value,s=document.getElementById("userPassword"),o=s.value,i=localStorage.getItem(c)){n.next=10;break}alert("Please register device first"),n.next=33;break;case 10:return n.prev=10,m.dispatch({type:"START_LOADING"}),l=JSON.parse(i),u=l.deviceName,d=l.deviceId,n.next=15,g(c,o,u,d);case 15:b=n.sent,console.log("user: ",b),j="",j=window.location.origin.replace(/^http/,"ws"),(O=new WebSocket(j)).onopen=function(){console.log("Socket is open"),O.send(JSON.stringify({key:"setEmail",value:c})),e.dispatch({type:"SET_WS",payload:O})},O.onmessage=function(t){try{var n=JSON.parse(t.data);if("newMesssage"===n.key){var r=n.text,a=n.sender,c=n.receiverUser,s={text:r,sender:a,receiverUser:c,sendAt:n.sendAt};console.log("We have a message: ",s);var o=Object.keys(c)[0];e.dispatch(y({receiverUserName:o,message:{text:r,received:!0},senderName:a.nickname}))}}catch(i){console.log(i),E(),console.log("We have a message: ",t.data)}},O.onerror=function(){alert("Socket has error")},O.onclose=function(){alert("Socket is closed")},e.dispatch(N(b)),t.push("/"),E(),n.next=33;break;case 29:n.prev=29,n.t0=n.catch(10),E(),console.error(n.t0);case 33:case"end":return n.stop()}}),n,null,[[10,29]])})));return function(e){return n.apply(this,arguments)}}();return Object(S.jsxs)("form",{className:"m-3",onSubmit:n,children:[Object(S.jsxs)("div",{className:"mb-3",children:[Object(S.jsx)("label",{htmlFor:"userEmail",className:"form-label",children:"Email address"}),Object(S.jsx)("input",{type:"email",className:"form-control",id:"userEmail",required:!0,"aria-describedby":"emailHelp"}),Object(S.jsx)("div",{id:"emailHelp",className:"form-text",children:"We'll never share your email with anyone else."})]}),Object(S.jsxs)("div",{className:"mb-3",children:[Object(S.jsx)("label",{htmlFor:"userPassword",className:"form-label",children:"Password"}),Object(S.jsx)("input",{type:"password",className:"form-control",autoComplete:"true",required:!0,id:"userPassword"})]}),Object(S.jsx)("button",{type:"submit",className:"btn btn-outline-dark m-2",children:"Login"}),Object(S.jsx)(O.b,{to:"/register",children:Object(S.jsx)("button",{type:"submit",className:"btn btn-outline-info",children:"Register Device"})})]})})),k=n(45),I=function(){var e=Object(f.a)(v.a.mark((function e(t,n,r,a){var c,s,o,i;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({deviceName:t,deviceId:n,email:r,password:a})},s="",s="/device/sendCode",e.next=5,fetch(s,c);case 5:return o=e.sent,e.next=8,o.json();case 8:(o=e.sent).error?(i=o.message,alert(i),console.log("result: ",i)):(alert(o.message),console.log(o.message));case 10:case"end":return e.stop()}}),e)})));return function(t,n,r,a){return e.apply(this,arguments)}}(),T=function(){var e=Object(f.a)(v.a.mark((function e(t,n,r){var a;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=new Promise(function(){var e=Object(f.a)(v.a.mark((function e(a,c){var s,o,i,l;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:t,email:n,password:r})},o="",o="/device/setCode",e.next=5,fetch(o,s);case 5:return i=e.sent,e.next=8,i.json();case 8:(i=e.sent).error?((l=x["".concat(i.error)])||(l=i.message),alert(l),console.log("result: ",i),console.log("errorMessage: ",l),c(l)):(a(i.message),alert(i.message),console.log(i));case 10:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),e.next=3,a;case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),C=function(){var e=Object(p.g)(),t=function(){var e=Object(f.a)(v.a.mark((function e(t){var n,r,a,c,s,o,i;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),n=document.getElementById("userEmail"),r=n.value,a=document.getElementById("userPassword"),c=a.value,s=document.getElementById("machineName"),o=s.value,i=(i=Object(k.a)()).split("-").join(""),console.log("deviceId: ",i),e.prev=10,e.next=13,I(o,i,r,c);case 13:localStorage.setItem(r,JSON.stringify({deviceName:o,deviceId:i})),console.log("deviceName: ",o),console.log("deviceId: ",i),e.next=21;break;case 18:e.prev=18,e.t0=e.catch(10),console.error(e.t0);case 21:case"end":return e.stop()}}),e,null,[[10,18]])})));return function(t){return e.apply(this,arguments)}}(),n=function(){var t=Object(f.a)(v.a.mark((function t(n){var r,a,c,s,o,i;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),r=document.getElementById("userEmail"),a=r.value,c=document.getElementById("userPassword"),s=c.value,o=document.getElementById("registerCode"),i=o.value,t.prev=7,t.next=10,T(i,a,s);case 10:e.push("/login"),t.next=16;break;case 13:t.prev=13,t.t0=t.catch(7),console.error(t.t0);case 16:case"end":return t.stop()}}),t,null,[[7,13]])})));return function(e){return t.apply(this,arguments)}}();return Object(S.jsxs)("div",{children:[Object(S.jsxs)("form",{className:"m-3",onSubmit:t,children:[Object(S.jsxs)("div",{className:"mb-3",children:[Object(S.jsx)("label",{htmlFor:"userEmail",className:"form-label",children:"Email address"}),Object(S.jsx)("input",{type:"email",className:"form-control",id:"userEmail",required:!0,"aria-describedby":"emailHelp"}),Object(S.jsx)("div",{id:"emailHelp",className:"form-text",children:"We'll never share your email with anyone else."})]}),Object(S.jsxs)("div",{className:"mb-3",children:[Object(S.jsx)("label",{htmlFor:"userPassword",className:"form-label",children:"Password"}),Object(S.jsx)("input",{type:"password",className:"form-control",autoComplete:"true",required:!0,id:"userPassword"})]}),Object(S.jsxs)("div",{className:"mb-3",children:[Object(S.jsx)("label",{htmlFor:"machineName",className:"form-label",children:"Enter Device Name To Save"}),Object(S.jsx)("input",{type:"text",className:"form-control",placeholder:"Office Pc",id:"machineName",required:!0})]}),Object(S.jsx)("button",{type:"submit",className:"btn btn-outline-dark m-2",children:"Send Code"}),Object(S.jsx)(O.b,{to:"/login",children:Object(S.jsx)("button",{type:"submit",className:"btn btn-outline-info",children:"Login"})})]}),Object(S.jsxs)("form",{className:"m-3",onSubmit:n,children:[Object(S.jsxs)("div",{className:"mb-3",children:[Object(S.jsx)("label",{htmlFor:"registerCode",className:"form-label",children:"Enter code"}),Object(S.jsx)("input",{type:"number",placeholder:"1234",className:"form-control",id:"registerCode",required:!0})]}),Object(S.jsx)("button",{type:"submit",className:"btn btn-outline-dark m-2",children:"Register"})]})]})},L=n.p+"static/media/profile.a9136072.png",_=(n(39),function(e){var t=e.name,n=e.profileImage,r=e.onClickHandler,a=Object(o.d)((function(e){return e.currentFocus}));return Object(S.jsxs)("div",{className:"chatListItemContainer border d-flex flex-row w-10 m-2 p-2 ".concat(a===t&&"focusedContact"),onClick:r,children:[Object(S.jsx)("img",{src:n||L,className:"rounded-circle profileWidth",alt:"profileImage"}),Object(S.jsx)("h3",{className:"d-inline contactName",children:t})]})}),D=(n(40),function(e){var t=Object(o.d)((function(e){return console.log("useSelector"),e.chat}));return Object(S.jsxs)("div",{className:"chatWindowContainer m-2",children:[console.log("props: ",e),Object(S.jsx)("h1",{children:"Chat Window"}),t.map((function(e,t){var n=e.text,r=e.received,a=e.receiverUserName,c=e.senderName;return Object(S.jsx)("div",{className:r?"d-flex border-bottom m-2":"d-flex flex-row-reverse",children:Object(S.jsxs)("span",{className:r?"receiverMessage m-2 p-2 d-block w-100":"senderMessage m-2 p-2 d-block",children:[Object(S.jsx)("b",{children:"text: "}),n,Object(S.jsx)("b",{children:" from: "}),c,Object(S.jsx)("b",{children:" to: "}),a]})},t)}))]})}),P=n(26),A=(n(41),function(){var e=Object(o.d)((function(e){return e.currentFocus})),t=Object(o.d)((function(e){return e.user.email})),n=Object(o.d)((function(e){return e.user.chatList})),a=Object(o.d)((function(e){return e.ws})),c=Object(o.c)(),s=Object(r.useState)(""),i=Object(P.a)(s,2),l=i[0],u=i[1];return Object(S.jsx)("div",{className:"messageInputContainer",children:Object(S.jsx)("form",{onSubmit:function(r){if(r.preventDefault(),e){console.log(e);var s=n[e].channelId;a.send(JSON.stringify({key:"newMessage",value:{message:l,receiver:e,email:t,channelId:s}})),c(y({receiverUserName:e,message:{text:l,received:!0},senderName:"Self"}))}else alert("Please a contact first")},children:Object(S.jsxs)("div",{className:"m-2",children:[Object(S.jsx)("input",{type:"text",className:"form-control",onInput:function(e){return u(e.target.value)},required:!0}),Object(S.jsx)("button",{className:"btn btn-info mt-2",type:"submit",children:"Send"})]})})})}),R=function(){return Object(S.jsxs)("div",{children:[Object(S.jsx)(D,{}),Object(S.jsx)(A,{})]})},F=(n(42),Object(o.b)((function(e){return{user:e.user}}))((function(e){return Object(S.jsxs)("div",{className:"d-flex",id:"homeMainContainer",children:[Object(S.jsx)("div",{className:"chatListContainer border d-flex flex-column flex-wrap m-2 justify-content-center",children:e.user.chatList?function(){var t=[],n=0,r=e.user.chatList;for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&function(){var c=r[a];t.push(Object(S.jsx)(_,{profileImage:c.displayUserList[0].profileURL,name:c.displayUserList[0].nickname,onClickHandler:function(){return t=c.displayUserList[0].nickname,void e.dispatch(function(e){return{type:"SET_FOCUSED_USER",payload:e}}(t));var t}},n)),n++}();return t}():""}),Object(S.jsx)("div",{className:"border m-2 messageContainer",children:Object(S.jsx)(R,{})})]})}))),U=function(){return Object(S.jsxs)(S.Fragment,{children:[Object(S.jsx)("li",{className:"nav-item",children:Object(S.jsx)(O.b,{className:"nav-link active","aria-current":"page",to:"/",children:"Home"})}),Object(S.jsx)("li",{className:"nav-item",children:Object(S.jsx)("span",{className:"nav-link active",children:"Logout"})})]})},G=function(){return Object(S.jsx)(S.Fragment,{children:Object(S.jsx)("li",{className:"nav-item",children:Object(S.jsx)(O.b,{className:"nav-link active",to:"/login",children:"Login"})})})},M=Object(o.b)((function(e){return{token:e.user.accessToken}}))((function(e){var t=e.token;return Object(S.jsx)("nav",{className:"navbar navbar-expand-lg navbar-dark bg-dark",children:Object(S.jsxs)("div",{className:"container-fluid",children:[Object(S.jsx)("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#alivaNavbar","aria-controls":"alivaNavbar","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(S.jsx)("span",{className:"navbar-toggler-icon"})}),Object(S.jsxs)("div",{className:"collapse navbar-collapse",id:"alivaNavbar",children:[Object(S.jsx)(O.b,{className:"navbar-brand",to:"/",children:"AlivaTech"}),Object(S.jsx)("ul",{className:"navbar-nav me-auto mb-2 mb-lg-0",children:t?Object(S.jsx)(U,{}):Object(S.jsx)(G,{})})]})]})})})),W=n(19),B=function(e){var t=e.component,n=(e.token,Object(W.a)(e,["component","token"]));return Object(S.jsx)(p.b,Object(u.a)(Object(u.a)({},n),{},{render:function(e){return Object(S.jsx)(t,Object(u.a)({},e))}}))},J=Object(o.b)((function(e){return{token:e.user.accessToken}}))((function(e){var t=e.component,n=e.token,r=Object(W.a)(e,["component","token"]);return Object(S.jsx)(p.b,Object(u.a)(Object(u.a)({},r),{},{render:function(e){return n?Object(S.jsx)(t,Object(u.a)({},e)):Object(S.jsx)(p.a,{to:{pathname:"/login"}})}}))})),H=function(){return Object(o.d)((function(e){return e.loading}))?Object(S.jsx)("div",{children:Object(S.jsx)("h1",{children:"Loading .........."})}):Object(S.jsx)("div",{children:Object(S.jsxs)(O.a,{children:[Object(S.jsx)(M,{}),Object(S.jsxs)(p.d,{children:[Object(S.jsx)(B,{path:"/login",component:w}),Object(S.jsx)(B,{path:"/register",component:C}),Object(S.jsx)(J,{path:"/",component:F})]})]})})};s.a.render(Object(S.jsx)(a.a.StrictMode,{children:Object(S.jsx)(o.a,{store:m,children:Object(S.jsx)(H,{})})}),document.getElementById("root")),j()}},[[43,1,2]]]);
//# sourceMappingURL=main.27d8ed66.chunk.js.map