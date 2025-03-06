import{b as W}from"./chunk-OKCGSXFC.js";import{a as z}from"./chunk-RPL2EVWZ.js";import{a as O,b as J,c as K}from"./chunk-LURVHVBU.js";import"./chunk-5MVWYHH6.js";import{a as $}from"./chunk-GNZZM6ZF.js";import{f as v,h as N}from"./chunk-V7ENVSME.js";import{a as _}from"./chunk-GPI6OBII.js";import{e as B}from"./chunk-CZ5TROGG.js";import{F as j,G as U,H as V,a as I,b as A,d as D,f as n,h as x,i as P,o as R,p as M,s as k,t as q,v as G,x as L}from"./chunk-QJNV3SJE.js";import"./chunk-P3NORFJ7.js";import"./chunk-QKQ5N64N.js";import"./chunk-AU7E6JWS.js";import{k as S}from"./chunk-4OF5TJLW.js";import"./chunk-5SVHC6KN.js";import"./chunk-5SY4JRTO.js";import"./chunk-AC2A7OJH.js";import{Gb as s,Hc as T,Kb as C,Lb as y,Mb as F,Nb as h,Ob as o,Pb as e,Qb as p,Vb as b,eb as l,fa as c,gc as a,hc as w,rc as E,ub as f,zb as g}from"./chunk-4E37DFQL.js";import"./chunk-HZ6M6AS2.js";var X=()=>["required"];function Z(i,t){i&1&&(o(0,"app-error"),a(1,"Lastname is important please fill"),e())}function ee(i,t){if(i&1&&(o(0,"app-option",7),a(1),e()),i&2){let r=t.$implicit;s("value",r.code),l(),w(r.name)}}var u=class i{formBuilder=c(G);dialog=c(W);formFieldErrorRegistry=c(J);group=this.formBuilder.group({firstName:["",n.required],lastName:["",n.required],email:["",n.compose([n.required,n.email])],age:["",n.compose([n.required,n.min(10)])],country:[void 0,n.required]});countries=[{code:"KA",name:"Georgia"},{code:"CA",name:"Canada"},{code:"GB",name:"United Kingdom"},{code:"DE",name:"Germany"},{code:"FR",name:"France"},{code:"JP",name:"Japan"},{code:"AU",name:"Australia"},{code:"IT",name:"Italy"},{code:"ES",name:"Spain"},{code:"CN",name:"China"}];constructor(){this.formFieldErrorRegistry.addErrors({min:t=>`Min value is ${t.min}, but your value is ${t.actual}`}),T(()=>{let t=this.group.controls.lastName;console.log(t.errors?.required)})}register(){this.dialog.alert({title:"Registration",description:"User registered successfully"})}static \u0275fac=function(r){return new(r||i)};static \u0275cmp=f({type:i,selectors:[["doc-show-case-form-field"]],decls:26,vars:4,consts:[[1,"show-case",3,"formGroup"],["appInput","","formControlName","firstName",1,"w-full"],[3,"silentErrors"],["appInput","","formControlName","lastName",1,"w-full"],["appInput","","type","email","formControlName","email",1,"w-full"],["appInput","","type","number","formControlName","age",1,"w-full"],["formControlName","country","placeholder","Select a country",1,"w-full"],[3,"value"],["appButton","",3,"click"]],template:function(r,m){r&1&&(o(0,"form",0)(1,"app-form-field")(2,"app-label"),a(3,"First Name"),e(),p(4,"input",1),e(),o(5,"app-form-field",2)(6,"app-label"),a(7,"Last Name"),e(),p(8,"input",3),g(9,Z,2,0,"app-error"),e(),o(10,"app-form-field")(11,"app-label"),a(12,"Email"),e(),p(13,"input",4),e(),o(14,"app-form-field")(15,"app-label"),a(16,"Age"),e(),p(17,"input",5),e(),o(18,"app-form-field")(19,"app-label"),a(20,"Country"),e(),o(21,"app-select",6),F(22,ee,2,2,"app-option",7,y),e()(),o(24,"button",8),b("click",function(){return m.register()}),a(25,"Register"),e()()),r&2&&(s("formGroup",m.group),l(5),s("silentErrors",E(3,X)),l(4),C(m.group.controls.lastName.errors!=null&&m.group.controls.lastName.errors.required?9:-1),l(13),h(m.countries))},dependencies:[K,z,$,L,R,D,M,x,P,k,q,S,O,j,U],styles:[".show-case[_ngcontent-%COMP%]{margin:0 auto;width:250px}"]})};var d="form-field",Y=class i{sourceTreeBuilder=c(A);sourceTree=[{name:d,files:[...this.sourceTreeBuilder.fullComponent(d,d),this.sourceTreeBuilder.file("form-field-error.registry",d),this.sourceTreeBuilder.file("form-field-error.registry",d,"spec.ts")],hideName:!0},{name:"label",files:this.sourceTreeBuilder.fullComponent("label",`${d}/label`)},{name:"error",files:this.sourceTreeBuilder.fullComponent("error",`${d}/error`)}];apiInfo={entities:[{name:"FormFieldComponent",type:"component",selector:"app-form-field",description:"A form field is a block element with field and label",inputs:[{name:"showErrors",type:"boolean",default:"true",description:"Whether to show auto generated errors, custom errors will be still shown, it has to be controlled manually."},{name:"silentErrors",type:"string[] | undefined",default:v,description:"List of errors to ignore. This can be useful when you want to display most of the errors with error group, but handle specific errors with app-error and provide customized error messages"}]},{name:"LabelComponent",type:"component",selector:"app-label",description:"Form Field label"},{name:"ErrorComponent",type:"component",selector:"app-error",description:"app-error displays an error message"},{name:"FormFieldErrorRegistry",type:"service",description:"Service for registering error messages",methods:[{name:"addErrors",returnType:"void",description:"adds errors to the registry",params:[{name:"errors",type:"Record<string, string | ((params: unknown) => string)>",description:"message value can be string or function where error object will be passed"}]},{name:"setErrors",returnType:"void",description:"clears existing errors and sets new errors to the registry",params:[{name:"errors",type:"Record<string, string | ((params: unknown) => string)>",description:"message value can be string or function where error object will be passed"}]},{name:"getMessage",returnType:"string | undefined",description:"gets error message by code",params:[{name:"code",type:"string",description:"error code"}]}]}]};static \u0275fac=function(r){return new(r||i)};static \u0275cmp=f({type:i,selectors:[["doc-form-field-page"]],decls:6,vars:4,consts:[[3,"subTitle","label"],["name","form-field"],["type","component","name","form-field"],["name","form-field",3,"sourceTree"],[3,"apiInfo"]],template:function(r,m){r&1&&(o(0,"doc-blueprint-page",0)(1,"doc-show-case",1),p(2,"doc-show-case-form-field"),e(),p(3,"doc-command-installation",2)(4,"doc-source-tree",3)(5,"doc-api-info",4),e()),r&2&&(s("subTitle","Form Field is a block element with field and label")("label","Form Field"),l(4),s("sourceTree",m.sourceTree),l(),s("apiInfo",m.apiInfo))},dependencies:[I,B,V,_,u,N],encapsulation:2})};export{Y as FormFieldPageComponent};
