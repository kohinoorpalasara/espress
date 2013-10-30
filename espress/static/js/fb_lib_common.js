//added by BS to hold friends cache
FBfriends_info = {};


// JavaScript Document  // Initialize library with the API key
//FB._https = (window.location.protocol == "https:");
/*modified by dev-SN|4-17-2013*/

FB.init({
    apiKey: FB_APP_ID_JS,
    channelUrl : HTTP_HOST + '/channel.html', // Channel File
    status: true,
    cookie: true,
    oauth: true,
    xfbml: true
});	
FB.getLoginStatus(handleSessionResponse);

try{	
// FB.Canvas.setAutoResize();
//FB.Canvas.setSize();
}catch(err){}

createTripWelcome = false;
// Fetch the status on load
function handleSessionResponse(response) {
    //if(LOGIN_SESSION == "0"){    
    if(response.status == 'connected'){ 
        $("#header").removeClass('welcomeHeader');
        $("#facepile_div").hide();
        FB.api('/me', function(response) {
            fbUid = response['id'];
            if(typeof (fbUid)!= 'undefined'){
                FB_LOGIN = "1";                    
                updateLogoutLink(response['first_name'], response['pic_square'], response['id']);
                member_login_check(response['id']);
                anonymousUser = false;
            }
        });
    }else if (response.status == 'not_authorized'){
        updateLoginLink();
        $("#header").addClass('welcomeHeader');
        $("#facepile_div").show();
    }else{
        $("#facepile_div").hide();
        $("#header").addClass('welcomeHeader');
        anonymousUser = true;
        url = '/api/logout/direct/1/rand/' + parseInt(Math.random() * 99999999);
        $.get(url, function(data) {
            if(data == 'success'){
                updateLoginLink();
                FB_LOGIN=0;
            }
        });
    }
    //}else{
    //  $("#header").removeClass('welcomeHeader');
    // $("#facepile_div").hide();
    // }
    var hash = window.location.hash;
    if(hash == '' || hash =="#Welcome"){                
    }else{
        hideFbFacePile();
    }
}//end of function handleSessionResponse

function handleFbLoginStatus(response) {    
    if(response.status == 'connected'){
        $("#header").removeClass('welcomeHeader');
        $("#facepile_div").hide();
        return true;
    }else if (response.status === 'not_authorized'){
        $("#header").addClass('welcomeHeader');
        $("#facepile_div").show();
    }else{
        $("#header").addClass('welcomeHeader');
        $("#facepile_div").hide();
        return false;
    }//end of else block
}//end of function handleLoginStatus

function member_login_check(fbUid) {
    //alert("member_login_check");
    url = '/api/session/rand/' + parseInt(Math.random() * 99999999);
    $.get(url, function(json) {                          
        if(json.attempt == "success"){
            $("#header").removeClass('welcomeHeader');
            $("#facepile_div").hide();
            var tripFlag = getCookie("createTrip");
            $('#userId').val(json.id);
            try{
                if(thisMovie('flashMapId')){
                    thisMovie('flashMapId').userLoginedNow(json.id);
                }else{	
                    if(friendTripFlag == true){
                        if( document.getElementById("friend_trip_wrapper").style.display == "block" ){
                            document.getElementById("friendtrip_right").innerHTML='<div style="padding:20px 0 150px 0;" align="center">Loading..<br /> <img src="/images/preloader.gif" alt=""/></div>';
                            global_trip_id='';
                            tripId='';							
                            $("#friendsTripsId").trigger('click');
                        }
                    }else{
                        getMyTripList();
                        checkForCurrentTripItems(json);
                        if(json.tripId!='0'){
                            //showTripPushPin(json.tripId);
                            getTripPushPinsResult(json.tripId);
                        }
                    }
                    if(createTripWelcome == true){
                        $('#rootvectormap').vectorMap('set','hideAllPin',1);	
                        $("#myTripsId").trigger('click');
                        addNewTrip();
                    //createTripWelcome = false;
                    }                               
                    $("#trip_change_text").show();                                
                }
            }catch(err){}
			
            if(tripFlag == 1){
                updateGeoramaWelcomeScreen();
                deleteCookie("createTrip");
            }	
            global_trip_id = json.tripId;
        }
    });
}

