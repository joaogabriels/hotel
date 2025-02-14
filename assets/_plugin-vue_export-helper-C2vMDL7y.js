import{r as V,d as _,u as v,c as L,g as O,o as p,F as H,v as S,h as q,y as g,w as T}from"./index-B-7LGyZt.js";import{g as x,i as D}from"./dom-BrMPddGW.js";function F(){const e=V(!_.value);return e.value===!1&&v(()=>{e.value=!0}),{isHydrated:e}}const P=typeof ResizeObserver<"u",E=P===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"},$=L({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:o}){let t=null,n,i={width:-1,height:-1};function s(l){l===!0||e.debounce===0||e.debounce==="0"?r():t===null&&(t=setTimeout(r,e.debounce))}function r(){if(t!==null&&(clearTimeout(t),t=null),n){const{offsetWidth:l,offsetHeight:c}=n;(l!==i.width||c!==i.height)&&(i={width:l,height:c},o("resize",i))}}const{proxy:a}=O();if(a.trigger=s,P===!0){let l;const c=f=>{n=a.$el.parentNode,n?(l=new ResizeObserver(s),l.observe(n),r()):f!==!0&&S(()=>{c(!0)})};return v(()=>{c()}),p(()=>{t!==null&&clearTimeout(t),l!==void 0&&(l.disconnect!==void 0?l.disconnect():n&&l.unobserve(n))}),H}else{let l=function(){t!==null&&(clearTimeout(t),t=null),u!==void 0&&(u.removeEventListener!==void 0&&u.removeEventListener("resize",s,g.passive),u=void 0)},c=function(){l(),n&&n.contentDocument&&(u=n.contentDocument.defaultView,u.addEventListener("resize",s,g.passive),r())};const{isHydrated:f}=F();let u;return v(()=>{S(()=>{n=a.$el,n&&c()})}),p(l),()=>{if(f.value===!0)return q("object",{class:"q--avoid-card-border",style:E.style,tabindex:-1,type:"text/html",data:E.url,"aria-hidden":"true",onLoad:c})}}}}),Q=[Element,String],R=[null,document,document.body,document.scrollingElement,document.documentElement];function k(e,o){let t=D(o);if(t===void 0){if(e==null)return window;t=e.closest(".scroll,.scroll-y,.overflow-auto")}return R.includes(t)?window:t}function j(e){return(e===window?document.body:e).scrollHeight}function C(e){return e===window?window.pageYOffset||window.scrollY||document.body.scrollTop||0:e.scrollTop}function M(e){return e===window?window.pageXOffset||window.scrollX||document.body.scrollLeft||0:e.scrollLeft}function N(e,o,t=0){const n=arguments[3]===void 0?performance.now():arguments[3],i=C(e);if(t<=0){i!==o&&h(e,o);return}requestAnimationFrame(s=>{const r=s-n,a=i+(o-i)/Math.max(r,t)*r;h(e,a),a!==o&&N(e,o,t-r,s)})}function W(e,o,t=0){const n=arguments[3]===void 0?performance.now():arguments[3],i=M(e);if(t<=0){i!==o&&b(e,o);return}requestAnimationFrame(s=>{const r=s-n,a=i+(o-i)/Math.max(r,t)*r;b(e,a),a!==o&&W(e,o,t-r,s)})}function h(e,o){if(e===window){window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,o);return}e.scrollTop=o}function b(e,o){if(e===window){window.scrollTo(o,window.pageYOffset||window.scrollY||document.body.scrollTop||0);return}e.scrollLeft=o}function B(e,o,t){if(t){N(e,o,t);return}h(e,o)}function I(e,o,t){if(t){W(e,o,t);return}b(e,o)}let w;function U(){if(w!==void 0)return w;const e=document.createElement("p"),o=document.createElement("div");x(e,{width:"100%",height:"200px"}),x(o,{position:"absolute",top:"0px",left:"0px",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),o.appendChild(e),document.body.appendChild(o);const t=e.offsetWidth;o.style.overflow="scroll";let n=e.offsetWidth;return t===n&&(n=o.clientWidth),o.remove(),w=t-n,w}function G(e,o=!0){return!e||e.nodeType!==Node.ELEMENT_NODE?!1:o?e.scrollHeight>e.clientHeight&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-y"])):e.scrollWidth>e.clientWidth&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-x"]))}const{passive:z}=g,A=["both","horizontal","vertical"],J=L({name:"QScrollObserver",props:{axis:{type:String,validator:e=>A.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:Q},emits:["scroll"],setup(e,{emit:o}){const t={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let n=null,i,s;T(()=>e.scrollTarget,()=>{l(),a()});function r(){n!==null&&n();const u=Math.max(0,C(i)),m=M(i),d={top:u-t.position.top,left:m-t.position.left};if(e.axis==="vertical"&&d.top===0||e.axis==="horizontal"&&d.left===0)return;const y=Math.abs(d.top)>=Math.abs(d.left)?d.top<0?"up":"down":d.left<0?"left":"right";t.position={top:u,left:m},t.directionChanged=t.direction!==y,t.delta=d,t.directionChanged===!0&&(t.direction=y,t.inflectionPoint=t.position),o("scroll",{...t})}function a(){i=k(s,e.scrollTarget),i.addEventListener("scroll",c,z),c(!0)}function l(){i!==void 0&&(i.removeEventListener("scroll",c,z),i=void 0)}function c(u){if(u===!0||e.debounce===0||e.debounce==="0")r();else if(n===null){const[m,d]=e.debounce?[setTimeout(r,e.debounce),clearTimeout]:[requestAnimationFrame(r),cancelAnimationFrame];n=()=>{d(m),n=null}}}const{proxy:f}=O();return T(()=>f.$q.lang.rtl,r),v(()=>{s=f.$el.parentNode,a()}),p(()=>{n!==null&&n(),l()}),Object.assign(f,{trigger:c,getPosition:()=>t}),H}}),K=(e,o)=>{const t=e.__vccOpts||e;for(const[n,i]of o)t[n]=i;return t};export{$ as Q,K as _,J as a,M as b,C as c,I as d,Q as e,k as f,U as g,G as h,j as i,B as s};
