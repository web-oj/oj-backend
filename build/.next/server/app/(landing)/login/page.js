(()=>{var e={};e.id=827,e.ids=[827],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},39491:e=>{"use strict";e.exports=require("assert")},82361:e=>{"use strict";e.exports=require("events")},57147:e=>{"use strict";e.exports=require("fs")},13685:e=>{"use strict";e.exports=require("http")},95687:e=>{"use strict";e.exports=require("https")},22037:e=>{"use strict";e.exports=require("os")},71017:e=>{"use strict";e.exports=require("path")},12781:e=>{"use strict";e.exports=require("stream")},76224:e=>{"use strict";e.exports=require("tty")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},59796:e=>{"use strict";e.exports=require("zlib")},91054:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>a.a,__next_app__:()=>x,originalPathname:()=>u,pages:()=>c,routeModule:()=>p,tree:()=>d}),t(85100),t(13803),t(51266),t(26083),t(19644),t(96560);var s=t(23191),n=t(88716),i=t(37922),a=t.n(i),o=t(95231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);t.d(r,l);let d=["",{children:["(landing)",{children:["login",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,85100)),"E:\\oj-frontend\\app\\(landing)\\login\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,13803)),"E:\\oj-frontend\\app\\(landing)\\layout.tsx"]}]},{layout:[()=>Promise.resolve().then(t.bind(t,51266)),"E:\\oj-frontend\\app\\layout.tsx"],error:[()=>Promise.resolve().then(t.bind(t,26083)),"E:\\oj-frontend\\app\\error.tsx"],loading:[()=>Promise.resolve().then(t.bind(t,19644)),"E:\\oj-frontend\\app\\loading.tsx"],"not-found":[()=>Promise.resolve().then(t.bind(t,96560)),"E:\\oj-frontend\\app\\not-found.tsx"]}],c=["E:\\oj-frontend\\app\\(landing)\\login\\page.tsx"],u="/(landing)/login/page",x={require:t,loadChunk:()=>Promise.resolve()},p=new s.AppPageRouteModule({definition:{kind:n.x.APP_PAGE,page:"/(landing)/login/page",pathname:"/login",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},84947:(e,r,t)=>{Promise.resolve().then(t.bind(t,48622)),Promise.resolve().then(t.bind(t,1684)),Promise.resolve().then(t.bind(t,83936))},17845:(e,r,t)=>{Promise.resolve().then(t.bind(t,78143)),Promise.resolve().then(t.bind(t,38425)),Promise.resolve().then(t.bind(t,8489)),Promise.resolve().then(t.bind(t,31190))},48622:(e,r,t)=>{"use strict";t.d(r,{default:()=>a});var s=t(10326),n=t(35047),i=t(15718);function a(e){let{user:r}=(0,i.a)(),t=(0,n.useRouter)();return r&&t.push("/dashboard"),s.jsx(s.Fragment,{children:e.children})}},1684:(e,r,t)=>{"use strict";t.d(r,{default:()=>f});var s=t(10326),n=t(3482),i=t(75686),a=t(19839),o=t(74723);t(17577);var l=t(30752),d=t(35047),c=t(93983),u=t(31190),x=t(89645),p=t(15718);function m(e){let r=(0,d.useRouter)(),{register:t,handleSubmit:n,formState:{errors:i}}=(0,o.cI)(),{login:m}=(0,p.a)(),f=async e=>{try{let t=await (0,x.x4)(e);console.log("Login successful",t),m(t),u.Am.success("Login successful"),r.push("/dashboard")}catch(e){u.Am.error("Login failed"),console.error("Login failed",e)}},g={email:t("email",{required:"Email is required"}),password:t("password",{required:"Password is required"})};return(0,s.jsxs)("form",{...e,className:"flex flex-col gap-1 lg:min-w-[48ch]",onSubmit:n(f,e=>{console.log(e)}),children:[s.jsx(a.Y,{className:"mb-4",placeholder:"Email",radius:"full",size:"lg",type:"text",...g.email}),s.jsx(a.Y,{className:"mb-4",placeholder:"Password",radius:"full",size:"lg",type:"password",...g.password}),s.jsx(c.B,{errors:i,name:"email",render:({message:e})=>s.jsx("p",{className:"text-red-500",children:e})}),s.jsx(c.B,{errors:i,name:"password",render:({message:e})=>s.jsx("p",{className:"text-red-500",children:e})}),s.jsx(l.A,{fullWidth:!0,color:"primary",radius:"full",size:"lg",type:"submit",children:"Login"})]})}function f(){return(0,s.jsxs)(i.E.section,{animate:{opacity:1,y:0},className:"flex flex-col gap-6 max-w-screen-sm lg:my-16",initial:{opacity:0,y:-20},transition:{duration:.5},children:[(0,s.jsxs)(i.E.div,{animate:{opacity:1,y:0},initial:{opacity:0,y:-20},transition:{duration:.5,delay:.2},children:[s.jsx("h2",{className:"font-bold text-2xl lg:text-4xl text-foreground",children:"Login your account"}),s.jsx("p",{className:"text-base text-foreground-500",children:"Explore and practice problems, contest and so on"})]}),s.jsx(i.E.div,{animate:{opacity:1,y:0},initial:{opacity:0,y:-20},transition:{duration:.5,delay:.4},children:s.jsx(m,{})}),(0,s.jsxs)(i.E.p,{animate:{opacity:1,y:0},className:"text-base text-foreground-500 text-center w-full",initial:{opacity:0,y:-20},transition:{duration:.5,delay:.6},children:["Don't have an account?"," ",s.jsx(n.O,{className:"text-primary",href:"./register",children:"Sign up"})]})]})}},93983:(e,r,t)=>{"use strict";t.d(r,{B:()=>i});var s=t(17577),n=t(74723),i=function(e){var r=e.as,t=e.errors,i=e.name,a=e.message,o=e.render,l=function(e,r){if(null==e)return{};var t,s,n={},i=Object.keys(e);for(s=0;s<i.length;s++)r.indexOf(t=i[s])>=0||(n[t]=e[t]);return n}(e,["as","errors","name","message","render"]),d=(0,n.Gc)(),c=(0,n.U2)(t||d.formState.errors,i);if(!c)return null;var u=c.message,x=c.types,p=Object.assign({},l,{children:u||a});return s.isValidElement(r)?s.cloneElement(r,p):o?o({message:u||a,messages:x}):s.createElement(r||s.Fragment,p)}},13803:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>a,metadata:()=>i});var s=t(19510);function n(e){return s.jsx(s.Fragment,{children:e.children})}let i={title:"Dashboard"};function a(e){return s.jsx(n,{children:e.children})}},85100:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>m});var s=t(19510),n=t(68570);let i=(0,n.createProxy)(String.raw`E:\oj-frontend\app\(landing)\login\components\GuardWrapper.tsx`),{__esModule:a,$$typeof:o}=i;i.default;let l=(0,n.createProxy)(String.raw`E:\oj-frontend\app\(landing)\login\components\GuardWrapper.tsx#default`),d=(0,n.createProxy)(String.raw`E:\oj-frontend\app\(landing)\login\components\login-form\index.tsx`),{__esModule:c,$$typeof:u}=d;d.default;let x=(0,n.createProxy)(String.raw`E:\oj-frontend\app\(landing)\login\components\login-form\index.tsx#default`);var p=t(42108);function m(){return s.jsx(l,{children:s.jsx(p._z,{isCenteredX:!0,children:s.jsx(x,{})})})}},79223:(e,r,t)=>{"use strict";t.d(r,{E:()=>a});var s=t(19510),n=t(55761),i=t(62386);function a(e){let{direction:r="row",space:t="md",fullwidth:a=!1,fullheight:o=!1,isCentered:l=!1,isCenteredX:d=!1,isCenteredY:c=!1,roundedMedium:u=!0,classnames:x,className:p,...m}=e;return(0,s.jsxs)("div",{className:(0,i.m6)("flex flex-col gap-2 h-fit w-fit",u&&"rounded-medium",a&&"w-full",o&&"h-full",(0,i.dV)(p,x?.wrapper)),children:[e.label&&s.jsx("h3",{className:(0,i.m6)("text-sm font-medium text-foreground","sm"===e.labelSize&&"text-sm","md"===e.labelSize&&"text-md","lg"===e.labelSize&&"text-lg","2xl"===e.labelSize&&"text-2xl font-semibold",x?.label),children:e.label}),s.jsx("div",{...e,className:(0,n.Z)("flex w-full h-full","row"===r&&"flex-row","column"===r&&"flex-col","sm"===t&&"gap-2","md"===t&&"gap-4","lg"===t&&"gap-6",l&&"justify-center items-center",d&&"justify-center",c&&"items-center",x?.container),children:e.children})]})}},42108:(e,r,t)=>{"use strict";t.d(r,{kz:()=>o,EY:()=>l.E,_z:()=>i});var s=t(19510),n=t(62386);function i(e){let{isCentered:r=!1,isCenteredX:t=!1,isCenteredY:i=!1,title:a,label:o,className:l,...d}=e;return(0,s.jsxs)("div",{...e,className:(0,n.m6)("w-full h-full flex flex-col gap-6",r&&"justify-center items-center",i&&"justify-center",t&&"items-center",l),children:[a&&s.jsx("h1",{className:"text-4xl font-bold text-foreground",children:a}),o,e.children]})}var a=t(55761);function o(e){return s.jsx("div",{...e,className:(0,a.Z)("w-full h-full",e.className),children:e.children})}var l=t(79223),d=t(68570);let c=(0,d.createProxy)(String.raw`E:\oj-frontend\components\ui\metric\Field.tsx`),{__esModule:u,$$typeof:x}=c;c.default,(0,d.createProxy)(String.raw`E:\oj-frontend\components\ui\metric\Field.tsx#Field`)}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[304,386,723,763],()=>t(91054));module.exports=s})();