var fbUid = '';
function member_login_header(callback) {
    permissions = new Array(
        // extended permissions
        //'publish_checkins',
        'publish_stream',
        // user and friend permissions
        'user_about_me',
        'friends_about_me',
        'user_activities',
        'friends_activities',
        'user_birthday',
        'friends_birthday',
        'user_checkins',
        'friends_checkins',
        'user_education_history',
        'friends_education_history',
        'user_hometown',
        'friends_hometown',
        'user_interests',
        'friends_interests',
        'user_likes',
        'friends_likes',
        'user_location',
        'friends_location',
        'user_photos',
        'friends_photos',
        'user_relationships',
        'friends_relationships',
        'user_relationship_details',
        'friends_relationship_details',
        'user_religion_politics',
        'friends_religion_politics',
        'user_status',
        'friends_status',
        'user_subscriptions',
        'friends_subscriptions',
        'user_videos',
        'friends_videos',
        'user_website',
        'friends_website',
        'user_work_history',
        'friends_work_history',
        'email',
        'offline_access',
        'read_stream',
        // offline access
        'offline_access'
        );


    FB.login(function(fbresponse) {	
        if(fbresponse.authResponse == null){
            createTripWelcome = false;
        }
        if (fbresponse.authResponse) {
                
            FB.api('/me', function(response) {
                fbUid = response['id'];
                if(typeof (fbUid)!= 'undefined'){
                    updateLogoutLink(response['first_name'], response['sqrpic'], fbUid);
                    $("#header").removeClass('welcomeHeader');
                    $("#facepile_div").hide();
                    url = '/api/session/rand/' + parseInt(Math.random() * 99999999);                    
                    $.get(url, function(json) {                        
                        if(json.attempt == "success"){                                  
                            anonymousUser = false;
                            var varshowdialog = false;
                            $("#tripPlaceId").val('');
                            $("#tripPartId").val('');
                            $("#OutrContainer").addClass("loggedin");
                            $('#trip_change_text').show();
                            $('#userId').val(json.id);
                            checkForCurrentTripItems(json);
                            FB_LOGIN = "1";
                            if(SharetabSignIn == "posttofeedRight"){
                                postToFeed("http://www.georama.com","http://georama.com/images/facebook-icon.png", 'Georama - Plan. Book. Share.', '','Georama is the world\'s first map-based travel platform and the only one-stop solution for travelers. It brings together the best content, fares, and social networks under one roof – helping travelers plan, book, and share their trips on a one-of-a-kind interactive map!');
                            }
                            TRIPIT_CRED = json.tripit == 1 ? true : false;
                            treatCallback(callback);
                            var tripFlag = getCookie("createTrip");
                            // getmytriplist called here otherwise in below cases we need to call saperate.
                            getMyTripList();
                            $("#trip_change_text").show();						
                            if((anonymousSaveTrip == true)){
                                if(json.pinExists !=0){
                                    editMyTrip(json.anonymousTid);
                                    //$("#myTripsId").trigger('click');
                                    anonymousSaveTrip = false;
                                }else{                                           
                                    anonymousSaveTrip = false;
                                    $("#myTripsId").trigger('click');
                                }
                            }else if(surfMode=='Share'){
                                varshowdialog = true;
                                $("#shareTab").trigger('click');						
                            }else if(anonymousCreateTrip == true){
                                $("#myTripsId").trigger('click');
                                addNewTrip();
                                anonymousCreateTrip = false;							
                            }else if( document.getElementById("my_trip_wrapper").style.display == "block" ) {
                                varshowdialog = true;
                                // if mytrip panel is open and user clicks on login from header							
                                $("#myTripsId").trigger('click');
                            }else if(activeExploreTab == 'Friends'){
                                // if explore panel is open and user clicks on friends tab and login then frieds data will automaticall loaded
                                openFriendCategory('Dashboard');
                                varshowdialog = true;
                            //$("#cfriends").trigger('click');							
                            }else if( document.getElementById("friend_trip_wrapper").style.display == "block" ){
                                document.getElementById("friendtrip_right").innerHTML='<div style="padding:20px 0 150px 0;" align="center">Loading..<br /> <img src="/images/preloader.gif" alt=""/></div>';
                                global_trip_id='';
                                tripId='';							
                                $("#friendsTripsId").trigger('click');
                                //friendsTripsClick();
                                varshowdialog = true;
                            }else if(createTripWelcome == true){
                                $('#rootvectormap').vectorMap('set','hideAllPin',1);
                                $("#myTripsId").trigger('click');
                                addNewTrip();
                            //createTripWelcome = false;
                            }else if(activeExploreTab == 'Info'){
                                varshowdialog = true;
                                updateInfoTabFriend($("#hdnCityId").val());
                            }else if(reviewsectionRefresh==true){
                                varshowdialog = true;
                                reviewsectionRefresh=false;
                                if(activeExploreTab=='Attractions'){
                                    var reviewId= 'myTripUserReviews_1';
                                }else if(activeExploreTab=='Restaurants'){
                                    var reviewId= 'myTripUserReviews_3';
                                }else if(activeExploreTab=='Nightlife'){
                                    var reviewId= 'myTripUserReviews_4';
                                }else if(activeExploreTab=='Shopping'){
                                    var reviewId= 'myTripUserReviews_6';
                                }else if(activeExploreTab=='Hotels'){
                                    var reviewId= 'myTripUserReviews_11';
                                }else if(activeExploreTab=='Hostels'){
                                    var reviewId= 'myTripUserReviews_16';
                                }
                                $("#"+reviewId).trigger('click');
                            }else{  
                                quickNavTripId = Number(document.getElementById("tripPlaceId").value);                                      
                                if( $('#georama_welcome_overlay').is(':visible') == false) {
                                    onLoadOneTimeCallData();
                                    var pcount = map.getPushpinCount();
                                    if(parseInt(pcount.DP)>0 || parseInt(pcount.PD)>0){
                                        varshowdialog = true;
                                    }else{
                                        showTripPushPin(json.tripId);
                                    }
                                }else{
                                    getTripPushPinsResult(json.tripId);
                                    tripDataLoadedOnceViaWelcome = false;
                                }
                            }
									
                            if(tripFlag == 1){
                                updateGeoramaWelcomeScreen();
                                deleteCookie("createTrip");
                            }
                            if(loginFromPlan == true){
                                if((json.tripId !=0) && (json.autoUpdate == true)){
                                    updateTripDetail(json.tripId);
                                }
                            }
                            try{
                                if(thisMovie('flashMapId')){
                                    thisMovie('flashMapId').userLoginedNow(json.id);
                                }
                                try{	
                                }catch(err){}
                            }catch(err){}

                            $("ul.topnav li span").show();
                            if (varshowdialog == true){
                                if(json.pinExists){
                                    CallOverWriteUntitledTrip(json.anonymousTid, json.tripId);
                                }
                            }                                    
                            if(SharetabSignIn == 'facebook'){
                                tripShareFromTopNav(location.hostname,'facebook');
                            }
                            if(SharetabSignIn == 'twitter'){
                                tripShareFromTopNav(location.hostname,'twitter');
                            }
									
                            global_trip_id = json.tripId;
                        }					
                    });	
                }		
            });
        }
    }, {
        scope:permissions.join(',')
    });
}
$(function(){

    })


