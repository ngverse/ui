import{a as N,b as I}from"./chunk-ABSCH6FC.js";import{a as _,b as R,c as P,d as M}from"./chunk-AU7E6JWS.js";import{a as S,b as k,j as D,k as L}from"./chunk-4OF5TJLW.js";import{p as O}from"./chunk-AC2A7OJH.js";import{C,Gb as l,Ha as m,Ib as g,Ob as r,Pb as s,Qb as a,eb as o,fa as w,gc as u,ic as f,sc as v,ub as c}from"./chunk-4E37DFQL.js";import"./chunk-HZ6M6AS2.js";var j=n=>[n],p=N(),d=class n{router=w(P);prevRoute=m(void 0);nextRoute=m(void 0);ArrowLeft=S;ArrowRight=k;constructor(){this.router.events.pipe(C(i=>i instanceof _)).subscribe(()=>{let i=this.router.url,e=p.findIndex(t=>t.url===i);this.prevRoute.set(void 0),this.nextRoute.set(void 0),e!==-1&&(e!==0&&this.prevRoute.set(p[e-1]),e!==p.length-1&&this.nextRoute.set(p[e+1]))})}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=c({type:n,selectors:[["doc-doc-sibling-navigations"]],decls:7,vars:14,consts:[[1,"flex","gap-2.5","px-2","pt-20","lg:gap-6"],["appButton","","size","none","color","secondary","variant","outline",1,"sibling-navigation",3,"routerLink"],["name","arrow-left",1,"w-5","lg:w-[24px]",3,"stretch"],["appButton","","size","none","color","secondary","variant","outline",1,"sibling-navigation","ml-auto","lg:justify-end",3,"routerLink"],["name","arrow-right",1,"w-5","lg:w-[24px]",3,"stretch"]],template:function(e,t){if(e&1&&(r(0,"div",0)(1,"button",1),a(2,"app-icon",2),u(3),s(),r(4,"button",3),u(5),a(6,"app-icon",4),s()()),e&2){let h,b,x,y;o(),g("invisible",!t.prevRoute()),l("routerLink",v(10,j,(h=t.prevRoute())==null?null:h.url)),o(),l("stretch",!0),o(),f(" ",(b=t.prevRoute())==null?null:b.name," "),o(),g("invisible",!t.nextRoute()),l("routerLink",v(12,j,(x=t.nextRoute())==null?null:x.url)),o(),f(" ",(y=t.nextRoute())==null?null:y.name," "),o(),l("stretch",!0)}},dependencies:[M,D,L,O],styles:[`@layer theme{[_ngcontent-%COMP%]:root, [_nghost-%COMP%]{--color-amber-500: oklch(.769 .188 70.08);--color-blue-500: oklch(.623 .214 259.815);--spacing: .25rem;--text-sm: .875rem;--text-sm--line-height: calc(1.25 / .875);--text-base: 1rem;--text-base--line-height: 1.5 ;--radius-md: .375rem}}.sibling-navigation[_ngcontent-%COMP%]{display:flex;height:calc(var(--spacing) * 12);flex:1;align-items:center;justify-content:center;gap:calc(var(--spacing) * 2);border-radius:var(--radius-md);border-style:var(--tw-border-style);border-width:1px;--tw-border-style: solid;border-style:solid;padding-inline:calc(var(--spacing) * 5);font-size:var(--text-sm);line-height:var(--tw-leading, var(--text-sm--line-height))}@media (width >= 64rem){.sibling-navigation[_ngcontent-%COMP%]{height:calc(var(--spacing) * 20);flex:1;padding-inline:calc(var(--spacing) * 10);font-size:var(--text-base);line-height:var(--tw-leading, var(--text-base--line-height));width:300px}.sibling-navigation[_ngcontent-%COMP%]:first-child{justify-content:flex-start}.sibling-navigation[_ngcontent-%COMP%]:last-child{justify-content:flex-end}}@property --tw-border-style{syntax: "*"; inherits: false; initial-value: solid;}

`]})};var A=class n{static \u0275fac=function(e){return new(e||n)};static \u0275cmp=c({type:n,selectors:[["doc-doc-container-page"]],decls:6,vars:0,consts:[[1,"doc-container-page"],[1,"hidden","lg:block"],[1,"pb-20","lg:flex-1"],[1,"w-full","max-w-[1024px]","pr-1","lg:pr-3"]],template:function(e,t){e&1&&(r(0,"div",0),a(1,"doc-sidebar",1),r(2,"div",2)(3,"div",3),a(4,"router-outlet")(5,"doc-doc-sibling-navigations"),s()()())},dependencies:[I,R,d],styles:[`@layer theme{[_ngcontent-%COMP%]:root, [_nghost-%COMP%]{--color-amber-500: oklch(.769 .188 70.08);--color-blue-500: oklch(.623 .214 259.815);--spacing: .25rem}}@media (width >= 64rem){.doc-container-page[_ngcontent-%COMP%]{display:flex}}@media (width >= 64rem){.doc-container-page[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 10)}}

`]})};export{A as DocContainerPageComponent};
