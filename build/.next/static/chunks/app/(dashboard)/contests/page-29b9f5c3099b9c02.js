(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5247],{63265:function(e,t,n){Promise.resolve().then(n.bind(n,85450)),Promise.resolve().then(n.bind(n,57941))},85450:function(e,t,n){"use strict";n.d(t,{default:function(){return S}});var l=n(57437),r=n(2265),s=n(87138),i=n(89512),a=n(97481),o=n(66099),c=n(33489),u=n(67997),d=n(6475),f=n(14590),m=n(5397),h=n(78547),x=n(35761),g=n(48852),j=n(1922),p=n(93731),v=n(68349),C=n(22629);/**
 * @license hugeicons-react v0.2.0
 *
 * See the LICENSE file in the root directory of this source tree.
 */let b=(0,C.Z)("ArrangeByNumbers19Icon",[["path",{d:"M7 10.0003V3.94909C7 3.37458 7 3.08732 6.76959 3.01583C6.26306 2.85867 5.5 4 5.5 4M7 10.0003H5.5M7 10.0003H8.5",stroke:"currentColor",key:"k0"}],["path",{d:"M9 17.5V15.75C9 14.925 9 14.5126 8.70711 14.2563C8.41421 14 7.94281 14 7 14C6.05719 14 5.58579 14 5.29289 14.2563C5 14.5126 5 14.925 5 15.75C5 16.575 5 16.9874 5.29289 17.2437C5.58579 17.5 6.05719 17.5 7 17.5H9ZM9 17.5V18.375C9 19.6124 9 20.2312 8.56066 20.6156C8.12132 21 7.41421 21 6 21H5",stroke:"currentColor",key:"k1"}],["path",{d:"M16.5 20V4M16.5 20C15.7998 20 14.4915 18.0057 14 17.5M16.5 20C17.2002 20 18.5085 18.0057 19 17.5",stroke:"currentColor",key:"k2"}]]),w=(0,C.Z)("ArrowUp01Icon",[["path",{d:"M18 15C18 15 13.5811 9.00001 12 9C10.4188 8.99999 6 15 6 15",stroke:"currentColor",key:"k0"}]]),k=[{name:"ID",uid:"id",sortable:!0},{name:"Title",uid:"title",sortable:!0},{name:"Start Time",uid:"startTime",sortable:!0},{name:"End Time",uid:"endTime",sortable:!0}];var N=n(16434);function S(e){let[t,n]=r.useState(e.contests),[C,S]=r.useState("all"),[y,M]=r.useState("all"),[T,E]=r.useState(""),Z=(0,i.T)({async load(e){let{signal:n}=e;return{items:t}},async sort(e){let{items:t,sortDescriptor:n}=e;return{items:t.sort((e,t)=>{let l=e[n.column]-t[n.column];return"descending"===n.direction?l:-l})}}}),D=r.useMemo(()=>Z.items.filter(e=>e.id.toString().includes(T)),[Z.items,T]);r.useCallback(e=>{e?E(e):E("")},[]);let V=r.useCallback((e,t)=>{switch(t){case"id":return(0,l.jsx)(a.e,{content:"View contest",children:(0,l.jsx)("a",{href:"/contests/".concat(e.id),children:e.id})});case"title":return(0,l.jsx)(s.default,{href:"/contests/".concat(e.id),children:e.title});case"startTime":return new Date(e.startTime).toLocaleString();case"endTime":return new Date(e.endTime).toLocaleString();default:return"-"}},[]),_=r.useMemo(()=>(0,l.jsx)(N.EY,{fullwidth:!0,direction:"row",space:"sm",children:(0,l.jsx)("div",{className:"flex gap-3",children:(0,l.jsxs)(o.F,{classNames:{trigger:"bg-foreground-50 shadow-sm"},children:[(0,l.jsx)(c.S,{className:"hidden sm:flex",children:(0,l.jsx)(u.A,{endContent:(0,l.jsx)(v.Z,{className:"text-small",size:16}),startContent:(0,l.jsx)(b,{className:"text-foreground-500"}),variant:"flat",children:"Start Time"})}),(0,l.jsxs)(d.a,{disallowEmptySelection:!0,"aria-label":"Table Columns",closeOnSelect:!1,selectionMode:"single",onSelectionChange:S,children:[(0,l.jsx)(f.W,{startContent:(0,l.jsx)(v.Z,{}),children:"Decending"},"all"),(0,l.jsx)(f.W,{startContent:(0,l.jsx)(w,{}),children:"Ascending"},"ascending")]})]})})}),[]);return(0,l.jsxs)(N.EY,{fullheight:!0,fullwidth:!0,direction:"column",children:[_,(0,l.jsxs)(m.b,{"aria-label":"Contests Table",classNames:{tbody:"h-full",wrapper:"h-full justify-start",base:"h-full overflow-hidden"},sortDescriptor:Z.sortDescriptor,onSortChange:Z.sort,children:[(0,l.jsx)(h.J,{columns:k,children:e=>(0,l.jsx)(x.j,{align:"actions"===e.uid?"center":"start",allowsSorting:e.sortable,className:"bg-transparent",children:e.name},e.uid)}),(0,l.jsx)(g.y,{isLoading:Z.isLoading,items:D,children:e=>(0,l.jsx)(j.g,{children:t=>(0,l.jsx)(p.X,{children:V(e,t)})},e.id)})]})]})}},37856:function(e,t,n){"use strict";n.d(t,{E:function(){return i}});var l=n(57437),r=n(44839),s=n(96164);function i(e){let{direction:t="row",space:n="md",fullwidth:i=!1,fullheight:a=!1,isCentered:o=!1,isCenteredX:c=!1,isCenteredY:u=!1,roundedMedium:d=!0,classnames:f,className:m,...h}=e;return(0,l.jsxs)("div",{className:(0,s.m6)("flex flex-col gap-2 h-fit w-fit",d&&"rounded-medium",i&&"w-full",a&&"h-full",(0,s.dV)(m,null==f?void 0:f.wrapper)),children:[e.label&&(0,l.jsx)("h3",{className:(0,s.m6)("text-sm font-medium text-foreground","sm"===e.labelSize&&"text-sm","md"===e.labelSize&&"text-md","lg"===e.labelSize&&"text-lg","2xl"===e.labelSize&&"text-2xl font-semibold",null==f?void 0:f.label),children:e.label}),(0,l.jsx)("div",{...e,className:(0,r.Z)("flex w-full h-full","row"===t&&"flex-row","column"===t&&"flex-col","sm"===n&&"gap-2","md"===n&&"gap-4","lg"===n&&"gap-6",o&&"justify-center items-center",c&&"justify-center",u&&"items-center",null==f?void 0:f.container),children:e.children})]})}},41365:function(e,t,n){"use strict";n.d(t,{EY:function(){return l.E}}),n(57437);var l=n(37856)},16434:function(e,t,n){"use strict";n.d(t,{gN:function(){return a.Field},EY:function(){return l.EY},o8:function(){return i}});var l=n(41365),r=n(57437),s=n(44839);function i(e){let{leftContents:t,rightContents:n,classNames:l,...i}=e;return(0,r.jsxs)("div",{className:(0,s.Z)("flex items-center justify-between gap-2 w-full flex-row",null==l?void 0:l.container),...i,children:[(0,r.jsx)("div",{className:(0,s.Z)("flex items-center gap-2",null==l?void 0:l.leftWrapper),children:t}),(0,r.jsx)("div",{className:(0,s.Z)("flex items-center gap-2",null==l?void 0:l.rightWrapper),children:n})]})}var a=n(57941)},57941:function(e,t,n){"use strict";n.r(t),n.d(t,{Field:function(){return i}});var l=n(57437),r=n(97481),s=n(96164);function i(e){let{label:t,value:n,direction:i="row",fullWidth:a=!1,fullHeight:o=!1,showLabel:c=!0,icon:u,classNames:d}=e;return(0,l.jsxs)("div",{className:(0,s.m6)("flex gap-1 justify-center items-center w-fit h-fit","column"===i&&"flex-col",a&&"w-full",o&&"h-full",null==d?void 0:d.wrapper),children:[(0,l.jsx)(r.e,{content:t,placement:"top",children:u}),c&&(0,l.jsx)("div",{className:(0,s.m6)("text-sm font-medium text-foreground",null==d?void 0:d.label),children:t}),(0,l.jsx)("div",{className:(0,s.m6)("text-sm",null==d?void 0:d.value),children:n})]})}},68349:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});/**
 * @license hugeicons-react v0.2.0
 *
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,n(22629).Z)("ArrowDown01Icon",[["path",{d:"M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9",stroke:"currentColor",key:"k0"}]])},31887:function(e,t,n){"use strict";n.d(t,{e:function(){return l},x:function(){return r}});var l=e=>(null==e?void 0:e.length)<=4?e:null==e?void 0:e.slice(0,3),r=(...e)=>{let t=" ";for(let n of e)if("string"==typeof n&&n.length>0){t=n;break}return t}}},function(e){e.O(0,[4876,8725,8829,4100,3057,8530,1822,6191,1528,7138,9973,2971,7023,1744],function(){return e(e.s=63265)}),_N_E=e.O()}]);