function CallOverWriteUntitledTrip(atid,tid){
    var pcount = map.getPushpinCount();
    if(parseInt(pcount.DP)>0 || parseInt(pcount.PD)>0){
        showDialog(atid,tid);
    }
}

function treatCallback(callback){
    if(callback==null){
        return;
    }
	
    param=callback.split("|",3);
    if(param[0]=="friends"){
        fb_friends(param[1], param[2]);	
    }
	
}

function fb_friends(city, country){
    $.ajax({ 
        type: "GET", 
        url: "/api/fbfriends/city/" + city + "/country/" + country, 
        success: function(json, status){
            //alert("/api/fbfriends/city/" + city + "#####" + json);
            thisMovie('flashMapId').flash_fb_friends(json);
            thisMovie('flashMapWidgetId').flash_fb_friends('');
        }, 
        error:function(jqXHR, textStatus, errorThrown){ 
            thisMovie('flashMapId').flash_fb_friends('');
            thisMovie('flashMapWidgetId').flash_fb_friends('');
        }
    });
}

var logout = null;

function member_logout() {
    if( logout != null ) {
        logout.abort();
        logout = null;
    }
    var url = '/api/logout';
    var params = 'rand='+parseInt(Math.random() * 99999999);
    logout = $.ajax({
        type: "GET",
        url: url,
        data: params,
        success: function(data) {
            try{
                thisMovie('flashMapId').userLoginedNow('');
            }catch(err) {}
            try{
                $('#rootvectormap').vectorMap('set','hideAllPin',1);
            }catch(err) {}
            FB_LOGIN = "0";
            LOGIN_SESSION = "0";
            loginFromPlan = false;
            $("#header").addClass('welcomeHeader');
            updateLoginLink();
            $("#OutrContainer").removeClass('loggedin');
            updateTripMenuOnLogout();
            if(typeof (panelFlag)!= 'undefined'){
                if(panelFlag == 'friend'){
                    resetPanelData();
                }
            }
            if(data == 'success'){
                //$("#header").removeClass('welcomeHeader');
                //$("#facepile_div").hide();
                FB.logout(function(response) {
                    window.location.replace(HTTP_HOST);
                });
            }
        }
    });
}//end of function

function fetchfriends(){
    url = '/api/fbfriends/rand/' + parseInt(Math.random() * 99999999);
    $.get(url, function(data) {
        alert(data);
    });
}


function fbwallpost(message, description, picture, name, hreftext, href){
    url = '/fbapi/wallpost/message/' + message + '/description/' + description + '/picture/' + picture + '/name/' + name + '/hreftext/' + hreftext + '/href/' + href;
    $.get(url, function(data) {
        alert(data);
    });
}

function updateLoginLink(){
    document.getElementById("loginPanel").innerHTML = '<a id="a_loginFromHeader" href="javascript://" class="header-facebook" onclick="member_login_header();" ><img src="/images/facebook-sign-in.gif"  align="absmiddle" /></a>';	
}

