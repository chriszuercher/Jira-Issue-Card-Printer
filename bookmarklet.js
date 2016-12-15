!function(){function e(){return Promise.resolve(t.get.apply(this,arguments))}function n(){return Promise.resolve(t.getJSON.apply(this,arguments))}if(String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}),String.prototype.startsWith||(String.prototype.startsWith=function(e){return this.slice(0,e.length)==e}),String.prototype.endsWith||(String.prototype.endsWith=function(e){return this.slice(-e.length)==e}),String.prototype.toCamelCase||(String.prototype.toCamelCase=function(){var e=this.replace(/([^a-zA-Z0-9_\- ])|^[_0-9]+/g,"").trim().toLowerCase();return e=e.replace(/([ \-]+)([a-zA-Z0-9])/g,function(e,n,t){return t.toUpperCase()}),e=e.replace(/([0-9]+)([a-zA-Z])/g,function(e,n,t){return n+t.toUpperCase()})}),Array.from||(Array.from=function(){var e=Object.prototype.toString,n=function(n){return"function"==typeof n||"[object Function]"===e.call(n)},t=function(e){var n=Number(e);return isNaN(n)?0:0!==n&&isFinite(n)?(n>0?1:-1)*Math.floor(Math.abs(n)):n},i=Math.pow(2,53)-1,r=function(e){var n=t(e);return Math.min(Math.max(n,0),i)};return function(e){var t=this,i=Object(e);if(null==e)throw new TypeError("Array.from doit utiliser un objet semblable à un tableau - null ou undefined ne peuvent pas être utilisés");var o,a=arguments.length>1?arguments[1]:void 0;if("undefined"!=typeof a){if(!n(a))throw new TypeError("Array.from: lorsqu il est utilisé le deuxième argument doit être une fonction");arguments.length>2&&(o=arguments[2])}for(var s,c=r(i.length),d=n(t)?Object(new t(c)):new Array(c),l=0;l<c;)s=i[l],a?d[l]="undefined"==typeof o?a(s,l):a.call(o,s,l):d[l]=s,l+=1;return d.length=c,d}}()),"undefined"==typeof jQuery&&"undefined"==typeof t)return void alert("jQuery is missing!\n\nPlease create an issue at\n"+global.issueTrackingUrl);jQuery.fn.on||(jQuery.fn.on=function(e,n){return jQuery.bind(e,n)});var t=t||jQuery,i=function(e){return e.readCookie=function(e){for(var n=document.cookie.split("; "),t=0;t<n.length;t++){var i=n[t].split("=");if(i[0]==e)return i[1]}return null},e.writeCookie=function(e,n){var t=new Date;t.setFullYear(t.getFullYear()+1),document.cookie=e+"="+n+"; Path=/; expires="+t.toGMTString(),document.cookie=e+"=; expires="+new Date(0).toGMTString()},e}({}),r=function(e){return e.name="JIRA",e.baseUrl=function(){try{return t("input[title='baseURL']").attr("value")}catch(e){return window.location.origin}},e.isEligible=function(){return t("meta[name='application-name'][ content='JIRA']").length>0},e.getSelectedIssueKeyList=function(){if(/.*\/browse\/.*/g.test(document.URL))return[document.URL.match(/.*\/browse\/([^?]*).*/)[1]];if(/.*\/projects\/.*/g.test(document.URL))return[document.URL.match(/.*\/projects\/[^\/]*\/[^\/]*\/([^?]*).*/)[1]];if(/.*\/issues\/.*/g.test(document.URL)){var e=t(".issue-list > li").map(function(){return t(this).attr("data-key")});return e.empty()&&(e=t("tr[data-issuekey]").map(function(){return t(this).attr("data-issuekey")})),e}return/.*\/secure\/RapidBoard.jspa.*/g.test(document.URL)?t("div[data-issue-key].ghx-selected").map(function(){return t(this).attr("data-issue-key")}):[]},e.getCardData=function(n){var t=[],i={};return t.push(e.getIssueData(n).then(function(n){var t=[];if(i.key=n.key,i.type=n.fields.issuetype.name.toLowerCase(),i.summary=n.fields.summary,i.description=n.renderedFields.description,i.labels=n.fields.labels,n.fields.assignee){i.assignee=n.fields.assignee.displayName;var r=n.fields.assignee.avatarUrls["48x48"];r.indexOf("ownerId=")>=0&&(i.avatarUrl=r)}return n.fields.duedate&&(i.dueDate=formatDate(new Date(n.fields.duedate))),i.hasAttachment=n.fields.attachment.length>0,i.estimate=n.fields.estimate,n.fields.parent?i.superIssue=n.fields.parent.key+" "+n.fields.parent.fields.summary:n.fields.epic&&(i.superIssue=n.fields.epic.key+" "+n.fields.epic.name),i.url=e.baseUrl()+"/browse/"+i.key,Promise.all(t)})),Promise.all(t).then(function(e){return i})},e.getIssueData=function(i){var r=e.baseUrl()+"/rest/agile/1.0/issue/"+i+"?expand=renderedFields,names";return console.log("IssueUrl: "+r),n(r).then(function(e){return t.each(e.names,function(n,t){n.startsWith("customfield_")&&["storyPoints","storyPunkte"].indexOf(t.toCamelCase())>-1&&(e.fields.estimate=e.fields[n])}),e})},e}({}),o=function(n){return n.name="mingle",n.isEligible=function(){return/.*mingle.thoughtworks.com\/.*/g.test(document.URL)},n.getSelectedIssueKeyList=function(){if(/.*\/projects\/[^\/]*\/cards\/grid(\?.*)?/g.test(document.URL)){var e=document.URL.match(/.*\/projects\/([^\/]*).*/)[1],n=t(document).find("#card_show_lightbox_content > div > form[data-card-number]").attr("data-card-number");return[e+"-"+n]}if(/.*\/projects\/[^\/]*\/cards\/\d+(\?.*)?/g.test(document.URL)){var e=document.URL.match(/.*\/projects\/([^\/]*).*/)[1],n=document.URL.match(/.*\/projects\/[^\/]*\/cards\/(\d+)(\?.*)?/)[1];return[e+"-"+n]}return[]},n.getCardData=function(e,i){var r=[],o={};return r.push(n.getIssueData(e).then(function(e){e=t(e.documentElement),o.key=e.find("card > number")[0].textContent,o.type=e.find("card > card_type > name")[0].textContent.toLowerCase(),o.summary=e.find("card > name")[0].textContent,o.description=e.find("card > description")[0].innerHTML,e.find("card > properties > property > name:contains(Owner) ~ value > name").length>0&&(o.assignee=e.find("card > properties > property > name:contains(Owner) ~ value > name")[0].textContent),e.find("card > properties > property > name:contains(Estimate) ~ value").length>0&&(o.estimate=e.find("card > properties > property > name:contains(Estimate) ~ value")[0].textContent);var n=e.find("card > project > identifier")[0].textContent,i=e.find("card > number")[0].textContent;o.url="https://"+document.location.hostname+"/projects/"+n+"/cards/"+i})),Promise.all(r).then(function(e){return o})},n.getIssueData=function(n){var t=n.split("-"),i=t[0],r=t[1],o="/api/v2/projects/"+i+"/cards/"+r+".xml";return console.log("IssueUrl: "+o),e(o)},n}({}),a=function(e){return e.name="PivotalTracker",e.isEligible=function(){return/.*pivotaltracker.com\/.*/g.test(document.URL)},e.getSelectedIssueKeyList=function(){return/.*\/stories\/.*/g.test(document.URL)?[document.URL.match(/.*\/stories\/([^?]*).*/)[1]]:/.*\/projects\/.*/g.test(document.URL)?t(".story[data-id]:has(.selector.selected)").map(function(){return t(this).attr("data-id")}):/.*\/workspaces\/.*/g.test(document.URL)?t(".story[data-id]:has(.selector.selected)").map(function(){return t(this).attr("data-id")}):[]},e.getCardData=function(n){var t=[],i={};return t.push(e.getIssueData(n).then(function(e){i.key=e.id,i.type=e.kind.toLowerCase(),i.summary=e.name,i.description=e.description,e.owned_by&&e.owned_by.length>0&&(i.assignee=e.owner_ids[0].name),e.deadline&&(i.dueDate=formatDate(new Date(e.deadline))),i.hasAttachment=!1,i.estimate=e.estimate,i.url=e.url})),Promise.all(t).then(function(e){return i})},e.getIssueData=function(e){var t="https://www.pivotaltracker.com/services/v5/stories/"+e+"?fields=name,kind,description,story_type,owned_by(name),comments(file_attachments(kind)),estimate,deadline";return console.log("IssueUrl: "+t),n(t)},e}({}),s=function(e){e.name="TeamForge",e.isEligible=function(){return/^TeamForge\s:/.test(document.title)},e.getSelectedIssueKeyList=function(){var e=[];return jQuery("input[type=checkbox][name=_listItem]").each(function(n,t){e.push(t.value)}),e};var n=function(){var e=null;return function(){if(!e){e={};var n={Customer:-1,Category:-1,"Artifact ID : Title":-1,"Assigned To":-1,Description:-1};jQuery("#ArtifactListTable tr.ItemListHeader td").each(function(e,t){const i=jQuery(t).clone().children().remove().end().text();i in n&&(n[i]=e)}),e={},Object.keys(n).forEach(function(t){if(n[t]==-1)throw"Please configure the required field "+t+" in your current view.";e[n[t]]=t})}return e}}(),t=function(){var e=null;return function(){if(!e){var n=document.createElement("a");n.href=location.href,e=n.protocol+"//"+n.hostname+n.port}return e}}();return e.getCardData=function(e){var i={};return jQuery("#ArtifactListTable tr.EvenRow:not(#filter), #ArtifactListTable tr.OddRow:not(#filter)").each(function(r,o){const a=jQuery(o).find("input[type=checkbox][name=_listItem]")[0].value;e==a&&(i.key=a,i.type="Bug",i.hasAttachment=!1,i.estimate="",i.labels=[],jQuery(o).find("td").each(function(e,r){const o=n(),a=o[e];a&&("Description"==a?i.description=jQuery(r).text():"Artifact ID : Title"==a?(i.summary=jQuery(r).find("a").text(),i.url=t()+jQuery(r).find("a").attr("href")):"Assigned To"==a?(i.assignee=jQuery(r).text(),"None"==i.assignee&&(i.assignee="")):"Customer"!=a&&"Category"!=a||i.labels.push(a+":"+jQuery(r).text()))}))}),Promise.resolve(i)},e.getIssueData=function(e){return[]},e}({}),c=function(e){return e.name="trello",e.isEligible=function(){return/.*trello.com\/.*/g.test(document.URL)},e.getSelectedIssueKeyList=function(){if(/.*\/b\/.*/g.test(document.URL)){var e=t(".card-composer").parent().find(".list-card > .list-card-details > .list-card-title").map(function(){return t(this).attr("href").match(/.*\/c\/([^\/]*).*/)[1]}),n=t("textarea.list-header-name.is-editing").parent().parent().find(".list-cards > .list-card > .list-card-details > .list-card-title").map(function(){return t(this).attr("href").match(/.*\/c\/([^\/]*).*/)[1]});return jQuery.merge(e,n)}return/.*\/c\/.*/g.test(document.URL)?[document.URL.match(/.*\/c\/([^\/]*).*/)[1]]:[]},e.getCardData=function(n,t){var i=[],r={};return i.push(e.getIssueData(n).then(function(e){r.key=e.idShort,r.type="default",r.summary=e.name,r.description=e.desc,issueDate.labels=e.labels.map(function(e){return e.name}),e.members&&e.members.length>0&&(r.assignee=e.members[0].fullName,r.avatarUrl="https://trello-avatars.s3.amazonaws.com/"+e.members[0].avatarHash+"/170.png"),e.due&&(r.dueDate=formatDate(new Date(e.due))),r.hasAttachment=e.attachments>0,r.url=e.shortUrl})),Promise.all(i).then(function(e){return r})},e.getIssueData=function(e){var t="/1/cards/"+e+"?members=true";return console.log("IssueUrl: "+t),n(t)},e}({}),d=function(e){return e.name="YouTrack",e.isEligible=function(){return/.*myjetbrains.com\/youtrack\/.*/g.test(document.URL)||/.*youtrack.jetbrains.com\/.*/g.test(document.URL)},e.getSelectedIssueKeyList=function(){return/.*\/issue\/.*/g.test(document.URL)?[document.URL.match(/.*\/issue\/([^?]*).*/)[1]]:/.*\/rest\/agile.*/g.test(document.URL)?t("div.sb-task-focused").map(function(){return t(this).attr("id")}):[]},e.getCardData=function(n){var t=[],i={};return t.push(e.getIssueData(n).then(function(e){i.key=e.id,i.type=e.field.type[0],i.summary=e.field.summary,i.description=e.field.description,e.field.assignee&&(i.assignee=e.field.assignee[0].fullName),e.field.attachments&&(i.hasAttachment=e.field.attachments.length>0),i.url=window.location.origin+"/youtrack/issue/"+i.key})),Promise.all(t).then(function(e){return i})},e.getIssueData=function(e){var i="/youtrack/rest/issue/"+e+"?";return console.log("IssueUrl: "+i),n(i).then(function(e){return t.each(e.field,function(n,t){var i=t.name.toCamelCase();e.field[i]=t.value}),e})},e}({});!function(){function e(e){e=E(e),e=JSON.stringify(e),console.log("ERROR "+e),ga("send","exception",{exDescription:L.version+" - "+document.location.host+"\n"+e,exFatal:!0}),alert("Sorry something went wrong\n\nPlease create an issue with following details at\n"+L.issueTrackingUrl+"\n\n"+e)}function n(e){u();var n=[];t("#card-printer-iframe").length>0&&w(),console.log("Run...");for(var i=0;i<e.length;i++){var r=e[i];if(r.isEligible()){L.appFunctions=r;break}}if(!L.appFunctions)return void alert("Unsupported Application "+document.URL+" Please create an issue at "+L.issueTrackingUrl);console.log("Issue Tracker: "+L.appFunctions.name),ga("set","page","/cardprinter"),ga("send","pageview");var o=m();t("body").append(o),o.window=o.contentWindow,o.document=o.window.document,o.document.open(),o.document.close(),L.appFrame=o,t("head",L.appFrame.document).prepend(t("<style>").html("* {\n  font-family: Arial, sans-serif;\n  color: #656565;\n}\n#card-print-overlay {\n  position: fixed;\n  height: 100%;\n  width: 100%;\n  top: 0;\n  left: 0;\n  background: rgba(0, 0, 0, 0.5);\n  box-sizing: border-box;\n  word-wrap: break-word;\n  z-index: 99999;\n}\n#card-print-dialog {\n  position: relative;\n  top: 60px;\n  right: 0px;\n  left: 0px;\n  height: calc(100% - 120px);\n  width: 1100px;\n  margin: auto;\n  border-style: solid;\n  border-color: #cccccc;\n  border-width: 1px;\n  -webkit-border-radius: 4px;\n  border-radius: 4px;\n  overflow: hidden;\n}\n#card-print-dialog-header {\n  position: relative;\n  background: #f0f0f0;\n  height: 25px;\n  border-bottom: 1px solid #cccccc;\n  padding: 10px 15px 15px 15px;\n}\n#card-print-dialog-content {\n  position: relative;\n  background: white;\n  height: calc(100% - 106px);\n  width: 100%;\n  overflow: hidden;\n}\n#card-print-dialog-content-iframe {\n  position: relative;\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n  border: none;\n}\n#card-print-dialog-footer {\n  position: relative;\n  background: #f0f0f0;\n  border-top: 1px solid #cccccc;\n  height: 30px;\n  padding: 15px 15px 10px 15px;\n  text-align: right;\n  font-size: 13px;\n}\n#buttons {\n  position: relative;\n  float: right;\n  display: inline-block;\n  height: 30px;\n}\n#info {\n  position: relative;\n  float: right;\n  display: inline-block;\n  height: 30px;\n}\n#info-line {\n  font-size: 14px;\n  line-height: 29px;\n  margin-right: 8.4rem;\n}\n#card-print-dialog-title {\n  position: relative;\n  float: left;\n  color: rgb(51, 51, 51);\n  display: block;\n  font-size: 20px;\n  font-weight: normal;\n  height: 30px;\n  line-height: 30px;\n}\n.ui-element {\n  color: #656565;\n  font-size: 12px;\n  font-weight: 600;\n  display: inline-block;\n  margin: 5px 5px;\n  vertical-align: baseline;\n}\n.button {\n    cursor: pointer;\n    background-color: #DEDEDE;\n    border: 1px solid #D4D4D4;\n    border-radius: 3px;\n    display: inline-block;\n    font-size: 13px;\n    font-weight: 700;\n    padding: 5.8px 20px;\n    margin: 0px 2px;\n    text-decoration: none;\n    text-align: center;\n}\n.button-primary{\n    background-color: #5689db;\n    border: 1px solid #5689db;\n    color: #fff;\n}\nlabel {\n  display: block;\n  margin-left: 5px;\n  float:left;\n}\nlabel[for] {\n  cursor: pointer;\n}\n.checkbox {\n  position: relative;\n  width: auto;\n  height: auto;\n}\n.checkbox  input[type=checkbox]{\n  display: none;\n}\n.checkbox input[type=checkbox]  + label {\n  margin: 0px;\n  position: relative;\n  width: 15px;\n  height: 15px;\n  border-radius: 4px;\n  background-color: #DEDEDE;\n  border: 1px solid #D4D4D4;\n}\n.checkbox input[type=checkbox] + label::after {\n  opacity: 0;\n  content: '';\n  position: absolute;\n  width: 6px;\n  height: 3px;\n  background: transparent;\n  top: 4px;\n  left: 4px;\n  border: 2px solid #656565;\n  border-top: none;\n  border-right: none;\n  transform: rotate(-45deg);\n}\n.checkbox input[type=checkbox]:checked + label::after {\n  opacity: 1;\n}\ninput[type=number].numberInput {\n    color: #656565;\n    position: relative;\n    top: -2px;\n    font-size: 12px;\n    font-weight: 700;\n    width:1.5em;\n    padding:3px;\n    margin:0;\n    border:1px solid #ddd;\n    border-radius:5px;\n    text-align: center;\n    background-color: #DEDEDE;\n    border: 1px solid #D4D4D4;\n    width: 100px;\n}\ninput[type=number].numberInput::-webkit-inner-spin-button,\ninput[type=number].numberInput ::-webkit-outer-spin-button {\n   -webkit-appearance: none;\n}\ninput[type=number].numberInput:hover{\n    border:1px solid #ddd;\n    background-color: #f6f6f6;\n}\ninput[type=number].numberInput:focus{\n    outline:none;\n    border:1px solid #ddd;\n    background-color: #f6f6f6;\n}")),t("body",L.appFrame.document).append(t("<div/>").html('<div id="card-print-overlay">\n  <div id="card-print-dialog">\n    <div id="card-print-dialog-header">\n      <div id="card-print-dialog-title">Card Printer</div>\n      <div id="info">\n        <label id="info-line"><b>Jira</b> - <b>Trello</b> - <b>YouTrack</b> - <b>PivotalTracker</b> - <b>TeamForge</b></label>\n        <div id="report-issue" class="ui-element button" >Report Issues</div>\n        <div id="about" class="ui-element button" >About</div>\n      </div>\n    </div>\n    <div id="card-print-dialog-content">\n      <iframe id="card-print-dialog-content-iframe"></iframe>\n    </div>\n    <div id="card-print-dialog-footer">\n      <div class="buttons">\n        <div class="ui-element" style="float: left;" >\n          <input id="columnCount" type="number" min="0" max="9" class="numberInput" style="float: left; width: 18px; padding: 2px;" value="1"/>\n          <div style="float: left; margin-left: 5px; margin-right: 5px;">x</div>\n          <input id="rowCount" type="number" min="0" max="9" class="numberInput" style="float: left; width: 18px; padding: 2px;" value="2"/>\n          <label style="float: left; margin-left:5px;">Page Grid</label>\n        </div>\n        <div class="ui-element" style="float: left;">\n          <form style="float: left;" oninput="amount.value=parseFloat(scaleRange.value).toFixed(1)">\n            <input id="scaleRange" type="range" min="-1.0" max="1.0" step="0.1" value="0.0" style="float: left; width: 70px; position: relative;\n    top: -2px;" />\n            <label>Scale</label>\n            <output style="float: left; width: 22px; margin-left:2px;" name="amount" for="scaleRange"></output>\n          </form>\n\n        </div>\n        <div class="ui-element checkbox" style="float: left;">\n          <input id="single-card-page-checkbox" type="checkbox"/>\n          <label for="single-card-page-checkbox"></label>\n          <label for="single-card-page-checkbox">Single Card Per Page</label>\n        </div>\n        <div class="ui-element checkbox" style="float: left;">\n          <input id="description-checkbox" type="checkbox"/>\n          <label for="description-checkbox"></label>\n          <label for="description-checkbo">Description</label>\n        </div>\n        <div class="ui-element checkbox" style="float: left;">\n          <input id="assignee-checkbox" type="checkbox"/>\n          <label for="assignee-checkbox"></label>\n          <label for="assignee-checkbox">Assignee</label>\n        </div>\n        <div class="ui-element checkbox" style="float: left;">\n          <input id="due-date-checkbox" type="checkbox"/>\n          <label for="due-date-checkbox"></label>\n          <label for="due-date-checkbox">Due Date</label>\n        </div>\n        <div class="ui-element checkbox" style="float: left;">\n          <input id="estimate-checkbox" type="checkbox"/>\n          <label for="estimate-checkbox"></label>\n          <label for="estimate-checkbox">Estimate</label>\n        </div>\n        <div class="ui-element checkbox" style="float: left;">\n          <input id="qr-code-checkbox" type="checkbox"/>\n          <label for="qr-code-checkbox"></label>\n          <label for="qr-code-checkbox">QR Code</label>\n        </div>\n        <div class="ui-element checkbox" style="float: left;">\n          <input id="tags-checkbox" type="checkbox"/>\n          <label for="tags-checkbox"></label>\n          <label for="tags-checkbox">Tags</label>\n        </div>\n        <div class="ui-element checkbox" style="float: left;">\n          <input id="epic-checkbox" type="checkbox"/>\n          <label for="epic-checkbox"></label>\n          <label for="epic-checkbox">Epic</label>\n        </div>\n\n        <div id="card-print-dialog-print" class="ui-element button button-primary" >Print</div>\n      </div>\n    </div>\n  </div>\n</div>').contents()),C(),g();var a=t("#card-print-dialog-content-iframe",L.appFrame.document)[0];a.window=a.contentWindow,a.document=a.window.document,a.document.open(),a.document.close(),L.printFrame=a,a.window.addEventListener("resize",f),a.window.matchMedia("print").addListener(f),a.window.onbeforeprint=f,a.window.onafterprint=f;var s=L.appFunctions.getSelectedIssueKeyList();if(s.length<=0)return void alert("Please select at least one issue.");if(s.length>30){var c=confirm("Are you sure you want select "+s.length+" issues?");if(!c)return}return n.push(h(s)),t("#card-print-dialog-title",L.appFrame.document).text("Card Printer "+L.version+" - Loading issues..."),Promise.all(n).then(function(){t("#card-print-dialog-title",L.appFrame.document).text("Card Printer "+L.version)})}function l(){var e=L.settings;i.writeCookie("card_printer_scale",e.scale),i.writeCookie("card_printer_row_count",e.rowCount),i.writeCookie("card_printer_column_count",e.colCount),i.writeCookie("card_printer_single_card_page",e.singleCardPage),i.writeCookie("card_printer_hide_description",e.hideDescription),i.writeCookie("card_printer_hide_assignee",e.hideAssignee),i.writeCookie("card_printer_hide_due_date",e.hideDueDate),i.writeCookie("card_printer_hide_estimate",e.hideEstimate),i.writeCookie("card_printer_hide_qr_code",e.hideQrCode),i.writeCookie("card_printer_hide_tags",e.hideTags),i.writeCookie("card_printer_hide_epic",e.hideEpic)}function u(){var e=L.settings=L.settings||{};e.scale=parseFloat(i.readCookie("card_printer_scale"))||0,e.rowCount=parseInt(i.readCookie("card_printer_row_count"))||2,e.colCount=parseInt(i.readCookie("card_printer_column_count"))||1,e.singleCardPage=D(i.readCookie("card_printer_single_card_page"),!0),e.hideDescription=D(i.readCookie("card_printer_hide_description"),!1),e.hideAssignee=D(i.readCookie("card_printer_hide_assignee"),!1),e.hideDueDate=D(i.readCookie("card_printer_hide_due_date"),!1),e.hideEstimate=D(i.readCookie("card_printer_hide_estimate"),!1),e.hideQrCode=D(i.readCookie("card_printer_hide_qr_code"),!1),e.hideTags=D(i.readCookie("card_printer_hide_tags"),!0),e.hideEpic=D(i.readCookie("card_printer_hide_epic"),!1)}function p(){ga("send","event","button","click","print",t(".card",L.printFrame.contentWindow.document).length),L.printFrame.contentWindow.focus(),L.printFrame.contentWindow.print()}function m(){var e=document.createElement("iframe");return e.id="card-printer-iframe",t(e).css({position:"fixed",height:"100%",width:"100%",top:"0",left:"0",background:"rgba(0, 0, 0, 0.0)",boxSizing:"border-box",wordWrap:"break-word",zIndex:"99999"}),e}function g(){var e=L.appFrame.document,n=L.settings;t("#scaleRange",e).val(n.scale),t("#scaleRange",e).parent().find("output").val(n.scale),t("#rowCount",e).val(n.rowCount),t("#columnCount",e).val(n.colCount),t("#single-card-page-checkbox",e).attr("checked",n.singleCardPage),t("#description-checkbox",e).attr("checked",!n.hideDescription),t("#assignee-checkbox",e).attr("checked",!n.hideAssignee),t("#due-date-checkbox",e).attr("checked",!n.hideDueDate),t("#estimate-checkbox",e).attr("checked",!n.hideEstimate),t("#qr-code-checkbox",e).attr("checked",!n.hideQrCode),t("#tags-checkbox",e).attr("checked",!n.hideTags),t("#epic-checkbox",e).attr("checked",!n.hideEpic)}function h(e){var n=[],i=L.printFrame.document;return i.open(),i.write("<head/><body></body>"),i.close(),t("head",i).append(t("<style>").html("@import url('https://fonts.googleapis.com/css?family=Gentium+Book+Basic:400,700');\n* {\n  box-sizing: border-box;\n  font-family: 'Gentium Book Basic';\n}\nhtml {\n  background-color: LIGHTGREY;\n  padding: 0rem;\n  margin: 1rem;\n  font-size: 1.0cm;\n  overflow-y: scroll;\n}\nbody {\n  padding: 0rem;\n  margin: 0rem;\n  max-height: 100%;\n  max-width: 100%;\n  overflow: visible;\n}\n.badge, .shadow {\n  border-style: solid;\n  border-color: #454545;\n  border-top-width: 0.12rem;\n  border-left-width: 0.12rem;\n  border-bottom-width: 0.21rem;\n  border-right-width: 0.21rem;\n  border-radius: 0.25rem;\n}\n.badge {\n  background-color: WHITESMOKE;\n}\n.hidden {\n  display: none;\n}\n.zigzag {\n  border-bottom-width: 0rem;\n}\n.zigzag::after {\n    box-sizing: border-box;\n    position: absolute;\n    bottom: 0.00rem;\n    left: 0.0rem;\n    content: \"\";\n    width: 100%;\n    border-style: solid;\n    border-bottom-width: 0.5rem;\n    border-image: url(https://qoomon.github.io/Jira-Issue-Card-Printer/resources/Tearing.png);\n    border-image-width: 0 0 0.7rem 0;\n    border-image-slice: 56 0 56 1;\n    border-image-repeat: round round;\n}\n#preload {\n  position: fixed;\n  top: 0rem;\n  left: 100%;\n}\n.author {\n  color: DIMGREY;\n  position: relative;\n  top: 0.2rem;\n  left: calc(50% - 2rem);\n  font-size: 0.8rem;\n  overflow: visible;\n  line-height: 0.38rem;\n}\n.author > span:nth-of-type(2) {\n  position: relative;\n  top: 0.1rem;\n  left: 0.65rem;\n  font-size: 0.5em;\n}\n.card {\n  position: relative;\n  float: left;\n  height: 100%;\n  width: 100%;\n  padding: 0.5rem;\n  min-width: 14.5rem;\n  min-height: 8.65rem;\n  overflow: hidden;\n  background-color: WHITE;\n}\n.card::before {\n    box-sizing: border-box;\n    overflow: visible;\n    position: absolute;\n    top: 0.0rem;\n    left: 0.0rem;\n    content: \"\";\n    width: 100%;\n    height: 100%;\n    border-color: LightGray;\n    border-style: dashed;\n    border-width: 0.03cm;\n}\n.card-content {\n  position: relative;\n  height: 100%;\n  // find .card-header;\n  padding-top: 2rem;\n  // find .card-footer;\n  padding-bottom: 1.3rem;\n}\n.card-body {\n  overflow: hidden;\n  position: relative;\n  height: 100%;\n  margin-left: 0.4rem;\n  margin-right: 0.4rem;\n  padding-top: 1.1rem;\n  padding-bottom: 1.1rem;\n  padding-left: 0.4rem;\n  padding-right: 0.4rem;\n  background: WHITE;\n}\n.card-header {\n  position: absolute;\n  top: 0rem;\n  height: 4.2rem;\n  width: 100%;\n}\n.card-footer {\n  position: absolute;\n  bottom: 0rem;\n  height: 2.2rem;\n  width: 100%;\n  overflow: hidden;\n}\n.issue-summary {\n  font-weight: bold;\n  font-size: 0.9rem;\n}\n.issue-description {\n  margin-top: 0.1rem;\n  display: block;\n  font-size: 0.6rem;\n  line-height: 0.62rem;\n  overflow: hidden;\n}\n.issue-description p:first-of-type {\n  margin-top: 0rem;\n}\n.issue-description p:last-of-type {\n  margin-bottom: 0rem;\n}\n.issue-id {\n  position: absolute;\n  left: 1rem;\n  top: 1.2rem;\n  height: 1.5rem;\n  max-width: calc(100% - 7.5rem);\n  min-width: 6.0rem;\n  padding-left: 2.1rem;\n  padding-right: 0.4rem;\n  background-color: WHITESMOKE;\n  line-height: 1.3rem;\n  font-size: 0.8rem;\n  font-weight: bold;\n  text-align: center;\n  white-space: nowrap;\n  direction: rtl;\n}\n.issue-id-fadeout {\n  position: absolute;\n  left: 2.4rem;\n  top: 1.3rem;\n  width: 1.2rem;\n  height: 1.2rem;\n  z-index: 0;\n  background: linear-gradient(to left, rgba(224, 224, 224, 0) 0%, rgba(224, 224, 224, 1) 60%);\n}\n.issue-icon {\n  position: absolute;\n  left: 0rem;\n  top: 0rem;\n  height: 3.0rem;\n  width: 3.0rem;\n  border-radius: 50%;\n  background-color: DEEPSKYBLUE;\n  background-image: url(https://qoomon.github.io/Jira-Issue-Card-Printer/resources/icons/CloudLoading.png);\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 63%;\n}\n.issue-estimate {\n  position: absolute;\n  left: 2.5rem;\n  top: 0.0rem;\n  height: 1.6rem;\n  width: 1.6rem;\n  border-radius: 50%;\n  background-color: WHITESMOKE;\n  line-height: 1.4rem;\n  font-size: 0.9rem;\n  font-weight: bold;\n  text-align: center;\n}\n.issue-qr-code {\n  position: relative;\n  float: left;\n  margin-right: 0.5rem;\n  width: 2.2rem;\n  height: 2.2rem;\n  background-image: url(https://chart.googleapis.com/chart?cht=qr&chs=256x256&chld=L|1&chl=blog.qoomon.com);\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-position: center;\n}\n.issue-attachment {\n  position: relative;\n  float: left;\n  top: 0.1rem;\n  width: 2.0rem;\n  height: 2.0rem;\n  border-radius: 50%;\n  background-color: LIGHTSKYBLUE;\n  background-image: url(https://qoomon.github.io/Jira-Issue-Card-Printer/resources/icons/Attachment.png);\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 70%;\n}\n.issue-assignee {\n  position: relative;\n  float: right;\n  margin-left: 0.5rem;\n  width: 2.2rem;\n  height: 2.2rem;\n  border-radius: 50%;\n  background-color: WHITESMOKE;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: cover;\n  //-webkit-filter: contrast(200%) grayscale(100%);\n  //filter: contrast(200%) grayscale(100%);\n  text-align: center;\n  font-weight: bold;\n  font-size: 1.0rem;\n  line-height: 2.0rem;\n}\n.issue-tags-box {\n  position: relative;\n  float: right;\n  top: 0.1rem;\n  width: auto;\n  min-width: 2rem;\n  width: auto;\n  max-width: calc(100% - 7.5rem);\n  height: auto;\n  font-size: 0.6rem;\n  line-height: 0.6rem;\n  text-align: right;\n}\n.issue-tag {\n  display: inline-block;\n  padding: 0.1rem 0.2rem;\n  margin: 0.08rem 0.1rem;\n  margin-top: 0rem;\n  border-top-width: 0.1rem;\n  border-left-width: 0.1rem;\n  border-bottom-width: 0.15rem;\n  border-right-width: 0.15rem;\n  max-width: 5.0rem;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.issue-due-date-box {\n  position: absolute;\n  right: 0rem;\n  top: 0rem;\n  overflow: visible !important;\n}\n.issue-due-date {\n  position: absolute;\n  top: 1.3rem;\n  right: 1rem;\n  width: 5.3rem;\n  height: 1.3rem;\n  padding-left: 0.2rem;\n  padding-right: 1.4rem;\n  text-align: center;\n  font-weight: bold;\n  font-size: 0.7rem;\n  line-height: 1.0rem;\n}\n.issue-due-icon {\n  position: absolute;\n  top: 0.5rem;\n  right: 0rem;\n  width: 2.5rem;\n  height: 2.5rem;\n  border-radius: 50%;\n  background-color: ORCHID;\n  background-image: url(https://qoomon.github.io/Jira-Issue-Card-Printer/resources/icons/AlarmClock.png);\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 65%;\n}\n\n@media print {\n  @page {\n    margin: 0.0mm;\n    padding: 0.0mm;\n  }\n  html {\n    margin: 0.0mm;\n    padding: 0.0mm;\n    background-color: WHITE !important;\n    -webkit-print-color-adjust: exact;\n    print-color-adjust: exact;\n  }\n  .card {\n    page-break-inside: avoid !important;\n\n    margin: 0.0mm !important;\n  }\n}\n")),t("body",i).append("<div id='preload'/>"),t("#preload",i).append("<div class='zigzag'/>"),console.log("load "+e.length+" issues..."),t.each(e,function(e,r){var o=t("<div/>").html('<div class="card">\n  <div class="card-content">\n    <div class="card-body shadow">\n      <div class="issue-summary"></div>\n      <div class="issue-description"></div>\n    </div>\n    <div class="card-header">\n      <div class="author">\n        <span>qoomon.com</span>\n        <br>\n        <span>©BengtBrodersen</span>\n      </div>\n      <div class="issue-id badge"></div>\n      <div class="issue-id-fadeout"></div>\n      <div class="issue-icon badge" type="loading"></div>\n      <div class="issue-estimate badge"></div>\n      <div class="issue-due-box">\n        <div class="issue-due-date badge"></div>\n        <div class="issue-due-icon badge"></div>\n      </div>\n    </div>\n    <div class="card-footer">\n      <div class="issue-qr-code badge"></div>\n      <div class="issue-attachment badge"></div>\n      <div class="issue-assignee badge"></div>\n      <div class="issue-tags-box"></div>\n    </div>\n  </div>\n</div>').contents().attr("id",r).attr("index",e);o.find(".issue-id").text(r),t("body",i).append(o),n.push(L.appFunctions.getCardData(r).then(function(e){ga("send","event","card","generate",e.type),b(o,e),f()}))}),console.log("wait for issues loaded..."),Promise.all(n).then(function(){console.log("...all issues loaded."),f()})}function f(){k(),x(),y(),I(L.printFrame)}function b(e,n){e.find(".issue-id").text(n.key);var i=v(n.type);if(e.find(".issue-icon").css("background-color",i.color),e.find(".issue-icon").css("background-image","url("+i.image+")"),e.find(".issue-icon").css("background-size",i.size),e.find(".issue-summary").text(n.summary),n.description?e.find(".issue-description").html(n.description):e.find(".issue-description").addClass("hidden"),n.assignee)if(n.avatarUrl)e.find(".issue-assignee").css("background-image","url('"+n.avatarUrl+"')");else{const r=n.assignee.trim().split(/\s/).map(function(e){return e[0].toUpperCase();
}).join("");e.find(".issue-assignee").text(r),e.find(".issue-assignee").css("background-color",_(r))}else e.find(".issue-assignee").remove();if(n.dueDate?e.find(".issue-due-date").text(n.dueDate):e.find(".issue-due-box").remove(),n.hasAttachment||e.find(".issue-attachment").remove(),n.estimate?e.find(".issue-estimate").text(n.estimate):e.find(".issue-estimate").remove(),n.superIssue){var o=t("<div />");o.text(n.superIssue),o.addClass("badge"),o.addClass("issue-tag"),o.addClass("issue-tag-super-issue"),o.css("background-color",_(n.superIssue)),e.find(".issue-tags-box").append(o)}n.labels&&n.labels.forEach(function(n){var i=t("<div />");i.text(n),i.addClass("badge"),i.addClass("issue-tag"),i.addClass("issue-tag-label"),i.css("background-color",_(n)),e.find(".issue-tags-box").append(i)});var a="https://chart.googleapis.com/chart?cht=qr&chs=256x256&chld=L|1&chl="+encodeURIComponent(n.url);e.find(".issue-qr-code").css("background-image","url('"+a+"')")}function v(e){var n={};switch(n.color=_(e.toLowerCase()),n.image="https://identicon.org/?t="+e.toLowerCase()+"&s=256&c=b",n.size="55%",e.toLowerCase()){case"default":n.color="SILVER",n.image="https://qoomon.github.io/Jira-Issue-Card-Printer/resources/icons/objects.png",n.size="63%";break;case"story":case"user story":n.color="GOLD",n.image="https://qoomon.github.io/Jira-Issue-Card-Printer/resources/icons/Bulb.png",n.size="63%";break;case"bug":case"problem":case"correction":n.color="CRIMSON",n.image="https://qoomon.github.io/Jira-Issue-Card-Printer/resources/icons/Bug.png",n.size="63%";break;case"epic":n.color="ROYALBLUE",n.image="https://qoomon.github.io/Jira-Issue-Card-Printer/resources/icons/Flash.png",n.size="63%";break;case"task":case"sub-task":case"technical task":case"aufgabe":case"unteraufgabe":case"technische aufgabe":n.color="WHEAT",n.image="https://qoomon.github.io/Jira-Issue-Card-Printer/resources/icons/Task.png",n.size="63%";break;case"new feature":n.color="LIMEGREEN",n.image="https://qoomon.github.io/Jira-Issue-Card-Printer/resources/icons/Plus.png",n.size="63%";break;case"improvement":case"verbesserung":n.color="CORNFLOWERBLUE",n.image="https://qoomon.github.io/Jira-Issue-Card-Printer/resources/icons/Arrow.png",n.size="63%";break;case"research":n.color="MEDIUMTURQUOISE",n.image="https://qoomon.github.io/Jira-Issue-Card-Printer/resources/icons/ErlenmeyerFlask.png",n.size="63%";break;case"test":n.color="ORANGE",n.image="https://qoomon.github.io/Jira-Issue-Card-Printer/resources/icons/CrashDummy.png",n.size="63%"}return n}function k(){var e=L.settings,n=L.printFrame;t(".issue-description",n.document).toggle(!e.hideDescription),t(".issue-assignee",n.document).toggle(!e.hideAssignee),t(".issue-due-box",n.document).toggle(!e.hideDueDate),t(".issue-estimate",n.document).toggle(!e.hideEstimate),t(".issue-qr-code",n.document).toggle(!e.hideQrCode),t(".issue-tag-super-issue",n.document).toggle(!e.hideEpic),t(".issue-tag-label",n.document).toggle(!e.hideTags),t(".card",n.document).css({"page-break-after":"",float:"","margin-bottom":""}),e.singleCardPage?t(".card",n.document).css({"page-break-after":"always",float:"none","margin-bottom":"20px"}):t(".card",n.document).each(function(n,i){n%(e.colCount*e.rowCount)>=e.colCount*(e.rowCount-1)&&t(i).css({"margin-bottom":"20px"})})}function x(){var e,n=L.settings,i=L.printFrame,r=2*n.scale;e=r<0?1/(1-r):1*(1+r);var o=n.rowCount,a=n.colCount;t("html",i.document).css("font-size",e+"cm"),t("#gridStyle",i.document).remove();var s=t("body",i.document),c=Math.floor(s.outerWidth()/a),d=s.outerHeight()>0?Math.floor(s.outerHeight()/o):0,l=t(".card",i.document),u=l.css("min-width")?l.css("min-width").replace("px",""):0,p=l.css("min-height")?l.css("min-height").replace("px",""):0,m=c/u,g=d/p,h=Math.min(m,g,1);t("html",i.document).css("font-size",e*h+"cm");var f=document.createElement("style");f.id="gridStyle",f.type="text/css",f.innerHTML=".card { width: calc( 99.9999999999% / "+a+" );height: calc( 99.999999999% / "+o+" );}",t("head",i.document).append(f)}function y(){var e=Array.from(L.printFrame.document.querySelectorAll(".card"));e.forEach(function(e){var n=e.querySelectorAll(".card-body")[0];n.scrollHeight>n.offsetHeight?n.classList.add("zigzag"):n.classList.remove("zigzag")})}function w(){t("#card-printer-iframe").remove()}function C(){var e=t("body",L.appFrame.document);e.find("#report-issue").click(function(e){return window.open("https://github.com/qoomon/Jira-Issue-Card-Printer/issues"),!1}),e.find("#about").click(function(e){return window.open("https://github.com/qoomon/Jira-Issue-Card-Printer"),!1}),e.find("#single-card-page-checkbox").click(function(){return L.settings.singleCardPage=this.checked,l(),f(),!0}),e.find("#description-checkbox").click(function(){return L.settings.hideDescription=!this.checked,l(),f(),!0}),e.find("#assignee-checkbox").click(function(){return L.settings.hideAssignee=!this.checked,l(),f(),!0}),e.find("#due-date-checkbox").click(function(){return L.settings.hideDueDate=!this.checked,l(),f(),!0}),e.find("#estimate-checkbox").click(function(){return L.settings.hideEstimate=!this.checked,l(),f(),!0}),e.find("#qr-code-checkbox").click(function(){return L.settings.hideQrCode=!this.checked,l(),f(),!0}),e.find("#tags-checkbox").click(function(){return L.settings.hideTags=!this.checked,l(),f(),!0}),e.find("#epic-checkbox").click(function(){return L.settings.hideEpic=!this.checked,l(),f(),!0}),e.find("#scaleRange").on("input change",function(){L.settings.scale=t(this).val(),l(),f()}),e.find("#rowCount").on("input",function(){L.settings.rowCount=t(this).val(),l(),f()}),e.find("#rowCount").click(function(){this.select()}),e.find("#columnCount").on("input",function(){L.settings.colCount=t(this).val(),l(),f()}),e.find("#columnCount").click(function(){this.select()}),e.find("#card-print-dialog-print").click(function(e){return p(),!1}),e.find("#card-print-dialog-cancel").click(function(e){return w(),!1}),e.find("#card-print-overlay").click(function(e){return e.target==this&&w(),!0}),e.scroll(function(e){return!1}),t(document).keyup(function(e){27==e.keyCode&&w()})}function _(e){const n=["#ff5653","#ff5ecc","#de59f5","#ab7aff","#7f91fb","#38a1f7","#21b6f9","#26c6da","#27cebe","#78dc7c","#9ccc65","#fde93d","#ffca28","#ffb343","#ff9604","#ff7d54"];var t,i,r=0;for(t=0;t<e.length;t+=1)i=e.charCodeAt(t),r=(r<<5)-r+i,r|=0;const o=Math.abs(r)%n.length;return n[o]}function I(e){e=t(e),e.height(e[0].contentWindow.document.body.height)}function D(e,n){return"true"==e||"false"!=e&&n}function E(e){if(e instanceof Error){var n={};return Object.getOwnPropertyNames(e).forEach(function(t){n[t]=e[t]}),n}return e}var L={};L.version="5.0.4",L.issueTrackingUrl="https://github.com/qoomon/Jira-Issue-Card-Printer",function(e,n,t,i,r,o,a){e.GoogleAnalyticsObject=r,e[r]=e[r]||function(){(e[r].q=e[r].q||[]).push(arguments)},e[r].l=1*new Date,o=n.createElement(t),a=n.getElementsByTagName(t)[0],o.async=1,o.src=i,a.parentNode.insertBefore(o,a)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create","UA-50840116-3",{alwaysSendReferrer:!0});try{var U=[r,o,a,s,c,d];n(U).catch(e)}catch(n){e(n)}}()}();