(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8989],{60741:function(e,t,r){Promise.resolve().then(r.bind(r,34305)),Promise.resolve().then(r.bind(r,10600)),Promise.resolve().then(r.bind(r,76660)),Promise.resolve().then(r.bind(r,54390)),Promise.resolve().then(r.bind(r,78029)),Promise.resolve().then(r.bind(r,57941))},34305:function(e,t,r){"use strict";r.d(t,{default:function(){return d}});var n=r(57437),i=r(41980),o=r(28804),l=r(13996),a=r(83903),s=r(70317),u=r(16463),c=r(87138);function d(e){let t=(0,o.f)(),r=(0,u.usePathname)(),{user:d}=(0,i.a)();return(null==d?void 0:d.id)!==t.data.owner.id?null:(0,n.jsxs)(l.Z,{children:[(0,n.jsx)(l.h,{color:r.includes("edit")?"primary":"default",as:c.default,href:"/problems/edit/".concat(t.data.id),children:(0,n.jsx)(a.Z,{})}),(0,n.jsx)(l.h,{color:r.includes("edit")?"default":"primary",as:c.default,href:"/problems/".concat(t.data.id),children:(0,n.jsx)(s.Z,{})})]})}},28804:function(e,t,r){"use strict";r.d(t,{N:function(){return l},f:function(){return a}});var n=r(57437),i=r(2265);let o=(0,i.createContext)({}),l=e=>{let{children:t,problem:r}=e,[l,a]=(0,i.useState)(r);return(0,n.jsx)(o.Provider,{value:{data:l,setData:a},children:t})},a=()=>{let e=(0,i.useContext)(o);if(void 0===e)throw Error("useProblem must be used within a ProblemProvider");return e}},76660:function(e,t,r){"use strict";r.d(t,{default:function(){return a}});var n=r(57437),i=r(67997),o=r(51851),l=r(16434);function a(){return(0,n.jsx)(l.o8,{leftContents:(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(o.i,{classNames:{label:"text-foreground-500"},color:"secondary",children:"View mode"})}),rightContents:(0,n.jsx)(i.A,{color:"primary",form:"update-problem-form",radius:"full",type:"submit",children:"Update"})})}},10600:function(e,t,r){"use strict";r.d(t,{FastCheckTable:function(){return l}});var n=r(57437),i=r(28804),o=r(16434);function l(e){let{data:t}=(0,i.f)(),r=[{label:"Title",value:t?t.title:"N/A"},{label:"Difficulty",value:t?t.difficulty:"N/A"},{label:"Time Limit",value:t?t.timeLimit:"N/A"},{label:"Memory Limit",value:t?t.memoryLimit:"N/A"}];return(0,n.jsx)(o.EY,{fullwidth:!0,classnames:{wrapper:"w-full bg-foreground-50 rounded-large p-4"},direction:"column",space:"sm",children:r.map((e,t)=>(0,n.jsx)(o.gN,{fullWidth:!0,classNames:{wrapper:"justify-between"},direction:"row",label:e.label,value:e.value},t))})}},54390:function(e,t,r){"use strict";r.d(t,{UpdateProblemForm:function(){return P}});var n=r(57437),i=r(46064),o=r(37595),l=r(39343),a=r(51706),s=r(2265),u=r(95956),c=r(37856),d=r(92849),m=r(28804),f=r(37270),h=r(76208),p=r(55786),x=r(29010),b=r(17592),y=r(66799),g=r(12039),w=r(67997),j=r(26869),v=r(28465),F=r(97199),E=r(71885),N=r(83092),k=r(41365);r(7395);let L=s.forwardRef((e,t)=>{let{markdown:r,setMarkdown:i,register:l,...a}=e,{isOpen:s,onOpen:u,onClose:c}=(0,h.q)();return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(o.Y,{isRequired:!0,required:!0,description:(0,n.jsxs)("p",{children:["Support ",(0,n.jsx)("b",{children:"markdown"})," and ",(0,n.jsx)("b",{children:"latex"})," syntax"]}),label:"Statement",labelPlacement:"outside",placeholder:"Click here to write the statement",radius:"full",value:r,onClick:u,...l}),(0,n.jsx)(p.R,{isOpen:s,size:"5xl",onClose:c,children:(0,n.jsxs)(x.A,{children:[(0,n.jsx)(b.k,{children:"Statement Editor"}),(0,n.jsx)(y.I,{children:(0,n.jsxs)(k.EY,{direction:"row",children:[(0,n.jsx)(f.ML,{height:"75vh",language:"markdown",options:{fontSize:16,minimap:{enabled:!1}},theme:"light",value:r,width:"50%",onChange:e=>{i(e)}}),(0,n.jsx)(j.U,{rehypePlugins:[v.Z,E.Z],remarkPlugins:[F.Z,N.Z],children:r.replace(/&nbsp;/g,"")})]})}),(0,n.jsx)(g.R,{children:(0,n.jsx)(w.A,{color:"primary",radius:"full",onClick:c,children:"Close"})})]})})]})});function P(e){let{data:t,setData:r}=(0,m.f)(),{register:f,handleSubmit:h,formState:{errors:p,isValid:x},watch:b}=(0,l.cI)({mode:"onChange",defaultValues:{title:t.title,statement:t.statement,difficulty:t.difficulty,timeLimit:t.timeLimit,memoryLimit:t.memoryLimit,inputFormat:t.inputFormat,outputFormat:t.outputFormat,solutionText:t.solutionText}}),[y,g]=s.useState(t.statement),w=async e=>{let{title:t,statement:r,difficulty:n,timeLimit:i,memoryLimit:o,inputFormat:l,outputFormat:a,solutionText:s}=e;try{await (0,d.uJ)({id:10,data:{...e,title:t,statement:r,difficulty:n,timeLimit:i,memoryLimit:o,inputFormat:l,outputFormat:a,solutionText:s}}),u.Am.success("Problem created successfully")}catch(e){u.Am.error("Failed to create problem")}},j={title:f("title",{maxLength:{value:200,message:"Title must be less than 200 characters"}}),statement:f("statement"),difficulty:f("difficulty",{min:{value:1,message:"Difficulty must be at least 1"}}),timeLimit:f("timeLimit",{min:{value:1,message:"Time limit must be at least 1 millisecond"}}),memoryLimit:f("memoryLimit",{min:{value:1,message:"Memory limit must be at least 1 byte"}}),inputFormat:f("inputFormat",{}),outputFormat:f("outputFormat",{}),solutionText:f("solutionText",{})},v=b();return(0,n.jsxs)("form",{...e,id:"update-problem-form",onBlur:()=>{r({...t,title:v.title,statement:v.statement,difficulty:v.difficulty,timeLimit:v.timeLimit,memoryLimit:v.memoryLimit,inputFormat:v.inputFormat,outputFormat:v.outputFormat,solutionText:v.solutionText})},onSubmit:h(w,(e,t)=>{console.log(e)}),children:[(0,n.jsx)(i.Y,{description:"Max length ".concat(j.title.maxLength),label:"Title",labelPlacement:"outside",placeholder:"Title",radius:"full",type:"text",...j.title}),(0,n.jsx)(a.B,{errors:p,name:"title",render:e=>(0,n.jsx)("p",{className:"text-sm text-danger",children:e.message})}),(0,n.jsx)(i.Y,{fullWidth:!0,description:"Difficulty level of the problem",label:"Difficulty",labelPlacement:"outside",placeholder:"Difficulty",radius:"full",type:"number",...j.difficulty}),(0,n.jsx)(a.B,{errors:p,name:"difficulty",render:e=>(0,n.jsx)("p",{className:"text-sm text-danger",children:e.message})}),(0,n.jsx)(L,{markdown:y,register:j.statement,setMarkdown:g}),(0,n.jsxs)(c.E,{direction:"row",fullwidth:!0,children:[(0,n.jsx)(i.Y,{fullWidth:!0,description:"Time limit in milliseconds",label:"Time Limit",labelPlacement:"outside",placeholder:"Time Limit",radius:"full",type:"number",...j.timeLimit}),(0,n.jsx)(i.Y,{fullWidth:!0,description:"Memory limit in bytes",label:"Memory Limit",labelPlacement:"outside",placeholder:"Memory Limit",radius:"full",type:"number",...j.memoryLimit})]}),(0,n.jsx)(a.B,{errors:p,name:"timeLimit",render:e=>(0,n.jsx)("p",{className:"text-sm text-danger",children:e.message})}),(0,n.jsx)(a.B,{errors:p,name:"memoryLimit",render:e=>(0,n.jsx)("p",{className:"text-sm text-danger",children:e.message})}),(0,n.jsx)(o.Y,{description:"Describe the input format",label:"Input Format",labelPlacement:"outside",placeholder:"Type the input format here",radius:"full",...j.inputFormat}),(0,n.jsx)(o.Y,{description:"Describe the output format",label:"Output Format",labelPlacement:"outside",placeholder:"Type the output format here",radius:"full",...j.outputFormat}),(0,n.jsx)(o.Y,{description:"Describe the solution",label:"Solution Text",labelPlacement:"outside",placeholder:"Type the solution text here",radius:"full",...j.solutionText}),(0,n.jsx)(a.B,{errors:p,name:"inputFormat",render:e=>(0,n.jsx)("p",{className:"text-sm text-danger",children:e.message})})]})}L.displayName="StatementEditorInput"},78029:function(e,t,r){"use strict";r.d(t,{default:function(){return o}});var n=r(57437),i=r(28804);function o(e){return(0,n.jsx)(i.N,{problem:e.problem,children:e.children})}},41980:function(e,t,r){"use strict";r.d(t,{H:function(){return s},a:function(){return u}});var n=r(57437),i=r(2265),o=r(44785),l=r(92849);let a=(0,i.createContext)(void 0),s=e=>{let{children:t}=e,[r,s]=(0,i.useState)(null),[u,c]=(0,i.useState)(!1),[d,m]=(0,i.useState)(null),f=i.useCallback(async()=>{try{if(!d)return;let e=await (0,l.TO)();s(e),console.log("Fetched user",e)}catch(e){console.error("Failed to fetch user",e)}},[d]);return(0,i.useEffect)(()=>{let e=o.Z.get("token");e&&m(e),o.Z.get("cookieConsent")||c(!0)},[]),(0,i.useEffect)(()=>{null===r&&f()},[r,f,d]),(0,n.jsx)(a.Provider,{value:{user:r,login:e=>{if(!e)throw Error("Token is required");o.Z.set("token",e),m(e)},logout:()=>{o.Z.remove("token"),s(null)},showCookieConsent:u,allowCookies:()=>{o.Z.set("cookieConsent","true"),c(!1)},declineCookies:()=>{o.Z.set("cookieConsent","false"),c(!1)}},children:t})},u=()=>{let e=(0,i.useContext)(a);if(void 0===e)throw Error("useAuth must be used within an AuthProvider");return e}},13996:function(e,t,r){"use strict";r.d(t,{Z:function(){return a},h:function(){return l}});var n=r(57437),i=r(67997),o=r(16434);function l(e){return(0,n.jsx)(i.A,{...e,isIconOnly:!0,className:"dark",radius:"full",children:e.children})}function a(e){return(0,n.jsx)(o.EY,{direction:"row",space:"sm",...e,classnames:{wrapper:"bg-foreground-900 p-1 !rounded-full fixed bottom-4 left-1/2 transform -translate-x-1/2 border-1 border-foreground-200 shadow-lg"},children:e.children})}},37856:function(e,t,r){"use strict";r.d(t,{E:function(){return l}});var n=r(57437),i=r(44839),o=r(96164);function l(e){let{direction:t="row",space:r="md",fullwidth:l=!1,fullheight:a=!1,isCentered:s=!1,isCenteredX:u=!1,isCenteredY:c=!1,roundedMedium:d=!0,classnames:m,className:f,...h}=e;return(0,n.jsxs)("div",{className:(0,o.m6)("flex flex-col gap-2 h-fit w-fit",d&&"rounded-medium",l&&"w-full",a&&"h-full",(0,o.dV)(f,null==m?void 0:m.wrapper)),children:[e.label&&(0,n.jsx)("h3",{className:(0,o.m6)("text-sm font-medium text-foreground","sm"===e.labelSize&&"text-sm","md"===e.labelSize&&"text-md","lg"===e.labelSize&&"text-lg","2xl"===e.labelSize&&"text-2xl font-semibold",null==m?void 0:m.label),children:e.label}),(0,n.jsx)("div",{...e,className:(0,i.Z)("flex w-full h-full","row"===t&&"flex-row","column"===t&&"flex-col","sm"===r&&"gap-2","md"===r&&"gap-4","lg"===r&&"gap-6",s&&"justify-center items-center",u&&"justify-center",c&&"items-center",null==m?void 0:m.container),children:e.children})]})}},41365:function(e,t,r){"use strict";r.d(t,{EY:function(){return n.E}}),r(57437);var n=r(37856)},16434:function(e,t,r){"use strict";r.d(t,{gN:function(){return a.Field},EY:function(){return n.EY},o8:function(){return l}});var n=r(41365),i=r(57437),o=r(44839);function l(e){let{leftContents:t,rightContents:r,classNames:n,...l}=e;return(0,i.jsxs)("div",{className:(0,o.Z)("flex items-center justify-between gap-2 w-full flex-row",null==n?void 0:n.container),...l,children:[(0,i.jsx)("div",{className:(0,o.Z)("flex items-center gap-2",null==n?void 0:n.leftWrapper),children:t}),(0,i.jsx)("div",{className:(0,o.Z)("flex items-center gap-2",null==n?void 0:n.rightWrapper),children:r})]})}var a=r(57941)},57941:function(e,t,r){"use strict";r.r(t),r.d(t,{Field:function(){return l}});var n=r(57437),i=r(97481),o=r(96164);function l(e){let{label:t,value:r,direction:l="row",fullWidth:a=!1,fullHeight:s=!1,showLabel:u=!0,icon:c,classNames:d}=e;return(0,n.jsxs)("div",{className:(0,o.m6)("flex gap-1 justify-center items-center w-fit h-fit","column"===l&&"flex-col",a&&"w-full",s&&"h-full",null==d?void 0:d.wrapper),children:[c&&(0,n.jsx)(i.e,{content:t,placement:"top",children:c}),u&&(0,n.jsx)("div",{className:(0,o.m6)("text-sm font-medium text-foreground",null==d?void 0:d.label),children:t}),(0,n.jsx)("div",{className:(0,o.m6)("text-sm",null==d?void 0:d.value),children:r})]})}},92849:function(e,t,r){"use strict";r.d(t,{SC:function(){return x},bg:function(){return h},Rf:function(){return d},fP:function(){return j},kT:function(){return f},Zp:function(){return c},zN:function(){return y},TO:function(){return s},x4:function(){return a},K9:function(){return g},T0:function(){return b},y1:function(){return l},cg:function(){return w},ct:function(){return p},uJ:function(){return m}});var n=r(38472),i=r(44785);r(20357).env.NEXT_PUBLIC_API_VERSION;let o=n.Z.create({baseURL:"http://54.179.65.18:3000"});async function l(e){try{return(await o.post("/user",e)).data.data}catch(e){throw console.error("Failed to sign up",e),Error("Failed to sign up")}}async function a(e){try{return(await o.post("/user/login",e)).data.data.token}catch(e){throw Error("Failed to sign in")}}async function s(){try{let e=await o.get("/user/id");return await u({id:e.data.data.id})}catch(e){throw console.error(e),Error("Failed to fetch user by token")}}async function u(e){try{return(await o.get("/user/".concat(e.id))).data.data}catch(e){throw console.error(e),Error("Failed to fetch user by ID")}}async function c(){try{return(await o.get("/user/leaderboard")).data.data}catch(e){throw Error("Failed to fetch leaderboard")}}async function d(e){try{return(await o.post("/problem",e)).data}catch(e){throw console.log(e),Error("Failed to create problem")}}async function m(e){try{return(await o.patch("/problem/id/".concat(e.id),e.data)).data}catch(e){throw Error("Failed to update problem")}}async function f(e,t){try{return(await o.get("/problem")).data.data}catch(e){throw Error("Failed to fetch all problems")}}async function h(e){try{return(await o.post("/contest",e)).data}catch(e){throw console.log(e),Error("Failed to create contest")}}async function p(e){try{return(await o.patch("/contest/".concat(e.id),e.data)).data}catch(e){throw Error("Failed to update contest")}}async function x(e){try{return(await o.post("/contest/".concat(e.contestId,"/problem"),{problemId:e.problemId,score:e.score})).data}catch(e){throw console.error(e),Error("Failed to add problem to contest")}}async function b(e){try{return(await o.delete("/contest/".concat(e.id,"/problem"),{data:{problemId:e.problemId}})).data}catch(e){throw console.error(e),Error("Failed to remove problem from contest")}}async function y(e){try{return(await o.get("/contest/".concat(e.id,"/problem"))).data.data}catch(e){throw Error("Failed to get problems in contest")}}async function g(e){try{return(await o.post("/contest/".concat(e.id,"/register"),{id:e.userId})).data.data}catch(e){throw Error("Failed to register for contest")}}async function w(e){try{return(await o.delete("/contest/".concat(e.id,"/register"),{data:{id:e.userId}})).data}catch(e){throw Error("Failed to unregister for contest")}}async function j(e){btoa(e.code).includes(e.code)||(e.code=btoa(e.code));try{return(await o.post("/submission",{...e})).data}catch(e){throw console.error(e),Error("Failed to create submission")}}o.interceptors.request.use(e=>{let t=i.Z.get("token");return t&&(e.headers["x-access-token"]=t),e})}},function(e){e.O(0,[7322,3954,4876,8725,8829,7778,7997,3760,8530,5956,7270,7496,197,1886,7138,9231,2971,7023,1744],function(){return e(e.s=60741)}),_N_E=e.O()}]);