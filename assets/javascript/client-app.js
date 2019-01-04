"use strict"
define("client-app/app",["exports","client-app/resolver","ember-load-initializers","client-app/config/environment"],function(e,t,n,a){Object.defineProperty(e,"__esModule",{value:!0})
var s=Ember.Application.extend({modulePrefix:a.default.modulePrefix,podModulePrefix:a.default.podModulePrefix,Resolver:t.default});(0,n.default)(s,a.default.modulePrefix),e.default=s}),define("client-app/components/actions-menu",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Component.extend({showMenu:!1,tagName:"span",init:function(){this._super.apply(this,arguments),this.bindingFunction=this.bindingFunction.bind(this)},bindingFunction:function(e){var t=this.$()[0]
Em.$.contains(t,e.target)||t===e.target||this.set("showMenu",!1)},bindDocument:Ember.observer("showMenu",function(){var e=Em.$(document)
this.get("showMenu")?e.on("click",this.get("bindingFunction")):e.unbind("click",this.get("bindingFunction"))}),actions:{expandMenu:function(){this.toggleProperty("showMenu")},share:function(){this.share()}}})}),define("client-app/components/env-tab",["exports","client-app/lib/utilities"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Component.extend({current:1,didUpdateAttrs:function(){this.set("current",1)},isEnvArray:Ember.computed("message.env",function(){return Array.isArray(this.get("message.env"))}),html:Ember.computed("isEnvArray","current",function(){if(this.get("isEnvArray")){var e=this.get("message.env")[this.get("current")-1]
return(0,t.buildHashString)(e)}return(0,t.buildHashString)(this.get("message.env"))}),disableBackButtons:Ember.computed("current",function(){return 1===this.get("current")}),disableForwardButtons:Ember.computed("current","message.env.length",function(){return this.get("current")===this.get("message.env.length")}),actions:{takeStep:function(e){var t="back"===e?-1:1
this.set("current",this.get("current")+t)},bigJump:function(e){var t="back"===e?1:this.get("message.env.length")
this.set("current",t)}}})}),define("client-app/components/message-info",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Component.extend({buttons:Ember.computed("currentMessage.{canSolve,protected}",function(){var e=this.get("currentMessage.canSolve"),t=this.get("currentMessage.protected"),n=[]
return!t&&e&&n.push({klass:"solve",action:"solve",icon:"check-square-o",label:"Solve",danger:!0}),t?n.push({klass:"unprotect",action:"unprotect",icon:"unlock",label:"Unprotect"}):n.push({klass:"remove",action:"remove",icon:"trash-o",label:"Remove",danger:!0},{klass:"protect",action:"protect",icon:"lock",label:"Protect"}),n}),actions:{protect:function(){this.get("currentMessage").protect()},unprotect:function(){this.get("currentMessage").unprotect()},remove:function(){this.removeMessage(this.get("currentMessage"))},solve:function(){this.solveMessage(this.get("currentMessage"))},share:function(){window.location.pathname=this.get("currentMessage.shareUrl")}}})}),define("client-app/components/message-row",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0})
var t=void 0,n=void 0
e.default=Ember.Component.extend({tagName:"tr",classNameBindings:["model.rowClass",":message-row","model.selected:selected"],click:function(){this.selectedMessage(this.get("model"))},willInsertElement:function(){if(!t){var e=Em.$("#top-panel"),a=e.scrollTop(),s=e.height(),i=e[0].scrollHeight
n=i-20<s+a,t=!0}},didInsertElement:function(){var e=Em.$("#top-panel")
Em.run.next(function(){t=!1,n&&(n=!1,e.scrollTop(e[0].scrollHeight-e.height()))})}})}),define("client-app/components/panel-resizer",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0})
var t=["touchmove","mousemove"],n=["touchend","mouseup"],a=["touchstart","mousedown"]
e.default=Ember.Component.extend({classNames:["divider"],divideView:function(e,t){var n=t||Em.$(window),a=n.height(),s=n.height()-e
e<100||e+170>a||(this.divider.css("bottom",s-5),this.events.trigger("panelResized",s))},didInsertElement:function(){var e=this
this.divider=Em.$(".divider")
var s=Em.$(window),i=!1,o=function(t){i&&e.divideView(t.clientY||t.touches&&t.touches[0]&&t.touches[0].clientY,s)},r=function a(){Em.$("#overlay").remove(),i=!1,localStorage&&(localStorage.logster_divider_bottom=parseInt(e.divider.css("bottom"),10))
var s=Em.$(document)
t.forEach(function(e){return s.unbind(e,o)}),n.forEach(function(e){return s.unbind(e,a)})}
this.divider.on(a.join(" "),function(e){e.preventDefault(),Em.$("<div id='overlay'></div>").appendTo(Em.$("body")),i=!0,Em.$(document).on(t.join(" "),_.throttle(o,25)).on(n.join(" "),r)}),Em.run.next(function(){if(localStorage&&localStorage.logster_divider_bottom){var t=s.height()-parseInt(localStorage.logster_divider_bottom,10)
e.divideView(t,s)}})},willDestroyElement:function(){Em.$(".divider").off(a.join(" "))}})}),define("client-app/components/tab-contents",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Component.extend({classNameBindings:["active",":content"],isLink:!1,invokeParent:function(e){for(var t=this.get("parentView");t&&!t[e];)t=t.get("parentView")
t&&t[e](this)},didInsertElement:function(){this.invokeParent("addTab"),this.get("defaultTab")&&this.invokeParent("selectTab")},willDestroyElement:function(){this.invokeParent("removeTab")}})}),define("client-app/components/tab-link",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Component.extend({isLink:!0})}),define("client-app/components/tabbed-section",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Component.extend({tabs:Em.A(),selectTab:function(e){if(e.get("isLink"))this.triggerAction(e.get("action"))
else{var t=this.get("selected")
t&&t.set("active",!1),this.set("selected",e),e.set("active",!0)}},addTab:function(e){this.get("tabs").addObject(e),this.get("selected")||e.get("isLink")||this.selectTab(e)},removeTab:function(e){this.get("selected")===e&&this.set("selected",null),this.get("tabs").removeObject(e)}})}),define("client-app/components/time-formatter",["exports","client-app/lib/utilities"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Component.extend({tagName:"span",classNames:"auto-update-time",attributeBindings:["dataTimestamp:data-timestamp","title"],title:Ember.computed(function(){return this.get("moment").format()}),dataTimestamp:Ember.computed(function(){return this.get("timestamp")}),moment:Ember.computed(function(){return moment(this.get("timestamp"))}),time:Ember.computed("timestamp",function(){return(0,t.formatTime)(this.get("timestamp"))})})}),define("client-app/components/update-time",["exports","client-app/lib/utilities"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Component.extend({didInsertElement:function(){Em.run.later(function e(){Em.$(".auto-update-time").each(function(){var e=parseInt(this.getAttribute("data-timestamp"),10),n=(0,t.formatTime)(e)
n!==this.innerText&&(this.innerText=n)}),Em.run.later(e,6e4)},6e4)}})}),define("client-app/controllers/index",["exports","client-app/lib/utilities"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Controller.extend({currentMessage:Em.computed.alias("model.currentMessage"),resizePanels:function(e){Em.$("#bottom-panel").css("height",e-13),Em.$("#top-panel").css("bottom",e+12)},actionsInMenu:Ember.computed(function(){return this.site.isMobile}),actions:{expandMessage:function(e){e.expand()},selectMessage:function(e){var t=this.get("currentMessage")
t&&t.set("selected",!1),e.set("selected",!0),this.set("currentMessage",e)},showMoreBefore:function(){this.get("model").showMoreBefore()},loadMore:function(){return this.get("model").loadMore()},clear:function(){var e=this
confirm("Clear the logs?\n\nCancel = No, OK = Clear")&&(0,t.ajax)("/clear",{type:"POST"}).then(function(){e.get("model").reload()})},removeMessage:function(e){this.get("model").destroy(e)},solveMessage:function(e){this.get("model").solve(e)}},filterChanged:Ember.observer("showDebug","showInfo","showWarn","showErr","showFatal",function(){var e=this,t=[];["Debug","Info","Warn","Err","Fatal"].forEach(function(n,a){e.get("show"+n)&&t.push(a)}),t.push(5)
var n=this.get("model")
n.set("filter",t),this.get("initialized")&&n.reload()}),searchChanged:Ember.observer("search",function(){var e=this.get("search"),t=this.get("model")
t.set("search",e),this.get("initialized")&&t.reload()})})}),define("client-app/controllers/show",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Controller.extend({actions:{protect:function(){this.get("model").protect()},unprotect:function(){this.get("model").unprotect()}}})}),define("client-app/helpers/app-version",["exports","client-app/config/environment","ember-cli-app-version/utils/regexp"],function(e,t,n){function a(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},s=t.default.APP.version,i=a.versionOnly||a.hideSha,o=a.shaOnly||a.hideVersion,r=null
return i&&(a.showExtended&&(r=s.match(n.versionExtendedRegExp)),r||(r=s.match(n.versionRegExp))),o&&(r=s.match(n.shaRegExp)),r?r[0]:s}Object.defineProperty(e,"__esModule",{value:!0}),e.appVersion=a,e.default=Ember.Helper.helper(a)}),define("client-app/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default}),define("client-app/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default}),define("client-app/initializers/app-init",["exports","client-app/lib/utilities","client-app/lib/preload"],function(e,t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=s
var a=["component","route"]
function s(e){moment.updateLocale("en",{relativeTime:{future:"in %s",past:"%s ago",s:"secs",m:"a min",mm:"%d mins",h:"an hr",hh:"%d hrs",d:"a day",dd:"%d days",M:"a mth",MM:"%d mths",y:"a yr",yy:"%d yrs"}})
var s=document.getElementById("preloaded-data").dataset;(0,n.init)(s)
var i=void 0,o=void 0;["","webkit","ms","moz","ms"].forEach(function(e){var t=e+(""===e?"hidden":"Hidden")
void 0===document[t]||i||(i=t,o=e+"visibilitychange")}),(0,t.updateHiddenProperty)(i),document.addEventListener(o,function(){(0,t.resetTitleCount)()},!1),e.register("events:main",Ember.Object.extend(Ember.Evented).create(),{instantiate:!1}),a.forEach(function(t){return e.inject(t,"events","events:main")})
var r=/mobile/i.test(navigator.userAgent)&&!/iPad/.test(navigator.userAgent)
r&&Em.$("body").addClass("mobile"),e.register("site:main",{isMobile:r},{instantiate:!1}),e.inject("controller","site","site:main")}e.default={initialize:s}}),define("client-app/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","client-app/config/environment"],function(e,t,n){Object.defineProperty(e,"__esModule",{value:!0})
var a=void 0,s=void 0
n.default.APP&&(a=n.default.APP.name,s=n.default.APP.version),e.default={name:"App Version",initialize:(0,t.default)(a,s)}}),define("client-app/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}}),define("client-app/initializers/ember-data",["exports","ember-data/setup-container","ember-data"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"ember-data",initialize:t.default}}),define("client-app/initializers/export-application-global",["exports","client-app/config/environment"],function(e,t){function n(){var e=arguments[1]||arguments[0]
if(!1!==t.default.exportApplicationGlobal){var n
if("undefined"!=typeof window)n=window
else if("undefined"!=typeof global)n=global
else{if("undefined"==typeof self)return
n=self}var a,s=t.default.exportApplicationGlobal
a="string"==typeof s?s:Ember.String.classify(t.default.modulePrefix),n[a]||(n[a]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete n[a]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=n,e.default={name:"export-application-global",initialize:n}}),define("client-app/instance-initializers/ember-data",["exports","ember-data/initialize-store-service"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"ember-data",initialize:t.default}}),define("client-app/lib/preload",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.init=function(e){t={rootPath:e.rootPath,preload:JSON.parse(e.preloaded)}}
var t=void 0
e.default={get:function(e){return Em.get(t,e)}}}),define("client-app/lib/utilities",["exports","client-app/lib/preload"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.escapeHtml=s,e.ajax=i,e.preloadOrAjax=function(e,n){var a=t.default.get("preload."+e.replace(".json",""))
return a?Em.RSVP.resolve(a):i(e,n)},e.updateHiddenProperty=function(e){o=e},e.isHidden=c,e.increaseTitleCount=function(e){if(!c())return
r=r||document.title,l=l||0,l+=e,document.title=r+" ("+l+")"},e.resetTitleCount=function(){l=0,document.title=r||document.title},e.formatTime=function(e){var t=void 0,n=moment(e),a=moment()
t=n.diff(a.startOf("day"))>0?n.format("h:mm a"):n.diff(a.startOf("week"))>0?n.format("dd h:mm a"):n.diff(a.startOf("year"))>0?n.format("D MMM h:mm a"):n.format("D MMM YY")
return t},e.buildArrayString=u,e.buildHashString=function e(t,a){if(!t)return""
var i=[]
var o=[]
_.each(t,function(e,t){null===e?i.push("null"):"[object Array]"===Object.prototype.toString.call(e)?i.push("<tr><td>"+s(t)+"</td><td>"+u(e)+"</td></tr>"):"object"===(void 0===e?"undefined":n(e))?o.push(t):i.push("<tr><td>"+s(t)+"</td><td>"+s(e)+"</td></tr>")})
_.size(o)>0&&_.each(o,function(n){var a=t[n]
i.push("<tr><td></td><td><table>"),i.push("<td>"+s(n)+"</td><td>"+e(a,!0)+"</td>"),i.push("</table></td></tr>")})
var r=a?"":"env-table"
return"<table class='"+r+"'>"+i.join("\n")+"</table>"}
var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"}
function s(e){return String(e).replace(/[&<>"'\/]/g,function(e){return a[e]})}function i(e,n){return(n=n||{}).headers=n.headers||{},n.headers["X-SILENCE-LOGGER"]=!0,Em.$.ajax(t.default.get("rootPath")+e,n)}var o=void 0,r=void 0,l=void 0
function c(){return void 0!==o?document[o]:!document.hasFocus}function u(e){var t=[]
return e.forEach(function(e){null===e?t.push("null"):"[object Array]"===Object.prototype.toString.call(e)?t.push(u(e)):t.push(s(e.toString()))}),"["+t.join(", ")+"]"}}),define("client-app/models/message-collection",["exports","client-app/lib/utilities","client-app/models/message"],function(e,t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Em.Object.extend({messages:Em.A(),currentMessage:null,total:0,solve:function(e){var t=this
e.solve().then(function(){t.reload()})},destroy:function(e){var t=this.get("messages"),n=t.indexOf(e)
e.destroy(),e.set("selected",!1),this.set("total",this.get("total")-1),this.get("messages").removeObject(e),n>0?((e=t[n-1]).set("selected",!0),this.set("currentMessage",e)):this.get("total")>0?((e=t[0]).set("selected",!0),this.set("currentMessage",e)):this.reload()},load:function(e){var n=this
e=e||{}
var a={filter:this.get("filter").join("_")},s=this.get("search")
_.isEmpty(s)||(a.search=s,this.get("regexSearch")&&(a.regex_search="true"))
e.before&&(a.before=e.before),e.after&&(a.after=e.after),(0,t.ajax)("/messages.json",{data:a}).then(function(a){if(0==Ember.compare(a.filter,n.get("filter"))&&0==Ember.compare(a.search,n.get("search"))){if(a.messages.length>0){var s=n.toMessages(a.messages),i=n.get("messages")
e.before?i.unshiftObjects(s):(s.forEach(function(e){i.forEach(function(t){t.key==e.key&&(i.removeObject(t),n.get("currentMessage")===t&&(n.set("currentMessage",e),e.set("selected",t.get("selected"))))})}),i.addObjects(s),s.length>0&&(0,t.increaseTitleCount)(s.length))}n.set("total",a.total)}})},reload:function(){this.set("total",0),this.get("messages").clear(),this.load()},loadMore:function(){var e=this.get("messages")
if(0!==e.length){var t=e[e.length-1].get("key")
this.load({after:t})}else this.load({})},moreBefore:Ember.computed("totalBefore",function(){return this.get("totalBefore")>0}),totalBefore:Ember.computed("total","messages.length",function(){return this.get("total")-this.get("messages").length}),showMoreBefore:function(){var e=this.get("messages")[0].get("key")
this.load({before:e})},regexSearch:Ember.computed("search",function(){var e=this.get("search")
if(e&&e.length>2&&"/"===e[0]){var t=e.match(/\/(.*)\/(.*)/)
if(t&&3===t.length)try{return new RegExp(t[1],t[2])}catch(n){}}}),toMessages:function(e){return e.map(function(e){return n.default.create(e)})}})}),define("client-app/models/message",["exports","client-app/lib/utilities","client-app/lib/preload"],function(e,t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Em.Object.extend({MAX_LEN:200,expand:function(){this.set("expanded",!0)},solve:function(){return(0,t.ajax)("/solve/"+this.get("key"),{type:"PUT"})},destroy:function(){return(0,t.ajax)("/message/"+this.get("key"),{type:"DELETE"})},protect:function(){return this.set("protected",!0),(0,t.ajax)("/protect/"+this.get("key"),{type:"PUT"})},unprotect:function(){return this.set("protected",!1),(0,t.ajax)("/unprotect/"+this.get("key"),{type:"DELETE"})},showCount:Ember.computed("count",function(){return this.get("count")>1}),hasMore:Ember.computed("message","expanded",function(){var e=this.get("message")
return!this.get("expanded")&&e.length>this.MAX_LEN}),shareUrl:Ember.computed("key",function(){return n.default.get("rootPath")+"/show/"+this.get("key")}),displayMessage:Ember.computed("message","expanded",function(){var e=this.get("message")
return!this.get("expanded")&&e.length>this.MAX_LEN&&(e=e.substr(0,this.MAX_LEN)),e}),updateFromObject:function(e){this.set("count",e.get("count"))},canSolve:Ember.computed(function(){var e=this.get("backtrace"),t=this.get("env")
return(Array.isArray(t)?t.map(function(e){return e.application_version}).compact().join(""):t.application_version)&&e&&e.length>0}),rowClass:Ember.computed("severity",function(){switch(this.get("severity")){case 0:return"debug"
case 1:return"info"
case 2:return"warn"
case 3:return"error"
case 4:return"fatal"}}),glyph:Ember.computed("severity",function(){switch(this.get("severity")){case 0:case 1:return""
case 2:return"<i class='fa fa-exclamation-circle warning'></i>"
case 3:return"<i class='fa fa-times-circle error'></i>"
case 4:return"<i class='fa fa-times-circle fatal'></i>"}})})}),define("client-app/resolver",["exports","ember-resolver"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default}),define("client-app/router",["exports","client-app/config/environment"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0})
var n=Ember.Router.extend({location:t.default.locationType,rootURL:t.default.rootURL})
n.map(function(){this.route("index",{path:"/"}),this.route("show",{path:"/show/:id"})}),e.default=n}),define("client-app/routes/index",["exports","client-app/models/message-collection","client-app/lib/utilities"],function(e,t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Route.extend({model:function(){return t.default.create()},setupController:function(e,t){this._super(e,t),e.setProperties({showDebug:!0,showInfo:!0,showWarn:!0,showErr:!0,showFatal:!0,search:"",initialized:!0}),t.reload()
var a=0,s=1
this.refreshInterval=setInterval(function(){a+=1
var e=(0,n.isHidden)(),i=!e
e&&a%s==0&&(i=!0,s<20&&s++),i&&(t.loadMore(),e||(s=1))},3e3),this.events.on("panelResized",function(t){e.resizePanels(t)})},deactivate:function(){clearInterval(this.refreshInterval)}})}),define("client-app/routes/show",["exports","client-app/models/message","client-app/lib/utilities"],function(e,t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Route.extend({model:function(e){return(0,n.preloadOrAjax)("/show/"+e.id+".json")},setupController:function(e,n){this._super.apply(this,arguments),e.set("model",t.default.create(n))}})})
define("client-app/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("client-app/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"yOsrYpw5",block:'{"symbols":[],"statements":[[1,[21,"update-time"],false],[0,"\\n"],[1,[21,"outlet"],false],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"client-app/templates/application.hbs"}})}),define("client-app/templates/components/actions-menu",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"ebB3+Z4x",block:'{"symbols":["&default"],"statements":[[4,"if",[[23,["actionsInMenu"]]],null,{"statements":[[4,"if",[[23,["showMenu"]]],null,{"statements":[[0,"    "],[7,"div"],[11,"class","actions-menu"],[9],[0,"\\n      "],[14,1],[0,"\\n    "],[10],[0,"\\n"]],"parameters":[]},null],[0,"  "],[7,"button"],[11,"class","expand btn no-text"],[3,"action",[[22,0,[]],"expandMenu"]],[9],[7,"i"],[11,"class","fa fa-ellipsis-h"],[9],[10],[10],[0,"\\n  "],[7,"button"],[11,"class","share btn"],[3,"action",[[22,0,[]],"share"]],[9],[7,"i"],[11,"class","fa fa-share"],[9],[10],[7,"span"],[9],[0,"Share"],[10],[10],[0,"\\n"]],"parameters":[]},{"statements":[[0,"  "],[14,1],[0,"\\n  "],[7,"button"],[11,"class","share btn"],[3,"action",[[22,0,[]],"share"]],[9],[7,"i"],[11,"class","fa fa-share"],[9],[10],[7,"span"],[9],[0,"Share"],[10],[10],[0,"\\n"]],"parameters":[]}]],"hasEval":false}',meta:{moduleName:"client-app/templates/components/actions-menu.hbs"}})}),define("client-app/templates/components/env-tab",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"5078JpTW",block:'{"symbols":[],"statements":[[4,"if",[[23,["isEnvArray"]]],null,{"statements":[[0,"  "],[7,"div"],[11,"class","nav-controls"],[9],[0,"\\n    "],[7,"button"],[12,"disabled",[21,"disableBackButtons"]],[11,"class","btn nav-btn no-text"],[3,"action",[[22,0,[]],"bigJump","back"]],[9],[7,"i"],[11,"class","fa fa-fast-backward"],[9],[10],[10],[0,"\\n    "],[7,"button"],[12,"disabled",[21,"disableBackButtons"]],[11,"class","btn nav-btn no-text"],[3,"action",[[22,0,[]],"takeStep","back"]],[9],[7,"i"],[11,"class","fa fa-backward"],[9],[10],[10],[0,"\\n    "],[7,"span"],[11,"class","env-number"],[9],[1,[21,"current"],false],[0,"/"],[1,[23,["message","env","length"]],false],[10],[0,"\\n    "],[7,"button"],[12,"disabled",[21,"disableForwardButtons"]],[11,"class","btn nav-btn no-text"],[3,"action",[[22,0,[]],"takeStep","front"]],[9],[7,"i"],[11,"class","fa fa-forward"],[9],[10],[10],[0,"\\n    "],[7,"button"],[12,"disabled",[21,"disableForwardButtons"]],[11,"class","btn nav-btn no-text"],[3,"action",[[22,0,[]],"bigJump","front"]],[9],[7,"i"],[11,"class","fa fa-fast-forward"],[9],[10],[10],[0,"\\n  "],[10],[0,"\\n"]],"parameters":[]},null],[1,[21,"html"],true],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"client-app/templates/components/env-tab.hbs"}})}),define("client-app/templates/components/message-info",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"SK12lkYh",block:'{"symbols":["btn"],"statements":[[7,"div"],[11,"class","message-info"],[9],[0,"\\n"],[4,"tabbed-section",null,null,{"statements":[[4,"tab-contents",null,[["name","hint","currentMessage"],["info","show info",[23,["currentMessage"]]]],{"statements":[[4,"if",[[23,["showTitle"]]],null,{"statements":[[0,"        "],[7,"h3"],[9],[0,"Message\\n"],[4,"if",[[23,["currentMessage","showCount"]]],null,{"statements":[[0,"            ("],[1,[23,["currentMessage","count"]],false],[0," copies reported)\\n"]],"parameters":[]},null],[0,"        "],[10],[0,"\\n"]],"parameters":[]},null],[0,"      "],[7,"pre"],[9],[1,[23,["currentMessage","message"]],false],[10],[0,""]],"parameters":[]},null],[4,"tab-contents",null,[["name","defaultTab","hint","currentMessage"],["backtrace","true","show backtrace",[23,["currentMessage"]]]],{"statements":[[4,"if",[[23,["showTitle"]]],null,{"statements":[[0,"        "],[7,"h3"],[9],[0,"Backtrace"],[10],[0,"\\n"]],"parameters":[]},null],[0,"      "],[7,"pre"],[9],[1,[23,["currentMessage","backtrace"]],false],[10],[0,""]],"parameters":[]},null],[4,"if",[[23,["currentMessage","env"]]],null,{"statements":[[4,"tab-contents",null,[["className","name","hint","currentMessage"],["env","env","show environment",[23,["currentMessage"]]]],{"statements":[[4,"if",[[23,["showTitle"]]],null,{"statements":[[0,"          "],[7,"h3"],[9],[0,"Env"],[10],[0,"\\n"]],"parameters":[]},null],[0,"        "],[1,[27,"env-tab",null,[["message"],[[23,["currentMessage"]]]]],false],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null]],"parameters":[]},null],[0,"\\n"],[4,"if",[[23,["currentMessage"]]],null,{"statements":[[0,"    "],[7,"div"],[11,"class","message-actions"],[9],[0,"\\n"],[4,"actions-menu",null,[["actionsInMenu","share"],[[23,["actionsInMenu"]],[27,"action",[[22,0,[]],"share"],null]]],{"statements":[[4,"each",[[23,["buttons"]]],null,{"statements":[[0,"          "],[7,"button"],[12,"class",[28,[[22,1,["klass"]]," btn ",[27,"if",[[22,1,["danger"]],"danger",""],null]]]],[3,"action",[[22,0,[]],[22,1,["action"]]]],[9],[0,"\\n            "],[7,"i"],[12,"class",[28,["fa fa-",[22,1,["icon"]]]]],[9],[10],[0,"\\n            "],[7,"span"],[9],[1,[22,1,["label"]],false],[10],[0,"\\n          "],[10],[0,"\\n"]],"parameters":[1]},null]],"parameters":[]},null],[0,"    "],[10],[0,"\\n"]],"parameters":[]},null],[10],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"client-app/templates/components/message-info.hbs"}})}),define("client-app/templates/components/message-row",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"QT7t0R6S",block:'{"symbols":[],"statements":[[7,"td"],[11,"class","count"],[9],[0,"\\n"],[4,"if",[[23,["model","showCount"]]],null,{"statements":[[0,"    "],[7,"span"],[9],[1,[23,["model","count"]],false],[10],[0,"\\n"]],"parameters":[]},null],[10],[0,"\\n"],[7,"td"],[11,"class","severity"],[9],[1,[23,["model","glyph"]],true],[10],[0,"\\n"],[7,"td"],[11,"class","message-body"],[9],[0,"\\n  "],[7,"div"],[11,"class","message"],[9],[0,"\\n    "],[1,[23,["model","displayMessage"]],false],[0,"\\n  "],[10],[0,"\\n"],[10],[0,"\\n"],[7,"td"],[11,"class","protected"],[9],[0,"\\n"],[4,"if",[[23,["model","protected"]]],null,{"statements":[[0,"    "],[7,"i"],[11,"title","message is protected, clearing will not remove it"],[11,"class","fa fa-lock"],[9],[10],[0,"\\n"]],"parameters":[]},null],[10],[0,"\\n"],[7,"td"],[11,"class","time"],[9],[1,[27,"time-formatter",null,[["timestamp"],[[23,["model","timestamp"]]]]],false],[10],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"client-app/templates/components/message-row.hbs"}})}),define("client-app/templates/components/panel-resizer",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"FLUzT7ST",block:'{"symbols":[],"statements":[[7,"div"],[11,"class","line-1"],[9],[10],[0,"\\n"],[7,"div"],[11,"class","line-2"],[9],[10],[0,"\\n"],[7,"div"],[11,"class","line-3"],[9],[10],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"client-app/templates/components/panel-resizer.hbs"}})}),define("client-app/templates/components/tabbed-section",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"nreTgL17",block:'{"symbols":["tab","&default"],"statements":[[14,2],[0,"\\n"],[7,"ul"],[11,"class","tabs"],[9],[0,"\\n"],[4,"each",[[23,["tabs"]]],null,{"statements":[[0,"    "],[7,"li"],[9],[0,"\\n      "],[7,"a"],[12,"title",[28,[[27,"unbound",[[22,1,["hint"]]],null]]]],[11,"href","#"],[12,"class",[28,[[27,"if",[[22,1,["active"]],"active"],null]]]],[3,"action",[[22,0,[]],[23,["selectTab"]],[22,1,[]]]],[9],[0,"\\n        "],[1,[27,"unbound",[[22,1,["name"]]],null],false],[0,"\\n      "],[10],[0,"\\n    "],[10],[0,"\\n"]],"parameters":[1]},null],[10],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"client-app/templates/components/tabbed-section.hbs"}})}),define("client-app/templates/components/time-formatter",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"sp53cTcH",block:'{"symbols":[],"statements":[[1,[21,"time"],false],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"client-app/templates/components/time-formatter.hbs"}})}),define("client-app/templates/index",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"zPUWk0aI",block:'{"symbols":["message"],"statements":[[7,"div"],[11,"id","top-panel"],[9],[0,"\\n  "],[7,"table"],[11,"id","log-table"],[9],[0,"\\n    "],[7,"thead"],[9],[0,"\\n      "],[7,"tr"],[9],[0,"\\n        "],[7,"th"],[11,"class","count"],[9],[10],[0,"\\n        "],[7,"th"],[11,"class","severity"],[9],[10],[0,"\\n        "],[7,"th"],[11,"class","info"],[9],[10],[0,"\\n        "],[7,"th"],[11,"class","protected"],[9],[10],[0,"\\n        "],[7,"th"],[11,"class","time"],[9],[10],[0,"\\n      "],[10],[0,"\\n    "],[10],[0,"\\n    "],[7,"tbody"],[9],[0,"\\n"],[4,"if",[[23,["model","moreBefore"]]],null,{"statements":[[0,"      "],[7,"tr"],[11,"class","show-more"],[3,"action",[[22,0,[]],"showMoreBefore"]],[9],[0,"\\n        "],[7,"td"],[11,"colspan","5"],[9],[0,"select to see "],[1,[23,["model","totalBefore"]],false],[0," more"],[10],[0,"\\n      "],[10],[0,"\\n"]],"parameters":[]},null],[4,"each",[[23,["model","messages"]]],null,{"statements":[[0,"      "],[1,[27,"message-row",null,[["model","selectedMessage"],[[22,1,[]],[27,"action",[[22,0,[]],"selectMessage"],null]]]],false],[0,"\\n"]],"parameters":[1]},null],[0,"    "],[10],[0,"\\n  "],[10],[0,"\\n"],[10],[0,"\\n"],[7,"div"],[11,"id","bottom-panel"],[9],[0,"\\n  "],[1,[27,"message-info",null,[["currentMessage","removeMessage","solveMessage","actionsInMenu"],[[23,["currentMessage"]],[27,"action",[[22,0,[]],"removeMessage"],null],[27,"action",[[22,0,[]],"solveMessage"],null],[23,["actionsInMenu"]]]]],false],[0,"\\n\\n  "],[7,"div"],[11,"class","action-panel"],[9],[0,"\\n    "],[7,"div"],[11,"class","severity-filters"],[9],[0,"\\n    "],[7,"div"],[11,"class","more-wrapping"],[9],[0,"\\n      "],[7,"label"],[11,"class","debug"],[9],[0,"\\n        "],[1,[27,"input",null,[["type","checked"],["checkbox",[23,["showDebug"]]]]],false],[0,"\\n        "],[7,"span"],[9],[0,"Debug"],[10],[0,"\\n      "],[10],[0,"\\n      "],[7,"label"],[11,"class","info"],[9],[0,"\\n        "],[1,[27,"input",null,[["type","checked"],["checkbox",[23,["showInfo"]]]]],false],[0,"\\n        "],[7,"span"],[9],[0,"Info"],[10],[0,"\\n      "],[10],[0,"\\n      "],[7,"label"],[11,"class","warn"],[9],[0,"\\n        "],[1,[27,"input",null,[["type","checked"],["checkbox",[23,["showWarn"]]]]],false],[0,"\\n        "],[7,"i"],[11,"class","fa fa-exclamation-circle warning"],[9],[10],[0,"\\n        "],[7,"span"],[9],[0,"Warning"],[10],[0,"\\n      "],[10],[0,"\\n      "],[7,"label"],[11,"class","error"],[9],[0,"\\n        "],[1,[27,"input",null,[["type","checked"],["checkbox",[23,["showErr"]]]]],false],[0,"\\n        "],[7,"i"],[11,"class","fa fa-times-circle error"],[9],[10],[0,"\\n        "],[7,"span"],[9],[0,"Error"],[10],[0,"\\n      "],[10],[0,"\\n      "],[7,"label"],[11,"class","fatal"],[9],[0,"\\n        "],[1,[27,"input",null,[["type","checked"],["checkbox",[23,["showFatal"]]]]],false],[0,"\\n        "],[7,"i"],[11,"class","fa fa-times-circle fatal"],[9],[10],[0,"\\n        "],[7,"span"],[9],[0,"Fatal"],[10],[0,"\\n      "],[10],[0,"\\n    "],[10],[0,"\\n    "],[10],[0,"\\n    "],[7,"div"],[11,"class","search-clear-all"],[9],[0,"\\n      "],[1,[27,"input",null,[["type","class","placeholder","value"],["textfield","search","Search",[23,["search"]]]]],false],[0,"\\n      "],[7,"button"],[11,"class","clear btn danger"],[3,"action",[[22,0,[]],"clear"]],[9],[7,"i"],[11,"class","fa fa-times"],[9],[10],[7,"span"],[9],[0,"Clear logs"],[10],[10],[0,"\\n    "],[10],[0,"\\n  "],[10],[0,"\\n"],[10],[0,"\\n"],[1,[21,"panel-resizer"],false],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"client-app/templates/index.hbs"}})}),define("client-app/templates/show",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"V916vpg9",block:'{"symbols":[],"statements":[[4,"link-to",["index"],null,{"statements":[[0,"Recent"]],"parameters":[]},null],[0,"\\n"],[7,"div"],[11,"id","bottom-panel"],[11,"class","full"],[9],[0,"\\n  "],[1,[27,"message-info",null,[["currentMessage","showTitle","actionsInMenu"],[[23,["model"]],"true",false]]],false],[0,"\\n"],[10],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"client-app/templates/show.hbs"}})}),define("client-app/config/environment",[],function(){try{var e="client-app/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),n={default:JSON.parse(unescape(t))}
return Object.defineProperty(n,"__esModule",{value:!0}),n}catch(a){throw new Error('Could not read config from meta tag with name "'+e+'".')}}),runningTests||require("client-app/app").default.create({name:"client-app",version:"0.0.0+e43e98dc"})
