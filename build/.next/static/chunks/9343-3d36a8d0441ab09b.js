"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9343],{39343:function(e,t,r){r.d(t,{Gc:function(){return S},U2:function(){return g},cI:function(){return eb}});var a=r(2265),s=e=>"checkbox"===e.type,i=e=>e instanceof Date,l=e=>null==e;let u=e=>"object"==typeof e;var n=e=>!l(e)&&!Array.isArray(e)&&u(e)&&!i(e),o=e=>n(e)&&e.target?s(e.target)?e.target.checked:e.target.value:e,d=e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e,f=(e,t)=>e.has(d(t)),c=e=>{let t=e.constructor&&e.constructor.prototype;return n(t)&&t.hasOwnProperty("isPrototypeOf")},y="undefined"!=typeof window&&void 0!==window.HTMLElement&&"undefined"!=typeof document;function m(e){let t;let r=Array.isArray(e),a="undefined"!=typeof FileList&&e instanceof FileList;if(e instanceof Date)t=new Date(e);else if(e instanceof Set)t=new Set(e);else if(!(!(y&&(e instanceof Blob||a))&&(r||n(e))))return e;else if(t=r?[]:{},r||c(e))for(let r in e)e.hasOwnProperty(r)&&(t[r]=m(e[r]));else t=e;return t}var v=e=>Array.isArray(e)?e.filter(Boolean):[],h=e=>void 0===e,g=(e,t,r)=>{if(!t||!n(e))return r;let a=v(t.split(/[,[\].]+?/)).reduce((e,t)=>l(e)?e:e[t],e);return h(a)||a===e?h(e[t])?r:e[t]:a},p=e=>"boolean"==typeof e,b=e=>/^\w*$/.test(e),_=e=>v(e.replace(/["|']|\]/g,"").split(/\.|\[/)),V=(e,t,r)=>{let a=-1,s=b(t)?[t]:_(t),i=s.length,l=i-1;for(;++a<i;){let t=s[a],i=r;if(a!==l){let r=e[t];i=n(r)||Array.isArray(r)?r:isNaN(+s[a+1])?{}:[]}if("__proto__"===t||"constructor"===t||"prototype"===t)return;e[t]=i,e=e[t]}return e};let A={BLUR:"blur",FOCUS_OUT:"focusout"},F={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"},w={max:"max",min:"min",maxLength:"maxLength",minLength:"minLength",pattern:"pattern",required:"required",validate:"validate"},x=a.createContext(null),S=()=>a.useContext(x);var k=(e,t,r,a=!0)=>{let s={defaultValues:t._defaultValues};for(let i in e)Object.defineProperty(s,i,{get:()=>(t._proxyFormState[i]!==F.all&&(t._proxyFormState[i]=!a||F.all),r&&(r[i]=!0),e[i])});return s},D=e=>n(e)&&!Object.keys(e).length,O=(e,t,r,a)=>{r(e);let{name:s,...i}=e;return D(i)||Object.keys(i).length>=Object.keys(t).length||Object.keys(i).find(e=>t[e]===(!a||F.all))},E=e=>Array.isArray(e)?e:[e],C=e=>"string"==typeof e,T=(e,t,r,a,s)=>C(e)?(a&&t.watch.add(e),g(r,e,s)):Array.isArray(e)?e.map(e=>(a&&t.watch.add(e),g(r,e))):(a&&(t.watchAll=!0),r),L=(e,t,r,a,s)=>t?{...r[e],types:{...r[e]&&r[e].types?r[e].types:{},[a]:s||!0}}:{},U=e=>({isOnSubmit:!e||e===F.onSubmit,isOnBlur:e===F.onBlur,isOnChange:e===F.onChange,isOnAll:e===F.all,isOnTouch:e===F.onTouched}),j=(e,t,r)=>!r&&(t.watchAll||t.watch.has(e)||[...t.watch].some(t=>e.startsWith(t)&&/^\.\w+/.test(e.slice(t.length))));let B=(e,t,r,a)=>{for(let s of r||Object.keys(e)){let r=g(e,s);if(r){let{_f:e,...i}=r;if(e){if(e.refs&&e.refs[0]&&t(e.refs[0],s)&&!a||e.ref&&t(e.ref,e.name)&&!a)return!0;if(B(i,t))break}else if(n(i)&&B(i,t))break}}};var N=(e,t,r)=>{let a=E(g(e,r));return V(a,"root",t[r]),V(e,r,a),e},M=e=>"file"===e.type,q=e=>"function"==typeof e,I=e=>{if(!y)return!1;let t=e?e.ownerDocument:0;return e instanceof(t&&t.defaultView?t.defaultView.HTMLElement:HTMLElement)},P=e=>C(e),R=e=>"radio"===e.type,$=e=>e instanceof RegExp;let H={value:!1,isValid:!1},W={value:!0,isValid:!0};var G=e=>{if(Array.isArray(e)){if(e.length>1){let t=e.filter(e=>e&&e.checked&&!e.disabled).map(e=>e.value);return{value:t,isValid:!!t.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!h(e[0].attributes.value)?h(e[0].value)||""===e[0].value?W:{value:e[0].value,isValid:!0}:W:H}return H};let z={isValid:!1,value:null};var J=e=>Array.isArray(e)?e.reduce((e,t)=>t&&t.checked&&!t.disabled?{isValid:!0,value:t.value}:e,z):z;function K(e,t,r="validate"){if(P(e)||Array.isArray(e)&&e.every(P)||p(e)&&!e)return{type:r,message:P(e)?e:"",ref:t}}var Q=e=>n(e)&&!$(e)?e:{value:e,message:""},X=async(e,t,r,a,i)=>{let{ref:u,refs:o,required:d,maxLength:f,minLength:c,min:y,max:m,pattern:v,validate:b,name:_,valueAsNumber:V,mount:A,disabled:F}=e._f,x=g(t,_);if(!A||F)return{};let S=o?o[0]:u,k=e=>{a&&S.reportValidity&&(S.setCustomValidity(p(e)?"":e||""),S.reportValidity())},O={},E=R(u),T=s(u),U=(V||M(u))&&h(u.value)&&h(x)||I(u)&&""===u.value||""===x||Array.isArray(x)&&!x.length,j=L.bind(null,_,r,O),B=(e,t,r,a=w.maxLength,s=w.minLength)=>{let i=e?t:r;O[_]={type:e?a:s,message:i,ref:u,...j(e?a:s,i)}};if(i?!Array.isArray(x)||!x.length:d&&(!(E||T)&&(U||l(x))||p(x)&&!x||T&&!G(o).isValid||E&&!J(o).isValid)){let{value:e,message:t}=P(d)?{value:!!d,message:d}:Q(d);if(e&&(O[_]={type:w.required,message:t,ref:S,...j(w.required,t)},!r))return k(t),O}if(!U&&(!l(y)||!l(m))){let e,t;let a=Q(m),s=Q(y);if(l(x)||isNaN(x)){let r=u.valueAsDate||new Date(x),i=e=>new Date(new Date().toDateString()+" "+e),l="time"==u.type,n="week"==u.type;C(a.value)&&x&&(e=l?i(x)>i(a.value):n?x>a.value:r>new Date(a.value)),C(s.value)&&x&&(t=l?i(x)<i(s.value):n?x<s.value:r<new Date(s.value))}else{let r=u.valueAsNumber||(x?+x:x);l(a.value)||(e=r>a.value),l(s.value)||(t=r<s.value)}if((e||t)&&(B(!!e,a.message,s.message,w.max,w.min),!r))return k(O[_].message),O}if((f||c)&&!U&&(C(x)||i&&Array.isArray(x))){let e=Q(f),t=Q(c),a=!l(e.value)&&x.length>+e.value,s=!l(t.value)&&x.length<+t.value;if((a||s)&&(B(a,e.message,t.message),!r))return k(O[_].message),O}if(v&&!U&&C(x)){let{value:e,message:t}=Q(v);if($(e)&&!x.match(e)&&(O[_]={type:w.pattern,message:t,ref:u,...j(w.pattern,t)},!r))return k(t),O}if(b){if(q(b)){let e=K(await b(x,t),S);if(e&&(O[_]={...e,...j(w.validate,e.message)},!r))return k(e.message),O}else if(n(b)){let e={};for(let a in b){if(!D(e)&&!r)break;let s=K(await b[a](x,t),S,a);s&&(e={...s,...j(a,s.message)},k(s.message),r&&(O[_]=e))}if(!D(e)&&(O[_]={ref:S,...e},!r))return O}}return k(!0),O};function Y(e,t){let r=Array.isArray(t)?t:b(t)?[t]:_(t),a=1===r.length?e:function(e,t){let r=t.slice(0,-1).length,a=0;for(;a<r;)e=h(e)?a++:e[t[a++]];return e}(e,r),s=r.length-1,i=r[s];return a&&delete a[i],0!==s&&(n(a)&&D(a)||Array.isArray(a)&&function(e){for(let t in e)if(e.hasOwnProperty(t)&&!h(e[t]))return!1;return!0}(a))&&Y(e,r.slice(0,-1)),e}var Z=()=>{let e=[];return{get observers(){return e},next:t=>{for(let r of e)r.next&&r.next(t)},subscribe:t=>(e.push(t),{unsubscribe:()=>{e=e.filter(e=>e!==t)}}),unsubscribe:()=>{e=[]}}},ee=e=>l(e)||!u(e);function et(e,t){if(ee(e)||ee(t))return e===t;if(i(e)&&i(t))return e.getTime()===t.getTime();let r=Object.keys(e),a=Object.keys(t);if(r.length!==a.length)return!1;for(let s of r){let r=e[s];if(!a.includes(s))return!1;if("ref"!==s){let e=t[s];if(i(r)&&i(e)||n(r)&&n(e)||Array.isArray(r)&&Array.isArray(e)?!et(r,e):r!==e)return!1}}return!0}var er=e=>"select-multiple"===e.type,ea=e=>R(e)||s(e),es=e=>I(e)&&e.isConnected,ei=e=>{for(let t in e)if(q(e[t]))return!0;return!1};function el(e,t={}){let r=Array.isArray(e);if(n(e)||r)for(let r in e)Array.isArray(e[r])||n(e[r])&&!ei(e[r])?(t[r]=Array.isArray(e[r])?[]:{},el(e[r],t[r])):l(e[r])||(t[r]=!0);return t}var eu=(e,t)=>(function e(t,r,a){let s=Array.isArray(t);if(n(t)||s)for(let s in t)Array.isArray(t[s])||n(t[s])&&!ei(t[s])?h(r)||ee(a[s])?a[s]=Array.isArray(t[s])?el(t[s],[]):{...el(t[s])}:e(t[s],l(r)?{}:r[s],a[s]):a[s]=!et(t[s],r[s]);return a})(e,t,el(t)),en=(e,{valueAsNumber:t,valueAsDate:r,setValueAs:a})=>h(e)?e:t?""===e?NaN:e?+e:e:r&&C(e)?new Date(e):a?a(e):e;function eo(e){let t=e.ref;return(e.refs?e.refs.every(e=>e.disabled):t.disabled)?void 0:M(t)?t.files:R(t)?J(e.refs).value:er(t)?[...t.selectedOptions].map(({value:e})=>e):s(t)?G(e.refs).value:en(h(t.value)?e.ref.value:t.value,e)}var ed=(e,t,r,a)=>{let s={};for(let r of e){let e=g(t,r);e&&V(s,r,e._f)}return{criteriaMode:r,names:[...e],fields:s,shouldUseNativeValidation:a}},ef=e=>h(e)?e:$(e)?e.source:n(e)?$(e.value)?e.value.source:e.value:e;let ec="AsyncFunction";var ey=e=>!!e&&!!e.validate&&!!(q(e.validate)&&e.validate.constructor.name===ec||n(e.validate)&&Object.values(e.validate).find(e=>e.constructor.name===ec)),em=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate);function ev(e,t,r){let a=g(e,r);if(a||b(r))return{error:a,name:r};let s=r.split(".");for(;s.length;){let a=s.join("."),i=g(t,a),l=g(e,a);if(i&&!Array.isArray(i)&&r!==a)break;if(l&&l.type)return{name:a,error:l};s.pop()}return{name:r}}var eh=(e,t,r,a,s)=>!s.isOnAll&&(!r&&s.isOnTouch?!(t||e):(r?a.isOnBlur:s.isOnBlur)?!e:(r?!a.isOnChange:!s.isOnChange)||e),eg=(e,t)=>!v(g(e,t)).length&&Y(e,t);let ep={mode:F.onSubmit,reValidateMode:F.onChange,shouldFocusError:!0};function eb(e={}){let t=a.useRef(),r=a.useRef(),[u,d]=a.useState({isDirty:!1,isValidating:!1,isLoading:q(e.defaultValues),isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,submitCount:0,dirtyFields:{},touchedFields:{},validatingFields:{},errors:e.errors||{},disabled:e.disabled||!1,defaultValues:q(e.defaultValues)?void 0:e.defaultValues});t.current||(t.current={...function(e={}){let t,r={...ep,...e},a={submitCount:0,isDirty:!1,isLoading:q(r.defaultValues),isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,touchedFields:{},dirtyFields:{},validatingFields:{},errors:r.errors||{},disabled:r.disabled||!1},u={},d=(n(r.defaultValues)||n(r.values))&&m(r.defaultValues||r.values)||{},c=r.shouldUnregister?{}:m(d),b={action:!1,mount:!1,watch:!1},_={mount:new Set,unMount:new Set,array:new Set,watch:new Set},w=0,x={isDirty:!1,dirtyFields:!1,validatingFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1},S={values:Z(),array:Z(),state:Z()},k=U(r.mode),O=U(r.reValidateMode),L=r.criteriaMode===F.all,P=e=>t=>{clearTimeout(w),w=setTimeout(e,t)},R=async e=>{if(!r.disabled&&(x.isValid||e)){let e=r.resolver?D((await J()).errors):await Q(u,!0);e!==a.isValid&&S.state.next({isValid:e})}},$=(e,t)=>{!r.disabled&&(x.isValidating||x.validatingFields)&&((e||Array.from(_.mount)).forEach(e=>{e&&(t?V(a.validatingFields,e,t):Y(a.validatingFields,e))}),S.state.next({validatingFields:a.validatingFields,isValidating:!D(a.validatingFields)}))},H=(e,t)=>{V(a.errors,e,t),S.state.next({errors:a.errors})},W=(e,t,r,a)=>{let s=g(u,e);if(s){let i=g(c,e,h(r)?g(d,e):r);h(i)||a&&a.defaultChecked||t?V(c,e,t?i:eo(s._f)):el(e,i),b.mount&&R()}},G=(e,t,s,i,l)=>{let n=!1,o=!1,f={name:e};if(!r.disabled){let r=!!(g(u,e)&&g(u,e)._f&&g(u,e)._f.disabled);if(!s||i){x.isDirty&&(o=a.isDirty,a.isDirty=f.isDirty=ee(),n=o!==f.isDirty);let s=r||et(g(d,e),t);o=!!(!r&&g(a.dirtyFields,e)),s||r?Y(a.dirtyFields,e):V(a.dirtyFields,e,!0),f.dirtyFields=a.dirtyFields,n=n||x.dirtyFields&&!s!==o}if(s){let t=g(a.touchedFields,e);t||(V(a.touchedFields,e,s),f.touchedFields=a.touchedFields,n=n||x.touchedFields&&t!==s)}n&&l&&S.state.next(f)}return n?f:{}},z=(e,s,i,l)=>{let u=g(a.errors,e),n=x.isValid&&p(s)&&a.isValid!==s;if(r.delayError&&i?(t=P(()=>H(e,i)))(r.delayError):(clearTimeout(w),t=null,i?V(a.errors,e,i):Y(a.errors,e)),(i?!et(u,i):u)||!D(l)||n){let t={...l,...n&&p(s)?{isValid:s}:{},errors:a.errors,name:e};a={...a,...t},S.state.next(t)}},J=async e=>{$(e,!0);let t=await r.resolver(c,r.context,ed(e||_.mount,u,r.criteriaMode,r.shouldUseNativeValidation));return $(e),t},K=async e=>{let{errors:t}=await J(e);if(e)for(let r of e){let e=g(t,r);e?V(a.errors,r,e):Y(a.errors,r)}else a.errors=t;return t},Q=async(e,t,s={valid:!0})=>{for(let i in e){let l=e[i];if(l){let{_f:e,...u}=l;if(e){let u=_.array.has(e.name),n=l._f&&ey(l._f);n&&x.validatingFields&&$([i],!0);let o=await X(l,c,L,r.shouldUseNativeValidation&&!t,u);if(n&&x.validatingFields&&$([i]),o[e.name]&&(s.valid=!1,t))break;t||(g(o,e.name)?u?N(a.errors,o,e.name):V(a.errors,e.name,o[e.name]):Y(a.errors,e.name))}D(u)||await Q(u,t,s)}}return s.valid},ee=(e,t)=>!r.disabled&&(e&&t&&V(c,e,t),!et(eF(),d)),ei=(e,t,r)=>T(e,_,{...b.mount?c:h(t)?d:C(e)?{[e]:t}:t},r,t),el=(e,t,r={})=>{let a=g(u,e),i=t;if(a){let r=a._f;r&&(r.disabled||V(c,e,en(t,r)),i=I(r.ref)&&l(t)?"":t,er(r.ref)?[...r.ref.options].forEach(e=>e.selected=i.includes(e.value)):r.refs?s(r.ref)?r.refs.length>1?r.refs.forEach(e=>(!e.defaultChecked||!e.disabled)&&(e.checked=Array.isArray(i)?!!i.find(t=>t===e.value):i===e.value)):r.refs[0]&&(r.refs[0].checked=!!i):r.refs.forEach(e=>e.checked=e.value===i):M(r.ref)?r.ref.value="":(r.ref.value=i,r.ref.type||S.values.next({name:e,values:{...c}})))}(r.shouldDirty||r.shouldTouch)&&G(e,i,r.shouldTouch,r.shouldDirty,!0),r.shouldValidate&&eA(e)},ec=(e,t,r)=>{for(let a in t){let s=t[a],l=`${e}.${a}`,o=g(u,l);(_.array.has(e)||n(s)||o&&!o._f)&&!i(s)?ec(l,s,r):el(l,s,r)}},eb=(e,t,r={})=>{let s=g(u,e),i=_.array.has(e),n=m(t);V(c,e,n),i?(S.array.next({name:e,values:{...c}}),(x.isDirty||x.dirtyFields)&&r.shouldDirty&&S.state.next({name:e,dirtyFields:eu(d,c),isDirty:ee(e,n)})):!s||s._f||l(n)?el(e,n,r):ec(e,n,r),j(e,_)&&S.state.next({...a}),S.values.next({name:b.mount?e:void 0,values:{...c}})},e_=async e=>{b.mount=!0;let s=e.target,l=s.name,n=!0,d=g(u,l),f=e=>{n=Number.isNaN(e)||i(e)&&isNaN(e.getTime())||et(e,g(c,l,e))};if(d){let i,y;let m=s.type?eo(d._f):o(e),v=e.type===A.BLUR||e.type===A.FOCUS_OUT,h=!em(d._f)&&!r.resolver&&!g(a.errors,l)&&!d._f.deps||eh(v,g(a.touchedFields,l),a.isSubmitted,O,k),p=j(l,_,v);V(c,l,m),v?(d._f.onBlur&&d._f.onBlur(e),t&&t(0)):d._f.onChange&&d._f.onChange(e);let b=G(l,m,v,!1),F=!D(b)||p;if(v||S.values.next({name:l,type:e.type,values:{...c}}),h)return x.isValid&&("onBlur"===r.mode?v&&R():R()),F&&S.state.next({name:l,...p?{}:b});if(!v&&p&&S.state.next({...a}),r.resolver){let{errors:e}=await J([l]);if(f(m),n){let t=ev(a.errors,u,l),r=ev(e,u,t.name||l);i=r.error,l=r.name,y=D(e)}}else $([l],!0),i=(await X(d,c,L,r.shouldUseNativeValidation))[l],$([l]),f(m),n&&(i?y=!1:x.isValid&&(y=await Q(u,!0)));n&&(d._f.deps&&eA(d._f.deps),z(l,y,i,b))}},eV=(e,t)=>{if(g(a.errors,t)&&e.focus)return e.focus(),1},eA=async(e,t={})=>{let s,i;let l=E(e);if(r.resolver){let t=await K(h(e)?e:l);s=D(t),i=e?!l.some(e=>g(t,e)):s}else e?((i=(await Promise.all(l.map(async e=>{let t=g(u,e);return await Q(t&&t._f?{[e]:t}:t)}))).every(Boolean))||a.isValid)&&R():i=s=await Q(u);return S.state.next({...!C(e)||x.isValid&&s!==a.isValid?{}:{name:e},...r.resolver||!e?{isValid:s}:{},errors:a.errors}),t.shouldFocus&&!i&&B(u,eV,e?l:_.mount),i},eF=e=>{let t={...b.mount?c:d};return h(e)?t:C(e)?g(t,e):e.map(e=>g(t,e))},ew=(e,t)=>({invalid:!!g((t||a).errors,e),isDirty:!!g((t||a).dirtyFields,e),error:g((t||a).errors,e),isValidating:!!g(a.validatingFields,e),isTouched:!!g((t||a).touchedFields,e)}),ex=(e,t,r)=>{let s=(g(u,e,{_f:{}})._f||{}).ref,{ref:i,message:l,type:n,...o}=g(a.errors,e)||{};V(a.errors,e,{...o,...t,ref:s}),S.state.next({name:e,errors:a.errors,isValid:!1}),r&&r.shouldFocus&&s&&s.focus&&s.focus()},eS=(e,t={})=>{for(let s of e?E(e):_.mount)_.mount.delete(s),_.array.delete(s),t.keepValue||(Y(u,s),Y(c,s)),t.keepError||Y(a.errors,s),t.keepDirty||Y(a.dirtyFields,s),t.keepTouched||Y(a.touchedFields,s),t.keepIsValidating||Y(a.validatingFields,s),r.shouldUnregister||t.keepDefaultValue||Y(d,s);S.values.next({values:{...c}}),S.state.next({...a,...t.keepDirty?{isDirty:ee()}:{}}),t.keepIsValid||R()},ek=({disabled:e,name:t,field:r,fields:a,value:s})=>{if(p(e)&&b.mount||e){let i=e?void 0:h(s)?eo(r?r._f:g(a,t)._f):s;!e&&(e||h(i))||V(c,t,i),G(t,i,!1,!1,!0)}},eD=(e,t={})=>{let a=g(u,e),s=p(t.disabled)||p(r.disabled);return V(u,e,{...a||{},_f:{...a&&a._f?a._f:{ref:{name:e}},name:e,mount:!0,...t}}),_.mount.add(e),a?ek({field:a,disabled:p(t.disabled)?t.disabled:r.disabled,name:e,value:t.value}):W(e,!0,t.value),{...s?{disabled:t.disabled||r.disabled}:{},...r.progressive?{required:!!t.required,min:ef(t.min),max:ef(t.max),minLength:ef(t.minLength),maxLength:ef(t.maxLength),pattern:ef(t.pattern)}:{},name:e,onChange:e_,onBlur:e_,ref:s=>{if(s){eD(e,t),a=g(u,e);let r=h(s.value)&&s.querySelectorAll&&s.querySelectorAll("input,select,textarea")[0]||s,i=ea(r),l=a._f.refs||[];(i?l.find(e=>e===r):r===a._f.ref)||(V(u,e,{_f:{...a._f,...i?{refs:[...l.filter(es),r,...Array.isArray(g(d,e))?[{}]:[]],ref:{type:r.type,name:e}}:{ref:r}}}),W(e,!1,void 0,r))}else(a=g(u,e,{}))._f&&(a._f.mount=!1),(r.shouldUnregister||t.shouldUnregister)&&!(f(_.array,e)&&b.action)&&_.unMount.add(e)}}},eO=()=>r.shouldFocusError&&B(u,eV,_.mount),eE=(e,t)=>async s=>{let i;if(s&&(s.preventDefault&&s.preventDefault(),s.persist&&s.persist()),r.disabled){t&&await t({...a.errors},s);return}let l=m(c);if(S.state.next({isSubmitting:!0}),r.resolver){let{errors:e,values:t}=await J();a.errors=e,l=t}else await Q(u);if(Y(a.errors,"root"),D(a.errors)){S.state.next({errors:{}});try{await e(l,s)}catch(e){i=e}}else t&&await t({...a.errors},s),eO(),setTimeout(eO);if(S.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:D(a.errors)&&!i,submitCount:a.submitCount+1,errors:a.errors}),i)throw i},eC=(e,t={})=>{let s=e?m(e):d,i=m(s),l=D(e),n=l?d:i;if(t.keepDefaultValues||(d=s),!t.keepValues){if(t.keepDirtyValues)for(let e of Array.from(new Set([..._.mount,...Object.keys(eu(d,c))])))g(a.dirtyFields,e)?V(n,e,g(c,e)):eb(e,g(n,e));else{if(y&&h(e))for(let e of _.mount){let t=g(u,e);if(t&&t._f){let e=Array.isArray(t._f.refs)?t._f.refs[0]:t._f.ref;if(I(e)){let t=e.closest("form");if(t){t.reset();break}}}}u={}}c=r.shouldUnregister?t.keepDefaultValues?m(d):{}:m(n),S.array.next({values:{...n}}),S.values.next({values:{...n}})}_={mount:t.keepDirtyValues?_.mount:new Set,unMount:new Set,array:new Set,watch:new Set,watchAll:!1,focus:""},b.mount=!x.isValid||!!t.keepIsValid||!!t.keepDirtyValues,b.watch=!!r.shouldUnregister,S.state.next({submitCount:t.keepSubmitCount?a.submitCount:0,isDirty:!l&&(t.keepDirty?a.isDirty:!!(t.keepDefaultValues&&!et(e,d))),isSubmitted:!!t.keepIsSubmitted&&a.isSubmitted,dirtyFields:l?{}:t.keepDirtyValues?t.keepDefaultValues&&c?eu(d,c):a.dirtyFields:t.keepDefaultValues&&e?eu(d,e):t.keepDirty?a.dirtyFields:{},touchedFields:t.keepTouched?a.touchedFields:{},errors:t.keepErrors?a.errors:{},isSubmitSuccessful:!!t.keepIsSubmitSuccessful&&a.isSubmitSuccessful,isSubmitting:!1})},eT=(e,t)=>eC(q(e)?e(c):e,t);return{control:{register:eD,unregister:eS,getFieldState:ew,handleSubmit:eE,setError:ex,_executeSchema:J,_getWatch:ei,_getDirty:ee,_updateValid:R,_removeUnmounted:()=>{for(let e of _.unMount){let t=g(u,e);t&&(t._f.refs?t._f.refs.every(e=>!es(e)):!es(t._f.ref))&&eS(e)}_.unMount=new Set},_updateFieldArray:(e,t=[],s,i,l=!0,n=!0)=>{if(i&&s&&!r.disabled){if(b.action=!0,n&&Array.isArray(g(u,e))){let t=s(g(u,e),i.argA,i.argB);l&&V(u,e,t)}if(n&&Array.isArray(g(a.errors,e))){let t=s(g(a.errors,e),i.argA,i.argB);l&&V(a.errors,e,t),eg(a.errors,e)}if(x.touchedFields&&n&&Array.isArray(g(a.touchedFields,e))){let t=s(g(a.touchedFields,e),i.argA,i.argB);l&&V(a.touchedFields,e,t)}x.dirtyFields&&(a.dirtyFields=eu(d,c)),S.state.next({name:e,isDirty:ee(e,t),dirtyFields:a.dirtyFields,errors:a.errors,isValid:a.isValid})}else V(c,e,t)},_updateDisabledField:ek,_getFieldArray:e=>v(g(b.mount?c:d,e,r.shouldUnregister?g(d,e,[]):[])),_reset:eC,_resetDefaultValues:()=>q(r.defaultValues)&&r.defaultValues().then(e=>{eT(e,r.resetOptions),S.state.next({isLoading:!1})}),_updateFormState:e=>{a={...a,...e}},_disableForm:e=>{p(e)&&(S.state.next({disabled:e}),B(u,(t,r)=>{let a=g(u,r);a&&(t.disabled=a._f.disabled||e,Array.isArray(a._f.refs)&&a._f.refs.forEach(t=>{t.disabled=a._f.disabled||e}))},0,!1))},_subjects:S,_proxyFormState:x,_setErrors:e=>{a.errors=e,S.state.next({errors:a.errors,isValid:!1})},get _fields(){return u},get _formValues(){return c},get _state(){return b},set _state(value){b=value},get _defaultValues(){return d},get _names(){return _},set _names(value){_=value},get _formState(){return a},set _formState(value){a=value},get _options(){return r},set _options(value){r={...r,...value}}},trigger:eA,register:eD,handleSubmit:eE,watch:(e,t)=>q(e)?S.values.subscribe({next:r=>e(ei(void 0,t),r)}):ei(e,t,!0),setValue:eb,getValues:eF,reset:eT,resetField:(e,t={})=>{g(u,e)&&(h(t.defaultValue)?eb(e,m(g(d,e))):(eb(e,t.defaultValue),V(d,e,m(t.defaultValue))),t.keepTouched||Y(a.touchedFields,e),t.keepDirty||(Y(a.dirtyFields,e),a.isDirty=t.defaultValue?ee(e,m(g(d,e))):ee()),!t.keepError&&(Y(a.errors,e),x.isValid&&R()),S.state.next({...a}))},clearErrors:e=>{e&&E(e).forEach(e=>Y(a.errors,e)),S.state.next({errors:e?a.errors:{}})},unregister:eS,setError:ex,setFocus:(e,t={})=>{let r=g(u,e),a=r&&r._f;if(a){let e=a.refs?a.refs[0]:a.ref;e.focus&&(e.focus(),t.shouldSelect&&q(e.select)&&e.select())}},getFieldState:ew}}(e),formState:u});let c=t.current.control;return c._options=e,!function(e){let t=a.useRef(e);t.current=e,a.useEffect(()=>{let r=!e.disabled&&t.current.subject&&t.current.subject.subscribe({next:t.current.next});return()=>{r&&r.unsubscribe()}},[e.disabled])}({subject:c._subjects.state,next:e=>{O(e,c._proxyFormState,c._updateFormState,!0)&&d({...c._formState})}}),a.useEffect(()=>c._disableForm(e.disabled),[c,e.disabled]),a.useEffect(()=>{if(c._proxyFormState.isDirty){let e=c._getDirty();e!==u.isDirty&&c._subjects.state.next({isDirty:e})}},[c,u.isDirty]),a.useEffect(()=>{e.values&&!et(e.values,r.current)?(c._reset(e.values,c._options.resetOptions),r.current=e.values,d(e=>({...e}))):c._resetDefaultValues()},[e.values,c]),a.useEffect(()=>{e.errors&&c._setErrors(e.errors)},[e.errors,c]),a.useEffect(()=>{c._state.mount||(c._updateValid(),c._state.mount=!0),c._state.watch&&(c._state.watch=!1,c._subjects.state.next({...c._formState})),c._removeUnmounted()}),a.useEffect(()=>{e.shouldUnregister&&c._subjects.values.next({values:c._getWatch()})},[e.shouldUnregister,c]),a.useMemo(()=>({...t.current,formState:k(u,c)}),[u,c])}}}]);