(()=>{var e={};e.id=638,e.ids=[638],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},39491:e=>{"use strict";e.exports=require("assert")},82361:e=>{"use strict";e.exports=require("events")},57147:e=>{"use strict";e.exports=require("fs")},13685:e=>{"use strict";e.exports=require("http")},95687:e=>{"use strict";e.exports=require("https")},22037:e=>{"use strict";e.exports=require("os")},71017:e=>{"use strict";e.exports=require("path")},12781:e=>{"use strict";e.exports=require("stream")},76224:e=>{"use strict";e.exports=require("tty")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},59796:e=>{"use strict";e.exports=require("zlib")},31973:(e,t,l)=>{"use strict";l.r(t),l.d(t,{GlobalError:()=>a.a,__next_app__:()=>u,originalPathname:()=>p,pages:()=>c,routeModule:()=>m,tree:()=>d}),l(40905),l(12449),l(68032),l(51266),l(26083),l(19644),l(96560);var r=l(23191),o=l(88716),n=l(37922),a=l.n(n),i=l(95231),s={};for(let e in i)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(s[e]=()=>i[e]);l.d(t,s);let d=["",{children:["(dashboard)",{children:["ide",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(l.bind(l,40905)),"E:\\oj-frontend\\app\\(dashboard)\\ide\\page.tsx"]}]},{layout:[()=>Promise.resolve().then(l.bind(l,12449)),"E:\\oj-frontend\\app\\(dashboard)\\ide\\layout.tsx"]}]},{layout:[()=>Promise.resolve().then(l.bind(l,68032)),"E:\\oj-frontend\\app\\(dashboard)\\layout.tsx"]}]},{layout:[()=>Promise.resolve().then(l.bind(l,51266)),"E:\\oj-frontend\\app\\layout.tsx"],error:[()=>Promise.resolve().then(l.bind(l,26083)),"E:\\oj-frontend\\app\\error.tsx"],loading:[()=>Promise.resolve().then(l.bind(l,19644)),"E:\\oj-frontend\\app\\loading.tsx"],"not-found":[()=>Promise.resolve().then(l.bind(l,96560)),"E:\\oj-frontend\\app\\not-found.tsx"]}],c=["E:\\oj-frontend\\app\\(dashboard)\\ide\\page.tsx"],p="/(dashboard)/ide/page",u={require:l,loadChunk:()=>Promise.resolve()},m=new r.AppPageRouteModule({definition:{kind:o.x.APP_PAGE,page:"/(dashboard)/ide/page",pathname:"/ide",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},14079:(e,t,l)=>{Promise.resolve().then(l.bind(l,31114))},96750:(e,t,l)=>{Promise.resolve().then(l.bind(l,78143)),Promise.resolve().then(l.bind(l,38425)),Promise.resolve().then(l.bind(l,8489)),Promise.resolve().then(l.bind(l,31190))},39910:(e,t,l)=>{Promise.resolve().then(l.bind(l,92418)),Promise.resolve().then(l.bind(l,83936))},5444:(e,t,l)=>{Promise.resolve().then(l.bind(l,83936))},31114:(e,t,l)=>{"use strict";l.d(t,{default:()=>n});var r=l(10326),o=l(47607);function n({children:e}){return r.jsx(o.X,{children:e})}},47607:(e,t,l)=>{"use strict";l.d(t,{W:()=>s,X:()=>i});var r=l(10326),o=l(17577),n=l.n(o);let a=(0,o.createContext)(void 0),i=({children:e})=>{let[t,l]=(0,o.useState)("cpp"),[i,s]=(0,o.useState)("light"),[d,c]=(0,o.useState)(""),[p,u]=(0,o.useState)("");return n().useEffect(()=>{let e=localStorage.getItem("code");e&&c(e);let t=localStorage.getItem("language");t&&l(t);let r=localStorage.getItem("theme");r&&s(r);let o=localStorage.getItem("output");o&&u(o)},[]),n().useEffect(()=>{localStorage.setItem("code",d),localStorage.setItem("language",t),localStorage.setItem("theme",i),localStorage.setItem("output",p)},[d,t,i,p]),r.jsx(a.Provider,{value:{language:t,setLanguage:l,theme:i,setTheme:s,code:d,setCode:c,output:p,setOutput:u},children:e})},s=()=>{let e=(0,o.useContext)(a);if(void 0===e)throw Error("useIDEContext must be used within an IDEProvider");return e}},92418:(e,t,l)=>{"use strict";l.d(t,{default:()=>y});var r=l(10326),o=l(31929),n=l(17577),a=l.n(n),i=l(57766),s=l(47607);let d={themes:[{key:"light",label:"Light"},{key:"vs-dark",label:"Dark"}],languages:[{key:"javascript",label:"JavaScript",codeSnippet:`// JavaScript Example
function greet(name) {
    console.log('Hello, ' + name + '!');
}

greet('World');`},{key:"typescript",label:"TypeScript",codeSnippet:`// TypeScript Example
function greet(name: string): void {
    console.log('Hello, ' + name + '!');
}

greet('World');`},{key:"cpp",label:"C++",codeSnippet:`// C++ Example
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`},{key:"c",label:"C",codeSnippet:`// C Example
#include <stdio.h>

int main() {
    printf("Hello, World!");
    return 0;
}`},{key:"java",label:"Java",codeSnippet:`// Java Example
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`},{key:"python",label:"Python",codeSnippet:`# Python Example
def greet(name):
    print(f'Hello, {name}!')
    
greet('World')`},{key:"html",label:"HTML",codeSnippet:`< !DOCTYPE html>
        <html>
        <head>
        <title>Page Title </title>
        </head>
        < body >

        <h1>This is a Heading </h1>
        < p > This is a paragraph.</p>

        </body>
        </html>`},{key:"json",label:"JSON",codeSnippet:`{
    "name": "John Doe",
    "age": 30,
    "city": "New York"
}`},{key:"xml",label:"XML",codeSnippet:`<?xml version="1.0" encoding="UTF-8"?>
<note>
    <to>Tove</to>
    <from>Jani</from>
    <heading>Reminder</heading>
    <body>Don't forget me this weekend!</body>
</note>`},{key:"markdown",label:"Markdown",codeSnippet:`# Markdown Example

## This is a sub-heading

This is a paragraph with **bold** text and *italic* text.

- Item 1
- Item 2
- Item 3

[Link to Google](https://www.google.com)`},{key:"python",label:"Python",codeSnippet:`# Python Example
def greet(name):
    print(f'Hello, {name}!')

greet('World')`},{key:"java",label:"Java",codeSnippet:`// Java Example
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`},{key:"csharp",label:"C#",codeSnippet:`// C# Example
using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`},{key:"php",label:"PHP",codeSnippet:`<?php
// PHP Example
echo "Hello, World!";
?>`},{key:"go",label:"Go",codeSnippet:`// Go Example
package main
import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`},{key:"rust",label:"Rust",codeSnippet:`// Rust Example
fn main() {
    println!("Hello, World!");
}`},{key:"swift",label:"Swift",codeSnippet:`// Swift Example
import Foundation

print("Hello, World!")`},{key:"kotlin",label:"Kotlin",codeSnippet:`// Kotlin Example
fun main() {
    println("Hello, World!")
}`},{key:"yaml",label:"YAML",codeSnippet:`# YAML Example
name: John Doe
age: 30
city: New York`},{key:"sql",label:"SQL",codeSnippet:`-- SQL Example
SELECT name, age, city
FROM users
WHERE age > 20;`},{key:"shell",label:"Shell",codeSnippet:`# Shell Script Example
#!/bin/bash
echo "Hello, World!"`},{key:"powershell",label:"PowerShell",codeSnippet:`# PowerShell Example
Write-Output "Hello, World!"`},{key:"dockerfile",label:"Dockerfile",codeSnippet:`# Dockerfile Example
FROM node:14
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]`}],snippets:{javascript:`// JavaScript Example
function greet(name) {
    console.log('Hello, ' + name + '!');
}

greet('World');`,typescript:`// TypeScript Example
function greet(name: string): void {
    console.log('Hello, ' + name + '!');
}

greet('World');`,html:`<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
</head>
<body>

<h1>This is a Heading</h1>
<p>This is a paragraph.</p>

</body>
</html>`,json:`{
    "name": "John Doe",
    "age": 30,
    "city": "New York"
}`,xml:`<?xml version="1.0" encoding="UTF-8"?>
<note>
    <to>Tove</to>
    <from>Jani</from>
    <heading>Reminder</heading>
    <body>Don't forget me this weekend!</body>
</note>`,markdown:`# Markdown Example

## This is a sub-heading

This is a paragraph with **bold** text and *italic* text.

- Item 1
- Item 2
- Item 3

[Link to Google](https://www.google.com)`,python:`# Python Example
def greet(name):
    print(f'Hello, {name}!')

greet('World')`,java:`// Java Example
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,csharp:`// C# Example
using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,php:`<?php
// PHP Example
echo "Hello, World!";
?>`,go:`// Go Example
package main
import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,rust:`// Rust Example
fn main() {
    println!("Hello, World!");
}`,swift:`// Swift Example
import Foundation

print("Hello, World!")`,kotlin:`// Kotlin Example
fun main() {
    println("Hello, World!")
}`,yaml:`# YAML Example
name: John Doe
age: 30
city: New York`,sql:`-- SQL Example
SELECT name, age, city
FROM users
WHERE age > 20;`,shell:`# Shell Script Example
#!/bin/bash
echo "Hello, World!"`,powershell:`# PowerShell Example
Write-Output "Hello, World!"`,dockerfile:`# Dockerfile Example
FROM node:14
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]`}};function c(){let{language:e,code:t,setCode:l,theme:o}=(0,s.W)();return r.jsx(i.ZP,{className:"rounded-large overflow-hidden h-full",height:"100%",language:e,loading:r.jsx("div",{className:"flex items-center justify-center w-full h-full bg-foreground-500 rounded-large"}),options:{fontSize:16,minimap:{enabled:!1},automaticLayout:!0},theme:o,value:t,width:"100%",onChange:e=>{l(e)}})}var p=l(18855),u=l(1481),m=l(30752),h=l(62222),g=l(20361),x=l(39002);function f(){let{code:e,language:t,setLanguage:l,setTheme:o,setOutput:n}=(0,s.W)(),i=d.themes,c=d.languages,[f,b]=a().useState(new Set([])),[y,S]=a().useState(new Set([])),[v,E]=a().useState(!1),w=a().useCallback(async()=>{try{E(!0);let{output:l}=await (0,x._)(t,e);n(l)}catch(e){console.error(e)}finally{E(!1)}},[e,t]);return(0,r.jsxs)(g.E,{fullwidth:!0,classnames:{container:"justify-end"},direction:"row",space:"md",children:[r.jsx(p.g,{shouldFlip:!0,"aria-label":"Select theme",classNames:{trigger:"bg-foreground-50"},placeholder:"Select theme",radius:"full",selectedKeys:f,onSelectionChange:b,children:i.map((e,t)=>r.jsx(u.R,{children:e.key},e.key))}),r.jsx(p.g,{shouldFlip:!0,"aria-label":"Select language",classNames:{trigger:"bg-foreground-50"},placeholder:"Select language",radius:"full",selectedKeys:y,onSelectionChange:S,children:c.map((e,t)=>r.jsx(u.R,{children:e.label},e.key))}),r.jsx(m.A,{"aria-label":"Run code",className:"bg-foreground-900 text-foreground-100",isLoading:v,radius:"full",startContent:r.jsx(h.Z,{size:24}),onClick:w,children:"Run"})]})}function b(){let{output:e}=(0,s.W)();return r.jsx("div",{className:"flex p-4 w-full h-full bg-foreground-900 text-foreground-100 rounded-medium",children:e})}function y(e){let{layout:t="horizontal"}=e;return(0,r.jsxs)(g.E,{fullheight:!0,fullwidth:!0,direction:"column",space:"lg",children:[r.jsx(f,{}),(0,r.jsxs)(o.Splitter,{className:"w-full h-full gap-1",layout:t,children:[r.jsx(o.SplitterPanel,{size:60,children:r.jsx(c,{})}),r.jsx(o.SplitterPanel,{size:40,children:r.jsx(b,{})})]})]})}},39002:(e,t,l)=>{"use strict";l.d(t,{_:()=>o});let r=l(44099).Z.create({baseURL:"https://emkc.org/api/v1/piston",headers:{"Content-Type":"application/json"}}),o=async(e,t)=>{try{return console.log(e,t),(await r.post("/execute",{language:e,source:t,files:[{name:"stdin",content:t}]})).data}catch(e){throw console.error(e),Error("Failed to run code")}}},12449:(e,t,l)=>{"use strict";l.r(t),l.d(t,{default:()=>d});var r=l(19510),o=l(68570);let n=(0,o.createProxy)(String.raw`E:\oj-frontend\app\(dashboard)\ide\providers.tsx`),{__esModule:a,$$typeof:i}=n;n.default;let s=(0,o.createProxy)(String.raw`E:\oj-frontend\app\(dashboard)\ide\providers.tsx#default`);function d({children:e}){return r.jsx(s,{children:e})}},40905:(e,t,l)=>{"use strict";l.r(t),l.d(t,{default:()=>a});var r=l(19510),o=l(69882),n=l(42108);function a(){return r.jsx(n._z,{children:r.jsx(o.ZP,{})})}},68032:(e,t,l)=>{"use strict";l.r(t),l.d(t,{default:()=>a,metadata:()=>n});var r=l(19510),o=l(42108);l(7633);let n={title:"Dashboard"};function a({children:e}){return r.jsx(o.kz,{children:e})}},69882:(e,t,l)=>{"use strict";l.d(t,{ZP:()=>i});var r=l(68570);let o=(0,r.createProxy)(String.raw`E:\oj-frontend\components\ide\index.tsx`),{__esModule:n,$$typeof:a}=o;o.default;let i=(0,r.createProxy)(String.raw`E:\oj-frontend\components\ide\index.tsx#default`)},79223:(e,t,l)=>{"use strict";l.d(t,{E:()=>a});var r=l(19510),o=l(55761),n=l(62386);function a(e){let{direction:t="row",space:l="md",fullwidth:a=!1,fullheight:i=!1,isCentered:s=!1,isCenteredX:d=!1,isCenteredY:c=!1,roundedMedium:p=!0,classnames:u,className:m,...h}=e;return(0,r.jsxs)("div",{className:(0,n.m6)("flex flex-col gap-2 h-fit w-fit",p&&"rounded-medium",a&&"w-full",i&&"h-full",(0,n.dV)(m,u?.wrapper)),children:[e.label&&r.jsx("h3",{className:(0,n.m6)("text-sm font-medium text-foreground","sm"===e.labelSize&&"text-sm","md"===e.labelSize&&"text-md","lg"===e.labelSize&&"text-lg","2xl"===e.labelSize&&"text-2xl font-semibold",u?.label),children:e.label}),r.jsx("div",{...e,className:(0,o.Z)("flex w-full h-full","row"===t&&"flex-row","column"===t&&"flex-col","sm"===l&&"gap-2","md"===l&&"gap-4","lg"===l&&"gap-6",s&&"justify-center items-center",d&&"justify-center",c&&"items-center",u?.container),children:e.children})]})}},42108:(e,t,l)=>{"use strict";l.d(t,{kz:()=>i,EY:()=>s.E,_z:()=>n});var r=l(19510),o=l(62386);function n(e){let{isCentered:t=!1,isCenteredX:l=!1,isCenteredY:n=!1,title:a,label:i,className:s,...d}=e;return(0,r.jsxs)("div",{...e,className:(0,o.m6)("w-full h-full flex flex-col gap-6",t&&"justify-center items-center",n&&"justify-center",l&&"items-center",s),children:[a&&r.jsx("h1",{className:"text-4xl font-bold text-foreground",children:a}),i,e.children]})}var a=l(55761);function i(e){return r.jsx("div",{...e,className:(0,a.Z)("w-full h-full",e.className),children:e.children})}var s=l(79223),d=l(68570);let c=(0,d.createProxy)(String.raw`E:\oj-frontend\components\ui\metric\Field.tsx`),{__esModule:p,$$typeof:u}=c;c.default,(0,d.createProxy)(String.raw`E:\oj-frontend\components\ui\metric\Field.tsx#Field`)},89055:(e,t,l)=>{"use strict";l.d(t,{S:()=>i,T:()=>s});var r=l(47753),o=l(17577),n=l(48003);let a={border:0,clip:"rect(0 0 0 0)",clipPath:"inset(50%)",height:"1px",margin:"-1px",overflow:"hidden",padding:0,position:"absolute",width:"1px",whiteSpace:"nowrap"};function i(e={}){let{style:t,isFocusable:l}=e,[r,i]=(0,o.useState)(!1),{focusWithinProps:s}=(0,n.L)({isDisabled:!l,onFocusWithinChange:e=>i(e)}),d=(0,o.useMemo)(()=>r?t:t?{...a,...t}:a,[r]);return{visuallyHiddenProps:{...s,style:d}}}function s(e){let{children:t,elementType:l="div",isFocusable:n,style:a,...s}=e,{visuallyHiddenProps:d}=i(e);return o.createElement(l,(0,r.d)(s,d),t)}},38904:(e,t,l)=>{"use strict";l.d(t,{v:()=>o});var r=l(10326),o=({strokeWidth:e=1.5,...t})=>(0,r.jsx)("svg",{"aria-hidden":"true",fill:"none",focusable:"false",height:"1em",role:"presentation",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:e,viewBox:"0 0 24 24",width:"1em",...t,children:(0,r.jsx)("path",{d:"m6 9 6 6 6-6"})})}};var t=require("../../../webpack-runtime.js");t.C(e);var l=e=>t(t.s=e),r=t.X(0,[304,386,766,189,978,763],()=>l(31973));module.exports=r})();