function updateLogoutLink(name, picurl, fbid){
    if(picurl==null){
        picurl= "/images/facebook-default-image.png";
    }
    if(fbid!=''){
        picurl = 'https://graph.facebook.com/'+fbid+'/picture';
    }
	
    document.getElementById("loginPanel").innerHTML = '<ul id="signinnav"><li><img src="' + picurl +'" class="facebook-img" align="absmiddle" height="30" /></li><li><span id="user_name">' + name + '</span></li><li><img src="/images/header-separator.png" align="absmiddle" /></li><li><a href="javascript:void(0);" id="logout" class="logoutbtn" onclick="georamaLogOut();"></a></li></ul>';
	
//document.getElementById("loginPanel").innerHTML = '<ul id="signinnav"><li><img src="' + picurl +'" class="facebook-img" align="absmiddle" height="30" /></li><li><span>' + name + '</span></li><li><img src="/images/header-separator.png" align="absmiddle" /></li><li><a href="javascript:;" onclick="open_menu()" class="dropmenu" alt="Click here to open menu" title="Click here to open menu" id="dropmenu"></a><ul id="accountinfo"><li><a href="#">My Account</a></li><li><a href="#" id="logout" onclick="georamaLogOut();">Logout</a></li></ul></li></ul>';	        
}

 
function tripit(){
    if(TRIPIT_CRED){
        url = '/tripit/gettrip/rand/' + parseInt(Math.random() * 99999999);
        $.get(url, function(responseXml) {
            alert(responseXml);			// call falsh call-back function here
        });
    }
    else{
        window.open('/tripit/requesttoken/', 'Continue_to_Application','width=999,height=600');
    }
}

function tripitImporter(){
    if(TRIPIT_CRED){
        url = '/tripit/importxml/rand/' + parseInt(Math.random() * 99999999);
        $.get(url, function(responseXml) {
            alert(responseXml);			// call falsh call-back function here
        });
    }
    else{
        window.open('/tripit/requesttoken/', 'Continue_to_Application','width=999,height=600');
    }
}

function twitterPost(tweet, context, p){
    window.open('/twitter/index/tweet/'+ tweet + '/ctx/' + context + '/p/' + p , 'Continue_to_Application','width=699,height=600');
}

function twitterPostc(tweet){
    window.open('/twitter/collect/tweet/'+ tweet, 'Continue_to_Application','width=699,height=600');
}


function retwitterPost(id, context){
    mywin = window.open('/twitter/index/ti/'+ id + '/p/retweet/ctx/' + context, 'Continue_to_Application','width=699,height=600');
}

function facebookPost(url){
    var tripName=$("#tripPlaceName").text();
    var url=url+'/'+tripName;
    if(document.getElementById("shareTripUrlFriend").checked){
        var param="s=100&p[title]="+tripName+"&p[url]="+url+"&p[images][]=http://georama.com/images/facebook-icon.png&p[summary]=I have just created a trip on Georama - please help me out with suggestions!";
        window.open('http://www.facebook.com/sharer/sharer.php?'+param,'mywindow','width=600,height=400')
    }
}

// inserting arrival user of georama
function updateArrival(){
    url = '/tracking/arrival/rand/' + parseInt(Math.random() * 99999999);
    $.get(url, function(data) {
        //alert(data);
        });
}

// inserting actions of  user of georama
function updateAction(str,param,type){
    url = '/tracking/action/rand/string/' + str + '/parameter/' + param  + '/type/' + type + '/rand/' + parseInt(Math.random() * 99999999);
    $.get(url, function(data) {
        //alert(data);
        });
}

// updating html5 trip menu
function updateTripMenuOnLogin(id)
{
    url = '/html5/trip/tripmenu/userId/' + id  + '/rand/' + parseInt(Math.random() * 99999999);
    $.get(url, function(data) {
        arr=data.split("||");
        if(arr[0] && document.getElementById("tripPlaceName"))
            document.getElementById("tripPlaceName").value = arr[0];
        $('#tripPlaceName').attr('title',arr[0]);
			
        if(arr[1] && document.getElementById("tripPlaceId"))
            document.getElementById("tripPlaceId").value = arr[1];
			
        if(arr[2] && document.getElementById("subnav"))
            $("#subnav").append(arr[2]);
			
        try{	 
            cities = arr[3];
            if(cities!=0 && cities!='')
            {


                url = '/html5/trip/getmultiplecitypushpin/cityId/'+ cities +'/rand/' + parseInt(Math.random() * 99999999);
                //alert(url);
                $.get(url, function(data) {
                    var obj = jQuery.parseJSON(data);
                    $.each(obj.data, function(i,value){ 
                        try{
                            if(i==0){
                                $('#rootvectormap').vectorMap('set', 'label', {
                                    "n":value.name,
                                    "c":value.ccode.toLowerCase(),
                                    "d":value.description,
                                    "lat":value.lat,
                                    "lon":value.lon, 
                                    "pin":1, 
                                    "pcolor":"green", 
                                    "key":value.id, 
                                    "l":1
                                });	
                            }else{
                                $('#rootvectormap').vectorMap('set', 'label', {
                                    "n":value.name,
                                    "c":value.ccode.toLowerCase(),
                                    "d":value.description,
                                    "lat":value.lat,
                                    "lon":value.lon, 
                                    "pin":1, 
                                    "pcolor":"", 
                                    "key":value.id, 
                                    "l":1
                                });	

                            }						
                        }
                        catch(err){}
					
                    });
		
                });
            }
        }
        catch(err) {}
    });	
}

