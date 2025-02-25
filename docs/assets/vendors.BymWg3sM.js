import{B as t,r as o,C as n}from"./vue-vendor.CUPoc9m_.js";
/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const r=Symbol();var e,c;function a(){const e=t(!0),c=e.run((()=>o({})));let a=[],s=[];const p=n({install(t){p._a=t,t.provide(r,p),t.config.globalProperties.$pinia=p,s.forEach((t=>a.push(t))),s=[]},use(t){return this._a?a.push(t):s.push(t),this},_p:a,_a:null,_e:e,_s:new Map,state:c});return p}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */(c=e||(e={})).direct="direct",c.patchObject="patch object",c.patchFunction="patch function";var s=function(t,o){return s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n])},s(t,o)};function p(t,o){if("function"!=typeof o&&null!==o)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function n(){this.constructor=t}s(t,o),t.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}export{p as _,a as c};
