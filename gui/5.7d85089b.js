"use strict";(self.webpackChunkshxd_client_ui=self.webpackChunkshxd_client_ui||[]).push([[5],{3394:(e,t,n)=>{n.d(t,{Z:()=>h});var r=function(){function e(e){var t=this;this._insertTag=function(e){var n;n=0===t.tags.length?t.insertionPoint?t.insertionPoint.nextSibling:t.prepend?t.container.firstChild:t.before:t.tags[t.tags.length-1].nextSibling,t.container.insertBefore(e,n),t.tags.push(e)},this.isSpeedy=void 0===e.speedy||e.speedy,this.tags=[],this.ctr=0,this.nonce=e.nonce,this.key=e.key,this.container=e.container,this.prepend=e.prepend,this.insertionPoint=e.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(e){e.forEach(this._insertTag)},t.insert=function(e){this.ctr%(this.isSpeedy?65e3:1)==0&&this._insertTag(function(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),void 0!==e.nonce&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}(this));var t=this.tags[this.tags.length-1];if(this.isSpeedy){var n=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}(t);try{n.insertRule(e,n.cssRules.length)}catch(e){}}else t.appendChild(document.createTextNode(e));this.ctr++},t.flush=function(){this.tags.forEach((function(e){return e.parentNode&&e.parentNode.removeChild(e)})),this.tags=[],this.ctr=0},e}(),i=n(6411),o=n(6686),a=n(9685),s=n(211),l=n(2190),c=function(e,t,n){for(var r=0,o=0;r=o,o=(0,i.fj)(),38===r&&12===o&&(t[n]=1),!(0,i.r)(o);)(0,i.lp)();return(0,i.tP)(e,i.FK)},u=new WeakMap,d=function(e){if("rule"===e.type&&e.parent&&!(e.length<1)){for(var t=e.value,n=e.parent,r=e.column===n.column&&e.line===n.line;"rule"!==n.type;)if(!(n=n.parent))return;if((1!==e.props.length||58===t.charCodeAt(0)||u.get(n))&&!r){u.set(e,!0);for(var a=[],s=function(e,t){return(0,i.cE)(function(e,t){var n=-1,r=44;do{switch((0,i.r)(r)){case 0:38===r&&12===(0,i.fj)()&&(t[n]=1),e[n]+=c(i.FK-1,t,n);break;case 2:e[n]+=(0,i.iF)(r);break;case 4:if(44===r){e[++n]=58===(0,i.fj)()?"&\f":"",t[n]=e[n].length;break}default:e[n]+=(0,o.Dp)(r)}}while(r=(0,i.lp)());return e}((0,i.un)(e),t))}(t,a),l=n.props,d=0,f=0;d<s.length;d++)for(var p=0;p<l.length;p++,f++)e.props[f]=a[d]?s[d].replace(/&\f/g,l[p]):l[p]+" "+s[d]}}},f=function(e){if("decl"===e.type){var t=e.value;108===t.charCodeAt(0)&&98===t.charCodeAt(2)&&(e.return="",e.value="")}},p=[a.Ji];const h=function(e){var t=e.key;if("css"===t){var n=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(n,(function(e){-1!==e.getAttribute("data-emotion").indexOf(" ")&&(document.head.appendChild(e),e.setAttribute("data-s",""))}))}var i,o,c=e.stylisPlugins||p,u={},h=[];i=e.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+t+' "]'),(function(e){for(var t=e.getAttribute("data-emotion").split(" "),n=1;n<t.length;n++)u[t[n]]=!0;h.push(e)}));var m,g=[d,f],y=[s.P,(0,a.cD)((function(e){m.insert(e)}))],v=(0,a.qR)(g.concat(c,y));o=function(e,t,n,r){var i;m=n,i=e?e+"{"+t.styles+"}":t.styles,(0,s.q)((0,l.MY)(i),v),r&&(b.inserted[t.name]=!0)};var b={key:t,sheet:new r({key:t,container:i,nonce:e.nonce,speedy:e.speedy,prepend:e.prepend,insertionPoint:e.insertionPoint}),nonce:e.nonce,inserted:u,registered:{},insert:o};return b.sheet.hydrate(h),b}},5042:(e,t,n)=>{n.d(t,{Z:()=>r});const r=function(e){var t=Object.create(null);return function(n){return void 0===t[n]&&(t[n]=e(n)),t[n]}}},2443:(e,t,n)=>{n.d(t,{T:()=>s,w:()=>a});var r=n(7294),i=n(3394),o=(n(6797),n(7278),(0,r.createContext)("undefined"!=typeof HTMLElement?(0,i.Z)({key:"css"}):null));o.Provider;var a=function(e){return(0,r.forwardRef)((function(t,n){var i=(0,r.useContext)(o);return e(t,i,n)}))},s=(0,r.createContext)({})},917:(e,t,n)=>{n.d(t,{F4:()=>u,iv:()=>c,xB:()=>l});var r=n(7294),i=(n(3394),n(2443)),o=(n(8679),n(444)),a=n(6797),s=n(7278),l=(0,i.w)((function(e,t){var n=e.styles,l=(0,a.O)([n],void 0,(0,r.useContext)(i.T)),c=(0,r.useRef)();return(0,s.j)((function(){var e=t.key+"-global",n=new t.sheet.constructor({key:e,nonce:t.sheet.nonce,container:t.sheet.container,speedy:t.sheet.isSpeedy}),r=!1,i=document.querySelector('style[data-emotion="'+e+" "+l.name+'"]');return t.sheet.tags.length&&(n.before=t.sheet.tags[0]),null!==i&&(r=!0,i.setAttribute("data-emotion",e),n.hydrate([i])),c.current=[n,r],function(){n.flush()}}),[t]),(0,s.j)((function(){var e=c.current,n=e[0];if(e[1])e[1]=!1;else{if(void 0!==l.next&&(0,o.My)(t,l.next,!0),n.tags.length){var r=n.tags[n.tags.length-1].nextElementSibling;n.before=r,n.flush()}t.insert("",l,n,!1)}}),[t,l.name]),null}));function c(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return(0,a.O)(t)}var u=function(){var e=c.apply(void 0,arguments),t="animation-"+e.name;return{name:t,styles:"@keyframes "+t+"{"+e.styles+"}",anim:1,toString:function(){return"_EMO_"+this.name+"_"+this.styles+"_EMO_"}}}},6797:(e,t,n)=>{n.d(t,{O:()=>m});const r=function(e){for(var t,n=0,r=0,i=e.length;i>=4;++r,i-=4)t=1540483477*(65535&(t=255&e.charCodeAt(r)|(255&e.charCodeAt(++r))<<8|(255&e.charCodeAt(++r))<<16|(255&e.charCodeAt(++r))<<24))+(59797*(t>>>16)<<16),n=1540483477*(65535&(t^=t>>>24))+(59797*(t>>>16)<<16)^1540483477*(65535&n)+(59797*(n>>>16)<<16);switch(i){case 3:n^=(255&e.charCodeAt(r+2))<<16;case 2:n^=(255&e.charCodeAt(r+1))<<8;case 1:n=1540483477*(65535&(n^=255&e.charCodeAt(r)))+(59797*(n>>>16)<<16)}return(((n=1540483477*(65535&(n^=n>>>13))+(59797*(n>>>16)<<16))^n>>>15)>>>0).toString(36)},i={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};var o=n(5042),a=/[A-Z]|^ms/g,s=/_EMO_([^_]+?)_([^]*?)_EMO_/g,l=function(e){return 45===e.charCodeAt(1)},c=function(e){return null!=e&&"boolean"!=typeof e},u=(0,o.Z)((function(e){return l(e)?e:e.replace(a,"-$&").toLowerCase()})),d=function(e,t){switch(e){case"animation":case"animationName":if("string"==typeof t)return t.replace(s,(function(e,t,n){return p={name:t,styles:n,next:p},t}))}return 1===i[e]||l(e)||"number"!=typeof t||0===t?t:t+"px"};function f(e,t,n){if(null==n)return"";if(void 0!==n.__emotion_styles)return n;switch(typeof n){case"boolean":return"";case"object":if(1===n.anim)return p={name:n.name,styles:n.styles,next:p},n.name;if(void 0!==n.styles){var r=n.next;if(void 0!==r)for(;void 0!==r;)p={name:r.name,styles:r.styles,next:p},r=r.next;return n.styles+";"}return function(e,t,n){var r="";if(Array.isArray(n))for(var i=0;i<n.length;i++)r+=f(e,t,n[i])+";";else for(var o in n){var a=n[o];if("object"!=typeof a)null!=t&&void 0!==t[a]?r+=o+"{"+t[a]+"}":c(a)&&(r+=u(o)+":"+d(o,a)+";");else if(!Array.isArray(a)||"string"!=typeof a[0]||null!=t&&void 0!==t[a[0]]){var s=f(e,t,a);switch(o){case"animation":case"animationName":r+=u(o)+":"+s+";";break;default:r+=o+"{"+s+"}"}}else for(var l=0;l<a.length;l++)c(a[l])&&(r+=u(o)+":"+d(o,a[l])+";")}return r}(e,t,n);case"function":if(void 0!==e){var i=p,o=n(e);return p=i,f(e,t,o)}}if(null==t)return n;var a=t[n];return void 0!==a?a:n}var p,h=/label:\s*([^\s;\n{]+)\s*(;|$)/g,m=function(e,t,n){if(1===e.length&&"object"==typeof e[0]&&null!==e[0]&&void 0!==e[0].styles)return e[0];var i=!0,o="";p=void 0;var a=e[0];null==a||void 0===a.raw?(i=!1,o+=f(n,t,a)):o+=a[0];for(var s=1;s<e.length;s++)o+=f(n,t,e[s]),i&&(o+=a[s]);h.lastIndex=0;for(var l,c="";null!==(l=h.exec(o));)c+="-"+l[1];return{name:r(o)+c,styles:o,next:p}}},932:(e,t,n)=>{n.d(t,{Z:()=>v});var r=n(7294),i=n(7462),o=n(5042),a=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;const s=(0,o.Z)((function(e){return a.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&e.charCodeAt(2)<91}));var l=n(2443),c=n(444),u=n(6797),d=n(7278),f=s,p=function(e){return"theme"!==e},h=function(e){return"string"==typeof e&&e.charCodeAt(0)>96?f:p},m=function(e,t,n){var r;if(t){var i=t.shouldForwardProp;r=e.__emotion_forwardProp&&i?function(t){return e.__emotion_forwardProp(t)&&i(t)}:i}return"function"!=typeof r&&n&&(r=e.__emotion_forwardProp),r},g=function(e){var t=e.cache,n=e.serialized,r=e.isStringTag;return(0,c.hC)(t,n,r),(0,d.L)((function(){return(0,c.My)(t,n,r)})),null};var y=function e(t,n){var o,a,s=t.__emotion_real===t,d=s&&t.__emotion_base||t;void 0!==n&&(o=n.label,a=n.target);var f=m(t,n,s),p=f||h(d),y=!p("as");return function(){var v=arguments,b=s&&void 0!==t.__emotion_styles?t.__emotion_styles.slice(0):[];if(void 0!==o&&b.push("label:"+o+";"),null==v[0]||void 0===v[0].raw)b.push.apply(b,v);else{b.push(v[0][0]);for(var x=v.length,k=1;k<x;k++)b.push(v[k],v[0][k])}var w=(0,l.w)((function(e,t,n){var i=y&&e.as||d,o="",s=[],m=e;if(null==e.theme){for(var v in m={},e)m[v]=e[v];m.theme=(0,r.useContext)(l.T)}"string"==typeof e.className?o=(0,c.fp)(t.registered,s,e.className):null!=e.className&&(o=e.className+" ");var x=(0,u.O)(b.concat(s),t.registered,m);o+=t.key+"-"+x.name,void 0!==a&&(o+=" "+a);var k=y&&void 0===f?h(i):p,w={};for(var A in e)y&&"as"===A||k(A)&&(w[A]=e[A]);return w.className=o,w.ref=n,(0,r.createElement)(r.Fragment,null,(0,r.createElement)(g,{cache:t,serialized:x,isStringTag:"string"==typeof i}),(0,r.createElement)(i,w))}));return w.displayName=void 0!==o?o:"Styled("+("string"==typeof d?d:d.displayName||d.name||"Component")+")",w.defaultProps=t.defaultProps,w.__emotion_real=w,w.__emotion_base=d,w.__emotion_styles=b,w.__emotion_forwardProp=f,Object.defineProperty(w,"toString",{value:function(){return"."+a}}),w.withComponent=function(t,r){return e(t,(0,i.Z)({},n,r,{shouldForwardProp:m(w,r,!0)})).apply(void 0,b)},w}}.bind();["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"].forEach((function(e){y[e]=y(e)}));const v=y},7278:(e,t,n)=>{var r;n.d(t,{L:()=>a,j:()=>s});var i=n(7294),o=!!(r||(r=n.t(i,2))).useInsertionEffect&&(r||(r=n.t(i,2))).useInsertionEffect,a=o||function(e){return e()},s=o||i.useLayoutEffect},444:(e,t,n)=>{function r(e,t,n){var r="";return n.split(" ").forEach((function(n){void 0!==e[n]?t.push(e[n]+";"):r+=n+" "})),r}n.d(t,{My:()=>o,fp:()=>r,hC:()=>i});var i=function(e,t,n){var r=e.key+"-"+t.name;!1===n&&void 0===e.registered[r]&&(e.registered[r]=t.styles)},o=function(e,t,n){i(e,t,n);var r=e.key+"-"+t.name;if(void 0===e.inserted[t.name]){var o=t;do{e.insert(t===o?"."+r:"",o,e.sheet,!0),o=o.next}while(void 0!==o)}}},3470:(e,t,n)=>{n.d(t,{Z:()=>u});var r=n(7294),i=n(67),o=n(7094),a=n(5893);const s=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function l(e){const t=[],n=[];return Array.from(e.querySelectorAll(s)).forEach(((e,r)=>{const i=function(e){const t=parseInt(e.getAttribute("tabindex"),10);return Number.isNaN(t)?"true"===e.contentEditable||("AUDIO"===e.nodeName||"VIDEO"===e.nodeName||"DETAILS"===e.nodeName)&&null===e.getAttribute("tabindex")?0:e.tabIndex:t}(e);-1!==i&&function(e){return!(e.disabled||"INPUT"===e.tagName&&"hidden"===e.type||function(e){if("INPUT"!==e.tagName||"radio"!==e.type)return!1;if(!e.name)return!1;const t=t=>e.ownerDocument.querySelector(`input[type="radio"]${t}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}(e))}(e)&&(0===i?t.push(e):n.push({documentOrder:r,tabIndex:i,node:e}))})),n.sort(((e,t)=>e.tabIndex===t.tabIndex?e.documentOrder-t.documentOrder:e.tabIndex-t.tabIndex)).map((e=>e.node)).concat(t)}function c(){return!0}const u=function(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:s=!1,disableRestoreFocus:u=!1,getTabbable:d=l,isEnabled:f=c,open:p}=e,h=r.useRef(),m=r.useRef(null),g=r.useRef(null),y=r.useRef(null),v=r.useRef(null),b=r.useRef(!1),x=r.useRef(null),k=(0,i.Z)(t.ref,x),w=r.useRef(null);r.useEffect((()=>{p&&x.current&&(b.current=!n)}),[n,p]),r.useEffect((()=>{if(!p||!x.current)return;const e=(0,o.Z)(x.current);return x.current.contains(e.activeElement)||(x.current.hasAttribute("tabIndex")||x.current.setAttribute("tabIndex",-1),b.current&&x.current.focus()),()=>{u||(y.current&&y.current.focus&&(h.current=!0,y.current.focus()),y.current=null)}}),[p]),r.useEffect((()=>{if(!p||!x.current)return;const e=(0,o.Z)(x.current),t=t=>{const{current:n}=x;if(null!==n)if(e.hasFocus()&&!s&&f()&&!h.current){if(!n.contains(e.activeElement)){if(t&&v.current!==t.target||e.activeElement!==v.current)v.current=null;else if(null!==v.current)return;if(!b.current)return;let o=[];if(e.activeElement!==m.current&&e.activeElement!==g.current||(o=d(x.current)),o.length>0){var r,i;const e=Boolean((null==(r=w.current)?void 0:r.shiftKey)&&"Tab"===(null==(i=w.current)?void 0:i.key)),t=o[0],n=o[o.length-1];e?n.focus():t.focus()}else n.focus()}}else h.current=!1},n=t=>{w.current=t,!s&&f()&&"Tab"===t.key&&e.activeElement===x.current&&t.shiftKey&&(h.current=!0,g.current.focus())};e.addEventListener("focusin",t),e.addEventListener("keydown",n,!0);const r=setInterval((()=>{"BODY"===e.activeElement.tagName&&t()}),50);return()=>{clearInterval(r),e.removeEventListener("focusin",t),e.removeEventListener("keydown",n,!0)}}),[n,s,u,f,p,d]);const A=e=>{null===y.current&&(y.current=e.relatedTarget),b.current=!0};return(0,a.jsxs)(r.Fragment,{children:[(0,a.jsx)("div",{tabIndex:p?0:-1,onFocus:A,ref:m,"data-testid":"sentinelStart"}),r.cloneElement(t,{ref:k,onFocus:e=>{null===y.current&&(y.current=e.relatedTarget),b.current=!0,v.current=e.target;const n=t.props.onFocus;n&&n(e)}}),(0,a.jsx)("div",{tabIndex:p?0:-1,onFocus:A,ref:g,"data-testid":"sentinelEnd"})]})}}}]);