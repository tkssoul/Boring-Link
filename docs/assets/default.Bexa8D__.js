import{d as e,K as a,L as s,M as t,r as l,c as i,o,b as r,a as n,N as c,w as d,F as u,j as p,h as m,O as f,P as w,Q as v,u as h,v as g,t as y,R as b,S as k,i as _,H as x,T as L,U as j,W as O,X as R,f as U}from"./vue-vendor.CUPoc9m_.js";import{a as C}from"./page-index.vue_vue_type_script_setup_true_lang.ts.kWT3FGQf.js";import{g as W}from"./gsap-vendor.CKvSo_C2.js";const E={class:"nav-container"},H={class:"icon-wrapper position-fixed d-flex align-center justify-center"},I=C(e({__name:"AppHeader",setup(e){const k=[{label:"首页",link:"/"},{label:"博客",link:"/my-works"},{label:"技能",link:"/my-skills"},{label:"项目",link:"/my-awards"}],_=a(),x=s(),L=t((()=>x.path)),j=l(!1),O=()=>{window.scrollTo({top:0,behavior:"smooth"})};return(e,a)=>(o(),i("div",E,[r("div",H,[(o(),i("svg",{width:"50",height:"50",xmlns:"http://www.w3.org/2000/svg",class:"svg-icon position-absolute",onClick:O},a[0]||(a[0]=[r("text",{x:"50%",y:"50%","dominant-baseline":"central","text-anchor":"middle","font-family":"Helvetica, Arial, sans-serif","font-size":"24","font-weight":"bold",fill:"white"}," BL ",-1)])))]),n(c,{"bg-color":"rgba(0,0,0,0)"},{default:d((()=>[(o(),i(u,null,p(k,((e,a)=>r("div",null,[n(w,{href:e.link,color:"grey","active-color":"#fff",active:h(L)===e.link,onClick:v((a=>(async e=>{if(L.value!==e&&!j.value)try{j.value=!0,await _.push(e)}catch(a){}finally{j.value=!1}})(e.link)),["prevent"])},{default:d((()=>[g(y(e.label),1)])),_:2},1032,["href","active","onClick"]),a!==k.length-1?(o(),m(b,{key:0,divider:"/",color:"grey"})):f("",!0)]))),64))])),_:1})]))}}),[["__scopeId","data-v-0eb645f2"]]),z={class:"background-container"},A={key:0,preload:"auto",autoplay:"",muted:"",loop:"",height:"100%",width:"100%"},T=["src"],$={class:"page-wrapper fill-height"},B=C(e({__name:"default",setup(e){const a=s(),t={"/":{src:new URL("/images/kgc67-6sgw2.mp4",import.meta.url).href},"/my-works":{src:new URL("/images/lamborghini.webp",import.meta.url).href},"/my-skills":{src:new URL("/images/bugatti-chiron.webp",import.meta.url).href},"/my-awards":{src:new URL("/images/apple-logo.webp",import.meta.url).href}},l=["/","/my-works","/my-skills","/my-awards"];k((()=>a.path),(e=>{const a=l.indexOf(e);W.to(".background-item",{x:`-${100*a}%`,duration:.8,ease:"power1.inOut"})}));const c=e=>{W.to(e,{duration:.8,opacity:0,ease:"power1.inOut"})},f=e=>{W.set(e,{opacity:0,x:"0%"}),W.to(e,{opacity:1,x:"0%",duration:1,ease:"power1.in"})};return _((()=>{W.set(".background-item",{x:`-${100*l.indexOf(a.path)}%`}),Object.values(t).forEach((e=>{if(e.src.endsWith(".webp"))(new Image).src=e.src;else if(e.src.endsWith(".mp4")){const a=document.createElement("video");a.src=e.src,a.preload="auto",a.load()}}))})),(e,a)=>{const s=I,w=x("router-view");return o(),i(u,null,[n(s),r("div",z,[(o(),i(u,null,p(l,((e,a)=>r("div",{key:a,class:"background-item"},[t[e].src.endsWith(".mp4")?(o(),i("video",A,[r("source",{src:t[e].src,type:"video/mp4"},null,8,T)])):(o(),m(U,{key:1,preload:"",src:t[e].src,"lazy-src":"/images/windows-11.webp",cover:"",height:"100%",width:"100%",alt:"背景图片"},null,8,["src"]))]))),64))]),n(R,null,{default:d((()=>[n(w,null,{default:d((({Component:e})=>[(o(),m(O,null,[r("div",$,[n(L,{onEnter:f,onLeave:c,mode:"out-in"},{default:d((()=>[r("div",null,[(o(),m(j(e)))])])),_:2},1024)])],1024))])),_:1})])),_:1})],64)}}}),[["__scopeId","data-v-9f64ac7d"]]);export{B as default};
