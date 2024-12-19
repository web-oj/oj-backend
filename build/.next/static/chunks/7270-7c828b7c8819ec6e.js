"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7270],{37270:function(e,t,r){function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach(function(t){var n;n=r[t],t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function u(e){return function t(){for(var r=this,n=arguments.length,o=Array(n),i=0;i<n;i++)o[i]=arguments[i];return o.length>=e.length?e.apply(this,o):function(){for(var e=arguments.length,n=Array(e),i=0;i<e;i++)n[i]=arguments[i];return t.apply(r,[].concat(o,n))}}}function c(e){return({}).toString.call(e).includes("Object")}function a(e){return"function"==typeof e}r.d(t,{ML:function(){return W},ZP:function(){return B}});var l,s,d=u(function(e,t){throw Error(e[t]||e.default)})({initialIsRequired:"initial state is required",initialType:"initial state should be an object",initialContent:"initial state shouldn't be an empty object",handlerType:"handler should be an object or a function",handlersType:"all handlers should be a functions",selectorType:"selector should be a function",changeType:"provided value of changes should be an object",changeField:'it seams you want to change a field in the state which is not specified in the "initial" state',default:"an unknown error accured in `state-local` package"}),f=function(e,t){return c(t)||d("changeType"),Object.keys(t).some(function(t){return!Object.prototype.hasOwnProperty.call(e,t)})&&d("changeField"),t},g=function(e){a(e)||d("selectorType")},p=function(e){a(e)||c(e)||d("handlerType"),c(e)&&Object.values(e).some(function(e){return!a(e)})&&d("handlersType")},h=function(e){e||d("initialIsRequired"),c(e)||d("initialType"),Object.keys(e).length||d("initialContent")};function m(e,t){return a(t)?t(e.current):t}function y(e,t){return e.current=i(i({},e.current),t),t}function v(e,t,r){return a(t)?t(e.current):Object.keys(r).forEach(function(r){var n;return null===(n=t[r])||void 0===n?void 0:n.call(t,e.current[r])}),r}(l=function(e,t){throw Error(e[t]||e.default)},function e(){for(var t=this,r=arguments.length,n=Array(r),o=0;o<r;o++)n[o]=arguments[o];return n.length>=l.length?l.apply(this,n):function(){for(var r=arguments.length,o=Array(r),i=0;i<r;i++)o[i]=arguments[i];return e.apply(t,[].concat(n,o))}})({configIsRequired:"the configuration object is required",configType:"the configuration object should be an object",default:"an unknown error accured in `@monaco-editor/loader` package",deprecation:"Deprecation warning!\n    You are using deprecated way of configuration.\n\n    Instead of using\n      monaco.config({ urls: { monacoBase: '...' } })\n    use\n      monaco.config({ paths: { vs: '...' } })\n\n    For more please check the link https://github.com/suren-atoyan/monaco-loader#config\n  "});var b=function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(e){return t.reduceRight(function(e,t){return t(e)},e)}},w={type:"cancelation",msg:"operation is manually canceled"},M=function(e){var t=!1,r=new Promise(function(r,n){e.then(function(e){return t?n(w):r(e)}),e.catch(n)});return r.cancel=function(){return t=!0},r},j=function(e){if(Array.isArray(e))return e}(s=({create:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};h(e),p(t);var r={current:e},n=u(v)(r,t),o=u(y)(r),i=u(f)(e),c=u(m)(r);return[function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(e){return e};return g(e),e(r.current)},function(e){(function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(e){return t.reduceRight(function(e,t){return t(e)},e)}})(n,o,i,c)(e)}]}}).create({config:{paths:{vs:"https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs"}},isInitialized:!1,resolve:null,reject:null,monaco:null}))||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,o=!1,i=void 0;try{for(var u,c=e[Symbol.iterator]();!(n=(u=c.next()).done)&&(r.push(u.value),2!==r.length);n=!0);}catch(e){o=!0,i=e}finally{try{n||null==c.return||c.return()}finally{if(o)throw i}}return r}}(s,2)||function(e,t){if(e){if("string"==typeof e)return n(e,2);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return n(e,2)}}(s,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),O=j[0],E=j[1];function R(e){return document.body.appendChild(e)}function k(e){var t,r,n=O(function(e){return{config:e.config,reject:e.reject}}),o=(t="".concat(n.config.paths.vs,"/loader.js"),r=document.createElement("script"),t&&(r.src=t),r);return o.onload=function(){return e()},o.onerror=n.reject,o}function P(){var e=O(function(e){return{config:e.config,resolve:e.resolve,reject:e.reject}}),t=window.require;t.config(e.config),t(["vs/editor/editor.main"],function(t){S(t),e.resolve(t)},function(t){e.reject(t)})}function S(e){O().monaco||E({monaco:e})}var C=new Promise(function(e,t){return E({resolve:e,reject:t})}),T=function(){var e=O(function(e){return{monaco:e.monaco,isInitialized:e.isInitialized,resolve:e.resolve}});if(!e.isInitialized){if(E({isInitialized:!0}),e.monaco)return e.resolve(e.monaco),M(C);if(window.monaco&&window.monaco.editor)return S(window.monaco),e.resolve(window.monaco),M(C);b(R,k)(P)}return M(C)},x=r(2265),A={wrapper:{display:"flex",position:"relative",textAlign:"initial"},fullWidth:{width:"100%"},hide:{display:"none"}},I={display:"flex",height:"100%",width:"100%",justifyContent:"center",alignItems:"center"},L=function({children:e}){return x.createElement("div",{style:I},e)},V=(0,x.memo)(function({width:e,height:t,isEditorReady:r,loading:n,_ref:o,className:i,wrapperProps:u}){return x.createElement("section",{style:{...A.wrapper,width:e,height:t},...u},!r&&x.createElement(L,null,n),x.createElement("div",{ref:o,style:{...A.fullWidth,...!r&&A.hide},className:i}))}),D=function(e){(0,x.useEffect)(e,[])},N=function(e,t,r=!0){let n=(0,x.useRef)(!0);(0,x.useEffect)(n.current||!r?()=>{n.current=!1}:e,t)};function z(){}function _(e,t,r,n){return e.editor.getModel(q(e,n))||e.editor.createModel(t,r,n?q(e,n):void 0)}function q(e,t){return e.Uri.parse(t)}(0,x.memo)(function({original:e,modified:t,language:r,originalLanguage:n,modifiedLanguage:o,originalModelPath:i,modifiedModelPath:u,keepCurrentOriginalModel:c=!1,keepCurrentModifiedModel:a=!1,theme:l="light",loading:s="Loading...",options:d={},height:f="100%",width:g="100%",className:p,wrapperProps:h={},beforeMount:m=z,onMount:y=z}){let[v,b]=(0,x.useState)(!1),[w,M]=(0,x.useState)(!0),j=(0,x.useRef)(null),O=(0,x.useRef)(null),E=(0,x.useRef)(null),R=(0,x.useRef)(y),k=(0,x.useRef)(m),P=(0,x.useRef)(!1);D(()=>{let e=T();return e.then(e=>(O.current=e)&&M(!1)).catch(e=>e?.type!=="cancelation"&&console.error("Monaco initialization: error:",e)),()=>{let t;return j.current?(t=j.current?.getModel(),void(c||t?.original?.dispose(),a||t?.modified?.dispose(),j.current?.dispose())):e.cancel()}}),N(()=>{if(j.current&&O.current){let t=j.current.getOriginalEditor(),o=_(O.current,e||"",n||r||"text",i||"");o!==t.getModel()&&t.setModel(o)}},[i],v),N(()=>{if(j.current&&O.current){let e=j.current.getModifiedEditor(),n=_(O.current,t||"",o||r||"text",u||"");n!==e.getModel()&&e.setModel(n)}},[u],v),N(()=>{let e=j.current.getModifiedEditor();e.getOption(O.current.editor.EditorOption.readOnly)?e.setValue(t||""):t!==e.getValue()&&(e.executeEdits("",[{range:e.getModel().getFullModelRange(),text:t||"",forceMoveMarkers:!0}]),e.pushUndoStop())},[t],v),N(()=>{j.current?.getModel()?.original.setValue(e||"")},[e],v),N(()=>{let{original:e,modified:t}=j.current.getModel();O.current.editor.setModelLanguage(e,n||r||"text"),O.current.editor.setModelLanguage(t,o||r||"text")},[r,n,o],v),N(()=>{O.current?.editor.setTheme(l)},[l],v),N(()=>{j.current?.updateOptions(d)},[d],v);let S=(0,x.useCallback)(()=>{if(!O.current)return;k.current(O.current);let c=_(O.current,e||"",n||r||"text",i||""),a=_(O.current,t||"",o||r||"text",u||"");j.current?.setModel({original:c,modified:a})},[r,t,o,e,n,i,u]),C=(0,x.useCallback)(()=>{!P.current&&E.current&&(j.current=O.current.editor.createDiffEditor(E.current,{automaticLayout:!0,...d}),S(),O.current?.editor.setTheme(l),b(!0),P.current=!0)},[d,l,S]);return(0,x.useEffect)(()=>{v&&R.current(j.current,O.current)},[v]),(0,x.useEffect)(()=>{w||v||C()},[w,v,C]),x.createElement(V,{width:g,height:f,isEditorReady:v,loading:s,_ref:E,className:p,wrapperProps:h})});var F=function(e){let t=(0,x.useRef)();return(0,x.useEffect)(()=>{t.current=e},[e]),t.current},U=new Map,W=(0,x.memo)(function({defaultValue:e,defaultLanguage:t,defaultPath:r,value:n,language:o,path:i,theme:u="light",line:c,loading:a="Loading...",options:l={},overrideServices:s={},saveViewState:d=!0,keepCurrentModel:f=!1,width:g="100%",height:p="100%",className:h,wrapperProps:m={},beforeMount:y=z,onMount:v=z,onChange:b,onValidate:w=z}){let[M,j]=(0,x.useState)(!1),[O,E]=(0,x.useState)(!0),R=(0,x.useRef)(null),k=(0,x.useRef)(null),P=(0,x.useRef)(null),S=(0,x.useRef)(v),C=(0,x.useRef)(y),A=(0,x.useRef)(),I=(0,x.useRef)(n),L=F(i),q=(0,x.useRef)(!1),W=(0,x.useRef)(!1);D(()=>{let e=T();return e.then(e=>(R.current=e)&&E(!1)).catch(e=>e?.type!=="cancelation"&&console.error("Monaco initialization: error:",e)),()=>k.current?void(A.current?.dispose(),f?d&&U.set(i,k.current.saveViewState()):k.current.getModel()?.dispose(),k.current.dispose()):e.cancel()}),N(()=>{let u=_(R.current,e||n||"",t||o||"",i||r||"");u!==k.current?.getModel()&&(d&&U.set(L,k.current?.saveViewState()),k.current?.setModel(u),d&&k.current?.restoreViewState(U.get(i)))},[i],M),N(()=>{k.current?.updateOptions(l)},[l],M),N(()=>{k.current&&void 0!==n&&(k.current.getOption(R.current.editor.EditorOption.readOnly)?k.current.setValue(n):n===k.current.getValue()||(W.current=!0,k.current.executeEdits("",[{range:k.current.getModel().getFullModelRange(),text:n,forceMoveMarkers:!0}]),k.current.pushUndoStop(),W.current=!1))},[n],M),N(()=>{let e=k.current?.getModel();e&&o&&R.current?.editor.setModelLanguage(e,o)},[o],M),N(()=>{void 0!==c&&k.current?.revealLine(c)},[c],M),N(()=>{R.current?.editor.setTheme(u)},[u],M);let B=(0,x.useCallback)(()=>{if(!(!P.current||!R.current)&&!q.current){C.current(R.current);let a=i||r,f=_(R.current,n||e||"",t||o||"",a||"");k.current=R.current?.editor.create(P.current,{model:f,automaticLayout:!0,...l},s),d&&k.current.restoreViewState(U.get(a)),R.current.editor.setTheme(u),void 0!==c&&k.current.revealLine(c),j(!0),q.current=!0}},[e,t,r,n,o,i,l,s,d,u,c]);return(0,x.useEffect)(()=>{M&&S.current(k.current,R.current)},[M]),(0,x.useEffect)(()=>{O||M||B()},[O,M,B]),I.current=n,(0,x.useEffect)(()=>{M&&b&&(A.current?.dispose(),A.current=k.current?.onDidChangeModelContent(e=>{W.current||b(k.current.getValue(),e)}))},[M,b]),(0,x.useEffect)(()=>{if(M){let e=R.current.editor.onDidChangeMarkers(e=>{let t=k.current.getModel()?.uri;if(t&&e.find(e=>e.path===t.path)){let e=R.current.editor.getModelMarkers({resource:t});w?.(e)}});return()=>{e?.dispose()}}return()=>{}},[M,w]),x.createElement(V,{width:g,height:p,isEditorReady:M,loading:a,_ref:P,className:h,wrapperProps:m})}),B=W}}]);