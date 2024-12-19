(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[227],{20028:function(t,e,r){Promise.resolve().then(r.bind(r,95634)),Promise.resolve().then(r.bind(r,57941))},95634:function(t,e,r){"use strict";r.d(e,{default:function(){return f}});var n=r(57437),o=r(14950),a=r(46064),i=r(39343);r(2265);var c=r(67997),s=r(95956),u=r(16463),d=r(92849);function l(t){var e,r;let{register:o,handleSubmit:l,formState:{errors:f}}=(0,i.cI)(),p=(0,u.useRouter)(),m=l(async t=>{try{await (0,d.y1)(t),s.Am.success("Registration successful"),p.push("/login")}catch(t){s.Am.error("Registration failed")}}),h={email:o("email",{required:"Email is required",pattern:{value:/^\S+@\S+$/i,message:"Invalid email"}}),password:o("password",{required:"Password is required"}),handle:o("handle",{required:"Handle is required"})};return(0,n.jsxs)("form",{...t,className:"flex flex-col gap-1 lg:min-w-[48ch]",onSubmit:m,children:[(0,n.jsx)(a.Y,{required:!0,className:"mb-4",placeholder:"Email",radius:"full",size:"lg",type:"email",...h.email}),(0,n.jsx)(a.Y,{required:!0,className:"mb-4",placeholder:"Handle",radius:"full",size:"lg",type:"text",...h.handle}),(0,n.jsx)(a.Y,{required:!0,className:"mb-4",placeholder:"Password",radius:"full",size:"lg",type:"password",...h.password}),(0,n.jsxs)("p",{className:"text-danger",children:[null===(e=f.email)||void 0===e?void 0:e.message,null===(r=f.password)||void 0===r?void 0:r.message]}),(0,n.jsx)(c.A,{fullWidth:!0,color:"primary",radius:"full",size:"lg",type:"submit",children:"Register"})]})}function f(){return(0,n.jsxs)(o.E.section,{animate:{opacity:1,y:0},className:"flex flex-col gap-6 max-w-screen-sm lg:my-16",initial:{opacity:0,y:-20},transition:{duration:.5},children:[(0,n.jsxs)(o.E.div,{animate:{opacity:1,y:0},initial:{opacity:0,y:-20},transition:{duration:.5,delay:.2},children:[(0,n.jsx)("h2",{className:"font-bold text-2xl lg:text-4xl text-foreground",children:"Get started"}),(0,n.jsx)("p",{className:"text-base text-foreground-500",children:"Register new account to start"})]}),(0,n.jsx)(o.E.div,{animate:{opacity:1,y:0},initial:{opacity:0,y:-20},transition:{duration:.5,delay:.4},children:(0,n.jsx)(l,{})})]})}},57941:function(t,e,r){"use strict";r.r(e),r.d(e,{Field:function(){return i}});var n=r(57437),o=r(97481),a=r(96164);function i(t){let{label:e,value:r,direction:i="row",fullWidth:c=!1,fullHeight:s=!1,showLabel:u=!0,icon:d,classNames:l}=t;return(0,n.jsxs)("div",{className:(0,a.m6)("flex gap-1 justify-center items-center w-fit h-fit","column"===i&&"flex-col",c&&"w-full",s&&"h-full",null==l?void 0:l.wrapper),children:[d&&(0,n.jsx)(o.e,{content:e,placement:"top",children:d}),u&&(0,n.jsx)("div",{className:(0,a.m6)("text-sm font-medium text-foreground",null==l?void 0:l.label),children:e}),(0,n.jsx)("div",{className:(0,a.m6)("text-sm",null==l?void 0:l.value),children:r})]})}},92849:function(t,e,r){"use strict";r.d(e,{SC:function(){return y},bg:function(){return m},Rf:function(){return l},fP:function(){return v},kT:function(){return p},Zp:function(){return d},zN:function(){return g},TO:function(){return s},x4:function(){return c},K9:function(){return b},T0:function(){return w},y1:function(){return i},cg:function(){return x},ct:function(){return h},uJ:function(){return f}});var n=r(38472),o=r(44785);r(20357).env.NEXT_PUBLIC_API_VERSION;let a=n.Z.create({baseURL:"http://54.179.65.18:3000"});async function i(t){try{return(await a.post("/user",t)).data.data}catch(t){throw console.error("Failed to sign up",t),Error("Failed to sign up")}}async function c(t){try{return(await a.post("/user/login",t)).data.data.token}catch(t){throw Error("Failed to sign in")}}async function s(){try{let t=await a.get("/user/id");return await u({id:t.data.data.id})}catch(t){throw console.error(t),Error("Failed to fetch user by token")}}async function u(t){try{return(await a.get("/user/".concat(t.id))).data.data}catch(t){throw console.error(t),Error("Failed to fetch user by ID")}}async function d(){try{return(await a.get("/user/leaderboard")).data.data}catch(t){throw Error("Failed to fetch leaderboard")}}async function l(t){try{return(await a.post("/problem",t)).data}catch(t){throw console.log(t),Error("Failed to create problem")}}async function f(t){try{return(await a.patch("/problem/id/".concat(t.id),t.data)).data}catch(t){throw Error("Failed to update problem")}}async function p(t,e){try{return(await a.get("/problem")).data.data}catch(t){throw Error("Failed to fetch all problems")}}async function m(t){try{return(await a.post("/contest",t)).data}catch(t){throw console.log(t),Error("Failed to create contest")}}async function h(t){try{return(await a.patch("/contest/".concat(t.id),t.data)).data}catch(t){throw Error("Failed to update contest")}}async function y(t){try{return(await a.post("/contest/".concat(t.contestId,"/problem"),{problemId:t.problemId,score:t.score})).data}catch(t){throw console.error(t),Error("Failed to add problem to contest")}}async function w(t){try{return(await a.delete("/contest/".concat(t.id,"/problem"),{data:{problemId:t.problemId}})).data}catch(t){throw console.error(t),Error("Failed to remove problem from contest")}}async function g(t){try{return(await a.get("/contest/".concat(t.id,"/problem"))).data.data}catch(t){throw Error("Failed to get problems in contest")}}async function b(t){try{return(await a.post("/contest/".concat(t.id,"/register"),{id:t.userId})).data.data}catch(t){throw Error("Failed to register for contest")}}async function x(t){try{return(await a.delete("/contest/".concat(t.id,"/register"),{data:{id:t.userId}})).data}catch(t){throw Error("Failed to unregister for contest")}}async function v(t){btoa(t.code).includes(t.code)||(t.code=btoa(t.code));try{return(await a.post("/submission",{...t})).data}catch(t){throw console.error(t),Error("Failed to create submission")}}a.interceptors.request.use(t=>{let e=o.Z.get("token");return e&&(t.headers["x-access-token"]=e),t})},14950:function(t,e,r){"use strict";r.d(e,{E:function(){return l}});var n=r(56863),o=r(89188),a=r(44591),i=r(45859),c=r(61865),s=r(67611),u=r(33302);let d=(0,s.x)({...o.s,...i.E,...a.o,...c.b},u.b),l=(0,n.c)(d)},44785:function(t,e,r){"use strict";/*! js-cookie v3.0.5 | MIT */function n(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)t[n]=r[n]}return t}r.d(e,{Z:function(){return o}});var o=function t(e,r){function o(t,o,a){if("undefined"!=typeof document){"number"==typeof(a=n({},r,a)).expires&&(a.expires=new Date(Date.now()+864e5*a.expires)),a.expires&&(a.expires=a.expires.toUTCString()),t=encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var i="";for(var c in a)a[c]&&(i+="; "+c,!0!==a[c]&&(i+="="+a[c].split(";")[0]));return document.cookie=t+"="+e.write(o,t)+i}}return Object.create({set:o,get:function(t){if("undefined"!=typeof document&&(!arguments.length||t)){for(var r=document.cookie?document.cookie.split("; "):[],n={},o=0;o<r.length;o++){var a=r[o].split("="),i=a.slice(1).join("=");try{var c=decodeURIComponent(a[0]);if(n[c]=e.read(i,c),t===c)break}catch(t){}}return t?n[t]:n}},remove:function(t,e){o(t,"",n({},e,{expires:-1}))},withAttributes:function(e){return t(this.converter,n({},this.attributes,e))},withConverter:function(e){return t(n({},this.converter,e),this.attributes)}},{attributes:{value:Object.freeze(r)},converter:{value:Object.freeze(e)}})}({read:function(t){return'"'===t[0]&&(t=t.slice(1,-1)),t.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(t){return encodeURIComponent(t).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"})}},function(t){t.O(0,[4876,8725,8829,7778,7997,3760,5956,9890,9755,1886,2971,7023,1744],function(){return t(t.s=20028)}),_N_E=t.O()}]);