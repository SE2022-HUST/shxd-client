/*! For license information please see 599.fcd8b525.js.LICENSE.txt */
"use strict";(self.webpackChunkshxd_client_ui=self.webpackChunkshxd_client_ui||[]).push([[599],{2599:(e,t,r)=>{function a(){return a=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},a.apply(this,arguments)}var n;r.d(t,{Ep:()=>c,RQ:()=>R,WK:()=>k,Zn:()=>b,aU:()=>n,cP:()=>d,fp:()=>f,kG:()=>D,lX:()=>i,p7:()=>_,pC:()=>A}),function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"}(n||(n={}));const o="popstate";function i(e){return void 0===e&&(e={}),function(e,t,r,a){void 0===a&&(a={});let{window:i=document.defaultView,v5Compat:c=!1}=a,d=i.history,u=n.Pop,h=null;function f(){u=n.Pop,h&&h({action:u,location:p.location})}let p={get action(){return u},get location(){return e(i,d)},listen(e){if(h)throw new Error("A history only accepts one active listener");return i.addEventListener(o,f),h=e,()=>{i.removeEventListener(o,f),h=null}},createHref:e=>t(i,e),push:function(e,t){u=n.Push;let a=l(p.location,e,t);r&&r(a,e);let o=s(a),f=p.createHref(a);try{d.pushState(o,"",f)}catch(e){i.location.assign(f)}c&&h&&h({action:u,location:a})},replace:function(e,t){u=n.Replace;let a=l(p.location,e,t);r&&r(a,e);let o=s(a),i=p.createHref(a);d.replaceState(o,"",i),c&&h&&h({action:u,location:a})},go:e=>d.go(e)};return p}((function(e,t){let{pathname:r,search:a,hash:n}=e.location;return l("",{pathname:r,search:a,hash:n},t.state&&t.state.usr||null,t.state&&t.state.key||"default")}),(function(e,t){return"string"==typeof t?t:c(t)}),null,e)}function s(e){return{usr:e.state,key:e.key}}function l(e,t,r,n){return void 0===r&&(r=null),a({pathname:"string"==typeof e?e:e.pathname,search:"",hash:""},"string"==typeof t?d(t):t,{state:r,key:t&&t.key||n||Math.random().toString(36).substr(2,8)})}function c(e){let{pathname:t="/",search:r="",hash:a=""}=e;return r&&"?"!==r&&(t+="?"===r.charAt(0)?r:"?"+r),a&&"#"!==a&&(t+="#"===a.charAt(0)?a:"#"+a),t}function d(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substr(r),e=e.substr(0,r));let a=e.indexOf("?");a>=0&&(t.search=e.substr(a),e=e.substr(0,a)),e&&(t.pathname=e)}return t}var u;function h(e,t,r){return void 0===t&&(t=[]),void 0===r&&(r=new Set),e.map(((e,n)=>{let o=[...t,n],i="string"==typeof e.id?e.id:o.join("-");return D(!0!==e.index||!e.children,"Cannot specify children on an index route"),D(!r.has(i),'Found a route id collision on id "'+i+"\".  Route id's must be globally unique within Data Router usages"),r.add(i),function(e){return!0===e.index}(e)?a({},e,{id:i}):a({},e,{id:i,children:e.children?h(e.children,o,r):void 0})}))}function f(e,t,r){void 0===r&&(r="/");let a=b(("string"==typeof t?d(t):t).pathname||"/",r);if(null==a)return null;let n=p(e);!function(e){e.sort(((e,t)=>e.score!==t.score?t.score-e.score:function(e,t){return e.length===t.length&&e.slice(0,-1).every(((e,r)=>e===t[r]))?e[e.length-1]-t[t.length-1]:0}(e.routesMeta.map((e=>e.childrenIndex)),t.routesMeta.map((e=>e.childrenIndex)))))}(n);let o=null;for(let e=0;null==o&&e<n.length;++e)o=y(n[e],a);return o}function p(e,t,r,a){return void 0===t&&(t=[]),void 0===r&&(r=[]),void 0===a&&(a=""),e.forEach(((e,n)=>{let o={relativePath:e.path||"",caseSensitive:!0===e.caseSensitive,childrenIndex:n,route:e};o.relativePath.startsWith("/")&&(D(o.relativePath.startsWith(a),'Absolute route path "'+o.relativePath+'" nested under path "'+a+'" is not valid. An absolute child route path must start with the combined path of all its parent routes.'),o.relativePath=o.relativePath.slice(a.length));let i=R([a,o.relativePath]),s=r.concat(o);e.children&&e.children.length>0&&(D(!0!==e.index,'Index routes must not have child routes. Please remove all child routes from route path "'+i+'".'),p(e.children,t,s,i)),(null!=e.path||e.index)&&t.push({path:i,score:g(i,e.index),routesMeta:s})})),t}!function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"}(u||(u={}));const m=/^:\w+$/,v=e=>"*"===e;function g(e,t){let r=e.split("/"),a=r.length;return r.some(v)&&(a+=-2),t&&(a+=2),r.filter((e=>!v(e))).reduce(((e,t)=>e+(m.test(t)?3:""===t?1:10)),a)}function y(e,t){let{routesMeta:r}=e,a={},n="/",o=[];for(let e=0;e<r.length;++e){let i=r[e],s=e===r.length-1,l="/"===n?t:t.slice(n.length)||"/",c=w({path:i.relativePath,caseSensitive:i.caseSensitive,end:s},l);if(!c)return null;Object.assign(a,c.params);let d=i.route;o.push({params:a,pathname:R([n,c.pathname]),pathnameBase:M(R([n,c.pathnameBase])),route:d}),"/"!==c.pathnameBase&&(n=R([n,c.pathnameBase]))}return o}function w(e,t){"string"==typeof e&&(e={path:e,caseSensitive:!1,end:!0});let[r,a]=function(e,t,r){void 0===t&&(t=!1),void 0===r&&(r=!0),E("*"===e||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were "'+e.replace(/\*$/,"/*")+'" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "'+e.replace(/\*$/,"/*")+'".');let a=[],n="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^$?{}|()[\]]/g,"\\$&").replace(/:(\w+)/g,((e,t)=>(a.push(t),"([^\\/]+)")));return e.endsWith("*")?(a.push("*"),n+="*"===e||"/*"===e?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?n+="\\/*$":""!==e&&"/"!==e&&(n+="(?:(?=\\/|$))"),[new RegExp(n,t?void 0:"i"),a]}(e.path,e.caseSensitive,e.end),n=t.match(r);if(!n)return null;let o=n[0],i=o.replace(/(.)\/+$/,"$1"),s=n.slice(1);return{params:a.reduce(((e,t,r)=>{if("*"===t){let e=s[r]||"";i=o.slice(0,o.length-e.length).replace(/(.)\/+$/,"$1")}return e[t]=function(e,t){try{return decodeURIComponent(e)}catch(r){return E(!1,'The value for the URL param "'+t+'" will not be decoded because the string "'+e+'" is a malformed URL segment. This is probably due to a bad percent encoding ('+r+")."),e}}(s[r]||"",t),e}),{}),pathname:o,pathnameBase:i,pattern:e}}function b(e,t){if("/"===t)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,a=e.charAt(r);return a&&"/"!==a?null:e.slice(r)||"/"}function D(e,t){if(!1===e||null==e)throw new Error(t)}function E(e,t){if(!e){"undefined"!=typeof console&&console.warn(t);try{throw new Error(t)}catch(e){}}}function P(e,t,r,a){return"Cannot include a '"+e+"' character in a manually specified `to."+t+"` field ["+JSON.stringify(a)+"].  Please separate it out to the `to."+r+'` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.'}function A(e,t,r,n){let o;void 0===n&&(n=!1),"string"==typeof e?o=d(e):(o=a({},e),D(!o.pathname||!o.pathname.includes("?"),P("?","pathname","search",o)),D(!o.pathname||!o.pathname.includes("#"),P("#","pathname","hash",o)),D(!o.search||!o.search.includes("#"),P("#","search","hash",o)));let i,s=""===e||""===o.pathname,l=s?"/":o.pathname;if(n||null==l)i=r;else{let e=t.length-1;if(l.startsWith("..")){let t=l.split("/");for(;".."===t[0];)t.shift(),e-=1;o.pathname=t.join("/")}i=e>=0?t[e]:"/"}let c=function(e,t){void 0===t&&(t="/");let{pathname:r,search:a="",hash:n=""}="string"==typeof e?d(e):e,o=r?r.startsWith("/")?r:function(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach((e=>{".."===e?r.length>1&&r.pop():"."!==e&&r.push(e)})),r.length>1?r.join("/"):"/"}(r,t):t;return{pathname:o,search:x(a),hash:S(n)}}(o,i),u=l&&"/"!==l&&l.endsWith("/"),h=(s||"."===l)&&r.endsWith("/");return c.pathname.endsWith("/")||!u&&!h||(c.pathname+="/"),c}const R=e=>e.join("/").replace(/\/\/+/g,"/"),M=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),x=e=>e&&"?"!==e?e.startsWith("?")?e:"?"+e:"",S=e=>e&&"#"!==e?e.startsWith("#")?e:"#"+e:"";class C extends Error{}function j(e){if(!function(e){return e instanceof Promise&&!0===e._tracked}(e))return e;if(e._error)throw e._error;return e._data}class T{constructor(e,t,r){this.status=e,this.statusText=t||"",this.data=r}}function k(e){return e instanceof T}const O={state:"idle",location:void 0,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0},L={state:"idle",data:void 0,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0};function _(e){D(e.routes.length>0,"You must provide a non-empty routes array to createRouter");let t=h(e.routes),r=null,o=new Set,i=null,s=null,c=null,d=!1,u=f(t,e.history.location,e.basename),p=null;if(null==u){let{matches:e,route:r,error:a}=Y(t);u=e,p={[r.id]:a}}let m,v,g=!u.some((e=>e.route.loader))||null!=e.hydrationData,y={historyAction:e.history.action,location:e.history.location,matches:u,initialized:g,navigation:O,restoreScrollPosition:null,preventScrollReset:!1,revalidation:"idle",loaderData:e.hydrationData&&e.hydrationData.loaderData||{},actionData:e.hydrationData&&e.hydrationData.actionData||null,errors:e.hydrationData&&e.hydrationData.errors||p,fetchers:new Map},w=n.Pop,b=!1,E=!1,P=!1,A=[],R=[],M=new Map,x=0,S=-1,C=new Map,j=new Set,k=new Map,_=new Map;function B(e){y=a({},y,e),o.forEach((e=>e(y)))}function F(t,r){var o;B(a({},null!=y.actionData&&null!=y.navigation.formMethod&&"loading"===y.navigation.state&&(null==(o=y.navigation.formAction)?void 0:o.split("?")[0])===t.pathname?{}:{actionData:null},r,r.loaderData?{loaderData:H(y.loaderData,r.loaderData,r.matches||[])}:{},{historyAction:w,location:t,initialized:!0,navigation:O,revalidation:"idle",restoreScrollPosition:!y.navigation.formData&&pe(t,r.matches||y.matches),preventScrollReset:b})),E||w===n.Pop||(w===n.Push?e.history.push(t,t.state):w===n.Replace&&e.history.replace(t,t.state)),w=n.Pop,b=!1,E=!1,P=!1,A=[],R=[]}async function K(r,o,d){v&&v.abort(),v=null,w=r,E=!0===(d&&d.startUninterruptedRevalidation),function(e,t){if(i&&s&&c){let r=t.map((e=>ae(e,y.loaderData))),a=s(e,r)||e.key;i[a]=c()}}(y.location,y.matches),b=!0===(d&&d.preventScrollReset);let u=d&&d.overrideNavigation,h=f(t,o,e.basename);if(!h){let{matches:e,route:r,error:a}=Y(t);return fe(),void F(o,{matches:e,loaderData:{},errors:{[r.id]:a}})}if(m=o,(p=y.location).pathname===m.pathname&&p.search===m.search&&p.hash!==m.hash)return void F(o,{matches:h});var p,m;v=new AbortController;let g,C,T=I(o,v.signal,d&&d.submission);if(d&&d.pendingError)C={[q(h).route.id]:d.pendingError};else if(d&&d.submission){let e=await async function(e,t,r,o,i){let s;se(),B({navigation:a({state:"submitting",location:t},r)});let c=ne(o,t);if(c.route.action){if(s=await N("action",e,c),e.signal.aborted)return{shortCircuited:!0}}else s=G(t);if(Z(s)){let e=a({state:"loading",location:l(y.location,s.location)},r);return await oe(s,e,i&&i.replace),{shortCircuited:!0}}if(V(s)){let e=q(o,c.route.id);return!0!==(i&&i.replace)&&(w=n.Push),{pendingActionError:{[e.route.id]:s.error}}}if(Q(s))throw new Error("defer() is not supported in actions");return{pendingActionData:{[c.route.id]:s.data}}}(T,o,d.submission,h,{replace:d.replace});if(e.shortCircuited)return;g=e.pendingActionData,C=e.pendingActionError,u=a({state:"loading",location:o},d.submission)}let{shortCircuited:O,loaderData:L,errors:W}=await async function(e,t,r,n,o,i,s,l){let c=n;c||(c={state:"loading",location:t,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0});let[d,u]=$(y,r,o,t,P,A,R,s,l,k);if(fe((e=>!(r&&r.some((t=>t.route.id===e)))||d&&d.some((t=>t.route.id===e)))),0===d.length&&0===u.length)return F(t,{matches:r,loaderData:H(y.loaderData,{},r),errors:l||null,actionData:s||null}),{shortCircuited:!0};E||(u.forEach((e=>{let[t]=e;const r=y.fetchers.get(t);let a={state:"loading",data:r&&r.data,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0};y.fetchers.set(t,a)})),B(a({navigation:c,actionData:s||y.actionData||null},u.length>0?{fetchers:new Map(y.fetchers)}:{}))),S=++x,u.forEach((e=>{let[t]=e;return M.set(t,v)}));let{results:h,loaderResults:f,fetcherResults:p}=await ie(y.matches,d,u,e);if(e.signal.aborted)return{shortCircuited:!0};u.forEach((e=>{let[t]=e;return M.delete(t)}));let m=X(h);if(m){let e=U(y,m);return await oe(m,e,i),{shortCircuited:!0}}let{loaderData:g,errors:w}=z(y,r,d,f,l,u,p,_);return _.forEach(((e,t)=>{e.subscribe((r=>{(r||e.done)&&_.delete(t)}))})),function(){let e=[];for(let t of j){let r=y.fetchers.get(t);D(r,"Expected fetcher: "+t),"loading"===r.state&&(j.delete(t),e.push(t))}ue(e)}(),a({loaderData:g,errors:w},he(S)||u.length>0?{fetchers:new Map(y.fetchers)}:{})}(T,o,h,u,d&&d.submission,d&&d.replace,g,C);O||(v=null,F(o,{matches:h,loaderData:L,errors:W}))}function re(e){return y.fetchers.get(e)||L}async function oe(e,t,r){e.revalidate&&(P=!0),D(t.location,"Expected a location on the redirect navigation"),v=null;let a=!0===r?n.Replace:n.Push;await K(a,t.location,{overrideNavigation:t})}async function ie(e,t,r,a){let n=await Promise.all([...t.map((e=>N("loader",a,e))),...r.map((e=>{let[,t,r]=e;return N("loader",I(t,a.signal),r)}))]),o=n.slice(0,t.length),i=n.slice(t.length);return await Promise.all([ee(e,t,o,a.signal,!1,y.loaderData),ee(e,r.map((e=>{let[,,t]=e;return t})),i,a.signal,!0)]),{results:n,loaderResults:o,fetcherResults:i}}function se(){P=!0,A.push(...fe()),k.forEach(((e,t)=>{M.has(t)&&(R.push(t),de(t))}))}function le(e,t,r){let a=q(y.matches,t);ce(e),B({errors:{[a.route.id]:r},fetchers:new Map(y.fetchers)})}function ce(e){M.has(e)&&de(e),k.delete(e),C.delete(e),j.delete(e),y.fetchers.delete(e)}function de(e){let t=M.get(e);D(t,"Expected fetch controller: "+e),t.abort(),M.delete(e)}function ue(e){for(let t of e){let e={state:"idle",data:re(t).data,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0};y.fetchers.set(t,e)}}function he(e){let t=[];for(let[r,a]of C)if(a<e){let e=y.fetchers.get(r);D(e,"Expected fetcher: "+r),"loading"===e.state&&(de(r),C.delete(r),t.push(r))}return ue(t),t.length>0}function fe(e){let t=[];return _.forEach(((r,a)=>{e&&!e(a)||(r.cancel(),t.push(a),_.delete(a))})),t}function pe(e,t){if(i&&s&&c){let r=t.map((e=>ae(e,y.loaderData))),a=s(e,r)||e.key,n=i[a];if("number"==typeof n)return n}return null}return m={get basename(){return e.basename},get state(){return y},get routes(){return t},initialize:function(){return r=e.history.listen((e=>{let{action:t,location:r}=e;return K(t,r)})),y.initialized||K(n.Pop,y.location),m},subscribe:function(e){return o.add(e),()=>o.delete(e)},enableScrollRestoration:function(e,t,r){if(i=e,c=t,s=r||(e=>e.key),!d&&y.navigation===O){d=!0;let e=pe(y.location,y.matches);null!=e&&B({restoreScrollPosition:e})}return()=>{i=null,c=null,s=null}},navigate:async function(t,r){if("number"==typeof t)return void e.history.go(t);let{path:a,submission:o,error:i}=W(t,r),s=l(y.location,a,r&&r.state),c=!0===(r&&r.replace)||null!=o?n.Replace:n.Push,d=r&&"preventScrollReset"in r?!0===r.preventScrollReset:void 0;return await K(c,s,{submission:o,pendingError:i,preventScrollReset:d,replace:r&&r.replace})},fetch:function(r,n,o,i){if("undefined"==typeof AbortController)throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");M.has(r)&&de(r);let s=f(t,o,e.basename);if(!s)return void le(r,n,new T(404,"Not Found",null));let{path:c,submission:d}=W(o,i,!0),u=ne(s,c);d?async function(r,n,o,i,s){if(se(),k.delete(r),!i.route.action){let{error:e}=G(o);return void le(r,n,e)}let c=y.fetchers.get(r),d=a({state:"submitting"},s,{data:c&&c.data});y.fetchers.set(r,d),B({fetchers:new Map(y.fetchers)});let u=new AbortController,h=I(o,u.signal,s);M.set(r,u);let p=await N("action",h,i);if(h.signal.aborted)return void(M.get(r)===u&&M.delete(r));if(Z(p)){M.delete(r),j.add(r);let e=a({state:"loading"},s,{data:void 0});y.fetchers.set(r,e),B({fetchers:new Map(y.fetchers)});let t=a({state:"loading",location:l(y.location,p.location)},s);return void await oe(p,t)}if(V(p))return void le(r,n,p.error);Q(p)&&D(!1,"defer() is not supported in actions");let m=y.navigation.location||y.location,g=I(m,u.signal),b="idle"!==y.navigation.state?f(t,y.navigation.location,e.basename):y.matches;D(b,"Didn't find any matches after fetcher action");let E=++x;C.set(r,E);let T=a({state:"loading",data:p.data},s);y.fetchers.set(r,T);let[O,L]=$(y,b,s,m,P,A,R,{[i.route.id]:p.data},void 0,k);L.filter((e=>{let[t]=e;return t!==r})).forEach((e=>{let[t]=e,r=y.fetchers.get(t),a={state:"loading",data:r&&r.data,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0};y.fetchers.set(t,a),M.set(t,u)})),B({fetchers:new Map(y.fetchers)});let{results:W,loaderResults:K,fetcherResults:q}=await ie(y.matches,O,L,g);if(u.signal.aborted)return;C.delete(r),M.delete(r),L.forEach((e=>{let[t]=e;return M.delete(t)}));let Y=X(W);if(Y){let e=U(y,Y);return void await oe(Y,e)}let{loaderData:J,errors:ee}=z(y,y.matches,O,K,void 0,L,q,_),te={state:"idle",data:p.data,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0};y.fetchers.set(r,te);let re=he(E);"loading"===y.navigation.state&&E>S?(D(w,"Expected pending action"),v&&v.abort(),F(y.navigation.location,{matches:b,loaderData:J,errors:ee,fetchers:new Map(y.fetchers)})):(B(a({errors:ee,loaderData:H(y.loaderData,J,b)},re?{fetchers:new Map(y.fetchers)}:{})),P=!1)}(r,n,c,u,d):(k.set(r,[c,u]),async function(e,t,r,a){let n=y.fetchers.get(e),o={state:"loading",formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,data:n&&n.data};y.fetchers.set(e,o),B({fetchers:new Map(y.fetchers)});let i=new AbortController,s=I(r,i.signal);M.set(e,i);let l=await N("loader",s,a);if(Q(l)&&(l=await te(l,s.signal,!0)||l),M.get(e)===i&&M.delete(e),s.signal.aborted)return;if(Z(l)){let e=U(y,l);return void await oe(l,e)}if(V(l)){let r=q(y.matches,t);return y.fetchers.delete(e),void B({fetchers:new Map(y.fetchers),errors:{[r.route.id]:l.error}})}D(!Q(l),"Unhandled fetcher deferred data");let c={state:"idle",data:l.data,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0};y.fetchers.set(e,c),B({fetchers:new Map(y.fetchers)})}(r,n,c,u))},revalidate:function(){se(),B({revalidation:"loading"}),"submitting"!==y.navigation.state&&("idle"!==y.navigation.state?K(w||y.historyAction,y.navigation.location,{overrideNavigation:y.navigation}):K(y.historyAction,y.location,{startUninterruptedRevalidation:!0}))},createHref:J,getFetcher:re,deleteFetcher:ce,dispose:function(){r&&r(),o.clear(),v&&v.abort(),y.fetchers.forEach(((e,t)=>ce(t)))},_internalFetchControllers:M,_internalActiveDeferreds:_},m}function W(e,t,r){void 0===r&&(r=!1);let a="string"==typeof e?e:c(e);if(!t||!("formMethod"in t)&&!("formData"in t))return{path:a};if(null!=t.formMethod&&"get"!==t.formMethod)return{path:a,submission:{formMethod:t.formMethod,formAction:J(d(a)),formEncType:t&&t.formEncType||"application/x-www-form-urlencoded",formData:t.formData}};if(!t.formData)return{path:a};let n=d(a);try{let e=K(t.formData);r&&n.search&&re(n.search)&&e.append("index",""),n.search="?"+e}catch(e){return{path:a,error:new T(400,"Bad Request","Cannot submit binary form data using GET")}}return{path:c(n)}}function U(e,t){let{formMethod:r,formAction:a,formEncType:n,formData:o}=e.navigation;return{state:"loading",location:l(e.location,t.location),formMethod:r||void 0,formAction:a||void 0,formEncType:n||void 0,formData:o||void 0}}function $(e,t,r,a,n,o,i,s,l,c){let d=l?Object.values(l)[0]:s?Object.values(s)[0]:null,u=function(e,t){let r=e;if(t){let a=e.findIndex((e=>e.route.id===t));a>=0&&(r=e.slice(0,a))}return r}(t,l?Object.keys(l)[0]:void 0).filter(((t,i)=>null!=t.route.loader&&(function(e,t,r){let a=!t||r.route.id!==t.route.id,n=void 0===e[r.route.id];return a||n}(e.loaderData,e.matches[i],t)||o.some((e=>e===t.route.id))||F(e.location,e.matches[i],r,a,t,n,d)))),h=[];return c&&c.forEach(((e,t)=>{let[a,o]=e;(i.includes(t)||n&&F(a,o,r,a,o,n,d))&&h.push([t,a,o])})),[u,h]}function B(e,t){let r=e.route.path;return e.pathname!==t.pathname||r&&r.endsWith("*")&&e.params["*"]!==t.params["*"]}function F(e,t,r,n,o,i,s){let l=oe(e),c=t.params,d=oe(n),u=o.params,h=B(t,o)||l.toString()===d.toString()||l.search!==d.search||i;if(o.route.shouldRevalidate){let e=o.route.shouldRevalidate(a({currentUrl:l,currentParams:c,nextUrl:d,nextParams:u},r,{actionResult:s,defaultShouldRevalidate:h}));if("boolean"==typeof e)return e}return h}async function N(e,t,r,a,n){let o,i,s;void 0===a&&(a=!1),void 0===n&&(n=!1);let l=new Promise(((e,t)=>s=t)),c=()=>s();t.signal.addEventListener("abort",c);try{let a=r.route[e];D(a,"Could not find the "+e+' to run on the "'+r.route.id+'" route'),i=await Promise.race([a({request:t,params:r.params}),l])}catch(e){o=u.error,i=e}finally{t.signal.removeEventListener("abort",c)}if(i instanceof Response){let e,t=i.status,r=i.headers.get("Location");if(n)throw i;if(t>=300&&t<=399&&null!=r){if(a)throw i;return{type:u.redirect,status:t,location:r,revalidate:null!==i.headers.get("X-Remix-Revalidate")}}let s=i.headers.get("Content-Type");return e=s&&s.startsWith("application/json")?await i.json():await i.text(),o===u.error?{type:o,error:new T(t,i.statusText,e),headers:i.headers}:{type:u.data,data:e,statusCode:i.status,headers:i.headers}}return o===u.error?{type:o,error:i}:i instanceof class{constructor(e){let t;this.pendingKeys=new Set,this.subscriber=void 0,D(e&&"object"==typeof e&&!Array.isArray(e),"defer() only accepts plain objects"),this.abortPromise=new Promise(((e,r)=>t=r)),this.controller=new AbortController;let r=()=>t(new C("Deferred data aborted"));this.unlistenAbortSignal=()=>this.controller.signal.removeEventListener("abort",r),this.controller.signal.addEventListener("abort",r),this.data=Object.entries(e).reduce(((e,t)=>{let[r,a]=t;return Object.assign(e,{[r]:this.trackPromise(r,a)})}),{})}trackPromise(e,t){if(!(t instanceof Promise))return t;this.pendingKeys.add(e);let r=Promise.race([t,this.abortPromise]).then((t=>this.onSettle(r,e,null,t)),(t=>this.onSettle(r,e,t)));return r.catch((()=>{})),Object.defineProperty(r,"_tracked",{get:()=>!0}),r}onSettle(e,t,r,a){if(this.controller.signal.aborted&&r instanceof C)return this.unlistenAbortSignal(),Object.defineProperty(e,"_error",{get:()=>r}),Promise.reject(r);this.pendingKeys.delete(t),this.done&&this.unlistenAbortSignal();const n=this.subscriber;return r?(Object.defineProperty(e,"_error",{get:()=>r}),n&&n(!1),Promise.reject(r)):(Object.defineProperty(e,"_data",{get:()=>a}),n&&n(!1),a)}subscribe(e){this.subscriber=e}cancel(){this.controller.abort(),this.pendingKeys.forEach(((e,t)=>this.pendingKeys.delete(t)));let e=this.subscriber;e&&e(!0)}async resolveData(e){let t=!1;if(!this.done){let r=()=>this.cancel();e.addEventListener("abort",r),t=await new Promise((t=>{this.subscribe((a=>{e.removeEventListener("abort",r),(a||this.done)&&t(a)}))}))}return t}get done(){return 0===this.pendingKeys.size}get unwrappedData(){return D(null!==this.data&&this.done,"Can only unwrap data on initialized and settled deferreds"),Object.entries(this.data).reduce(((e,t)=>{let[r,a]=t;return Object.assign(e,{[r]:j(a)})}),{})}}?{type:u.deferred,deferredData:i}:{type:u.data,data:i}}function I(e,t,r){let a=oe(e).toString(),n={signal:t};if(r){let{formMethod:e,formEncType:t,formData:a}=r;n.method=e.toUpperCase(),n.body="application/x-www-form-urlencoded"===t?K(a):a}return new Request(a,n)}function K(e){let t=new URLSearchParams;for(let[r,a]of e.entries())D("string"==typeof a,'File inputs are not supported with encType "application/x-www-form-urlencoded", please use "multipart/form-data" instead.'),t.append(r,a);return t}function z(e,t,r,n,o,i,s,l){let{loaderData:c,errors:d}=function(e,t,r,a,n){let o,i={},s=null,l=!1,c={};return r.forEach(((r,d)=>{let u=t[d].route.id;if(D(!Z(r),"Cannot handle redirect results in processLoaderData"),V(r)){let t=q(e,u),n=r.error;a&&(n=Object.values(a)[0],a=void 0),s=Object.assign(s||{},{[t.route.id]:n}),l||(l=!0,o=k(r.error)?r.error.status:500),r.headers&&(c[u]=r.headers)}else Q(r)?(n&&n.set(u,r.deferredData),i[u]=r.deferredData.data):(i[u]=r.data,null==r.statusCode||200===r.statusCode||l||(o=r.statusCode),r.headers&&(c[u]=r.headers))})),a&&(s=a),{loaderData:i,errors:s,statusCode:o||200,loaderHeaders:c}}(t,r,n,o,l);for(let t=0;t<i.length;t++){let[r,,n]=i[t];D(void 0!==s&&void 0!==s[t],"Did not find corresponding fetcher result");let o=s[t];if(V(o)){let t=q(e.matches,n.route.id);d&&d[t.route.id]||(d=a({},d,{[t.route.id]:o.error})),e.fetchers.delete(r)}else{if(Z(o))throw new Error("Unhandled fetcher revalidation redirect");if(Q(o))throw new Error("Unhandled fetcher deferred data");{let t={state:"idle",data:o.data,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0};e.fetchers.set(r,t)}}}return{loaderData:c,errors:d}}function H(e,t,r){let n=a({},t);return r.forEach((r=>{let a=r.route.id;void 0===t[a]&&void 0!==e[a]&&(n[a]=e[a])})),n}function q(e,t){return(t?e.slice(0,e.findIndex((e=>e.route.id===t))+1):[...e]).reverse().find((e=>!0===e.route.hasErrorBoundary))||e[0]}function Y(e){let t=e.find((e=>e.index||""===e.path||"/"===e.path))||{id:"__shim-404-route__"};return{matches:[{params:{},pathname:"",pathnameBase:"",route:t}],route:t,error:new T(404,"Not Found",null)}}function G(e){let t="string"==typeof e?e:J(e);return console.warn("You're trying to submit to a route that does not have an action.  To fix this, please add an `action` function to the route for ["+t+"]"),{type:u.error,error:new T(405,"Method Not Allowed","No action found for ["+t+"]")}}function X(e){for(let t=e.length-1;t>=0;t--){let r=e[t];if(Z(r))return r}}function J(e){return(e.pathname||"")+(e.search||"")}function Q(e){return e.type===u.deferred}function V(e){return e.type===u.error}function Z(e){return(e&&e.type)===u.redirect}async function ee(e,t,r,a,n,o){for(let i=0;i<r.length;i++){let s=r[i],l=t[i],c=e.find((e=>e.route.id===l.route.id)),d=null!=c&&!B(c,l)&&void 0!==(o&&o[l.route.id]);Q(s)&&(n||d)&&await te(s,a,n).then((e=>{e&&(r[i]=e||r[i])}))}}async function te(e,t,r){if(void 0===r&&(r=!1),!await e.deferredData.resolveData(t)){if(r)try{return{type:u.data,data:e.deferredData.unwrappedData}}catch(e){return{type:u.error,error:e}}return{type:u.data,data:e.deferredData.data}}}function re(e){return new URLSearchParams(e).getAll("index").some((e=>""===e))}function ae(e,t){let{route:r,pathname:a,params:n}=e;return{id:r.id,pathname:a,params:n,data:t[r.id],handle:r.handle}}function ne(e,t){let r="string"==typeof t?d(t).search:t.search;return e[e.length-1].route.index&&!re(r||"")?e.slice(-2)[0]:e.slice(-1)[0]}function oe(e){let t="undefined"!=typeof window&&void 0!==window.location?window.location.origin:"unknown://unknown",r="string"==typeof e?e:J(e);return new URL(r,t)}}}]);