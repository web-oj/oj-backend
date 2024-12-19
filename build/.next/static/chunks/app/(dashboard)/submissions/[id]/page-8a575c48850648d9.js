(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2390],{18338:function(e,t,n){Promise.resolve().then(n.bind(n,43284)),Promise.resolve().then(n.bind(n,99630)),Promise.resolve().then(n.bind(n,76673)),Promise.resolve().then(n.bind(n,25200)),Promise.resolve().then(n.bind(n,57941))},43284:function(e,t,n){"use strict";n.d(t,{default:function(){return o}});var l=n(57437),r=n(16434),s=n(37270),i=n(82036);function o(e){let t=(0,i.F)();return(0,l.jsx)(r.EY,{label:(0,l.jsx)("p",{className:"text-foreground text-lg font-bold",children:"Code"}),direction:"column",space:"lg",fullwidth:!0,classnames:{container:"rounded-large overflow-hidden h-auto aspect-[2/1]"},children:(0,l.jsx)(s.ML,{width:"100%",height:"100%",value:t.data.code,options:{formatOnPaste:!0,formatOnType:!0,trimAutoWhitespace:!0,readOnly:!0,padding:{bottom:16,top:16}},loading:(0,l.jsx)("div",{className:"rounded-large bg-foreground-300 w-full h-full"}),defaultLanguage:t.data.language.toLocaleLowerCase(),defaultValue:"// some comment"})})}},99630:function(e,t,n){"use strict";n.d(t,{default:function(){return c}});var l=n(57437),r=n(16434),s=n(82036),i=n(46064),o=n(2265),u=n(43100),a=n(95956);function c(e){let t=(0,s.F)(),[n,c]=(0,o.useState)(),[d,f]=(0,o.useState)(),[m,h]=(0,o.useState)(),p=(0,o.useCallback)(async()=>{if(n)try{return(await (0,u._)(t.data.language.toLocaleLowerCase(),t.data.code)).output}catch(e){a.Am.error("Failed to fetch output")}},[t]);return((0,o.useEffect)(()=>{(null==t?void 0:t.data)&&t.data.result.forEach((e,n)=>{"Accepted"!==e.result&&(c(t.data.problem.testcases[n]),f(e))}),p().then(e=>{h(e)})},[]),n)?(0,l.jsxs)(r.EY,{direction:"column",space:"lg",fullwidth:!0,fullheight:!0,children:[(0,l.jsx)(i.Y,{value:null==n?void 0:n.input,defaultValue:"-",classNames:{inputWrapper:"bg-foreground-50"},labelPlacement:"outside",label:"Input",isReadOnly:!0}),(0,l.jsx)(i.Y,{value:m,defaultValue:"-",isReadOnly:!0,classNames:{inputWrapper:"bg-foreground-50"},labelPlacement:"outside",label:"Output",readOnly:!0}),(0,l.jsx)(i.Y,{value:null==n?void 0:n.output,defaultValue:"-",classNames:{inputWrapper:"bg-foreground-50"},labelPlacement:"outside",label:"Expected output",isReadOnly:!0})]}):null}},76673:function(e,t,n){"use strict";n.d(t,{default:function(){return m}});var l,r,s=n(57437),i=n(14005);/**
 * @license hugeicons-react v0.2.0
 *
 * See the LICENSE file in the root directory of this source tree.
 */let o=(0,n(22629).Z)("Tick01Icon",[["path",{d:"M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.0588 8.83333 19 7",stroke:"currentColor",key:"k0"}]]);var u=n(75844),a=n(16434),c=n(82036),d=n(2265),f=n(44839);function m(e){let{data:t}=(0,c.F)(),[n,l]=(0,d.useState)(0),[r,m]=(0,d.useState)(0),[h,p]=(0,d.useState)("Pending");return(0,d.useEffect)(()=>{if(null==t?void 0:t.result){let e=t.result.filter(e=>"Accepted"===e.result).length;l(e),e===t.result.length?p("Accepted"):0===e&&p("Wrong Answer")}(null==t?void 0:t.problem.testcases)&&m(t.problem.testcases.length)},[t]),(0,s.jsxs)(a.EY,{fullwidth:!0,classnames:{wrapper:"relative"},direction:"column",space:"sm",children:[(0,s.jsx)("h1",{className:(0,f.Z)("text-2xl font-bold text-foreground capitalize","Accepted"===h?"text-success":"Wrong Answer"===h?"text-danger-500":"text-warning"),children:h}),(0,s.jsxs)(a.EY,{className:"text-foreground-500",direction:"row",space:"sm",children:[(0,s.jsx)(a.gN,{icon:(0,s.jsx)(i.Z,{size:16}),label:"Time Limit",value:new Date(null==t?void 0:t.createdAt).toLocaleString(),showLabel:!1}),(0,s.jsx)(a.gN,{icon:(0,s.jsx)(o,{size:16}),label:"Passed",value:"".concat(n,"/").concat(r," testcases passed"),showLabel:!1}),(0,s.jsx)(a.gN,{icon:(0,s.jsx)(u.Z,{size:16}),label:"Language",value:null==t?void 0:t.language,showLabel:!1})]})]})}(l=r||(r={})).Accepted="Accepted",l.WrongAnswer="Wrong Answer",l.Pending="Pending"},25200:function(e,t,n){"use strict";n.d(t,{default:function(){return s}});var l=n(57437),r=n(82036);function s(e){let{submission:t,children:n}=e;return(0,l.jsx)(r.E,{submission:t,children:n})}},82036:function(e,t,n){"use strict";n.d(t,{E:function(){return i},F:function(){return o}});var l=n(57437),r=n(2265);let s=(0,r.createContext)({}),i=e=>{let{children:t,submission:n}=e,[i,o]=(0,r.useState)(n);return(0,l.jsx)(s.Provider,{value:{data:i,setData:o},children:t})},o=()=>{let e=(0,r.useContext)(s);if(void 0===e)throw Error("useSubmission must be used within a SubmissionProvider");return e}},37856:function(e,t,n){"use strict";n.d(t,{E:function(){return i}});var l=n(57437),r=n(44839),s=n(96164);function i(e){let{direction:t="row",space:n="md",fullwidth:i=!1,fullheight:o=!1,isCentered:u=!1,isCenteredX:a=!1,isCenteredY:c=!1,roundedMedium:d=!0,classnames:f,className:m,...h}=e;return(0,l.jsxs)("div",{className:(0,s.m6)("flex flex-col gap-2 h-fit w-fit",d&&"rounded-medium",i&&"w-full",o&&"h-full",(0,s.dV)(m,null==f?void 0:f.wrapper)),children:[e.label&&(0,l.jsx)("h3",{className:(0,s.m6)("text-sm font-medium text-foreground","sm"===e.labelSize&&"text-sm","md"===e.labelSize&&"text-md","lg"===e.labelSize&&"text-lg","2xl"===e.labelSize&&"text-2xl font-semibold",null==f?void 0:f.label),children:e.label}),(0,l.jsx)("div",{...e,className:(0,r.Z)("flex w-full h-full","row"===t&&"flex-row","column"===t&&"flex-col","sm"===n&&"gap-2","md"===n&&"gap-4","lg"===n&&"gap-6",u&&"justify-center items-center",a&&"justify-center",c&&"items-center",null==f?void 0:f.container),children:e.children})]})}},41365:function(e,t,n){"use strict";n.d(t,{EY:function(){return l.E}}),n(57437);var l=n(37856)},16434:function(e,t,n){"use strict";n.d(t,{gN:function(){return o.Field},EY:function(){return l.EY},o8:function(){return i}});var l=n(41365),r=n(57437),s=n(44839);function i(e){let{leftContents:t,rightContents:n,classNames:l,...i}=e;return(0,r.jsxs)("div",{className:(0,s.Z)("flex items-center justify-between gap-2 w-full flex-row",null==l?void 0:l.container),...i,children:[(0,r.jsx)("div",{className:(0,s.Z)("flex items-center gap-2",null==l?void 0:l.leftWrapper),children:t}),(0,r.jsx)("div",{className:(0,s.Z)("flex items-center gap-2",null==l?void 0:l.rightWrapper),children:n})]})}var o=n(57941)},57941:function(e,t,n){"use strict";n.r(t),n.d(t,{Field:function(){return i}});var l=n(57437),r=n(97481),s=n(96164);function i(e){let{label:t,value:n,direction:i="row",fullWidth:o=!1,fullHeight:u=!1,showLabel:a=!0,icon:c,classNames:d}=e;return(0,l.jsxs)("div",{className:(0,s.m6)("flex gap-1 justify-center items-center w-fit h-fit","column"===i&&"flex-col",o&&"w-full",u&&"h-full",null==d?void 0:d.wrapper),children:[c&&(0,l.jsx)(r.e,{content:t,placement:"top",children:c}),a&&(0,l.jsx)("div",{className:(0,s.m6)("text-sm font-medium text-foreground",null==d?void 0:d.label),children:t}),(0,l.jsx)("div",{className:(0,s.m6)("text-sm",null==d?void 0:d.value),children:n})]})}},22629:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var l=n(2265),r={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license hugeicons-react v0.2.0
 *
 * See the LICENSE file in the root directory of this source tree.
 */let s=(e,t)=>{let n=(0,l.forwardRef)(({color:e="currentColor",size:n=24,strokeWidth:s=1.5,className:i="",children:o,...u},a)=>{let c={ref:a,...r,width:n,height:n,strokeWidth:s,color:e,className:i,...u};return(0,l.createElement)("svg",c,t?.map(([e,t])=>l.createElement(e,{key:t.id,...t}))??[],...Array.isArray(o)?o:[o])});return n.displayName=`${e}Icon`,n}},14005:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});/**
 * @license hugeicons-react v0.2.0
 *
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,n(22629).Z)("Clock01Icon",[["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",key:"k0"}],["path",{d:"M12 8V12L14 14",stroke:"currentColor",key:"k1"}]])},75844:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});/**
 * @license hugeicons-react v0.2.0
 *
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,n(22629).Z)("CodeIcon",[["path",{d:"M7.99996 12H8.00893M11.9955 12H12.0044M15.991 12H16",stroke:"currentColor",key:"k0"}],["path",{d:"M18 21C19.2322 21 20.231 19.8487 20.231 18.4286C20.231 16.1808 20.1312 14.6865 21.6733 12.9091C22.1089 12.407 22.1089 11.593 21.6733 11.0909C20.1312 9.31354 20.231 7.81916 20.231 5.57143C20.231 4.15127 19.2322 3 18 3",stroke:"currentColor",key:"k1"}],["path",{d:"M6 21C4.76784 21 3.76897 19.8487 3.76897 18.4286C3.76897 16.1808 3.86877 14.6865 2.32673 12.9091C1.89109 12.407 1.89109 11.593 2.32673 11.0909C3.83496 9.35251 3.76897 7.83992 3.76897 5.57143C3.76897 4.15127 4.76784 3 6 3",stroke:"currentColor",key:"k2"}]])},43100:function(e,t,n){"use strict";n.d(t,{_:function(){return r}});let l=n(38472).Z.create({baseURL:"https://emkc.org/api/v1/piston",headers:{"Content-Type":"application/json"}}),r=async(e,t)=>{try{return console.log(e,t),(await l.post("/execute",{language:e,source:t,files:[{name:"stdin",content:t}]})).data}catch(e){throw console.error(e),Error("Failed to run code")}}},46064:function(e,t,n){"use strict";n.d(t,{Y:function(){return a}});var l=n(92384),r=n(71949),s=n(2265),i=n(81866),o=n(57437),u=(0,i.Gp)((e,t)=>{let{Component:n,label:i,description:u,isClearable:a,startContent:c,endContent:d,labelPlacement:f,hasHelper:m,isOutsideLeft:h,shouldLabelBeOutside:p,errorMessage:x,isInvalid:g,getBaseProps:v,getLabelProps:w,getInputProps:b,getInnerWrapperProps:j,getInputWrapperProps:k,getMainWrapperProps:C,getHelperWrapperProps:N,getDescriptionProps:y,getErrorMessageProps:E,getClearButtonProps:L}=(0,l.G)({...e,ref:t}),A=i?(0,o.jsx)("label",{...w(),children:i}):null,P=(0,s.useMemo)(()=>a?(0,o.jsx)("button",{...L(),children:d||(0,o.jsx)(r.f,{})}):d,[a,L]),S=(0,s.useMemo)(()=>{let e=g&&x,t=e||u;return m&&t?(0,o.jsx)("div",{...N(),children:e?(0,o.jsx)("div",{...E(),children:x}):(0,o.jsx)("div",{...y(),children:u})}):null},[m,g,x,u,N,E,y]),Z=(0,s.useMemo)(()=>(0,o.jsxs)("div",{...j(),children:[c,(0,o.jsx)("input",{...b()}),P]}),[c,P,b,j]),W=(0,s.useMemo)(()=>p?(0,o.jsxs)("div",{...C(),children:[(0,o.jsxs)("div",{...k(),children:[h?null:A,Z]}),S]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("div",{...k(),children:[A,Z]}),S]}),[f,S,p,A,Z,x,u,C,k,E,y]);return(0,o.jsxs)(n,{...v(),children:[h?A:null,W]})});u.displayName="NextUI.Input";var a=u}},function(e){e.O(0,[4876,8725,8829,7778,3760,5956,7270,2971,7023,1744],function(){return e(e.s=18338)}),_N_E=e.O()}]);