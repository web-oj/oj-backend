"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1528],{22629:function(e,t,a){a.d(t,{Z:function(){return s}});var r=a(2265),u={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license hugeicons-react v0.2.0
 *
 * See the LICENSE file in the root directory of this source tree.
 */let s=(e,t)=>{let a=(0,r.forwardRef)(({color:e="currentColor",size:a=24,strokeWidth:s=1.5,className:o="",children:l,...n},i)=>{let d={ref:i,...u,width:a,height:a,strokeWidth:s,color:e,className:o,...n};return(0,r.createElement)("svg",d,t?.map(([e,t])=>r.createElement(e,{key:t.id,...t}))??[],...Array.isArray(l)?l:[l])});return a.displayName=`${e}Icon`,a}},22947:function(e,t,a){a.d(t,{J:function(){return r}});var r=(e,t,a)=>{let r=null==t?void 0:t.current;if(!r||!r.contains(e)){let e=document.querySelectorAll("body > span[data-focus-scope-start]"),t=[];if(e.forEach(e=>{t.push(e.nextElementSibling)}),1===t.length)return a.close(),!1}return!r||!r.contains(e)}},85588:function(e,t,a){a.d(t,{j:function(){return i}});var r=a(75300),u=(0,a(71228).tv)({base:"shrink-0 bg-divider border-none",variants:{orientation:{horizontal:"w-full h-divider",vertical:"h-full w-divider"}},defaultVariants:{orientation:"horizontal"}}),s=a(2265),o=a(81866),l=a(57437),n=(0,o.Gp)((e,t)=>{let{Component:a,getDividerProps:o}=function(e){var t;let a,o;let{as:l,className:n,orientation:i,...d}=e,c=l||"hr";"hr"===c&&"vertical"===i&&(c="div");let{separatorProps:g}=(t={elementType:"string"==typeof c?c:"hr",orientation:i},o=(0,r.z)(t,{enabled:"string"==typeof t.elementType}),("vertical"===t.orientation&&(a="vertical"),"hr"!==t.elementType)?{separatorProps:{...o,role:"separator","aria-orientation":a}}:{separatorProps:o}),f=(0,s.useMemo)(()=>u({orientation:i,className:n}),[i,n]);return{Component:c,getDividerProps:(0,s.useCallback)((e={})=>({className:f,role:"separator","data-orientation":i,...g,...d,...e}),[f,i,g,d])}}({...e});return(0,l.jsx)(a,{ref:t,...o()})});n.displayName="NextUI.Divider";var i=n},18193:function(e,t,a){a.d(t,{S:function(){return C}});var r=a(2265),u=a(80683),s=a(69369),o=a(22947),l=a(23663),n=new WeakMap,i=[],d=a(277),c=a(46896),g=a(26242),f=a(89259),h=a(13389),b=a(48741),p=a(86107),v=a(23452),y=a(33485),x=a(81866),m=a(19257),w=a(30256),D=a(2285),A=a(65263),P=a(53640);function C(e){var t,a,C;let B=(0,y.w)(),[E,k]=(0,x.oe)(e,m.v.variantKeys),{as:N,ref:K,children:M,state:F,triggerRef:S,scrollRef:R,defaultOpen:I,onOpenChange:O,isOpen:T,isNonModal:L=!0,shouldFlip:z=!0,containerPadding:j=12,shouldBlockScroll:V=!1,isDismissable:W=!0,shouldCloseOnBlur:_,portalContainer:G,updatePositionDeps:U,dialogProps:H,placement:J="top",triggerType:q="dialog",showArrow:Z=!1,offset:X=7,crossOffset:Y=0,boundaryElement:$,isKeyboardDismissDisabled:Q,shouldCloseOnInteractOutside:ee,shouldCloseOnScroll:et,motionProps:ea,className:er,classNames:eu,onClose:es,...eo}=E,el=(0,g.gy)(K),en=(0,r.useRef)(null),ei=(0,r.useRef)(!1),ed=S||en,ec=null!=(a=null!=(t=e.disableAnimation)?t:null==B?void 0:B.disableAnimation)&&a,eg=(0,f.d)({isOpen:T,defaultOpen:I,onOpenChange:e=>{null==O||O(e),e||null==es||es()}}),ef=F||eg,{popoverProps:eh,underlayProps:eb,placement:ep}=function(e,t){let{triggerRef:a,popoverRef:g,showArrow:f,offset:h=7,crossOffset:b=0,scrollRef:p,shouldFlip:v,boundaryElement:y,isDismissable:x=!0,shouldCloseOnBlur:m=!0,shouldCloseOnScroll:w=!0,placement:D="top",containerPadding:A,shouldCloseOnInteractOutside:P,isNonModal:C,isKeyboardDismissDisabled:B,updatePositionDeps:E=[],...k}=e,N=null==C||C,{overlayProps:K,underlayProps:M}=(0,u.I)({isOpen:t.isOpen,onClose:t.close,shouldCloseOnBlur:m,isDismissable:x,isKeyboardDismissDisabled:B,shouldCloseOnInteractOutside:P||(e=>(0,o.J)(e,a,t))},g),{overlayProps:F,arrowProps:S,placement:R,updatePosition:I}=(0,s.t)({...k,shouldFlip:v,crossOffset:b,targetRef:a,overlayRef:g,isOpen:t.isOpen,scrollRef:p,boundaryElement:y,containerPadding:A,placement:(0,l.Yx)(D),offset:f?h+3:h,onClose:N&&w?t.close:()=>{}});return(0,c.G)(()=>{E.length&&I()},E),(0,r.useEffect)(()=>{if(t.isOpen&&!N&&g.current)return function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.body,a=new Set(e),r=new Set,u=e=>{for(let t of e.querySelectorAll("[data-live-announcer], [data-react-aria-top-layer]"))a.add(t);let t=e=>{let t=e.parentElement;if(a.has(e)||r.has(t)&&"row"!==t.getAttribute("role"))return NodeFilter.FILTER_REJECT;for(let t of a)if(e.contains(t))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_ACCEPT},u=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:t}),o=t(e);if(o===NodeFilter.FILTER_ACCEPT&&s(e),o!==NodeFilter.FILTER_REJECT){let e=u.nextNode();for(;null!=e;)s(e),e=u.nextNode()}},s=e=>{var t;let a=null!=(t=n.get(e))?t:0;("true"!==e.getAttribute("aria-hidden")||0!==a)&&(0===a&&e.setAttribute("aria-hidden","true"),r.add(e),n.set(e,a+1))};i.length&&i[i.length-1].disconnect(),u(t);let o=new MutationObserver(e=>{for(let t of e)if("childList"===t.type&&0!==t.addedNodes.length&&![...a,...r].some(e=>e.contains(t.target))){for(let e of t.removedNodes)e instanceof Element&&(a.delete(e),r.delete(e));for(let e of t.addedNodes)(e instanceof HTMLElement||e instanceof SVGElement)&&("true"===e.dataset.liveAnnouncer||"true"===e.dataset.reactAriaTopLayer)?a.add(e):e instanceof Element&&u(e)}});o.observe(t,{childList:!0,subtree:!0});let l={observe(){o.observe(t,{childList:!0,subtree:!0})},disconnect(){o.disconnect()}};return i.push(l),()=>{for(let e of(o.disconnect(),r)){let t=n.get(e);null!=t&&(1===t?(e.removeAttribute("aria-hidden"),n.delete(e)):n.set(e,t-1))}l===i[i.length-1]?(i.pop(),i.length&&i[i.length-1].observe()):i.splice(i.indexOf(l),1)}}([g.current])},[N,t.isOpen,g]),{popoverProps:(0,d.d)(K,F),arrowProps:S,underlayProps:M,placement:R}}({triggerRef:ed,isNonModal:L,popoverRef:el,placement:J,offset:X,scrollRef:R,isDismissable:W,shouldCloseOnBlur:_,boundaryElement:$,crossOffset:Y,shouldFlip:z,containerPadding:j,updatePositionDeps:U,isKeyboardDismissDisabled:Q,shouldCloseOnScroll:et,shouldCloseOnInteractOutside:ee},ef),{triggerProps:ev}=(0,b.I)({type:q},ef,ed),{isFocusVisible:ey,isFocused:ex,focusProps:em}=(0,h.F)(),ew=(0,r.useMemo)(()=>(0,m.v)({...k}),[(0,D.Xx)(k)]),eD=(0,A.W)(null==eu?void 0:eu.base,er);(0,p.t)({isDisabled:!(V&&ef.isOpen)});let eA=(0,r.useCallback)(function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{"data-slot":"content","data-open":(0,P.PB)(ef.isOpen),"data-arrow":(0,P.PB)(Z),"data-placement":(0,l.sK)(ep||"top",J),className:ew.content({class:(0,A.W)(null==eu?void 0:eu.content,e.className)})}},[ew,ef.isOpen,Z,ep,J,eu]),eP=(0,r.useMemo)(()=>(0,l.Yv)(ep||"top",J)&&ep||J,[ep,J]),eC=(0,r.useCallback)(t=>{var a;let r;return"touch"===t.pointerType&&((null==e?void 0:e.backdrop)==="blur"||(null==e?void 0:e.backdrop)==="opaque")?r=setTimeout(()=>{ei.current=!0},100):ei.current=!0,null==(a=ev.onPress)||a.call(ev,t),()=>{clearTimeout(r)}},[null==ev?void 0:ev.onPress]),eB=(0,r.useCallback)(function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,{isDisabled:a,...r}=e;return{"data-slot":"trigger",...(0,d.d)({"aria-haspopup":"dialog"},ev,r),onPress:eC,isDisabled:a,className:ew.trigger({class:(0,A.W)(null==eu?void 0:eu.trigger,e.className),isTriggerDisabled:a}),ref:(0,w.l)(t,ed)}},[ef,ev,eC,ed]),eE=(0,r.useCallback)(function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{"data-slot":"backdrop",className:ew.backdrop({class:null==eu?void 0:eu.backdrop}),onClick:e=>{if(!ei.current){e.preventDefault();return}ef.close(),ei.current=!1},...eb,...e}},[ew,ef.isOpen,eu,eb]);return(0,r.useEffect)(()=>{if(ef.isOpen&&(null==el?void 0:el.current))return(0,v.R)([null==el?void 0:el.current])},[ef.isOpen,el]),{state:ef,Component:N||"div",children:M,classNames:eu,showArrow:Z,triggerRef:ed,placement:eP,isNonModal:L,popoverRef:el,portalContainer:G,isOpen:ef.isOpen,onClose:ef.close,disableAnimation:ec,shouldBlockScroll:V,backdrop:null!=(C=e.backdrop)?C:"transparent",motionProps:ea,getBackdropProps:eE,getPopoverProps:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{ref:el,...(0,d.d)(eh,eo,e),style:(0,d.d)(eh.style,eo.style,e.style)}},getTriggerProps:eB,getDialogProps:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{"data-slot":"base","data-open":(0,P.PB)(ef.isOpen),"data-focus":(0,P.PB)(ex),"data-arrow":(0,P.PB)(Z),"data-focus-visible":(0,P.PB)(ey),"data-placement":(0,l.sK)(ep||"top",J),...(0,d.d)(em,H,e),className:ew.base({class:(0,A.W)(eD)}),style:{outline:"none"}}},getContentProps:eA}}},78277:function(e,t,a){a.d(t,{D9:function(){return o},Dk:function(){return l},GI:function(){return s}});var r=a(71228),u=a(5956),s=(0,r.tv)({slots:{base:"w-full relative flex flex-col gap-1 p-1 overflow-hidden",list:"w-full flex flex-col gap-0.5 outline-none",emptyContent:["h-10","px-2","py-1.5","w-full","h-full","text-foreground-400","text-start"]}}),o=(0,r.tv)({slots:{base:["flex","group","gap-2","items-center","justify-between","relative","px-2","py-1.5","w-full","h-full","box-border","rounded-small","subpixel-antialiased","outline-none","cursor-pointer","tap-highlight-transparent",...u.Dh,"data-[focus-visible=true]:dark:ring-offset-background-content1"],wrapper:"w-full flex flex-col items-start justify-center",title:"flex-1 text-small font-normal",description:["w-full","text-tiny","text-foreground-500","group-hover:text-current"],selectedIcon:["text-inherit","w-3","h-3","flex-shrink-0"],shortcut:["px-1","py-0.5","rounded","font-sans","text-foreground-500","text-tiny","border-small","border-default-300","group-hover:border-current"]},variants:{variant:{solid:{base:""},bordered:{base:"border-medium border-transparent bg-transparent"},light:{base:"bg-transparent"},faded:{base:["border-small border-transparent hover:border-default data-[hover=true]:bg-default-100","data-[selectable=true]:focus:border-default data-[selectable=true]:focus:bg-default-100"]},flat:{base:""},shadow:{base:"data-[hover=true]:shadow-lg"}},color:{default:{},primary:{},secondary:{},success:{},warning:{},danger:{}},showDivider:{true:{base:["mb-1.5","after:content-['']","after:absolute","after:-bottom-1","after:left-0","after:right-0","after:h-divider","after:bg-divider"]},false:{}},isDisabled:{true:{base:"opacity-disabled pointer-events-none"}},disableAnimation:{true:{},false:{base:"data-[hover=true]:transition-colors"}},hasTitleTextChild:{true:{title:"truncate"}},hasDescriptionTextChild:{true:{description:"truncate"}}},defaultVariants:{variant:"solid",color:"default",showDivider:!1},compoundVariants:[{variant:"solid",color:"default",class:{base:["data-[hover=true]:bg-default","data-[hover=true]:text-default-foreground","data-[selectable=true]:focus:bg-default","data-[selectable=true]:focus:text-default-foreground"]}},{variant:"solid",color:"primary",class:{base:["data-[hover=true]:bg-primary data-[hover=true]:text-primary-foreground","data-[selectable=true]:focus:bg-primary data-[selectable=true]:focus:text-primary-foreground"]}},{variant:"solid",color:"secondary",class:{base:["data-[hover=true]:bg-secondary data-[hover=true]:text-secondary-foreground","data-[selectable=true]:focus:bg-secondary data-[selectable=true]:focus:text-secondary-foreground"]}},{variant:"solid",color:"success",class:{base:["data-[hover=true]:bg-success data-[hover=true]:text-success-foreground","data-[selectable=true]:focus:bg-success data-[selectable=true]:focus:text-success-foreground"]}},{variant:"solid",color:"warning",class:{base:["data-[hover=true]:bg-warning data-[hover=true]:text-warning-foreground","data-[selectable=true]:focus:bg-warning data-[selectable=true]:focus:text-warning-foreground"]}},{variant:"solid",color:"danger",class:{base:["data-[hover=true]:bg-danger data-[hover=true]:text-danger-foreground","data-[selectable=true]:focus:bg-danger data-[selectable=true]:focus:text-danger-foreground"]}},{variant:"shadow",color:"default",class:{base:["data-[hover=true]:shadow-default/50 data-[hover=true]:bg-default data-[hover=true]:text-default-foreground","data-[selectable=true]:focus:shadow-default/50 data-[selectable=true]:focus:bg-default data-[selectable=true]:focus:text-default-foreground"]}},{variant:"shadow",color:"primary",class:{base:["data-[hover=true]:shadow-primary/30 data-[hover=true]:bg-primary data-[hover=true]:text-primary-foreground","data-[selectable=true]:focus:shadow-primary/30 data-[selectable=true]:focus:bg-primary data-[selectable=true]:focus:text-primary-foreground"]}},{variant:"shadow",color:"secondary",class:{base:["data-[hover=true]:shadow-secondary/30 data-[hover=true]:bg-secondary data-[hover=true]:text-secondary-foreground","data-[selectable=true]:focus:shadow-secondary/30 data-[selectable=true]:focus:bg-secondary data-[selectable=true]:focus:text-secondary-foreground"]}},{variant:"shadow",color:"success",class:{base:["data-[hover=true]:shadow-success/30 data-[hover=true]:bg-success data-[hover=true]:text-success-foreground","data-[selectable=true]:focus:shadow-success/30 data-[selectable=true]:focus:bg-success data-[selectable=true]:focus:text-success-foreground"]}},{variant:"shadow",color:"warning",class:{base:["data-[hover=true]:shadow-warning/30 data-[hover=true]:bg-warning data-[hover=true]:text-warning-foreground","data-[selectable=true]:focus:shadow-warning/30 data-[selectable=true]:focus:bg-warning data-[selectable=true]:focus:text-warning-foreground"]}},{variant:"shadow",color:"danger",class:{base:["data-[hover=true]:shadow-danger/30 data-[hover=true]:bg-danger data-[hover=true]:text-danger-foreground","data-[selectable=true]:focus:shadow-danger/30 data-[selectable=true]:focus:bg-danger data-[selectable=true]:focus:text-danger-foreground"]}},{variant:"bordered",color:"default",class:{base:["data-[hover=true]:border-default","data-[selectable=true]:focus:border-default"]}},{variant:"bordered",color:"primary",class:{base:["data-[hover=true]:border-primary data-[hover=true]:text-primary","data-[selectable=true]:focus:border-primary data-[selectable=true]:focus:text-primary"]}},{variant:"bordered",color:"secondary",class:{base:["data-[hover=true]:border-secondary data-[hover=true]:text-secondary","data-[selectable=true]:focus:border-secondary data-[selectable=true]:focus:text-secondary"]}},{variant:"bordered",color:"success",class:{base:["data-[hover=true]:border-success data-[hover=true]:text-success","data-[selectable=true]:focus:border-success data-[selectable=true]:focus:text-success"]}},{variant:"bordered",color:"warning",class:{base:["data-[hover=true]:border-warning data-[hover=true]:text-warning","data-[selectable=true]:focus:border-warning data-[selectable=true]:focus:text-warning"]}},{variant:"bordered",color:"danger",class:{base:["data-[hover=true]:border-danger data-[hover=true]:text-danger","data-[selectable=true]:focus:border-danger data-[selectable=true]:focus:text-danger"]}},{variant:"flat",color:"default",class:{base:["data-[hover=true]:bg-default/40","data-[hover=true]:text-default-foreground","data-[selectable=true]:focus:bg-default/40","data-[selectable=true]:focus:text-default-foreground"]}},{variant:"flat",color:"primary",class:{base:["data-[hover=true]:bg-primary/20 data-[hover=true]:text-primary","data-[selectable=true]:focus:bg-primary/20 data-[selectable=true]:focus:text-primary"]}},{variant:"flat",color:"secondary",class:{base:["data-[hover=true]:bg-secondary/20 data-[hover=true]:text-secondary","data-[selectable=true]:focus:bg-secondary/20 data-[selectable=true]:focus:text-secondary"]}},{variant:"flat",color:"success",class:{base:["data-[hover=true]:bg-success/20 data-[hover=true]:text-success","data-[selectable=true]:focus:bg-success/20 data-[selectable=true]:focus:text-success"]}},{variant:"flat",color:"warning",class:{base:["data-[hover=true]:bg-warning/20 data-[hover=true]:text-warning","data-[selectable=true]:focus:bg-warning/20 data-[selectable=true]:focus:text-warning"]}},{variant:"flat",color:"danger",class:{base:["data-[hover=true]:bg-danger/20 data-[hover=true]:text-danger","data-[selectable=true]:focus:bg-danger/20 data-[selectable=true]:focus:text-danger"]}},{variant:"faded",color:"default",class:{base:["data-[hover=true]:text-default-foreground","data-[selectable=true]:focus:text-default-foreground"]}},{variant:"faded",color:"primary",class:{base:["data-[hover=true]:text-primary","data-[selectable=true]:focus:text-primary"]}},{variant:"faded",color:"secondary",class:{base:["data-[hover=true]:text-secondary","data-[selectable=true]:focus:text-secondary"]}},{variant:"faded",color:"success",class:{base:["data-[hover=true]:text-success","data-[selectable=true]:focus:text-success"]}},{variant:"faded",color:"warning",class:{base:["data-[hover=true]:text-warning","data-[selectable=true]:focus:text-warning"]}},{variant:"faded",color:"danger",class:{base:["data-[hover=true]:text-danger","data-[selectable=true]:focus:text-danger"]}},{variant:"light",color:"default",class:{base:["data-[hover=true]:text-default-500","data-[selectable=true]:focus:text-default-500"]}},{variant:"light",color:"primary",class:{base:["data-[hover=true]:text-primary","data-[selectable=true]:focus:text-primary"]}},{variant:"light",color:"secondary",class:{base:["data-[hover=true]:text-secondary","data-[selectable=true]:focus:text-secondary"]}},{variant:"light",color:"success",class:{base:["data-[hover=true]:text-success","data-[selectable=true]:focus:text-success"]}},{variant:"light",color:"warning",class:{base:["data-[hover=true]:text-warning","data-[selectable=true]:focus:text-warning"]}},{variant:"light",color:"danger",class:{base:["data-[hover=true]:text-danger","data-[selectable=true]:focus:text-danger"]}}]}),l=(0,r.tv)({slots:{base:"relative mb-2",heading:"pl-1 text-tiny text-foreground-500",group:"data-[has-title=true]:pt-1",divider:"mt-2"}})},98347:function(e,t,a){a.d(t,{d:function(){return i}});var r=a(2265);let u={prefix:String(Math.round(1e10*Math.random())),current:0},s=(r.createContext(u),r.createContext(!1));function o(){return!1}function l(){return!0}function n(e){return()=>{}}function i(){return!("function"==typeof r.useSyncExternalStore?r.useSyncExternalStore(n,o,l):(0,r.useContext)(s))&&"undefined"!=typeof window&&window.screen.width<=700}"undefined"!=typeof window&&window.document&&window.document.createElement,new WeakMap,r.useId},91051:function(e,t,a){a.d(t,{u:function(){return n}});var r={};r={"ar-AE":{longPressMessage:`\u{627}\u{636}\u{63A}\u{637} \u{645}\u{637}\u{648}\u{644}\u{627}\u{64B} \u{623}\u{648} \u{627}\u{636}\u{63A}\u{637} \u{639}\u{644}\u{649} Alt + \u{627}\u{644}\u{633}\u{647}\u{645} \u{644}\u{623}\u{633}\u{641}\u{644} \u{644}\u{641}\u{62A}\u{62D} \u{627}\u{644}\u{642}\u{627}\u{626}\u{645}\u{629}`},"bg-BG":{longPressMessage:`\u{41D}\u{430}\u{442}\u{438}\u{441}\u{43D}\u{435}\u{442}\u{435} \u{43F}\u{440}\u{43E}\u{434}\u{44A}\u{43B}\u{436}\u{438}\u{442}\u{435}\u{43B}\u{43D}\u{43E} \u{438}\u{43B}\u{438} \u{43D}\u{430}\u{442}\u{438}\u{441}\u{43D}\u{435}\u{442}\u{435} Alt+ \u{441}\u{442}\u{440}\u{435}\u{43B}\u{43A}\u{430} \u{43D}\u{430}\u{434}\u{43E}\u{43B}\u{443}, \u{437}\u{430} \u{434}\u{430} \u{43E}\u{442}\u{432}\u{43E}\u{440}\u{438}\u{442}\u{435} \u{43C}\u{435}\u{43D}\u{44E}\u{442}\u{43E}`},"cs-CZ":{longPressMessage:`Dlouh\xfdm stiskem nebo stisknut\xedm kl\xe1ves Alt + \u{161}ipka dol\u{16F} otev\u{159}ete nab\xeddku`},"da-DK":{longPressMessage:`Langt tryk eller tryk p\xe5 Alt + pil ned for at \xe5bne menuen`},"de-DE":{longPressMessage:`Dr\xfccken Sie lange oder dr\xfccken Sie Alt + Nach-unten, um das Men\xfc zu \xf6ffnen`},"el-GR":{longPressMessage:`\u{3A0}\u{3B9}\u{3AD}\u{3C3}\u{3C4}\u{3B5} \u{3C0}\u{3B1}\u{3C1}\u{3B1}\u{3C4}\u{3B5}\u{3C4}\u{3B1}\u{3BC}\u{3AD}\u{3BD}\u{3B1} \u{3AE} \u{3C0}\u{3B1}\u{3C4}\u{3AE}\u{3C3}\u{3C4}\u{3B5} Alt + \u{3BA}\u{3AC}\u{3C4}\u{3C9} \u{3B2}\u{3AD}\u{3BB}\u{3BF}\u{3C2} \u{3B3}\u{3B9}\u{3B1} \u{3BD}\u{3B1} \u{3B1}\u{3BD}\u{3BF}\u{3AF}\u{3BE}\u{3B5}\u{3C4}\u{3B5} \u{3C4}\u{3BF} \u{3BC}\u{3B5}\u{3BD}\u{3BF}\u{3CD}`},"en-US":{longPressMessage:"Long press or press Alt + ArrowDown to open menu"},"es-ES":{longPressMessage:`Mantenga pulsado o pulse Alt + flecha abajo para abrir el men\xfa`},"et-EE":{longPressMessage:`Men\xfc\xfc avamiseks vajutage pikalt v\xf5i vajutage klahve Alt + allanool`},"fi-FI":{longPressMessage:`Avaa valikko painamalla pohjassa tai n\xe4pp\xe4inyhdistelm\xe4ll\xe4 Alt + Alanuoli`},"fr-FR":{longPressMessage:`Appuyez de mani\xe8re prolong\xe9e ou appuyez sur Alt\xa0+\xa0Fl\xe8che vers le bas pour ouvrir le menu.`},"he-IL":{longPressMessage:`\u{5DC}\u{5D7}\u{5E5} \u{5DC}\u{5D7}\u{5D9}\u{5E6}\u{5D4} \u{5D0}\u{5E8}\u{5D5}\u{5DB}\u{5D4} \u{5D0}\u{5D5} \u{5D4}\u{5E7}\u{5E9} Alt + ArrowDown \u{5DB}\u{5D3}\u{5D9} \u{5DC}\u{5E4}\u{5EA}\u{5D5}\u{5D7} \u{5D0}\u{5EA} \u{5D4}\u{5EA}\u{5E4}\u{5E8}\u{5D9}\u{5D8}`},"hr-HR":{longPressMessage:"Dugo pritisnite ili pritisnite Alt + strelicu prema dolje za otvaranje izbornika"},"hu-HU":{longPressMessage:`Nyomja meg hosszan, vagy nyomja meg az Alt + lefele ny\xedl gombot a men\xfc megnyit\xe1s\xe1hoz`},"it-IT":{longPressMessage:`Premere a lungo o premere Alt + Freccia gi\xf9 per aprire il menu`},"ja-JP":{longPressMessage:`\u{9577}\u{62BC}\u{3057}\u{307E}\u{305F}\u{306F} Alt+\u{4E0B}\u{77E2}\u{5370}\u{30AD}\u{30FC}\u{3067}\u{30E1}\u{30CB}\u{30E5}\u{30FC}\u{3092}\u{958B}\u{304F}`},"ko-KR":{longPressMessage:`\u{AE38}\u{AC8C} \u{B204}\u{B974}\u{AC70}\u{B098} Alt + \u{C544}\u{B798}\u{CABD} \u{D654}\u{C0B4}\u{D45C}\u{B97C} \u{B20C}\u{B7EC} \u{BA54}\u{B274} \u{C5F4}\u{AE30}`},"lt-LT":{longPressMessage:`Nor\u{117}dami atidaryti meniu, nuspaud\u{119} palaikykite arba paspauskite \u{201E}Alt + ArrowDown\u{201C}.`},"lv-LV":{longPressMessage:`Lai atv\u{113}rtu izv\u{113}lni, turiet nospiestu vai nospiediet tausti\u{146}u kombin\u{101}ciju Alt + lejupv\u{113}rst\u{101} bulti\u{146}a`},"nb-NO":{longPressMessage:`Langt trykk eller trykk Alt + PilNed for \xe5 \xe5pne menyen`},"nl-NL":{longPressMessage:"Druk lang op Alt + pijl-omlaag of druk op Alt om het menu te openen"},"pl-PL":{longPressMessage:`Naci\u{15B}nij i przytrzymaj lub naci\u{15B}nij klawisze Alt + Strza\u{142}ka w d\xf3\u{142}, aby otworzy\u{107} menu`},"pt-BR":{longPressMessage:"Pressione e segure ou pressione Alt + Seta para baixo para abrir o menu"},"pt-PT":{longPressMessage:"Prima continuamente ou prima Alt + Seta Para Baixo para abrir o menu"},"ro-RO":{longPressMessage:`Ap\u{103}sa\u{21B}i lung sau ap\u{103}sa\u{21B}i pe Alt + s\u{103}geat\u{103} \xeen jos pentru a deschide meniul`},"ru-RU":{longPressMessage:`\u{41D}\u{430}\u{436}\u{43C}\u{438}\u{442}\u{435} \u{438} \u{443}\u{434}\u{435}\u{440}\u{436}\u{438}\u{432}\u{430}\u{439}\u{442}\u{435} \u{438}\u{43B}\u{438} \u{43D}\u{430}\u{436}\u{43C}\u{438}\u{442}\u{435} Alt + \u{421}\u{442}\u{440}\u{435}\u{43B}\u{43A}\u{430} \u{432}\u{43D}\u{438}\u{437}, \u{447}\u{442}\u{43E}\u{431}\u{44B} \u{43E}\u{442}\u{43A}\u{440}\u{44B}\u{442}\u{44C} \u{43C}\u{435}\u{43D}\u{44E}`},"sk-SK":{longPressMessage:`Ponuku otvor\xedte dlh\xfdm stla\u{10D}en\xedm alebo stla\u{10D}en\xedm kl\xe1vesu Alt + kl\xe1vesu so \u{161}\xedpkou nadol`},"sl-SI":{longPressMessage:`Za odprtje menija pritisnite in dr\u{17E}ite gumb ali pritisnite Alt+pu\u{161}\u{10D}ica navzdol`},"sr-SP":{longPressMessage:"Dugo pritisnite ili pritisnite Alt + strelicu prema dole da otvorite meni"},"sv-SE":{longPressMessage:`H\xe5ll nedtryckt eller tryck p\xe5 Alt + pil ned\xe5t f\xf6r att \xf6ppna menyn`},"tr-TR":{longPressMessage:`Men\xfcy\xfc a\xe7mak i\xe7in uzun bas\u{131}n veya Alt + A\u{15F}a\u{11F}\u{131} Ok tu\u{15F}una bas\u{131}n`},"uk-UA":{longPressMessage:`\u{414}\u{43E}\u{432}\u{433}\u{43E} \u{430}\u{431}\u{43E} \u{437}\u{432}\u{438}\u{447}\u{430}\u{439}\u{43D}\u{43E} \u{43D}\u{430}\u{442}\u{438}\u{441}\u{43D}\u{456}\u{442}\u{44C} \u{43A}\u{43E}\u{43C}\u{431}\u{456}\u{43D}\u{430}\u{446}\u{456}\u{44E} \u{43A}\u{43B}\u{430}\u{432}\u{456}\u{448} Alt \u{456} \u{441}\u{442}\u{440}\u{456}\u{43B}\u{43A}\u{430} \u{432}\u{43D}\u{438}\u{437}, \u{449}\u{43E}\u{431} \u{432}\u{456}\u{434}\u{43A}\u{440}\u{438}\u{442}\u{438} \u{43C}\u{435}\u{43D}\u{44E}`},"zh-CN":{longPressMessage:`\u{957F}\u{6309}\u{6216}\u{6309} Alt + \u{5411}\u{4E0B}\u{65B9}\u{5411}\u{952E}\u{4EE5}\u{6253}\u{5F00}\u{83DC}\u{5355}`},"zh-TW":{longPressMessage:`\u{9577}\u{6309}\u{6216}\u{6309} Alt+\u{5411}\u{4E0B}\u{9375}\u{4EE5}\u{958B}\u{555F}\u{529F}\u{80FD}\u{8868}`}};var u=a(80612),s=a(79822),o=a(15966),l=a(48741);function n(e,t,a){var n;let{type:i="menu",isDisabled:d,trigger:c="press"}=e,g=(0,u.Me)(),{triggerProps:f,overlayProps:h}=(0,l.I)({type:i},t,a),b=(0,s.q)((n=r)&&n.__esModule?n.default:n,"@react-aria/menu"),{longPressProps:p}=(0,o.T)({isDisabled:d||"longPress"!==c,accessibilityDescription:b.format("longPressMessage"),onLongPressStart(){t.close()},onLongPress(){t.open("first")}});return delete f.onPress,{menuTriggerProps:{...f,..."press"===c?{onPressStart(e){"touch"===e.pointerType||"keyboard"===e.pointerType||d||t.open("virtual"===e.pointerType?"first":null)},onPress(e){"touch"!==e.pointerType||d||t.toggle()}}:p,id:g,onKeyDown:e=>{if(!d&&("longPress"!==c||e.altKey)&&a&&a.current)switch(e.key){case"Enter":case" ":if("longPress"===c)return;case"ArrowDown":"continuePropagation"in e||e.stopPropagation(),e.preventDefault(),t.toggle("first");break;case"ArrowUp":"continuePropagation"in e||e.stopPropagation(),e.preventDefault(),t.toggle("last");break;default:"continuePropagation"in e&&e.continuePropagation()}}},menuProps:{...h,"aria-labelledby":g,autoFocus:t.focusStrategy||!0,onClose:t.close}}}},48741:function(e,t,a){a.d(t,{I:function(){return o}});var r=a(64292),u=a(2265),s=a(80612);function o(e,t,a){let o,{type:l}=e,{isOpen:n}=t;(0,u.useEffect)(()=>{a&&a.current&&(0,r.v).set(a.current,t.close)}),"menu"===l?o=!0:"listbox"===l&&(o="listbox");let i=(0,s.Me)();return{triggerProps:{"aria-haspopup":o,"aria-expanded":n,"aria-controls":n?i:void 0,onPress:t.toggle},overlayProps:{id:i}}}},76029:function(e,t,a){a.d(t,{d:function(){return s}});var r=a(49896),u=a(90731);class s{isDisabled(e){var t;return"all"===this.disabledBehavior&&((null===(t=e.props)||void 0===t?void 0:t.isDisabled)||this.disabledKeys.has(e.key))}findNextNonDisabled(e,t){let a=e;for(;null!=a;){let e=this.collection.getItem(a);if((null==e?void 0:e.type)==="item"&&!this.isDisabled(e))return a;a=t(a)}return null}getNextKey(e){let t=e;return t=this.collection.getKeyAfter(t),this.findNextNonDisabled(t,e=>this.collection.getKeyAfter(e))}getPreviousKey(e){let t=e;return t=this.collection.getKeyBefore(t),this.findNextNonDisabled(t,e=>this.collection.getKeyBefore(e))}findKey(e,t,a){let r=e,u=this.layoutDelegate.getItemRect(r);if(!u||null==r)return null;let s=u;do{if(null==(r=t(r)))break;u=this.layoutDelegate.getItemRect(r)}while(u&&a(s,u)&&null!=r);return r}isSameRow(e,t){return e.y===t.y||e.x!==t.x}isSameColumn(e,t){return e.x===t.x||e.y!==t.y}getKeyBelow(e){return"grid"===this.layout&&"vertical"===this.orientation?this.findKey(e,e=>this.getNextKey(e),this.isSameRow):this.getNextKey(e)}getKeyAbove(e){return"grid"===this.layout&&"vertical"===this.orientation?this.findKey(e,e=>this.getPreviousKey(e),this.isSameRow):this.getPreviousKey(e)}getNextColumn(e,t){return t?this.getPreviousKey(e):this.getNextKey(e)}getKeyRightOf(e){let t="ltr"===this.direction?"getKeyRightOf":"getKeyLeftOf";return this.layoutDelegate[t]?(e=this.layoutDelegate[t](e),this.findNextNonDisabled(e,e=>this.layoutDelegate[t](e))):"grid"===this.layout?"vertical"===this.orientation?this.getNextColumn(e,"rtl"===this.direction):this.findKey(e,e=>this.getNextColumn(e,"rtl"===this.direction),this.isSameColumn):"horizontal"===this.orientation?this.getNextColumn(e,"rtl"===this.direction):null}getKeyLeftOf(e){let t="ltr"===this.direction?"getKeyLeftOf":"getKeyRightOf";return this.layoutDelegate[t]?(e=this.layoutDelegate[t](e),this.findNextNonDisabled(e,e=>this.layoutDelegate[t](e))):"grid"===this.layout?"vertical"===this.orientation?this.getNextColumn(e,"ltr"===this.direction):this.findKey(e,e=>this.getNextColumn(e,"ltr"===this.direction),this.isSameColumn):"horizontal"===this.orientation?this.getNextColumn(e,"ltr"===this.direction):null}getFirstKey(){let e=this.collection.getFirstKey();return this.findNextNonDisabled(e,e=>this.collection.getKeyAfter(e))}getLastKey(){let e=this.collection.getLastKey();return this.findNextNonDisabled(e,e=>this.collection.getKeyBefore(e))}getKeyPageAbove(e){let t=this.ref.current,a=this.layoutDelegate.getItemRect(e);if(!a)return null;if(t&&!(0,u.a)(t))return this.getFirstKey();let r=e;if("horizontal"===this.orientation){let e=Math.max(0,a.x+a.width-this.layoutDelegate.getVisibleRect().width);for(;a&&a.x>e&&null!=r;)a=null==(r=this.getKeyAbove(r))?null:this.layoutDelegate.getItemRect(r)}else{let e=Math.max(0,a.y+a.height-this.layoutDelegate.getVisibleRect().height);for(;a&&a.y>e&&null!=r;)a=null==(r=this.getKeyAbove(r))?null:this.layoutDelegate.getItemRect(r)}return null!=r?r:this.getFirstKey()}getKeyPageBelow(e){let t=this.ref.current,a=this.layoutDelegate.getItemRect(e);if(!a)return null;if(t&&!(0,u.a)(t))return this.getLastKey();let r=e;if("horizontal"===this.orientation){let e=Math.min(this.layoutDelegate.getContentSize().width,a.y-a.width+this.layoutDelegate.getVisibleRect().width);for(;a&&a.x<e&&null!=r;)a=null==(r=this.getKeyBelow(r))?null:this.layoutDelegate.getItemRect(r)}else{let e=Math.min(this.layoutDelegate.getContentSize().height,a.y-a.height+this.layoutDelegate.getVisibleRect().height);for(;a&&a.y<e&&null!=r;)a=null==(r=this.getKeyBelow(r))?null:this.layoutDelegate.getItemRect(r)}return null!=r?r:this.getLastKey()}getKeyForSearch(e,t){if(!this.collator)return null;let a=this.collection,r=t||this.getFirstKey();for(;null!=r;){let t=a.getItem(r);if(!t)break;let u=t.textValue.slice(0,e.length);if(t.textValue&&0===this.collator.compare(u,e))return r;r=this.getNextKey(r)}return null}constructor(...e){if(1===e.length){let t=e[0];this.collection=t.collection,this.ref=t.ref,this.collator=t.collator,this.disabledKeys=t.disabledKeys||new Set,this.disabledBehavior=t.disabledBehavior||"all",this.orientation=t.orientation||"vertical",this.direction=t.direction,this.layout=t.layout||"stack",this.layoutDelegate=t.layoutDelegate||new r.k(t.ref)}else this.collection=e[0],this.disabledKeys=e[1],this.ref=e[2],this.collator=e[3],this.layout="stack",this.orientation="vertical",this.disabledBehavior="all",this.layoutDelegate=new r.k(this.ref);"stack"===this.layout&&"vertical"===this.orientation&&(this.getKeyLeftOf=void 0,this.getKeyRightOf=void 0)}}},8993:function(e,t,a){a.d(t,{_:function(){return l}});var r=a(2819),u=a(76029),s=a(15795),o=a(2265);function l(e){let{selectionManager:t,collection:a,disabledKeys:l,ref:n,keyboardDelegate:i,layoutDelegate:d}=e,c=(0,s.X)({usage:"search",sensitivity:"base"}),g=t.disabledBehavior,f=(0,o.useMemo)(()=>i||new u.d({collection:a,disabledKeys:l,disabledBehavior:g,ref:n,collator:c,layoutDelegate:d}),[i,d,a,l,n,c,g]),{collectionProps:h}=(0,r.g)({...e,ref:n,selectionManager:t,keyboardDelegate:f});return{listProps:h}}},82563:function(e,t,a){a.d(t,{c:function(){return s}});var r=a(2265);function u(e){return null}u.getCollectionNode=function*(e,t){let{childItems:a,title:u,children:s}=e,o=e.title||e.children,l=e.textValue||("string"==typeof o?o:"")||e["aria-label"]||"";l||(null==t?void 0:t.suppressTextValueWarning)||console.warn("<Item> with non-plain text contents is unsupported by type to select for accessibility. Please add a `textValue` prop."),yield{type:"item",props:e,rendered:o,textValue:l,"aria-label":e["aria-label"],hasChildNodes:null!=e.hasChildItems?e.hasChildItems:!!(e.childItems||e.title&&r.Children.count(e.children)>0),*childNodes(){if(a)for(let e of a)yield{type:"item",value:e};else if(u){let e=[];r.Children.forEach(s,t=>{e.push({type:"item",element:t})}),yield*e}}}};let s=u},61017:function(e,t,a){a.d(t,{i:function(){return s}});var r=a(52897);let u=new WeakMap;function s(e){let t=u.get(e);if(null!=t)return t;let a=0,s=t=>{for(let u of t)"section"===u.type?s((0,r._P)(u,e)):a++};return s(e),u.set(e,a),a}},75699:function(e,t,a){a.d(t,{W:function(){return s}});var r=a(89259),u=a(2265);function s(e){let t=(0,r.d)(e),[a,s]=(0,u.useState)(null),[o,l]=(0,u.useState)([]),n=()=>{l([]),t.close()};return{focusStrategy:a,...t,open(e=null){s(e),t.open()},toggle(e=null){s(e),t.toggle()},close(){n()},expandedKeysStack:o,openSubmenu:(e,t)=>{l(a=>t>a.length?a:[...a.slice(0,t),e])},closeSubmenu:(e,t)=>{l(a=>a[t]===e?a.slice(0,t):a)}}}}}]);