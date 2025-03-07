import{c as g,d as q,f as Z,g as v,h as U,i as $,j as C,m as D}from"./chunk-TTMMANWW.js";import{a as H,d as m,h as V,o as Q,p as W,r as z,s as Y,t as y}from"./chunk-CEMMEC5V.js";import{$ as T,$b as j,Da as F,Db as M,Mc as G,Ra as E,V as k,_b as P,ac as x,ca as _,f,fa as s,fb as I,hb as R,m as A,tb as L,ua as h,wb as S,x as O,yb as B,za as w,zc as N}from"./chunk-YNRYOK3S.js";import{a as d}from"./chunk-HZ6M6AS2.js";function J(a,l){}var c=class{viewContainerRef;injector;id;role="dialog";panelClass="";hasBackdrop=!0;backdropClass="";disableClose=!1;width="";height="";minWidth;minHeight;maxWidth;maxHeight;positionStrategy;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=!1;autoFocus="first-tabbable";restoreFocus=!0;scrollStrategy;closeOnNavigation=!0;closeOnDestroy=!0;closeOnOverlayDetachments=!0;componentFactoryResolver;providers;container;templateContext};var X=(()=>{class a extends Z{_elementRef=s(F);_focusTrapFactory=s(W);_config;_interactivityChecker=s(Q);_ngZone=s(w);_overlayRef=s(C);_focusMonitor=s(z);_renderer=s(R);_platform=s(H);_document=s(G,{optional:!0});_portalOutlet;_focusTrap=null;_elementFocusedBeforeDialogWasOpened=null;_closeInteractionType=null;_ariaLabelledByQueue=[];_changeDetectorRef=s(N);_injector=s(h);_isDestroyed=!1;constructor(){super(),this._config=s(c,{optional:!0})||new c,this._config.ariaLabelledBy&&this._ariaLabelledByQueue.push(this._config.ariaLabelledBy)}_addAriaLabelledBy(e){this._ariaLabelledByQueue.push(e),this._changeDetectorRef.markForCheck()}_removeAriaLabelledBy(e){let t=this._ariaLabelledByQueue.indexOf(e);t>-1&&(this._ariaLabelledByQueue.splice(t,1),this._changeDetectorRef.markForCheck())}_contentAttached(){this._initializeFocusTrap(),this._handleBackdropClicks(),this._captureInitialFocus()}_captureInitialFocus(){this._trapFocus()}ngOnDestroy(){this._isDestroyed=!0,this._restoreFocus()}attachComponentPortal(e){this._portalOutlet.hasAttached();let t=this._portalOutlet.attachComponentPortal(e);return this._contentAttached(),t}attachTemplatePortal(e){this._portalOutlet.hasAttached();let t=this._portalOutlet.attachTemplatePortal(e);return this._contentAttached(),t}attachDomPortal=e=>{this._portalOutlet.hasAttached();let t=this._portalOutlet.attachDomPortal(e);return this._contentAttached(),t};_recaptureFocus(){this._containsFocus()||this._trapFocus()}_forceFocus(e,t){this._interactivityChecker.isFocusable(e)||(e.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let i=()=>{o(),r(),e.removeAttribute("tabindex")},o=this._renderer.listen(e,"blur",i),r=this._renderer.listen(e,"mousedown",i)})),e.focus(t)}_focusByCssSelector(e,t){let i=this._elementRef.nativeElement.querySelector(e);i&&this._forceFocus(i,t)}_trapFocus(){this._isDestroyed||E(()=>{let e=this._elementRef.nativeElement;switch(this._config.autoFocus){case!1:case"dialog":this._containsFocus()||e.focus();break;case!0:case"first-tabbable":this._focusTrap?.focusInitialElement()||this._focusDialogContainer();break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');break;default:this._focusByCssSelector(this._config.autoFocus);break}},{injector:this._injector})}_restoreFocus(){let e=this._config.restoreFocus,t=null;if(typeof e=="string"?t=this._document.querySelector(e):typeof e=="boolean"?t=e?this._elementFocusedBeforeDialogWasOpened:null:e&&(t=e),this._config.restoreFocus&&t&&typeof t.focus=="function"){let i=m(),o=this._elementRef.nativeElement;(!i||i===this._document.body||i===o||o.contains(i))&&(this._focusMonitor?(this._focusMonitor.focusVia(t,this._closeInteractionType),this._closeInteractionType=null):t.focus())}this._focusTrap&&this._focusTrap.destroy()}_focusDialogContainer(){this._elementRef.nativeElement.focus&&this._elementRef.nativeElement.focus()}_containsFocus(){let e=this._elementRef.nativeElement,t=m();return e===t||e.contains(t)}_initializeFocusTrap(){this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._document&&(this._elementFocusedBeforeDialogWasOpened=m()))}_handleBackdropClicks(){this._overlayRef.backdropClick().subscribe(()=>{this._config.disableClose&&this._recaptureFocus()})}static \u0275fac=function(t){return new(t||a)};static \u0275cmp=L({type:a,selectors:[["cdk-dialog-container"]],viewQuery:function(t,i){if(t&1&&P(v,7),t&2){let o;j(o=x())&&(i._portalOutlet=o.first)}},hostAttrs:["tabindex","-1",1,"cdk-dialog-container"],hostVars:6,hostBindings:function(t,i){t&2&&M("id",i._config.id||null)("role",i._config.role)("aria-modal",i._config.ariaModal)("aria-labelledby",i._config.ariaLabel?null:i._ariaLabelledByQueue[0])("aria-label",i._config.ariaLabel)("aria-describedby",i._config.ariaDescribedBy||null)},features:[S],decls:1,vars:0,consts:[["cdkPortalOutlet",""]],template:function(t,i){t&1&&B(0,J,0,0,"ng-template",0)},dependencies:[v],styles:[".cdk-dialog-container{display:block;width:100%;height:100%;min-height:inherit;max-height:inherit}"],encapsulation:2})}return a})(),u=class{overlayRef;config;componentInstance;componentRef;containerInstance;disableClose;closed=new f;backdropClick;keydownEvents;outsidePointerEvents;id;_detachSubscription;constructor(l,e){this.overlayRef=l,this.config=e,this.disableClose=e.disableClose,this.backdropClick=l.backdropClick(),this.keydownEvents=l.keydownEvents(),this.outsidePointerEvents=l.outsidePointerEvents(),this.id=e.id,this.keydownEvents.subscribe(t=>{t.keyCode===27&&!this.disableClose&&!V(t)&&(t.preventDefault(),this.close(void 0,{focusOrigin:"keyboard"}))}),this.backdropClick.subscribe(()=>{this.disableClose||this.close(void 0,{focusOrigin:"mouse"})}),this._detachSubscription=l.detachments().subscribe(()=>{e.closeOnOverlayDetachments!==!1&&this.close()})}close(l,e){if(this.containerInstance){let t=this.closed;this.containerInstance._closeInteractionType=e?.focusOrigin||"program",this._detachSubscription.unsubscribe(),this.overlayRef.dispose(),t.next(l),t.complete(),this.componentInstance=this.containerInstance=null}}updatePosition(){return this.overlayRef.updatePosition(),this}updateSize(l="",e=""){return this.overlayRef.updateSize({width:l,height:e}),this}addPanelClass(l){return this.overlayRef.addPanelClass(l),this}removePanelClass(l){return this.overlayRef.removePanelClass(l),this}},ee=new _("DialogScrollStrategy",{providedIn:"root",factory:()=>{let a=s(D);return()=>a.scrollStrategies.block()}}),te=new _("DialogData"),ie=new _("DefaultDialogConfig");var Te=(()=>{class a{_overlay=s(D);_injector=s(h);_defaultOptions=s(ie,{optional:!0});_parentDialog=s(a,{optional:!0,skipSelf:!0});_overlayContainer=s($);_idGenerator=s(Y);_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new f;_afterOpenedAtThisLevel=new f;_ariaHiddenElements=new Map;_scrollStrategy=s(ee);get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}afterAllClosed=O(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(k(void 0)));constructor(){}open(e,t){let i=this._defaultOptions||new c;t=d(d({},i),t),t.id=t.id||this._idGenerator.getId("cdk-dialog-"),t.id&&this.getDialogById(t.id);let o=this._getOverlayConfig(t),r=this._overlay.create(o),n=new u(r,t),p=this._attachContainer(r,n,t);return n.containerInstance=p,this._attachDialogContent(e,n,p,t),this.openDialogs.length||this._hideNonDialogContentFromAssistiveTechnology(),this.openDialogs.push(n),n.closed.subscribe(()=>this._removeOpenDialog(n,!0)),this.afterOpened.next(n),n}closeAll(){b(this.openDialogs,e=>e.close())}getDialogById(e){return this.openDialogs.find(t=>t.id===e)}ngOnDestroy(){b(this._openDialogsAtThisLevel,e=>{e.config.closeOnDestroy===!1&&this._removeOpenDialog(e,!1)}),b(this._openDialogsAtThisLevel,e=>e.close()),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete(),this._openDialogsAtThisLevel=[]}_getOverlayConfig(e){let t=new U({positionStrategy:e.positionStrategy||this._overlay.position().global().centerHorizontally().centerVertically(),scrollStrategy:e.scrollStrategy||this._scrollStrategy(),panelClass:e.panelClass,hasBackdrop:e.hasBackdrop,direction:e.direction,minWidth:e.minWidth,minHeight:e.minHeight,maxWidth:e.maxWidth,maxHeight:e.maxHeight,width:e.width,height:e.height,disposeOnNavigation:e.closeOnNavigation});return e.backdropClass&&(t.backdropClass=e.backdropClass),t}_attachContainer(e,t,i){let o=i.injector||i.viewContainerRef?.injector,r=[{provide:c,useValue:i},{provide:u,useValue:t},{provide:C,useValue:e}],n;i.container?typeof i.container=="function"?n=i.container:(n=i.container.type,r.push(...i.container.providers(i))):n=X;let p=new g(n,i.viewContainerRef,h.create({parent:o||this._injector,providers:r}));return e.attach(p).instance}_attachDialogContent(e,t,i,o){if(e instanceof I){let r=this._createInjector(o,t,i,void 0),n={$implicit:o.data,dialogRef:t};o.templateContext&&(n=d(d({},n),typeof o.templateContext=="function"?o.templateContext():o.templateContext)),i.attachTemplatePortal(new q(e,null,n,r))}else{let r=this._createInjector(o,t,i,this._injector),n=i.attachComponentPortal(new g(e,o.viewContainerRef,r));t.componentRef=n,t.componentInstance=n.instance}}_createInjector(e,t,i,o){let r=e.injector||e.viewContainerRef?.injector,n=[{provide:te,useValue:e.data},{provide:u,useValue:t}];return e.providers&&(typeof e.providers=="function"?n.push(...e.providers(t,e,i)):n.push(...e.providers)),e.direction&&(!r||!r.get(y,null,{optional:!0}))&&n.push({provide:y,useValue:{value:e.direction,change:A()}}),h.create({parent:r||o,providers:n})}_removeOpenDialog(e,t){let i=this.openDialogs.indexOf(e);i>-1&&(this.openDialogs.splice(i,1),this.openDialogs.length||(this._ariaHiddenElements.forEach((o,r)=>{o?r.setAttribute("aria-hidden",o):r.removeAttribute("aria-hidden")}),this._ariaHiddenElements.clear(),t&&this._getAfterAllClosed().next()))}_hideNonDialogContentFromAssistiveTechnology(){let e=this._overlayContainer.getContainerElement();if(e.parentElement){let t=e.parentElement.children;for(let i=t.length-1;i>-1;i--){let o=t[i];o!==e&&o.nodeName!=="SCRIPT"&&o.nodeName!=="STYLE"&&!o.hasAttribute("aria-live")&&(this._ariaHiddenElements.set(o,o.getAttribute("aria-hidden")),o.setAttribute("aria-hidden","true"))}}}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}static \u0275fac=function(t){return new(t||a)};static \u0275prov=T({token:a,factory:a.\u0275fac,providedIn:"root"})}return a})();function b(a,l){let e=a.length;for(;e--;)l(a[e])}export{u as a,te as b,Te as c};
