var Langapi = {
        userlang    : API.getUser().language,  
        en          : 'https://cdn.rawgit.com/Pogodaanton/PlugAssist/master/PAlang_en.json',
        fr          : 'null',
          
        lang        : function() { 
          if (this.userlang !== 'en' && this.userlang !== 'fr') {
            API.chatLog('Unfortunately, we have not got PlugAssist in your Language. If you want to help us send an e-mail to pogodaanton@shrib.com');
            return Langapi.en;
          } else if (this.userlang === 'en') {return Langapi.en;}
            else if (this.userlang === 'fr') {return Langapi.fr;}
        }
}

$.get(Langapi.lang(), function(lang){
var checkedaw = 0;
var PApi = {
		version     : "1.0 Beta",
        userName    : API.getUser().username,
        userRole    : API.getUser().role,
        Awoot       : false,
        TAwoot      : '',
        Join        : false,
        TJoin       : '',
        Afk         : false,
        TAfk        : '',
        DAfk        : 'Sorry, I am not here at the moment.',
		
	    chat        : function(message, cssClass) {
			$('#chat-messages').append('<div class="update PAInfo ' + cssClass + '">' + message + '</div>');
			$('#chat-messages').scrollTop($('#chat-messages').prop("scrollHeight"));
		},
		
		playChatSound: function() {
            //document.getElementById('chat-sound').playChatSound();
            var chatSound = new Audio("https://www.freesound.org/people/lukechalaudio/sounds/151568/download/151568__lukechalaudio__user-interface-generic.wav");
            chatSound.play();
        },
		
		playMentionSound: function() {
            document.getElementById('chat-sound').playMentionSound();
            //mentionsound.play();
        },
  
        setCookie   : function(cname,cvalue) {
            var d = new Date();
            d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname +"="+ cvalue +"; "+ expires +"; path=/";
        },
  
        getCookie   : function(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
            }
            return "";
        },
  
        /////////////////////////////////////////////////////////
        ///////////////// Basic scripts (ended) /////////////////
        /////////////////////////////////////////////////////////
  
        ToggleAutowoot: function() {
                this.Awoot = !this.Awoot;     
                this.TAwoot = this.Awoot ? 'block' : '';

                if (this.autoWoot) {
                  $('#woot').click();
                }
                if (!this.autoWoot) {
                }
          
                this.setCookie("TOGGLE_AUTOWOOT", this.Awoot); 
                //this.setCookie("TOGGLE_AUTOWOOT_1", this.TAwoot); 
        },
  
        ToggleOnJoin: function() {
                this.Join = !this.Join;     
                this.TJoin = this.Join ? 'block' : '';

                if (this.autoWoot) {
                  $('#joinch i.check').addClass('block');
                }
                if (!this.autoWoot) {
                }
          
                this.setCookie("TOGGLE_JOIN", this.Join); 
                //this.setCookie("TOGGLE_JOIN_1", this.TJoin); 
        },
  
        ToggleAfk: function() {
                this.Afk = !this.Afk;     
                this.TAfk = this.Afk ? 'block' : '';
                this.DAfk = this.Afk ? 'Sorry, I am not here at the moment.' : '';
                this.DisAfk = this.Afk ? 'disabled="disabled"' : ''; 

                if (this.Afk) {
                    $('#chat-input-field').prop('disabled');
                }
                if (!this.Afk) {
                    $('#chat-input-field').removeProp('disabled');
                }
          
                this.setCookie("TOGGLE_AFK", this.Afk); 
                //this.setCookie("TOGGLE_AFK_1", this.DisAfk); 
        },
  
        //////////////////////////////////////////////////////////
        ///////////////// Toggle scripts (ended) /////////////////
        //////////////////////////////////////////////////////////
        
        init        : function() {
                    this.Awoot         = this.getCookie('TOGGLE_AUTOWOOT') == 'true' ?  true : false;  
                    this.Join          = this.getCookie('TOGGLE_JOIN')     == 'true' ?  true : false;  
                    this.Afk           = this.getCookie('TOGGLE_AFK')      == 'true' ?  true : false;  
                    this.DAfk          = this.getCookie('AFK_MESSAGE');  
                    this.TAwoot        = this.Awoot     ? 'block' : ''; 
                    this.TJoin         = this.Join      ? 'block' : '';
                    this.TAfk          = this.Afk       ? 'block' : ''; 
          
                    if (this.Awoot) { $('#woot').click(); }
                    if (this.Afk == true) { $('#chat-input-field').attr('disabled', 'disabled');
                                            $('#chat-input-field').attr('placeholder', 'Disable AfkRespond to chat again!');
                                          }
          
                    API.on(API.ADVANCE, this.djAdvanced);
                    API.on(API.CHAT_COMMAND, this.commands);
                    API.on(API.CHAT, this.chtlggr);
                    API.on(API.USER_JOIN, this.OnJoin);
	
        },
        
        execute: function() {},
  
        djAdvanced: function(data) {
          if (API.getWaitListPosition() == 0) {
                PApi.chat('You are coming after this song!', 'aqua');
                PApi.playChatSound();
          }
          
          if (PApi.Awoot) { setTimeout(function() { $('#woot').click(); }, 2000); }
		  //PApi.playMentionSound();
		  //PApi.chat('Now playing:' + data.media.author +' - ' + data.media.title, 'red');
        },
  
        OnJoin: function(ob) {
          if (PApi.Join) {
            PApi.chat(ob.username +''+ lang.userJoin, 'aqua');
            PApi.playMentionSound();
          }
        },
        
        commands: function(command) { 
                switch(command) {
                    case('/close'):
                        PApi.chat(lang.close, 'red');
                        PApi.close();
                        break;
                    case('/soundtest'):
                        PApi.chat('Soundcheck!!', 'red');
                        PApi.playMentionSound();
                        break;
                    case('/clearchat'):
                        $('#chat-messages').empty();
                        break;
                    case('/id'):
                        API.chatLog(lang.please_select);
                        API.chatLog(lang.or_type);
                        $(document).one('click', '#chat-messages .from, #user-lists .user', function() {
                            var name = $('#user-rollover .meta span.username').text();
                            var users = API.getUsers();
                            var len = users.length;
                                for (var i = 0; i < len; ++i) {
                                    if (users[i].username == name) {
                                        PApi.chat(name + "'s ID is " + users[i].id, 'red')
                                    }
                                }
                        });
                        break;
                }
                
                if (command.indexOf("/id @") == 0) {
                    var name = command.substr(5).trim();
                    var users = API.getUsers();
                    var len = users.length;
                    for (var i = 0; i < len; ++i) {
                        if (users[i].username == name) {
                            PApi.chat('@'+ name + "'s ID is " + users[i].id, 'red')
                        }
                    }
                }
          
                if (command.indexOf("/lang ") == 0) {
                    var code = command.substr(6).trim();
                    var userlang = API.getUser().language;
                    PApi.chat('Your language is '+ userlang);
                }
        },
  
        chtlggr: function(data){
                var str = data.un;
                var Message = data.message;
                var sendname = API.getUser(data.uid).username;
                var log = function () {
                    return console.log.apply(
                        console,
                        ['['+new Date().toISOString().slice(11,-5)+']'].concat(
                            Array.prototype.slice.call(arguments)
                        )
                    );
                };
				
				
                switch(data.type){
                     case("message"):
							$('.message[data-cid="' + data.cid + '"]').addClass('uid-' + data.uid);
                            $('.message[data-cid="' + data.cid + '"]').addClass('role-' + API.getUser(data.uid).role);
							//$('.uid-4236470').append('<i class="icon icon-chat-Plugassist"></i>')
                            //log(data.uid);
							//log(data.cid);
                            break;
                     case("emote"):
							$('.emote[data-cid="' + data.cid + '"]').addClass('uid-' + data.uid);
                            $('.message[data-cid="' + data.cid + '"]').addClass('role-' + API.getUser(data.uid).role);
                            //log(data.uid);
							//log(data.cid);
                            break;
                     case("mention"):
							$('.mention[data-cid="' + data.cid + '"]').addClass('uid-' + data.uid);
                            $('.message[data-cid="' + data.cid + '"]').addClass('role-' + API.getUser(data.uid).role);
                            //log(data.uid);
							//log(data.cid);
                     break;
                }
				
				switch(data.uid){
					case(4236470):
						$('.icon-chat-Plugassist').remove();
						$('.uid-4236470').append('<i class="icon icon-chat-Plugassist"></i>');
                        break;
                    case(4067850):
                        break;
                    case(3454266):
                        $('.icon-chat-litebot').remove();
                        $('.uid-3454266').append('<i class="icon icon-chat-litebot"></i>');
                        break;
				}
                
                switch(Message){
                    case("!clearchat"):
                        //$('#chat-messages').empty();
                        break;
                    
                    case("!PA"):
                        API.sendChat('I am using the PlugAssist script in this language!');
                        break;
                    case("!afkdisable"):
                        break;
                        
                }
          
                if (Message.indexOf("@"+ API.getUser().username) == 0 && PApi.Afk == true && sendname !== API.getUser().username) {
                    API.sendChat('@'+ sendname + ' ' + PApi.DAfk);
                }
				
		},
  
        close: function() {
            API.off(API.CHAT, this.chtlggr);
			API.off(API.ADVANCE, this.djAdvanced);
            API.off(API.CHAT_COMMAND, this.commands);
            API.off(API.USER_JOIN, this.OnJoin);
          
            $('head style').remove();
            $('#PlugAssist-css').remove();
            $('#PA-button').remove();
            $('#PA-options').remove();
            $('i.icon-chat-Plugassist').remove();
            window.setTimeout(function() { 
              $('.PAInfo').remove();
            }, 2000);
        }
		
}

//var autowoot = $(' #autowootch i.check[class="icon icon-check-blue check block"]');
/////////////////////////////////////////////
////////////////// PApi /////////////////////
/////////////////////////////////////////////

function changenames(){
	var colorValue1 = $('#Ycolor').val();
	var colorValue2 = $('#Scolor').val();
    var colorValue22 = $('#S2color').val();
    var colorValue23 = $('#S3color').val();
    var colorValue24 = $('#S4color').val();
	var colorValue3 = $('#Rcolor').val();
	var colorValue4 = $('#Acolor').val();
	var colorValue5 = $('#Mcolor').val();
	
	$('head style').remove();
	$('head').append('<style>.from.you, .is-you .name {color:' + colorValue1 + ' !important;} .role-2 span {color:' + colorValue2 + ' !important;} .from.dj, .is-dj .name, #user-rollover.is-staff .info .role span {color:' + colorValue3 + ' !important;} .from.ambassador, .is-ambassador .name, #user-rollover.is-ambassador .info .role span {color:' + colorValue4 + ' !important;} #chat .moderation, #chat .moderation .from {color:' + colorValue5 + ';} .role-3 span {color:' + colorValue22 + ' !important;} .role-4 span {color:' + colorValue23 + ' !important;} .role-5 span {color:' + colorValue24 + ' !important;}</style>')
}

API.moderateDeleteChat = function (cid) {
    $.ajax({
        url: "https://plug.dj/_/chat/" + cid,
        type: "DELETE"
    })
};

function Afkmessage() {
  var AMessage = $('#Afk-input-field').val();
  
  if(AMessage === "") {
    AMessage = "I am not here at the moment.";
    
    PApi.DAfk = AMessage;
    PApi.setCookie("AFK_MESSAGE", PApi.DAfk); 
  } else { 
    PApi.DAfk = AMessage;
    PApi.setCookie("AFK_MESSAGE", PApi.DAfk); 
  }
}

/////////////////////////////////////////////
//////////////// Startup ////////////////////
/////////////////////////////////////////////
PApi.init();
PApi.chat(lang.start +' '+ PApi.version, 'red');
Afkmessage();
PApi.execute();

//////////////////////////////////////
/////////////// Core ////////////////
/////////////////////////////////////
define('f5d864/e4f04b', ['jquery', 'f5d864/cfab2d', 'f5d864/dcda5c', 'f5d864/efbc3a/d96089'], function($, p3Lang, p3Utils, _$context) {
  
    $('#PA-button').hover(function(){
        //e.trigger('tooltip:show', 'Options', $('#PA-button'), true);
        _$context.trigger('tooltip:show', lang.Options, $('#PA-button'), true);
        //_$context.trigger('notify', 'icon-woot','Test');
    }, function() {
        _$context.trigger('tooltip:hide');
    });
  
    $('#PA-button .header .button main').hover(function(){
        //e.trigger('tooltip:show', 'Options', $('#PA-button'), true);
        _$context.trigger('tooltip:show', 'Main settings', $('#PA-button .header .button main'), true);
        //_$context.trigger('notify', 'icon-woot','Test');
    }, function() {
        _$context.trigger('tooltip:hide');
    });
  
    $('#PA-button .header .button color').hover(function(){
        //e.trigger('tooltip:show', 'Options', $('#PA-button'), true);
        _$context.trigger('tooltip:show', 'Color settings', $('#PA-button .header .button color'), true);
        //_$context.trigger('notify', 'icon-woot','Test');
    }, function() {
        _$context.trigger('tooltip:hide');
    });
  
});

var options = '	<div id="PA-options">\
	<div class="header">\
        <div class="button main selected">\
            <i class="icon icon-community-users"></i>\
        </div>\
        <div class="button color">\
            <i class="icon icon-staff"></i>\
        </div>\
		<div class="divider left"></div>\
        <div class="divider right"></div>\
	</div>\
    <div class="list-header">\
        <span class="title">'+ lang.POptions +'</span>\
        <div class="clear-filter" style="display: none;">\
            <i class="icon icon-clear-input"></i>\
        </div>\
    </div>\
	<div class="list main block" tabindex="0"><div class="jspContainer" style="width: 345px; height: 794px;"><div class="jspPane" style="padding: 0px; top: 0px; left: 0px; width: 331px;">\
	<div id="autowootch" class="user clickable" draggable="false"><i class="icon icon-drag-handle"></i>\
		<div class="meta is-ambassador">\
			<div class="name" style="color:#fff !Important;"><i class="icon icon-chat-bouncer"></i><span>'+ lang.Autowoot +'</span></div>\
		</div>\
		<i class="icon icon-check-blue check '+ PApi.TAwoot +'" style="display:none;"></i>\
		<i class="icon icon-x-white"></i>\
	</div>\
    <div id="joinch" class="user clickable" draggable="false"><i class="icon icon-drag-handle"></i>\
		<div class="meta is-ambassador">\
			<div class="name" style="color:#fff !Important;"><i class="icon icon-chat-bouncer"></i><span>'+ lang.JMessage +'</span></div>\
		</div>\
		<i class="icon icon-check-blue check '+ PApi.TJoin +'" style="display:none;"></i>\
		<i class="icon icon-x-white"></i>\
	</div>\
    <div id="Afkch" class="user clickable" draggable="false"><i class="icon icon-drag-handle"></i>\
		<div class="meta is-ambassador">\
			<div class="name" style="color:#fff !Important;"><i class="icon icon-chat-bouncer"></i><input id="Afk-input-field" type="text" placeholder="'+ lang.AFKrespond +'" value="I am not here at the moment." maxlength="256" oninput="Afkmessage()">\</div>\
		</div>\
		<i class="icon icon-check-blue check '+ PApi.TAfk +'" style="display:none;"></i>\
		<i class="icon icon-x-white"></i>\
	</div>\
	<div class="jspVerticalBar"><div class="jspCap jspCapTop"></div><div class="jspTrack" style="height: 794px;"><div class="jspDrag" style="height: 550px; top: 0px;"><div class="jspDragTop"></div><div class="jspDragBottom"></div></div></div><div class="jspCap jspCapBottom"></div></div></div></div></div>\
\
\
\
	<div class="list color" tabindex="0"><div class="jspContainer" style="width: 345px; height: 794px;"><div class="jspPane" style="padding: 0px; top: 0px; left: 0px; width: 331px;"><div class="user locked" data-uid="4105934" draggable="false"><i class="icon icon-drag-handle"></i>\
		<div class="meta is-ambassador">\
			<div class="name" style="color:#fff !Important;"><i class="icon icon-chat-bouncer"></i><span>'+ lang.Colorset +'</span></div>\
		</div>\
		<i class="icon icon-woot-disabled"></i>\
		<i class="icon icon-x-white"></i></div>\
		<div class="user" draggable="false"><i class="icon icon-drag-handle"></i>\
		<div class="meta">\
			<div class="name"><i></i><span>'+ lang.You +'</span></div>\
		</div>\
		<i class="icon icon-woot-disabled"></i>\
		<input type="color" value="#FFDD6F" id="Ycolor" class="CHC" name="Ycolor" oninput="changenames()">\
	</div>\
	<div class="user" draggable="false"><i class="icon icon-drag-handle"></i>\
		<div class="meta">\
			<div class="name"><i></i><span>'+ lang.Bouncer +'</span></div>\
		</div>\
		<i class="icon icon-woot-disabled"></i>\
		<input type="color" value="#AC76FF" id="Scolor" name="Scolor" class="CHC" oninput="changenames()">\
	</div>\
    <div class="user" draggable="false"><i class="icon icon-drag-handle"></i>\
		<div class="meta">\
			<div class="name"><i></i><span>'+ lang.Manager +'</span></div>\
		</div>\
		<i class="icon icon-woot-disabled"></i>\
		<input type="color" value="#AC76FF" id="S2color" name="S2color" class="CHC" oninput="changenames()">\
	</div>\
    <div class="user" draggable="false"><i class="icon icon-drag-handle"></i>\
		<div class="meta">\
			<div class="name"><i></i><span>'+ lang.CoOwner +'</span></div>\
		</div>\
		<i class="icon icon-woot-disabled"></i>\
		<input type="color" value="#AC76FF" id="S3color" name="S3color" class="CHC" oninput="changenames()">\
	</div>\
    <div class="user" draggable="false"><i class="icon icon-drag-handle"></i>\
		<div class="meta">\
			<div class="name"><i></i><span>'+ lang.Owner +'</span></div>\
		</div>\
		<i class="icon icon-woot-disabled"></i>\
		<input type="color" value="#AC76FF" id="S4color" name="S4color" class="CHC" oninput="changenames()">\
	</div>\
	<div class="user" draggable="false"><i class="icon icon-drag-handle"></i>\
		<div class="meta">\
			<div class="name"><i></i><span>'+ lang.ResidentDJ +'</span></div>\
		</div>\
		<i class="icon icon-woot-disabled"></i>\
		<input type="color" value="#AC76FF" id="Rcolor" name="Rcolor" class="CHC" oninput="changenames()">\
	</div>\
	<div class="user" draggable="false"><i class="icon icon-drag-handle"></i>\
		<div class="meta">\
			<div class="name"><i></i><span>'+ lang.Ambassador +'</span></div>\
		</div>\
		<i class="icon icon-woot-disabled"></i>\
		<input type="color" value="#89BE6C" id="Acolor" name="Acolor" class="CHC" oninput="changenames()">\
	</div>\
	<div class="user" draggable="false"><i class="icon icon-drag-handle"></i>\
		<div class="meta">\
			<div class="name"><i></i><span>'+ lang.Moderation +'</span></div>\
		</div>\
		<i class="icon icon-woot-disabled"></i>\
	<input type="color" value="#AC76FF" id="Mcolor" name="Mcolor" class="CHC" oninput="changenames()">\
	</div>\
	<div class="jspVerticalBar"><div class="jspCap jspCapTop"></div><div class="jspTrack" style="height: 794px;"><div class="jspDrag" style="height: 550px; top: 0px;"><div class="jspDragTop"></div><div class="jspDragBottom"></div></div></div><div class="jspCap jspCapBottom"></div></div></div></div>\
</div>'



                    $('head').append('<style></style>')
                    $('body').prepend('<link rel="stylesheet" type="text/css" id="PlugAssist-css" href="https://www.dropbox.com/s/ebiwavmeh2sqsx1/plug.css?dl=1" />');
                    $('head').append('<script type="text/javascript" id="PlugAssist-js1" src="https://www.dropbox.com/s/zbpo228l3b2pthm/toggleattr.js?dl=1"></script>');
                    $('#header-panel-bar').append('<div id="PA-button" class="header-panel-button"><i class="icon icon icon-settings-white"></i></div>');
                    $('.app-right').append(options);

                    $('#Afk-input-field').val(PApi.DAfk);

                    $('#PA-button').hover(function(){
	                   $('body').append('<div class="right options" id="tooltip"><span>'+ lang.Options +'</span><div class="corner"></div></div>');
                    },function(){
	                    $('#tooltip').remove();
                    });
            
                    $('#chat-button').on('click', function() { $('#PA-options').removeClass('block'); 
										   $('#chat').removeClass('noblock'); 
										   $('#PA-button').removeClass('selected'); }); 
										   
                    $('#users-button').on('click', function() {$('#PA-options').removeClass('block');
										   $('#user-lists').removeClass('noblock');
										   $('#PA-button').removeClass('selected')}); 
										   
                    $('#waitlist-button').on('click', function() {$('#PA-options').removeClass('block'); 
											  $('#waitlist').removeClass('noblock'); 
											  $('#PA-button').removeClass('selected'); }); 
                    
                    $('#friends-button').on('click', function() {$('#PA-options').removeClass('block');
										   $('.friends').removeClass('noblock');
										   $('#PA-button').removeClass('selected')}); 
          
                    $('#PA-button').on('click', function() { 
								$('#chat-button').removeClass('selected');
								$('#users-button').removeClass('selected');
								$('#waitlist-button').removeClass('selected');
								$('#friends-button').removeClass('selected');
								$('#PA-options').addClass('block'); 
								$('#waitlist').addClass('noblock');
								$('#user-lists').addClass('noblock');
                    			$('.friends').addClass('noblock');
								$('#chat').addClass('noblock');
								$('#PA-button').addClass('selected');
                                });

					$('#PA-options .header .button.color').on('click', function() {
                                $('.list.main').removeClass('block');
                                $('.list.color').addClass('block'); 
                                $('#PA-options .header .button.main').removeClass('selected');
                                $('#PA-options .header .button.color').addClass('selected'); 
                                });

                    $('#PA-options .header .button.main').on('click', function() {
                                $('.list.color').removeClass('block');
                                $('.list.main').addClass('block'); 
                                $('#PA-options .header .button.color').removeClass('selected');
                                $('#PA-options .header .button.main').addClass('selected'); 
                                });
                    
                    $('#autowootch').on('click', function() { PApi.ToggleAutowoot(); $('#autowootch i.check').toggleClass('block');}); 
                    $('#joinch').on('click', function() { PApi.ToggleOnJoin(); $('#joinch i.check').toggleClass('block');});
                    $('#Afkch').on('click', function() { PApi.ToggleAfk();
                                                         $('#Afkch i.check').toggleClass('block');
                                                         $('#chat-input-field').toggleAttr('disabled');
                                                         $('#chat-input-field').toggleAttr('placeholder', lang.chat_input_afk);
                                                       });
  
              });