function loadPanelData(){	
    if(panelFlag=='friend'){
        openFriendCategory('Dashboard');
    }	
}//end of function loadAppropriatePanelData
function resetPanelData(){	
    if(panelFlag=='friend'){	
        var colObj = document.getElementById("friendInfo");
        var fLstObj = document.getElementById("friendlistInfo");		
        colObj.innerHTML = '<div class="info" style="margin-bottom:180px;text-align:center">Facebook login is required!</div>';
        fLstObj.innerHTML='';		
    }//end of if block
}//end of function resetPanelData

// update html5 trip menu on logout
function updateTripMenuOnLogout(){
    if(document.getElementById("tripPlaceName"))
        document.getElementById("tripPlaceName").value ="No trip exist";
	
    if(document.getElementById("tripPlaceId"))
        document.getElementById("tripPlaceId").value ="";	
		
    if(document.getElementById("subnav"))
    {

        $("#subnav").each(
            function() {
                var elem = $(this);
                if (elem.children().length != 0) {
                    elem.remove();
                }
            }
            );
    }
}

// after fb logout call
function onfb_logout(){
    url = '/api/logout/rand/' + parseInt(Math.random() * 99999999);
    $.get(url, function(data) {
        updateLoginLink();
        FB_LOGIN = "0";
        LOGIN_SESSION = "0";
        updateTripMenuOnLogout();
		
        if(typeof (panelFlag)!= 'undefined')
        {
            if(panelFlag=='friend'){
                resetPanelData();
            }
        }		
		
        try{
            thisMovie('flashMapId').userLoginedNow('');
        }
        catch(err) {}
		
    });
    FB.logout(function(response) {		
        });
		
}

// update browser url
function updateBrowserUrl(url){
    window.location.hash = url;
}

function postToFeed(url, picture, name, caption, description,tripId) {
    if(FB_LOGIN == "0"){
        member_login_header();
    }else{
        var obj = {
            method: 'feed',
            display: 'popup',
            link: url,
            picture: picture,
            name: name,
            caption: caption,
            description: description
        };	
        function callback(response) {
            /* Modification START-for tracking trip sharing|1-30-2013|dev-SN*/
            if(typeof response!='undefined'){
                if(typeof tripId!='undefined'){
                    var url = '/html5/share/updatetrip/t/' + tripId + '/fid/' + response.post_id;
                    $.get(url, function(data) {
                        //console.log(data);
                        });
                }
            }
        /* Modification END-for tracking trip sharing|1-30-2013|dev-SN*/
        }	
        FB.ui(obj, callback);
    }
}

function updatefriends(){
    url = '/self/updategeofriends/rand/' + parseInt(Math.random() * 99999999);
    $.getJSON(url, function(result) {
        });
}

function updateuserphotovideo(){
    url = '/self/updatefacebookphotos/rand/' + parseInt(Math.random() * 99999999);
    $.getJSON(url, function(result) {
        //alert(result);
        });	
//alert("friends got updated");
}

/*
function sendToFriend(){
	
	FB.ui({
			  method: 'send',
			  name: 'Check this awesome website',
	  			caption: 'georama.com',
	  			picture: 'http://georama.com/images/georama-logo.png',
			    link: 'http://georama.com'
			  });
}
*/
function sendToFriend(){
    FB.ui({
        method: 'apprequests',  
        message: 'Its time to flaunt your travel'
    });
}
function updateGeoramaWelcomeScreen(){
    //$("#georama_welcome_overlay").hide();
    //  $("#OutrContainer").hide();
    //  $('.welcome_panel').hide();
    showhideWelcomePanel('hide');
    $("#welcome_booking_trip_panel").hide();
    saveTripFromWelcome();  
//getTempUserTripParam();
}//end of function updateGeoramaWelcomeScreen

function saveTripFromWelcome(){
    var welcomeTripUrl = getCookie("welcometrip");
    if(welcomeTripUrl!=''){
        var url = '/html5/mytrip/savemytrip/'+welcomeTripUrl;
        $.getJSON(url, function(result) {
            deleteCookie("welcometrip");
            global_trip_id = result.data.tripId;
            $("#tripPlaceId").val(result.data.tripId);
            $("#tripPlaceName").val(result.data.tripName);
            $('#tripPlaceName').attr('title',result.data.tripName);		
            notifyme(result.message, "success");
            welcomeTripUrl='';			
            if(isFlashMode == 1){
                thisMovie('flashMapId').openGeoTab("mytrips", result.data.tripId);
            }else{
                $("#myTripsId").trigger('click');
            }			
        });
    }//end of if block
}//end of function saveTripFromWelcome

