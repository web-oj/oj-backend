(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8555],{55634:function(e,t,n){Promise.resolve().then(n.bind(n,9896))},9896:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return o}});var l=n(57437),r=n(72419),a=n(16434);function o(e){return(0,l.jsxs)(a.EY,{fullheight:!0,fullwidth:!0,isCentered:!0,direction:"column",children:[(0,l.jsx)(r.X,{className:"rounded-2xl bg-foreground-500/25 w-full h-16"}),(0,l.jsxs)(a.EY,{fullheight:!0,fullwidth:!0,isCentered:!0,children:[(0,l.jsx)(r.X,{className:"flex-1 rounded-2xl bg-foreground-500/25 w-full h-full"}),(0,l.jsx)(r.X,{className:"flex-1 rounded-2xl bg-foreground-500/25 w-full h-full"})]})]})}},37856:function(e,t,n){"use strict";n.d(t,{E:function(){return o}});var l=n(57437),r=n(44839),a=n(96164);function o(e){let{direction:t="row",space:n="md",fullwidth:o=!1,fullheight:i=!1,isCentered:s=!1,isCenteredX:u=!1,isCenteredY:d=!1,roundedMedium:f=!0,classnames:c,className:m,...b}=e;return(0,l.jsxs)("div",{className:(0,a.m6)("flex flex-col gap-2 h-fit w-fit",f&&"rounded-medium",o&&"w-full",i&&"h-full",(0,a.dV)(m,null==c?void 0:c.wrapper)),children:[e.label&&(0,l.jsx)("h3",{className:(0,a.m6)("text-sm font-medium text-foreground","sm"===e.labelSize&&"text-sm","md"===e.labelSize&&"text-md","lg"===e.labelSize&&"text-lg","2xl"===e.labelSize&&"text-2xl font-semibold",null==c?void 0:c.label),children:e.label}),(0,l.jsx)("div",{...e,className:(0,r.Z)("flex w-full h-full","row"===t&&"flex-row","column"===t&&"flex-col","sm"===n&&"gap-2","md"===n&&"gap-4","lg"===n&&"gap-6",s&&"justify-center items-center",u&&"justify-center",d&&"items-center",null==c?void 0:c.container),children:e.children})]})}},41365:function(e,t,n){"use strict";n.d(t,{EY:function(){return l.E}}),n(57437);var l=n(37856)},16434:function(e,t,n){"use strict";n.d(t,{gN:function(){return i.Field},EY:function(){return l.EY},o8:function(){return o}});var l=n(41365),r=n(57437),a=n(44839);function o(e){let{leftContents:t,rightContents:n,classNames:l,...o}=e;return(0,r.jsxs)("div",{className:(0,a.Z)("flex items-center justify-between gap-2 w-full flex-row",null==l?void 0:l.container),...o,children:[(0,r.jsx)("div",{className:(0,a.Z)("flex items-center gap-2",null==l?void 0:l.leftWrapper),children:t}),(0,r.jsx)("div",{className:(0,a.Z)("flex items-center gap-2",null==l?void 0:l.rightWrapper),children:n})]})}var i=n(57941)},57941:function(e,t,n){"use strict";n.r(t),n.d(t,{Field:function(){return o}});var l=n(57437),r=n(97481),a=n(96164);function o(e){let{label:t,value:n,direction:o="row",fullWidth:i=!1,fullHeight:s=!1,showLabel:u=!0,icon:d,classNames:f}=e;return(0,l.jsxs)("div",{className:(0,a.m6)("flex gap-1 justify-center items-center w-fit h-fit","column"===o&&"flex-col",i&&"w-full",s&&"h-full",null==f?void 0:f.wrapper),children:[(0,l.jsx)(r.e,{content:t,placement:"top",children:d}),u&&(0,l.jsx)("div",{className:(0,a.m6)("text-sm font-medium text-foreground",null==f?void 0:f.label),children:t}),(0,l.jsx)("div",{className:(0,a.m6)("text-sm",null==f?void 0:f.value),children:n})]})}},72419:function(e,t,n){"use strict";n.d(t,{X:function(){return c}});var l=n(81866),r=(0,n(71228).tv)({slots:{base:["group","relative","overflow-hidden","bg-content3 dark:bg-content2","pointer-events-none","before:opacity-100","before:absolute","before:inset-0","before:-translate-x-full","before:animate-[shimmer_2s_infinite]","before:border-t","before:border-content4/30","before:bg-gradient-to-r","before:from-transparent","before:via-content4","dark:before:via-default-700/10","before:to-transparent","after:opacity-100","after:absolute","after:inset-0","after:-z-10","after:bg-content3","dark:after:bg-content2","data-[loaded=true]:pointer-events-auto","data-[loaded=true]:overflow-visible","data-[loaded=true]:!bg-transparent","data-[loaded=true]:before:opacity-0 data-[loaded=true]:before:-z-10 data-[loaded=true]:before:animate-none","data-[loaded=true]:after:opacity-0"],content:["opacity-0","group-data-[loaded=true]:opacity-100"]},variants:{disableAnimation:{true:{base:"before:animate-none before:transition-none after:transition-none",content:"transition-none"},false:{base:"transition-background !duration-300",content:"transition-opacity motion-reduce:transition-none !duration-300"}}},defaultVariants:{}}),a=n(2285),o=n(65263),i=n(53640),s=n(2265),u=n(33485),d=n(57437),f=(0,l.Gp)((e,t)=>{let{Component:n,children:f,getSkeletonProps:c,getContentProps:m}=function(e){var t,n;let d=(0,u.w)(),[f,c]=(0,l.oe)(e,r.variantKeys),{as:m,children:b,isLoaded:v=!1,className:x,classNames:h,...p}=f,g=null!=(n=null!=(t=e.disableAnimation)?t:null==d?void 0:d.disableAnimation)&&n,w=(0,s.useMemo)(()=>r({...c,disableAnimation:g}),[(0,a.Xx)(c),g,b]),N=(0,o.W)(null==h?void 0:h.base,x);return{Component:m||"div",children:b,slots:w,classNames:h,getSkeletonProps:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{"data-loaded":(0,i.PB)(v),className:w.base({class:(0,o.W)(N,null==e?void 0:e.className)}),...p}},getContentProps:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{className:w.content({class:(0,o.W)(null==h?void 0:h.content,null==e?void 0:e.className)})}}}}({...e});return(0,d.jsx)(n,{ref:t,...c(),children:(0,d.jsx)("div",{...m(),children:f})})});f.displayName="NextUI.Skeleton";var c=f}},function(e){e.O(0,[4876,2971,7023,1744],function(){return e(e.s=55634)}),_N_E=e.O()}]);