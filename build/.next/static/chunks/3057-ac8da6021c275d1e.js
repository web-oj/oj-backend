"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3057],{15966:function(e,t,l){l.d(t,{T:function(){return c}});var n=l(89332),i=l(61507),o=l(99222),r=l(277),s=l(2265);function c(e){let{isDisabled:t,onLongPressStart:l,onLongPressEnd:c,onLongPress:u,threshold:a=500,accessibilityDescription:d}=e,f=(0,s.useRef)(void 0),{addGlobalListener:y,removeGlobalListener:h}=(0,i.x)(),{pressProps:p}=(0,n.r)({isDisabled:t,onPressStart(e){if(e.continuePropagation(),("mouse"===e.pointerType||"touch"===e.pointerType)&&(l&&l({...e,type:"longpressstart"}),f.current=setTimeout(()=>{e.target.dispatchEvent(new PointerEvent("pointercancel",{bubbles:!0})),u&&u({...e,type:"longpress"}),f.current=void 0},a),"touch"===e.pointerType)){let t=e=>{e.preventDefault()};y(e.target,"contextmenu",t,{once:!0}),y(window,"pointerup",()=>{setTimeout(()=>{h(e.target,"contextmenu",t)},30)},{once:!0})}},onPressEnd(e){f.current&&clearTimeout(f.current),c&&("mouse"===e.pointerType||"touch"===e.pointerType)&&c({...e,type:"longpressend"})}}),g=(0,o.P)(u&&!t?d:void 0);return{longPressProps:(0,r.d)(p,g)}}},2819:function(e,t,l){l.d(t,{g:function(){return v}});var n=l(64913),i=l(80112),o=l(54887),r=l(2265),s=l(27546),c=l(87603),u=l(46671),a=l(250),d=l(7353);function f(e,t,l,n){let i=(0,d.i)(l),o=null==l;(0,r.useEffect)(()=>{if(o||!e.current)return;let l=e.current;return l.addEventListener(t,i,n),()=>{l.removeEventListener(t,i,n)}},[e,t,n,o,i])}var y=l(20878),h=l(277),p=l(34938),g=l(72258);function v(e){let t,{selectionManager:l,keyboardDelegate:d,ref:v,autoFocus:K=!1,shouldFocusWrap:S=!1,disallowEmptySelection:m=!1,disallowSelectAll:b=!1,selectOnFocus:k="replace"===l.selectionBehavior,disallowTypeAhead:w=!1,shouldUseVirtualFocus:F,allowsTabNavigation:P=!1,isVirtualized:T,scrollRef:E=v,linkBehavior:D="action"}=e,{direction:I}=(0,g.j)(),C=(0,u.tv)(),x=(0,r.useRef)({top:0,left:0});f(E,"scroll",T?void 0:()=>{var e,t,l,n;x.current={top:null!==(l=null===(e=E.current)||void 0===e?void 0:e.scrollTop)&&void 0!==l?l:0,left:null!==(n=null===(t=E.current)||void 0===t?void 0:t.scrollLeft)&&void 0!==n?n:0}});let M=(0,r.useRef)(K);(0,r.useEffect)(()=>{if(M.current){var e,t,n,i;let o=null;"first"===K&&(o=null!==(n=null===(e=d.getFirstKey)||void 0===e?void 0:e.call(d))&&void 0!==n?n:null),"last"===K&&(o=null!==(i=null===(t=d.getLastKey)||void 0===t?void 0:t.call(d))&&void 0!==i?i:null);let r=l.selectedKeys;if(r.size){for(let e of r)if(l.canSelectItem(e)){o=e;break}}l.setFocused(!0),l.setFocusedKey(o),null==o&&!F&&v.current&&(0,c.e)(v.current)}},[]);let L=(0,r.useRef)(l.focusedKey);(0,r.useEffect)(()=>{if(l.isFocused&&null!=l.focusedKey&&(l.focusedKey!==L.current||M.current)&&E.current&&v.current){let e=(0,p.Jz)(),t=v.current.querySelector(`[data-key="${CSS.escape(l.focusedKey.toString())}"]`);if(!t)return;("keyboard"===e||M.current)&&((0,y.z)(E.current,t),"virtual"!==e&&(0,y.G)(t,{containingElement:v.current}))}!F&&l.isFocused&&null==l.focusedKey&&null!=L.current&&v.current&&(0,c.e)(v.current),L.current=l.focusedKey,M.current=!1}),f(v,"react-aria-focus-scope-restore",e=>{e.preventDefault(),l.setFocused(!0)});let A={onKeyDown:e=>{var t,i,r,c,u,f,y,h,p,g,K,w,F;if(e.altKey&&"Tab"===e.key&&e.preventDefault(),!(null===(t=v.current)||void 0===t?void 0:t.contains(e.target)))return;let T=(t,i)=>{if(null!=t){if(l.isLink(t)&&"selection"===D&&k&&!(0,n.F)(e)){var r;(0,o.flushSync)(()=>{l.setFocusedKey(t,i)});let n=null===(r=E.current)||void 0===r?void 0:r.querySelector(`[data-key="${CSS.escape(t.toString())}"]`),s=l.getItemProps(t);n&&C.open(n,e,s.href,s.routerOptions);return}l.setFocusedKey(t,i),l.isLink(t)&&"override"===D||(e.shiftKey&&"multiple"===l.selectionMode?l.extendSelection(t):k&&!(0,n.F)(e)&&l.replaceSelection(t))}};switch(e.key){case"ArrowDown":if(d.getKeyBelow){let t=null!=l.focusedKey?null===(i=d.getKeyBelow)||void 0===i?void 0:i.call(d,l.focusedKey):null===(r=d.getFirstKey)||void 0===r?void 0:r.call(d);null==t&&S&&(t=null===(c=d.getFirstKey)||void 0===c?void 0:c.call(d,l.focusedKey)),null!=t&&(e.preventDefault(),T(t))}break;case"ArrowUp":if(d.getKeyAbove){let t=null!=l.focusedKey?null===(u=d.getKeyAbove)||void 0===u?void 0:u.call(d,l.focusedKey):null===(f=d.getLastKey)||void 0===f?void 0:f.call(d);null==t&&S&&(t=null===(y=d.getLastKey)||void 0===y?void 0:y.call(d,l.focusedKey)),null!=t&&(e.preventDefault(),T(t))}break;case"ArrowLeft":if(d.getKeyLeftOf){let t=null!=l.focusedKey?null===(h=d.getKeyLeftOf)||void 0===h?void 0:h.call(d,l.focusedKey):null;null==t&&S&&(t="rtl"===I?null===(p=d.getFirstKey)||void 0===p?void 0:p.call(d,l.focusedKey):null===(g=d.getLastKey)||void 0===g?void 0:g.call(d,l.focusedKey)),null!=t&&(e.preventDefault(),T(t,"rtl"===I?"first":"last"))}break;case"ArrowRight":if(d.getKeyRightOf){let t=null!=l.focusedKey?null===(K=d.getKeyRightOf)||void 0===K?void 0:K.call(d,l.focusedKey):null;null==t&&S&&(t="rtl"===I?null===(w=d.getLastKey)||void 0===w?void 0:w.call(d,l.focusedKey):null===(F=d.getFirstKey)||void 0===F?void 0:F.call(d,l.focusedKey)),null!=t&&(e.preventDefault(),T(t,"rtl"===I?"last":"first"))}break;case"Home":if(d.getFirstKey){e.preventDefault();let t=d.getFirstKey(l.focusedKey,(0,n.y)(e));l.setFocusedKey(t),null!=t&&((0,n.y)(e)&&e.shiftKey&&"multiple"===l.selectionMode?l.extendSelection(t):k&&l.replaceSelection(t))}break;case"End":if(d.getLastKey){e.preventDefault();let t=d.getLastKey(l.focusedKey,(0,n.y)(e));l.setFocusedKey(t),null!=t&&((0,n.y)(e)&&e.shiftKey&&"multiple"===l.selectionMode?l.extendSelection(t):k&&l.replaceSelection(t))}break;case"PageDown":if(d.getKeyPageBelow&&null!=l.focusedKey){let t=d.getKeyPageBelow(l.focusedKey);null!=t&&(e.preventDefault(),T(t))}break;case"PageUp":if(d.getKeyPageAbove&&null!=l.focusedKey){let t=d.getKeyPageAbove(l.focusedKey);null!=t&&(e.preventDefault(),T(t))}break;case"a":(0,n.y)(e)&&"multiple"===l.selectionMode&&!0!==b&&(e.preventDefault(),l.selectAll());break;case"Escape":m||0===l.selectedKeys.size||(e.stopPropagation(),e.preventDefault(),l.clearSelection());break;case"Tab":if(!P){if(e.shiftKey)v.current.focus();else{let e,t,l=(0,s.QL)(v.current,{tabbable:!0});do(t=l.lastChild())&&(e=t);while(t);e&&!e.contains(document.activeElement)&&(0,a.A)(e)}}}},onFocus:e=>{if(l.isFocused){e.currentTarget.contains(e.target)||l.setFocused(!1);return}if(e.currentTarget.contains(e.target)){if(l.setFocused(!0),null==l.focusedKey){var t,n,i,o;let r=e=>{null!=e&&(l.setFocusedKey(e),k&&l.replaceSelection(e))},s=e.relatedTarget;s&&e.currentTarget.compareDocumentPosition(s)&Node.DOCUMENT_POSITION_FOLLOWING?r(null!==(i=l.lastSelectedKey)&&void 0!==i?i:null===(t=d.getLastKey)||void 0===t?void 0:t.call(d)):r(null!==(o=l.firstSelectedKey)&&void 0!==o?o:null===(n=d.getFirstKey)||void 0===n?void 0:n.call(d))}else!T&&E.current&&(E.current.scrollTop=x.current.top,E.current.scrollLeft=x.current.left);if(null!=l.focusedKey&&E.current){let e=E.current.querySelector(`[data-key="${CSS.escape(l.focusedKey.toString())}"]`);e&&(e.contains(document.activeElement)||(0,a.A)(e),"keyboard"===(0,p.Jz)()&&(0,y.G)(e,{containingElement:v.current}))}}},onBlur:e=>{e.currentTarget.contains(e.relatedTarget)||l.setFocused(!1)},onMouseDown(e){E.current===e.target&&e.preventDefault()}},{typeSelectProps:B}=(0,i.i)({keyboardDelegate:d,selectionManager:l});return w||(A=(0,h.d)(B,A)),F||(t=null==l.focusedKey?0:-1),{collectionProps:{...A,tabIndex:t}}}},59375:function(e,t,l){l.d(t,{C:function(){return a}});var n=l(64913),i=l(87603),o=l(46671),r=l(277),s=l(89332),c=l(15966),u=l(2265);function a(e){let{selectionManager:t,key:l,ref:a,shouldSelectOnPressUp:y,shouldUseVirtualFocus:h,focus:p,isDisabled:g,onAction:v,allowsDifferentPressOrigin:K,linkBehavior:S="action"}=e,m=(0,o.tv)(),b=e=>{if("keyboard"===e.pointerType&&(0,n.F)(e))t.toggleSelection(l);else{if("none"===t.selectionMode)return;if(t.isLink(l)){if("selection"===S&&a.current){let n=t.getItemProps(l);m.open(a.current,e,n.href,n.routerOptions),t.setSelectedKeys(t.selectedKeys);return}if("override"===S||"none"===S)return}"single"===t.selectionMode?t.isSelected(l)&&!t.disallowEmptySelection?t.toggleSelection(l):t.replaceSelection(l):e&&e.shiftKey?t.extendSelection(l):"toggle"===t.selectionBehavior||e&&((0,n.y)(e)||"touch"===e.pointerType||"virtual"===e.pointerType)?t.toggleSelection(l):t.replaceSelection(l)}};(0,u.useEffect)(()=>{l===t.focusedKey&&t.isFocused&&!h&&(p?p():document.activeElement!==a.current&&a.current&&(0,i.e)(a.current))},[a,l,t.focusedKey,t.childFocusStrategy,t.isFocused,h]),g=g||t.isDisabled(l);let k={};h||g?g&&(k.onMouseDown=e=>{e.preventDefault()}):k={tabIndex:l===t.focusedKey?0:-1,onFocus(e){e.target===a.current&&t.setFocusedKey(l)}};let w=t.isLink(l)&&"override"===S,F=t.isLink(l)&&"selection"!==S&&"none"!==S,P=!g&&t.canSelectItem(l)&&!w,T=(v||F)&&!g,E=T&&("replace"===t.selectionBehavior?!P:!P||t.isEmpty),D=T&&P&&"replace"===t.selectionBehavior,I=E||D,C=(0,u.useRef)(null),x=I&&P,M=(0,u.useRef)(!1),L=(0,u.useRef)(!1),A=e=>{if(v&&v(),F&&a.current){let n=t.getItemProps(l);m.open(a.current,e,n.href,n.routerOptions)}},B={};y?(B.onPressStart=e=>{C.current=e.pointerType,M.current=x,"keyboard"===e.pointerType&&(!I||f())&&b(e)},K?(B.onPressUp=E?void 0:e=>{"keyboard"!==e.pointerType&&P&&b(e)},B.onPress=E?A:void 0):B.onPress=e=>{E||D&&"mouse"!==e.pointerType?("keyboard"!==e.pointerType||d())&&A(e):"keyboard"!==e.pointerType&&P&&b(e)}):(B.onPressStart=e=>{C.current=e.pointerType,M.current=x,L.current=E,P&&("mouse"===e.pointerType&&!E||"keyboard"===e.pointerType&&(!T||f()))&&b(e)},B.onPress=e=>{("touch"===e.pointerType||"pen"===e.pointerType||"virtual"===e.pointerType||"keyboard"===e.pointerType&&I&&d()||"mouse"===e.pointerType&&L.current)&&(I?A(e):P&&b(e))}),k["data-key"]=l,B.preventFocusOnPress=h;let{pressProps:R,isPressed:N}=(0,s.r)(B),O=D?e=>{"mouse"===C.current&&(e.stopPropagation(),e.preventDefault(),A(e))}:void 0,{longPressProps:$}=(0,c.T)({isDisabled:!x,onLongPress(e){"touch"===e.pointerType&&(b(e),t.setSelectionBehavior("toggle"))}}),z=t.isLink(l)?e=>{o.nG.isOpening||e.preventDefault()}:void 0;return{itemProps:(0,r.d)(k,P||E?R:{},x?$:{},{onDoubleClick:O,onDragStartCapture:e=>{"touch"===C.current&&M.current&&e.preventDefault()},onClick:z}),isPressed:N,isSelected:t.isSelected(l),isFocused:t.isFocused&&t.focusedKey===l,isDisabled:g,allowsSelection:P,hasAction:I}}function d(){let e=window.event;return(null==e?void 0:e.key)==="Enter"}function f(){let e=window.event;return(null==e?void 0:e.key)===" "||(null==e?void 0:e.code)==="Space"}},80112:function(e,t,l){l.d(t,{i:function(){return i}});var n=l(2265);function i(e){let{keyboardDelegate:t,selectionManager:l,onTypeSelect:i}=e,o=(0,n.useRef)({search:"",timeout:void 0}).current;return{typeSelectProps:{onKeyDownCapture:t.getKeyForSearch?e=>{var n;let r=1!==(n=e.key).length&&/^[A-Z]/i.test(n)?"":n;if(r&&!e.ctrlKey&&!e.metaKey&&e.currentTarget.contains(e.target)){if(" "!==r||!(o.search.trim().length>0)||(e.preventDefault(),"continuePropagation"in e||e.stopPropagation()),o.search+=r,null!=t.getKeyForSearch){let e=t.getKeyForSearch(o.search,l.focusedKey);null==e&&(e=t.getKeyForSearch(o.search)),null!=e&&(l.setFocusedKey(e),i&&i(e))}clearTimeout(o.timeout),o.timeout=setTimeout(()=>{o.search=""},1e3)}}:void 0}}}},64913:function(e,t,l){l.d(t,{F:function(){return i},y:function(){return o}});var n=l(40541);function i(e){return(0,n.ad)()?e.altKey:e.ctrlKey}function o(e){return(0,n.V5)()?e.metaKey:e.ctrlKey}},20878:function(e,t,l){l.d(t,{z:function(){return i},G:function(){return r}});var n=l(90731);function i(e,t){let l=o(e,t,"left"),n=o(e,t,"top"),i=t.offsetWidth,r=t.offsetHeight,s=e.scrollLeft,c=e.scrollTop,{borderTopWidth:u,borderLeftWidth:a}=getComputedStyle(e),d=e.scrollLeft+parseInt(a,10),f=e.scrollTop+parseInt(u,10),y=d+e.clientWidth,h=f+e.clientHeight;l<=s?s=l-parseInt(a,10):l+i>y&&(s+=l+i-y),n<=f?c=n-parseInt(u,10):n+r>h&&(c+=n+r-h),e.scrollLeft=s,e.scrollTop=c}function o(e,t,l){let n="left"===l?"offsetLeft":"offsetTop",i=0;for(;t.offsetParent&&(i+=t[n],t.offsetParent!==e);){if(t.offsetParent.contains(e)){i-=e[n];break}t=t.offsetParent}return i}function r(e,t){if(e&&document.contains(e)){let c=document.scrollingElement||document.documentElement;if("hidden"===window.getComputedStyle(c).overflow)for(let t of function(e,t){let l=[];for(;e&&e!==document.documentElement;)(0,n.a)(e,void 0)&&l.push(e),e=e.parentElement;return l}(e))i(t,e);else{var l,o,r,s;let{left:n,top:i}=e.getBoundingClientRect();null==e||null===(l=e.scrollIntoView)||void 0===l||l.call(e,{block:"nearest"});let{left:c,top:u}=e.getBoundingClientRect();(Math.abs(n-c)>1||Math.abs(i-u)>1)&&(null==t||null===(r=t.containingElement)||void 0===r||null===(o=r.scrollIntoView)||void 0===o||o.call(r,{block:"center",inline:"center"}),null===(s=e.scrollIntoView)||void 0===s||s.call(e,{block:"nearest"}))}}}},99222:function(e,t,l){l.d(t,{P:function(){return s}});var n=l(79248),i=l(2265);let o=0,r=new Map;function s(e){let[t,l]=(0,i.useState)();return(0,n.b)(()=>{if(!e)return;let t=r.get(e);if(t)l(t.element.id);else{let n=`react-aria-description-${o++}`;l(n);let i=document.createElement("div");i.id=n,i.style.display="none",i.textContent=e,document.body.appendChild(i),t={refCount:0,element:i},r.set(e,t)}return t.refCount++,()=>{t&&0==--t.refCount&&(t.element.remove(),r.delete(e))}},[e]),{"aria-describedby":e?t:void 0}}},52897:function(e,t,l){function n(e,t){return"function"==typeof t.getChildren?t.getChildren(e.key):e.childNodes}function i(e){return o(e,0)}function o(e,t){if(t<0)return;let l=0;for(let n of e){if(l===t)return n;l++}}function r(e){let t;for(let l of e)t=l;return t}function s(e,t,l){if(t.parentKey===l.parentKey)return t.index-l.index;let n=[...c(e,t),t],i=[...c(e,l),l],o=n.slice(0,i.length).findIndex((e,t)=>e!==i[t]);return -1!==o?(t=n[o],l=i[o],t.index-l.index):n.findIndex(e=>e===l)>=0?1:(i.findIndex(e=>e===t),-1)}function c(e,t){let l=[],n=t;for(;(null==n?void 0:n.parentKey)!=null;)(n=e.getItem(n.parentKey))&&l.unshift(n);return l}l.d(t,{Em:function(){return o},_P:function(){return n},eg:function(){return s},l8:function(){return i},s:function(){return r}})},34921:function(e,t,l){l.d(t,{K:function(){return s}});var n=l(2265);class i{build(e,t){return this.context=t,o(()=>this.iterateCollection(e))}*iterateCollection(e){let{children:t,items:l}=e;if(n.isValidElement(t)&&t.type===n.Fragment)yield*this.iterateCollection({children:t.props.children,items:l});else if("function"==typeof t){if(!l)throw Error("props.children was a function but props.items is missing");let e=0;for(let n of l)yield*this.getFullNode({value:n,index:e},{renderer:t}),e++}else{let e=[];n.Children.forEach(t,t=>{t&&e.push(t)});let l=0;for(let t of e)for(let e of this.getFullNode({element:t,index:l},{}))l++,yield e}}getKey(e,t,l,n){if(null!=e.key)return e.key;if("cell"===t.type&&null!=t.key)return`${n}${t.key}`;let i=t.value;if(null!=i){var o;let e=null!==(o=i.key)&&void 0!==o?o:i.id;if(null==e)throw Error("No key found for item");return e}return n?`${n}.${t.index}`:`$.${t.index}`}getChildState(e,t){return{renderer:t.renderer||e.renderer}}*getFullNode(e,t,l,i){var s,c,u,a,d,f,y,h;if(n.isValidElement(e.element)&&e.element.type===n.Fragment){let o=[];n.Children.forEach(e.element.props.children,e=>{o.push(e)});let r=null!==(s=e.index)&&void 0!==s?s:0;for(let e of o)yield*this.getFullNode({element:e,index:r++},t,l,i);return}let p=e.element;if(!p&&e.value&&t&&t.renderer){let l=this.cache.get(e.value);if(l&&(!l.shouldInvalidate||!l.shouldInvalidate(this.context))){l.index=e.index,l.parentKey=i?i.key:null,yield l;return}p=t.renderer(e.value)}if(n.isValidElement(p)){let n=p.type;if("function"!=typeof n&&"function"!=typeof n.getCollectionNode){let e=p.type;throw Error(`Unknown element <${e}> in collection.`)}let o=n.getCollectionNode(p.props,this.context),s=null!==(c=e.index)&&void 0!==c?c:0,y=o.next();for(;!y.done&&y.value;){let n=y.value;e.index=s;let c=null!==(u=n.key)&&void 0!==u?u:null;null==c&&(c=n.element?null:this.getKey(p,e,t,l));let h=[...this.getFullNode({...n,key:c,index:s,wrapper:function(e,t){return e&&t?l=>e(t(l)):e||t||void 0}(e.wrapper,n.wrapper)},this.getChildState(t,n),l?`${l}${p.key}`:p.key,i)];for(let t of h){if(t.value=null!==(d=null!==(a=n.value)&&void 0!==a?a:e.value)&&void 0!==d?d:null,t.value&&this.cache.set(t.value,t),e.type&&t.type!==e.type)throw Error(`Unsupported type <${r(t.type)}> in <${r(null!==(f=null==i?void 0:i.type)&&void 0!==f?f:"unknown parent type")}>. Only <${r(e.type)}> is supported.`);s++,yield t}y=o.next(h)}return}if(null==e.key||null==e.type)return;let g=this,v={type:e.type,props:e.props,key:e.key,parentKey:i?i.key:null,value:null!==(y=e.value)&&void 0!==y?y:null,level:i?i.level+1:0,index:e.index,rendered:e.rendered,textValue:null!==(h=e.textValue)&&void 0!==h?h:"","aria-label":e["aria-label"],wrapper:e.wrapper,shouldInvalidate:e.shouldInvalidate,hasChildNodes:e.hasChildNodes||!1,childNodes:o(function*(){if(!e.hasChildNodes||!e.childNodes)return;let l=0;for(let n of e.childNodes())for(let e of(null!=n.key&&(n.key=`${v.key}${n.key}`),g.getFullNode({...n,index:l},g.getChildState(t,n),v.key,v)))l++,yield e})};yield v}constructor(){this.cache=new WeakMap}}function o(e){let t=[],l=null;return{*[Symbol.iterator](){for(let e of t)yield e;for(let n of(l||(l=e()),l))t.push(n),yield n}}}function r(e){return e[0].toUpperCase()+e.slice(1)}function s(e,t,l){let o=(0,n.useMemo)(()=>new i,[]),{children:r,items:s,collection:c}=e;return(0,n.useMemo)(()=>c||t(o.build({children:r,items:s},l)),[o,r,s,c,l,t])}},91980:function(e,t,l){l.d(t,{Y:function(){return n}});class n extends Set{constructor(e,t,l){super(e),e instanceof n?(this.anchorKey=null!=t?t:e.anchorKey,this.currentKey=null!=l?l:e.currentKey):(this.anchorKey=null!=t?t:null,this.currentKey=null!=l?l:null)}}},62490:function(e,t,l){l.d(t,{Z:function(){return o}});var n=l(91980),i=l(52897);class o{get selectionMode(){return this.state.selectionMode}get disallowEmptySelection(){return this.state.disallowEmptySelection}get selectionBehavior(){return this.state.selectionBehavior}setSelectionBehavior(e){this.state.setSelectionBehavior(e)}get isFocused(){return this.state.isFocused}setFocused(e){this.state.setFocused(e)}get focusedKey(){return this.state.focusedKey}get childFocusStrategy(){return this.state.childFocusStrategy}setFocusedKey(e,t){(null==e||this.collection.getItem(e))&&this.state.setFocusedKey(e,t)}get selectedKeys(){return"all"===this.state.selectedKeys?new Set(this.getSelectAllKeys()):this.state.selectedKeys}get rawSelection(){return this.state.selectedKeys}isSelected(e){if("none"===this.state.selectionMode)return!1;let t=this.getKey(e);return null!=t&&("all"===this.state.selectedKeys?this.canSelectItem(t):this.state.selectedKeys.has(t))}get isEmpty(){return"all"!==this.state.selectedKeys&&0===this.state.selectedKeys.size}get isSelectAll(){if(this.isEmpty)return!1;if("all"===this.state.selectedKeys)return!0;if(null!=this._isSelectAll)return this._isSelectAll;let e=this.getSelectAllKeys(),t=this.state.selectedKeys;return this._isSelectAll=e.every(e=>t.has(e)),this._isSelectAll}get firstSelectedKey(){var e;let t=null;for(let e of this.state.selectedKeys){let l=this.collection.getItem(e);(!t||l&&0>(0,i.eg)(this.collection,l,t))&&(t=l)}return null!==(e=null==t?void 0:t.key)&&void 0!==e?e:null}get lastSelectedKey(){var e;let t=null;for(let e of this.state.selectedKeys){let l=this.collection.getItem(e);(!t||l&&(0,i.eg)(this.collection,l,t)>0)&&(t=l)}return null!==(e=null==t?void 0:t.key)&&void 0!==e?e:null}get disabledKeys(){return this.state.disabledKeys}get disabledBehavior(){return this.state.disabledBehavior}extendSelection(e){let t;if("none"===this.selectionMode)return;if("single"===this.selectionMode){this.replaceSelection(e);return}let l=this.getKey(e);if(null!=l){if("all"===this.state.selectedKeys)t=new n.Y([l],l,l);else{var i,o;let e=this.state.selectedKeys,r=null!==(i=e.anchorKey)&&void 0!==i?i:l;for(let i of(t=new n.Y(e,r,l),this.getKeyRange(r,null!==(o=e.currentKey)&&void 0!==o?o:l)))t.delete(i);for(let e of this.getKeyRange(l,r))this.canSelectItem(e)&&t.add(e)}this.state.setSelectedKeys(t)}}getKeyRange(e,t){let l=this.collection.getItem(e),n=this.collection.getItem(t);return l&&n?0>=(0,i.eg)(this.collection,l,n)?this.getKeyRangeInternal(e,t):this.getKeyRangeInternal(t,e):[]}getKeyRangeInternal(e,t){var l;if(null===(l=this.layoutDelegate)||void 0===l?void 0:l.getKeyRange)return this.layoutDelegate.getKeyRange(e,t);let n=[],i=e;for(;null!=i;){let e=this.collection.getItem(i);if(e&&("item"===e.type||"cell"===e.type&&this.allowsCellSelection)&&n.push(i),i===t)return n;i=this.collection.getKeyAfter(i)}return[]}getKey(e){let t=this.collection.getItem(e);if(!t||"cell"===t.type&&this.allowsCellSelection)return e;for(;t&&"item"!==t.type&&null!=t.parentKey;)t=this.collection.getItem(t.parentKey);return t&&"item"===t.type?t.key:null}toggleSelection(e){if("none"===this.selectionMode)return;if("single"===this.selectionMode&&!this.isSelected(e)){this.replaceSelection(e);return}let t=this.getKey(e);if(null==t)return;let l=new n.Y("all"===this.state.selectedKeys?this.getSelectAllKeys():this.state.selectedKeys);l.has(t)?l.delete(t):this.canSelectItem(t)&&(l.add(t),l.anchorKey=t,l.currentKey=t),this.disallowEmptySelection&&0===l.size||this.state.setSelectedKeys(l)}replaceSelection(e){if("none"===this.selectionMode)return;let t=this.getKey(e);if(null==t)return;let l=this.canSelectItem(t)?new n.Y([t],t,t):new n.Y;this.state.setSelectedKeys(l)}setSelectedKeys(e){if("none"===this.selectionMode)return;let t=new n.Y;for(let l of e){let e=this.getKey(l);if(null!=e&&(t.add(e),"single"===this.selectionMode))break}this.state.setSelectedKeys(t)}getSelectAllKeys(){let e=[],t=l=>{for(;null!=l;){if(this.canSelectItem(l)){var n,o;let r=this.collection.getItem(l);(null==r?void 0:r.type)==="item"&&e.push(l),(null==r?void 0:r.hasChildNodes)&&(this.allowsCellSelection||"item"!==r.type)&&t(null!==(o=null===(n=(0,i.l8)((0,i._P)(r,this.collection)))||void 0===n?void 0:n.key)&&void 0!==o?o:null)}l=this.collection.getKeyAfter(l)}};return t(this.collection.getFirstKey()),e}selectAll(){this.isSelectAll||"multiple"!==this.selectionMode||this.state.setSelectedKeys("all")}clearSelection(){!this.disallowEmptySelection&&("all"===this.state.selectedKeys||this.state.selectedKeys.size>0)&&this.state.setSelectedKeys(new n.Y)}toggleSelectAll(){this.isSelectAll?this.clearSelection():this.selectAll()}select(e,t){"none"!==this.selectionMode&&("single"===this.selectionMode?this.isSelected(e)&&!this.disallowEmptySelection?this.toggleSelection(e):this.replaceSelection(e):"toggle"===this.selectionBehavior||t&&("touch"===t.pointerType||"virtual"===t.pointerType)?this.toggleSelection(e):this.replaceSelection(e))}isSelectionEqual(e){if(e===this.state.selectedKeys)return!0;let t=this.selectedKeys;if(e.size!==t.size)return!1;for(let l of e)if(!t.has(l))return!1;for(let l of t)if(!e.has(l))return!1;return!0}canSelectItem(e){var t;if("none"===this.state.selectionMode||this.state.disabledKeys.has(e))return!1;let l=this.collection.getItem(e);return!!l&&(null==l||null===(t=l.props)||void 0===t||!t.isDisabled)&&("cell"!==l.type||!!this.allowsCellSelection)}isDisabled(e){var t,l;return"all"===this.state.disabledBehavior&&(this.state.disabledKeys.has(e)||!!(null===(l=this.collection.getItem(e))||void 0===l?void 0:null===(t=l.props)||void 0===t?void 0:t.isDisabled))}isLink(e){var t,l;return!!(null===(l=this.collection.getItem(e))||void 0===l?void 0:null===(t=l.props)||void 0===t?void 0:t.href)}getItemProps(e){var t;return null===(t=this.collection.getItem(e))||void 0===t?void 0:t.props}constructor(e,t,l){var n;this.collection=e,this.state=t,this.allowsCellSelection=null!==(n=null==l?void 0:l.allowsCellSelection)&&void 0!==n&&n,this._isSelectAll=null,this.layoutDelegate=(null==l?void 0:l.layoutDelegate)||null}}},75125:function(e,t,l){l.d(t,{q:function(){return r}});var n=l(91980),i=l(41821),o=l(2265);function r(e){let{selectionMode:t="none",disallowEmptySelection:l=!1,allowDuplicateSelectionEvents:r,selectionBehavior:c="toggle",disabledBehavior:u="all"}=e,a=(0,o.useRef)(!1),[,d]=(0,o.useState)(!1),f=(0,o.useRef)(null),y=(0,o.useRef)(null),[,h]=(0,o.useState)(null),p=(0,o.useMemo)(()=>s(e.selectedKeys),[e.selectedKeys]),g=(0,o.useMemo)(()=>s(e.defaultSelectedKeys,new n.Y),[e.defaultSelectedKeys]),[v,K]=(0,i.z)(p,g,e.onSelectionChange),S=(0,o.useMemo)(()=>e.disabledKeys?new Set(e.disabledKeys):new Set,[e.disabledKeys]),[m,b]=(0,o.useState)(c);"replace"===c&&"toggle"===m&&"object"==typeof v&&0===v.size&&b("replace");let k=(0,o.useRef)(c);return(0,o.useEffect)(()=>{c!==k.current&&(b(c),k.current=c)},[c]),{selectionMode:t,disallowEmptySelection:l,selectionBehavior:m,setSelectionBehavior:b,get isFocused(){return a.current},setFocused(e){a.current=e,d(e)},get focusedKey(){return f.current},get childFocusStrategy(){return y.current},setFocusedKey(e,t="first"){f.current=e,y.current=t,h(e)},selectedKeys:v,setSelectedKeys(e){(r||!function(e,t){if(e.size!==t.size)return!1;for(let l of e)if(!t.has(l))return!1;return!0}(e,v))&&K(e)},disabledKeys:S,disabledBehavior:u}}function s(e,t){return e?"all"===e?"all":new n.Y(e):t}}}]);