function deleteCookie ( cookie_name ){
    var cookie_date = new Date ( );  // current date & time
    cookie_date.setTime ( cookie_date.getTime() - 1 );
    document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
}
var welcomeTripUrl = '';
var isFlashMode='';
function getTempUserTripParam(isFlashValue){	
    var tripName       = $("#welcome_trip_name").val();	
    var traveller      = $('#wtravelers').val();	
    var originA        = $('#wf1').attr('rel');
	
    isFlashMode = isFlashValue;
	
    if(tripName==''){
        notifyme("Please enter trip name!", "error");
        document.getElementById("welcome_trip_name").focus();
        return false;
    }
    if(tripName=='Untitled Trip' || tripName=='Untitled trip' || tripName=='untitled trip'){		
        notifyme("Please choose different trip name!", "error");
        document.getElementById("welcome_trip_name").focus();
        //$("#welcome_trip_name").focus();
        return false;
    }
    if(originA==''){
        notifyme("Please enter origin city!", "error");
        document.getElementById("wf1").focus();
        return false;
    }	
    var destinationA   = $("#wt1").attr('rel');
    var sDateA         = $("#wd1").val();
    var eDateA         = $("#wdr1").val();
	
    var originB        = $('#wf2').attr('rel');
    var destinationB   = $("#wt2").attr('rel');
    var sDateB         = $("#wd2").val();
	
    var originC        = $('#wf3').attr('rel');
    var destinationC   = $("#wt3").attr('rel');
    var sDateC         = $("#wd3").val();	
    var tripMode       = 'add';
	
    if(destCtr==1){
        var destination_city_str = destinationA;
        var destination_date_str = eDateA;
    }	
    if(destCtr==2){
        if(originB!=''){
            if(destinationB!=''){
                var destination_city_str = destinationA+','+destinationB;
            }else{
                var destination_city_str = destinationA;
            }
        }else{
            var destination_city_str = destinationA;
        }		
        if(sDateB!=''){
            var destination_date_str = eDateA+','+sDateB;
        }else{
            var destination_date_str = eDateA;
        }
    }	
    if(destCtr==3){
        if(originC!=''){
            if(destinationC!=''){
                var destination_city_str = destinationA+','+destinationB+','+destinationC;
            }
        }else{
            if(originB!=''){
                if(destinationB!=''){
                    var destination_city_str = destinationA+','+destinationB;
                }else{
                    var destination_city_str = destinationA;
                }
            }else{
                var destination_city_str = destinationA;
            }
        }
        if(sDateC!=''){
            var destination_date_str = eDateA+','+sDateB+','+sDateC;
        }
    }
    if(traveller==''){
        traveller = 1;
    }	
    welcomeTripUrl+= 'title/'+tripName;
    welcomeTripUrl+= '/startDate/'+sDateA;
    welcomeTripUrl+= '/endDate/'+destination_date_str;
    welcomeTripUrl+= '/isGroup/0';
    welcomeTripUrl+= '/isPrivate/0';
    welcomeTripUrl+= '/originCity/'+originA;
    welcomeTripUrl+= '/destinationCity/'+destination_city_str;
    welcomeTripUrl+= '/traveller/'+traveller;
    welcomeTripUrl+= '/mode/'+tripMode;
    welcomeTripUrl+= '/rand/'+parseInt(Math.random() * 99999999);

    checkCookie("welcometrip", welcomeTripUrl);
    checkCookie("createTrip", 1);
	
    if(FB_LOGIN==1){
        member_login_check(fbUid);
    }else{
        member_login_header();
    }	
}//end of function getTempUserTripParam
loginFromPlan = false;
function loginFromPlanPanel(){
    loginFromPlan = true;
    member_login_header();
    $('#georama-login').dialog('close');
}//end of function loginFromPlanPanel

function updateTripDetail(){
    $("#georama_welcome_overlay").hide();
    $("#OutrContainer").hide();
    $('.welcome_panel').hide();
    $("#welcome_booking_trip_panel").hide();
  
    $(eval(georamaSigninPopup)).hide();  
  
    var tripItems = getCookie("tripItems");
    var itemTrip = tripItems.split('|')  
    //alert("Category Id="+itemTrip[1]+" source="+itemTrip[2]+" Source Id="+itemTrip[3]+" Item flag="+itemTrip[4]+" city Flag="+itemTrip[0]);
    addItemToTrip(itemTrip[1], itemTrip[2], itemTrip[3], itemTrip[4], itemTrip[0]);
    deleteCookie("tripItems");
}//end of function updateTripDetail

var anonymousUser = false;
var anonymousCreateTrip = false;
var anonymousSaveTrip = false;
function anonymousTrip(str){
    anonymousUser = true;
    if(str == 'createTrip'){
        anonymousCreateTrip = true;		
        if(FB_LOGIN == 1){
            member_login_check(fbUid);
        }else{
            member_login_header();
        }
    }else if(str == 'saveTrip'){
        anonymousSaveTrip = true;
        if(FB_LOGIN == 1){
            member_login_check(fbUid);
        }else{
            member_login_header();
        }
    }
}//end of function anonymousTrip

function createTripFromWelcome(str){
    if(str == 'createTrip'){
        createTripWelcome = true;	
        if(FB_LOGIN==1){
            member_login_check(fbUid);
        }else{
            member_login_header();
            $('#createBtnLoading').hide()
        }
    }
}//end of function anonymousTrip

<!-- Login functions for FLASH -->

