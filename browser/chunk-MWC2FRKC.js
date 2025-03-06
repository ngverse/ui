import{a as v}from"./chunk-MUYAJE4J.js";import{a as M,b}from"./chunk-ZPIEKFKU.js";import"./chunk-LTZIIX5H.js";import{h as C}from"./chunk-V7ENVSME.js";import{a as D}from"./chunk-GPI6OBII.js";import{e as y}from"./chunk-CZ5TROGG.js";import{H as T,a as h,b as S}from"./chunk-QJNV3SJE.js";import"./chunk-P3NORFJ7.js";import"./chunk-QKQ5N64N.js";import{d as f}from"./chunk-AU7E6JWS.js";import"./chunk-4OF5TJLW.js";import"./chunk-5SVHC6KN.js";import"./chunk-5SY4JRTO.js";import"./chunk-AC2A7OJH.js";import{Gb as a,Ob as r,Pb as o,Qb as m,eb as n,fa as s,gc as t,hc as g,rc as u,ub as p}from"./chunk-4E37DFQL.js";import"./chunk-HZ6M6AS2.js";var c=class i{darkModeService=s(M);isDarkMode=this.darkModeService.isEnabled;static \u0275fac=function(e){return new(e||i)};static \u0275cmp=p({type:i,selectors:[["doc-show-case-dark-mode"]],decls:6,vars:1,consts:[[1,"dark-mode-info"],[1,"dark-mode-status"]],template:function(e,d){e&1&&(m(0,"app-dark-mode-toggle"),r(1,"p",0)(2,"span"),t(3," Dark mode is "),o(),r(4,"span",1),t(5),o()()),e&2&&(n(5),g(d.isDarkMode()?"enabled":"disabled"))},dependencies:[b],styles:[".dark-mode-info[_ngcontent-%COMP%]{margin-top:12px}.dark-mode-status[_ngcontent-%COMP%]{font-weight:700}"],changeDetection:0})};var x=()=>["../button"],E=()=>["../local-storage"],k="dark-mode",w=class i{sourceTreeBuilder=s(S);preps=[{name:"button"},{name:"local-storage"}];sourceTree=[{name:"dark-mode",files:[...this.sourceTreeBuilder.fullComponent("dark-mode-toggle",`${k}/dark-mode-toggle`),this.sourceTreeBuilder.component("dark-mode-icon",`${k}/dark-mode-toggle`),this.sourceTreeBuilder.component("light-mode-icon",`${k}/dark-mode-toggle`)],hideName:!0}];apiInfo={entities:[{name:"DarkModeToggleComponent",type:"component",selector:"app-dark-mode-toggle",description:"button that toggles dark mode"},{name:"DarkModeService",type:"service",description:"service that stores and control dark mode state",properties:[{name:"isEnabled",returnType:"Signal<boolean>",description:"indicates if dark mode is enabled",propType:"get"}],methods:[{name:"toggle",description:"toggles dark mode",returnType:"void"},{name:"enable",description:"enables dark mode",returnType:"void"},{name:"disable",description:"disables dark mode",returnType:"void"}]}]};static \u0275fac=function(e){return new(e||i)};static \u0275cmp=p({type:i,selectors:[["doc-dark-mode-page"]],decls:14,vars:7,consts:[["label","Dark Mode","subTitle","Dark mode is used to switch between light and dark theme"],["name","dark-mode"],[3,"preps"],[1,"underline",3,"routerLink"],["type","component","name","dark-mode"],["name","dark-mode",3,"sourceTree"],[3,"apiInfo"]],template:function(e,d){e&1&&(r(0,"doc-blueprint-page",0)(1,"doc-show-case",1),m(2,"doc-show-case-dark-mode"),o(),r(3,"doc-prerequisites",2),t(4," Dark mode element uses "),r(5,"a",3),t(6,"Button"),o(),t(7," and "),r(8,"a",3),t(9,"Local Storage"),o(),t(10,". Please ensure they are added to your project. "),o(),m(11,"doc-command-installation",4)(12,"doc-source-tree",5)(13,"doc-api-info",6),o()),e&2&&(n(3),a("preps",d.preps),n(2),a("routerLink",u(5,x)),n(3),a("routerLink",u(6,E)),n(4),a("sourceTree",d.sourceTree),n(),a("apiInfo",d.apiInfo))},dependencies:[h,c,T,C,y,D,v,f],encapsulation:2,changeDetection:0})};export{w as DarkModePageComponent};
