import{a as W}from"./chunk-WOIJO7Y3.js";import{a as F}from"./chunk-BBYX5IZ3.js";import{f as y,h as H}from"./chunk-KNXVHTLB.js";import{a as X}from"./chunk-KDRAUZ2P.js";import{e as j}from"./chunk-K6LPIJ6U.js";import{F as K,a as V}from"./chunk-OTESOBQZ.js";import{a as L}from"./chunk-U3UHWJW4.js";import{c as U,d as $,g as q,m as z}from"./chunk-TTMMANWW.js";import"./chunk-CEMMEC5V.js";import"./chunk-BJXS5QYT.js";import"./chunk-WXPYGSME.js";import"./chunk-IZOCP3TZ.js";import"./chunk-ORXXB4DH.js";import"./chunk-6CWDKGH7.js";import{Ca as m,Da as x,Db as _,Ec as N,Fb as p,Fc as A,Ga as u,Jb as O,Mc as Y,Nb as s,Ob as n,Pb as f,Qb as S,Qc as k,Ub as D,Wb as C,db as l,ec as M,fa as a,fc as c,hc as R,kb as E,tb as d,vb as I,wc as B,yb as h,z as w}from"./chunk-YNRYOK3S.js";import"./chunk-HZ6M6AS2.js";function Q(e,o){if(e&1&&S(0,1),e&2){let t=C();p("cdkPortalOutlet",t.contentPortal())}}function Z(e,o){if(e&1&&c(0),e&2){let t=C();R(" ",t.message()," ")}}var v=class e{message=u("");position=u("top");content=u(void 0);vf=a(E);id=u("");contentPortal=A(()=>{let o=this.content();if(o)return new $(o,this.vf)});static \u0275fac=function(t){return new(t||e)};static \u0275cmp=d({type:e,selectors:[["app-tooltip-container"]],decls:3,vars:3,consts:[["role","tooltip",1,"tooltip",3,"ngClass","id"],[3,"cdkPortalOutlet"]],template:function(t,i){t&1&&(s(0,"div",0),h(1,Q,1,1,"ng-container",1)(2,Z,1,1),n()),t&2&&(p("ngClass",i.position())("id",i.id()),l(),O(i.contentPortal()?1:2))},dependencies:[q,k],styles:['.tooltip[_ngcontent-%COMP%]{background-color:var(--color-inverse);color:var(--color-inverse-foreground);padding:8px;border-radius:4px;font-size:14px;transition:opacity .3s ease;position:relative}.tooltip[_ngcontent-%COMP%]:after{content:"";position:absolute;width:0;height:0;border-style:solid}.tooltip.top[_ngcontent-%COMP%]:after{top:100%;left:50%;transform:translate(-50%);border-width:6px 6px 0 6px;border-color:var(--color-inverse) transparent transparent transparent}.tooltip.right[_ngcontent-%COMP%]:after{top:50%;left:-6px;transform:translateY(-50%);border-width:6px 6px 6px 0;border-color:transparent var(--color-inverse) transparent transparent}.tooltip.bottom[_ngcontent-%COMP%]:after{bottom:100%;left:50%;transform:translate(-50%);border-width:0 6px 6px 6px;border-color:transparent transparent var(--color-inverse) transparent}.tooltip.left[_ngcontent-%COMP%]:after{top:50%;right:-6px;transform:translateY(-50%);border-width:6px 0 6px 6px;border-color:transparent transparent transparent var(--color-inverse)}'],changeDetection:0})};var tt=0;function et(){return`tooltip-${tt++}`}var g=class e{message=m.required({alias:"appTooltip"});tooltipPosition=m("top");tooltipEvent=m("hover");tooltipDelay=m(0,{transform:N});tooltipContent=m();tooltipId=et();overlay=a(z);el=a(x);document=a(Y);overlayRef;timeoutId;escapeSub;onFocus(){this.tooltipEvent()==="focus"&&this.show()}onBlur(){this.tooltipEvent()==="focus"&&this.hide()}onMouseEnter(){this.tooltipEvent()==="hover"&&this.show()}onMouseLeave(){this.tooltipEvent()==="hover"&&this.hide()}show(){this.clearSchedule(),this.timeoutId=setTimeout(()=>{let o=this.el.nativeElement,t=this.tooltipContent(),i=new U(v);this.overlayRef=this.overlay.create({positionStrategy:this.overlay.position().flexibleConnectedTo(o).withPositions([this.getOverlayPosition()])});let r=this.overlayRef.attach(i);r.instance.content.set(t),r.instance.message.set(this.message()),r.instance.position.set(this.tooltipPosition()),r.instance.id.set(this.tooltipId),this.listenToEscape()},this.tooltipDelay())}hide(){this.escapeSub?.unsubscribe(),this.clearSchedule(),this.overlayRef?.hasAttached()&&(this.overlayRef.detach(),this.overlayRef=void 0)}getOverlayPosition(){switch(this.tooltipPosition()){case"top":return{originX:"center",originY:"top",overlayX:"center",overlayY:"bottom",offsetY:-6};case"right":return{originX:"end",originY:"center",overlayX:"start",overlayY:"center",offsetX:6};case"bottom":return{originX:"center",originY:"bottom",overlayX:"center",overlayY:"top",offsetY:6};case"left":return{originX:"start",originY:"center",overlayX:"end",overlayY:"center",offsetX:-6}}}clearSchedule(){this.timeoutId&&(clearTimeout(this.timeoutId),this.timeoutId=void 0)}listenToEscape(){this.escapeSub?.unsubscribe(),this.escapeSub=w(this.document,"keydown").subscribe(o=>{o.key==="Escape"&&this.hide()})}ngOnDestroy(){this.clearSchedule(),this.escapeSub?.unsubscribe()}static \u0275fac=function(t){return new(t||e)};static \u0275dir=I({type:e,selectors:[["","appTooltip",""]],hostVars:1,hostBindings:function(t,i){t&1&&D("focus",function(){return i.onFocus()})("blur",function(){return i.onBlur()})("mouseenter",function(){return i.onMouseEnter()})("mouseleave",function(){return i.onMouseLeave()}),t&2&&_("aria-describedby",i.tooltipId)},inputs:{message:[1,"appTooltip","message"],tooltipPosition:[1,"tooltipPosition"],tooltipEvent:[1,"tooltipEvent"],tooltipDelay:[1,"tooltipDelay"],tooltipContent:[1,"tooltipContent"]}})};function ot(e,o){e&1&&(s(0,"div",6),f(1,"img",7),c(2," I love NgVerse! "),n())}var T=class e{static \u0275fac=function(t){return new(t||e)};static \u0275cmp=d({type:e,selectors:[["doc-show-case-tooltip"]],decls:10,vars:1,consts:[["customContent",""],[1,"tooltips"],["appButton","","appTooltip","Top tooltip","tooltipPosition","top"],["appButton","","appTooltip","Right tooltip","tooltipPosition","right"],["appInput","","appTooltip","Bottom Tooltip","tooltipPosition","bottom","placeholder","Focus to show","tooltipEvent","focus"],["appButton","","appTooltip","","tooltipPosition","left",3,"tooltipContent"],[1,"custom-tooltip-content"],["src","show-case-tooltip/thanos.webp","alt","thanos","width","100","height","100"]],template:function(t,i){if(t&1&&(s(0,"div",1)(1,"button",2),c(2," Top Tooltip "),n(),s(3,"button",3),c(4," Right Tooltip "),n(),f(5,"input",4),s(6,"button",5),c(7," Custom Content Tooltip "),n(),h(8,ot,3,0,"ng-template",null,0,B),n()),t&2){let r=M(9);l(6),p("tooltipContent",r)}},dependencies:[g,F,W],styles:[".tooltips[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.custom-tooltip-content[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px}"]})};var P="tooltip",J=class e{sourceTreeBuilder=a(V);sourceTree=[{name:P,files:[...this.sourceTreeBuilder.directive("tooltip",P,!0),...this.sourceTreeBuilder.fullComponent("tooltip-container",`${P}`)],hideName:!0}];apiInfo={ariaLink:"https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/",entities:[{name:"TooltipDirective",type:"directive",selector:"[appTooltip]",inputs:[{name:"appTooltip",type:"string",description:"text to display on tooltip",default:y},{name:"tooltipPosition",type:"top | right | bottom | left",description:"tooltip position",default:"top"},{name:"tooltipEvent",type:"hover | focus",description:"defines when to display tooltip",default:"hover"},{name:"tooltipDelay",type:"number",description:"A delay (in milliseconds) before the tooltip appears.",default:"0"},{name:"tooltipContent",type:"ng-template",description:"The content template to be displayed inside the tooltip.",default:y}]}]};static \u0275fac=function(t){return new(t||e)};static \u0275cmp=d({type:e,selectors:[["doc-tooltip-page"]],decls:6,vars:4,consts:[[3,"subTitle","label"],["name","tooltip"],["type","component","name","tooltip"],["name","tooltip",3,"sourceTree"],[3,"apiInfo"]],template:function(t,i){t&1&&(s(0,"doc-blueprint-page",0)(1,"doc-show-case",1),f(2,"doc-show-case-tooltip"),n(),f(3,"doc-command-installation",2)(4,"doc-source-tree",3)(5,"doc-api-info",4),n()),t&2&&(p("subTitle","A tooltip is a popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it. ")("label","Tooltip"),l(4),p("sourceTree",i.sourceTree),l(),p("apiInfo",i.apiInfo))},dependencies:[L,j,X,T,K,H],encapsulation:2})};export{J as TooltipPageComponent};
