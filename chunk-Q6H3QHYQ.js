import{h as A}from"./chunk-KNXVHTLB.js";import{a as P}from"./chunk-KDRAUZ2P.js";import{e as I}from"./chunk-K6LPIJ6U.js";import{F as L,a as M,b as F,d as V,e as k,g as E,l as D,q as N,v as p,w as q}from"./chunk-OTESOBQZ.js";import{a as T}from"./chunk-U3UHWJW4.js";import"./chunk-TTMMANWW.js";import{s as y}from"./chunk-CEMMEC5V.js";import"./chunk-BJXS5QYT.js";import"./chunk-WXPYGSME.js";import"./chunk-IZOCP3TZ.js";import"./chunk-ORXXB4DH.js";import"./chunk-6CWDKGH7.js";import{Ca as h,Db as f,Fb as i,Ga as g,Hb as C,Hc as O,Nb as a,Ob as r,Pb as c,Ub as b,Xb as w,Yb as v,db as l,fa as d,fc as _,pc as S,tb as s}from"./chunk-YNRYOK3S.js";import"./chunk-HZ6M6AS2.js";var R=["*"],u=class n{labelAlign=h("end");required=h(!1);value=g(void 0);_idGenerator=d(y);buttonId=this._idGenerator.getId("switch-button-");labelId=this._idGenerator.getId("switch-label-");disabled=g(!1);_registerOnChangefn;_onTouchedfn;_validatorChangefn;constructor(){O(()=>{this.required(),this._validatorChangefn?.()})}toggle(){if(this.disabled())return;this._onTouchedfn?.();let e=!this.value();this.value.set(e),this._registerOnChangefn?.(e)}writeValue(e){this.value.set(!!e)}registerOnChange(e){this._registerOnChangefn=e}registerOnValidatorChange(e){this._validatorChangefn=e}registerOnTouched(e){this._onTouchedfn=e}setDisabledState(e){this.disabled.set(e)}validate(e){return this.required()&&e.value!==!0?{required:!0}:null}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=s({type:n,selectors:[["app-switch"]],hostAttrs:["role","group"],hostVars:7,hostBindings:function(t,o){t&2&&(f("aria-labelledby",o.labelId),C("disabled",o.disabled())("checked",o.value())("start",o.labelAlign()==="start"))},inputs:{labelAlign:[1,"labelAlign"],required:[1,"required"]},features:[S([{provide:F,multi:!0,useExisting:n},{provide:V,useExisting:n,multi:!0}])],ngContentSelectors:R,decls:4,vars:7,consts:[["role","switch",1,"switch-button",3,"click","disabled","id"],[1,"toggle"],[3,"htmlFor","id"]],template:function(t,o){t&1&&(w(),a(0,"button",0),b("click",function(){return o.toggle()}),c(1,"div",1),r(),a(2,"label",2),v(3),r()),t&2&&(C("checked",o.value()),i("disabled",o.disabled())("id",o.buttonId),f("aria-checked",o.value()),l(2),i("htmlFor",o.buttonId)("id",o.labelId))},styles:["[_nghost-%COMP%]{display:inline-flex;align-items:center;gap:8px;cursor:pointer}.start[_nghost-%COMP%]{flex-direction:row-reverse}[_nghost-%COMP%]   label[_ngcontent-%COMP%]{cursor:pointer}.disabled[_nghost-%COMP%]   .toggle[_ngcontent-%COMP%]{color:var(--color-disabled-foreground);background-color:var(--color-disabled)}.disabled[_nghost-%COMP%]   label[_ngcontent-%COMP%]{color:var(--color-disabled-foreground)}.ng-invalid.ng-touched[_nghost-%COMP%]   .switch-button[_ngcontent-%COMP%]{outline:1px solid var(--color-danger)}.switch-button[_ngcontent-%COMP%]{width:50px;height:25px;border-radius:15px;background-color:var(--color-surface-2);position:relative;transition:background-color .3s;border:0px;cursor:pointer}.switch-button.checked[_ngcontent-%COMP%]{background-color:var(--color-primary)}.toggle[_ngcontent-%COMP%]{width:23px;height:23px;border-radius:50%;background-color:var(--color-background);position:absolute;top:1px;left:1px;transition:left .3s}.switch-button.checked[_ngcontent-%COMP%]   .toggle[_ngcontent-%COMP%]{left:26px}"],changeDetection:0})};var m=class n{formControl=new D(null,k.requiredTrue);static \u0275fac=function(t){return new(t||n)};static \u0275cmp=s({type:n,selectors:[["doc-show-case-switch"]],decls:2,vars:1,consts:[[3,"formControl"]],template:function(t,o){t&1&&(a(0,"app-switch",0),_(1," Turn On"),r()),t&2&&i("formControl",o.formControl)},dependencies:[u,q,E,N,p],encapsulation:2})};var G="switch",j=class n{sourceTreeBuilder=d(M);sourceTree=[{name:"switch",files:[...this.sourceTreeBuilder.fullComponent(G,G)],hideName:!0}];apiInfo={ariaLink:"https://www.w3.org/WAI/ARIA/apg/patterns/switch/",entities:[{name:"SwitchComponent",selector:"app-switch",type:"component",formBindable:!0,inputs:[{name:"disabled",type:"boolean",description:"Disables the switch.",default:"false"},{name:"required",type:"boolean",description:"Applies required validation to the switch.",default:"false"},{name:"labelAlign",type:"start | end",description:"Specifies the alignment of the switch label.",default:"end"}]}]};static \u0275fac=function(t){return new(t||n)};static \u0275cmp=s({type:n,selectors:[["doc-switch-page"]],decls:6,vars:2,consts:[["label","Switch","subTitle","A switch is an input widget that enables users to toggle between two values: true and false."],["name","switch"],["type","component","name","switch"],["name","switch",3,"sourceTree"],[3,"apiInfo"]],template:function(t,o){t&1&&(a(0,"doc-blueprint-page",0)(1,"doc-show-case",1),c(2,"doc-show-case-switch"),r(),c(3,"doc-command-installation",2)(4,"doc-source-tree",3)(5,"doc-api-info",4),r()),t&2&&(l(4),i("sourceTree",o.sourceTree),l(),i("apiInfo",o.apiInfo))},dependencies:[T,I,p,m,P,L,A],encapsulation:2})};export{j as SwitchPageComponent};
