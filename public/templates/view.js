!function(){var s=Handlebars.template,r=Handlebars.templates=Handlebars.templates||{};r.chat=s({compiler:[7,">= 4.0.0"],main:function(s,r,n,i,t){return'<!DOCTYPE html>\r\n<html>\r\n    <head>\r\n        <link rel="stylesheet" href="/css/chat.css">\r\n    </head>\r\n    <body>\r\n        <div class="chat">\r\n            <div class="header">\r\n                <div id="user_info"></div>\r\n                <div id="logout">logout</div>\r\n            </div>\r\n\r\n            <div class="chat-history">\r\n                <ul id="chat">\r\n                    \r\n                </ul>\r\n            </div>\r\n            <div class="chat-message clearfix">\r\n                <textarea name="message-to-send" id="message" placeholder ="Type your message" rows="3"></textarea>   \r\n                <i class="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;\r\n                <i class="fa fa-file-image-o"></i>\r\n                <button id="send_location">Share Location</button>\r\n                <button id="send_message">Send</button>\r\n            </div>\r\n        </div>\r\n        <script src="http://builds.handlebarsjs.com.s3.amazonaws.com/handlebars-3ce4425.js"><\/script>\r\n        <script src="/templates/helpers/helpers.js"><\/script>\r\n        <script src="/templates/partials.js"><\/script>\r\n        <script src="/socket.io/socket.io.js"><\/script>\r\n        <script type="module" src="/libs/ajax.js"><\/script>\r\n        <script type="module" src="/scripts/chat.js"><\/script>\r\n    </body>\r\n</html>'},useData:!0}),r.login=s({compiler:[7,">= 4.0.0"],main:function(s,r,n,i,t){return'<!DOCTYPE html>\r\n<html>\r\n    <head>\r\n        <link rel="stylesheet" href="/css/login.css">\r\n    </head>\r\n    <body>\r\n        <div class="form-structor">\r\n            <div class="signup">\r\n                <h2 class="form-title" id="go_signup"><span>or</span>Sign up</h2>\r\n                <div class="form-holder">\r\n                    <input id="signup_name" type="text" class="input" placeholder="Username" />\r\n                    <input id="signup_mail" type="email" class="input" placeholder="Email" />\r\n                    <input id="signup_password" type="password" class="input" placeholder="Password" />\r\n                    <div class="error" id="signup_error"></div>\r\n                </div>\r\n                <button id="signup" class="submit-btn">Sign up</button>\r\n            </div>\r\n            <div class="login slide-up">\r\n                <div class="center">\r\n                    <h2 class="form-title" id="go_login"><span>or</span>Log in</h2>\r\n                    <div class="form-holder">\r\n                        <input id="login_name" type="text" class="input" placeholder="Username" />\r\n                        <input id="login_password" type="password" class="input" placeholder="Password" />\r\n                        <div class="error" id="login_error"></div>\r\n                    </div>\r\n                    <button id="login" class="submit-btn">Log in</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <script type="module" src="/libs/ajax.js"><\/script>\r\n        <script type="module" src="/scripts/login.js"><\/script>\r\n    </body>\r\n</html>'},useData:!0})}();