function flash_member_login_header(tripPartId,categoryId,source,sourceId,scat,itemFlg,cacheDetailEntityData,cityFlag,callback) {
    FB.login(function(response) {			
        if (response.authResponse) {
            FB.api('/me', function(response) {
                fbUid = response['id'];
                if(typeof (fbUid)!= 'undefined'){
                    updateLogoutLink(response['first_name'], response['sqrpic'], fbUid);
                    url = '/api/session/rand/' + parseInt(Math.random() * 99999999);
                    $.get(url, function(json) {
                        if(json.attempt == "success"){
                            //alert(tripPartId+'/'+categoryId+'/'+source+'/'+sourceId+'/'+scat+'/'+itemFlg+'/'+cacheDetailEntityData);
                            if(typeof tripPartId!='undefined'){
                                untitletripId=json.tripId;
                                $.post("/mytrip/additembyjson",{
                                    tp: tripPartId, 
                                    c: categoryId, 
                                    s: source, 
                                    si:sourceId, 
                                    subcat:scat, 
                                    mode:itemFlg, 
                                    jsn:cacheDetailEntityData, 
                                    cityFlag: cityFlag, 
                                    tripId: untitletripId
                                }, function(data){
                                    });
                            }
                            anonymousUser = false;
                            $("#tripPlaceId").val('');
                            $("#tripPartId").val('');
                            $("#OutrContainer").addClass("loggedin");
                            $('#trip_change_text').show();
						
                            if(json.tripId!='0'){
                                global_trip_id=json.tripId;
                                tripId=json.tripId;
                                $("#tripPlaceId").val(json.tripId);
                                $("#tripPartId").val(json.tripPartId);
                                if(json.tripItems.sourceId!=''){
                                    $("#tripItemSourceIds").val(json.tripItems.sourceId);
                                    $("#tripItemIds").val(json.tripItems.id);
                                }
                            }
						
                            FB_LOGIN = "1";
                            TRIPIT_CRED = json.tripit == 1 ? true : false;
                            treatCallback(callback);
                            var tripFlag = getCookie("createTrip");
						
                            getMyTripList();
                            $("#trip_change_text").show();
						
                            if(anonymousSaveTrip == true){
                                $("#myTripsId").trigger('click');
                                anonymousSaveTrip = false;							
                            }else if(anonymousCreateTrip == true){
                                $("#myTripsId").trigger('click');
                                addNewTrip();
                                $('#rootvectormap').vectorMap('set','hideAllPin',1);
                                anonymousCreateTrip = false;
                            }/*else{
							//showTripPushPin(json.tripId);
						}*/
												
                            if(tripFlag == 1){
                                updateGeoramaWelcomeScreen();
                                deleteCookie("createTrip");
                            }
                            if(loginFromPlan == true){
                                if(json.tripId!=0){
                                    updateTripDetail(json.tripId);
                                }
                            }
						
                            try{
                                if(thisMovie('flashMapId')){
                                    thisMovie('flashMapId').userLoginedNow(json.id);
                                }
                                try{	
                                }catch(err){}
                            }catch(err){}
						
                            $("ul.topnav li span").show();					
						
                            url = '/fbapi/checkins/rand/' + parseInt(Math.random() * 99999999);					
                            $.getJSON(url, function(result) {
                                });
                        //setTimeout('updatefriends()',30000);
                        //updateuserphotovideo();	
                        }					
                    });	
                }		
            });
        }
    }, {
        scope:'email,user_about_me,user_location,user_birthday,user_likes,user_photos,user_videos,user_groups,read_stream,publish_stream,friends_birthday,friends_likes,friends_photos,friends_videos,friends_groups,friends_location,friends_hometown,friends_work_history,friends_education_history,user_checkins,friends_checkins, publish_checkins'
    });
}

function twitterPost(){
    var twitterText = 'I just created a trip on Georama - please help me out with suggestions!'+' '+'http://www.georama.com';
    var twitterPostLink = 'https://twitter.com/intent/tweet?text='+twitterText;
    WREF = window.open(twitterPostLink, 'tweet_win', 'width=699,height=600');
   
    if(!WREF.opener){
        WREF.opener = this.window;
    }
   
}//end of twitterPost function


