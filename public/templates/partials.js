!function(){var n=Handlebars.template,a=Handlebars.templates=Handlebars.templates||{};a["chat-event"]=n({compiler:[7,">= 4.0.0"],main:function(n,a,e,s,l){var t;return'<li class="clearfix">\r\n    <div class="message-data align-center">\r\n        <span class="message-data-name" >'+n.escapeExpression("function"==typeof(t=null!=(t=e.event||(null!=a?a.event:a))?t:e.helperMissing)?t.call(null!=a?a:n.nullContext||{},{name:"event",hash:{},data:l}):t)+"</span>\r\n    </div>\r\n</li>"},useData:!0}),a["other-message"]=n({1:function(n,a,e,s,l){var t,r=null!=a?a:n.nullContext||{},i=e.helperMissing;return(null!=(t=(e.case||a&&a.case||i).call(r,"LOCATION",{name:"case",hash:{},fn:n.program(2,l,0),inverse:n.noop,data:l}))?t:"")+(null!=(t=(e.case||a&&a.case||i).call(r,"MESSAGE",{name:"case",hash:{},fn:n.program(4,l,0),inverse:n.noop,data:l}))?t:"")},2:function(n,a,e,s,l){var t;return"                <iframe src="+n.escapeExpression("function"==typeof(t=null!=(t=e.content||(null!=a?a.content:a))?t:e.helperMissing)?t.call(null!=a?a:n.nullContext||{},{name:"content",hash:{},data:l}):t)+"></iframe>\r\n"},4:function(n,a,e,s,l){var t;return"                "+n.escapeExpression("function"==typeof(t=null!=(t=e.content||(null!=a?a.content:a))?t:e.helperMissing)?t.call(null!=a?a:n.nullContext||{},{name:"content",hash:{},data:l}):t)+"\r\n"},compiler:[7,">= 4.0.0"],main:function(n,a,e,s,l){var t,r,i=null!=a?a:n.nullContext||{},c=e.helperMissing,o="function",u=n.escapeExpression;return'<li class="clearfix">\r\n    <div class="message-data">\r\n        <span class="message-data-name"><i class="fa fa-circle online"></i>'+u(typeof(r=null!=(r=e.user||(null!=a?a.user:a))?r:c)==o?r.call(i,{name:"user",hash:{},data:l}):r)+'</span>\r\n        <span class="message-data-time">'+u(typeof(r=null!=(r=e.time||(null!=a?a.time:a))?r:c)==o?r.call(i,{name:"time",hash:{},data:l}):r)+'</span>\r\n    </div>\r\n    <div class="message other-message">\r\n'+(null!=(t=(e.switch||a&&a.switch||c).call(i,null!=a?a.type:a,{name:"switch",hash:{},fn:n.program(1,l,0),inverse:n.noop,data:l}))?t:"")+"    </div>\r\n</li>"},useData:!0}),a["room-list"]=n({1:function(n,a,e,s,l){var t=n.lambda,r=n.escapeExpression;return'    <li class="clearfix chat-room" id="'+r(t(a,a))+'" onclick="window.chat.selectRoom(`'+r(t(a,a))+'`)">\r\n        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg" alt="avatar" />\r\n        <div class="about">\r\n            <div class="name">'+r(t(a,a))+'</div>\r\n            <div class="status">\r\n                <i class="fa fa-circle">last message</i>\r\n            </div>\r\n        </div>\r\n    </li>\r\n'},compiler:[7,">= 4.0.0"],main:function(n,a,e,s,l){var t;return null!=(t=e.each.call(null!=a?a:n.nullContext||{},null!=a?a.rooms:a,{name:"each",hash:{},fn:n.program(1,l,0),inverse:n.noop,data:l}))?t:""},useData:!0}),a["self-message"]=n({1:function(n,a,e,s,l){var t,r=null!=a?a:n.nullContext||{},i=e.helperMissing;return(null!=(t=(e.case||a&&a.case||i).call(r,"LOCATION",{name:"case",hash:{},fn:n.program(2,l,0),inverse:n.noop,data:l}))?t:"")+(null!=(t=(e.case||a&&a.case||i).call(r,"MESSAGE",{name:"case",hash:{},fn:n.program(4,l,0),inverse:n.noop,data:l}))?t:"")},2:function(n,a,e,s,l){var t;return"                <iframe src="+n.escapeExpression("function"==typeof(t=null!=(t=e.content||(null!=a?a.content:a))?t:e.helperMissing)?t.call(null!=a?a:n.nullContext||{},{name:"content",hash:{},data:l}):t)+"></iframe>\r\n"},4:function(n,a,e,s,l){var t;return"                "+n.escapeExpression("function"==typeof(t=null!=(t=e.content||(null!=a?a.content:a))?t:e.helperMissing)?t.call(null!=a?a:n.nullContext||{},{name:"content",hash:{},data:l}):t)+"\r\n"},compiler:[7,">= 4.0.0"],main:function(n,a,e,s,l){var t,r,i=null!=a?a:n.nullContext||{},c=e.helperMissing,o="function",u=n.escapeExpression;return'<li class="clearfix">\r\n    <div class="message-data align-right">\r\n        <span class="message-data-time" >'+u(typeof(r=null!=(r=e.time||(null!=a?a.time:a))?r:c)==o?r.call(i,{name:"time",hash:{},data:l}):r)+'</span> &nbsp; &nbsp;\r\n        <span class="message-data-name" >'+u(typeof(r=null!=(r=e.user||(null!=a?a.user:a))?r:c)==o?r.call(i,{name:"user",hash:{},data:l}):r)+'</span> <i class="fa fa-circle me"></i>\r\n    </div>\r\n    <div class="message my-message float-right">\r\n'+(null!=(t=(e.switch||a&&a.switch||c).call(i,null!=a?a.type:a,{name:"switch",hash:{},fn:n.program(1,l,0),inverse:n.noop,data:l}))?t:"")+"    </div>\r\n</li>"},useData:!0})}();