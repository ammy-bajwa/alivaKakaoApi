(this["webpackJsonpaliva-kakao-client-ts"]=this["webpackJsonpaliva-kakao-client-ts"]||[]).push([[0],{11:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return a})),n.d(t,"e",(function(){return c})),n.d(t,"h",(function(){return s})),n.d(t,"d",(function(){return o})),n.d(t,"a",(function(){return i})),n.d(t,"f",(function(){return l})),n.d(t,"g",(function(){return u}));var r=function(e){return{type:"LOGIN",payload:e}},a=function(){return{type:"LOGOUT"}},c=function(e){return{type:"SET_FOCUSED_USER",payload:e}},s=function(e){return{type:"SET_WS",payload:e}},o=function(e){return{type:"NEW_MESSAGE",payload:e}},i=function(e){return{type:"LOAD_CHAT",payload:e}},l=function(){return{type:"START_LOADING"}},u=function(){return{type:"STOP_LOADING"}}},151:function(e,t,n){"use strict";(function(e){var r=n(2),a=n.n(r),c=n(7),s=n(155),o=n(0),i=n(10),l=n(152),u=n(32),d=n(153),b=n(27),m=n(65),f=n(11),p=(n(288),n(1));t.a=function(){var t=Object(i.d)((function(e){return e.currentFocus})),n=Object(i.d)((function(e){return e.user.email})),r=Object(i.d)((function(e){return e.user.chatList})),j=Object(i.d)((function(e){return e.ws})),O=Object(i.c)(),h=Object(o.useState)(""),v=Object(s.a)(h,2),g=v[0],x=v[1],k=function(){var s=Object(c.a)(a.a.mark((function c(s){var o,i,p,h,v,k,y,N,w,S;return a.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:if(c.prev=0,s.preventDefault(),o=(new Date).getTime(),i=document.getElementById("userFileUpload"),null,t){c.next=8;break}return alert("Please a contact first"),c.abrupt("return");case 8:if(g||!(i.files.length<=0)){c.next=11;break}return alert("Plase select a file or type some message"),c.abrupt("return");case 11:if(!(i.files.length>0)){c.next=39;break}c.t0=a.a.keys(i.files);case 13:if((c.t1=c.t0()).done){c.next=37;break}if(p=c.t1.value,!Object.prototype.hasOwnProperty.call(i.files,p)){c.next=35;break}return h=i.files[p],c.next=19,Object(d.a)(h);case 19:return v=c.sent,console.log(v),c.t2=e,c.t3=Uint8Array,c.next=25,h.arrayBuffer();case 25:return c.t4=c.sent,c.t5=new c.t3(c.t4),c.t2.from.call(c.t2,c.t5),c.next=30,Object(l.a)(h);case 30:k=c.sent,y=k.path,N=r[t].channelId,j.send(JSON.stringify({key:"newMessageFile",value:{message:g,receiver:t,filePath:y,email:n,channelId:N}})),O(Object(f.d)({receiverUserName:t,message:{text:"photo",received:!0,attachment:{thumbnailUrl:v},sendAt:o},senderName:"Self"}));case 35:c.next=13;break;case 37:c.next=47;break;case 39:console.log(t),w=r[t].channelId,j.send(JSON.stringify({key:"newMessage",value:{message:g,receiver:t,email:n,channelId:w}})),O(Object(f.d)({receiverUserName:t,message:{text:g,received:!0,sendAt:o},senderName:"Self"})),x(""),(S=document.getElementById("chatWindowContainer")).scrollTop=S.scrollHeight,console.log("Fired");case 47:Object(m.b)("Sended Successfully"),Object(b.a)(),c.next=55;break;case 51:c.prev=51,c.t6=c.catch(0),console.error(u.a),Object(u.a)("Error in sending message");case 55:case"end":return c.stop()}}),c,null,[[0,51]])})));return function(e){return s.apply(this,arguments)}}();return Object(p.jsx)("div",{className:"messageInputContainer",children:Object(p.jsxs)("form",{className:"m-2",onSubmit:k,encType:"multipart/form-data",children:[Object(p.jsx)("div",{children:Object(p.jsx)("input",{type:"text",className:"form-control",onInput:function(e){return x(e.target.value)},value:g})}),Object(p.jsx)("div",{className:"form-group",children:Object(p.jsx)("input",{type:"file",className:"form-control-file",id:"userFileUpload"})}),Object(p.jsx)("button",{className:"btn btn-info mt-2",type:"submit",children:"Send"})]})})}}).call(this,n(13).Buffer)},152:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(2),a=n.n(r),c=n(7),s=(n(48),n(18)),o=function(){var e=Object(c.a)(a.a.mark((function e(t){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new Promise(function(){var e=Object(c.a)(a.a.mark((function e(n,r){var c,o,i,l,u,d;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,c=s.a.getState(),!(o=c.user.accessToken)){e.next=17;break}return console.log("accessToken: ",o),(i=new FormData).append("myFile",t),l={method:"POST",body:i},u="",u="/uploadfile",e.next=11,fetch(u,l);case 11:return d=e.sent,e.next=14,d.json();case 14:d=e.sent,console.log("result: ",d),n(d);case 17:e.next=22;break;case 19:e.prev=19,e.t0=e.catch(0),r(e.t0);case 22:case"end":return e.stop()}}),e,null,[[0,19]])})));return function(t,n){return e.apply(this,arguments)}}()),e.next=3,n;case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},153:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var r=n(2),a=n.n(r),c=n(7),s=function(){var e=Object(c.a)(a.a.mark((function e(t){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new Promise((function(e,n){try{var r=new FileReader;r.onload=function(t){console.log(t.target.result),e(t.target.result)},r.readAsDataURL(t)}catch(a){n(a)}})),e.next=3,n;case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},163:function(e,t,n){},170:function(e,t){},172:function(e,t){},18:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n(96),a=n(154),c=n(6),s={user:{email:"",chatList:{},accessToken:""},loggedInUserId:"",chat:[],currentFocus:"",ws:null,loading:!1},o=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||r.a,i=Object(r.b)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN":return console.log(t),e=Object(c.a)(Object(c.a)({},e),{},{user:{email:t.payload.email,chatList:t.payload.chatList,accessToken:t.payload.accessToken},loggedInUserId:t.payload.loggedInUserId,chat:[]});case"LOGOUT":return e=Object(c.a)(Object(c.a)({},e),{},{user:{email:"",chatList:{},accessToken:""}});case"LOAD_CHAT":return e=Object(c.a)(Object(c.a)({},e),{},{chat:t.payload});case"START_LOADING":return e=Object(c.a)(Object(c.a)({},e),{},{loading:!0});case"STOP_LOADING":return e=Object(c.a)(Object(c.a)({},e),{},{loading:!1});case"SET_FOCUSED_USER":return e=Object(c.a)(Object(c.a)({},e),{},{currentFocus:t.payload});case"SET_WS":return e=Object(c.a)(Object(c.a)({},e),{},{ws:t.payload});case"NEW_MESSAGE":var n=t.payload,r=n.receiverUserName,o=n.message,i=n.senderName;return e=Object(c.a)(Object(c.a)({},e),{},{chat:[].concat(Object(a.a)(e.chat),[Object(c.a)(Object(c.a)({receiverUserName:r},o),{},{senderName:i})])});default:return e}}),o())},182:function(e,t){},184:function(e,t){},211:function(e,t){},212:function(e,t){},217:function(e,t){},219:function(e,t){},226:function(e,t){},245:function(e,t){},27:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var r=function(){var e=document.getElementById("messageContainer");e.scrollTop=e.scrollHeight}},286:function(e,t,n){},287:function(e,t,n){},288:function(e,t,n){},289:function(e,t,n){},290:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(41),s=n.n(c),o=n(10),i=(n(163),n(164),n(18)),l=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,293)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),r(e),a(e),c(e),s(e)}))},u=n(43),d=n(44),b=n(46),m=n(45),f=n(23),p=n(9),j=n(47),O=n(2),h=n.n(O),v=n(7),g=(n(48),n(32)),x=n(6),k=n(67),y=n(56),N=function(){var e=Object(v.a)(h.a.mark((function e(t,n){var r;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.t0=h.a.keys(t);case 1:if((e.t1=e.t0()).done){e.next=7;break}if(r=e.t1.value,!Object.prototype.hasOwnProperty.call(t,r)){e.next=5;break}return e.delegateYield(h.a.mark((function e(){var a,c,s,o,i,l,u;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t[r],c=a.userId,s=a.messages,o=Object(k.SHA256)("KAKAOCHAT".concat(c).concat(n)).toString(),i="MessageStore",l="messages",console.log(o),e.next=7,Object(y.b)(o,1,{upgrade:function(e){e.createObjectStore(i)}});case 7:return u=e.sent,e.next=10,u.put(i,s,l);case 10:u.close();case 11:case"end":return e.stop()}}),e)}))(),"t2",5);case 5:e.next=1;break;case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),w=function(){var e=Object(v.a)(h.a.mark((function e(t,n){var r,a,c,s,o,i;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=Object(k.SHA256)("KAKAOCHAT".concat(n).concat(t)).toString(),a="MessageStore",c="messages",s=!1,e.next=6,Object(y.b)(r,1,{upgrade:function(e){s=!0}});case 6:if(o=e.sent,!s){e.next=11;break}return e.abrupt("return");case 11:return e.next=13,o.get(a,c);case 13:return i=e.sent,e.abrupt("return",i);case 15:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),S=function(){var e=Object(v.a)(h.a.mark((function e(t,n,r){var a,c,s,o,i,l,u,d;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=Object(k.SHA256)("KAKAOCHAT".concat(n).concat(t)).toString(),c="MessageStore",s="messages",o=!1,e.next=6,Object(y.b)(a,1,{upgrade:function(e){o=!0}});case 6:if(i=e.sent,!o){e.next=13;break}return e.next=10,Object(y.a)(a);case 10:return e.abrupt("return");case 13:return l=Object(x.a)({receiverUserName:r.receiverUserName,senderName:r.senderName},r.message),e.next=16,i.get(c,s);case 16:return u=e.sent,d=u.concat([l]),e.next=20,i.put(c,d,s);case 20:return e.abrupt("return",u);case 21:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),I=function(){var e=Object(v.a)(h.a.mark((function e(t,n,r,a){var c;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=new Promise(function(){var e=Object(v.a)(h.a.mark((function e(c,s){var o,l,u,d,b,m,f,p,j;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,o=i.a.getState(),l=o.user.accessToken,console.log("accessToken: ",l),l){e.next=14;break}return u={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,password:n,deviceName:r,deviceId:a})},d="",d="/login",e.next=9,fetch(d,u);case 9:return b=e.sent,e.next=12,b.json();case 12:(b=e.sent).error?((m=g.a["".concat(b.error)])||(m=b.message),alert(m),console.log("result errorMessage: ",m),s(m)):(console.log("result: ",b),p=(f=b).messages,j=f.loggedInUserId,N(p,j),c(b));case 14:e.next=19;break;case 16:e.prev=16,e.t0=e.catch(0),s(e.t0);case 19:case"end":return e.stop()}}),e,null,[[0,16]])})));return function(t,n){return e.apply(this,arguments)}}()),e.next=3,c;case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t,n,r,a){return e.apply(this,arguments)}}(),E=n(27),T=n(11),A=function(){i.a.dispatch(Object(T.f)())},C=function(){i.a.dispatch(Object(T.g)())},U=n(1),L=function(e){Object(b.a)(n,e);var t=Object(m.a)(n);function n(){var e;Object(u.a)(this,n);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(e=t.call.apply(t,[this].concat(a))).loginFormHandler=function(){var t=Object(v.a)(h.a.mark((function t(n){var r,a,c,s,o,l,u,d,b,m,f,p,j,O;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=e.props,a=r.history,c=r.dispatch,r.currentFocus,n.preventDefault(),s=document.getElementById("userEmail"),o=s.value,l=document.getElementById("userPassword"),u=l.value,d=localStorage.getItem(o)){t.next=11;break}alert("Please register device first"),t.next=36;break;case 11:return t.prev=11,A(),b=JSON.parse(d),m=b.deviceName,f=b.deviceId,t.next=16,I(o,u,m,f);case 16:p=t.sent,console.log("user: ",p),j="",j=window.location.origin.replace(/^http/,"ws"),(O=new WebSocket(j)).onopen=function(){console.log("Socket is open"),O.send(JSON.stringify({key:"setEmail",value:o})),c(Object(T.h)(O))},O.onmessage=function(){var e=Object(v.a)(h.a.mark((function e(t){var n,r,a,s,o,l,u,d,b,m,f,j,O,v,g;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,n=JSON.parse(t.data),"newMesssage"!==(r=n.key)){e.next=18;break}return a=n.text,s=n.sender,o=n.receiverUser,l=n.sendAt,u=n.attachment,d={text:a,sender:s,receiverUser:o,sendAt:l},console.log("We have a message: ",d),b=Object.keys(o)[0],m={receiverUserName:b,message:{attachment:u,text:a,received:!0,sendAt:l},senderName:s.nickname},e.next=11,i.a.getState();case 11:return f=e.sent,(j=f.currentFocus)!==s.nickname&&j!==b||(c(Object(T.d)(m)),Object(E.a)()),e.next=16,S(p.loggedInUserId,o[b].userId.low,m);case 16:e.next=19;break;case 18:"unreadMessages"===r&&(O=n.value,v=O.userId,g=O.messageStore,console.log(v,g));case 19:e.next=26;break;case 21:e.prev=21,e.t0=e.catch(0),console.log(e.t0),C(),console.log("We have a message: ",t.data);case 26:case"end":return e.stop()}}),e,null,[[0,21]])})));return function(t){return e.apply(this,arguments)}}(),O.onerror=function(){alert("Socket has error")},O.onclose=function(){alert("Socket is closed"),c(Object(T.c)()),a.push("/login")},c(Object(T.b)(p)),localStorage.setItem("token",JSON.stringify({accessToken:p.accessToken,refreshToken:p.accessToken,email:o,password:u})),a.push("/"),C(),t.next=36;break;case 31:t.prev=31,t.t0=t.catch(11),C(),localStorage.removeItem("token"),console.error(t.t0);case 36:case"end":return t.stop()}}),t,null,[[11,31]])})));return function(e){return t.apply(this,arguments)}}(),e}return Object(d.a)(n,[{key:"render",value:function(){return Object(U.jsx)(U.Fragment,{children:Object(U.jsxs)("form",{className:"m-3",onSubmit:this.loginFormHandler,children:[Object(U.jsxs)("div",{className:"mb-3",children:[Object(U.jsx)("label",{htmlFor:"userEmail",className:"form-label",children:"Email address"}),Object(U.jsx)("input",{type:"email",className:"form-control",id:"userEmail",required:!0,"aria-describedby":"emailHelp"}),Object(U.jsx)("div",{id:"emailHelp",className:"form-text",children:"We'll never share your email with anyone else."})]}),Object(U.jsxs)("div",{className:"mb-3",children:[Object(U.jsx)("label",{htmlFor:"userPassword",className:"form-label",children:"Password"}),Object(U.jsx)("input",{type:"password",className:"form-control",autoComplete:"true",required:!0,id:"userPassword"})]}),Object(U.jsx)("button",{type:"submit",className:"btn btn-outline-dark m-2",children:"Login"}),Object(U.jsx)(f.b,{to:"/register",children:Object(U.jsx)("button",{type:"submit",className:"btn btn-outline-info",children:"Register Device"})})]})})}}]),n}(a.a.Component),F=Object(o.b)((function(e){return{chatList:e.user.chatList,currentFocus:e.currentFocus}}))(Object(p.h)(L)),_=n(292),D=function(){var e=Object(v.a)(h.a.mark((function e(t,n,r,a){var c,s,o,i;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({deviceName:t,deviceId:n,email:r,password:a})},s="",s="/device/sendCode",e.next=5,fetch(s,c);case 5:return o=e.sent,e.next=8,o.json();case 8:(o=e.sent).error?(i=o.message,alert(i),console.log("result: ",i)):(alert(o.message),console.log(o.message));case 10:case"end":return e.stop()}}),e)})));return function(t,n,r,a){return e.apply(this,arguments)}}(),P=function(){var e=Object(v.a)(h.a.mark((function e(t,n,r){var a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=new Promise(function(){var e=Object(v.a)(h.a.mark((function e(a,c){var s,o,i,l;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:t,email:n,password:r})},o="",o="/device/setCode",e.next=5,fetch(o,s);case 5:return i=e.sent,e.next=8,i.json();case 8:(i=e.sent).error?((l=g.a["".concat(i.error)])||(l=i.message),alert(l),console.log("result: ",i),console.log("errorMessage: ",l),c(l)):(a(i.message),alert(i.message),console.log(i));case 10:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),e.next=3,a;case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),R=function(){var e=Object(p.g)(),t=function(){var e=Object(v.a)(h.a.mark((function e(t){var n,r,a,c,s,o,i;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),n=document.getElementById("userEmail"),r=n.value,a=document.getElementById("userPassword"),c=a.value,s=document.getElementById("machineName"),o=s.value,i=(i=Object(_.a)()).split("-").join(""),console.log("deviceId: ",i),e.prev=10,e.next=13,D(o,i,r,c);case 13:localStorage.setItem(r,JSON.stringify({deviceName:o,deviceId:i})),console.log("deviceName: ",o),console.log("deviceId: ",i),e.next=21;break;case 18:e.prev=18,e.t0=e.catch(10),console.error(e.t0);case 21:case"end":return e.stop()}}),e,null,[[10,18]])})));return function(t){return e.apply(this,arguments)}}(),n=function(){var t=Object(v.a)(h.a.mark((function t(n){var r,a,c,s,o,i;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),r=document.getElementById("userEmail"),a=r.value,c=document.getElementById("userPassword"),s=c.value,o=document.getElementById("registerCode"),i=o.value,t.prev=7,t.next=10,P(i,a,s);case 10:e.push("/login"),t.next=16;break;case 13:t.prev=13,t.t0=t.catch(7),console.error(t.t0);case 16:case"end":return t.stop()}}),t,null,[[7,13]])})));return function(e){return t.apply(this,arguments)}}();return Object(U.jsxs)("div",{children:[Object(U.jsxs)("form",{className:"m-3",onSubmit:t,children:[Object(U.jsxs)("div",{className:"mb-3",children:[Object(U.jsx)("label",{htmlFor:"userEmail",className:"form-label",children:"Email address"}),Object(U.jsx)("input",{type:"email",className:"form-control",id:"userEmail",required:!0,"aria-describedby":"emailHelp"}),Object(U.jsx)("div",{id:"emailHelp",className:"form-text",children:"We'll never share your email with anyone else."})]}),Object(U.jsxs)("div",{className:"mb-3",children:[Object(U.jsx)("label",{htmlFor:"userPassword",className:"form-label",children:"Password"}),Object(U.jsx)("input",{type:"password",className:"form-control",autoComplete:"true",required:!0,id:"userPassword"})]}),Object(U.jsxs)("div",{className:"mb-3",children:[Object(U.jsx)("label",{htmlFor:"machineName",className:"form-label",children:"Enter Device Name To Save"}),Object(U.jsx)("input",{type:"text",className:"form-control",placeholder:"Office Pc",id:"machineName",required:!0})]}),Object(U.jsx)("button",{type:"submit",className:"btn btn-outline-dark m-2",children:"Send Code"}),Object(U.jsx)(f.b,{to:"/login",children:Object(U.jsx)("button",{type:"submit",className:"btn btn-outline-info",children:"Login"})})]}),Object(U.jsxs)("form",{className:"m-3",onSubmit:n,children:[Object(U.jsxs)("div",{className:"mb-3",children:[Object(U.jsx)("label",{htmlFor:"registerCode",className:"form-label",children:"Enter code"}),Object(U.jsx)("input",{type:"number",placeholder:"1234",className:"form-control",id:"registerCode",required:!0})]}),Object(U.jsx)("button",{type:"submit",className:"btn btn-outline-dark m-2",children:"Register"})]})]})},M=n.p+"static/media/profile.a9136072.png",H=(n(286),function(e){var t=e.name,n=e.profileImage,r=e.onClickHandler,a=Object(o.d)((function(e){return e.currentFocus}));return Object(U.jsxs)("div",{className:"chatListItemContainer border d-flex flex-row w-10 m-2 p-2 ".concat(a===t&&"focusedContact"),onClick:r,children:[Object(U.jsx)("img",{src:n||M,className:"rounded-circle profileWidth",alt:"profileImage"}),Object(U.jsx)("h3",{className:"d-inline contactName",children:t})]})}),G=(n(287),function(e){var t=Object(o.d)((function(e){return console.log("useSelector"),e.chat}));return Object(r.useEffect)((function(){Object(E.a)()}),[t]),Object(U.jsxs)("div",{className:"m-2",id:"chatWindowContainer",children:[console.log("props: ",e),Object(U.jsx)("h1",{children:"Chat Window"}),t.map((function(e,t){return Object(U.jsxs)("div",{className:e.received?"d-flex border-bottom m-2":"d-flex flex-row-reverse",children:["photo"===e.text&&e.attachment&&e.attachment.thumbnailUrl&&Object(U.jsx)("img",{loading:"lazy",alt:"userImages",src:e.attachment.thumbnailUrl,width:"90",height:"90"}),Object(U.jsxs)("span",{className:e.received?"receiverMessage m-2 p-2 d-block w-100":"senderMessage m-2 p-2 d-block",children:[Object(U.jsx)("b",{children:"text: "}),e.text,Object(U.jsx)("b",{children:" from: "}),e.senderName,Object(U.jsx)("b",{children:" to: "}),e.receiverUserName,Object(U.jsx)("b",{children:" Sened At: "}),e.sendAt]})]},t)}))]})}),J=n(151),B=function(){return Object(U.jsxs)("div",{children:[Object(U.jsx)(G,{}),Object(U.jsx)(J.a,{})]})},W=(n(289),Object(o.b)((function(e){return{user:e.user,loggedInUserId:e.loggedInUserId,ws:e.ws}}))((function(e){var t=function(){var t=Object(v.a)(h.a.mark((function t(n,r){var a,c,s,o,i;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=e.dispatch,c=e.loggedInUserId,s=e.ws,o=e.user,a(Object(T.e)(n)),t.next=4,w(c,r);case 4:i=t.sent,a(Object(T.a)(i)),s.send(JSON.stringify({key:"isMessageUpdateNeeded",value:{time:i[i.length-1].sendAt,email:o.email,focusedUserId:r}})),console.log("getUserChat: ",i);case 8:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}();return Object(U.jsxs)("div",{className:"d-flex",id:"homeMainContainer",children:[Object(U.jsx)("div",{className:"chatListContainer border d-flex flex-column flex-wrap m-2 justify-content-center",children:e.user.chatList?function(){var n=[],r=0,a=e.user.chatList;for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&function(){var e=a[c];n.push(Object(U.jsx)(H,{profileImage:e.displayUserList[0].profileURL,name:e.displayUserList[0].nickname,onClickHandler:function(){return t(e.displayUserList[0].nickname,e.intId)}},r)),r++}();return n}():""}),Object(U.jsx)("div",{className:"border m-2",id:"messageContainer",children:Object(U.jsx)(B,{})})]})}))),q=function(e){var t=e.email,n=Object(o.c)(),r=Object(p.g)();return Object(U.jsxs)(U.Fragment,{children:[Object(U.jsx)("li",{className:"nav-item",children:Object(U.jsx)(f.b,{className:"nav-link active","aria-current":"page",to:"/",children:"Home"})}),Object(U.jsx)("li",{className:"nav-item",children:Object(U.jsx)("span",{className:"nav-link active",children:t})}),Object(U.jsx)("li",{className:"nav-item hoverEffect",onClick:function(){n(Object(T.c)()),localStorage.removeItem("token"),r.push("/login")},children:Object(U.jsx)("span",{className:"nav-link active",children:"Logout"})})]})},K=function(){return Object(U.jsx)(U.Fragment,{children:Object(U.jsx)("li",{className:"nav-item",children:Object(U.jsx)(f.b,{className:"nav-link active",to:"/login",children:"Login"})})})},V=n(65),Y=function(e){Object(b.a)(n,e);var t=Object(m.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=Object(v.a)(h.a.mark((function e(){var t,n,r,a,c,s,o,l,u,d,b,m,f,p,j;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=localStorage.getItem("token"),n=this.props,r=n.dispatch,a=n.history,c=n.token,!t||c){e.next=32;break}return s=JSON.parse(t),o=s.email,l=s.password,u=localStorage.getItem(o),e.prev=5,A(),d=JSON.parse(u),b=d.deviceName,m=d.deviceId,e.next=10,I(o,l,b,m);case 10:f=e.sent,p="",p=window.location.origin.replace(/^http/,"ws"),(j=new WebSocket(p)).onopen=function(){console.log("Socket is open"),j.send(JSON.stringify({key:"setEmail",value:o})),r(Object(T.h)(j))},j.onmessage=function(){var e=Object(v.a)(h.a.mark((function e(t){var n,a,c,s,o,l,u,d,b,m,p,j,O,v;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,n=JSON.parse(t.data),"newMesssage"!==(a=n.key)){e.next=17;break}return c=n.text,s=n.sender,o=n.receiverUser,l=n.sendAt,u=n.attachment,d=Object.keys(o)[0],b={receiverUserName:d,message:{attachment:u,text:c,received:!0,sendAt:l},senderName:s.nickname},e.next=9,i.a.getState();case 9:return m=e.sent,p=m.currentFocus,console.log("currentFocus: ",p),p===s.nickname||p===d?(r(Object(T.d)(b)),Object(E.a)()):Object(V.a)("New Message From ".concat(s.nickname," to ").concat(d)),e.next=15,S(f.loggedInUserId,o[d].userId.low,b);case 15:e.next=18;break;case 17:"unreadMessages"===a&&(j=n.value,O=j.userId,v=j.messageStore,console.log(O,v));case 18:e.next=25;break;case 20:e.prev=20,e.t0=e.catch(0),console.log(e.t0),C(),console.log("We have a message: ",t.data);case 25:case"end":return e.stop()}}),e,null,[[0,20]])})));return function(t){return e.apply(this,arguments)}}(),j.onerror=function(){alert("Socket has error")},j.onclose=function(e){alert("Socket is closed"),console.log(e),a.push("/login")},r(Object(T.b)(f)),localStorage.setItem("token",JSON.stringify({accessToken:f.accessToken,refreshToken:f.accessToken,email:o,password:l})),a.push("/"),C(),e.next=30;break;case 24:e.prev=24,e.t0=e.catch(5),C(),localStorage.removeItem("token"),a.push("/login"),console.error(e.t0);case 30:e.next=33;break;case 32:console.log("Acoided +++++++++++++++++++");case 33:case"end":return e.stop()}}),e,this,[[5,24]])})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.props,t=e.token,n=e.email;return Object(U.jsx)("nav",{className:"navbar navbar-expand-lg navbar-dark bg-dark",children:Object(U.jsxs)("div",{className:"container-fluid",children:[Object(U.jsx)("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#alivaNavbar","aria-controls":"alivaNavbar","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(U.jsx)("span",{className:"navbar-toggler-icon"})}),Object(U.jsxs)("div",{className:"collapse navbar-collapse",id:"alivaNavbar",children:[Object(U.jsx)(f.b,{className:"navbar-brand",to:"/",children:"AlivaTech"}),Object(U.jsx)("ul",{className:"navbar-nav me-auto mb-2 mb-lg-0",children:t?Object(U.jsx)(q,{email:n}):Object(U.jsx)(K,{})})]})]})})}}]),n}(a.a.Component),X=Object(o.b)((function(e){return{token:e.user.accessToken,email:e.user.email}}))(Object(p.h)(Y)),z=n(66),Q=function(e){var t=e.component,n=(e.token,Object(z.a)(e,["component","token"]));return Object(U.jsx)(p.b,Object(x.a)(Object(x.a)({},n),{},{render:function(e){return Object(U.jsx)(t,Object(x.a)({},e))}}))},Z=Object(o.b)((function(e){return{token:e.user.accessToken}}))((function(e){var t=e.component,n=e.token,r=Object(z.a)(e,["component","token"]);return Object(U.jsx)(p.b,Object(x.a)(Object(x.a)({},r),{},{render:function(e){return n?Object(U.jsx)(t,Object(x.a)({},e)):Object(U.jsx)(p.a,{to:{pathname:"/login"}})}}))})),$=function(e){Object(b.a)(n,e);var t=Object(m.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"render",value:function(){return this.props.loading?Object(U.jsx)("div",{children:Object(U.jsx)("h1",{children:"Loading .........."})}):Object(U.jsx)("div",{children:Object(U.jsxs)(f.a,{children:[Object(U.jsx)(j.a,{}),Object(U.jsx)(X,{}),Object(U.jsxs)(p.d,{children:[Object(U.jsx)(Q,{path:"/login",component:F}),Object(U.jsx)(Q,{path:"/register",component:R}),Object(U.jsx)(Z,{path:"/",component:W})]})]})})}}]),n}(a.a.Component),ee=Object(o.b)((function(e){return{loading:e.loading}}))($);s.a.render(Object(U.jsx)(a.a.StrictMode,{children:Object(U.jsx)(o.a,{store:i.a,children:Object(U.jsx)(ee,{})})}),document.getElementById("root")),l()},32:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var r={12:"LOGIN_FAILED_REASON",13:"TOO_MANY_TRY_LOGIN",30:"LOGIN_FAILED",32:"MOBILE_UNREGISTERED","-100":"DEVICE_NOT_REGISTERED","-101":"ANOTHER_LOGON","-102":"DEVICE_REGISTER_FAILED","-110":"INVALID_DEVICE_REGISTER","-111":"INCORRECT_PASSCODE","-112":"PASSCODE_REQUEST_FAILED","-997":"ACCOUNT_RESTRICTED"}},48:function(e,t,n){"use strict"},65:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return c}));var r=n(47),a=function(e){return r.b.success(e)},c=function(e){return r.b.info(e)}}},[[290,1,2]]]);
//# sourceMappingURL=main.988dfc70.chunk.js.map