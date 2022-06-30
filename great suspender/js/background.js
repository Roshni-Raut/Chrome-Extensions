var tgs=function(){"use strict";const e={16:"../images/icon-16x16.png",32:"../images/icon-32x32.png"},t={16:"../images/icon-16x16_grey.png",32:"../images/icon-32x32_grey.png"},s="timerDetails",n="whitelistOnReload",i="disableUnsuspendOnReload",o="unloadedUrl",a="suspendReason",r="scrollPos",d=500,u=9e5,c=846e5,g={},l={},b={};let T,f,p,S,h,m,U,w=!1,_=!1;function I(){const e={tgs:tgs,gsUtils:gsUtils,gsChrome:gsChrome,gsStorage:gsStorage,gsIndexedDb:gsIndexedDb,gsMessages:gsMessages,gsSession:gsSession,gsFavicon:gsFavicon,gsTabCheckManager:gsTabCheckManager,gsTabSuspendManager:gsTabSuspendManager,gsTabDiscardManager:gsTabDiscardManager,gsSuspendedTab:gsSuspendedTab};for(const t of Object.values(e))if(!t)return null;return e}function v(e){const t=chrome.extension.getViews({tabId:e});return 1===t.length?t[0]:null}function A(e){return chrome.extension.getViews().filter((t=>t.location.pathname.indexOf(e)>=0))}function N(e){!async function(){const t=await gsChrome.tabsQuery({active:!0,currentWindow:!0});if(t.length>0)return void e(t[0]);const s=await gsChrome.windowsGetLastFocused();if(s){const t=await gsChrome.tabsQuery({active:!0,windowId:s.id});if(t.length>0)return void e(t[0])}if(f){const t=await gsChrome.tabsQuery({active:!0,windowId:f});if(t.length>0)return void e(t[0]);const s=b[f];if(s){const t=await gsChrome.tabsGet(s);if(null!==t)return void e(t)}}e(null)}()}function M(e){if(e.windowId!==T)return!1;var t=l[e.windowId];return t?e.id===t:e.active}function E(e){e=e||!1,N((function(t){if(t)if(gsUtils.isSuspendedTab(t)){let s=gsUtils.getRootUrl(gsUtils.getOriginalUrl(t.url),e,!1);gsUtils.saveToWhitelist(s),V(t)}else if(gsUtils.isNormalTab(t)){let s=gsUtils.getRootUrl(t.url,e,!1);gsUtils.saveToWhitelist(s),Y(t,null,(function(e){z(e,t.id)}))}}))}function O(e){N((function(t){if(t){if(gsUtils.isSuspendedTab(t)){const s=v(t.id);return s&&(j(t.id,n,!0),gsSuspendedTab.requestUnsuspendTab(s,t)),void(e&&e(gsUtils.STATUS_UNKNOWN))}gsUtils.isNormalTab(t,!0)?Y(t,null,(function(s){s===gsUtils.STATUS_ACTIVE||s===gsUtils.STATUS_NORMAL?function(e,t){gsMessages.sendTemporaryWhitelistToContentScript(e.id,(function(s,n){s&&gsUtils.warning(e.id,"Failed to sendTemporaryWhitelistToContentScript",s);var i=n&&n.status?n.status:null;Y(e,i,(function(s){z(s,e.id),"tempWhitelist"===s&&e.autoDiscardable&&chrome.tabs.update(e.id,{autoDiscardable:!1}),t&&t(s)}))}))}(t,e):s===gsUtils.STATUS_TEMPWHITELIST||s===gsUtils.STATUS_FORMINPUT?function(e,t){gsMessages.sendUndoTemporaryWhitelistToContentScript(e.id,(function(s,n){s&&gsUtils.warning(e.id,"Failed to sendUndoTemporaryWhitelistToContentScript",s);var i=n&&n.status?n.status:null;Y(e,i,(function(s){z(s,e.id),"tempWhitelist"===s||e.autoDiscardable||chrome.tabs.update(e.id,{autoDiscardable:!0}),t&&t(s)}))}))}(t,e):e&&e(s)})):e&&e(gsUtils.STATUS_UNKNOWN)}else e&&e(status)}))}function x(){N((e=>{e&&(gsUtils.isSuspendedTab(e)?V(e):gsTabSuspendManager.queueTabForSuspension(e,1))}))}function C(e){const t=e?1:2;N((e=>{e?chrome.windows.get(e.windowId,{populate:!0},(e=>{for(const s of e.tabs)s.active||gsTabSuspendManager.queueTabForSuspension(s,t)})):gsUtils.warning("background","Could not determine currently active window.")}))}function y(e){const t=e?1:2;chrome.tabs.query({},(e=>{for(const s of e)gsTabSuspendManager.queueTabForSuspension(s,t)}))}function P(){N((function(e){e?chrome.windows.get(e.windowId,{populate:!0},(e=>{for(const t of e.tabs)gsTabSuspendManager.unqueueTabForSuspension(t),gsUtils.isSuspendedTab(t)?V(t):gsUtils.isNormalTab(t)&&!t.active&&L(t)})):gsUtils.warning("background","Could not determine currently active window.")}))}function D(){chrome.windows.getLastFocused({},(e=>{chrome.tabs.query({},(t=>{var s=[];for(const n of t)gsTabSuspendManager.unqueueTabForSuspension(n),gsUtils.isSuspendedTab(n)?n.windowId===e.id?s.push(n):V(n):gsUtils.isNormalTab(n)&&L(n);for(const e of s)V(e)}))}))}function k(){chrome.tabs.query({highlighted:!0,lastFocusedWindow:!0},(e=>{for(const t of e)gsTabSuspendManager.queueTabForSuspension(t,1)}))}function F(){chrome.tabs.query({highlighted:!0,lastFocusedWindow:!0},(e=>{for(const t of e)gsTabSuspendManager.unqueueTabForSuspension(t),gsUtils.isSuspendedTab(t)&&V(t)}))}function R(){clearTimeout(p),p=setTimeout((function(){gsUtils.log("background","updating current session"),gsSession.updateCurrentSession()}),1e3)}function L(e){W(e.id);const t=gsStorage.getOption(gsStorage.SUSPEND_TIME),n=6e4*t;if(gsUtils.isProtectedActiveTab(e)||isNaN(t)||t<=0)return;const i={};i.tabId=e.id,i.suspendDateTime=new Date((new Date).getTime()+n),i.timer=setTimeout((async()=>{const e=i.tabId,t=await gsChrome.tabsGet(e);t?gsTabSuspendManager.queueTabForSuspension(t,3):gsUtils.warning(e,"Couldnt find tab. Aborting suspension")}),n),gsUtils.log(e.id,"Adding tab timer for: "+i.suspendDateTime),j(e.id,s,i)}function q(){chrome.tabs.query({},(e=>{for(const t of e)gsUtils.isNormalTab(t)&&L(t)}))}function W(e){const t=G(e,s);t&&(gsUtils.log(e,"Removing tab timer."),clearTimeout(t.timer),j(e,s,null))}function G(e,t){return g[e]?g[e][t]:void 0}function j(e,t,s){const n=g[e]||{};n[t]=s,g[e]=n}function H(e){gsUtils.log(e,"Clearing tab state props:",g[e]),W(e),delete g[e]}function V(e){if(!gsUtils.isSuspendedTab(e))return;const t=gsUtils.getSuspendedScrollPosition(e.url);if(tgs.setTabStatePropForTabId(e.id,tgs.STATE_SCROLL_POS,t),gsUtils.isDiscardedTab(e))return gsUtils.log(e.id,"Unsuspending discarded tab via reload"),j(e.id,o,e.url),void gsChrome.tabsReload(e.id);const s=v(e.id);if(s)return gsUtils.log(e.id,"Requesting unsuspend via gsSuspendedTab"),void gsSuspendedTab.requestUnsuspendTab(s,e);let n=gsUtils.getOriginalUrl(e.url);if(n)return gsUtils.log(e.id,"Unsuspending tab via chrome.tabs.update"),void chrome.tabs.update(e.id,{url:n});gsUtils.log(e.id,"Failed to execute unsuspend tab.")}function B(){return new Promise((e=>{let t="";chrome.commands.getAll((s=>{const n=s.find((e=>"1-suspend-tab"===e.name));n&&""!==n.shortcut?(t=gsUtils.formatHotkeyString(n.shortcut),e(t)):e(null)}))}))}function K(e,t,s){return new Promise(((n,i)=>{const o=gsStorage.getOption(gsStorage.IGNORE_FORMS);gsMessages.sendInitTabToContentScript(e.id,o,t,s,((e,t)=>{e?i(e):n(t)}))}))}function Q(e,t,s){if(gsUtils.log(e,"new stationary tab focus handled"),gsUtils.isSuspendedTab(s))!async function(e){"loading"!==e.status&&gsTabCheckManager.queueTabCheck(e,{refetchTab:!1},0);if(gsStorage.getOption(gsStorage.UNSUSPEND_ON_FOCUS))if(navigator.onLine)V(e);else{const t=v(e.id);t&&gsSuspendedTab.showNoConnectivityMessage(t)}}(s);else if(gsUtils.isNormalTab(s)){const n=gsTabSuspendManager.getQueuedTabDetails(s);if(n){const i=t&&t!==e,o=n.executionProps.forceLevel>1;i&&o&&gsTabSuspendManager.unqueueTabForSuspension(s)}}else if(s.url===chrome.extension.getURL("options.html")){const e=v(s.id);e&&e.exports&&e.exports.initSettings()}t&&t!==e&&chrome.tabs.get(t,(function(e){chrome.runtime.lastError||e&&gsUtils.isNormalTab(e)&&!gsUtils.isProtectedActiveTab(e)&&L(e)}))}function $(){return m}function X(e,t){return new Promise((function(s){t?s(t):gsMessages.sendRequestInfoToContentScript(e,(function(t,n){t&&gsUtils.warning(e,"Failed to getContentScriptStatus",t),s(n?n.status:null)}))}))}function Y(e,t,s){"loading"!==e.status?gsUtils.isBlockedFileTab(e)?s(gsUtils.STATUS_BLOCKED_FILE):gsUtils.isSpecialTab(e)?s(gsUtils.STATUS_SPECIAL):gsUtils.isDiscardedTab(e)?s(gsUtils.STATUS_DISCARDED):gsUtils.isSuspendedTab(e)?s(gsUtils.STATUS_SUSPENDED):gsUtils.checkWhiteList(e.url)?s(gsUtils.STATUS_WHITELISTED):"0"!==gsStorage.getOption(gsStorage.SUSPEND_TIME)?X(e.id,t).then((t=>{t&&t!==gsUtils.STATUS_NORMAL?s(t):gsStorage.getOption(gsStorage.IGNORE_WHEN_CHARGING)&&w?s(gsUtils.STATUS_CHARGING):!gsStorage.getOption(gsStorage.IGNORE_WHEN_OFFLINE)||navigator.onLine?gsUtils.isProtectedPinnedTab(e)?s(gsUtils.STATUS_PINNED):gsUtils.isProtectedAudibleTab(e)?s(gsUtils.STATUS_AUDIBLE):gsUtils.isProtectedActiveTab(e)?s(gsUtils.STATUS_ACTIVE):s(t||gsUtils.STATUS_UNKNOWN):s(gsUtils.STATUS_NOCONNECTIVITY)})):s(gsUtils.STATUS_NEVER):s(gsUtils.STATUS_LOADING)}function z(s,n){var i=[gsUtils.STATUS_NORMAL,gsUtils.STATUS_ACTIVE].includes(s)?e:t;chrome.browserAction.setIcon({path:i,tabId:n},(function(){chrome.runtime.lastError&&gsUtils.warning(n,chrome.runtime.lastError,"Failed to set icon for tab. Tab may have been closed.")}))}function J(){N((function(e){e&&Y(e,null,(function(t){z(t,e.id)}))}))}function Z(e){const t=["page","frame","editable","image","video","audio"];e?(chrome.contextMenus.create({title:chrome.i18n.getMessage("js_context_open_link_in_suspended_tab"),contexts:["link"],onclick:(e,t)=>{var s,n;s=t,n=e.linkUrl,chrome.tabs.query({windowId:chrome.windows.WINDOW_ID_CURRENT},(e=>{for(var t=s.index+1,i=e[t];i&&i.openerTabId===s.id;)i=e[++t];var o={url:n,index:t,openerTabId:s.id,active:!1};chrome.tabs.create(o,(e=>{gsTabSuspendManager.queueTabForSuspension(e,1)}))}))}}),chrome.contextMenus.create({title:chrome.i18n.getMessage("js_context_toggle_suspend_state"),contexts:t,onclick:()=>x()}),chrome.contextMenus.create({title:chrome.i18n.getMessage("js_context_toggle_pause_suspension"),contexts:t,onclick:()=>O()}),chrome.contextMenus.create({title:chrome.i18n.getMessage("js_context_never_suspend_page"),contexts:t,onclick:()=>E(!0)}),chrome.contextMenus.create({title:chrome.i18n.getMessage("js_context_never_suspend_domain"),contexts:t,onclick:()=>E(!1)}),chrome.contextMenus.create({type:"separator",contexts:t}),chrome.contextMenus.create({title:chrome.i18n.getMessage("js_context_suspend_selected_tabs"),contexts:t,onclick:()=>k()}),chrome.contextMenus.create({title:chrome.i18n.getMessage("js_context_unsuspend_selected_tabs"),contexts:t,onclick:()=>F()}),chrome.contextMenus.create({type:"separator",contexts:t}),chrome.contextMenus.create({title:chrome.i18n.getMessage("js_context_soft_suspend_other_tabs_in_window"),contexts:t,onclick:()=>C(!1)}),chrome.contextMenus.create({title:chrome.i18n.getMessage("js_context_force_suspend_other_tabs_in_window"),contexts:t,onclick:()=>C(!0)}),chrome.contextMenus.create({title:chrome.i18n.getMessage("js_context_unsuspend_all_tabs_in_window"),contexts:t,onclick:()=>P()}),chrome.contextMenus.create({type:"separator",contexts:t}),chrome.contextMenus.create({title:chrome.i18n.getMessage("js_context_soft_suspend_all_tabs"),contexts:t,onclick:()=>y(!1)}),chrome.contextMenus.create({title:chrome.i18n.getMessage("js_context_force_suspend_all_tabs"),contexts:t,onclick:()=>y(!0)}),chrome.contextMenus.create({title:chrome.i18n.getMessage("js_context_unsuspend_all_tabs"),contexts:t,onclick:()=>D()})):chrome.contextMenus.removeAll()}function ee(e,t,s){if(gsUtils.log(t.tab.id,"background messageRequestListener",e.action),"reportTabState"===e.action){var n=e&&e.status?e.status:null;return"formInput"===n||"tempWhitelist"===n?chrome.tabs.update(t.tab.id,{autoDiscardable:!1}):t.tab.autoDiscardable||chrome.tabs.update(t.tab.id,{autoDiscardable:!0}),t.tab&&M(t.tab)&&Y(t.tab,n,(function(e){z(e,t.tab.id)})),s(),!1}return"savePreviewData"===e.action?(gsTabSuspendManager.handlePreviewImageResponse(t.tab,e.previewUrl,e.errorMsg),s(),!1):(s(),!1)}function te(e,t,s){if(gsUtils.log("background","external message request: ",e,t),e.action&&["suspend","unsuspend"].includes(e.action))return async function(){let t;if(e.tabId){if("number"!=typeof e.tabId)return void s("Error: tabId must be an int");if(t=await gsChrome.tabsGet(e.tabId),!t)return void s("Error: no tab found with id: "+e.tabId)}else t=await new Promise((e=>{N(e)}));if(t)return"suspend"===e.action?gsUtils.isSuspendedTab(t,!0)?void s("Error: tab is already suspended"):(gsTabSuspendManager.queueTabForSuspension(t,1),void s()):"unsuspend"===e.action?gsUtils.isSuspendedTab(t)?(V(t),void s()):void s("Error: tab is not suspended"):void 0;s("Error: failed to find a target tab")}(),!0;s("Error: unknown request.action: "+e.action)}return{STATE_TIMER_DETAILS:s,STATE_UNLOADED_URL:o,STATE_TEMP_WHITELIST_ON_RELOAD:n,STATE_DISABLE_UNSUSPEND_ON_RELOAD:i,STATE_SUSPEND_REASON:a,STATE_SCROLL_POS:r,STATE_SHOW_NAG:"showNag",getTabStatePropForTabId:G,setTabStatePropForTabId:j,backgroundScriptsReadyAsPromised:function e(t){return(t=t||0)>300?(chrome.tabs.create({url:chrome.extension.getURL("broken.html")}),Promise.reject("Failed to initialise background scripts")):new Promise((function(e){e(null!==I())})).then((function(s){return s?Promise.resolve():new Promise((function(e){window.setTimeout(e,100)})).then((function(){return e(t+=1)}))}))},initAsPromised:function(){return new Promise((async function(e){(gsUtils.log("background","PERFORMING BACKGROUND INIT..."),chrome.commands.onCommand.addListener((function(e){"1-suspend-tab"===e?x():"2-toggle-temp-whitelist-tab"===e?O():"2a-suspend-selected-tabs"===e?k():"2b-unsuspend-selected-tabs"===e?F():"3-suspend-active-window"===e?C(!1):"3b-force-suspend-active-window"===e?C(!0):"4-unsuspend-active-window"===e?P():"4b-soft-suspend-all-windows"===e?y(!1):"5-suspend-all-windows"===e?y(!0):"6-unsuspend-all-windows"===e&&D()})),chrome.runtime.onMessage.addListener(ee),chrome.runtime.onMessageExternal.addListener(te),chrome.windows.onFocusChanged.addListener((function(e){!function(e){gsUtils.log(e,"window gained focus"),e<0||e===T||(T=e,chrome.tabs.query({active:!0},(function(t){if(t&&t.length){var s;for(var n of t)n.windowId===e&&(s=n);s?(Y(s,null,(function(e){z(e,s.id)})),function(e,t,s){clearTimeout(h),h=setTimeout((function(){var n=f;f=t;var i=b[n];Q(e,i,s)}),500)}(s.id,e,s)):gsUtils.warning("background",`Couldnt find active tab with windowId: ${e}. Window may have been closed.`)}})))}(e)})),chrome.tabs.onActivated.addListener((function(e){!async function(e,t){gsUtils.log(e,"tab gained focus");const s=await gsChrome.tabsGet(e);if(!s)return void gsUtils.log(e,"Could not find newly focused tab. Assuming it has been discarded");const n=l[t];if(l[t]=e,_){const e=U;if(U=await B(),e!==U){const e=A("suspended");for(const t of e)gsSuspendedTab.updateCommand(t,U)}_=!1}gsTabDiscardManager.unqueueTabForDiscard(s);let i=null;gsUtils.isNormalTab(s,!0)&&(i=await X(s.id),i||(i=await gsTabCheckManager.queueTabCheckAsPromise(s,{},0)),gsUtils.log(s.id,"Content script status: "+i));const o=await new Promise((e=>{Y(s,i,e)}));if(gsUtils.log(s.id,"Focused tab status: "+o),l[t]===s.id&&z(o,s.id),function(e,t,s){clearTimeout(S),S=setTimeout((function(){var n=b[t];b[t]=s.id,Q(e,n,s)}),d)}(e,t,s),"chrome://extensions/shortcuts"===s.url&&(_=!0),!gsStorage.getOption(gsStorage.DISCARD_AFTER_SUSPEND))return;const a=n?await gsChrome.tabsGet(n):null;a?gsUtils.isSuspendedTab(a)&&(gsUtils.log(n,"Queueing previously focused tab for discard via tabCheckManager"),gsTabCheckManager.queueTabCheck(a,{},1e3)):gsUtils.log(n,"Could not find tab. Has probably already been discarded")}(e.tabId,e.windowId)})),chrome.tabs.onReplaced.addListener((function(e,t){!function(e,t){gsUtils.log(t,"update tabId references to "+e);for(const s of Object.keys(l))l[s]===t&&(l[s]=e);for(const s of Object.keys(b))b[s]===t&&(b[s]=e);g[t]&&(g[e]=g[t],delete g[t]);const n=G(e,s);n&&(n.tabId=e)}(e,t)})),chrome.tabs.onCreated.addListener((async function(e){gsUtils.log(e.id,"tab created. tabUrl: "+e.url),R(),gsUtils.isSuspendedTab(e)&&!e.active&&gsTabCheckManager.queueTabCheck(e,{},5e3)})),chrome.tabs.onRemoved.addListener((function(e,t){gsUtils.log(e,"tab removed."),R(),function(e){gsUtils.log(e,"removing tabId references to "+e);for(const t of Object.keys(l))l[t]===e&&(l[t]=null);for(const t of Object.keys(b))b[t]===e&&(b[t]=null);H(e)}(e)})),chrome.tabs.onUpdated.addListener((function(e,t,s){t&&(t.url&&(gsUtils.log(e,"tab url changed. changeInfo: ",t),function(e,t){t.indexOf("greatsuspender.github.io/thanks.html")>0?(gsStorage.setOptionAndSync(gsStorage.NO_NAG,!0),chrome.tabs.update(e.id,{url:chrome.extension.getURL("html/thanks.html")})):"chrome://extensions/shortcuts"===t&&(_=!0)}(s,t.url),R()),gsUtils.isSuspendedTab(s)?function(e,t){if(t.hasOwnProperty("status")&&(gsUtils.log(e.id,"suspended tab status changed. changeInfo: ",t),"loading"!==t.status&&"complete"===t.status)){gsTabSuspendManager.unqueueTabForSuspension(e);const t=G(e.id,o),s=G(e.id,i);let n=tgs.getTabStatePropForTabId(e.id,tgs.STATE_SHOW_NAG);if(H(e.id),M(e)&&z(gsUtils.STATUS_SUSPENDED,e.id),t===e.url&&!s)return void V(e);const a=tgs.getInternalViewByTabId(e.id),r=gsStorage.getOption(gsStorage.DISCARD_AFTER_SUSPEND)&&!e.active;gsSuspendedTab.initTab(e,a,{quickInit:r,showNag:n}).catch((t=>{gsUtils.warning(e.id,t)})).then((()=>{gsTabCheckManager.queueTabCheck(e,{refetchTab:!0},3e3)}))}}(s,t):gsUtils.isNormalTab(s)&&function(e,t){if(!(t.hasOwnProperty("status")||t.hasOwnProperty("audible")||t.hasOwnProperty("pinned")||t.hasOwnProperty("discarded")))return;if(gsUtils.log(e.id,"unsuspended tab state changed. changeInfo: ",t),t.hasOwnProperty("status")&&"loading"===t.status&&j(e.id,o,null),t.hasOwnProperty("discarded")&&t.discarded){const t=G(e.id,a);if(t&&3===t)return;return gsUtils.log(e.id,"Unsuspended tab has been discarded. Url: "+e.url),gsTabDiscardManager.handleDiscardedUnsuspendedTab(e),void R()}const s=gsTabSuspendManager.getQueuedTabDetails(e);if(s)return delete s.executionProps.refetchTab,void gsTabSuspendManager.queueTabForSuspension(e,s.executionProps.forceLevel);let i=!1;if(t.hasOwnProperty("audible")&&(!t.audible&&gsStorage.getOption(gsStorage.IGNORE_AUDIO)&&L(e),i=!0),t.hasOwnProperty("pinned")&&(!t.pinned&&gsStorage.getOption(gsStorage.IGNORE_PINNED)&&L(e),i=!0),t.hasOwnProperty("status")){if("complete"===t.status){const t=G(e.id,n),s=G(e.id,r)||null;H(e.id),L(e),K(e,t,s).catch((t=>{gsUtils.warning(e.id,"Failed to send init to content script. Tab may not behave as expected.")})).then((()=>{}))}i=!0}i&&M(e)&&Y(e,null,(function(t){z(t,e.id)}))}(s,t))})),chrome.windows.onCreated.addListener((function(e){gsUtils.log(e.id,"window created."),R(),$()&&chrome.tabs.create({url:chrome.extension.getURL("notice.html")})})),chrome.windows.onRemoved.addListener((function(e){gsUtils.log(e,"window removed."),R()})),chrome.history.onVisited.addListener((function(e){gsUtils.isSuspendedUrl(e.url)&&chrome.history.deleteUrl({url:e.url})})),function(){navigator.getBattery&&navigator.getBattery().then((function(e){w=e.charging,e.onchargingchange=function(){w=e.charging,gsUtils.log("background",`_isCharging: ${w}`),J(),!w&&gsStorage.getOption(gsStorage.IGNORE_WHEN_CHARGING)&&q()}}));window.addEventListener("online",(function(){gsUtils.log("background","Internet is online."),gsStorage.getOption(gsStorage.IGNORE_WHEN_OFFLINE)&&q(),J()})),window.addEventListener("offline",(function(){gsUtils.log("background","Internet is offline."),J()}))}(),q(),chrome.extension.inIncognitoContext)||(Z(!1),Z(gsStorage.getOption(gsStorage.ADD_CONTEXT)));const t=await gsChrome.tabsQuery({active:!0}),u=await gsChrome.windowsGetLastFocused();for(let e of t)b[e.windowId]=e.id,l[e.windowId]=e.id,u&&u.id===e.windowId&&(f=e.windowId,T=e.windowId);gsUtils.log("background","init successful"),e()}))},initialiseTabContentScript:K,setViewGlobals:function(e){const t=I();if(!t)throw new Error("Lib not ready");Object.assign(e,t)},getInternalViewByTabId:v,getInternalViewsByViewName:A,startTimers:function(){gsSession.updateSessionMetrics(!0),window.setInterval(gsSession.updateSessionMetrics,u),window.setInterval((()=>{const e=!0;gsSession.updateSessionMetrics(e)}),c)},requestNotice:$,clearNotice:function(){m=void 0},buildContextMenu:Z,getActiveTabStatus:function(e){N((function(t){t?Y(t,null,(function(t){e(t)})):e(gsUtils.STATUS_UNKNOWN)}))},getDebugInfo:function(e,t){const n=G(e,s),i={windowId:"",tabId:"",status:gsUtils.STATUS_UNKNOWN,timerUp:n?n.suspendDateTime:"-"};chrome.tabs.get(e,(function(s){if(chrome.runtime.lastError)return gsUtils.error(e,chrome.runtime.lastError),void t(i);i.windowId=s.windowId,i.tabId=s.id,gsUtils.isNormalTab(s,!0)?gsMessages.sendRequestInfoToContentScript(s.id,(function(e,n){e&&gsUtils.warning(s.id,"Failed to getDebugInfo",e),n?Y(s,n.status,(function(e){i.status=e,t(i)})):t(i)})):Y(s,null,(function(e){i.status=e,t(i)}))}))},calculateTabStatus:Y,isCharging:function(){return w},isCurrentStationaryTab:function(e){if(e.windowId!==f)return!1;var t=b[e.windowId];return t?e.id===t:e.active},isCurrentFocusedTab:M,isCurrentActiveTab:function(e){const t=l[e.windowId];return t?e.id===t:e.active},clearAutoSuspendTimerForTabId:W,resetAutoSuspendTimerForTab:L,resetAutoSuspendTimerForAllTabs:q,getSuspensionToggleHotkey:async function(){return void 0===U&&(U=await B()),U},unsuspendTab:V,unsuspendHighlightedTab:function(){N((e=>{e&&gsUtils.isSuspendedTab(e)&&V(e)}))},unwhitelistHighlightedTab:function(e){N((function(t){t?(gsUtils.removeFromWhitelist(t.url),Y(t,null,(function(s){z(s,t.id),e&&e(s)}))):e&&e(gsUtils.STATUS_UNKNOWN)}))},requestToggleTempWhitelistStateOfHighlightedTab:O,suspendHighlightedTab:function(){N((e=>{e&&gsTabSuspendManager.queueTabForSuspension(e,1)}))},suspendAllTabs:C,unsuspendAllTabs:P,suspendSelectedTabs:k,unsuspendSelectedTabs:F,whitelistHighlightedTab:E,unsuspendAllTabsInAllWindows:D,promptForFilePermissions:function(){N((e=>{chrome.tabs.create({url:chrome.extension.getURL("permissions.html"),index:e.index+1})}))}}}();Promise.resolve().then(tgs.backgroundScriptsReadyAsPromised).then(gsStorage.initSettingsAsPromised).then((()=>Promise.all([gsFavicon.initAsPromised(),gsTabSuspendManager.initAsPromised(),gsTabCheckManager.initAsPromised(),gsTabDiscardManager.initAsPromised(),gsSession.initAsPromised()]))).catch((e=>{gsUtils.error("background init error: ",e)})).then(gsSession.runStartupChecks).catch((e=>{gsUtils.error("background startup checks error: ",e)})).then(tgs.initAsPromised).catch((e=>{gsUtils.error("background init error: ",e)})).finally((()=>{tgs.startTimers()}));