import{h as c,M as f,a3 as a}from"./index-DHxvZY7W.js";function s(n,t){return n!==void 0&&n()||t}function h(n,t){if(n!==void 0){const i=n();if(i!=null)return i.slice()}return t}function v(n,t){return n!==void 0?t.concat(n()):t}function g(n,t){return n===void 0?t:t!==void 0?t.concat(n()):n()}function l(n,t,i,e,r,u){t.key=e+r;const o=c(n,t,i);return r===!0?f(o,u()):o}function S(n){return n===window?window.innerHeight:n.getBoundingClientRect().height}function y(n,t){const i=n.style;for(const e in t)i[e]=t[e]}function m(n){if(n==null)return;if(typeof n=="string")try{return document.querySelector(n)||void 0}catch{return}const t=a(n);if(t)return t.$el||t}function p(n,t){if(n==null||n.contains(t)===!0)return!0;for(let i=n.nextElementSibling;i!==null;i=i.nextElementSibling)if(i.contains(t))return!0;return!1}export{h as a,v as b,l as c,g as d,p as e,S as f,y as g,s as h,m as i};