function updateInfoTabFriend(cityId){
    if( planInfoTab != null ) {
        planInfoTab.abort();
        planInfoTab = null;
    }
    
    
    show_cache = false;
    
    if(typeof FBfriends_info[cityId] != 'undefined'){
        
        if(FBfriends_info[cityId].logged_in == 'hasfriends' && FB_LOGIN=='1'){
            show_cache = true;
        } else if(FBfriends_info[cityId].logged_in == 'no_friends' && FB_LOGIN=='1'){
            show_cache = true;
        } else if(FBfriends_info[cityId].logged_in == 'no_login' && FB_LOGIN=='0'){
            show_cache = true;
        }
        if(show_cache==true){
            $("#FriendSecPlan").html(FBfriends_info[cityId].friends);
            return;
        }
        
    }
    // end code cache exists
    try{
        if (typeof document.getElementById('FriendSecPlan') != 'undefined'){
            document.getElementById('FriendSecPlan').innerHTML='<div style="padding:20px 0 150px 0;" align="center">Loading..<br /><img src="/images/preloader.gif"/></div>';
            url='/html5/plan/infotabfriend/cityId/' + cityId + '/rand/' + parseInt(Math.random() * 99999999);
            planInfoTab = $.get(url, function(result) {
			
                res = result.split('|||');
			
                FBfriends_info[cityId] = {
                    'friends':res[0],
                    'logged_in':res[1]
                    };
			
                $("#FriendSecPlan").html(FBfriends_info[cityId].friends);
            });
        }
    }catch(e){}
}
/*
$("body").append('<div id="FbSessLogout" title="Logout of Georama" class="hide"><p><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0; z-index:899999999"></span>You have been logged out of Facebook</p></div>');

var timer;

onLoad = function(){
	timer = setInterval(function (){
		if(FB_LOGIN == 1 || FB_LOGIN == '1'){
			FB.getLoginStatus(function(response){
				consTime = new Date().getTime();
				console.log('in FB Login Status:'+response.status+'.... time: '+ consTime);
				if(response.status ==='unknown' && !$('#FbSessLogout').is(':visible') ){
					$('.stCloseNew2').trigger('click');
					$( "#FbSessLogout" ).dialog({
						resizable: false,
						height:140,
						modal: true,
						buttons: {
							"Ok": function(){
								
								if( logout != null ) {
									logout.abort();
									logout = null;
								}
								 //var answer = confirm('Do you really want to log out of georama?');
								 var answer = true;
								 //welcomeTripUrl = '';
								 //deleteCookie("createTrip");	 
								 if (answer) {		 
									 
									//FB.logout(function(response) {
										var url = '/api/logout';
										var params = 'rand='+parseInt(Math.random() * 99999999);
										logout = $.ajax({
											type: "GET",
											url: url,
											data: params,
											success: function(data) {
												try{
													thisMovie('flashMapId').userLoginedNow('');
												}catch(err) {}
												try{
												   $('#rootvectormap').vectorMap('set','hideAllPin',1);
												}catch(err) {}
												FB_LOGIN = "0";
												LOGIN_SESSION = "0";
												loginFromPlan = false;
												updateLoginLink();
												$("#OutrContainer").removeClass('loggedin');
												updateTripMenuOnLogout();
												if(typeof (panelFlag)!= 'undefined'){
													if(panelFlag=='friend'){
														resetPanelData();
													}
												}
												if(data == 'success'){
													window.location.replace(HTTP_HOST); 
													//location.href = HTTP_HOST;
												}
											}
										});
								   // });
								}
								
								
								$( this ).dialog( "close" );
							},
						}
					});
				}
			}, true);
		}
	},5000);
}

onUnload = function(){
	clearTimeout(timer);
}

$(window).focus(onLoad);
$(window).blur(onUnload);

*/

//to check for the currently selected user trip
function checkForCurrentTripItems(json){
    if(json.tripId!='0'){
        global_trip_id=json.tripId;
        tripId=json.tripId;
        $("#tripPlaceId").val(json.tripId);
        $("#tripPartId").val(json.tripPartId);
        if(json.tripPartId!=0){
            if(json.tripItems.sourceId!=''){
                $("#tripItemSourceIds").val(json.tripItems.sourceId);
                $("#tripItemIds").val(json.tripItems.id);
            }
        }else{
            $("#tripItemSourceIds").val('');
            $("#tripItemIds").val('');
        }
    }
}
//invite friend's to geoplaces in georama
function inviteFriendToGP(friendId){	
    FB.ui({
        method: 'send',
        to: friendId,
        name: 'GeoPlaces by Georama',
        caption: 'GeoPlaces - bring your travel experiences to life!',
        display:  'popup',
        picture: 'http://www.georama.com/images/facebook-icon.png',			  
        link: 'http://www.georama.com/geoplaces',
        description: ' Check out my interactive travel map and create yours too!'
    });
}//end of function inviteFriendToGP

function postOnFriendsWallFromFtab(friendId,siteUrl){
    var tripName=$("#tripPlaceName").text();
    var url=siteUrl+'/'+tripName;
    var userName=$("#user_name").text();
    if(document.getElementById("shareTripUrlFriend").checked){
        var siteUrl=url;
        var caption  = userName+' just created a trip on Georama.'; 
        var description='Please recommend places to '+userName+' for the trip "'+tripName+'".';
    }else{
        var siteUrl='http://www.georama.com/';
        var caption='';
        var description  = 'Georama is a one-stop solution that lets travelers plan, book, and share their trips on a one-of-a-kind interactive map. It is visual, immersive, and fun!';
    }
    // alert(siteUrl);
    //var siteUrl = 'http://www.georama.com/#My-Trips/'+userId+'/'+tripId+'/'+tripName;
    FB.ui({
        method: 'feed',
        to: friendId,
        name: 'Georama - Plan. Book. Share.',
        caption: caption,
        display:  'popup',
        picture: 'http://www.georama.com/images/facebook-icon.png',			  
        link: siteUrl,
        description: description
    });
}