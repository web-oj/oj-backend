(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7160],{23529:function(e,r,t){Promise.resolve().then(t.bind(t,81560)),Promise.resolve().then(t.bind(t,70296)),Promise.resolve().then(t.bind(t,16570)),Promise.resolve().then(t.bind(t,57941))},16570:function(e,r,t){"use strict";t.d(r,{default:function(){return n}});var i=t(57437),s=t(67997),l=t(16434);function n(){return(0,i.jsx)(l.o8,{rightContents:(0,i.jsx)(s.A,{color:"primary",form:"create-contest-form",radius:"full",type:"submit",children:"Create"})})}},81560:function(e,r,t){"use strict";t.d(r,{CreateContestForm:function(){return p}});var i=t(57437),s=t(46064),l=t(37595),n=t(81822),a=t(39343),u=t(2265),d=t(51706),c=t(95956),o=t(84248),m=t(37856),h=t(92849),b=t(41980),g=t(81770);function p(e){let{register:r,handleSubmit:t,formState:{errors:p,isValid:x},watch:f}=(0,a.cI)({mode:"onBlur"}),{data:T,setData:P}=(0,o.Nw)(),{user:j}=(0,b.a)(),[v,C]=u.useState(""),w=async e=>{if(!j){c.Am.error("You must be logged in to create a contest");return}try{await (0,h.bg)({organizerId:null==j?void 0:j.id,isPublished:e.isPublished,scoringRule:e.scoringRule,endTime:new Date(e.endTime).getTime(),startTime:new Date(e.startTime).getTime(),ruleText:e.scoringRule,description:e.description,title:e.title}),c.Am.success("Contest created successfully")}catch(e){c.Am.error("Failed to create contest")}},E={title:r("title",{required:"Title is required",maxLength:{value:200,message:"Title must be less than 200 characters"}}),startTime:r("startTime",{required:"Start Time is required"}),endTime:r("endTime",{required:"End Time is required"}),scoringRule:r("scoringRule",{required:"Scoring Rule is required"}),ruleText:r("ruleText",{required:"Rule Text is required"}),isPublished:r("isPublished"),isPlagiarismCheckEnabled:r("isPlagiarismCheckEnabled"),description:r("description",{required:"Description is required"})},k=f();return(0,i.jsxs)("form",{...e,className:"flex flex-col gap-4 lg:min-w-[48ch] overflow-auto",id:"create-contest-form",onBlur:()=>{P({...T,title:k.title,startTime:k.startTime,endTime:k.endTime,scoringRule:k.scoringRule,description:v,isPlagiarismCheckEnabled:k.isPlagiarismCheckEnabled,isPublished:k.isPublished})},onSubmit:t(w,(e,r)=>{console.log(e)}),children:[(0,i.jsx)(s.Y,{isRequired:!0,required:!0,description:"Max length 200",label:"Title",labelPlacement:"outside",placeholder:"Title",radius:"full",type:"text",classNames:{inputWrapper:"bg-foreground-50"},...E.title}),(0,i.jsx)(d.B,{errors:p,name:"title",render:e=>{let{message:r}=e;return(0,i.jsx)("p",{className:"text-red-500 text-sm",children:r})}}),(0,i.jsx)(g.Z,{label:"Description",markdown:v,placeholder:"Type the description here",register:E.description,setMarkdown:C}),(0,i.jsx)(d.B,{errors:p,name:"description",render:e=>{let{message:r}=e;return(0,i.jsx)("p",{className:"text-red-500 text-sm",children:r})}}),(0,i.jsxs)(m.E,{fullwidth:!0,direction:"column",children:[(0,i.jsx)(s.Y,{isRequired:!0,label:"Start Time",labelPlacement:"outside",placeholder:"Start Time",radius:"full",type:"datetime-local",classNames:{inputWrapper:"bg-foreground-50"},...E.startTime}),(0,i.jsx)(s.Y,{isRequired:!0,label:"End Time",labelPlacement:"outside",placeholder:"End Time",radius:"full",type:"datetime-local",classNames:{inputWrapper:"bg-foreground-50"},...E.endTime})]}),(0,i.jsx)(d.B,{errors:p,name:"startTime",render:e=>{let{message:r}=e;return(0,i.jsx)("p",{className:"text-red-500 text-sm",children:r})}}),(0,i.jsx)(d.B,{errors:p,name:"endTime",render:e=>{let{message:r}=e;return(0,i.jsx)("p",{className:"text-red-500 text-sm",children:r})}}),(0,i.jsx)(l.Y,{isRequired:!0,required:!0,classNames:{base:"max-h-[200ch]",inputWrapper:"bg-foreground-50"},label:"Scoring Rule",labelPlacement:"outside",placeholder:"Type the scoring rule here",radius:"full",...E.scoringRule}),(0,i.jsx)(d.B,{errors:p,name:"scoringRule",render:e=>{let{message:r}=e;return(0,i.jsx)("p",{className:"text-red-500 text-sm",children:r})}}),(0,i.jsx)(l.Y,{isRequired:!0,required:!0,classNames:{base:"max-h-[200ch]",inputWrapper:"bg-foreground-50"},label:"Rule Text",labelPlacement:"outside",placeholder:"Type the rule text here",radius:"full",...E.ruleText}),(0,i.jsx)(d.B,{errors:p,name:"ruleText",render:e=>{let{message:r}=e;return(0,i.jsx)("p",{className:"text-red-500 text-sm",children:r})}}),(0,i.jsxs)(m.E,{fullwidth:!0,classnames:{container:"justify-between"},direction:"row",space:"sm",children:[(0,i.jsx)(n.K,{...E.isPublished,onValueChange:e=>{E.isPublished.onChange({target:{value:e}})},children:"Published"}),(0,i.jsx)(n.K,{...E.isPlagiarismCheckEnabled,onValueChange:e=>{E.isPlagiarismCheckEnabled.onChange({target:{value:e}})},children:"Plagiarism Check Enabled"})]})]})}},70296:function(e,r,t){"use strict";t.d(r,{FastCheckTable:function(){return a}});var i=t(57437),s=t(84248),l=t(16434),n=t(81822);function a(e){let{data:r}=(0,s.Nw)(),t=[{label:"Title",value:!!r.title},{label:"Description",value:!!r.description},{label:"Start Time",value:!!r.startTime},{label:"End Time",value:!!r.endTime},{label:"Scoring Rule",value:!!r.scoringRule},{label:"Plagiarism Check",value:!!r&&r.isPlagiarismCheckEnabled},{label:"Published",value:!!r&&r.isPublished}];return(0,i.jsx)(l.EY,{fullwidth:!0,classnames:{wrapper:"w-full bg-foreground-50 rounded-large p-4"},direction:"column",space:"sm",children:t.map((e,t)=>(0,i.jsx)(l.gN,{fullWidth:!0,classNames:{wrapper:"justify-between"},direction:"row",label:e.label,value:(0,i.jsx)(n.K,{isSelected:e.value,isInvalid:"Plagiarism Check"===e.label&&!r.isPlagiarismCheckEnabled||"Published"===e.label&&!r.isPublished,disabled:!0,radius:"full"})},t))})}},84248:function(e,r,t){"use strict";t.d(r,{Nw:function(){return a},ZA:function(){return n}});var i=t(57437),s=t(2265);let l=(0,s.createContext)({}),n=e=>{let{children:r}=e,[t,n]=(0,s.useState)({});return(0,i.jsx)(l.Provider,{value:{data:t,setData:n},children:r})},a=()=>{let e=(0,s.useContext)(l);if(void 0===e)throw Error("useContestTrack must be used within a ContestTrackProvider");return e}},51706:function(e,r,t){"use strict";t.d(r,{B:function(){return l}});var i=t(2265),s=t(39343),l=function(e){var r=e.as,t=e.errors,l=e.name,n=e.message,a=e.render,u=function(e,r){if(null==e)return{};var t,i,s={},l=Object.keys(e);for(i=0;i<l.length;i++)r.indexOf(t=l[i])>=0||(s[t]=e[t]);return s}(e,["as","errors","name","message","render"]),d=(0,s.Gc)(),c=(0,s.U2)(t||d.formState.errors,l);if(!c)return null;var o=c.message,m=c.types,h=Object.assign({},u,{children:o||n});return i.isValidElement(r)?i.cloneElement(r,h):a?a({message:o||n,messages:m}):i.createElement(r||i.Fragment,h)}}},function(e){e.O(0,[7322,3954,4876,8725,8829,7778,7997,3760,8530,5956,1822,7270,7496,197,1886,4276,7215,2971,7023,1744],function(){return e(e.s=23529)}),_N_E=e.O()}]);