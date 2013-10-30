// JavaScript Document
/* Variables from Layout File */
var global_city_panel_id=0; 
var destination_counter = 0;
var trip_flag=true;
var yellowPinArray = [];
var destinationArray = new Array();
var destinationIdArray = new Array();
var attractionInfoDetails=new Array();
var tripPartInitialIds = new Array();
var previous_dynamic_txt_box='';
var destination_str_push_pin='';

var sessionPopup = false;

var current_city = '';
var cityId = '';
var global_trip_id = '';
var friend_global_trip_id = '';
var global_trip_part_id='';
var global_event_api_id='';
var topRecommendation=false;
var global_city_id='';
var hotelFlag = false;
var activityFlag = false;
var attractionFlag = false;
var restaurantFlag = false;
var nightLifeFlag = false;
var eventFlag = false;
var dealFlag = false;
var shoppingFlag = false;
var bookingXhr = null;
var friendTripXhr = null;
var create_new_trip_flag = true;
var activeTripPart = {};
var potentialFlag = false;
var myTripFlag = false;
var dockPosition = false;
var currentpanel="";
var hotelMapCity='';
//var geoWelcomeFlag = false;


/*variables used for Hash URL implementation */
var hashCode;
var hashCityKey;
var hashCityName;
var hashCityTabType;
var hashCountryName;
var hashCityDetails;
var objCityDetails;
var hashLocationURL;
var hashLocationString;
var hashPageTitle;
var hashNullCounter = 1;
var isPageLoaded = false;
var isPushStateEnabled = false;
var isBackForwardBtnClicked = false;
var isFareSearchClicked =false;
var hashcheck =false;
var faresearchcheck =false;
var isPlanBookShareTabAutoClicked = false;
var isuserfriend = false;
var hashVenueId;
var hashVenueName;
var hashId;
var isDifferentCity = false;
var viatorActivityDestId;
var gaTitleString;
var isCityTagged = false;
var yesTab = 'Hotel';
//var loginUserId = false;
var cityMainTabType = 'Plan';

var visibleMap;
var regionArray = ["North America", "South America","Europe","Africa","Asia","Australia and Oceania","Middle East","Central America"];
var monthNamesArray = [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ];
var cityPanelTabType;
var activeMapMode;
var yellowPushPinCounter = 0;
var isTripSectionMode = false;
var isYellowPushPinPlottingEvent = false;

/* Variables used to show panels last state when clicked again */
var attractionCityId = '';
var phostelCityId = '';
var infoCityId = '';
var weatherCityId = '';
var hotelCityId = '';
var activitiesCityId = '';
var restaurantCityId = '';
var nightlifeCityId = '';
var shoppingCityId = '';
var eventsCityId = '';
var friendsCityId = '';
var dealsCityId = '';
var newsCityId = '';
var mediaCityId = '';
var shareCityId='';

var attractionPlaces;
var phostelPlaces;
var hotelPlaces;
var activitiesPlaces;
var restaurantPlaces;
var nightlifePlaces;
var eventsPlaces;
var dealsPlaces;

var attractionbucketId;
var activitiesbucketId;
var restaurantbucketId;
var nightlifebucketId;

var clickflag=false;
var clickdropflag=false;

var mouse_is_inside_mylist = true;
var click_is_inside_menu = false;
var is_welcome_book_panel = 0;
var welcome_book_panel_city_id = 0;
var welcome_pushpin_data = '';
var flight_pushpin_data = '';
/* Initializing Variables from Index.phtml */
var preloadDiv = '<div style="padding:150px 0;" align="center"><img src="/images/preloader.gif" alt="Loading..."/><br />Loading...</div>';
var panelloaderDiv = '<div style="padding:20px 0 150px 0;" align="center"><img src="/images/panel-loader.gif" alt="Loading..."/><br />Loading...</div>';
var preloadDivS = '<div style="padding:50px 0;" align="center"><img src="/images/loading-50x50.gif" alt="Loading..."/><br />Loading..</div>';
var cntPreload = '<div style="padding:20px 0; margin:10px 0 ; font-size:18px; color:#999; background:#f4f2f4;" align="center"><img src="/images/content-loading.gif" alt="" align="absmiddle"/>&nbsp;&nbsp;&nbsp;Loading..</div>';
var chkCol = 0;
var chkHCol = 0;	
var bChkCityName = "City, Airport, Address";
var docBottom = false;	
var infoDivNavigation=''
var docPositionY = 350;
var newVal = '';
var fareSearch = 'false';

var initDepartDate = new Date();
initDepartDate.setDate(initDepartDate.getDate() + 2);
var oCTop;
var oCLft;
	
/* varibales for welcome screen*/
var destCtr = 1; 
var gBookType;
var activeWelcomePanel = '';
var childListPopupMode = false;
var welcomeHashState = false;
/* varibales for welcome screen*/

var countAdults;
var countChilds;

room1Content = '';
room2Content = '';
/* varibales for welcome screen*/
var formJSONObject = {};
var independentPages = false;
var GLOBAL_DESTINATION = 6;
var tripPushpinResult;
/* Top Navigation  */
var subNavVars = new Object;
subNavVars.LeftWidth = 540;
subNavVars.TagWidth = 195
subNavVars.btnShareWidth = 130;
var isTrajAnimating = true;

    /** if cookie is deleted explicitly, we will given a session **/
    /*$(window).click(function(){        
        try{                        
            checkLoginStatus();            
        }catch(e){            
        }
    });*/       
    /** if cookie is deleted explicitly, we will given a session **/

    
/* Functions */
function hideAllPanels(){
    $("#PlanBookComponent").hide();
    $('#CountryPageComponent').hide();
    $("#my_trip_wrapper").hide();
    $("#friend_trip_wrapper").hide();
    $('#openPage').hide();
    $('.pageOverlay').hide();
    $('#georama_welcome_overlay').hide(); 
    $('#welcome_close').hide(); 
    $('#OutrContainer').hide();
    $('.fixed_footer_wrapper').hide();  
    $('#window-8-Application').hide(); 
}

function openGeoplacesTab(url){
    window.open(url, '_blank');
    window.focus();
}

function getNextDate(dateText, toid, sameday,mode){
    var formatDate = dateText.replace(/-/g, '/')
    var selectedDate = new Date(formatDate);	
	
    if(!sameday)
        selectedDate.setDate(selectedDate.getDate()+1);
        
    var endDate = new Date(selectedDate.getTime());
    //console.log('endDate: ' + endDate);
    if(mode=='setforHostels'){
        selectedDate.setDate(selectedDate.getDate()+30);
        var maxdate= new Date(selectedDate.getTime());
        $(toid).datepicker( "option", "minDate", endDate );
        $(toid).datepicker( "option", "maxDate", maxdate);	
        return;
    }
    //return endDate;
	
    $(toid).datepicker( "option", "minDate", endDate );
    $(toid).datepicker( "option", "maxDate", '+1y' );	
}

/*  Added by dev AN on 16Apr2013*/
function setPreDefDate(dateText, fromid){
    var formatDate = dateText.replace(/-/g, '/');
    var selectedDate = new Date(formatDate);
    selectedDate.setDate(selectedDate.getDate()-1);
	
    var fromdate = new Date(selectedDate.getTime());
    $(fromid).datepicker("setDate", fromdate);
}

/*  START- added by dev AN on 16Apr2013 | for validations on dates*/
function ValidateReservationDates(checkin, checkout,mode) {
    var formatDate='', selectedDate='';
    var dateFrom ,dateTo;

    if(mode=='createTrip'){
        dateFrom= checkin;
        dateTo=checkout;
    }
    else {
        dateFrom= jQuery(checkin).val();
        dateTo=jQuery(checkout).val();
    }
    formatDate = dateFrom.replace(/-/g, '/');
    selectedDate = new Date(formatDate);
    dateFrom = new Date(selectedDate.getTime());

    formatDate = dateTo.replace(/-/g, '/');
    selectedDate = new Date(formatDate);
    dateTo = new Date(selectedDate.getTime());
        
    if(mode=='createTrip'){
        return (dateFrom && dateTo && dateFrom > dateTo)? false: true;
    }
    else {
        return (dateFrom && dateTo && dateFrom >= dateTo)? false: true;   
    }
        
}
/*END- added by dev AN on 16apr2013*/


function addWelcomeDestination(){
    destCtr++;
    $('.wreturning').fadeOut();
    $('.add-desti').fadeOut(function(){
        if(destCtr <= 3){
            $('#destination' + destCtr).fadeIn();						
        }
		
        if(destCtr == 3){
            $('.add-desti').hide();
        }else{
            $('.add-desti').show();
        }
    //alert(destCtr);
    });  
  	
}

function deleteWelcomeDestination(id){
    $('#destination' + destCtr).fadeOut();
    $('.add-desti').fadeIn();
    destCtr--;
    if(destCtr == 1)
        $('.wreturning').fadeIn();
}



function loggedInCacheClear(){
    $( "#cache_clear_id" ).dialog({
        resizable: false,
        draggable: false,
        width:400,
        height:135,
        modal: true,
        dialogClass:'georama_dialog',
        buttons: {
            "Ok": function(e) {
                e.preventDefault();
                $( this ).dialog( "close" );
                window.location.replace(HTTP_HOST);                
            }
        },
        open: function(event, ui){
            sessionPopup = true;
            resetDialogZIndex();
            $(document).bind('scroll',function () { 
                window.scrollTo(0,0);
                $( ".ui-widget.ui-dialog" ).css({
                    'top':'280px'
                });
            });
        },
        close: function(event, ui){ 
            $(document).unbind('scroll'); 
        }	
    });
    
}/*End of georamaCacheClear Function */

function resetDialogZIndex(){
    $('.ui-widget-overlay').css({
        'z-index':'2001'
    });
    $( ".ui-widget.ui-dialog" ).css({
        'z-index':'2002'
    });
}//end of function resetDialogZIndex

function georamaLogOut(){
    $( "#georama-logout" ).dialog({
        resizable: false,
        draggable: false,
        height:120,
        width:400,
        modal: true,
        dialogClass:'georama_dialog GeoramaLoginClose',
        buttons: {
            "Yes": function() {
                member_logout();
                $( this ).dialog( "close" );
            },
            "No": function() {
                $( this ).dialog( "close" );
            }
        },
        open: function(event, ui){  
            resetDialogZIndex();
            $(document).bind('scroll',function () { 
                window.scrollTo(0,0);
                $( ".ui-widget.ui-dialog" ).css({
                    'top':'280px'
                });
            });             
        },
        close: function(event, ui){ 
            $(document).unbind('scroll'); 
        }	
    });
}/*End of Georama LogOut Function | Last Modified - Aayushi @25-sept */

function showDialog(anonymousTid, actualTid){
    // $("#"+containerId).dialog({
    $(".balloon").hide();
    $("#override_untitled_trip").dialog({
        resizable: false,
        height:135,
        width:400,
        modal: true,
        draggable: false,
        dialogClass:'georama_dialog',
        buttons: {
            "Yes": function() {
                tripPartId = activeTripPart.tripPartId;    
                if(typeof tripPartId == "undefined" || tripPartId == '' || tripPartId == 0 || tripPartId == "undefined"){
                    tripPartId = global_trip_part_id;
                }                
                updateMyTrip(anonymousTid, actualTid, tripPartId);                
                if(loginFromPlan == true){
                    if(actualTid){
                        updateTripDetail();
                    }//end of if block
                }//end of if block                
                $( this ).dialog( "close" );
            },
            "No": function() {
                closeExplorePanel();
                showTripPushPin(actualTid);
                $( this ).dialog( "close" );
            }
        },
        open: function(event, ui){
            resetDialogZIndex();
            $(document).bind('scroll',function () { 
                window.scrollTo(0,0);
                $( ".ui-widget.ui-dialog" ).css({
                    'top':'280px'
                });
            });
        },
        close: function(event, ui){ 
            $(document).unbind('scroll'); 
        }	
    });
}//end of function overrideTrip


function openCardialog(id, w, h){	
    if(w == '' || w == undefined || w == 'undefined')
        w = 300;
	
    if(h == '' || h == undefined || h == 'undefined') 
        h = 300;
	
    $( "#" + id).dialog({
        resizable: false,
        height:h,
        width:w,
        dialogClass:'georama_dialog GeoramaLoginClose',
        draggable: false,
        modal: true,
//        buttons: {
//            Close: function() {
//                $( this ).dialog( "close" );
//            }
//        },
        open: function(event, ui){  
            resetDialogZIndex();
            $(document).bind('scroll',function () { 
                window.scrollTo(0,0);
                $( ".ui-widget.ui-dialog" ).css({
                    'top':'280px'
                });
            });             
        },
        close: function(event, ui){ 
            $(document).unbind('scroll'); 
        }	
    });
}

var georamaSigninPopup = '';
function georamaSignIn(){
    $("#bing_attraction_info").hide();    // For hiding Bing Blurb
    $( "#georama-login" ).dialog({
        resizable: false,
        draggable: false,
        dialogClass:'georama_dialog GeoramaLoginClose',
        height:130,
        width: 380,
        modal: true,
        create: function(event, ui) { 
            var widget = $(this).dialog("widget");
            $(".ui-dialog-titlebar-close span", widget).addClass('inline-block');
        },
//        buttons: {
//            'Close': function() {
//                $( this ).dialog( "close" );
//                georamaSigninPopup = $( this );
//            }
//        },
        open: function(event, ui){
            resetDialogZIndex();
            $(document).bind('scroll',function () { 
                window.scrollTo(0,0);
                $( ".ui-widget.ui-dialog" ).css({
                    'top':'280px'
                });
            });
        },
        close: function(event, ui){ 
            $(document).unbind('scroll'); 
        }
    });
}/*End of Georama LogOut Function */
/* shifted to bookpanel.js on 24June2013 for booking pages filter modules
function rentalCondtion(){
    $( "#rental-condtion" ).dialog({
        resizable: false,
        draggable: false,
        height:500,
        width:500,
        modal: true,
        draggable: false,
        modal: true,
        //dialogClass: 'car-dialog-class',
        dialogClass: 'georama_dialog',
        buttons: {
                                    
            close: function() {
                $( this ).dialog( "close" );
                $(document).unbind('scroll'); 
            }
        }
				
    });
}*/
function saveTripDialog(){
    $( "#save-trip-alert" ).dialog({
        resizable: false,
        height:310,
        width:360,
        draggable: false,
        modal: true,
        buttons: {
            'Save': function() {
                $( this ).dialog( "close" );
            },
            Cancel: function(){
                $( this ).dialog( "close" );
            }
        }
    });
}/*End of Georama LogOut Function */


function gridBooking(itemtype){
    switch(itemtype)
    {
        case 'hotel':
            $('#gridRoomBooking').fadeIn();
    }
}
var selHotelId = '';
function gridBookingHotelPlan(itemtype,HotelId){
    switch(itemtype){
        case 'hotel':
            selHotelId = HotelId;
            $('#gridRoomBooking').fadeIn();
            $('#room-box-form').hide();			  
            break;
			  
        case 'hostel':
            selHotelId = HotelId;
            $('#planHostelBookingAvailability').fadeIn();
            $('#plan_hostel_id').val(HotelId);
            break;
    }//end of switch case
}//end of gridBookingHotelPlan function

function setCookie(c_name,value,exdays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
} /*End of SetCookie Function */

function openpanel(id){		
    $("#overlay").fadeIn();
		
    var panelHeight = $("#"+id).height();
    var documentHeight = $(document).height();
    var panelWidth = $("#"+id).width();
    var documentWidth = $(document).width();
		
    var toppos = (documentHeight - panelHeight) / 2;
    var leftpos = (documentWidth - panelWidth) / 2;
		
    if(toppos <= 0)
        toppos = 10;
		
    if(leftpos <= 0)
        leftpos = 10;
		
    document.getElementById(id).style.top = toppos + "px";
    document.getElementById(id).style.left = leftpos + "px";
				
    $("#"+id).fadeIn();
    currentpanel=id;		
}
	
function closepanel(){
    $("#"+currentpanel).fadeOut();
    $("#overlay").fadeOut();
}

function softLaunch(id){
    $("#"+currentpanel).fadeOut();
    $("#"+id).fadeIn();
    currentpanel=id;
}
function login(){
    $.ajax({ 
        type: "POST", 
        url: "/api/login/", 
        data: $("#loginForm").serialize() ,
        success: function(response){
            if(response.attempt != 'fail') {
                updateLogoutLink(response.name, response.sqrPic);
                try{
                    updateTripMenuOnLogin(response.id);
                }
                catch(err)
                {}
                TRIPIT_CRED = response.tripit == 1 ? true : false;
                $("#email").val('');			 
                $("#password").val('');			 
                closepanel();
            }
            else{
                alert("Invalid ID or password. Please try again");
                $("#email").val('');			 
                $("#password").val('');			 
            }
        }, 
        error:function (xhr, ajaxOptions, thrownError){ 
            alert("Internal error");
        }
    });
}
	
function signup(){
    $.ajax({ 
        type: "POST", 
        url: "/api/register/", 
        data: $("#signupForm").serialize() ,
        success: function(json, status){
            treatSignupResponse(json);
        }, 
        error:function(jqXHR, textStatus, errorThrown){ 
            alert(textStatus);
        }
    });
		
}
	
function treatSignupResponse(json){
    if(!json.attempt){
        alert("Unknown error");
        return;	
    }
    switch(json.attempt){
        case 'success':
            updateLogoutLink(json.name);
            closepanel();
            break;
			
        case 'validation_error':
            $.each(json.desc, function(i,vError){ 
                alert(vError.field);
                $("#" + vError.field).addClass('error');
				
            });
            break;
        case 'session_error' :
			
            break;
        case 'save_error':
			
            break;	
    }
		
}
	
function isFbLoggedIn(){
    return 	FB_LOGIN;
}

function thisMovie(movieName) {
    if (navigator.appName.indexOf("Microsoft") != -1) {
        return window[movieName];
    } else {
        return document[movieName];
    }
}

function showAlert(content){
    alert(content);
}
	
function closeMyTripPanel(){
    if ($("#mytripslitab").hasClass("active") == true) CloseBtnClick();	 			//hash tag
	
    //////////////////////////////////////////////////////////////
    //resetDisplay("");
    if($('#georama_welcome_overlay').is(":visible") == true){
        showhideWelcomePanel('hide');
    }
    $(".welcomeBox").hide("fade", 500);
    $('#arrowUp').hide();
    $('#cityInfoScreen .dragHandle ul').hide();
    $('#goback').hide();
    $('#fareSearchId').hide();
	
    $("#friends").hide();
    $("#weather").hide();
    $("#my_trip_wrapper").hide();
    $("#friend_trip_wrapper").hide();	
    $("#info").hide();
    $("#cityInfoScreen").hide();
    $("#cityInformation").hide();	
	
    $('#PlanBookComponent').hide();
    $('#CountryPageComponent').hide();		//Dev-R,For country pages
    $('#liattraction').hide();
    $('#liactivities').hide();
    $('#lirestaurant').hide();
    $('#linightlife').hide();
    $(".contenPnl").hide(); 
    $("#cityInfoPanel").hide();
    $(".pageOverlay").hide();
    $("#openPage").hide();
	
    $("#topNav li").removeClass("active");
    $("#explore").addClass("active");
	
    zoomTo100();	
    //////////////////////////////////////////////////////////////
	
    $('#li_sharethis').css('display','block');
			
    /*myTripFlag = false; commented by seema
	friendTripFlag = false;	*/	
	
    $('#main-top-nav li a').removeClass('active');
    $('#exploreAnchorID').addClass('active');
}

function closeFriendsTripPanel(showDataOnMap){
    //if(tripIdForPanelSwitch!=''){
    if (typeof showDataOnMap == 'undefined'){
        //showTripPushPin(parseInt(tripIdForPanelSwitch));
        showTripPushPin(global_trip_id);
    }else if (showDataOnMap == false){
        getTripPushPinsResult(global_trip_id);
    }
    //global_trip_id=tripIdForPanelSwitch;
    //}else{
    //		global_trip_id='';
    //	}
    friendTripFlag = false;
    myTripFlag = true;
    friend_global_trip_id = '';
    CloseBtnClick();
    $("#friend_trip_wrapper").hide("fade", 500);
    $("#explore").addClass("active");
    $("#friendstripslitab").removeClass("active");
    //changed by seema		
    $("#goback").html('&laquo; Go back to My Trips');
}
function closeExplorePanel(){
    activeExploreTab="";
    CloseBtnClick();  				 //hash tag
    $("#mapOverlay").hide();
    $("#cityInfoScreen").hide();
    $("#PlanBookComponent").hide();
    $("#explore").addClass("active");
    $("#geofarelitab").removeClass("active");
    $("#mytripslitab").removeClass("active");
    restorPanel();    
    if(visibleMap == 'bing'){
        //bingMap.map.entities.clear();
        clearBingMapEntity();
        zoomTo100();   
        abortAjaxCall(); //added 22-Nov-2012 6:16PM
    }//end of if block	
}//end of closeExplorePanel

function exploreMorePlaces(cityID){	
    /*used in mytrips*/
    $('.contenPnl').hide();	
    document.getElementById('tripPartId').value = activeTripPart.tripPartId;
    if(friendTripFlag == true){
        explorePanelMode='friend';
    }else{
        explorePanelMode='my';
    }

    if(anonymousUser == false){
        isTripSectionMode = true;
    }else{
        isTripSectionMode = false;
    }
    if(cityID == undefined){
        openCityTabsPanel(activeTripPart.cityId, 'Info');
    }
    else 
    {
        cityID= parseInt(cityID);
        openCityTabsPanel(cityID, 'Info');
    }
    
    //openCityTabsPanel(activeTripPart.cityId, 'Info');
    $('#main-top-nav li a').removeClass('active');
    $('#exploreAnchorID').addClass('active');
}//end of exploreMorePlaces function


function recommendMorePlaces(){
    explorePanelMode='friend';
    //$("#topbar-wrap").hide();
    showhideTopBar('hide');
    document.getElementById('tripPartId').value = activeTripPart.tripPartId;
    if(anonymousUser == false){
        isTripSectionMode = true;
    }else{
        isTripSectionMode = false;
    }
    openCityTabsPanel(activeTripPart.cityId, 'Info');
    $('#main-top-nav li a').removeClass('active');
    $('#exploreAnchorID').addClass('active');

}//end of function recommendMorePlaces

function geoExplore(){
	if(indPageloadingProcess == true){
			return;
	}
    friendTripFlag = false;
    myTripFlag = true;
	
    // if intially global trip id is empty then we use tripplaceid hidden field otherwise always we have to use global trip id for my trip
    var tripid=global_trip_id;
    if(tripid==''){
        tripid = $("#tripPlaceId").val();
    }
    showhideTopBar('show');	//added by dev AN
    showTripPushPin(parseInt(tripid),'mytrip');
    //if($("#tripPlaceId").val()!=''){
    //		showTripPushPin(parseInt($("#tripPlaceId").val()));
    //	}

    //if(global_trip_id!=''){
    //		showTripPushPin(parseInt(global_trip_id));
    //	}
    //calling function to create and store Hash URL on the browser.
    hashPushState("Explore","Georama - Explore");
    if($('.rightPanel').is(":visible") == false){
        $('.rightPanel').show();
    }
	
    //$("#topbar-wrap").show();	
    closeMyTripPanel();

}

function togglePnls(tohide, toshow){
    $("#" + tohide).hide();
    $("#" + toshow).show();
}

window.onscroll = function (e) {
    if(!independentPages){
        if($(document).scrollTop() > 220){
            $("#back-to-map").fadeIn();
            $("#zoomcontrols").fadeOut();
        }else{
            $("#back-to-map").fadeOut();
            $("#zoomcontrols").fadeIn();
        }
    }
}
/* Minimize/Maximize panel function */
var panelPositionY = false;

function toggleDock(opt){
    if(opt == 'max'){
        if(dockPosition == false){		// make it on top			
          
            //$("h3.heading a.pinIcon").css("background-position", "0 -26px");		
            $('#zoomcontrols').fadeOut();
            $("#arrowUp").hide();
            $("#tabs").fadeOut(function(){
                //$("#cityInfoScreen .gradientBlack").css("border-radius", 0);
                $("#cityInfoScreen").width($(document).width());
                $("#PlanBookComponent").offset({
                    top: 0
                });
                $("#PlanBookComponent").offset({
                    left: 0
                });	
                $("#cityInfoScreen .gradientBlack").css("padding", "80px 20px 15px 5px");
                $("#cityInfoScreen .close").hide();
                if(isFareSearchClicked == true){}
                else{ 
                    $(".ui-tabs-nav").show();
                    $("#Share").show();
                    $("#book").show();
                    $("#iconNav").show();
                    $("#weatherSection").hide();
                }
                            
                $('#citypanelsysmenu .maximize_action').show();
                $("#cityInfoScreen").height('auto');				
                $("#tabs").fadeIn();	
                $("body").css("overflow-y", "auto");
				
                dockPosition = true;
                panelPositionY = true;					
            });
			
            $('#citypanelsysmenu .maximize_action').addClass('maximize_action_active');			
            $('#citypanelsysmenu .minimize_action').removeClass('maximize_action_active');
            docBottom = false;
			
        }else{
            restorPanel();
        }
    }else{
        if(docBottom == false)
        { 
            //docPositionY= $("#cityInfoScreen").offset().top;
            window.scrollBy(0, -850);
            $("#arrowUp").hide();
            $("#PlanBookComponent").offset ({
                top: $(window).height() - 68
            });
            $("body").css("overflow", "hidden");
            $("#cityInfoScreen .gradientBlack").css("border-radius", 5);
            $("#cityInfoScreen .gradientBlack").css("padding", "0");
            $("#cityInfoScreen").width($(window).width()-50);
            $("#PlanBookComponent").offset({
                left: 15
            });		
            $("#cityInfoScreen .gradientBlack").css("padding-top", 5);
            $('#citypanelsysmenu .minimize_action').addClass('maximize_action_active');
            $('#zoomcontrols').fadeIn();
            $('#zoomcontrols').animate({
                bottom: 72
            }, 1000);
            docBottom = true;
            panelPositionY = false;
        }else{ 
            if(dockPosition == true && panelPositionY == false){ 
                docBottom = false;
                dockPosition = false;
                $('#citypanelsysmenu .minimize_action').removeClass('maximize_action_active');
                $('#citypanelsysmenu .maximize_action').removeClass('maximize_action_active');
                calltoggleDock('max');
            }else{ 
                restorPanel();	
            }
        }
    }
	
}

function countrytoggleDock(opt){
    if(opt == 'max'){
        window.scrollTo(0,0);
        if(dockPosition == false){		// make it on top			
            $('#zoomcontrols').fadeOut();
            //		$("#arrowUp").hide();
            $("#tabs").fadeOut(function(){
                //			//$("#cityInfoScreen .gradientBlack").css("border-radius", 0);
                $("#countryInfoScreen").width($(document).width());
                $("#CountryPageComponent").offset({
                    top: 0
                });
                $("#CountryPageComponent").offset({
                    left: 0
                });	
                $("#countryInfoScreen .gradientBlack").css("padding", "90px 20px 15px 5px");
                //            $("#countryInfoScreen .close").hide();
                $('.maximize_action').show();
                $("#countryInfoScreen").height('auto');				
                //		$("#tabs").fadeIn();	
                $("body").css("overflow-y", "auto");
				
                dockPosition = true;
                panelPositionY = true;					
            });
			
            $('#countrypanelsysmenu .maximize_action').addClass('maximize_action_active');			
            $('#countrypanelsysmenu .minimize_action').removeClass('maximize_action_active');
            docBottom = false;
			
        }else{
            panelPositionY = false;
            docBottom = false;
            dockPosition = false;
								
            $('#countrypanelsysmenu .minimize_action').removeClass('maximize_action_active');
            $('#countrypanelsysmenu .maximize_action').removeClass('maximize_action_active');
            $('#zoomcontrols').fadeIn();
            //	$("#arrowUp").show();
            $("#tabs").fadeOut(function(){
                $("#countryInfoScreen .gradientBlack").css("border-radius", 5);
                $("#countryInfoScreen .gradientBlack").css("padding", "5px 0 5px 0");
                $("#countryInfoScreen").width($(window).width()-50);
                $("#CountryPageComponent").offset({
                    top: docPositionY
                });
                $("#CountryPageComponent").offset({
                    left: 15
                });		
                //$("#cityInfoScreen .gradientBlack").css("padding-top", 5);
                //$("#cityInfoScreen .close").show();
                $("body").css("overflow-y", "auto");
                $('#zoomcontrols').animate({
                    bottom: 32
                });
                $("#tabs").fadeIn();
            });

        }
    }else{
        if(docBottom == false)
        { 
            //docPositionY= $("#cityInfoScreen").offset().top;
            window.scrollBy(0, -850);
            //	$("#arrowUp").hide();
            $("#CountryPageComponent").offset ({
                top: $(window).height() - 68
            });
            $("body").css("overflow", "hidden");
            $("#countryInfoScreen .gradientBlack").css("border-radius", 5);
            $("#countryInfoScreen .gradientBlack").css("padding", "0");
            $("#countryInfoScreen").width($(window).width()-50);
            $("#CountryPageComponent").offset({
                left: 15
            });		
            $("#countryInfoScreen .gradientBlack").css("padding-top", 5);
            $('#countrypanelsysmenu .minimize_action').addClass('maximize_action_active');
            $('#zoomcontrols').fadeIn();
            $('#zoomcontrols').animate({
                bottom: 72
            }, 1000);
            docBottom = true;
            panelPositionY = false;						
        }else{ 
            if(dockPosition == true && panelPositionY == false){ 
                docBottom = false;
                dockPosition = false;
                $('#countrypanelsysmenu .minimize_action').removeClass('maximize_action_active');
                $('#countrypanelsysmenu .maximize_action').removeClass('maximize_action_active');
                countrytoggleDock('max');
            }else{ 
                panelPositionY = false;
                docBottom = false;
                dockPosition = false;

                $('#countrypanelsysmenu .minimize_action').removeClass('maximize_action_active');
                $('#countrypanelsysmenu .maximize_action').removeClass('maximize_action_active');
                $('#zoomcontrols').fadeIn();
                //	$("#arrowUp").show();
                $("#tabs").fadeOut(function(){
                    $("#countryInfoScreen .gradientBlack").css("border-radius", 5);
                    $("#countryInfoScreen .gradientBlack").css("padding", "5px 0 5px 0");
                    $("#countryInfoScreen").width($(window).width()-50);
                    $("#CountryPageComponent").offset({
                        top: docPositionY
                    });
                    $("#CountryPageComponent").offset({
                        left: 15
                    });		
                    //$("#cityInfoScreen .gradientBlack").css("padding-top", 5);
                    //$("#cityInfoScreen .close").show();
                    $("body").css("overflow-y", "auto");
                    $('#zoomcontrols').animate({
                        bottom: 32
                    });
                    $("#tabs").fadeIn();
                });

            }
        }
    }
	
}


function calltoggleDock(type){
    toggleDock(type);
}
/* Function to restore position of panels */
function restorPanel(type){
    panelPositionY = false;
    docBottom = false;
    dockPosition = false;
	
    $('#citypanelsysmenu  .minimize_action').removeClass('maximize_action_active');
    $('#citypanelsysmenu  .maximize_action').removeClass('maximize_action_active');
    $('#zoomcontrols').fadeIn();
    $("#arrowUp").show();
    $("#tabs").fadeOut(function(){
        $("#cityInfoScreen .gradientBlack").css("border-radius", 5);
        $("#cityInfoScreen .gradientBlack").css("padding", "5px 0 5px 0");
        $("#cityInfoScreen").width($(window).width()-50);
        $("#PlanBookComponent").offset({
            top: docPositionY
        });
        $("#PlanBookComponent").offset({
            left: 15
        });		
        //$("#cityInfoScreen .gradientBlack").css("padding-top", 5);
        //$("#cityInfoScreen .close").show();
        $("body").css("overflow-y", "auto");
        $('#zoomcontrols').animate({
            bottom: 32
        });
        $("#tabs").fadeIn();
    });
}
/* Showing map button at bottom of the screen when scrolled up*/


//showCityData
function showCityData(className, divId){ 
    $("." + className).hide();
    $("#" + divId).show();	
    if(divId == 'additionalinfo'){
        $("#foradsense").show();
        $("#li_about").addClass('current');
        $("#li_"+infoDivNavigation).removeClass('current');
        infoDivNavigation = '';
    }else{
        window.scrollTo(0,250);
        $("#foradsense").hide();
        infoDivNavigation = divId;
        $("li").removeClass('current');
        $("#li_"+divId).addClass('current');
    }	
}//end of function showCityData
//showCountryData
function showCountryData(className, divId){
    $("." + className).hide();
    $("#" + divId).show();	
    if(divId == 'Countryadditionalinfo'){
        $('#countrypageslist li').removeClass('current');
        $("#li_aboutCountry").addClass('current');
    }else{
        window.scrollTo(0,250);
        $('#countrypageslist li').removeClass('current');
        $("#li_"+divId).addClass('current');
    }	
}//end of function showCountryData

function open_menu()
{
    var mouse_is_inside_menu = false;
    if(!mouse_is_inside_menu)
    { 
        $("#accountinfo").slideDown("fast");
        mouse_is_inside_menu=true;
    }
    else
    {
        $('#accountinfo').slideUp("fast");
        mouse_is_inside_menu=false; 			
    }

}

// added by Parveen:21/12/12
function setWelcomePosition(wscreen){
    oCTop = (($(window).height()-480)/2)-30;
    oCLft = (($(document).width()-826)/2)+20;
    var wcloseBtnTop=50;
    var DoTop=0;
    var DoTop2=40;
    var DoLeft=10;
	
    if(oCTop > 0)
    {
        DoTop = oCTop;
        wcloseBtnTop = oCTop;
    }
    if (wcloseBtnTop<50){
        wcloseBtnTop = 50;
    }
	
    if(oCTop > 30){
        DoTop2 = oCTop;
    //wcloseBtnTop = 0;
    }
    //$("#OutrContainer").innerHtml();
    if(oCLft > 0)
    {
        DoLeft = oCLft;
    }
    else
    {
        DoLeft = 10;
    }
	
    $("#OutrContainer").css("top", DoTop);
    $("#yes_wrap").css("top", parseInt(DoTop2)-38);
    $("#may_be_wrap").css("top", parseInt(DoTop2)-38);
    $("#welcome_booking_trip_panel").css("top", parseInt(DoTop2)-38);
	
    if ($(window).width() >=1090){
        $("#OrSkip").show();
        $("#welcome_close").css("top", parseInt(wcloseBtnTop)+235);
        $("#welcome_close").css("left", parseInt(DoLeft)+730);
    }else{
        $("#OrSkip").hide();
        $("#welcome_close").css("top", parseInt(wcloseBtnTop)+17);
        $("#welcome_close").css("left", parseInt($(window).width())-200);
    }
	
    if (typeof wscreen != 'undefined'){
        if (wscreen == 'welcome2'){
            $("#OutrContainer").css("left", DoLeft);
        }else{
            $("#OrSkip").hide();
            $("#welcome_close").css("left", parseInt($(window).width())-200);
            $("#welcome_close").css("top", parseInt(wcloseBtnTop)+15);
        }
    }else{
        if ($("#yes_wrap").is(":visible") == false && $("#may_be_wrap").is(":visible") == false && $("#welcome_booking_trip_panel").is(":visible") == false){
            $("#OutrContainer").css("left", DoLeft);
        }else{
            $("#OrSkip").hide();
            $("#welcome_close").css("left", parseInt($(window).width())-200);
            $("#welcome_close").css("top", parseInt(wcloseBtnTop)+17);
        }
    }
	
    $("#backWrap").css("top", parseInt(wcloseBtnTop)+20);
//alert($("#yes_wrap").is(":visible") +"//"+$("#may_be_wrap").is(":visible") +"//"+ $("#welcome_booking_trip_panel").is(":visible"))
}

function chkbrowser(){
    var docwidth = $(window).width();
    var Wel_oCLft = (($(document).width()-826)/2)+20;
    setWelcomePosition();
    /*if(docwidth < 800)
	{
		$("#loginPanel").hide();
		$("#signininfo").width("15px");
		$("#tagacity").css("margin-right","27px");
	}
	else
		$("#loginPanel").show();
		$("#signininfo").css("width", "220px");
		$("#tagacity").css("margin-right","220px");
	}*/
	
    //alert(docwidth);
    //alert("dhfj");
	
	
	
    if(docwidth < 730)
    { 	//alert('730 if part');
        $('#main-top-nav li a').css("font-size","12px");
        $("#main-top-nav li a label span").css("padding","10px 8px 0");
        //$('#main-top-nav').removeClass('fl').addClass('inline').css('margin-left', '100px');
        $("#txtHeadDestination").width(50);
        $("#txtHeadOrigin").css("width","50px");
        $("#trip-widget span").css("width","50px");
        $("#tag-city-widget").css("width","60px");
        $("#PlanBookComponent").css("left","10px");				
        $('#signininfo').hide();
        $('#cityInfoScreen').width(docwidth-35);
        $('#sec_add_trip_form').css('width', '50%');
        $('#sec_add_trip_form').css('min-width', '415px');
        $('#add_trip_skyscraper').hide();
        $('style').append('.flightresultad {display:none !important;}');
		
    //$("#OutrContainer").css("left", 10);   				//Added on 17 Dec, Dev-R
    }
    else if(docwidth <= 1024)
    {
        //alert('1024 if part'); $('#main-top-nav li a label span').css('padding', '10px 6px 0'); 10px 14px 0
        //$('#main-top-nav').removeClass('fl').addClass('inline').css('margin-left', '100px');
        $('#share-trip-widget').hide();
        $('#signininfo').show();
        $("#main-top-nav li a label span").css("padding","10px 6px 0");
        $('#main-top-nav li a').css("font-size","13px");
        $('#txtHeadOrigin').css('width', '150px');
        $('#txtHeadDestination').css('width', '150px');
        $("#tag-city-widget").css("width","auto");
        var mainNavMargin = ((docwidth-500)-$('#main-top-nav').width)/2;
        //$('#main-top-nav').css('margin-left', mainNavMargin + 'px');
        $('#cityInfoScreen').width(docwidth-35);
        $('#sec_add_trip_form').css('width', '50%');
        $('#sec_add_trip_form').css('min-width', '415px');
        $('#add_trip_skyscraper').hide();
        $('style').append('.flightresultad {display:none !important;}');
		
    //if(Wel_oCLft > 0){								    //Added on 17 Dec, Dev-R
    //			$("#OutrContainer").css("left", Wel_oCLft);
    //		}else{

    //			$("#OutrContainer").css("left", 10);
    //		}
    }
    else
    {
        //alert('730 else part');
        $("#main-top-nav li a").css("font-size","15px");
        $("#main-top-nav li a label span").css("padding","10px 14px 0");
        $("#txtHeadDestination").css("width","130px");
        $("#txtHeadOrigin").css("width","130px");
        $("#trip-widget span").css("width","100px");
        $("#tag-city-widget").css("width","auto");
        $("#tag-city-widget").css("width","130px");
        $("#PlanBookComponent").css("left","15px");
        $('#signininfo').show();
        //$('#main-top-nav').css('margin-left', '100px');
        var mainNavMargin = ((docwidth-500)-$('#main-top-nav').width())/2;
        //$('#main-top-nav').css('margin-left', mainNavMargin + 'px');
        $('#cityInfoScreen').width(docwidth-35);
        $('#add_trip_skyscraper').show();
        $('#sec_add_trip_form').css('width', '40%');
        $('style').append('.flightresultad {display:block !important;}');
		
    //if(Wel_oCLft > 0){									//Added on 17 Dec, Dev-R
    //			$("#OutrContainer").css("left", Wel_oCLft);
    //		}else{
    //			$("#OutrContainer").css("left", 10);
    //		}
    }
	
    //if(dockPosition == true)
    //toggleDock();
	  
    fixGridSizes();  
    resizeInfoPanelGrid();     // For city panel
    setFrienddetail();
    resize_countrypage();     // For country panel
};


//addMoreDestination
function addMoreTripDestination(){
    trip_flag= true;
    if(destination_counter==0){
        destination_counter=1;
    }
    if(destination_counter>4){
        alert("Only 5 destinations is allowed for a single trip!");
        return false;
    }
    var newTextBoxSpan = $(document.createElement('span'))
    .attr("id", 'TextBoxSpan' + destination_counter)
    .attr("name", 'TextBoxSpan')
    .attr("class", 'block formfield');
	 
    newTextBoxSpan.html('<input class="text" type="text" onFocus="this.select();" name="txtDestinationSearchCity' + destination_counter + '" id="txtDestinationSearchCity' + destination_counter + '" /><a style="padding-left:5px;" href="javascript:void(0);" onclick="removeDest(' + destination_counter + ')" id="remove_destination'+destination_counter+'"><img height="18px;" width="20px;" src="/images/html5/minus-sign.png"  /></a><input type="hidden" class="text" name="hdnDestinationSearchCity" id="hdnDestinationSearchCity'+destination_counter+'" value=""/>');
	 
    newTextBoxSpan.appendTo("#destination_span");
    autoCompleteDestination(destination_counter);
    $("#destination_counter").val(destination_counter);
    destination_counter++;   
//alert(destination_counter);
}//end of function addMoreDestination


$('#header').click(function() {    
    $("#welcomeBox").hide();
//$("#OutrContainer").hide();
}); 

$.fn.isFacebook = function(){	
    //alert($(document).width());		
    // alert(FBAPP);
    //&& $(document).width() < 1500
    if(FBAPP == 'yes'){
        var getHeight = ($(document).width() * 75)/100;
        //alert(getHeight);		
        if(getHeight > $(document).height()){
            getHeight = $(document).height();
        //alert(getHeight);
        }
		
        $("#fb_Container").height(getHeight);
        $("#containervectormap").height(getHeight);
        $("#mapDiv").height(getHeight);
        //$("#footer").offset({top: getHeight-30});
        $('#main-top-nav').removeClass('fl').addClass('inline').css('margin-left', '80px');
    //alert(FBAPP);
    }
}

/*function getPicLocation(){
	if($('#pic_location').val()=="City, Airport, Address")
	{
		if(document.getElementById("pic_location"))
			document.getElementById("pic_location").value ="";
	}
	var a = $('#pic_location').autocomplete1({ 
			serviceUrl:'/feed/citysuggest/',
			minChars:2, 
			maxHeight:400,
			width:200,
			zIndex: 9999,
			noCache: false, //default is false, set to true to disable caching
			onSelect: function(value, data){ 
					var dataPart =data.split('|');					
			}	
	});
}//end of function getPicLocation

function getDropLocation(){
	if($('#drop_location').val()=="City, Airport, Address"){
		if(document.getElementById("drop_location"))
			document.getElementById("drop_location").value ="";
	}
	var a = $('#drop_location').autocomplete1({ 
			serviceUrl:'/feed/citysuggest/',
			minChars:2, 
			maxHeight:400,
			width:200,
			zIndex: 9999,
			noCache: false, //default is false, set to true to disable caching
			onSelect: function(value, data){ 
					var dataPart =data.split('|');					
			}	
	});
}//end of functiong getDropLocation
*/
/*function getHotelLocation(){
	if($('#HotelCity').val()=="Select a City"){
		if(document.getElementById("HotelCity")){
			document.getElementById("HotelCity").value ="";
		}
	}//end of if block
	var a = $('#HotelCity').autocomplete1({ 
			serviceUrl:'/feed/hotelcitysuggest/',
			minChars:2, 
			maxHeight:400,
			width:200,
			zIndex: 9999,
			deferRequestBy: 10,
			noCache: false, //default is false, set to true to disable caching
			onSelect: function(value, data){ 
				var result = data;
				$('#HotelCity').addClass('selected');
				$('#HotelCity').change(function(){ $(this).removeClass('selected'); });
				welcome_pushpin_data = data;
				//updateTripInfoForAllPlaces('D', result);
			}	
	});
}//end of function getHotelLocation
*/
function getCarPicLocation(){
    if($('#pic_location').val() == "Select a Location"){
        if(document.getElementById("pic_location"))
            document.getElementById("pic_location").value ="";
    }	
    var a = $('#pic_location').autocomplete1({ 
        serviceUrl:'/feed/carlocationsuggest/',
        minChars:2, 
        maxHeight:400,
        width:200,
        zIndex: 9999,
        deferRequestBy: 10,
        noCache: false, //default is false, set to true to disable caching
        onSelect: function(value, data){ 
            document.getElementById("drop_location").value     = data.loc_airport_country;
            document.getElementById("hdn_pic_location").value  = data.location_name+'@'+data.location_city;
            document.getElementById("hdn_drop_location").value = data.location_name+'@'+data.location_city;			
        }	
    });
}

function getCarDropLocation(){
    if($('#drop_location').val()=="Select a Location"){
        if(document.getElementById("drop_location"))
            document.getElementById("drop_location").value ="";
    }
    var a = $('#drop_location').autocomplete1({ 
        serviceUrl:'/feed/carlocationsuggest/',
        minChars:2, 
        maxHeight:400,
        width:200,
        zIndex: 9999,
        noCache: false, //default is false, set to true to disable caching
        onSelect: function(value, data){ 
            document.getElementById("hdn_drop_location").value = data.location_name+'@'+data.location_city;
            welcome_pushpin_data = data;				
        }
    });
}

/*function getHostelLocation(){										//commented on 11-10-12 , code moved to document.ready
	if($('#hostel-city').val()=="Select a Location"){
		if(document.getElementById("hostel-city"))
			document.getElementById("hostel-city").value ="";
	}
	var a = $('#hostel-city').autocomplete1({ 
		serviceUrl:'/feed/hostelcitysuggest/',
		minChars:2, 
		maxHeight:400,
		width:200,
		zIndex: 9999,
		noCache: false, //default is false, set to true to disable caching
		onSelect: function(value, data){ 
			welcome_pushpin_data = data;
		}
	});
}
*/

function welcomeAction(mode, ori){
    var rooms =$('#welcomenumberOfRoom').val();
    if(rooms <=2){
        $('#showListRoomsAC').show();
    }else{
        $('#showListRoomsAC').hide();
    }
    if (ori=="welcome2"){
    //$('#window-8-Application').show();
    }else{
        $('#window-8-Application').hide();
    }
    if(ori == "welcome1"){
        if(!welcomeHashState){
            $('.feature_div ').fadeOut();
            $('.nw_welcome_right h2').slideUp(500, function(){});
            $('.nw_strip .descr').fadeOut('fast');
            $('.nw_strip a label').fadeOut('fast');
            $('.nw_strip a .checkbox').slideUp(500);
            $('.nw_strip a').animate({
                width:10
            });
            $('.nw_strip a label').hide();
            $('#OutrContainer').animate({
                left:-250
            }, 500, function(){
                initWelcomeForms(mode);
                $('.welcomeRestore').show();								
                $('#backWrap').show();
            });
        }else{
            $('.feature_div ').hide();
            $('.nw_welcome_right h2').hide();
            $('.nw_strip .descr').hide();
            $('.nw_strip a label').hide();
            $('.nw_strip a .checkbox').hide();
            $('.nw_strip a').animate({
                width:10
            }, 1);
            $('.nw_strip a label').hide();			
            $('#OutrContainer').animate({
                left:-250
            }, 1, function(){
                initWelcomeForms(mode);
                $('.new_welcome_wrapper').animate({
                    opacity:100
                }, 1);
                $('#backWrap').show();
            });
        }
		
    }else if(ori == "welcome2"){
        welcome();
        $('.welcome_selection').hide();
        $('.welcomeRestore ').fadeOut(function(){});
        $('#backWrap').hide();
        $('#OutrContainer').animate({
            left: oCLft
        }, 500)			
        $('.nw_strip a').animate({
            width:430
        }, 500);
        $('.nw_strip a .checkbox').fadeIn(500);
        $('.nw_strip a label').css('font-size', '28px');
        $('.nw_strip a label').fadeIn('fast');
        $('.nw_strip .descr').fadeIn('fast');
        $('.nw_welcome_right h2').show('slide', {
            direction: 'top'
        });
				
        $('.strip_orange a').attr("onclick", "welcomeAction('no', 'welcome1')");
        $('.strip_green a').attr("onclick", "welcomeAction('maybe', 'welcome1')");
        $('.strip_blue a').attr("onclick", "welcomeAction('yes', 'welcome1')");
		
        $(".feature_div").fadeIn();
    }
    $('#welcome_close').show();
    //alert('welcome action');	
    // this condition done because when we switch from welcome 1-2, 2-1 it getting called immediate and with this paramter not need to check strips visibility.
    if(typeof ori != 'undefined'){
        setWelcomePosition(ori);
        return;
    }
    setTimeout(setWelcomePosition,800);
};



function initWelcomeForms(mode){
    if(mode != '')
        activeWelcomePanel = mode;
    else
        return;
	 
    $('.strip_orange a').attr("onclick", "initWelcomeForms('no')");
    $('.strip_green a').attr("onclick", "initWelcomeForms('maybe')");
    $('.strip_blue a').attr("onclick", "initWelcomeForms('yes')");
    $('.nw_strip a').width(50);
    //$('.nw_strip a label').css('text-align', 'center');

    switch(mode){
        case 'no':
            welcomeNoClick();						//for hash tag url
            $('.welcome_selection').fadeOut(200);
			
            $('.recomendation_wrapper').fadeIn(500);
            $('.strip_orange a').animate({
                width: 90
            }, 800, function(){
                //$('.nw_strip a label').css('font-size', '13px');
                $('#wel_Yes').css('width','50px');
                $('#wel_Maybe').css('width','50px');
				
                $('.nw_strip a label').fadeIn(500);	
            });	
			
            $('.strip_green a label').animate({
                fontSize: 13
            }, 800);
            $('.strip_blue a label').animate({
                fontSize: 13
            }, 800);
            $('.strip_orange a label').animate({
                fontSize: 28
            }, 800);	
									
            break;
        case 'maybe':
            welcomeMaybeClick();					//for hash tag url
            $('.welcome_selection').fadeOut(200);
			
            $('.plan_wrapper').fadeIn(500);	
            $('.strip_green a').animate({
                width: 90
            }, 800, function(){		
                $('.nw_strip a label').css('font-size', '13px');
                $('#wel_No').css('width','50px');
                $('#wel_Yes').css('width','50px');
                //$('.strip_green a label').css('font-size', '28px');
                $('.nw_strip a label').fadeIn(500);	
            });	
			
            $('.strip_green a label').animate({
                fontSize: 28
            }, 800);
            $('.strip_blue a label').animate({
                fontSize: 13
            }, 800);
            $('.strip_orange a label').animate({
                fontSize: 13
            }, 800);
			
            break;
        case 'yes':
            welcomeYesClick();			//for hash tag url
            $('.welcome_selection').fadeOut(200);
			
            $('.book_wrapper').fadeIn(500, function(){
                addAutoSuggest("#wf1");
                addAutoSuggest("#wf2");
                addAutoSuggest("#wf3");
                addAutoSuggest("#wt1");
                addAutoSuggest("#wt2");
                addAutoSuggest("#wt3");
            });			
            $('.strip_blue a').animate({
                width: 90
            }, 800,function(){
                $('.nw_strip a label').css('font-size', '13px');
                $('#wel_No').css('width','50px');
                $('#wel_Maybe').css('width','50px');
                //$('.strip_blue a label').css('font-size', '28px');
                $('.nw_strip a label').fadeIn(500);	
            });
			
            $('.strip_green a label').animate({
                fontSize: 13
            }, 800);
            $('.strip_blue a label').animate({
                fontSize: 28
            }, 800);
            $('.strip_orange a label').animate({
                fontSize: 13
            }, 800);
            break;
    }
    $('.welcome_pnl *').clearQueue();
}

function welcomeBook(){
    $("#topNav li").removeClass("active");
    $("#explore").removeClass("active");
    $("#friendstripslitab").removeClass("active");
    $("#mytripslitab").removeClass("active");
    $("#geoPlacesTab").removeClass("active");
    $("#geofarelitab").addClass("active");	
    if(faresearchcheck == false){    	
        var bookType = $('#welcomebook ul li a.selected');
        if(bookType.length == 0 ){
            bookType = ['flight', 'hotel', 'hostel', 'car', 'activity']
        }else{
            gBookType = bookType;
        }
	
        for(i=0; i<=bookType.length-1; i++){
            setBookingParameters(bookType[i].rel)
        }
	
        for (i=1; i < destCtr; i++){
            $('#wt' + i ).vectorMap($('#wf' + i).attr('pushpindata'));	
        }
		
        if(is_welcome_book_panel == 1){
            cityMainTabType = 'Book';
            switch(bookType[0].rel){
                case 'flight':
                    activeBookTab = 'Flight';
                    break;
                case 'hotel':
                    activeBookTab = 'Hotel';
                    break;
                case 'hostel':
                    activeBookTab = 'Hostel';
                    break;
                case 'car':		
                    activeBookTab = 'Car';
                    break;
                case 'activity':
                    activeBookTab = 'Activity';
                    break;
            }
            //alert("welcome_book_panel_city_id:"+welcome_book_panel_city_id);
            $('#rootvectormap').vectorMap('set', 'triggerPinClick', welcome_book_panel_city_id);			
            cityMainTabType = 'Plan';
        //showhideTopBar('show');
        }else{
            //alert("is_welcome_book_panel:"+is_welcome_book_panel);
            openCityDetails('', 200, 350,'book', $('#wf1').attr('rel'), bookType[0].rel, '', 'fare');
        }
        switch(bookType[0].rel){ 
            case 'flight':
                // its commented because there is issue of double book/fare search panel opening
                //hashPushState("Fare-Search/Flight","Georama - Fare Search | Flight");
                break;
            case 'hotel':
                $("#bhotel").trigger('click');
                break;
            case 'hostel':
                $("#bhostel").trigger('click');
                break;
            case 'car':		
                $("#ccar").trigger('click');
                break;
            case 'activity':
                $("#bactivities").trigger('click');
                break;
            default:
                if(typeof bookType[0].rel =="undefined");
                hashPushState("Fare-Search/Flight","Georama - Fare Search | Flight");		//hash tag
		
        }
    }else{								
        for (i=1; i < destCtr; i++){		
            $('#wt' + i ).vectorMap($('#wf' + i).attr('pushpindata'));			
        }	
        openCityDetails('', 200, 350,'book', $('#wf1').attr('rel'),'', '', 'fare');		
    }																				
}

function setBookingParameters(type){
    switch(type){
        case 'flight':
            $("#flightFrom").val($('#wf1').val());
            $('#flightTo').val($('#wt1').val());
            $("#flightFromDate").val($('#Wfl1').val());
            if(destCtr == 1){
                $('#flightToDate').val($('#Wfr1').val());
            }
            break;
        case 'hotel':
            $("#HotelCity").val($('#wt1').val())
            $('#numberOfAdults option:selected').val($('#wtravelers').val());
            //$('#fdate').val($('#wt1').val());
            if(destCtr == 1){
                $('#tdate').val($('#wt1').val());
            }else{
                $('#tdate').val($('#wf1').val());
            }
            break;
        case 'hostel':
            $("#hostel-city").val($('#wt1').val());
            $("#hostel-city").attr("rel", $('#wf1').attr("rel"));
            $("#Hostelfdate").val($('#wd1').val());
            $('#guest option:selected').val($('#wtravelers').val());
            break;
        case 'car':			
            break;
    }

}//end of function setBookingParameters

function getWelcomeRecommendations(){
    recommendurl="/geo/getrecommendations";
    //monthurl="/geo/gettime";
	
    $('#welcomeInterests').html(preloadDivS);
    $.getJSON(url, function(fsdata) {
        renderWAct(fsdata);
    });
}

function renderWAct(data){
    var reco = '';
	
    $.each(data.items, function(i, fsdata) {
        reco += '<li><a href="javascript://"  class="selected" rel=' + fsdata.items[i].id + '>' + fsdata.items[i].placename + '</a></li>';
    });
		
    $('#welcomeInterests').html(reco);
}

function fillPlanBucket(bucketId, cityId){
    //var inText = '<div class="scrollbar_wrapper"><div class="scrollbar"><div class="thumb"></div></div><div class="viewport" style="height:171px;"><div class="overview">' + preloadDivS + '</div></div></div>'
	var tagWelcomeFirstCity=$('#tagWelcomeCity1').val();
	var tagWelcomeSecondCity=$('#tagWelcomeCity2').val();
	var tagWelcomeThirdCity=$('#tagWelcomeCity3').val();
	if(tagWelcomeFirstCity !='Select a City' && (tagWelcomeSecondCity !='Select a City' || tagWelcomeThirdCity !='Select a City')){
		
	if(tagWelcomeFirstCity == tagWelcomeSecondCity || tagWelcomeFirstCity == tagWelcomeThirdCity || tagWelcomeSecondCity==tagWelcomeThirdCity){
		notifyme("You have already selected this city.Please input another city.", "error");
		$("#welcomeCity" + bucketId).html("");
		
                return false;
	 }
	}
	if(tagWelcomeSecondCity !='Select a City' && (tagWelcomeFirstCity !='Select a City' || tagWelcomeThirdCity !='Select a City')){
		
	if(tagWelcomeFirstCity == tagWelcomeSecondCity || tagWelcomeFirstCity == tagWelcomeThirdCity || tagWelcomeSecondCity==tagWelcomeThirdCity){
		notifyme("You have already selected this city.Please input another city.", "error");
			$("#welcomeCity" + bucketId).html("");
                return false;
	 }
	}
	
	$('#welcomeMayBeCont').show();
	$("#welcomeCity" + bucketId).html(preloadDivS);
    var url = "/html5/welcome/getcityinfo/cityId/"+cityId+'/sid/'+Math.random();

    $.get(url, function(result) {
        //alert(result);
        $("#welcomeCity" + bucketId).html(result);
        $("#welcomeCity" + bucketId).find("input.gaTrack_view_maybe[type=button]").attr("id","view_button_"+bucketId);		
    //$('#scrollbar_wrapper').tinyscrollbar({ sizethumb: 25 });
		
    });
}// same function present in welcome.js not used by dev AN on 06/03/13

function toggleWelcomeBookButton(id){
    //is_welcome_book_panel = 0;
    $('#welcomebook li a').removeClass('selected');
    $('.pnlwelcomebook').hide();
    $(id).addClass('selected');
    $(id + 'pnl').show();
    switch(id){
        case "#wflight":
            yesTab = 'Flight';
            hashPushState("Welcome" + "/Yes/Book/Flight", "Georama - " + "Welcome | Book - Flight");		
            //$("#welcome_booking_trip_panel").css('margin-top','-226px');
            break;
        case "#whotel":
            yesTab = 'Hotel';
            hashPushState("Welcome" + "/Yes/Book/Hotel", "Georama - " + "Welcome | Book - Hotel");
            //$("#welcome_booking_trip_panel").css('margin-top','-212px');
            break;
        case "#whostel":
            yesTab = 'Hostel';
            hashPushState("Welcome" + "/Yes/Book/Hostel", "Georama - " + "Welcome | Book - Hostel");
            break;
        case "#wcar":
            yesTab = 'Car';
            hashPushState("Welcome" + "/Yes/Book/Car", "Georama - " + "Welcome | Book - Car");
            //$("#welcome_booking_trip_panel").css('margin-top','-238px');
            break;
        case "#wactivity":
            yesTab = 'Activity';
            hashPushState("Welcome" + "/Yes/Book/Activity", "Georama - " + "Welcome | Book - Activity");
            //$("#welcome_booking_trip_panel").css('margin-top','-238px');
			
            //moved code of datepicker from here to document.ready on 19Apr2013 by dev AN.
            break;
    }
}

function addAutoSuggest(id){
    var a = $(id).autocomplete1({ 	
        serviceUrl:'/feed/citysuggest/',
        minChars:2, 
        maxHeight:400,
        width:200,
        zIndex: 9999,
        noCache: false, //default is false, set to true to disable caching
        onSelect: function(value, data){ 
		
            var arrdata =data.split('|');
            try{
                //$("#OutrContainer").hide("fade", 100);
                //$('#rootvectormap').vectorMap("set", "label", {"n":arrdata[0],"d":arrdata[5],"lat":arrdata[1],"lon":arrdata[2], "pin":1, "pcolor":"white", "key":arrdata[3], "l":1, "latVar":0, "lonVar":0});	
                $(id).attr("rel", arrdata[3]);
                $(id).attr('pushpindata', "'set', 'label', {'n':arrdata[0],'d':arrdata[5],'lat':arrdata[1],'lon':arrdata[2], 'pin':1, 'pcolor':'white', 'key':arrdata[3], 'l':5, 'latVar':0, 'lonVar':0}");
            //$("#hostel-city").attr("rel", $('#wf1').attr("rel"));
            //$('#rootvectormap').vectorMap('set', 'triggerPinClick', arrdata[3]);
            //return arrdata[0];				
            }
            catch(err) {}
        }	
    });
}

function checkLoginStatus(){
    if(FBAPP != 'yes'){
        //var logOut = $.cookie("georama",  { path: '/' });        
        var logOut = getCookie('georama');   
        //alert(FB_LOGIN+" "+logOut);
        //console.log(logOut+"//"+FB_LOGIN + "//"  + logOut + "//"+sessionPopup);
        if((FB_LOGIN == '1') &&  (typeof logOut == 'undefined') && (sessionPopup == false)){
            //window.location.replace(HTTP_HOST); 
            $("#loginPanel").hide();
            $('#cache_clear_id').attr('title', 'Not logged in');
            $("#cache_clear_id").html('<p>Please log in to continue.</p>');		
            loggedInCacheClear();
            $(document).keypress(function(e) {                                   //for Esc key press
                if(e.keyCode == 27){ 
                    $('#cache_clear_id').attr('title', 'Not logged in');
                    $("#cache_clear_id").html('<p>Please log in to continue.</p>');
                    loggedInCacheClear();	
                }// esc
            });
        }else if((FB_LOGIN == '0') &&  (typeof logOut == 'undefined') && (sessionPopup == false)){            
            //window.location.replace(HTTP_HOST); 
            $('#cache_clear_id').attr('title', 'Session Expired');
            $("#cache_clear_id").html('<p>Your session has expired. Please click OK to continue.</p>');
            loggedInCacheClear();
            $(document).keypress(function(e) {                               //for Esc key press
                if(e.keyCode == 27){ 
                    $('#cache_clear_id').attr('title', 'Session Expired');
                    $("#cache_clear_id").html('<p>Your session has expired. Please click OK to continue.</p>');
                    loggedInCacheClear(); 	
                }// esc
            });
        }//end of else block
    }//this will work in case of georama only not in case of facebook app
}

/* jQuery Document onload */
$(document).ready(function(){
    //docPositionY = $("#PlanBookComponent").offset().top;
	$('.footer_inner ul li a').click(function (e) {
		if(indPageloadingProcess == true){
			e.preventDefault();
		}	
	});

    document.body.onkeyup = function(e) {
        var code = e.keyCode;
        if(code === 38) { // key code for j
            window.scrollBy(0, -50);
        } else if(code === 40) { // key code for j
            window.scrollBy(0, 50);
        }
    };
	
    $("#varificationKey").keypress(function(event){		
        if(event.keyCode == 13){
            $("#verify_btn").click();
        }
    });	
    $("#request_code").keypress(function(event){
        if(event.keyCode == 13){
            $("#request_btn").click();
        }
    });
	
    //$( "#amount span.minAmt" ).html( "$" + $( "#budget-range" ).slider( "values", 0 ));
    //$( "#amount span.maxAmt" ).html( "$" + $( "#budget-range" ).slider( "values", 1 ));	
    //$.stopAjax("autocomplete1", function(){alert("autocomplete Ajax requests stopped")}) 
	
	
		  
    /*$("#add_more_destination").click(function () {
            addTripDestination();
            //addMoreTripDestination();
            //commented by Vijay 27-Dec-2012 for optimizations and shift this code in mytrip-addedittrip.phtml file
	});*/
        
    //	$('.scrollbar_wrapper').tinyscrollbar({ sizethumb: 25 });

    $('.dragHandle').click(function(){ 
        //$( "#geoInformation" ).draggable({handle: ".dragHandle"});
        });
	
    $('.dragHandle').click(function(){ 
        //$( "#PlanBookComponent" ).draggable({handle: ".dragHandle"});
        });
	
    $('.widget_notes').live('keypress',function(){
        $('.notes_disabled').hide();	
        $('.notes_enabled').show();	
    });//added by dev AN- 07-feb-13, moved here from all MT category(poi.phtml, hostel.phtml etc) and widgets(untitled and main) files to here, to make code centralized

    $('#PlanBookComponent').bind('click', function() { 	
        $("#bing_attraction_info").hide('fade', 500);
        $("#rightmenu").hide('fade', 500);
    });
    $('.nav').bind('click', function() { 	
        $("#bing_attraction_info").hide('fade', 500);
        $("#rightmenu").hide('fade', 500);
        
        
    });
	
    $('#dbDealsCategory').click(function(){
        $('#listDealsCategory').slideDown('fast');
    /*		$('#listDealsCategory').mouseleave(function(){
			$(this).fadeOut();
		});
*/	})
	
    $("#notifyme").click(function(){
        $(this).fadeOut();
    });
	
    //	notifyme("this is a very long message and i am trying to center align it ;)", "success");

    var a = $('#txtlocation').autocomplete1({ 	
        serviceUrl:'/feed/citysuggest/',
        minChars:2, 
        maxHeight:400,
        width:200,
        zIndex: 9999,
        noCache: false, //default is false, set to true to disable caching
        onSelect: function(value, data){ 
            var arrdata =data.split('|');
            try{
                //$("#OutrContainer").hide("fade", 100);
                $('#rootvectormap').vectorMap('set', 'label', {
                    "n":arrdata[0], 
                    "c": arrdata[4].toLowerCase(),
                    "d":arrdata[5],
                    "lat":arrdata[1],
                    "lon":arrdata[2], 
                    "pin":1, 
                    "pcolor":"white", 
                    "key":arrdata[3], 
                    "l":5, 
                    "latVar":0, 
                    "lonVar":0
                });	
                $('#rootvectormap').vectorMap('set', 'triggerPinClick', arrdata[3]);				
            }
            catch(err) {}
        }	
    });
	
    var b = $('#Wf1').autocomplete1({ 
        serviceUrl:'/feed/airport-suggest/',
        minChars:2, 
        maxHeight:220,
        width:320,
        zIndex: 9999,
        noCache: false, //default is false, set to true to disable caching
        onSelect: function(value, data){
            //$("#Wf1").val($.trim(value)); 
            var textval = getAirportNameCorrected(value);
            $("#Wf1").val(textval);   
            //alert(textval);
            $("#WfHdn_from").val(data.geo_city_id);
            flight_pushpin_data = data;
        }	
    });

    var c = $('#Wfd1').autocomplete1({ 
        serviceUrl:'/feed/airport-suggest/',
        minChars:2, 
        maxHeight:320,
        width:260,
        zIndex: 9999,
        noCache: false, //default is false, set to true to disable caching
        onSelect: function(value, data){ 
            if(data.is_book_panel == 1){
                is_welcome_book_panel = data.is_book_panel;
                welcome_book_panel_city_id = data.geo_city_id;
                welcome_pushpin_data = data;
            }else{
                is_welcome_book_panel = 0;
                welcome_book_panel_city_id = 0;
                welcome_pushpin_data = '';
            }	
            var textval = getAirportNameCorrected(value);
            $("#Wfd1").val(textval); 
            $("#WfHdn_to").val(data.geo_city_id);
        }	
    });

    var d = $('#WCpic_location').autocomplete1({ 
        serviceUrl:'/feed/carlocationsuggest/',
        minChars:2, 
        maxHeight:400,
        width:200,
        zIndex: 9999,
        noCache: false, //default is false, set to true to disable caching
        onSelect: function(value, data){ 
            document.getElementById("WCdrop_location").value = data.loc_airport_country;
            document.getElementById("hdn_WCpic_location").value=data.location_name+'@'+data.location_city;
            document.getElementById("hdn_WCdrop_location").value=data.location_name+'@'+data.location_city;
            if(data.is_book_panel == 1){
                is_welcome_book_panel = data.is_book_panel;
                welcome_book_panel_city_id = data.geo_city_id;
                welcome_pushpin_data = data;
            }else{
                is_welcome_book_panel = 0;
                welcome_book_panel_city_id = 0;
                welcome_pushpin_data = '';
            }
        }	
    });

    var e = $('#WCdrop_location').autocomplete1({ 
        serviceUrl:'/feed/carlocationsuggest/',
        minChars:2, 
        maxHeight:400,
        width:200,
        zIndex: 9999,
        noCache: false, //default is false, set to true to disable caching
        onSelect: function(value, data){ 
            document.getElementById("hdn_WCdrop_location").value = data.location_name+'@'+data.location_city;
            if(data.is_book_panel == 1){
                is_welcome_book_panel = data.is_book_panel;
                welcome_book_panel_city_id = data.geo_city_id;
                welcome_pushpin_data = data;
            }else{
                is_welcome_book_panel = 0;
                welcome_book_panel_city_id = 0;
                welcome_pushpin_data = 0;
            }
        }
    });
	
    /*Auto complete for hostel city*/
    var d = $('#welcomeHostelCity').autocomplete1({ 
        serviceUrl:'/feed/hostelcitysuggest/',
        minChars:2, 
        maxHeight:400,
        width:200,
        zIndex: 9999,
        noCache: false, //default is false, set to true to disable caching
        onSelect: function(value, data){ 
            if(data.is_book_panel == 1){
                is_welcome_book_panel = data.is_book_panel;
                welcome_book_panel_city_id = data.geo_city_id;
                welcome_pushpin_data = data;
            }else{
                is_welcome_book_panel = 0;
                welcome_book_panel_city_id = 0;
                welcome_pushpin_data = '';
            }
        }	
    });
	
    /* Closing Welcome Screen */	
    $('body').click(function(){
        // $(".welcomeBox").hide("fade", 500);	
        $('#cityInformation').hide();
        $('#nulAttraction').hide();
        $('#nulRestaurant').hide();
        $('#nulNightlife').hide();
        //$('#nulEvent').hide();
        $('#nulActivity').hide();
        $('.tagCityPointer').hide(); 
        // $(".mapviewHover").fadeOut();
        $('#topRecmTip').hide();
        if($('#tripMenu').css('display')=='block'){
            $('#tripMenu').hide();
        }
        if($('#tripMenuCountry').css('display')=='block'){
            $('#tripMenuCountry').hide();
        }
        if($('#rightmenu').css('display')=='block'){
            $('#rightmenu').hide();
        }
        
        //  hideOriginDestinationPopUp();
	  
	  
        $("#welcomeBox").hide();
        if(!click_is_inside_menu)
            click_is_inside_menu=true;
        else{
            $('#accountinfo').slideUp("fast");
            click_is_inside_menu=false; 			
        }
		
    });
    /* Closing Welcome Screen */
	 
    var mouse_is_inside_list = false;	
    $('.topResturant').hover(function(){ 
        mouse_is_inside_list=true; 
    }, function(){ 
        mouse_is_inside_list=false; 
    });
	
    $(window).click(function(){ 
        try{
            checkLoginStatus();
            //$("a").off();
             /** disable the click event while page is loading**/
             
                /*$('a').each(function(){
                    $(this).unbind('click');
                    $(this).attr('onclick','javascript:void(0)');                        
                });*/
            /** disable the click event while page is loading**/
        }catch(e){}
    });
	
    $(window).mouseup(function(){ 
        try{
            map.stopMapDrag();
        }catch(e){}
    });
	
    $("body").mouseup(function(){ 
        try{
            if(!mouse_is_inside_list)
            {
                $('#listAttractionCategory').slideUp("fast");
                $("#listRestaurantCategory").slideUp("fast");
                $("#listNightlifeCategory").slideUp("fast");
                $("#listShoppingCategory").slideUp("fast");
                $("#listEventCategory").slideUp("fast");
                $("#planlistActivityCategory").slideUp("fast");
                $("#listDealsCategory").slideUp("fast");
            }
            map.stopMapDrag();
        }catch(e){}
    });
	
    if($('#rootvectormap').length > 0){		
        $('#rootvectormap').vectorMap({
            onRegionClick: function(event, lat, lng){
                ZoomCountryLevel(lat, lng);
            },
            onPushpinAdded: function(event, data, key){
                saveTripPart(key)
            },
            onPushpinDeleted: function(event, data, key){
                deleteTripPart(key)
            },
            onDestinationDeleted: function(event, data, key,indexStr){
                deleteDestTripPart(key,indexStr)
            },
            onWaterDblClick: function(event, arg){
                mapZoomOut();
            }
        });	
        $('#rootvectormap').vectorMap('set', 'label', {
            "key": -1
        });
        if(FB_LOGIN == "0"){
            quickNavTripId = Number(document.getElementById("tripPlaceId").value);
            getTripPushPinsResult(document.getElementById("tripPlaceId").value);
        }
        map.hideAllCityNames();
    }//end of if block
	
    /*url = '/html5/plan/ippushpin/rand/' + parseInt(Math.random() * 99999999);
	$.get(url, function(data) {
		arrdata = data.split('|||');
		if($('#rootvectormap').length > 0){	
			$('#rootvectormap').vectorMap('set', 'label', {"n":arrdata[1],"d":arrdata[2],"lat":arrdata[3],"lon":arrdata[4], "pin":1, "pcolor":"green", "key":arrdata[0]});	
		}
	});*/

    $( "#slider" ).slider({ 
        startValue:5,
        max:20,
        min:0,
        step: 2, 
        animate: true, 
        stop: function(e, ui) { //alert(ui.value);
            zoomBingToLevel(ui.value); 				
        }
    });

    $("#iconNav").organicTabs({
        "speed": 200			
    });
	
	
	
    //$("ul.subnav").parent().append("<span><a class='arrow'></a></span>"); //Only shows drop down trigger when js is enabled - Adds empty span tag after ul.subnav	
    /*$("ul.topnav li span").click(function() { 		
		//When trigger is clicked...	
		//Following events are applied to the subnav itself (moving subnav up and down)
		
		//getMyTripList();
		hideTopNavSettings();
		$(this).parent().find("ul.subnav").slideDown('fast').show(); //Drop down the subnav on click

		$(this).parent().hover(function() {
		}, function(){	
			$(this).parent().find("ul.subnav").slideUp('slow'); //When the mouse hovers out of the subnav, move it back up
		});

		//Following events are applied to the trigger (Hover events for the trigger)
		}).hover(function() { 
			$(this).attr("id", "trip_name_nav");
			$(this).addClass("subhover"); //On hover over, add class "subhover"
		}, function(){	
			//On Hover Out
			$(this).removeClass("subhover"); //On hover out, remove class "subhover"
	});*/
    $("#topNavTripList").mouseleave(function(){
        $(this).hide();
    });
    //$("ul.subnav").mouseleave(function(){ $(this).hide(); });
    //$("ul.topnav li span").hide();
	
    /*	$("#trip_change_text").click(function(){     // commented on 25Jan Dev-R
		//$(".topnav .subnav").show();
		$("#topNavTripList").show();
	});
*/	
    $("#tabs").tabs(); 	
    $(".topnav .subnav").width($(".tripinfo").width());
    //$(".topnav .subnav").css("left",-($(".tripinfo").width()-55));

			
    $("#themeColor").click(function(){
        $(".mapviewHover").toggle("fast");
    });

    $("#back-to-map").mouseout(function(){
        $(this).animate({
            opacity: .2
        }, "fast");
    });
	 
    $("#back-to-map").mouseover(function(){
        $(this).animate({
            opacity: .8
        }, "fast");
    });	
	 
    $("#footer").click(function(e){
        $("#welcomeBox").hide();
        //$("#OutrContainer").hide();
        hideTips();
    });
	
    $("#rootvectormap").click(function(){
        $(".welcomeBox").hide('fade', 500);
        $("#tripMenuCountry").hide();
        $("#ui-datepicker-div").hide();
        hideTips();		
    });
	
    $('#rootvectormap, .georama-tagCityPointer, #destnTip, #topRecmTip').mousedown(function(event) {
        if (event.which == 3){
            hideTips();		
        }
    });
	
    $("#ui-datepicker-div").hover(function(){ 
        clickflag=true;	
    }, function(){ 
        clickflag=false; 
    }); 
    $('.gradientBlack').hover(function(){ 
        mouse_is_inside_mylist=true; 
    }, function(){ 
        mouse_is_inside_mylist=false; 
    });
	
    $("#containervectormap").click(function(){ 
        if(!mouse_is_inside_mylist && !clickflag)
        {
            $('#topNavItems').hide();
            mouse_is_inside_mylist=true; 
        }
    });
		
    $('#containervectormap').click(function(){
        hideTopNavSettings();
        cancelEditMode();
    });
	
    $('#my_trip_wrapper').click(function(){
        hideTopNavSettings();
    });
	
    $('#mapDiv').click(function(){
        hideTopNavSettings();
        cancelEditMode();
    });
	
    $('#PlanBookComponent').click(function(){
        hideTopNavSettings();
        cancelEditMode();
    });

    $('#header-wrap').click(function(){
		
        hideTips();		
        hideTopNavSettings();
        cancelEditMode();
    });

    //--------------For hiding tips ----------------------------//	
    $('.rightPanel , #zoomcontrols , #topbar-wrap').click(function(){    
        hideTips();		
    });

		
    $('#header_city').focus(function(){ 
        $('#header_city').val("");
        hideTopNavSettings();
        cancelEditMode();
    });

    $('#header_city').blur(function(){ 
        if ($('#header_city').val() == ""){
            $('#header_city').val("Add a City");
        }
    });
		
    $('#txtHeadOrigin').focus(function(){ 
        $('#txtHeadOrigin').val("");
        hideTopNavSettings();
    });
	
    $('#txtHeadDestination').focus(function(){ 
        $('#txtHeadDestination').val("");
        hideTopNavSettings();
    });

    $('#trip_origin').focus(function(){ 
        if($('#trip_origin').val()=="Enter City or Location"){
            if(document.getElementById("trip_origin")){
                document.getElementById("trip_origin").value ="";
            }
        }
    });
	
    $('#trip_origin').blur(function(){ 
        if($('#trip_origin').val()==""){
            document.getElementById("trip_origin").value ="Enter City or Location";
            document.getElementById("hidden_trip_origin").value= 0;
        }
    });
	
    $('#trip_destination').focus(function(){ 
        if($('#trip_destination').val()=="Enter City or Location"){
            if(document.getElementById("trip_destination"))
                document.getElementById("trip_destination").value ="";
        }
    });
	
    $('#trip_destination').blur(function(){ 
        if($('#trip_destination').val()=="")
            document.getElementById("trip_destination").value ="Enter City or Location";
        document.getElementById("hidden_trip_destination").value= 0;
    });	
	
    $('#pic_location').blur(function(){ 
        if($('#pic_location').val()=="")
            document.getElementById("pic_location").value ="City, Airport, Address";
    });
	
    $('#drop_location').blur(function(){ 
        if($('#drop_location').val()=="")
            document.getElementById("drop_location").value ="City, Airport, Address";
    });	
	
    //$( "#trip_origin_date" ).datepicker({ inline: true, minDate: 0, dateFormat: 'mm-dd-yy'});	
	  	
	 
	
	
    /*$("#dtcheckin").html('Date: ' + $('#bookhotelsearhcheckin').val);*/

    /*	$( ".activitBookFrom" ).datepicker({ inline: true, altField: '#viator_startDate', minDate: 0, yearRange: '2012:2014', dateFormat: 'mm-dd-yy', defaultDate: '+1m', onSelect: function(dateText, inst) {
				getNextDate(dateText, '.activitBookto', false);				
	}});
	$( ".activitBookto" ).datepicker({ inline: true, altField: '#viator_endDate', minDate: 0, yearRange: '2012:2014', dateFormat: 'mm-dd-yy', defaultDate: '+1m 1d', onSelect: function(dateText, inst) { }});*/

    /*$("#dtcheckin").html('Date: ' + $('#bookhotelsearhcheckin').val);
	$("#dtcheckout").html('Date: ' + $('#bookhotelsearhcheckout').val);  */
	
    /* Initializing calendar in hostel */
    $( ".Hostelfdate" ).datepicker({
        inline: true, 
        altField: '#Hostelfdate', 
        maxDate:'+1y -1d', 
        yearRange: '2012:2014', 
        dateFormat: 'mm-dd-yy', 
        onSelect: function(dateText, inst) {
            getNextDate(dateText, '.Hosteltdate', false);
        }
    });
    $( ".Hosteltdate" ).datepicker({
        inline: true, 
        altField: '#Hosteltdate', 
        maxDate:'+1y', 
        yearRange: '2012:2014', 
        dateFormat: 'mm-dd-yy', 
        defaultDate: '+1m +1d', 
        onSelect: function(dateText, inst) {}
    });
	
    $( ".Hostelfdate" ).datepicker( 'setDate', '+1m');
    $( ".Hostetfdate" ).datepicker( 'setDate', '+1m +1d');

    //	$("#HostelDtcheckin").html('Date: ' + document.getElementById('Hostelfdate').value);
    //	$("#hostelDtcheckOut").html('Date: ' + document.getElementById('Hosteltdate').value);
 	
    //$('#welcome_close').show();
        
    /*  ************************ Start welcome Hotel datepicker Block ******************************************************  */
    /*START- DATEPICKER WELCOME HOTELS dev AN | last modified on 16apr2013*/
        
    $("#wd1").datepicker({
        inline: true, 
        altField: '#wd1', 
        minDate: 0, 
        maxDate:'+1y -1d', 
        yearRange: '2012:2014',
        dateFormat: 'mm-dd-yy',
        defaultDate: '+1m ',
        onSelect: function(dateText, inst) {		
            getNextDate(dateText, '#wdr1', false);
        //$('.fdate').datepicker({ "setDate": dt.replace(/-/g, '/')});
        }
    });
    $("#wdr1").datepicker({
        inline: true, 
        altField: '#wdr1', 
        minDate: '+1d', 
        maxDate:'+1y', 
        yearRange: '2012:2014', 
        dateFormat: 'mm-dd-yy', 
        defaultDate: '+1m +1d', 
        onSelect: function(dateText, inst) { 
            $('.tdate').datepicker({
                "setDate": document.getElementById("wdr1").value
            });	
            var flag = ValidateReservationDates("#wd1","#wdr1");
            if(!flag){
                setPreDefDate(dateText, '#wd1');   
            }
        }
    });	

    $("#wd1").datepicker('setDate', '+1m');
    $("#wdr1").datepicker('setDate', '+1m +1d');
    /*END- DATEPICKER WELCOME HOTELS dev AN | last modified on 16apr2013*/
	
    /*  ************************ End welcome Hotel datepicker Block ******************************************************  */ 
        
    $( ".hasdatepicker" ).datepicker( "option", {
        dateFormat: 'mm-dd-yy'
    });	
    $('.hasdatepicker').datepicker({
        "setDate": '+1m'
    });
    //initDepartDate
        
        
        
    /*  ************************ START welcome Activity datepicker Block ******************************************************  */ 
    $( "#wActivityFromDt" ).datepicker({
        inline: true, 
        altField: '#wActivityFromDt', 
        minDate: 0, 
        maxDate:'+1y -1d', 
        yearRange: '2012:2014', 
        dateFormat: 'mm-dd-yy', 
        defaultDate: '+1m', 
        onSelect: function(dateText, inst) {			
            getNextDate(dateText, '#wActivityToDt', false);
        }
    });
			
    $( "#wActivityToDt" ).datepicker({
        inline: true, 
        altField: '#wActivityToDt', 
        minDate: 0, 
        maxDate:'+1y', 
        yearRange: '2012:2014', 
        dateFormat: 'mm-dd-yy', 
        defaultDate: '+1m 1d', 
        onSelect: function(dateText, inst) {
            var flag = ValidateReservationDates("#wActivityFromDt","#wActivityToDt");
            if(!flag){
                setPreDefDate(dateText, '#wActivityFromDt');   
            }    
        }
    });
    $("#wActivityFromDt").datepicker("setDate", "+1m");
    $("#wActivityToDt").datepicker("setDate", "+1m 1d");
    /*  ************************ END welcome Activity datepicker Block ******************************************************  */ 
        
        
        
	
    /*  ************************ Start welcome car datepicker Block ******************************************************  */
    $( "#welcomeCarPickupDt" ).datepicker({
        inline: true, 
        altField: '#WC1', 
        maxDate:'+1y -1d' ,
        yearRange: '2012:2014', 
        dateFormat: 'mm-dd-yy', 
        minDate: 0, 
        maxDate: '+1y', 
        defaultDate: '+1m', 
        onSelect: function(dateText, inst) {
            getNextDate(dateText, '#welcomeCarDropupDt', false);
        }
    });
    $("#welcomeCarDropupDt" ).datepicker({
        inline: true, 
        altField: '#WCdc1', 
        maxDate:'+1y', 
        yearRange: '2012:2014', 
        dateFormat: 'mm-dd-yy', 
        minDate: '+1d', 
        defaultDate: '+1m',
        onSelect: function(dateText, inst) {
            var flag = ValidateReservationDates("#welcomeCarPickupDt","#welcomeCarDropupDt");
            if(!flag){
                setPreDefDate(dateText, '#welcomeCarPickupDt');   
            }
        }
    });		
    $("#welcomeCarPickupDt" ).datepicker('setDate', '+1m');
    $("#welcomeCarDropupDt").datepicker('setDate', '+1m +1d');
    /*  ************************ End welcome car datepicker Block ******************************************************  */
        
        
    /*  ************************ Start welcome Flight datepicker Block ******************************************************  */
    $( "#Wfl1" ).datepicker({
        inline: true, 
        yearRange: '2012:2014', 
        maxDate:'+1y -1d', 
        dateFormat: 'mm-dd-yy', 
        minDate: 0, 
        defaultDate: '+1m', 
        onSelect: function(dateText, inst) {
            getNextDate(dateText, '#Wfr1', false);
        }
    });
	
    $("#Wfr1" ).datepicker({
        inline: true, 
        maxDate:'+1y', 
        yearRange: '2012:2014', 
        dateFormat: 'mm-dd-yy', 
        minDate: '+1d', 
        defaultDate: '+1m +1d',
        onSelect: function(dateText, inst) {
            var flag = ValidateReservationDates("#Wfl1","#Wfr1");
            if(!flag){
                setPreDefDate(dateText, '#Wfl1');   
            }
        }
    });
    $("#Wfl1" ).datepicker('setDate', '+1m');
    $("#Wfr1").datepicker('setDate', '+1m +1d');
        
    /*  Last modified dev AN on 22Apr 2013
         *  ************************ End welcome Flight datepicker Block ******************************************************  */
        
        
    //	$( "#flightFromDate" ).datepicker({ inline: true, altField: '#flightFromDate', yearRange: '2012:2014', dateFormat: 'mm-dd-yy', minDate: 0,   defaultDate: '+1m', 
    //	onSelect: function(dateText, inst) {
    //			getNextDate(dateText, '#flightToDate', false);
    //			
    //		}
    //	});
    //	$( "#flightToDate" ).datepicker({ inline: true, altField: '#flightToDate', yearRange: '2012:2014', dateFormat: 'mm-dd-yy', minDate: 0,   defaultDate: '+1m +1d'});
    //	$( "#flightFromDate" ).datepicker( 'setDate', '+1m');
    //	$( "#flightToDate" ).datepicker( 'setDate','+1m +1d');
	
    /*  ************************ Start welcome Hostel datepicker Block ******************************************************  */
    /*START-HOSTEL CALENDER IN WELCOME SCREEN|11-06-2012|DEV-SN*/
    $("#whd1").datepicker({
        inline: true, 
        altField: '#whd1', 
        minDate: 0, 
        yearRange: '2012:2014', 
        dateFormat: 'mm-dd-yy', 
        defaultDate: '+1m ',
        onSelect: function(dateText, inst) {		
            getNextDate(dateText, '#whdr1', false,'setforHostels');
        //$('.fdate').datepicker({ "setDate": dt.replace(/-/g, '/')});
        }
    });
        
    
    $("#whdr1").datepicker({
        inline: true, 
        altField: '#whdr1', 
        yearRange: '2012:2014', 
        dateFormat: 'mm-dd-yy', 
        defaultDate: '+1m +1d', 
        minDate: '+1d',
        onSelect: function(dateText, inst) { 
            $('#whdr1').datepicker({
                "setDate": document.getElementById("whdr1").value
            });	
            var flag = ValidateReservationDates("#whd1","#whdr1");
            if(!flag){
                setPreDefDate(dateText, '#whd1');   
            }
        }
    });	

    $("#whd1").datepicker('setDate', '+1m');
    $("#whd1").datepicker('option', 'maxDate', '+1y');
    //var mindateforEnddate= $("#whd1").datepicker('getDate');
    //if (mindateforEnddate !== null) {
    //    mindateforEnddate.setDate(mindateforEnddate.getDate() + 1);
    //}
                    
    //$("#whdr1").datepicker('option', 'minDate', mindateforEnddate);
    $("#whdr1").datepicker('setDate', '+1m +1d');
    var maxdateforEnddate= $("#whd1").datepicker('getDate');
    if (maxdateforEnddate !== null) {
        maxdateforEnddate.setDate(maxdateforEnddate.getDate() + 30);
    }
                    
    $("#whdr1").datepicker('option', 'maxDate', maxdateforEnddate);
    // last modified dev AN on 16May2013
        
        
    /*END-HOSTEL CALENDER IN WELCOME SCREEN|11-06-2012|DEV-SN*/
    /*  ************************ End welcome Hostel datepicker Block ******************************************************  */
    /*$('.dropdown a').click(function(){
		$('.dropdown').hide();
	});*/
	
    /*$('.custom_select').mouseleave(function(){
			if($('.dropdown', this).css('display') == 'block') 
			$('.dropdown', this).hide();
	});*/
    /*	
	$('.starFilters span.hb_star').click(function(){
		$(this).toggleClass('active');
	});
	
	$('.starFilters .options a').click(function(){
		$(this).toggleClass('active', this.className="");
		$(this).toggleClass('desc', this.className="active");
		$(this).toggleClass('', this.className="active desc");
	});
*/	
    //Code Snippet for Hash Bang URL implementation added by Milan Sharma on 23rd May, 2012. It uses JQuery BBQ plug-in for this purpose.
    isPageLoaded = true;
	
    $(window).bind('hashchange', function(e){	
        //alert('hello');
        //Disabling HashChange Event when BBQ pushState function is called.
        if (isPushStateEnabled == true && isBackForwardBtnClicked == false){
            isPushStateEnabled = false;
            return;
        }		
        hashLocationURL = $.trim(location.hash);
        if (parseInt(hashLocationURL.indexOf("?")) > -1){                 // Added on 17 Dec, DEV-R
            hashLocationURL = $.trim(hashLocationURL.split("?",1));
        }
        if (isPageLoaded == true && (location.protocol == "http:" || location.protocol == "https:")&& hashLocationURL == ""){          
            return;
        }else if (isPageLoaded == false){
            if (hashLocationURL == "") {
                if (hashNullCounter == 1){
                    hashPushState("Explore", "Georama - Explore");
                    hashNullCounter++;
                    return;
                }else{
                    return;	
                }
            }			
            isBackForwardBtnClicked = true;
        }
                
        if(hashLocationURL == '' || hashLocationURL == "#Welcome"){                   
        }else{
            hideFbFacePile();                    
        }
        switch(hashLocationURL){
            case '':
                $("#georama_welcome_overlay").show();
                showhideWelcomePanel('show');
                resetDisplay("all");												
                break;
            case '#Explore':
                $("#exploreAnchorID").trigger('click');
                //showTips();
                break;							
            case '#My-Trips':
                $("#myTripsId").trigger('click');
                break;							
            case '#Friends-Trips':
                $('#welcome_close').hide();
                $("#georama_welcome_overlay").hide();
                $('#window-8-Application').hide();
                map.showAllPushpins();
                $("#friendsTripsId").trigger('click');
                break;		
            case "#My-Trips/Create-New-Trip":
                if(isPageLoaded == false){
                    if ($("#mytripslitab").hasClass("active") == false){
                        $("#myTripsId").trigger('click');
                    }
                    $("#create_new_trip_btn").trigger('click');
                }
                else{
                    welcome();
                }
                break;
            case '#Fare-Search/Flight':
                if ($("#geofarelitab a").hasClass("active") == false){
                    $("#fareSearchAnchorID").trigger('click');
                }
                $("#cflight").trigger('click');
                break;
            case '#Fare-Search/Hotel':
                hashcheck =true;
                if ($("#geofarelitab a").hasClass("active") == false){
                    $("#fareSearchAnchorID").trigger('click');
                }
                openHotelBooking();
                initBookPanel('Hotel');
                displaySelectedBookPanel('Hotel');
                hashcheck =false;
                break;
            case '#Fare-Search/Hostel':
                hashcheck =true;
                if ($("#geofarelitab a").hasClass("active") == false){
                    $("#fareSearchAnchorID").trigger('click');
                }
                openHostelBooking();
                initBookPanel('Hostel');
                displaySelectedBookPanel('Hostel');
                hashcheck =false;
                break;
            case '#Fare-Search/Car':
                hashcheck =true;
                if ($("#geofarelitab a").hasClass("active") == false){
                    $("#fareSearchAnchorID").trigger('click');
                }
                displaySelectedBookPanel('Car');
                car_landing_page();
                hashcheck =false;
                break;
            case '#Fare-Search/Activities':
                hashcheck =true;
                if ($("#geofarelitab a").hasClass("active") == false){
                    $("#fareSearchAnchorID").trigger('click');
                }
                openViatorBooking();
                initBookPanel('Activity');
                displaySelectedBookPanel('Activity');
                hashcheck =false;
                break;
            case '#Feedback':
                $("#feedback").trigger('click');
                break;
            case '#About':
                $("#aboutAnchorID").trigger('click');
                break;
            case '#Privacy':
                $("#privacyAnchorID").trigger('click');
                break;
            case '#Terms':
                $("#termsAnchorID").trigger('click');
                break;
            case '#Blog':
                $("#blogAnchorID").trigger('click');
                break;																								
            case '#Press':
                $("#pressAnchorID").trigger('click');
                break;	
            case '#Welcome':
                hideTips();
                if($('#showWelcomescreen').is(':visible') == true){
                    $('#showWelcomescreen').trigger('click');
                }else{
                    $("#georama_welcome_overlay").show();
                    showhideWelcomePanel('show');
                }
                break;	
            case "#Welcome/No":
                hideTips();
                $("#georama_welcome_overlay").show();
                showhideWelcomePanel('show');
                welcomeHashState = true;
                $('.welcomeRestore').show();
                $('.new_welcome_wrapper').css('opacity', 0);
                welcomeAction('no', 'welcome1');
                break;	
            case "#Welcome/Maybe":
                hideTips();
                $("#PlanBookComponent").hide();
                $("#georama_welcome_overlay").show();
                showhideWelcomePanel('show');
                welcomeHashState = true;
                $('.welcomeRestore').show();
                $('.new_welcome_wrapper').css('opacity', 0);
                welcomeAction('maybe', 'welcome1');
                break;		
            case "#Welcome/Yes/Book/Hotel":
                hideTips();
                yesTab = 'Hotel';
                if($('#TravelTabs').is(":visible") == true){
                    $('#welcomebook li a').removeClass('selected');
                    $('.pnlwelcomebook').hide();
                    $('#whotel').addClass('selected');
                    welcomeYesClick();
                    $('#whotelpnl').show();
                }else{
                    $("#georama_welcome_overlay").show();
                    showhideWelcomePanel('show');
                    welcomeHashState = true;
                    $('.new_welcome_wrapper').css('opacity', 0);
                    $('.welcomeRestore').show();
	
                    $('#welcomebook li a').removeClass('selected');
                    $('.pnlwelcomebook').hide();
                    $('#whotel').addClass('selected');
                    $('#whotelpnl').show();
                    welcomeAction('yes', 'welcome1');
                }
                break;	
            case "#Welcome/Yes/Book/Flight":
                hideTips();
                yesTab = 'Flight';
                if($('#TravelTabs').is(":visible") == true){
                    $('#welcomebook li a').removeClass('selected');
                    $('.pnlwelcomebook').hide();
                    $('#wflight').addClass('selected');
                    welcomeYesClick();
                    $('#wflightpnl').show();
                }else{
                    $("#georama_welcome_overlay").show();
                    showhideWelcomePanel('show');
                    welcomeHashState = true;
                    $('.new_welcome_wrapper').css('opacity', 0);
                    $('.welcomeRestore').show();
                    welcomeAction('yes', 'welcome1');
                    $('#welcomebook li a').removeClass('selected');
                    $('.pnlwelcomebook').hide();
                    $('#wflight').addClass('selected');
                    $('#wflightpnl').show();
                }
                break;
            case "#Welcome/Yes/Book/Hostel":
                hideTips();
                yesTab = 'Hostel';
                if($('#TravelTabs').is(":visible") == true){
                    $('#welcomebook li a').removeClass('selected');
                    $('.pnlwelcomebook').hide();
                    $('#whostel').addClass('selected');
                    welcomeYesClick();
                    $('#whostelpnl').show();
                }else{
                    $("#georama_welcome_overlay").show();
                    showhideWelcomePanel('show');
                    welcomeHashState = true;
                    $('.new_welcome_wrapper').css('opacity', 0);
                    $('.welcomeRestore').show();
							
                    $('#welcomebook li a').removeClass('selected');
                    $('.pnlwelcomebook').hide();
                    $('#whostel').addClass('selected');
                    $('#whostelpnl').show();
                    welcomeAction('yes', 'welcome1');
                }
                break;
            case "#Welcome/Yes/Book/Car":
                hideTips();
                yesTab = 'Car';
                if($('#TravelTabs').is(":visible") == true){
                    $('#welcomebook li a').removeClass('selected');
                    $('.pnlwelcomebook').hide();
                    $('#wcar').addClass('selected');
                    welcomeYesClick();
                    $('#wcarpnl').show();
                }else{
                    $("#georama_welcome_overlay").show();
                    showhideWelcomePanel('show');
                    welcomeHashState = true;
                    $('.new_welcome_wrapper').css('opacity', 0);
                    $('.welcomeRestore').show();
							
                    $('#welcomebook li a').removeClass('selected');
                    $('.pnlwelcomebook').hide();
                    $('#wcar').addClass('selected');
                    $('#wcarpnl').show();
                    welcomeAction('yes', 'welcome1');
                }
                break;	
            case "#Welcome/Yes/Book/Activity":
                hideTips();
                yesTab = 'Activity';
                if($('#TravelTabs').is(":visible") == true){
                    $('#welcomebook li a').removeClass('selected');
                    $('.pnlwelcomebook').hide();
                    $('#wactivity').addClass('selected');
                    welcomeYesClick();
                    $('#wactivitypnl').show();
                }else{
                    $("#georama_welcome_overlay").show();
                    showhideWelcomePanel('show');
                    welcomeHashState = true;
                    $('.new_welcome_wrapper').css('opacity', 0);
                    $('.welcomeRestore').show();
							
                    $('#welcomebook li a').removeClass('selected');
                    $('.pnlwelcomebook').hide();
                    $('#wactivity').addClass('selected');
                    $('#wactivitypnl').show();
                    welcomeAction('yes', 'welcome1');
                }
                break;	
				
            case "#Explore/Book/Flight/Results":
            case "#Fare-Search/Flight/Results":
                if(isPageLoaded == true){
                    hashcheck =true;
                    $("#fareSearchAnchorID").trigger('click');
                    hashcheck =false;
                    break;
                }
                else
                if ($("#flBkgFrm").is(":visible") == true){
                    flightCheckAvailablity();
                }
                break;	
						
            case "#Explore/Book/Hotel/Results":
            case "#Fare-Search/Hotel/Results":
                if(isPageLoaded == true){
                    hashcheck =true;
                    $("#fareSearchAnchorID").trigger('click');
                    openHotelBooking();
                    initBookPanel('Hotel');
                    displaySelectedBookPanel('Hotel');
                    hashcheck =false;
                    break;
                }
                else
                if ($("#bHotelBackToGrid").is(":visible") == true){
                    togglePnls('book_hotel_detail', 'book_hotel_list'); 
                    $('#bSearchFilters').show(); 		
                    $('#bHotelBackToGrid').hide();
                    $('#hotelUpdateSearch').show();
                    if ($("#geofarelitab").hasClass("active") == true)
                        hashPushState("Fare-Search/Hotel/Results", "Georama - Fare Search | Hotel");
                    else	
                        hashPushState("Explore/Book/Hotel/Results", "Georama - Explore | Book - Hotel");
                }else{
                    step1();
                    if ($("#geofarelitab").hasClass("active") == true)
                        hashPushState("Fare-Search/Hotel/Results", "Georama - Fare Search | Hotel");
                    else	
                        hashPushState("Explore/Book/Hotel/Results", "Georama - Explore | Book - Hotel");
                    $('#bHotelUpdateSearch').show();
                }
                break;	
						
            case "#Explore/Book/Car/Results":
            case "#Fare-Search/Car/Results":
                if(isPageLoaded == true){
                    hashcheck =true;
                    $("#fareSearchAnchorID").trigger('click');
                    displaySelectedBookPanel('Car');
                    car_landing_page();
                    hashcheck =false;
                    break;
                }
                else
                if ($("#listCar").is(":visible") == true){
                    $('#bCarBackToGrid').hide;
                    $("#bCarUpdateSearch").show();
                    $("#book_car_list").show();
                    $("#book_car_detail").hide();
                    $("#listCar").hide();
                    if ($("#geofarelitab").hasClass("active") == true)
                        hashPushState("Fare-Search/Car/Results", "Georama - Fare Search | Car");
                    else	
                        hashPushState("Explore/Book/Car/Results", "Georama - Explore | Book - Car");
                }else{
                    car_step1();
                }
                break;	

            case "#Explore/Book/Activities/Results" :
            case "#Fare-Search/Activities/Results":
                if(isPageLoaded == true){ 
                    hashcheck =true;
                    $("#fareSearchAnchorID").trigger('click');
                    openViatorBooking();
                    initBookPanel('Activity');
                    displaySelectedBookPanel('Activity');
                    hashcheck =false;
                    break;
                }else{ 
                    if ($('#bActivityList').is(":visible") == true){
                        $('.bActivitiesBtnBackToGrid').hide();
                        $(".bActivitiesBtnBTR").show();
                        $("#ActivitysortBy").show();
                        $('#activitySearchResults').show();	
                        $("#searchBarViator").hide();
                        $('#activitySearchResults').show();
                        $('#activityDetailCont').hide();

                    }else if($('#bActivitySearchForm').is(":visible") == true){
                        $("#search_activity").trigger('click');
                    }else{
                        hashcheck =true;
                        $("#fareSearchAnchorID").trigger('click');
                        openViatorBooking();
                        initBookPanel('Activity');
                        displaySelectedBookPanel('Activity');
                        hashcheck =false;
                    }
                }
                break;	
						
						
            default:
                if (parseInt(hashLocationURL.indexOf("Explore/")) > -1 && parseInt(hashLocationURL.indexOf("/Plan")) > -1){
                    hashLocationString = hashLocationURL.slice(parseInt(hashLocationURL.indexOf("Explore/")) + 8, hashLocationURL.indexOf("/Plan"));
                    hashLocationString = hashLocationString.replace(/-/g, " ") 
                }else if (parseInt(hashLocationURL.indexOf("Explore/")) > -1 && parseInt(hashLocationURL.indexOf("/Book")) > -1){
                    hashLocationString = hashLocationURL.slice(parseInt(hashLocationURL.indexOf("Explore/")) + 8, hashLocationURL.indexOf("/Book"));			
                    hashLocationString = hashLocationString.replace(/-/g, " ")
                }else if (parseInt(hashLocationURL.indexOf("Explore/")) > -1 && parseInt(hashLocationURL.indexOf("/Share")) > -1){
                    hashLocationString = hashLocationURL.slice(parseInt(hashLocationURL.indexOf("Explore/")) + 8, hashLocationURL.indexOf("/Share"));
                    hashLocationString = hashLocationString.replace(/-/g, " ")
                }else if(parseInt(hashLocationURL.indexOf("My-Trips/")) > -1){
                    hashLocationString = hashLocationURL.slice(parseInt(hashLocationURL.indexOf("My-Trips/")) + 9);
                    hashUserfriendId = hashLocationString.split("/")[0]; 
                    hashTripId = hashLocationString.split("/")[1];
                    hashTripName = hashLocationString.split("/")[2];
                    userId = document.getElementById("userId").value;
                    if(userId == '0'){
                        welcome();	
                        break;	
                    }
						
                    if(hashUserfriendId == userId){
                        showhideWelcomePanel('hide');
                        global_trip_id=hashTripId;
                        tripId=hashTripId;
                        $('#fareSearch_wrapper').hide();
                        $("#openPage").hide();
                        $(".pageOverlay").hide();
                        showVectorMap();
                        openMyTabInfo();	
                        myTripFlag = true;
                        zoomTo100();                        
                        //$('#tripPlaceName').html(hashTripName);
                        $('#tripPlaceName').attr('title', hashTripName);
                        break;
                    }else if (hashUserfriendId != userId){
                        checkUserFriend(hashUserfriendId);
                        if(isuserfriend == 'yes'){
                            friend_global_trip_id = hashTripId;
                            friendsTripsClick();
                            friendtripinfo = userId + '/' + hashUserfriendId + '/' + hashTripId + '/' + hashTripName;
                            createHashURLTitle("Friends Trips" , friendtripinfo);	
                            hashPushState(hashLocationString, hashPageTitle);	
                        }else{
                            friend_global_trip_id='';
                            friendsTripsClick();
                            hashPushState("Friends-Trips", "Georama - Friends Trips");	
                        }
                        break;	
                    }
                }else if(parseInt(hashLocationURL.indexOf("Friends-Trips/")) > -1){
									
                    hashLocationString = hashLocationURL.slice(parseInt(hashLocationURL.indexOf("Friends-Trips/")) + 14);
                    hashUserId = hashLocationString.split("/")[0];
                    hashFriendUserId = hashLocationString.split("/")[1];
                    hashTripId = hashLocationString.split("/")[2];
                    hashTripName = hashLocationString.split("/")[3];
									
                    userId = document.getElementById("userId").value;
                    if(userId == hashUserId){
                        $("#georama_welcome_overlay").hide();
                        $('#welcome_close').hide();
                        $('.fixed_footer_wrapper').hide(); 
                        $('#window-8-Application').hide(); 
                        global_trip_id=hashTripId;
                        tripId=hashTripId;
                        $('#fareSearch_wrapper').hide();		
                        $(".pageOverlay").hide();
                        $("#openPage").hide();
                        showVectorMap();
                        openFriendTrips();
                        friendTripFlag = true;
                        zoomTo100();
                        myTripFlag = false;
                    }else{
                        welcome();
                    }
                    break;
                }else if(parseInt(hashLocationURL.indexOf("Fare-Search/Hotel/"))||parseInt(hashLocationURL.indexOf("Fare-Search/Activity/"))||parseInt(hashLocationURL.indexOf("Fare-Search/Car/"))||parseInt(hashLocationURL.indexOf("Fare-Search/Hostel/"))> -1){
                    hashvenuedetails = hashLocationURL;   
                    hashCityTabType = hashvenuedetails.split("/")[1];	
                    hashId = hashvenuedetails.split("/")[2];
                    hashVenueId = hashvenuedetails.split("/")[3];
                    hashVenueName = hashvenuedetails.split("/")[4]; 
                    hashShowCityTabs(hashCityTabType);   
                    break;
                }

                if (parseInt(hashLocationURL.lastIndexOf("/")) > parseInt(hashLocationURL.indexOf("/"))){
                    for (var key in regionArray){
                        if (regionArray[key].replace(/ /g, "-") == hashLocationURL.substring(hashLocationURL.indexOf("/") + 1, hashLocationURL.lastIndexOf("/"))){
                            if (isPageLoaded == true) hashPushState("Welcome","Georama - Plan. Book. Share.");
                            return;
                        }
                    }
                }
                if (parseInt(hashLocationURL.indexOf("/")) > 0){
                    for (var key in regionArray){
                        if (regionArray[key].replace(/ /g, "-") == hashLocationURL.substring(hashLocationURL.indexOf("/") + 1)){					
                            if (isPageLoaded == true) hashPushState("Welcome","Georama - Plan. Book. Share.");	
                            return;
                        }
                    }
                }						
						
                hashCountryName = hashLocationString.split("/")[0];
                hashCityName = hashLocationString.split("/")[1];
						
                if (document.getElementById("hdnCountry").value == hashCountryName && document.getElementById("hdnCity").value == hashCityName) 			{
                    hashCityKey = $.trim($("#hdnCityId").val());
                    isDifferentCity = false;
                }else{
                    hashCityDetails = getCityAttributes(hashCountryName, hashCityName, hashCityKey, "OB");
                    hashCityKey = hashCityDetails.id;
                    document.getElementById("hdnCity").value = hashCityName;
                    document.getElementById("hdnCityId").value = hashCityKey;
                    document.getElementById("hdnCountry").value = hashCountryName;
                    isDifferentCity = true;							
                }
                if(parseInt(hashLocationURL.indexOf("Explore/Book/")) > -1){
                    hashvenuedetails = hashLocationURL; 
                    hashCityTabType = hashvenuedetails.split("/")[2];
                    hashId = hashvenuedetails.split("/")[3];
                    hashVenueId = hashvenuedetails.split("/")[4];
                    hashVenueName = hashvenuedetails.split("/")[5]; 
                    hashShowCityTabs(hashCityTabType);   
                    break;
                }
                else{  
                    hashvenuedetails = hashLocationURL; 
                    hashCityTabType = hashvenuedetails.split("/")[4];
                    hashId = hashvenuedetails.split("/")[5];
                    hashVenueId = hashvenuedetails.split("/")[6];
                    hashVenueName = hashvenuedetails.split("/")[7]; 
                }
                if(typeof hashVenueId == 'undefined')		
                    hashCityTabType = $.trim(hashLocationURL.substr(parseInt(hashLocationURL.lastIndexOf("/")) + 1)); 
                hashShowCityTabs(hashCityTabType);
                break;
        }
        setTimeout(function(){
            map.updateTripNavigationBar("A", "");			
        }, 2000);				
    });
	
    $(window).trigger("hashchange");
	
    $('.custom_select').live('click', function(){
        if($('#airlines .custom_select #lstairlines').is(':visible') == true){
            $('.dropdown',this).hide();
            return;
        }else{
            var dropdownId= $(this).attr('id');
            if(dropdownId == "filter_plan_hotel_amenities" || dropdownId == "hotelBookAmenitiesSelect"){
            ;//do nothing
            }
            else{ 
                $('.dropdown').hide();
            }
            $('.custom_select .dropdown',this).show();
        }
        $('.dropdown',this).slideDown(function(){
            $('a',this).click(function(){
                $('a', $(this).parent().parent()).removeClass('active');
                $(this).addClass('active');
            });
			
            $($(this).parent()).mouseleave(function(){
                $('.dropdown',this).hide();
                $($(this)).unbind('mouseleave');
            })
        });
    });	
	
    /*$('.custom_select').live('mouseleave', function(){
		$('.dropdown',this).hide();
	});	*/
	
    /* if((hotelKeyForPagination!='') && (hotelLocationForPagination!='')){		
		$(window).scroll(function() {
		   if($(window).scrollTop() + $(window).height() == getDocHeight()) {
			   //alert("bottom!");
			   step1();			   
		   }
		});	
	} */
	
    $('#HotelCity').live("keypress", function(e) {
        if (e.keyCode == 13) {       
            return false; // prevent the button click from happening
        }
    });
        
    /* wActivityLoc autocomplete shifted from toggleWelcomeBookButton() on 19Apr2013 by dev AN |
        **  Purpose- there was issue hash URL was refreshed.*/
    $('#wActivityLoc').autocomplete1({ 
        serviceUrl:'/feed/viatorcitysuggest/',
        minChars:2, 
        maxHeight:400,
        width:200,
        zIndex: 9999,
        noCache: false, //default is false, set to true to disable caching
        onSelect: function(value, data){
            $('#wViator_category').html('<img src="/images/loader_10x10.gif" alt="Loading Categories..." style="margin:10px 5px; height:15px;" />');
            viatorActivityDestId = data.destinationId;
            searchActivityForm(data.destinationId, 'welcome');
            if(data.is_book_panel == 1){
                is_welcome_book_panel = data.is_book_panel;
                welcome_book_panel_city_id = data.geo_city_id;
                welcome_pushpin_data = data;
            }else{
                is_welcome_book_panel = 0;
                welcome_book_panel_city_id = 0;
                welcome_pushpin_data = '';
            }						
        }	
    });	

    var a = $('#welcomeHotelCity').autocomplete1({ 
        serviceUrl:'/feed/hotelcitysuggest/',
        minChars:2, 
        maxHeight:400,
        width:200,
        zIndex: 9999,
        noCache: false, //default is false, set to true to disable caching
        onSelect: function(value, data){
            $("#welcomeHotelBookCityId").val(data.geo_city_id);
            $('#welcomeHotelCity').addClass('selected');
            $('#welcomeHotelCity').change(function(){
                $(this).removeClass('selected');
            });
            if(data.is_book_panel == 1){
                is_welcome_book_panel = data.is_book_panel;
                welcome_book_panel_city_id = data.geo_city_id;
                welcome_pushpin_data = data;
            }else{
                is_welcome_book_panel = 0;
                welcome_book_panel_city_id = 0;
                welcome_pushpin_data = '';
            }
        }	
    });
        
        
        
	
    room1Content = $('#welcomeOneRoom_table_room_1').html();
    room2Content = $('#welcomeRoom2').html();
	
    addHotelRooms(1, 'welcome');		
    //$('#showListRoomsAC').show();
	
    $('.lnkHome').click(function(){
		if(indPageloadingProcess == true){
			return;
		}
        if($('#georama_welcome_overlay').css('display') != 'block'){
            $("#mapOverlay").remove();
            $('#iconNav .ui-tabs-panel ul li a').removeClass('current');
            $('#cinfo').addClass('current');
            hideTips();
            hideAllPanels();
            //$('#georama_welcome_overlay').show(); 
            //			$('#welcome_close').show(); 
            //			$('#OutrContainer').show(); 
            //			$("#skipWrap").show();
            //			$('.fixed_footer_wrapper').show();
            showhideWelcomePanel();
            welcomeAction('', 'welcome2');  
            $('#main-top-nav li a').removeClass('active');
            $('#homeLink').addClass('active');
            /*$('.lnkHome').css({
                "pointer-events":"none",
                "cursor": "default"
            });*/
            if(independentPages){
                independentPageCall();
            }
            independentPages = false;
			
            $('.balloon').hide();
            $('.rightPanel').hide();
            $('#tripMenu').hide();//added by dev AN
            $('#tripMenuCountry').hide();
            $('#back-to-map').hide();//added by dev AN
            visibleMap = 'bing';
            showVectorMap();
            $("#StaticPageContent").html('');
            isTrajAnimating = true;
            setTimeout(function(){
                if(typeof map != 'undefined'){
                    map.hideTrajectory();			
                }
            }, 1250);
        }else{
            if ($("#yes_wrap").is(":visible") == true || $("#may_be_wrap").is(":visible") == true || $("#welcome_booking_trip_panel").is(":visible") == true)
                welcomeAction('', 'welcome2'); 
        }
    });
	
    $('#main-top-nav li a').click(function (){
		if(indPageloadingProcess == true){
			return;
		}
        if((this).id == 'Geoplaces_tab'){
            return;
        }
        $('#main-top-nav li a').removeClass('active'); 
        $(this).addClass('active');
        $('.balloon').hide();
		
        if(independentPages){
            showhideTopBar('show');
            if($('.rightPanel').is(":visible") == false){
                $('.rightPanel').show();
            }
            independentPageCall();
        }
        independentPages = false;
    });
    

    $('#feedback').click(function(){
        $('.balloon').hide();
    });
	
	
    $('.sel-loc-button').mouseover(function(){
        $('.drop-widget', $(this).parent()).show();    
    });
	
    $('#main-top-nav li a').hover(function(){
        $('abbr', $(this).parent()).show();
    }, function(){
        $('abbr', $(this).parent()).hide();
    });
	
    var hotelPriceSortVar = true;
    var hotelStarSortVar = true;
    
    //}
    
    var a = $('#header_city').autocomplete1({ 
        serviceUrl:'/feed/citysuggest/',
        minChars:2,	 	
        maxHeight:400,
        width:200,
        zIndex: 9999,
        deferRequestBy: 0, //miliseconds
        divClass: 'headerAutoComplete',
        noCache: false, //default is false, set to true to disable caching
        onSelect: function(value, data){ 
            if( visibleMap == 'bing' ){  
                closeExplorePanel();
            }
			
            var arrdata = data.split('|'); 
            try{
                if(independentPages){
                    independentPageCall();	
                }

                isCityTagged = true;
                showVectorMap();
                var pushpinimage = $("svg").find("#p_"+arrdata[3]);
                if (pushpinimage != ''){
                    if(pushpinimage.attr("visibility") != "inherit"){
                        pushpinimage.attr("xlink:href","/images/bing-plan-pushpin.png");
                    }
                    pushpinimage = pushpinimage.attr("xlink:href");
                    if (typeof pushpinimage != 'undefined'){
                        $('#rootvectormap').vectorMap('set', 'triggerPinClick', arrdata[3]);
                        $('#header_city').val("Add a City");
                        isCityTagged = false;
                        return;
                    }
                }
                $('#rootvectormap').vectorMap('set', 'label', {
                    "n":arrdata[0], 
                    "c": arrdata[4].toLowerCase(), 
                    "d":arrdata[5],
                    "lat":arrdata[1],
                    "lon":arrdata[2], 
                    "pin":1, 
                    "pcolor":"white", 
                    "key":arrdata[3], 
                    "l":5, 
                    "latVar":0, 
                    "lonVar":0
                });	
                $('#rootvectormap').vectorMap('set', 'triggerPinClick', arrdata[3]);
                map.updateTripNavigationBar("A", "");
                updateTripInfo(arrdata[3], 'potential');
                //map.drawTrajectory();
                setTimeout(function(){
                    map.drawTrajectory();					
                }, 2000);
                $('#header_city').val("Add a City");
                isCityTagged = false;
            }catch(err) {}
        }
    });	
    
    var a = $('#txtHeadOrigin').autocomplete1({ 
        serviceUrl:'/feed/citysuggest/',
        minChars:2, 
        maxHeight:400,
        width:200,
        zIndex: 9999,
        divClass: 'headerAutoComplete',
        noCache: false, //default is false, set to true to disable caching
        onSelect: function(value, data){ 
            var arrdata =data.split('|'); 
            try{
                if(independentPages){
                    independentPageCall();	
                }
                isCityTagged = true;
                showVectorMap();
				
                if(map.multiDestArr.length >= 1){
                    if(arrdata[3] == map.multiDestArr[0]){
                        map.changeStatus(map.multiDestArr.length);
                        map.multiDestArr.splice(0,1);
                    }
                }
                map.afterDeleteProcess();
                $('#rootvectormap').vectorMap('set', 'label', {
                    "n":arrdata[0], 
                    "c": arrdata[4].toLowerCase(), 
                    "d":arrdata[5],
                    "lat":arrdata[1],
                    "lon":arrdata[2], 
                    "pin":1, 
                    "pcolor":"green", 
                    "key":arrdata[3], 
                    "l":5, 
                    "latVar":0, 
                    "lonVar":0
                });	
                $('#rootvectormap').vectorMap('set', 'triggerPinClick', arrdata[3]);
                map.resetPushPinColorExcept(arrdata[3], "O");
                map.updateTripNavigationBar("A", "");
                updateTripInfo(arrdata[3], 'origin');
				
                //map.drawTrajectory();
				
                setTimeout(function(){
                    map.drawTrajectory();					
                }, 2000);
                $('#txtHeadOrigin').val("Select Origin");
                isCityTagged = false;
            }
            catch(err) {}
        }
    });

    var a = $('#txtHeadDestination').autocomplete1({ 
        serviceUrl:'/feed/citysuggest/',
        minChars:2, 
        maxHeight:400,
        width:200,
        zIndex: 9999,
        divClass: 'headerAutoComplete',
        noCache: false, //default is false, set to true to disable caching
        onSelect: function(value, data){ 
            var arrdata =data.split('|'); 
            try{
                if(independentPages){
                    independentPageCall();	
                }
                destPushPinCounter=0;
                map.multiDestArr=[];
                destPushPinCounter++;
                map.changeTabForNewDestination(arrdata[3]);
				
                isCityTagged = true;
                showVectorMap();
                $('#rootvectormap').vectorMap('set', 'label', {
                    "n":arrdata[0], 
                    "c": arrdata[4].toLowerCase(), 
                    "d":arrdata[5],
                    "lat":arrdata[1],
                    "lon":arrdata[2], 
                    "pin":1, 
                    "pcolor":"blue", 
                    "key":arrdata[3], 
                    "l":5, 
                    "latVar":0, 
                    "lonVar":0
                });	
                $('#rootvectormap').vectorMap('set', 'triggerPinClick', arrdata[3]);
                map.resetPushPinColorExcept(arrdata[3], "D");
                map.updateTripNavigationBar("A", "");
                updateTripInfo(arrdata[3], 'destination');
                //map.drawTrajectory();
                setTimeout(function(){
                    map.drawTrajectory();					
                }, 2000);
                $('#txtHeadDestination').val("Select Destination");
                isCityTagged = false;
            }
            catch(err) {}
        }
    });	
    
	
    $("#bookIconNav").organicTabs({
        "speed": 200   
    });
        
    $('html').click(function() {
        var hash = window.location.hash;
        if(hash == '' || hash=='#Welcome'){             
        }else{
            hideFbFacePile();
        }            
    });    

    $('#car_sortby_price, #car_sortby_rental_agent, #car_sortby_car_type').live('click', function(){
        var id = $(this).attr('id');        
        var val;
        $("#car_sortby_price").removeClass('active');
        $("#car_sortby_rental_agent").removeClass('active');
        $("#car_sortby_car_type").removeClass('active');
        var order = '';
        if(id == "car_sortby_price"){
            order = $(this).hasClass('asc') ? 'asc' : 'desc';
        }else{
            order = $(this).hasClass('desc') ? 'desc' : 'asc';
        }
        if(order == 'asc'){
            $(this).removeClass('asc').addClass('desc');
        } else {
            $(this).removeClass('desc').addClass('asc');
        }    
        $(this).addClass('active');

        //show pre loader
        //$("#carSearchResultData").html(panelloaderDiv);
        if(id){
            switch(id){
                case "car_sortby_price":
                    val = 'price';
                    break;

                case "car_sortby_rental_agent":
                    val = 'rental_agent';
                    break;

                case "car_sortby_car_type":
                    val = 'car_type';
                    break;                 
            }//end of switch block
        }//end of if block- shifted to bookpanel.js as this was meant to be for GA tracking by dev AN
        car_search_result_filter(val,order);             
    })  
    
});/* close of document.ready function */

function commonContentLoader(panel, mode){
    if(mode == 'plan'){
		
    }else if(mode == 'book'){
	
    }else if(mode=='share')
    {
		
    }
	
} /*  */

function fixGridSizes(){
    /* 	
		Dynamic Columns - Top Recommendations
		Script to resize columns in top recommendations according to width of the screen.
		This is required to make column occupy almost all of the space available in the panel. 
	 */
    colStat = true;
    chkCol = Math.round($(document).width()/290);	
			
    $('#footer').append('<input type="hidden" name="checkColumns" id="checkColumns" value="' + chkCol + '" />');
	
    var pageMargin = 50 + (Math.round(chkCol) * 15) + 42;
    var recWidth = ($(document).width() - pageMargin) / chkCol;
	
    //alert(Math.round(chkCol) + " - "  + recWidth +  " - " + $(document).width());
	
    if(recWidth < 295)	
    {	
        chkCol = Math.round(chkCol) - 1;		
        recWidth = ($(document).width() - pageMargin) / chkCol;
    }
    //alert("Attraction column -===>" + chkCol);
    $("head").append("<style>.top25 section {width:" + recWidth + "px !important;}</style>");
    setCookie('chkGeoGridColumns', chkCol, 30)	
	
	
    HotelChkHCol =  Math.round($(document).width()/365);
    var recWidth = ($(document).width() - pageMargin) / HotelChkHCol;
	
    //alert("Hotel column -===>" + chkHCol);
	
    if(recWidth < 365)	
    {	
        HotelChkHCol=  Math.round(HotelChkHCol)-1;		
        recWidth = ($(document).width() - pageMargin) / HotelChkHCol;
    }

    $("style").append("#hotel .top25 section {width:" + recWidth + "px !important;}");
    $("style").append("#book-hotel .top25 section {width:" + recWidth + "px !important;}");
    /***************************************** Checking column width for Activities ******************************************/
    ActivitychkHCol =  Math.round($(document).width()/365);
    var recWidth = ($(document).width() - pageMargin) / ActivitychkHCol;
	
    //alert("Hotel column -===>" + chkHCol);
	
    if(recWidth < 365)	
    {	
        ActivitychkHCol=  Math.round(ActivitychkHCol)-1;		
        recWidth = ($(document).width() - pageMargin) / ActivitychkHCol;
    }

    //$("style").append("#activities .top25 section {width:" + recWidth + "px !important;}");
    $("style").append("#book-activities .top25 section {width:" + recWidth + "px !important;}");

    /***************************************** Checking column width for hostels ******************************************/
    HostelchkHCol =  Math.round($(document).width()/385);
    var recWidth = ($(document).width() - pageMargin) / HostelchkHCol;
	
    //alert("Hotel column -===>" + chkHCol);
	
    if(recWidth < 385)	
    {	
        HostelchkHCol =  Math.round(HostelchkHCol)-1;		
        recWidth = ($(document).width() - pageMargin) / HostelchkHCol;
    }

    $("style").append("#phostel .top25 section {width:" + recWidth + "px !important;}");
    $("style").append("#book-hostel .top25 section {width:" + recWidth + "px !important;}");
    setCookie('bookHostelGridColumnCount', HostelchkHCol, 30)	
	
    /****************************************** Check columns for recommendations ******************************************/
    chkRCol =  Math.round($(document).width()/320);
    var recWidth = ($(document).width() - (pageMargin + 200)) / chkRCol;
	
    //alert("Hotel column -===>" + chkHCol);
	
    if(recWidth < 320)	
    {	
        chkRCol =  Math.round(chkRCol)-1;		
        recWidth = ($(document).width() - (pageMargin + 200)) / chkRCol;
    }

    $("style").append("#fr_wrapper .top25 section {width:" + recWidth + "px !important;}");
    $("style").append("#friend_fr_wrapper .top25 section {width:" + recWidth + "px !important;}");	
    setCookie('freindsRecommendationCols', chkRCol, 30)
	
    /****************************************** Check columns for car ******************************************/
    chkCarCol =  Math.round($(document).width()/250);
    var crecWidth = ($(document).width() - pageMargin) / chkCarCol;

    if(crecWidth < 250)	
    {	
        chkCarCol =  Math.round(chkCarCol)-1;		
        crecWidth = ($(document).width() - pageMargin) / chkCarCol;
    }

    $("style").append("#car .top25 section {width:" + crecWidth + "px !important;}");		
    //console.log('after condition: >> chkCarCol-1: ' + chkCarCol + ' >> crecWidth-1:' + crecWidth);
    setCookie('bookCarGridColumnCount', chkCarCol, 30)	
	
    /***************************************** Checking column width for hostels ******************************************/
    ActivitychkHCol =  Math.round($(document).width()/385);
    var ActRecWidth = ($(document).width() - pageMargin) / ActivitychkHCol;
	
    //alert("Hotel column -===>" + chkHCol);
	
    if(recWidth < 385)	
    {	
        ActivitychkHCol =  Math.round(ActivitychkHCol)-1;		
        ActRecWidth = ($(document).width() - pageMargin) / ActivitychkHCol;
    }

    $("style").append("#book-activities .top25 section {width:" + ActRecWidth + "px !important;}");
    $("style").append("#activities .top25 section {width:" + ActRecWidth + "px !important;}");
    setCookie('bookActivityGridColumnCount', ActRecWidth, 30);
/***************************************** Checking column width for hostels ******************************************/
	
/* Dynamic Columns - Top Recommendations ends here */
}

function independentPageCall(){
    $('#zoomcontrols').show();
    $("#StaticPageContent").html('');
    $("#back-to-map").fadeOut();	
    //$("#containervectormap").width($(window).width());
    $("#containervectormap").height($(window).height());
    $("#containervectormap").show();
    $("#mapDiv").show();	
}

function getDocHeight() {
    var D = document;
    return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
        );
}

// function for creating Hash URL as well as Page Title for specific sections like Plan, Book, Share etc.
function createHashURLTitle(attrPageType, attrPageSection){
    hashCountryName = $.trim($("#hdnCountry").val());
    hashCityName = $.trim($("#hdnCity").val());
    hashCityKey = $.trim($("#hdnCityId").val());
	
    if (attrPageType == "Share"){
        hashLocationString = "Explore/" + hashCountryName.replace(/ /g, "-") + "/" + $.trim(hashCityName.replace(/ /g, "-")) + "/" +attrPageType;
        hashPageTitle = "Georama - " + hashCountryName + " - " + $.trim(hashCityName) + " - " + attrPageType;	
    }
	
    else if (attrPageType == "My Trips"){
        hashLocationString = "My-Trips/" +attrPageSection;
        hashTripName = attrPageSection.split("/")[2];
        hashPageTitle = "Georama - My Trips" + " | " + hashTripName;	
    }
	
    else if (attrPageType == "Friends Trips"){
        hashLocationString = "Friends-Trips/" +attrPageSection;
        hashTripName = attrPageSection.split("/")[3];
        hashPageTitle = "Georama - Friends Trips" + " | " + hashTripName;	
    }
		
    else if (attrPageType == "Infotabs"){ 
        hashLocationString = "Explore/" + hashCountryName.replace(/ /g, "-") + "/" + $.trim(hashCityName.replace(/ /g, "-")) + "/Plan/Info" + "/" + attrPageSection.replace(/ /g, "-");
        tabname = attrPageSection.split("/")[1];
        hashPageTitle = "Georama - " + $.trim(hashCityName) +" - Plan | Info - " + tabname ;	
    }

    else if (attrPageType == "1"){
        hashLocationString = "Explore/" + hashCountryName.replace(/ /g, "-") + "/" + $.trim(hashCityName.replace(/ /g, "-")) + "/Plan/Attractions" + "/" + attrPageSection.replace(/ /g, "-");
        venuename = attrPageSection.split("/")[2];
        hashPageTitle = "Georama - Plan | Attractions - " + venuename;	
    }
		
    else if (attrPageType == "3"){
        hashLocationString = "Explore/" + hashCountryName.replace(/ /g, "-") + "/" + $.trim(hashCityName.replace(/ /g, "-")) + "/Plan/Restaurants" + "/" + attrPageSection.replace(/ /g, "-");
        venuename = attrPageSection.split("/")[2];
        hashPageTitle = "Georama - Plan | Restaurants - " + venuename ;	
    }
		
    else if (attrPageType == "4"){
        hashLocationString = "Explore/" + hashCountryName.replace(/ /g, "-") + "/" + $.trim(hashCityName.replace(/ /g, "-")) + "/Plan/Nightlife" + "/" + attrPageSection.replace(/ /g, "-");
        venuename = attrPageSection.split("/")[2];
        hashPageTitle = "Georama - Plan | Nightlife - " + venuename;	
    }

    else if (attrPageType == "6"){
        hashLocationString = "Explore/" + hashCountryName.replace(/ /g, "-") + "/" + $.trim(hashCityName.replace(/ /g, "-")) + "/Plan/Shopping" + "/" + attrPageSection.replace(/ /g, "-");
        venuename = attrPageSection.split("/")[2];
        hashPageTitle = "Georama - Plan | Shopping - " + venuename;	
    }
		
    else if (attrPageType == "8"){
        hashLocationString = "Explore/" + hashCountryName.replace(/ /g, "-") + "/" + $.trim(hashCityName.replace(/ /g, "-")) + "/Plan/Activities" + "/" + attrPageSection.replace(/ /g, "-");
        venuename = attrPageSection.split("/")[2];
        hashPageTitle = "Georama - Plan | Activities - " + venuename;	
    }

    else if (attrPageType == "11"){
        hashLocationString = "Explore/" + hashCountryName.replace(/ /g, "-") + "/" + $.trim(hashCityName.replace(/ /g, "-")) + "/Plan/Hotels" + "/" + attrPageSection.replace(/ /g, "-");
        venuename = attrPageSection.split("/")[2];
        hashPageTitle = "Georama - " + " Plan "+ " | " + "Hotel -" + venuename;	
    }

    else if (attrPageType == '12'){
        hashLocationString = "Explore/" + hashCountryName.replace(/ /g, "-") + "/" + $.trim(hashCityName.replace(/ /g, "-")) + "/Plan/Events" + "/" + attrPageSection.replace(/ /g, "-");
        venuename = attrPageSection.split("/")[2];
        hashPageTitle = "Georama - " + " Plan "+ " | " + "Events -" + venuename;	
    }

    else if (attrPageType == '13'){
        hashLocationString = "Explore/" + hashCountryName.replace(/ /g, "-") + "/" + $.trim(hashCityName.replace(/ /g, "-")) + "/Plan/Deals" + "/" + attrPageSection.replace(/ /g, "-");
        venuename = attrPageSection.split("/")[2];
        hashPageTitle = "Georama - " + " Plan "+ " | " + "Deals -" + venuename;	
    }

    else if (attrPageType == '16'){
        hashLocationString = "Explore/" + hashCountryName.replace(/ /g, "-") + "/" + $.trim(hashCityName.replace(/ /g, "-")) + "/Plan/Hostels" + "/" + attrPageSection.replace(/ /g, "-");
        venuename = attrPageSection.split("/")[2];
        hashPageTitle = "Georama - " + " Plan "+ " | " + "Hostel -" + venuename;	
    }

    else{
        hashLocationString = "Explore/" + hashCountryName.replace(/ /g, "-") + "/" + $.trim(hashCityName.replace(/ /g, "-")) + "/" +attrPageType + "/" + attrPageSection;
        hashPageTitle = "Georama - " + hashCountryName + " - " + $.trim(hashCityName) + " - " + attrPageType + " | " + attrPageSection;	
    }
}

/* function created for creating and storing Hash URLs on the browser */
function hashPushState(attrHashString, attrPageTitle){
    if (isPushStateEnabled == true || isBackForwardBtnClicked == false){
        isPushStateEnabled = true;
        $.bbq.pushState(attrHashString, 2);
    }
    if (isLiveServer == true){
        _gaq.push(['_trackPageview', location.pathname + location.hash]);
    }
    document.title = attrPageTitle;
    isPageLoaded = false;	
    isBackForwardBtnClicked = false;
    createFaviconLink();
}

function createFaviconLink(){
    var faviconLink = document.createElement('link');
    faviconLink.type = "image/x-icon";
    faviconLink.rel = "icon";
    faviconLink.href = "/images/html5/favicon.ico";
    document.getElementsByTagName('head')[0].appendChild(faviconLink);
}

function openPlanBookSharePanel(){
    isPushStateEnabled = false;
    isBackForwardBtnClicked = true;
    if (isPageLoaded == true){
        cityMainTabType = 'HashBook';
        $('#rootvectormap').vectorMap('set', 'triggerPinClick', hashCityKey);
        cityMainTabType = 'Plan';
        isBackForwardBtnClicked = false;		
    }
}

function openCityTabsPanel(attrCityKey, attrTabType){
    onLoadOneTimeCallData();
    showTripDataOnMap();
    $('#main-top-nav li a').removeClass('active');
    $('#exploreAnchorID').addClass('active');
    if ($("#cityInfoScreen .dragHandle ul").is(":visible") == false){		
        activeMapMode = visibleMap;
        cityPanelTabType = attrTabType;
        if($("#t_"+attrCityKey).is(":visible") == false  && isPageLoaded == true){
            $('#rootvectormap').vectorMap('set', 'label', {
                "n":hashCityDetails.n, 
                "c": hashCityDetails.ccode.toLowerCase(), 
                "d":'',
                "lat":hashCityDetails.x,
                "lon":hashCityDetails.y, 
                "pin":1, 
                "pcolor":"white", 
                "key":attrCityKey, 
                "l":5, 
                "latVar":0, 
                "lonVar":0
            });	
        }
        $('#rootvectormap').vectorMap('set', 'triggerPinClick', attrCityKey);
        cityPanelTabType = "";
        visibleMap = activeMapMode;
    }else{		
        if (surfMode != 'Plan' || isCityDropDownOnChangeEvent == true || isDifferentCity == true){  
            activeMapMode = visibleMap;
            cityPanelTabType = attrTabType;
            $('#rootvectormap').vectorMap('set', 'triggerPinClick', attrCityKey);        
            cityPanelTabType = "";
            visibleMap = activeMapMode;			
        }
    }
    map.updateTripNavigationBar("A", "");
    // to resolve #459 - Parveen --------------------
    if(docBottom != false || dockPosition != false || docTripBottom != false || dockTripPosition != false){
        restorPanel();	
    }
    //----------------------------------------------
    switch(attrTabType){  
        case "Info":
            if(typeof hashVenueId == 'undefined'){
                $("#cinfo").trigger('click');
                showCityData('additionalinfo', 'additionalinfo');
                infoLeftTabsClicked('0','about')
            }
            else{					
                if ($("#cinfo").hasClass("current") == true  &&  hashCityKey == document.getElementById('hdnCityId').value){
                    selectedEntityId = hashId;
                    fillInfoData(hashCityKey);
                }else{
                    selectedEntityId = hashId; 
                    fillInfoData(hashCityKey);
                    showVectorMap();
                }
            }
            break;
			
        case "Weather":
            $("#cweather").trigger('click');
            break;

        case "Hotels":
            if(typeof hashVenueId == 'undefined'){
                $("#chotel").trigger('click');
            }else{
                if(isPageLoaded == true){
                    isBackForwardBtnClicked = true;
                    selectedEntityId = hashVenueId;
                    $("#chotel").trigger('click');
                }else{
                    if ($("#chotel").hasClass("current") == true){
                        openHotelDetail(hashVenueId, hashId);
                    }else{
                        selectedEntityId = hashVenueId;
                        $("#chotel").trigger('click');
                    }
                }
            }
            break;	

        case "Hostels":
            if(typeof hashVenueId == 'undefined')
            {
                $("#chostel").trigger('click');
            }
            else{
                if(isPageLoaded == true)
                {	
                    isBackForwardBtnClicked = true;
                    selectedEntityId = hashVenueId;
                    $("#chostel").trigger('click');
                }
                else
                {	
                    if ($("#chostel").hasClass("current") == true){
                        openhostelDetailPlan(hashVenueId,hashId);
                    }
                    else
                    {	
                        selectedEntityId = hashVenueId;
                        $("#chostel").trigger('click');
                    }
                }
            }
			
            break;		

        case "Attractions":
            if(typeof hashVenueId == 'undefined'){
                $("#cattraction").trigger('click');
            }else{
                if(isPageLoaded == true){
                    isBackForwardBtnClicked = true;
                    openPanelWithDetail('attraction', hashVenueId);  
                }else{
                    if ($("#cattraction").hasClass("current") == true){
                        openInfoDetail(hashId,1);
                    }else{
                        openPanelWithDetail('attraction', hashVenueId);
                    }
                }
            }
            break;
			
        case "Activities":
            if(typeof hashVenueId == 'undefined'){
                $("#cactivities").trigger('click');
            }else{
                if(isPageLoaded == true){
                    isBackForwardBtnClicked = true;
                    selectedEntityId = hashVenueId;
                    $("#cactivities").trigger('click');
                }else{
                    if ($("#cactivities").hasClass("current") == true){
                        openPlanActivityDetail(hashVenueId,'',hashId,hashVenueName);
                    }else{	
                        selectedEntityId = hashVenueId;
                        $("#cactivities").trigger('click');
                    }
                }//end of else block
            }
            break;		
			
        case "Restaurants":
            if(typeof hashVenueId == 'undefined'){
                $("#crestaurant").trigger('click');
            }else{
                if(isPageLoaded == true){
                    isBackForwardBtnClicked = true;
                    openPanelWithDetail('restaurants', hashVenueId);
                }else{
                    if ($("#crestaurant").hasClass("current") == true){
                        openInfoDetail(hashId, 3);
                    }else{
                        openPanelWithDetail('restaurants', hashVenueId);
                    }
                }//end of else block
            }//end of else block
            break;
			
        case "Nightlife":
            if(typeof hashVenueId == 'undefined'){
                $("#cnightlife").trigger('click');
            }else{
                if(isPageLoaded == true){
                    isBackForwardBtnClicked = true;
                    openPanelWithDetail('nightlife', hashVenueId);
                }else{
                    if ($("#cnightlife").hasClass("current") == true){
                        openInfoDetail(hashId, 4);
                    }else{
                        openPanelWithDetail('nightlife', hashVenueId);
                    }
                }//end of else block
            }//end of else block
            break;
			
        case "Shopping":
            if(typeof hashVenueId == 'undefined')
                $("#cshopping").trigger('click');
            else{
                if(isPageLoaded == true){
                    isBackForwardBtnClicked = true;
                    openPanelWithDetail('Shopping', hashVenueId);
                }
                else
                {
                    if ($("#cshopping").hasClass("current") == true){
                        openInfoDetail(hashId,6);
                    }
                    else{
                        openPanelWithDetail('Shopping', hashVenueId);
                    }
                }
            }
            break;
			
        case "Friends":
            $("#cfriends").trigger('click');
            break;		
			
        case "Events":
            if(typeof hashVenueId == 'undefined')
                $("#cevents").trigger('click');
            else{
                if(isPageLoaded == true){
                    isBackForwardBtnClicked = true;
                    selectedEntityId = hashVenueId;
                    $("#cevents").trigger('click');
                }
                else
                {
                    if ($("#cevents").hasClass("current") == true)
                        openEventDetail(hashId);
                    else
                    {	
                        selectedEntityId = hashVenueId;
                        $("#cevents").trigger('click');
                    }
                }
            }
            break;	
				
        case "Deals":
            if(typeof hashVenueId == 'undefined')
                $("#cdeals").trigger('click');
            else{
                if(isPageLoaded == true){
                    isBackForwardBtnClicked = true;
                    selectedEntityId = hashVenueId;
                    $("#cdeals").trigger('click'); 
                }
                else
                {
                    if ($("#cdeals").hasClass("current") == true)
                        openDealInfo(hashId);
                    else
                    {
                        selectedEntityId = hashVenueId;
                        $("#cdeals").trigger('click');
                    }
                }
            }
            break;	
			
        case "News":
            $("#cnews").trigger('click');
            break;		

        case "Media":
            $("#cmedia").trigger('click');
            break;				
    }
}//end of function

function hashShowCityTabs(attrCityTabType){
    switch(attrCityTabType){
        case "Info":
            openCityTabsPanel(hashCityKey, attrCityTabType);
            break;
		
        case "Weather":
            openCityTabsPanel(hashCityKey, attrCityTabType);
            break;		

        case "Hotels":
            openCityTabsPanel(hashCityKey, attrCityTabType);
            break;		

        case "Hostels":
            openCityTabsPanel(hashCityKey, attrCityTabType);
            break;		

        case "Attractions":
            openCityTabsPanel(hashCityKey, attrCityTabType);
            break;	
			
        case "Activities":
            openCityTabsPanel(hashCityKey, attrCityTabType);
            break;	
			
        case "Restaurants":
            openCityTabsPanel(hashCityKey, attrCityTabType);
            break;	
			
        case "Nightlife":
            openCityTabsPanel(hashCityKey, attrCityTabType);
            break;	

        case "Shopping":
            openCityTabsPanel(hashCityKey, attrCityTabType);
            break;	
				
        case "Events":
            openCityTabsPanel(hashCityKey, attrCityTabType);
            break;	
			
        case "Friends":
            openCityTabsPanel(hashCityKey, attrCityTabType);
            break;				
			
        case "Deals":
            openCityTabsPanel(hashCityKey, attrCityTabType);
            break;	
			
        case "News":
            openCityTabsPanel(hashCityKey, attrCityTabType);
            break;	
						
        case "Media":
            openCityTabsPanel(hashCityKey, attrCityTabType);
            break;	

        case "Flight":
            openPlanBookSharePanel();
            //hashcheck =false;
            activeBookTab='Flight';			
            $("#bookTab").trigger('click');
            break;		
					
        case "Hotel":
            if (typeof hashVenueId =='undefined'){  
                hashcheck =true;
                openPlanBookSharePanel();
                activeBookTab = 'Hotel';	
                $("#bookTab").trigger('click');
                openHotelBooking();
                initBookPanel('Hotel');
                displaySelectedBookPanel('Hotel');
                hashcheck =false;
            /*				if($("#book-hotel").show()==false){
				$("#book-hotel").show();
				}
*/				}
            else{
                if(isPageLoaded == true){
                    hashcheck =true;
                    if ($("#geofarelitab a").hasClass("active") == false){
                        $("#fareSearchAnchorID").trigger('click');
                    }
                    openHotelBooking();
                    initBookPanel('Hotel');
                    displaySelectedBookPanel('Hotel');
                    hashcheck =false;
                    break;
                }
                else{ 
                    $("#hotelSearch").hide();
                    $('#bHotelUpdateSearch').show();
                    step2(hashVenueId,hashId,hashVenueName);
                }
            }			
            break;		
        case "Hostel":
            if (typeof hashVenueId =='undefined'){
                hashcheck =true;
                openPlanBookSharePanel();
                activeBookTab = 'Hostel';	
                $("#bookTab").trigger('click');
                openHostelBooking();
                initBookPanel('Hostel');
                displaySelectedBookPanel('Hostel');
                hashcheck =false;
            }
            else{
                if(isPageLoaded == true){
                    hashcheck =true;
                    if ($("#geofarelitab a").hasClass("active") == false){
                        $("#fareSearchAnchorID").trigger('click');
                    }
                    openHostelBooking();
                    initBookPanel('Hostel');
                    displaySelectedBookPanel('Hostel');
                    hashcheck =false;
                    break;
                }
                else{ 
                    $('#hostelSearch').hide(); 
                    openhostelbookingDetail(hashId,hashVenueId);
                }
            }			
            break;		

        case "Car":
            if (typeof hashVenueId =='undefined'){
                hashcheck =true;
                openPlanBookSharePanel();
                activeBookTab = 'Car';
                $("#bookTab").trigger('click');
                displaySelectedBookPanel('Car');
                car_landing_page();
                hashcheck =false;
                if($("#car").show()==false){ 
                    $("#car").show();
                }
            }
            else{
                if(isPageLoaded == true){
                    hashcheck =true;
                    if ($("#geofarelitab a").hasClass("active") == false){
                        $("#fareSearchAnchorID").trigger('click');
                    }
                    displaySelectedBookPanel('Car');
                    car_landing_page();
                    hashcheck =false;
                    break;
                }
                else{ 
                    $('#carSearch').hide();  
                    car_detail_step(hashId);
                    hashBookCar(hashId,hashVenueId);
                }
            }			
            break;		

        case "Activity":
            if (typeof hashVenueId =='undefined'){
                hashcheck =true;
                openPlanBookSharePanel();
                activeBookTab = 'Activity';
                $("#bookTab").trigger('click');
                openViatorBooking();
                initBookPanel('Activity');
                displaySelectedBookPanel('Activity');
                hashcheck =false;  
                if($("#book-activities").show()==false){ 
                    $("#book-activities").show();
                }
            }
            else{
                if(isPageLoaded == true){
                    hashcheck =true;
                    if ($("#geofarelitab a").hasClass("active") == false){
                        $("#fareSearchAnchorID").trigger('click');
                    }
                    openViatorBooking();
                    initBookPanel('Activity');
                    displaySelectedBookPanel('Activity');
                    hashcheck =false;
                    break;
                }
                else{ 
                    $(".bActivitiesBtnBTR").show();
                    $('#activitySearch').hide();  
                    openBookingActivityDetail(hashId,'','',hashVenueName);
                }
            }			
            break;
		
        case "Share":
            openPlanBookSharePanel();
            $("#bookTab").trigger('click');
            $("#shareTab").trigger('click');
            break;	
    }
}

function infoLeftTabsClicked(fieldId,fieldName){
    if(fieldName == 'about'){
        createHashURLTitle("Plan" , "Info");
        hashPushState(hashLocationString, hashPageTitle);	
    }
    else{
        infoLeftTabClick = fieldId + '/' + fieldName;
        createHashURLTitle("Infotabs" , infoLeftTabClick);
        hashPushState(hashLocationString, hashPageTitle);	
    }
}

//this function will open Mytrip panel
function myTripsClick(){
	if(indPageloadingProcess == true){
			return;
	}
    $('#CountryPageComponent').hide();
    //calling function to create and store Hash URL on the browser.
    //hashPushState("My-Trips","Georama - My Trips");
    if((visibleMap == 'jvector') && (mapZoomLevel == 0)){
        mapZoomLevel = 1; //added by Vijay for fareSearchClick 17-Dec-2012 12:24PM
    }//end of if block
    if(!myTripFlag){
        myTripFlag = true;
        friendTripFlag = false;
    /*START-For my trip issue|11-14-2012|dev-SN*/
    /*if(global_trip_id!=''){
                showTripPushPin(parseInt(global_trip_id));                
                
                myTripFlag = true;
                $("#goback").html('&laquo; Go back to My Trips');
            }else{
                global_trip_id='';
                tripId='';
            }*/
    /*END-For my trip issue|11-14-2012|dev-SN*/
    }
        
    //above code commented by Vijay due to duplicate
	
    if($('.rightPanel').is(":visible") == false){
        $('.rightPanel').show();
    }
    $('#mytrip_dropdown_lb').text('View all Trips');	
    $('#mytrip_dropdown_ul a').removeClass('active');	
    $('#all_a').addClass('active');
    $("#StaticPageContent").html('');
	
    //$(".welcome_pnl").fadeOut();
    //	$('.welcome_pnl').hide();
    //	$("#OutrContainer").hide();
    //	$("#topbar-wrap").show();
    showhideWelcomePanel('hide');
    $('#fareSearch_wrapper').hide();
    $("#openPage").hide();
    $(".pageOverlay").hide();
    showVectorMap();	
    myTripFlag = true;
    friendTripFlag = false;
    openMyTabInfo();        
    zoomTo100();
    ResetBrowserScrollAfterDataLoaded();//dev AN
    /* Apply active class to selected Navigation Item (My Trips) */
    $('#main-top-nav li a').removeClass('active');
    $('#myTripsId').addClass('active');
    // dev-P. Changed to show zoom controls on click of view my trips. 19 Oct 2012
    $('#zoomcontrols').show();
}//end of function myTripsClick

var tripIdForPanelSwitch=0;
function friendsTripsClick(){ 
	if(indPageloadingProcess == true){
			return;
	}

    /** check for facebook logout in another tab by Arun **/
    FB.api('/me', function(response) {
        if(!response.id && FB_LOGIN==1){     
            loggedInCacheClear();
        }
    });
    /** check for facbook logout in another tab by Arun **/


    $('#CountryPageComponent').hide();
    //calling function to create and store Hash URL on the browser.
    hashPushState("Friends-Trips","Georama - Friends Trips");
    if($('.rightPanel').is(":visible") == false){
        $('.rightPanel').show();
    }	
    if(!friendTripFlag){
        //   global_trip_id='';
        tripId='';
    }	
    $('#friendsTrip_dropdown_lb').text('View all Trips');	
    $('#friendsTrip_dropdown_ul a').removeClass('active');	
    $('#friend_all_a').addClass('active');
    $('#fareSearch_wrapper').hide();		
    $(".pageOverlay").hide();
    $("#openPage").hide();
    //$("#georama_welcome_overlay").hide();
    //$(".fixed_footer_wrapper").hide();
    //$("#welcome_close").hide();	
    showhideWelcomePanel('hide','hide');

    $('#rootvectormap').vectorMap('set','hideAllPin',1);
    //$('#welcome_booking_trip_panel').hide();
    //$('#may_be_wrap').hide();
    //$('#yes_wrap').hide();

    abortAjax();	
    showVectorMap();
    openFriendTrips();

    friendTripFlag = true;
        
    if((visibleMap == 'jvector') && (mapZoomLevel == 0)){
        mapZoomLevel = 1; //added by Vijay for fareSearchClick 17-Dec-2012 12:24PM
    }//end of if block
    zoomTo100();
    ResetBrowserScrollAfterDataLoaded();//dev AN
    myTripFlag = false;
        
//FB.getLoginStatus(handleFbLoginStatus);
}//end of function friendsTripsClick

function fareSearchClick(){ 
	if(indPageloadingProcess == true){
			return;
	}

    //calling function to create and store Hash URL on the browser.
    //hashPushState("Fare-Search/Flights","Georama - Fare Search");
    if($('.rightPanel').is(":visible") == false){
        $('.rightPanel').show();
    }
    //if(docBottom != false || dockPosition != false || docTripBottom != false || dockTripPosition != false){
    //	restorPanel();// added by dev-AN to reset the max-min mode
    //}
    $('#friend_trip_wrapper').hide();
    $('#PlanBookComponent').hide();
    $('#CountryPageComponent').hide();
    $("#Drop_Explore" ).hide();
    $(".pageOverlay").hide();
    $("#openPage").hide();
    //$("#topbar-wrap").show();
    if($('#welcome_close').is(":visible") == true){
        onLoadOneTimeCallData();
        showTripDataOnMap();
    }
    
    friendTripFlag = false;
    myTripFlag = false;
    faresearchcheck = true;
    welcomeBook();
    faresearchcheck = false;
    showVectorMap();
    ResetBrowserScrollAfterDataLoaded();//dev AN
       
    if((visibleMap == 'jvector') && (mapZoomLevel == 0)){
        mapZoomLevel = 1; //added by Vijay for fareSearchClick 17-Dec-2012 12:24PM
    }//end of if block 
		

}//end of function fareSearchClick

function tripNameClick(tripName,tripId){
    userId = document.getElementById("userId").value;	
    tripinfo = userId + '/' + tripId + '/' + tripName;
    createHashURLTitle("My Trips" , tripinfo);
    hashPushState(hashLocationString, hashPageTitle);	
}

function friendTripClick(friendTripId, friendTripName, friendId){
    userId = document.getElementById("userId").value;	
    if(!friendTripName){
        friendtripinfo = userId + '/' + friendId + '/' + friendTripId;
    }else{
        friendtripinfo = userId + '/' + friendId + '/' + friendTripId + '/' + friendTripName;
    }
    createHashURLTitle("Friends Trips" , friendtripinfo);	
    hashPushState(hashLocationString, hashPageTitle);	
}//end of function friendTripClick

function applySwitchTabs(listID, clickEvents){
    // patch fix
    $('.nav #activities, .nav #restaurant').show();
    //alert("My Trip Flag="+myTripFlag+" Friend Trip Flag="+friendTripFlag);
    /*if(global_trip_id!=''){
            var panel_trip_id = global_trip_id;
	}else{
            var panel_trip_id  = $("#tripPlaceId").val();
	}*/
    if(global_trip_part_id!=''){
        var panel_trip_id = global_trip_part_id;
    }else{
        var panel_trip_id  = $("#tripPartId").val();
    }
    if(surfMode == "Plan"){	
        switch(listID){
            case "info":
                activeExploreTab = "Info";			
                fillInfoData($.trim($("#hdnCityId").val()));
                break;					
            case "weather":
                activeExploreTab = "Weather";
                break;				
            case "hotel":
                activeExploreTab = "Hotels";
                break;				
            case "phostel":
                activeExploreTab = "Hostels";
                break;					
            case "attraction":
                activeExploreTab = "Attractions";
                break;					
            case "activities":
                activeExploreTab = "Activities";
                break;						
            case "restaurant":
                activeExploreTab = "Restaurants";
                break;						
            case "nightlife":
                activeExploreTab = "Nightlife";
                break;				
            case "events":
                activeExploreTab = "Events";
                break;				
            case "friends":
                activeExploreTab = "Friends";
                break;										
            case "deals":
                activeExploreTab = "Deals";
                break;						
            case "news":
                activeExploreTab = "News";
                break;					
            case "media":
                activeExploreTab = "Media";
                break;					
            case "shopping":
                activeExploreTab = "Shopping";
                break;				
        }
			
        createHashURLTitle("Plan", activeExploreTab);
        hashPushState(hashLocationString, hashPageTitle);	
			
        /*if (global_city_panel_id != panel_trip_id) {
			global_city_panel_id = panel_trip_id;			
			eval(listID + "CityId = document.getElementById('hdnCityId').value")
			$(".list ul").css("top", "0");
			eval(clickEvents);				
			
			}else  */
        //alert('global_city_panel_id: ' + global_city_panel_id + ' - panel_trip_id: ' + panel_trip_id + 'ListID - City ID: '+eval(listID + "CityId"));
			
			
        if (eval(listID + "CityId == ''") || listID == "info" || listID == "weather" || listID == "news" || global_city_panel_id != panel_trip_id) {
            //alert(1);
            global_city_panel_id = panel_trip_id;	
            eval(listID + "CityId = document.getElementById('hdnCityId').value")
            $(".list ul").css("top", "0");
            $("#" + listID + "Info").html(panelloaderDiv);
            $("#" + listID + "Details").hide().html(preloadDiv);
            eval(clickEvents);	
            if (listID == "weather") {
                mscroll();
            }
		
        } else if (eval(listID + "CityId != document.getElementById('hdnCityId').value") || cityInfoTopItemCalled == true) {
            eval(listID + "CityId = document.getElementById('hdnCityId').value")
            $("#" + listID + "Details").hide();
            $("#" + listID + "Info").show();
            $("#" + listID + "Info").html(preloadDiv);			
            if (listID != "info" || listID != "weather") {
                $("#" + listID + " .list").hide();
            }
            //alert('global id before initializing'+global_city_panel_id);
            //alert(global_city_panel_id+" "+panel_trip_id);
				
            //global_city_panel_id = panel_trip_id;
            //alert('global id'+global_city_panel_id);
            if (listID == "friends") {
                $("#friendsDetail").hide();
                $("#friendInfo").show();
                $('#frndsBtnBTR').hide();					
            }				
            $("#info .list").show();
            $("#weather .list").show();				
            $(".list ul").css("top", "0");				
            $("#" + listID + "BtnBTR").hide();
            //$(".btnBTR").hide();				
            $(".bCarBtnBTR").hide();
            $(".bHotelBtnBTR").hide();
            $(".bActivitiesBtnBTR").hide();				
            eval(listID + "Places =''");
            eval(clickEvents);
        //console.log("If the city is not same");	
				
        } else {
            if (listID == "attraction") {
                bucketId = 1;
                var cacheKey = "tr_" + cityId + "_" + bucketId;		
                planDataCache = cache[cacheKey];
                if(typeof attractionPlaces!='undefined' && eval(listID + "Places") != '' && eval(listID + "Places") != null ){
                    showBing();
                    plotRecommendedDataOnBingMap(eval(listID + "Places"), eval(listID + "bucketId"));
                }else{
                    showVectorMap();
                }
            //reEqualize('attraction');
            } else if (listID == "restaurant") {
                bucketId = 3;
                var cacheKey = "tr_" + cityId + "_" + bucketId;
                planDataCache = cache[cacheKey];
                if(typeof restaurantPlaces!='undefined' && eval(listID + "Places") != '' && eval(listID + "Places") != null){
                    showBing();
                    plotRecommendedDataOnBingMap(eval(listID + "Places"), eval(listID + "bucketId"));
                }else{
                    showVectorMap();
                }
            //reEqualize('restaurant');
            } else if (listID == "nightlife") {
                bucketId = 4;
                var cacheKey = "tr_" + cityId + "_" + bucketId;
                planDataCache = cache[cacheKey];
                if(typeof nightlifePlaces!='undefined' && eval(listID + "Places") != '' && eval(listID + "Places") != null){
                    showBing();
                    plotRecommendedDataOnBingMap(eval(listID + "Places"), eval(listID + "bucketId"));
                }else{
                    showVectorMap();
                }
            //reEqualize('nightlife');
            } else if (listID == "shopping") {
                bucketId = 6;
                var cacheKey = "tr_" + cityId + "_" + bucketId;
                planDataCache = cache[cacheKey];
                if(typeof shoppingPlaces!='undefined' && eval(listID + "Places") != '' && eval(listID + "Places") != null){
                    showBing();
                    plotRecommendedDataOnBingMap(eval(listID + "Places"), eval(listID + "bucketId"));
                }else{
                    showVectorMap();
                }
            //reEqualize('shopping');
            } else if (listID == "activities") {
                bucketId = 8;
                var cacheKey = "tr_" + cityId + "_" + bucketId;
                planDataCache =  cache[cacheKey];
                //plotRecommendedDataOnBingMap(eval(listID + "Places"), eval(listID + "bucketId"));
                showVectorMap();
            //plotRecommendedDataOnBingMap(eval(listID + "Places"), eval(listID + "bucketId"));
            //reEqualize('activities');
            } else if (listID == "events") {
                if(typeof eventsPlaces!='undefined' && eval(listID + "Places") != '' && eval(listID + "Places") != null){
                    showBing();
                    plotEventDataOnBingMap(eval(listID + "Places"));
                }else{
                    showVectorMap();
                }
            //reEqualize('events');
            } else if (listID == "friends") {
                showVectorMap();
                $("#friendsDetail").css('margin-left','158px');
            } else if (listID == "deals") {
                if(typeof dealsPlaces!='undefined' && eval(listID + "Places") != '' && eval(listID + "Places") != null){
                    showBing();
                    plotDealDataOnBingMap(eval(listID + "Places"));
                }else{
                    showVectorMap();
                }
            //reEqualize('deals');
            } else if (listID == "hotel") {
                if(typeof hotelPlaces!='undefined' && eval(listID + "Places") != '' && eval(listID + "Places") != null){
                    showBing();
                    plotHotelDataOnBingMap(eval(listID + "Places"));
                }else{
                    showVectorMap();
                }
            //reEqualize('hotel');
            } else if (listID == "phostel") {
                var cacheKey = "hst_" + cityId + "_0" ;
                hostelCacheData = cache[cacheKey];
                if(typeof phostelPlaces!='undefined' && eval(listID + "Places") != '' && eval(listID + "Places") != null){
                    showBing();
                    plotHostelDataOnBingMapNew(eval(listID + "Places"));
                }else{
                    showVectorMap();
                }
            //reEqualize('phostel');
            }
            $(".list ul").css("top", "0");
        }
		
        if(listID == "media"){
            showVectorMap();
        }		
    } else {		
        if(surfMode == "Book"){
            $('.pnlContentBook').hide();
        }
        eval(clickEvents);			
        //alert(surfMode);
        switch(listID){
            case "bflight":
                $("#bflight").show();
                break;
            case "book-hotel":
                $("#book-hotel").show();
                break;
            case "book-hostel":
                $("#book-hostel").show();
                break;
            case "car":
                $("#car").show();
                break;
            case "book-activities":
                $("#book-activities").show();
                break;
        }
    }
	
	
}


function reEqualize(id){
/*var classname = 'none';
	$('#' + id + ' .top25 section').height('auto');	
	$('#' + id + ' .top25 section').each(function(i){
		if(classname != this.className){
			$('.' + classname).equalizeHeights();
			classname = this.className;
		}
	});*/
}
function flightIconClick(){    
    // abortAjaxCall();
	//alert('flight');
    $("#result-detail_flight").hide();
    if(isFareSearchClicked == true){        
        initBookPanel('Flight');
        hashPushState("Fare-Search/Flight","Georama - Fare Search | Flight"); //hash tag
    }else{        
        activeBookTab = 'Flight';		
        createHashURLTitle("Book" , "Flight");
        hashPushState(hashLocationString, hashPageTitle);
        initBookPanel();
    }//end of else block	
    //calling function to initiate the process of keeping as is state of the tabs
    openFlightBooking();
//initBookPanel('Flight');
}//end of function flightIconClick

function openFlightBooking(){
    abortAjax();
    showVectorMap();
    if($("#searchResults").length>0){
        $("#bflightStep1").show();
        $("#bflightStep2").hide();
        $('#bFlightUpdateSearch').hide();
        $('#result-detail_flight').hide();
    }//end of if block	
}//end of function openFlightBooking

function bhotelIconClick(){
    abortAjaxCall();
    if(isFareSearchClicked == true){
        //initBookPanel('Hotel');
        hashPushState("Fare-Search/Hotel","Georama - Fare Search | Hotel");		//hash tag
    }else{
        activeBookTab = 'Hotel';
        createHashURLTitle("Book" , "Hotel");
        //initBookPanel();
        hashPushState(hashLocationString, hashPageTitle);
    }//end of else block	
    //calling function to initiate the process of keeping as is state of the tabs
    openHotelBooking();
    initBookPanel('Hotel');
    ResetBrowserScrollAfterDataLoaded();//dev AN

}//end of function bhotelIconClick

function bhostelIconClick(){	
    abortAjaxCall();
    if(isFareSearchClicked == true){
        hashPushState("Fare-Search/Hostel","Georama - Fare Search | Hostel");		//hash tag
    //initBookPanel('Hostel');
    }else{
        activeBookTab = 'Hostel';		
        createHashURLTitle("Book" , "Hostel");		
        //initBookPanel();
        hashPushState(hashLocationString, hashPageTitle);
    } 	
    openHostelBooking();
    initBookPanel('Hostel');
    ResetBrowserScrollAfterDataLoaded();//dev AN

}//end of function bhostelIconClick

function carIconClick(){
    abortAjaxCall();
    $("#result-detail_car, #bCarBackToGrid").hide();
    if(isFareSearchClicked == true){
        hashPushState("Fare-Search/Car","Georama - Fare Search | Car");		//hash tag
    }else{
        activeBookTab = 'Car';		
        createHashURLTitle("Book" , "Car");
        hashPushState(hashLocationString, hashPageTitle);
    }
    //calling function to initiate the process of keeping as is state of the tabs
    abortAjax();
    showVectorMap();
    car_landing_page();
    ResetBrowserScrollAfterDataLoaded();//dev AN
    setTimeout(function(){
        hasDatepickerHeight();
    },800);
}//end of function carIconClick

function bactivityIconClick(){
    abortAjaxCall();
    if(isFareSearchClicked == true){
        hashPushState("Fare-Search/Activities","Georama - Fare Search | Activities");		//hash tag
    //initBookPanel('Activity');
    }else{
        activeBookTab = 'Activity';		
        createHashURLTitle("Book" , "Activity");		
        //initBookPanel();
        hashPushState(hashLocationString, hashPageTitle);
    }	
    openViatorBooking();
    initBookPanel('Activity');
    ResetBrowserScrollAfterDataLoaded();//dev AN

}//end of function bactivityIconClick

function shareTabClick(){
    surfMode='Share';
    showVectorMap();
    createHashURLTitle("Share" , '');
    hashPushState(hashLocationString, hashPageTitle);
    ResetBrowserScrollAfterDataLoaded();//dev AN
//calling function to initiate the process of keeping as is state of the tabs
}//end of function shareTabClick

function welcome(){
    FB.getLoginStatus(handleFbLoginStatus);
    hashPushState("Welcome", "Georama - " + "Welcome");	
}

function welcomeNoClick(){
    hideFbFacePile();
    hashPushState("Welcome" + "/No", "Georama - " + "Welcome | No");	
}

function welcomeMaybeClick(){
    hideFbFacePile();
    hashPushState("Welcome" + "/Maybe", "Georama - " + "Welcome | Maybe");	
}

function welcomeYesClick(){
    hideFbFacePile();
    hashPushState("Welcome" + "/Yes/Book/" + yesTab, "Georama - " + "Welcome | Book - " + yesTab);		
}

function CloseBtnClick(){
    hashPushState("Explore", "Georama - Explore");
    //$("#topbar-wrap").show();
    showhideTopBar('show');
    $("#back-welcome").show();
    $('#main-top-nav li a').removeClass('active');
    $('#exploreAnchorID').addClass('active');

    $("#header").removeClass('welcomeHeader');    
    $("#facepile_div").hide();
//resetWelcomeBookingVaues();
}//end of function CloseBtnClick

function resetWelcomeBookingVaues(){
    is_welcome_book_panel = 0;
    welcome_book_panel_city_id = 0;
    welcome_pushpin_data = '';
}

var SharetabSignIn = false;
function tripShareFromTopNav(hostName,shareOn){	
    var userId = $("#userId").val(); 
    if(userId == '0' || userId == null){
        SharetabSignIn = shareOn;
        member_login_header(); 
    }else{
        var postName = 'Georama';
        var tripName = $("#tripPlaceName").attr("title");        
        var tripId = document.getElementById("tripPlaceId").value;
        var userName = $("#user_name").text();
        var caption = userName +' just created a trip using Georama.'; 
        var description  = 'Recommend places to '+ userName +' for the trip "'+tripName+'".';
        var picture = "http://georama.com/images/facebook-icon.png";
        var postLink = "http://"+hostName+"/#My-Trips/"+userId+"/"+tripId+"/"+tripName;
        var twitterText = "I just created a trip on Georama - please help me out with suggestions!"+" "+"http://"+ hostName +"/#My-Trips/"+ userId +"/"+tripId +"/"+tripName;
        var twitterPostLink = 'https://twitter.com/intent/tweet?text='+ encodeURIComponent(twitterText);
        SharetabSignIn = false;
        if(shareOn == 'facebook'){
            postToFeed(postLink, picture, postName, caption, description,tripId);
        }else if(shareOn == 'twitter'){ 
            window.open(twitterPostLink, 'tweet_win', 'width=699,height=600');
        }
    }
}//end of function tripShareFromTopNav

var fromMonth='';
var toMonth='';
var tags='';
var rid='';

function tripFinderCities(){
    $('#a_exploreWelcomeNo').addClass('btn_explore_disabled');
    $('#a_exploreWelcomeNo').removeClass('btn_explore');
    $('#a_exploreWelcomeNo').attr("disabled", true);
    $('#explorebtn_loader').show();
    hashNullCounter = 1;
    yellowPushPinCounter = 0; 
    var aproxMonth = document.getElementById("aproxMonth");
    fromMonth = aproxMonth.value;
    var getRegion = document.getElementById("region");
    rid = getRegion.value;
    tags= document.getElementById("hdnfield").value;
    var hash = $.base64.encode(document.URL);
    var tripId=$("#tripPlaceId").val();
	
    tagVal=document.getElementById("hdnfieldValue").value;
    var url = '/geo/cityknownfornew';
    var params = 'tagVal='+ tagVal +'&tags='+ tags +'&fromMonth='+ fromMonth +'&toMonth='+ toMonth +'&rid='+ rid + '&tripId='+ tripId +'&hash='+hash+'&rand=' + parseInt(Math.random() * 99999999);
    map.hideAllYellowPushpin();
    yellowPinArray = [];
    if (isLiveServer == true){
        pushRecoGAEventTrackingTags(tags);//added by dev AN for Google Analytics Event Tracking
    }
    $.ajax({
        type: "GET",
        url: url,
        data: params,
        success: function(data) {
            $('#explorebtn_loader').hide();
            $('#a_exploreWelcomeNo').removeClass('btn_explore_disabled');
            $('#a_exploreWelcomeNo').addClass('btn_explore');
            $('#a_exploreWelcomeNo').attr("disabled", false);
            //$('#rootvectormap').vectorMap('set','hideAllPin',1);
            var obj = jQuery.parseJSON(data);
            if(obj.data == null || obj.data.length<1){
					
                notifyme("Sorry we couldn't find any destinations that matched your search. Please update your search and try again.", "error");
                return false;
            }else{
                //showhideWelcomePanel('hide');
                //calling function to create and store Hash URL on the browser.
                hashPushState("Explore","Georama - Explore");
                // $("#OutrContainer").hide();
                //                    $('.welcome_pnl').hide();
                //$('#topRecmTip').css('top','45%');
                $('#topRecmTip').show();
                $("#back-welcome").show();
                $("#main-top-nav li a").removeClass("active");
                $("#explore #exploreAnchorID").addClass("active");
                $.each(obj.data, function(i,value){ 
                    try{						
                        isYellowPushPinPlottingEvent = true;
                        yellowPushPinCounter++;
                        yellowPinArray.push(value.id);
							 
                        $('#rootvectormap').vectorMap('set', 'label', {
                            "n":value.name,
                            "c":value.ccode.toLowerCase(),
                            "d":'',
                            "lat":value.lat,
                            "lon":value.lon, 
                            "pin":1, 
                            "pcolor":"yellow", 
                            "key":value.id, 
                            "l":5, 
                            "latVar":value.latvar, 
                            "lonVar":value.lonvar
                        });	
                        isYellowPushPinPlottingEvent = false;
                        if (yellowPushPinCounter == 10) yellowPushPinCounter = 0;
                    }catch(err){}						
                });	
                //map.drawTrajectory();
                //setTimeout(function(){
                //						map.callCityNameHandling();					
                //					}, 2000);
                showhideWelcomePanel('hide');
            //map.callCityNameHandling();
            }//end of else block
        }//end of success
    });	
}//end of funtion tripFinderCities

function showTips(){
    $('.georama-tagCityPointer').show();
    $('#destnTip').show();
}

function hideTips(){
    $('.georama-tagCityPointer').hide();
    $('#destnTip').hide();
    $('#topRecmTip').hide();
}

function setActivitiesValue(obj,objvalue){
    var sourceIds = document.getElementById("hdnfield").value;
    var sourceIdsVal = document.getElementById("hdnfieldValue").value;
    var str1="rel";
    var str=str1.concat(obj);
	
    if(sourceIds!=''){
        var sourceIdArray = sourceIds.split(',');
        var sourceIdsValArray = sourceIdsVal.split(',');
        var idx = sourceIdArray.indexOf(obj);
        if(idx!=-1){
            newVal = sourceIdArray.splice(idx, 1);
            newValtag=sourceIdsValArray.splice(idx, 1);
            newVal = sourceIdArray;
            newValtag=sourceIdsValArray;
            $("#"+str).removeClass("selected");
        } 
        else{
            newVal = newVal+","+obj;
            newValtag = newValtag+","+objvalue;
            $("#"+str).addClass("selected");
        }
    }
    else{
        newVal =obj;
        newValtag = objvalue;
        $("#"+str).addClass("selected");
		
    }
    document.getElementById("hdnfield").value=newVal;
    document.getElementById("hdnfieldValue").value=newValtag;
}

function hideTopNavSettings(){
    $("#origin-drop-widget").hide();
    for(var c = 1; c <= destPushPinCounter; c++){
        $("#destination-drop-widget_" + c).hide();
		var attrCityKey = map.multiDestArr[c-1];
		$("#a-top-nav-setting_D" + c + "_" + attrCityKey , "#li-top-nav-destination_" + c).removeClass("select");
    }
    $("#pot-destination-drop-widget").hide();
    $("#multi-destination-drop-widget").hide();   			//Pardeeep 11 Jan
    if ($.trim($("#hdn-Pot-Destination-Counter-Open").val()) != ""){
        $("#pot-destination-drop-widget_" + $("#hdn-Pot-Destination-Counter-Open").val()).hide();
    }
    if ($.trim($("#hdn-CityKey-Open").val()) != ""){
        if ($("#a-top-nav-setting_" + $("#hdn-CityKey-Open").val()).attr("class") == "sel-loc-button select"){
            $("#a-top-nav-setting_" + $("#hdn-CityKey-Open").val()).attr("class", "sel-loc-button");
        }
        $("#hdn-CityKey-Open").val("");
    }	
    //$('#subnav').hide();
    $('#topNavTripList').hide();
//$('.help ').hide(); commented by dev AN on 03may against #815
//$('.select_citymsg').hide();commented by dev AN on 03may against #815
}

function cancelEditMode(){
    if ($("#txtHeadOrigin").is(":visible") == true && $("#origin-widget").html() != ""){
        $('#txtHeadOrigin').val("");
        $("#txtHeadOrigin").hide();				
        $("#originContainer").show();				
    }
	
    if ($("#txtHeadDestination").is(":visible") == true && $("#destination-widget").html() != ""){
        $('#txtHeadDestination').val("");
        $("#txtHeadDestination").hide();				
        $("#destinationContainer").show();				
    }
}

function getFormattedAddress(address,city,state,pincode){
    var formattedAddress = '';
    var formatAddress = new Array();
    var i =0;
    if(typeof(address) != 'undefined'  && address != '' && address != null){
        formatAddress[i] = address;
        i++;
    }
    if(typeof(city) != 'undefined'  && city != '' && city != null){
        formatAddress[i] = city;
        i++;
    }
    if(typeof(state) != 'undefined'  && state != '' && state != null){
        formatAddress[i] = state;
        i++;
    }
    if(typeof(pincode) != 'undefined'  && pincode != '' && pincode != null){
        formatAddress[i] = pincode;
    }
    formattedAddress = formatAddress.join(',');
    return formattedAddress;
}
var indPageloadingProcess = false;
function showPage(pagename){
	if(indPageloadingProcess == true){
		return;
	}
	indPageloadingProcess = true;
    $("#mapOverlay").remove();
    $('#iconNav .ui-tabs-panel ul li a').removeClass('current');
    $('#cinfo').addClass('current');

    $('.balloon').hide();
    $('#zoomcontrols').hide();
    $('#tripMenu').hide();
    $('#tripMenuCountry').hide();
    independentPages = true;
    //alert(independentPages)
	
	
    $('#main-top-nav li a').removeClass('active');
    hashLocationString = pagename.substr(0,1).toUpperCase() + pagename.substr(1).toLowerCase();
    hashPushState(hashLocationString,"Georama - " + hashLocationString);
    $("#back-to-map").hide();	
    //$(".welcome_pnl").fadeOut();
    //	$('.welcome_pnl').hide();
    //	$("#OutrContainer").hide();
    showhideWelcomePanel('hide');
    showhideTopBar('hide');
    $(".welcomeBox").hide("fade", 500);	
    $("#my_trip_wrapper").hide();
    $("#friend_trip_wrapper").hide();
    $('#fareSearch_wrapper').hide();
    $('#PlanBookComponent').hide();
    $('#CountryPageComponent').hide();
	
    $('#zoomcontrols').hide();
    $("#containervectormap").hide();
    $("#mapDiv").hide();
    $('.rightPanel').hide();
    $('.tagCityPointer').hide();
    //$(".help").fadeOut(function(){handleTip();});
    if(pagename == "contact" || pagename == "feedback" || pagename == "about" || pagename == "blog" )
    {
        $("#openPage").width("500px");
        $("#openPage").height("400px");
    }else{
        $("#openPage").width("80%");
        $("#openPage").height("80%");
        $("#openPage .content").height("100%");
    }
	
    contML = $("#openPage").width() / 2;
    contMT = $("#openPage").height() / 2;
    //alert(contML);
    $("#openPage").css("margin-left", -contML)
    $("#openPage").css("margin-top", -contMT);
	
    $("#openPage").removeClass();
    $("#openPage").addClass(pagename);

    $("body").append('<div style="padding-top:250px;" align="center" id="mapOverlayloader">Loading...<br/><img src="/images/panel-loader.gif" alt=""/></div>');
    //$(".pageOverlay").show();
    //$("#openPage").show();
    //$("#openPage div.content").html('<div style="padding:50px;" align="center">Loading..<br /><img src="/images/panel-loader.gif"/></div>')
	
    url = '/' + pagename + ".phtml";
    url = '/page/index/view/' + pagename;
	
	
    $.get(url, function(pagedata){
        $("#containervectormap").hide();
        $("#mapDiv").hide();
		 
        $("#mapOverlayloader").remove();
        if(independentPages){
            $("#StaticPageContent").html(pagedata);
        }
        if(pagename == "press"){
            $("#press").css("padding", "50px 35px");
        }
        //$("#tabs").tabs();
        //$("#containervectormap").html(pagedata);
        //$("#poptabs").tabs(); 	
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
		indPageloadingProcess = false;
    });
    return false;				
}
	
	
/* From Geoplaces File */
var showGeoPlace = false;
var showWidget = false;
var welcome_counter = 0;
var welcomeFlag= false;
var foursquareDone = 0;
var skipVarFlag=0;
var ltmode = "My";
	
function bing_reinitWidget(str){
    thisMovie('flashMapWidgetId').bing_reinitWidget(str);
}
	
function guestSignInNotification(){
    $(".saveGuestPlaces").fadeIn();
}
	
function hideSignInNotification(){
    $('.saveGuestPlaces').fadeOut();
}	
	
function PlayBack(mode){
    if(mode == "on"){
        $('#zoomcontrols').fadeOut();
        $('.rightPanel').fadeOut();
        $('#visitedWorld').fadeOut();
    }else{
        $('#zoomcontrols').fadeIn();
        $('.rightPanel').fadeIn();
        $('#visitedWorld').fadeIn();
    }
}
	
function flashZoomControls(mode){		
    if(mode == "on"){
        $('#flash-zoom .zoom-birdseye').addClass('disabled');
        $('#flash-zoom .zoom-city').addClass('disabled');
        $('#flash-zoom span.disableOverlay').show();
    }else{
        $('#flash-zoom .zoom-birdseye').removeClass('disabled');
        $('#flash-zoom .zoom-city').removeClass('disabled');
        $('#zoomcontrols span.disableOverlay').hide();
    }
}
	
function flashMapClicked(){
    $(".help").fadeOut(function(){
        handleTip();
    });
    $(".guideHelp").fadeOut(function(){
        handleTip();
    });
    $(".mapviewHover").hide("fast");
    closeWelcomeScreen();
    $("#OutrContainer").hide("fade", 500);
    $('.tagCityPointer').hide();
}
	
function getTabMode(mode){
    //alert(mode);
    ltmode = mode;
    if(ltmode == "Friends"){
        $('.mypl').css('visibility', 'hidden');
        $('.frpl').css('visibility', 'visible'); 
    }else{
        $('.mypl').css('visibility', 'visible');
        $('.frpl').css('visibility', 'hidden'); 
    }
		 
}


function launchVideo(){
    $('body').append('<div class="welcome_overlay launchOverlay" style="z-index:1999;"></div><div class="liveVideo rounded"><a href="javascript://" class="close" onclick="$(\'.liveVideo\').remove();$(\'.launchOverlay\').remove();"></a><h3>Georama Presentation at DEMO!</h3><iframe width="560" height="315" src="http://www.youtube.com/embed/dJGqF5pk9vI" frameborder="0" allowfullscreen></iframe></div>');
}
/*START- created by dev AN, made launchVideo() reusable on 28-feb-2012*/
function launchUTVideo(video_string, video_Title, iframe_width){
    //$('body').append('<div class="welcome_overlay launchOverlay" style="z-index:1999;"></div><div class="liveVideo rounded"><a href="javascript://" class="close" onclick="$(\'.liveVideo\').remove();$(\'.launchOverlay\').remove();"></a><h3>'+video_Title+'</h3><iframe width="'+iframe_width+'" height="315" src="http://www.youtube.com/embed/'+video_string+'" frameborder="0" allowfullscreen></iframe></div>');
    $('body').append('<div class="welcome_overlay launchOverlay" style="z-index:2001;" onmousedown="hideme();"></div><div class="liveVideo rounded" style="z-index:2001;"><span class="close curHandPointer" onmousedown ="hideme();"></span><h3>'+video_Title+'</h3><iframe width="'+iframe_width+'" height="315" src="http://www.youtube.com/embed/'+video_string+'" frameborder="0" allowfullscreen></iframe></div>');
}
function hideme(){
    $(".liveVideo").remove();
    $(".launchOverlay").remove();  
}
/*END- created by dev AN, reusable above video on 28-feb-2012*/

steps = 10;
speed = 50;
contWidth = 410;
var scrolllist;

function scrollDiv(id, or, contWidth) {
    //alert(id + ', ' + or + ', ' + contWidth);
	
    id  = id.replace("#", "");
	
    //console.log('id in scrollDiv: ' + id);	
    obj = $("#" + id); 
	
    obj.scrollItem = $('.vscroll-item', obj);			
	
    //obj.scrolllist = new Object();
    //alert("initializing the scroll list variable: " + obj.scrolllist);
	
    if(or != 'h'){
        obj.next = $('.scrolldown', obj);
        obj.prev = $('.scrollup', obj);
        or == 'v';
    }else{
        obj.next = $('.scrollleft', obj);
        obj.prev = $('.scrollright', obj);
    }
    
    //obj.rel = obj.attr('rel');	
    //obj.scrollItem = new Object();
    //obj.prev.css('visibility', 'hidden');
    //obj.prev.css('visibility', 'visible');
	
    obj.Top = parseInt(obj.scrollItem.css('top'));
    obj.Left = parseInt(obj.scrollItem.css('left'));
    if(or == 'h'){
        obj.totItems = $("ul.vscroll-item li", obj).size();
        obj.approxWidth = obj.totItems * 80;
        //alert(contWidth)
        $("ul.vscroll-item", obj).width(obj.approxWidth);
    //console.log($("ul.vscroll-item", obj).width(contWidth))
    }
	
    obj.Height = obj.scrollItem.height() - (steps + 500);
    obj.Width = obj.scrollItem.width() - (steps + contWidth);
    //alert("Height: "+obj.Height+ "Width: "+ obj.Width);
    //console.log('id in scrollDiv: ' + id + ', ob.height ' +  obj.Height + ', obj.width ' +  obj.Width);
    //console.log('width of an item for Scroll ' + id + ': '  + obj.Width);
   
    obj.next.mouseover(function () {
        if(or != 'h'){
            if(parseInt(obj.Top) > -obj.Height)
                scrolllist = setInterval("scrollit('" + id + "', 'up', " + steps + ", '" + or + "')", speed)
            else
                clearInterval(scrolllist);
        }else{
            if(parseInt(obj.Left) > -obj.Width)
                scrolllist = setInterval("scrollit('" + id + "', 'left', " + steps + ", '" + or + "')", speed)
            else
                clearInterval(scrolllist);	
        //alert("Checking after re-assign scrolllist: " + obj.scrolllist);	  
        }
        obj.prev.css('visibility', 'visible');
    });
				
    obj.prev.mouseover(function () {
        if(or != 'h'){
            var objtop=0;
            objtop = $('.vscroll-item', obj).css('top');
            if (typeof objtop == 'undefined'){
                objtop = parseInt(obj.Top);
            }
            if(parseInt(objtop) < 0)
                scrolllist = setInterval("scrollit('" + id + "', 'down', " + steps + ", '" + or + "," + scrolllist + "')", speed);	   
            else
                clearInterval(scrolllist);
        }else{
            if(parseInt(obj.Left) < 0)
                scrolllist = setInterval("scrollit('" + id + "', 'right', " + steps + ", '" + or + "," + scrolllist + "')", speed);		
        }
        obj.next.css('visibility', 'visible');
    });
	
	
    obj.next.mouseout(function () {
        if(or != 'h'){	
            clearInterval(scrolllist);	
            if(parseInt(obj.Top) > -obj.Height)
                $('.vscroll-item', obj).animate({
                    top: "-=20"
                }, 500);	 
        }else{
            clearInterval(scrolllist);	
            if(parseInt(obj.Left) > -obj.Width)
                $('.vscroll-item', obj).animate({
                    left: "-=80"
                }, 500);		  
        }
    });
	
	
    obj.prev.mouseout(function () {
        if(or != 'h'){	
            clearInterval(scrolllist);
            if(parseInt($('.vscroll-item', obj).css('top')) != 0){
                $('.vscroll-item', obj).animate({
                    top: "+=20"
                }, 500, function(){
                    if(parseInt(obj.scrollItem.css('top')) > 0){
                        $('.vscroll-item', obj).animate({
                            top: 0
                        }, 1000);
                    }
                });	  
            }
        }else{
            clearInterval(scrolllist);
            if(parseInt($('.vscroll-item', obj).css('left')) != 0){
                obj.scrollItem.animate({
                    left: "+=80"
                }, 500, function(){
                    if(parseInt($('.vscroll-item', obj).css('left')) > 0){
                        $('.vscroll-item', obj).animate({
                            left: 0
                        }, 1000);
                    }
                });	  
            } 
        }	  
    });
	
	
	
    /*obj.next.mousedown(function(){
		speed = 100;
	});
	
	obj.next.mouseup(function(){
		speed = 250;
	});
	
	obj.prev.mousedown(function(){
		speed = 100;
	});
	
	obj.prev.mouseup(function(){
		speed = 250;
	});*/
	
    /*	obj.prev.show();
	obj.next.show();
	
	if(obj.scrollItem.height <= 500)
	{
		obj.prev.hide();
		obj.next.hide();
	}
*/	
	
    
    if(obj.scrollItem.height() >= 500){
        
        obj.prev.css('visibility', 'hidden');
        obj.next.css('visibility', 'visible');
    }
    else {
        
        obj.prev.css('visibility', 'hidden');
        obj.next.css('visibility', 'hidden');
    }

	
}

function scrollit(id, dir, steps, or, interVar) {
	
    //console.log("Inside Scrollit Function: "+ id + ", dir: " + dir + ", steps: " + steps);
	
    id = id.replace("#", "");
	
    obj = $('#' + id + ' .vscroll-item');
    obj.prev = $('#' + id + ' .scrollup');
    obj.next = $('#' + id + ' .scrolldown');
	
    if(or != 'h'){
        obj.Top = parseInt(obj.css('top'));
        obj.newtop = obj.Top;
		 
        obj.Height = obj.height() - (steps + 500);
        if (dir == 'up') {
            if (obj.Top >= -obj.Height) { 
                obj.newtop = obj.Top - steps;			
            }else{
                clearInterval(interVar);
                obj.next.css('visibility', 'hidden');
            }
        //console.log("in up condition obj.Top: " + obj.Top + " obj.Height: " + -obj.Height);
        //  console.log(parseInt(obj.css('top')) + "----" + obj.Height);
        } else {
            if (obj.Top < 0){
                obj.newtop = obj.Top + steps;
            //console.log("in down condition: " + newtop);
            }else{
                clearInterval(interVar);
                obj.prev.css('visibility', 'hidden');
            }
        }
        obj.css('top', obj.newtop + 'px');
    }else{
        obj.Left = parseInt(obj.css('left'));
        obj.newleft = obj.Left;		 
        obj.Width = obj.width() - (steps + 500);
		
        if (dir == 'left') {
            if (obj.Left >= -obj.Width) { 
                obj.newleft = obj.Left - steps;			
            }else{
                clearInterval(interVar);
            }
        //console.log("in up condition obj.Top: " + obj.Top + " obj.Height: " + -obj.Height);
        //  console.log(parseInt(obj.css('top')) + "----" + obj.Height);
        } else {
            if (obj.Left < 0){
                obj.newleft = obj.Left + steps;
            //console.log("in down condition: " + newtop);
            }else{
                clearInterval(interVar);
            }
        }
        obj.css('left', obj.newleft + 'px');
    }
}

function getCityAttributes(attrCountry,attrCity,attrcityId,attrMode){
    //var url='/geo/getcityattr/ct/'+ attrCity +'/country/'+ attrCountry +'/cityId/'+ attrcityId +'/mode/'+ attrMode +'/sid/' + parseInt(Math.random() * 99999999);
    var result="";
    $.ajax({
        type: "POST",
        url:'/geo/getcityattr/',
        data: 'ct='+ attrCity +'&country='+ attrCountry +'&cityId='+ attrcityId +'&mode='+ attrMode +'&sid=' + parseInt(Math.random() * 99999999),
        async: false,  
        success:function(data) {
            result =jQuery.parseJSON(data); 
        }
    });
    return result;	
}

function openPlanPanel(){
    if (isPlanBookShareTabAutoClicked == false){
        if(activeExploreTab == 'Info'){
            $("#info").show();
            showVectorMap();
            openSelCityInfo();
        }else{
            switch(activeExploreTab){
                case 'Attractions':
                    if(typeof attractionPlaces!='undefined' && attractionPlaces != '' && attractionPlaces != null){
                        showBing();
                        backToGrid(1)
                    }else{
                        showVectorMap();
                    }
                    break;
                case 'Restaurants':
                    if(typeof restaurantPlaces!='undefined' && restaurantPlaces != '' && restaurantPlaces != null){
                        showBing();
                        backToGrid(3);
                    }else{
                        showVectorMap();
                    }
                    break;
                case 'Nightlife':
                    if(typeof nightlifePlaces!='undefined' && nightlifePlaces != '' && nightlifePlaces != null){
                        showBing();
                        backToGrid(4);
                    }else{
                        showVectorMap();
                    }
                    break;
                case 'Shopping':
                    if(typeof shoppingPlaces!='undefined' && shoppingPlaces != '' && shoppingPlaces != null){
                        showBing();
                        backToGrid(6);
                    }else{
                        showVectorMap();
                    }
                    break;
                case 'Events':
                    if(typeof eventsPlaces!='undefined' && eventsPlaces != '' && eventsPlaces != null){
                        showBing();
                        backToGrid(12);
                    }else{
                        showVectorMap();
                    }
                    break;
                case 'Hotels':
                    if(typeof hotelPlaces!='undefined' && hotelPlaces != '' && hotelPlaces != null){
                        showBing();
                        backToGrid(11);
                    }else{
                        showVectorMap();
                    }
                    break;
                case 'Hostels':
                    if(typeof phostelPlaces!='undefined' && phostelPlaces != '' && phostelPlaces != null){
                        showBing();
                        backToGrid(16);
                    }else{
                        showVectorMap();
                    }
                    break;
                case 'default':
                    showVectorMap();
                    break;
            }			
        }
        createHashURLTitle("Plan" ,activeExploreTab);			//hash tag
        hashPushState(hashLocationString, hashPageTitle);		//hash tag
    }//end of if block
    
/*city = document.getElementById('hdnCityId').value;    
    document.getElementById("cityInfoPanel").innerHTML = city;
    $(".contenPnl").hide();
    $("#Drop_Explore" ).hide(); 
    $("#exploter_panel_city" ).hide();
    $("#cityInfoPanel").show();			
    //fillInfoData(id);
    fillInfoData(city);
    showVectorMap();		
    cityPanelTabType = "";*/    
}//end of if block openPlanPanel

function initBookPanel(panel,isError){        
    if( bookingXhr != null ) {
        bookingXhr.abort();
        bookingXhr = null;
    }
    
    if(panel == 'Hotel'){
        if(hotelSearchFromWelcome == true){
            return;            
        }
    }

    if(searchFromWelcome == true){
        return;
    }
    var containterId = 'bflightStep1';
    var panelIconId  = 'cflight';	
    cityId = parseInt(document.getElementById("hdnCityId").value);
    cityId= isNaN(cityId) ? 0 : cityId;
    var tabUrl = '/html5/book/flight/cid/'+cityId;
    var panelType = activeBookTab;
	//alert(panelType);
    if(isFareSearchClicked){
        panelType = panel;
    }	
    switch(panelType){
        case 'Flight':
            tabUrl = '/html5/book/flight/cid/'+cityId;					  
            containterId = 'bflightStep1';
            panelIconId  = 'cflight';
            break;
        case 'Hotel':
            tabUrl = '/html5/book/hotel/cid/'+cityId;
            containterId = 'contBookHotel';
            panelIconId  = 'bhotel';
            break;
        case 'Hostel':
            tabUrl = '/html5/book/hostel/cid/'+cityId;
            /* START-added by DEV-SN|as hostel search form no error is showing for the first time if no result found|2-15-2013*/
            if(typeof isError!='undefined'){
                tabUrl+="/isError/"+isError;						
            }
            /* END-added by DEV-SN|as hostel search form no error is showing for the first time if no result found|2-15-2013*/
            containterId = 'contHostel';
            panelIconId  = 'bhostel';
            break;
        case 'Car':
            //tabUrl = '/html5/book/car/cid/'+cityId;
            tabUrl = '/html5/car/index/city/'+currentCityObject.n;
            containterId = 'bflightStep1';
            panelIconId  = 'ccar';
            break;
        case 'Activity':
            tabUrl = '/html5/book/activity/cid/'+cityId;
            /* START-added by DEV-SN|as hostel search form no error is showing for the first time if no result found|2-18-2013*/
            if(typeof isError!='undefined'){
                tabUrl+="/isError/"+isError;						
            }
            /* END-added by DEV-SN|as hostel search form no error is showing for the first time if no result found|2-18-2013*/
            containterId = 'contBookActivity';
            panelIconId  = 'bactivities';
            break;
    }//end of switch block
    
    if(!$('#'+panelIconId).hasClass('current')){
        $('#'+containterId).html(panelloaderDiv);
        bookingXhr = $.ajax({
            url:tabUrl,
            async: true,
            success:function(data) {
                $('#'+containterId).html('');
                $('#book').addClass('loaded');
                $('#'+containterId).html(data);
                $('.bActivitiesBtnBackToGrid').hide();
				//START-added by dev-SN on 7/8/2013 for #1004
				if(panelType == 'Flight'){
					tabUrl = '/html5/book/set-city/cid/'+cityId;
					$.ajax({
						url:tabUrl,
						async: true,
						success:function(result) {                    
							var response = jQuery.parseJSON(result);                    
							var flightForm = $("#flBkgFrm");
							if(response.data.to.cityId){
								if(typeof flightForm !== 'null'){
									$("#flightTo").val(response.data.to.cityName); 
                                                                        $("#fHdn_to").val(response.data.to.cityId);
								}
							}
							else { /*cityId Zero in this case where parameter value is NaN- dev AN #755*/
								if(typeof flightForm !== 'null'){
									$("#flightTo").val('Enter a City or Airport');
                                                                        $("#fHdn_to").val('');
								}
							}
						}
					});
				}//END-added by dev-SN on 7/8/2013 for #1004
            }		  
        });
    }else{
        if(panelType != 'Flight' ){
            $('#'+containterId).html(panelloaderDiv);
            bookingXhr = $.ajax({
                url:tabUrl,
                async: true,
                success:function(data) {
                    $('#book').addClass('loaded');
                    $('#'+containterId).html(data);
                    $('.bActivitiesBtnBackToGrid').hide();
                    if(panelType == 'Hotel'){
                        var noOfRooms = document.getElementById("welcomenumberOfRoom").value;
                        $('#numberOfRoom').val(noOfRooms);
                        addHotelRooms(noOfRooms, 'search');
                        for(var i=1; i <= noOfRooms; i++){		
                            var id = '#welcomeHotel_room'+i+'Adult';
                            var childId = '#welcomeHotel_room'+i+'Child';
                            var adultVal = $(id).val();
                            var childVal = $(childId).val();
                            $('#Hotel_room'+i+'Adult').val(adultVal);
                            $('#Hotel_room'+i+'Child').val(childVal);
                            if(childVal){
                                for(var j=1; j <= childVal; j++){
                                    addHotelChilds(i, childVal, 'search');
                                    var childAgeId = '#welcomeroom'+i+'child'+j+'age';
                                    var childAgeVal = $(childAgeId).val();
                                    $('#room'+i+'child'+j+'age').val(childAgeVal);
                                }
                            }		
                        }
                    }
                }		  
            });            
        }else{
            tabUrl = '/html5/book/set-city/cid/'+cityId;
            $.ajax({
                url:tabUrl,
                async: true,
                success:function(result) {                    
                    var response = jQuery.parseJSON(result);                    
                    var flightForm = $("#flBkgFrm");
                    if(response.data.to.cityId){
                        if(typeof flightForm !== 'null'){
                            $("#flightTo").val(response.data.to.cityName);
                            $("#fHdn_to").val(response.data.to.cityId);                            
                        }
                    }
                    else { /*cityId Zero in this case where parameter value is NaN- dev AN #755*/
                        if(typeof flightForm !== 'null'){
                            $("#flightTo").val('Enter a City or Airport');
                        }
                    }
                    if(typeof flightForm !== 'null'){
                        if((typeof response.data.from != 'undefined') && (response.data.from!='') && (response.data.from!='Enter a City or Airport')){
                            $("#flightFrom").val(response.data.from);
                            $("#fHdn_from").val(response.data.from.cityId);
                        }else if(document.getElementById("Wf1").value){//added by dev-SN FOR FIXING #971 ON 7/8/2013
							var Flightorigen=$("#Wf1").val();
							$("#flightFrom").val(Flightorigen);
                                                        $("#fHdn_form").val($("#WfHdn_from").val());
						}
                    }
                }		  
            });
        }
    }//end of else block    
}//end of function initBookPanel

function initActivityBook(){
    if(activityTabWelcome == true){
        return;
    }else{
        cityId = parseInt(document.getElementById("hdnCityId").value);
        tabUrl = '/html5/book/activity/cid/'+cityId;
        containterId = 'contBookActivity';
        panelIconId  = 'bactivities';
        $('#'+containterId).html(preloadDiv);
        bookingXhr = $.ajax({
            url:tabUrl,
            async: false,  
            success:function(data) {
                $('#book').addClass('loaded');			
                $('#'+containterId).html(data);				 
            //displaySelectedBookPanel(activeBookTab);
            }		  
        });
    }//end of else block
}//end of function initActivityBook

function displaySelectedBookPanel(panelName){
    $("#bookIconNav ul li a").removeClass('current');
    switch(panelName){
        case 'Flight':
            $("#cflight").addClass('current');
            $("#bflight").show();
            $("#book-hostel").hide();
            $("#car").hide();
            $("#book-activities").hide();
            $("#book-hotel").hide();
					 
            break;
        case 'Hotel':
            $("#bhotel").addClass('current');
            $("#book-hotel").show();
            $("#bflight").hide();
            $("#book-hostel").hide();
            $("#car").hide();
            $("#book-activities").hide();
            break;
        case 'Hostel':
            $("#bhostel").addClass('current');
            $("#book-hostel").show();
            $("#bflight").hide();
            $("#book-hotel").hide();					 
            $("#car").hide();
            $("#book-activities").hide();
            break;
        case 'Car':
            $("#ccar").addClass('current');
            $("#car").show();
            $("#book-hotel").hide();
            $("#bflight").hide();
            $("#book-hostel").hide();
            $("#book-activities").hide();
            break;
        case 'Activity':		
            $("#bactivities").addClass('current');
            $("#book-activities").show();
            $("#book-hotel").hide();
            $("#bflight").hide();
            $("#book-hostel").hide();
            $("#car").hide();					 
            break;
    }
}

function initHotelCalender(){
    $( ".fdate" ).datepicker({
        inline: true, 
        altField: '#bookhotelsearhcheckin', 
        minDate: 0, 
        yearRange: '2012:2014', 
        dateFormat: 'mm-dd-yy', 
        defaultDate: '+1m', 
        onSelect: function(dateText, inst) {
            $("#dtcheckin").html('Date: ' + document.getElementById('bookhotelsearhcheckin').value);

            getNextDate(dateText, '.tdate', false);

        }
    });

    $( ".tdate" ).datepicker({
        inline: true, 
        altField: '#bookhotelsearhcheckout', 
        minDate: 0, 
        yearRange: '2012:2014', 
        dateFormat: 'mm-dd-yy', 
        defaultDate: '+1m 1d', 
        onSelect: function(dateText, inst) {
            $("#dtcheckout").html('Date: ' + $('#bookhotelsearhcheckout').val);
        }
    });
}//end of initHotelCalender function


function openBookPanel(){
    if(docTripBottom != false || dockTripPosition != false || docBottom != false || dockPosition != false){
        restorPanel();
    }	  
    surfMode='Book'; 
    if (isPlanBookShareTabAutoClicked == false){
        if(isFareSearchClicked == true && hashcheck == false){
            if(faresearchcheck == true  && activeBookTab == 'Flight'){
                $("#cflight").trigger('click');
            }
        }else{
            if(hashcheck == false){
                //alert('hashcheck false');
                if(activeBookTab == 'Flight'){
                    $("#cflight").trigger('click');
                }else{
                    //alert('hashcheck true');
                    switch(activeBookTab){
                        case "Hotel":
                            bhotelIconClick();
                            break;
                        case "Hostel":
                            bhostelIconClick();
                            break;
                        case "Car":
                            carIconClick();
                            break;
                        case "Activity":
                            bactivityIconClick();
                            break;
                    }
                    createHashURLTitle("Book",activeBookTab);
                    hashPushState(hashLocationString, hashPageTitle);
                }
            }
        }
    }//end of if block	
    ResetBrowserScrollAfterDataLoaded();//dev AN

  
/* if(activeBookTab=='Hotel' && bookBinghotelPlaces==true){
	showBing();
	plotbHotelDataOnBingMap(bookHotelPlaces);
  }else if(activeBookTab=='Hostel' && bookBinghostelPlaces==true){
	showBing();
	plotbHostelDataOnBingMap(bookHostelPlaces);
  }else{
	  showVectorMap();
  }*/

}//end of openBookPanel

function openHotelBooking(){ 
    abortAjax();
    showVectorMap();
    $("#hotelSearch").show();
  
    $("#book_hotel_list").hide();
    $("#bHotelUpdateSearch").hide();
    $('#hotelUpdateSearch').hide();
    $("#hotelSorting").hide();
    $("#bSearchFilters").hide();
    $("#book_hotel_detail").hide();  
    $('#bHotelBackToGrid').hide();  
}//end of function openHotelBooking

function openHostelBooking(){ 
    abortAjax();
    showVectorMap();  
    $("#result-detail_hostel").hide();
    $("#bHostelUpdateSearch").hide();
    $("#bHostelBackToGrid").hide();
    $("#hostelSorting").hide();
/*$("#hostelSearch").show();
  $("#book_hostel_list").hide();
  $("#result-detail_hostel").hide();*/
}//end of function openHostelBooking


/*function getActivityLocation(){
	if($('#activity_location').val() == "Select a Location")
	{
		if(document.getElementById("activity_location"))
		document.getElementById("activity_location").value ="";
	}
	var a = $('#activity_location').autocomplete1({ 
			serviceUrl:'/feed/viatorcitysuggest/',
			minChars:2, 
			maxHeight:400,
			width:200,
			zIndex: 9999,
			noCache: false, //default is false, set to true to disable caching
			onSelect: function(value, data){
				$("#viator_category_block").show();
				$('#viator_category').html('<img src="/images/loader_10x10.gif" alt="Loading Categories..." style="margin:10px 5px; height:15px;" />');
				welcome_pushpin_data = data;				
				viatorActivityDestId = data.destinationId;
				searchActivityForm(data.destinationId);				
			}	
	});
}
*/
var SearchHotelRoomCount = 1;
var planHotelRoomCount = 1;
var bookHotelRoomCount = 1;
var welcomeHotelRoomCount = 0;
var MTplanHotelRoomCount = 1;

function addHotelRooms(roomCount, prefx){
    var stext ='';
    var pref = '';
	
    if(prefx != 'search')
        pref = prefx;	
    $('#welcomeChildClose').hide();
	
    if(roomCount > 2 && prefx == 'welcome' ){
        childListPopupMode = true;
        $('#showListRoomsAC').hide();
        $('#welcomeChildClose').show();
        $('#room1n2txt').show();
        $('#room1n2txt').addClass('room1n2txt');
        $('#showListRoomsAC').addClass('showListRoomsAC');
        $("#showListRoomsAC h4").show();
        $("#showListRoomsAC").css("margin-top","-104px");
    }else if(roomCount <= 2 && prefx == 'welcome'){
        $('#showListRoomsAC').show();
        $('#showListRoomsAC').removeClass('showListRoomsAC');
        $('#room1n2txt').hide();
        $("#showListRoomsAC h4").hide();
        $("#showListRoomsAC").css("margin-top","0px");
    }
	
    //console.log("Room count is: " + roomCount);
	
    //hotelRoomCount = welcomeHotelRoomCount;
	
    switch(prefx)
    {
        case 'search':
            hotelRoomCount = SearchHotelRoomCount;
            break;
        case 'plan':
            hotelRoomCount = planHotelRoomCount;
            break;
        case 'book':
            hotelRoomCount = bookHotelRoomCount;
            break;
        case 'welcome':
            hotelRoomCount = welcomeHotelRoomCount;			  
            break;
        case 'MT':
            hotelRoomCount = MTplanHotelRoomCount;			  
            break;
    }	
    hotelRoomCount= parseInt(hotelRoomCount);
    roomCount= parseInt(roomCount);
    //console.log("hotelRoomCount: " + hotelRoomCount + "roomCount: " + roomCount + "welcomeHotelRoomCount: " + welcomeHotelRoomCount);
    if(hotelRoomCount < roomCount){
        for(j=1; j<=roomCount; j++){
            if(document.getElementById(pref+'table_room_'+j)){
            }
            else{
                if(j==1){	
                    stext+='<div id="'+pref+'table_room_'+j+'" class="clear" >';			
                    stext+='<label class="fl marginR10">Room #'+j+':</label>';
                }else{
                    stext+='<div id="'+pref+'table_room_'+j+'" class="marginT5 clear">';				
                    stext+='<label class="fl marginR10">Room #'+j+':</label>';
                }
                stext+='<div class="fl marginR10">';
                //if(j==1)
                //stext+='<label>Adults</label>';
                stext+='<div class="stylize-select hotel-rac">';
                stext+='<select name="'+pref+'room-'+j+'-adult-total" style="padding:0px;" onchange="countMembers();" id="'+pref+'Hotel_room'+j+'Adult" tabindex="5">';
                stext+='<option value="1" >1</option>';
                stext+='<option value="2" selected="selected">2</option>';
                stext+='<option value="3">3</option>';
                stext+='<option value="4">4</option>';
                stext+='</select>';
                stext+='</div>'; 
                //if(j==1)
                //stext+='<div class="clearfloat semi-light font_11">(age 18+)</div>';                  
                stext+='</div>';
			
                stext+='<div class="fl marginR10">';
                //if(j==1)
                //stext+='<label>Children</label>';
                stext+='<div class="stylize-select hotel-rac">';
                stext+='<select style="padding:0px;" name="'+pref+'room-'+j+'-child-total" onchange="addHotelChilds(' + j + ', this.options[this.selectedIndex].value, \''+prefx+'\');" id="'+pref+'Hotel_room'+j+'Child" tabindex="6">';
                stext+='<option value="0" selected="">0</option>';
                stext+='<option value="1">1</option>';
                stext+='<option value="2">2</option>';
                stext+='<option value="3">3</option>';
                stext+='</select>';
                stext+='</div>';  
                //if(j==1)
                //stext+='<div class="clearfloat semi-light font_11">(age 0-17)</div>';                        
                stext+='</div>';					
                stext+='</div><div class="clearfloat"></div>';
            }
        }
        $("#"+pref+"select_hotel_rooms").append(stext);
        hotelRoomCount = parseInt(roomCount);
    }else{
        for(i=hotelRoomCount; i>roomCount; i--){
            $('#'+pref+'table_room_' + i).remove();
            switch(pref)
            {
                case 'search':
                    searchhotelChildCount[i] = 0;
                    break;
                case 'plan':
                    planhotelChildCount[i] = 0;
                    break;
                case 'book':
                    bookhotelChildCount[i] = 0;
                    break;
                case 'welcome':
                    welcomehotelChildCount[i] = 0;
                    break;
                case 'MT':
                    MTplanhotelChildCount[i] = 0;
                    break;					
            }
            hotelRoomCount = roomCount;
        }
    }
	
    switch(prefx)
    {
        case 'search':
            SearchHotelRoomCount = hotelRoomCount;
            break;
        case 'plan':
            planHotelRoomCount = hotelRoomCount;
            break;
        case 'book':
            bookHotelRoomCount = hotelRoomCount;
            break;
        case 'welcome':
            welcomeHotelRoomCount = hotelRoomCount;
            break;
        case 'MT':
            MTplanHotelRoomCount = hotelRoomCount;
            break;
    }		
    countMembers();
}

function showhidechildheaders(RoomId , ChildId,prefx){
    var hotelroomsCount = document.getElementById(RoomId).value;
    var maxchilds = 0; 
    for(i=1; i<=hotelroomsCount; i++){
        if(document.getElementById(ChildId+i+"Child").value > maxchilds){
            maxchilds = document.getElementById(ChildId+i+"Child").value;
        }
    }
        
    $('#'+prefx+'hotelRoomsLabels .childLabel1').hide();	
    $('#'+prefx+'hotelRoomsLabels .childLabel2').hide();	
    $('#'+prefx+'hotelRoomsLabels .childLabel3').hide();
    for(i=1; i<=maxchilds; i++){
        $('#'+prefx+'hotelRoomsLabels .childLabel'+i).show();
           
    }
}

var hotelRoomChildAge = [[0, 0, 0, 0,], [0, '<1', '<1', '<1'], [0, '<1', '<1', '<1'], [0, '<1', '<1', '<1'], [0, '<1', '<1', '<1'], [0, '<1', '<1', '<1'], [0, '<1', '<1', '<1'], [0, '<1', '<1', '<1'], [0, '<1', '<1', '<1']];

var searchhotelChildCount = [0,0,0,0,0,0,0,0,0];
var planhotelChildCount = [0,0,0,0,0,0,0,0,0];
var bookhotelChildCount = [0,0,0,0,0,0,0,0,0];
var welcomehotelChildCount = [0,0,0,0,0,0,0,0,0];
var MTplanhotelChildCount = [0,0,0,0,0,0,0,0,0];

function addHotelChilds(roomNumber, count, prefx){
    var stext='';	
    var pref = '';
    if(prefx != 'search')
        pref = prefx;	
    hotelChildCount = searchhotelChildCount[roomNumber];
	
    switch(prefx)
    {
        case 'search':
            hotelChildCount = searchhotelChildCount[roomNumber];
            if(document.getElementById("numberOfRoom") != null){
                showhidechildheaders("numberOfRoom" , "Hotel_room",prefx);
            }
            break;
        case 'plan':
            hotelChildCount = planhotelChildCount[roomNumber];
            showhidechildheaders("numberOfBedRooms" , "planHotel_room",prefx);
            break;
        case 'book':
            hotelChildCount = bookhotelChildCount[roomNumber];
            showhidechildheaders("booknumberOfRoom" , "bookHotel_room",prefx);
            break;
        case 'welcome':
            hotelChildCount = welcomehotelChildCount[roomNumber];
            showhidechildheaders("welcomenumberOfRoom" , "welcomeHotel_room",prefx);
            break;
        case 'MT':
            hotelChildCount = MTplanhotelChildCount[roomNumber];
            showhidechildheaders("MTnumberOfBedRooms" , "MTHotel_room",prefx);
            break;
    }
    //console.log("hotelChildCount: " + hotelChildCount + " >> count: " + count + " >> prefx: " + prefx +  " >> roomNumber: " + roomNumber);
	
    if(eval(hotelChildCount) < count){		
        for(i=hotelChildCount; i<=count; i++){
            if(i != hotelChildCount){
                if(document.getElementById(pref+'room'+ roomNumber + 'ChildCount_'+ i)){
                }
                else{
				
                    if(i == 3)	
                        stext+='<div class="fl" id="'+pref+'room' + roomNumber + 'ChildCount_'+ i +'">';
                    else
                        stext+='<div class="fl marginR10" id="'+pref+'room' + roomNumber + 'ChildCount_'+ i +'">';
				
                    if(roomNumber == 1){
                        //stext+='<label class="textTransformNormal">Child ' + i + '</label>';
                        stext+='<div class="stylize-select hotel-rac">';
                    }else
                        stext+='<div class="stylize-select hotel-rac">';
                    stext+='<select style="padding:0px;" id="'+pref+'room'+roomNumber+'child'+i+'age" name="'+pref+'room'+roomNumber+'child'+i+'age" onchange="hotelRoomChildAge['+roomNumber+','+ i +'] = this.options[this.selectedIndex].value">';
							
                    for(j=0; j<=17; j++){	
							
                        stext+='<option value="'+j+'" ';
                        if(j == hotelRoomChildAge[roomNumber][i]){
                            stext += 'selected="selected"';
                        }					
                        if(j==0)
                            stext+='>&lt;1</option>';
                        else
                            stext+='>'+j+'</option>'
                    }
				
                    stext+='</select>';
                    stext+='</div>';
				
                    //if(roomNumber == 1)
                    //stext+='<div class="semi-light clearfloat font_11">Age</div>';
				
                    stext+='</div>';
                }
                hotelChildCount++;
            }
        }
        $("#"+pref+"table_room_" + roomNumber).append(stext);	
    }else{
        for(i=hotelChildCount; i>count; i--){
            $("#"+pref+"room" + roomNumber + "ChildCount_" + i).remove();
            hotelChildCount--;
        }
    }
	
    switch(prefx)
    {
        case 'search':
            searchhotelChildCount[roomNumber] = hotelChildCount;
            break;
        case 'plan':
            planhotelChildCount[roomNumber] = hotelChildCount;
            break;
        case 'book':
            bookhotelChildCount[roomNumber] = hotelChildCount;
            break;
        case 'welcome':
            welcomehotelChildCount[roomNumber] = hotelChildCount;
            break;
        case 'MT':
            MTplanhotelChildCount[roomNumber] = hotelChildCount;
            break;
    }
    countMembers();
}

//welcomeHotelRoomCount = 1;
welcomeContDiv = 'welcomeOneRoom_table_room_1';

function countMembers(roomnum){
    var pnl = 'welcome';
    var roomcount = welcomeHotelRoomCount;
    var Adultctr=0;
    var Childctr=0;
	
    for(i=1; i<=roomcount; i++){
        if(document.getElementById(pnl+'Hotel_room'+i+'Adult')){
            if(document.getElementById(pnl+'Hotel_room'+i+'Adult').value > 0){
                Adultctr = Adultctr + parseInt(document.getElementById(pnl+'Hotel_room'+i+'Adult').value);
            }
        }
    }
	
    for(i=1; i<=roomcount; i++){
        if(document.getElementById(pnl+'Hotel_room'+i+'Child')){
            if(document.getElementById(pnl+'Hotel_room'+i+'Child').value > 0){
                Childctr = Childctr + parseInt(document.getElementById(pnl+'Hotel_room'+i+'Child').value);
            //welcomehotelChildCount[i] = welcomehotelChildCount[i] + parseInt(document.getElementById(pnl+'Hotel_room'+i+'Child').value);
            }
        }
    }
	
    $('#welcomeRoom2n2Count').html('<span>'+Adultctr+'</span> Adult(s) | <span>'+Childctr+'</span> Child(ren)');

}

function addWelcomeHotelRoom(roomCount){
    if(document.getElementById('welcomeHotel_room1Child').value !=0)
        childListPopupMode = true;
		
    if(roomCount == 1){
        welcomeHotelRoomCount = 1;
        childListPopupMode = false;
        $('#welcomeRoom1Children').show();
        if(!childListPopupMode && document.getElementById('welcomeHotel_room1Child').value > 0){
            addHotelWelcomeChilds(document.getElementById('welcomeHotel_room1Child').value);
        }
        $('#welcomeOneRoom_table_room_1').html(room1Content).show();
        $('#welcomeRoom2').hide();
        $('#room1n2txt').hide().removeClass('room1n2txt');		
    }
    else if (roomCount == 2){
		
        childListPopupMode = true;
        $('#welcomeOneRoom_table_room_1').show();
        $('#welcomeRoom2').html(room2Content).show();
        $('#welcomeRoom1Children').html('');
        $('#room1n2txt').show().removeClass('room1n2txt');
        countMembers();
		
        addWelcomeHotelRooms(2);
        welcomeHotelRoomCount = 2;
		
        if(document.getElementById('welcomeHotel_room1Child').value > 0)
            addHotelChilds(1, document.getElementById('welcomeHotel_room1Child').value, 'welcome');
		
		
    }
    else if (roomCount > 2 || childListPopupMode){
        welcomeHotelRoomCount=1;
		
        $('#welcomeRoom2').html('');
        $('#welcomeOneRoom_table_room_1').html('');
		
        addWelcomeHotelRooms(roomCount);
        openCardialog('welcomeselect_hotel_rooms', 'auto', 'auto');
        $('#welcomeRoom2').hide();
        $('#welcomeRoom1Children').html('');
        $('#welcomeOneRoom_table_room_1').hide();
        $('#room1n2txt').show().addClass('room1n2txt');
    }
}



function addWelcomeHotelChild(roomNum, count){
	
    if(childListPopupMode){
        //addWelcomeHotelRooms(2);
        addHotelChilds(toString(roomNum), count, 'welcome');
		
        openCardialog('welcomeselect_hotel_rooms', 'auto', 'auto');
		
        if(document.getElementById('welcomeHotel_room1Child').value > 0)
            addHotelChilds(1, document.getElementById('welcomeHotel_room1Child').value, 'welcome');
		
        if(count > 0)
            addHotelChilds(2, count, 'welcome');
    }
    else
    {
        addHotelWelcomeChilds(count)
    }
	
}


function addWelcomeHotelRooms(roomCount){
    var stext ='';
    pref = 'welcome';
    prefx = 'welcome';
	
    if(welcomeHotelRoomCount < roomCount){
        for(j=parseInt(welcomeHotelRoomCount); j<=roomCount; j++){
            if(document.getElementById(pref+'table_room_'+j)){
            }
            else{
                stext+='<div id="welcometable_room_'+j+'" class="marginT10">';
                stext+='<label class="fl marginR10">Room #'+j+':</label>';
                stext+='<div class="fl marginR10">';
                if(j==1)
                    stext+='<label class="reset">Adults</label><small class="semi-light">(age 18+)</small>';
                stext+='<div class="stylize-select hotel-rac">';
                stext+='<select name="welcomeroom-'+j+'-adult-total" onchange="countMembers();" id="welcomeHotel_room'+j+'Adult">';
                stext+='<option value="1">1</option>';
                stext+='<option value="2" selected="selected">2</option>';
                stext+='<option value="3">3</option>';
                stext+='<option value="4">4</option>';
                stext+='</select>';
                stext+='</div>';                   
                stext+='</div>';
			
                stext+='<div class="fl marginR10">';
                if(j==1)
                    stext+='<label class="reset">Children</label><small class="semi-light">(age 0-17)</small>';
                stext+='<div class="stylize-select hotel-rac">';
                stext+='<select name="welcomeroom-'+j+'-child-total" onchange="countMembers(); addHotelChilds(' + j + ', this.options[this.selectedIndex].value, \''+prefx+'\');" id="welcomeHotel_room'+j+'Child">';
			
                for(i=0; i<=3; i++){
                    if(i == welcomehotelChildCount[roomCount]){
                        stext+='<option value="'+i+'" selected="selected">'+i+'</option>';
                    }else{
                        stext+='<option value="'+i+'">'+i+'</option>';
                    }			
                }
			
                stext+='</select>';
                stext+='</div>';                          
                stext+='</div>';		
                stext+='</div>';
            }
        }
        $("#welcomeselect_hotel_rooms").append(stext);
        welcomeHotelRoomCount = parseInt(roomCount);
    }else{
        for(i=welcomeHotelRoomCount; i>roomCount; i--){
            $('#welcometable_room_' + i).remove();
            welcomeHotelRoomCount = roomCount;
        }
    }
		
}

weclomeChildCount = 0;
function addHotelWelcomeChilds(count){
    //document.getElementById("numberOfRoom").value;
    //alert(hotelRooms);
    var stext='';	
    var pref = 'welcome';
    var roomNumber = 1;

    if(eval(weclomeChildCount) < count){		
        for(i=weclomeChildCount; i<=count; i++){
            if(i != weclomeChildCount){
                if(document.getElementById(pref+'room'+ roomNumber + 'ChildCount_'+ i)){
                }
                else{
                    stext+='<div class="fl marginR10" id="'+pref+'room' + roomNumber + 'ChildCount_'+ i +'">';
                    if(roomNumber == 1){
                        stext+='<label class="reset">Child ' + i + '</label>';
                        stext+='<div class="stylize-select hotel-rac">';
                    }else
                        stext+='<div class="stylize-select hotel-rac">';
                    stext+='<select id="'+pref+'room'+roomNumber+'child'+i+'age" name="'+pref+'room'+roomNumber+'child'+i+'age" id="'+pref+'room'+roomNumber+'child'+i+'age">';
                    stext+='<option value="0">&lt;1</option><option value="1">1</option><option value="2">2</option><option selected="" value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option>';
                    stext+='</select>';
                    stext+='</div>';
                    stext+='</div>';
                }
                weclomeChildCount++;
            }
        }
        $("#welcomeRoom1Children").append(stext);		
    }else{
        for(i=weclomeChildCount; i>count; i--){
            $("#"+pref+"room" + roomNumber + "ChildCount_" + i).remove();
            weclomeChildCount--;
        }
    }		
}

function showHotelRooms(){
    $("#hotelGuestCount").hide();
    $("#bookselect_hotel_rooms").show();
}

/* Minimize/Maximize panel function */
/* Minimize/Maximize My Trip function */
/*Aayushi narula | 24-June-2012*/
var docMTPositionY=350;
var docTripBottom = false;
var dockTripPosition = false;
var panelTripPositionY = false;
function toggleTripDock(opt){	
    if(opt == 'max'){
        if(dockTripPosition == false){
            $("#my_trip_inner").fadeOut(function(){
                //$("#my_trip_wrapper .gradientBlack").css("border-radius", 0);
                $("#my_trip_inner").width($(window).width()-50);
                $("#my_trip_wrapper").offset({
                    top:0
                });
                $("#my_trip_wrapper").offset({
                    left:0
                });	
                $("#my_trip_wrapper .gradientBlack").css("padding", "80px 0px 5px 0px");
                $('#mytrippanelsysmenu .maximize_action').show();
                //				$("#my_trip_wrapper").height('auto');				
                $("#my_trip_inner").fadeIn();	
							
                dockTripPosition = true;
                panelTripPositionY = true;	
            });
            $('#mytrippanelsysmenu .maximize_action').addClass('maximize_action_active');
            docTripBottom = false;
            $('#mytrippanelsysmenu .minimize_action').removeClass('maximize_action_active');
			
        }else{
            restorTripPanel();
        }
    }else{
        if(docTripBottom == false)
                
        {
            $("#my_trip_wrapper").offset ({
                top: $(window).height() - 68
            });
            $("body").css("overflow", "hidden");
            $("#my_trip_inner .gradientBlack").css("border-radius", 5);
            $("#my_trip_inner .gradientBlack").css("padding","5 0 0");
            $("#my_trip_inner").width($(window).width()-50);
            if(dockTripPosition == true){
                $("#my_trip_wrapper").offset({
                    top:445
                });
                $("#my_trip_wrapper .gradientBlack").css("padding-top",5);
                $("#my_trip_wrapper .gradientBlack").css("border-radius", 5);
            }
            $("#my_trip_wrapper").offset({
                left: 3
            });		
            //$("#my_trip_inner .gradientBlack").css("padding-top",5);
            $('#mytrippanelsysmenu  .minimize_action').addClass('maximize_action_active');
            $('#zoomcontrols').animate({
                bottom: 84
            }, 1000);
            docTripBottom = true;
            panelTripPositionY = false;	
            dockTripPosition=false;					
        }else{
            if(dockTripPosition == true && panelTripPositionY == false){
                docTripBottom = false;
                dockTripPosition = false;
                $('#mytrippanelsysmenu  .minimize_action').removeClass('maximize_action_active');
                $('#mytrippanelsysmenu  .maximize_action').removeClass('maximize_action_active');
                calltoggleTripDock('max');
            }else{
                restorTripPanel();	
            }
        }
    }
	
}

function calltoggleTripDock(type){
    toggleTripDock(type);
}
/* Function to restore position of panels */
function restorTripPanel(){
    dockTripPosition = false;
    docTripBottom = false;
    panelTripPositionY = false;
    $('#mytrippanelsysmenu  .minimize_action').removeClass('maximize_action_active');
    $('#mytrippanelsysmenu  .maximize_action').removeClass('maximize_action_active');
	
    $("#my_trip_inner").fadeOut(function(){
        $("#my_trip_wrapper .gradientBlack").css("border-radius", 5);
        $("#my_trip_wrapper .gradientBlack").css("padding", "5px 0 5px 0");
        $("#my_trip_inner").width($(window).width()-50);
        $("#my_trip_wrapper").offset({
            top:docMTPositionY
        });
        $("#my_trip_wrapper").offset({
            left:3
        });		
        //$("#my_trip_wrapper .gradientBlack").css("padding-top", 5);
        //$("#cityInfoScreen .close").show();
        $("body").css("overflow-y", "auto");
        $('#zoomcontrols').animate({
            bottom: 32
        },1000);
        $("#my_trip_inner").fadeIn();
    });
	
}

/* Minimize/Maximize Friend Trip function */
/*Aayushi narula | 24-June-2012*/

var docFTPositionY=350;
var docFTBottom = false;
var dockFTPosition = false;
var panelFTPositionY = false;
function toggleFTDock(opt){	
    if(opt == 'max'){
        if(dockFTPosition == false){
            $("#friend_trip_inner").fadeOut(function(){
                //$("#friend_trip_wrapper .gradientBlack").css("border-radius", 0);
                //$("#friend_trip_inner").width(1310);
                $("#friend_trip_inner").width(1330);
                $("#friend_trip_wrapper").offset({
                    top:0
                });
                $("#friend_trip_wrapper").offset({
                    left:0
                });	
                $("#friend_trip_wrapper .gradientBlack").css("padding", "50px 0px 5px 0px");
                $('#friendtrippanelsysmenu .maximize_action').show();
                //				$("#my_trip_wrapper").height('auto');				
                $("#friend_trip_inner").fadeIn();	
							
                dockFTPosition = true;
                panelFTPositionY = true;	
            });
            $('#friendtrippanelsysmenu .maximize_action').addClass('maximize_action_active');
            docFTBottom = false;
            $('#friendtrippanelsysmenu .minimize_action').removeClass('maximize_action_active');
			
        }else{
            restoreFTPanel();
        }
    }else{
        if(docFTBottom == false)
        {
            $("#friend_trip_wrapper").offset ({
                top: $(window).height() - 68
            });
            $("body").css("overflow", "hidden");
            $("#friend_trip_inner .gradientBlack").css("border-radius", 5);
            $("#friend_trip_inner .gradientBlack").css("padding","5 0 0");
            $("#friend_trip_inner").width($(window).width()-50);
            if(dockFTPosition == true){
                $("#friend_trip_wrapper").offset({
                    top:445
                });
                $("#friend_trip_wrapper .gradientBlack").css("padding-top",5);
                $("#friend_trip_wrapper .gradientBlack").css("border-radius", 5);
            }
            $("#friend_trip_wrapper").offset({
                left: 3
            });		
            //$("#my_trip_inner .gradientBlack").css("padding-top",5);
            $('#friendtrippanelsysmenu .minimize_action').addClass('maximize_action_active');
            $('#zoomcontrols').animate({
                bottom: 84
            }, 1000);
            docFTBottom = true;
            panelFTPositionY = false;	
            dockFTPosition=false;					
        }else{
            if(dockFTPosition == true && panelFTPositionY == false){
                docFTBottom = false;
                dockFTPosition = false;
                $('#friendtrippanelsysmenu .minimize_action').removeClass('maximize_action_active');
                $('#friendtrippanelsysmenu .maximize_action').removeClass('maximize_action_active');
                calltoggleFTDock('max');
            }else{
                restoreFTPanel();	
            }
        }
    }
	
}

function calltoggleFTDock(type){
    toggleFTDock(type);
}
/* Function to restore position of panels */
function restoreFTPanel(){
    dockFTPosition = false;
    docFTBottom = false;
    panelFTPositionY = false;
    $('#friendtrippanelsysmenu .minimize_action').removeClass('maximize_action_active');
    $('#friendtrippanelsysmenu .maximize_action').removeClass('maximize_action_active');
	
    $("#friend_trip_inner").fadeOut(function(){
        $("#friend_trip_inner .gradientBlack").show();
        $("#friend_trip_wrapper .gradientBlack").css("border-radius", 5);
        $("#friend_trip_wrapper .gradientBlack").css("padding", "5px 0 5px 0");
        $("#friend_trip_inner").width($(window).width()-50);
        $("#friend_trip_wrapper").offset({
            top:docFTPositionY
        });
        $("#friend_trip_wrapper").offset({
            left:3
        });		
        //$("#friend_trip_wrapper .gradientBlack").css("padding-top", 5);
        //$("#cityInfoScreen .close").show();
        $("body").css("overflow-y", "auto");
        $('#zoomcontrols').animate({
            bottom: 32
        },1000);
        $("#friend_trip_inner").fadeIn();
    });
}

/*function getCarPicLocationWC(){						  		//commented on 10-10-12,moved to document.ready
	if($('#WCpic_location').val() == "Select a Location"){
		if(document.getElementById("WCpic_location"))
			document.getElementById("WCpic_location").value ="";
	}
	var a = $('#WCpic_location').autocomplete1({ 
			serviceUrl:'/feed/carlocationsuggest/',
			minChars:2, 
			maxHeight:400,
			width:200,
			zIndex: 9999,
			noCache: false, //default is false, set to true to disable caching
			onSelect: function(value, data){ 
				document.getElementById("WCdrop_location").value = data.loc_airport_country;
				document.getElementById("hdn_WCpic_location").value=data.location_name+'@'+data.location_city;
				document.getElementById("hdn_WCdrop_location").value=data.location_name+'@'+data.location_city;
				if(data.is_book_panel == 1){
					is_welcome_book_panel = data.is_book_panel;
					welcome_book_panel_city_id = data.geo_city_id;
					welcome_pushpin_data = data;
				}else{
					is_welcome_book_panel = 0;
					welcome_book_panel_city_id = 0;
					welcome_pushpin_data = '';
				}
		    }	
	});
}
*/
/*function getCarDropLocationWC(){											//commented on 10-10-12,code moved to document.ready
	if($('#WCdrop_location').val()=="Select a Location"){
		if(document.getElementById("WCdrop_location")){
			document.getElementById("WCdrop_location").value ="";
		}
	}
	var a = $('#WCdrop_location').autocomplete1({ 
			serviceUrl:'/feed/carlocationsuggest/',
			minChars:2, 
			maxHeight:400,
			width:200,
			zIndex: 9999,
			noCache: false, //default is false, set to true to disable caching
			onSelect: function(value, data){ 
				document.getElementById("hdn_WCdrop_location").value = data.location_name+'@'+data.location_city;
				if(data.is_book_panel == 1){
					is_welcome_book_panel = data.is_book_panel;
					welcome_book_panel_city_id = data.geo_city_id;
					welcome_pushpin_data = data;
				}else{
					is_welcome_book_panel = 0;
					welcome_book_panel_city_id = 0;
					welcome_pushpin_data = 0;
				}
			}
	});
}
*/
function getHotelLocationWC(){
    if($('#welcomeCarCity').val()=="Select a location"){
        if(document.getElementById("welcomeCarCity"))
            document.getElementById("welcomeCarCity").value ="";
    }
    var a = $('#welcomeCarCity').autocomplete1({ 
        serviceUrl:'/feed/hotelcitysuggest/',
        minChars:2, 
        maxHeight:400,
        width:200,
        zIndex: 9999,
        noCache: false, //default is false, set to true to disable caching
        onSelect: function(value, data){ 
            //var result = data;
            is_welcome_book_panel = data.is_book_panel;
            welcome_book_panel_city_id = data.geo_city_id;
            welcome_pushpin_data = data;

        }
    });
}

/*function getFlightLocationWC(){							// Commented on 10-10-12, added the code in document.ready and its input box code.
	if($('#Wf1').val()=="Enter a City or Airport"){
		if(document.getElementById("Wf1"))
			document.getElementById("Wf1").value ="";
	}
	var a = $('#Wf1').autocomplete1({ 
			serviceUrl:'/feed/airport-suggest/',
			minChars:2, 
			maxHeight:400,
			width:200,
			zIndex: 9999,
			noCache: false, //default is false, set to true to disable caching
			onSelect: function(value, data){
				flight_pushpin_data = data;
			}	
	});
}
*/
/*function getFlightDestinationLocationWC(){			//Commented on 10-10-12, code moved to document.ready.
	if($('#Wfd1').val()=="Enter a City or Airport"){
		if(document.getElementById("Wfd1")){
			document.getElementById("Wfd1").value ="";
		}
	}
	var a = $('#Wfd1').autocomplete1({ 
			serviceUrl:'/feed/airport-suggest/',
			minChars:2, 
			maxHeight:400,
			width:200,
			zIndex: 9999,
			noCache: false, //default is false, set to true to disable caching
			onSelect: function(value, data){ 
				if(data.is_book_panel == 1){
					is_welcome_book_panel = data.is_book_panel;
					welcome_book_panel_city_id = data.geo_city_id;
					welcome_pushpin_data = data;
				}else{
					is_welcome_book_panel = 0;
					welcome_book_panel_city_id = 0;
					welcome_pushpin_data = '';
				}				
			}	
	});
}
*/
function checkUserFriend(friendId){
    $.ajax({
        url:'/html5/geo/checkuserfriend/ufid/'+friendId+'/sid/' + parseInt(Math.random() * 99999999),
        async: false,  
        success:function(data){ 
            isuserfriend = data;
        //return (data);
        }
    });
}

function verticalCenter(id){
    var obj = $("#" + id);
    obj.css('top', $(document).height() - (obj.height()/2));
}

function getNoOfPDs(){
    var docwidth = $(document).width();
    var numOfPDs = (docwidth - (675 + 130 + 170)) / 100
    //console.log("Number of items that can be fit in PDs: " + parseInt(numOfPDs));
    return parseInt(numOfPDs);
}

function hotelCityMap(cityId){
    var url='/html5/hotelbook/hotelmapcity/cityId/'+cityId;
    $.get(url, function(result) {	
        if(result==0){
            document.getElementById("HotelCity").value="Select a City";
        }else{
            document.getElementById("HotelCity").value=result;
            $('#HotelCity').addClass('selected');
        }
    });	
}

function hostelCityMap(cityId){
    var url='/html5/hostel/hostelmapcity/cityId/'+cityId;
    $.get(url, function(result) {	
        if(result==0){
            document.getElementById("hostel-city").value="Select a Location";
        }else{
            document.getElementById("hostel-city").value=result;
        }
    });
	
}

function activityCityMap(cityId){
    var url='/html5/viator/activitymapcity/cityId/'+cityId;
    $.get(url, function(result) {	
        if(result==0){
            document.getElementById("activity_location").value="Select a Location";
        }else{
            result=result.split('|');
            document.getElementById("activity_location").value=result[0];
            $('#viator_category').html('<img src="/images/loader_10x10.gif" alt="Loading Categories..." style="margin:10px 5px; height:15px;" />');
            viatorActivityDestId=result[1];
            searchActivityForm(result[1]);
        }
    });
	
}

function openViatorBooking(){
    abortAjax();
    showVectorMap();  
    $("#result-detail_activity").hide();
    $("#activitySearch").show();  
    $("#activitySearchResults").hide();
    $("#activityDetailCont").hide();  
    $('#bActivitiesBtnBTR').hide();
    $("#ActivitysortBy").hide();
    $("#searchBarViator").hide();
    $(".bActivitiesBtnBTR").hide();
}//end of function openViatorBooking

function checkTripFlag(){
    zoomTo100();
    //console.log(friendTripFlag);
    if(friendTripFlag == true){
        $('#rootvectormap').vectorMap('set','hideAllPin',1);
        closeFriendsTripPanel(false); 
    }
    //$("#topbar-wrap").show();
    //showhideTopBar('show');
    //if(global_trip_id!=''){
    //            tripIdForPanelSwitch = global_trip_id;
    //    }else{
    //            tripIdForPanelSwitch = $('#tripPlaceId').val();
    //    }
    // commented for welcome change nothing to load Parveen
    //showTripPushPin(parseInt(tripIdForPanelSwitch));

    abortAjaxCall();
    $('.rightPanel').hide();//added by dev AN
    //if($('.rightPanel').is(":visible") == false){
    //  $('.rightPanel').show();
    //}
    FB.getLoginStatus(handleFbLoginStatus);
}//end of checkTripFlag function

function TryParseInt(str,defaultValue){
    var retValue = defaultValue;
    if(typeof str != 'undefined' && str!=null && str.length>0){
        if (!isNaN(str)){
            retValue = parseInt(str);
        }
    }
    return retValue;
}

function resize_countrypage(){
    //console.log("resize countrypage");
    var allImages = $(".allImages li");
    var n = allImages.length;
    var nW = allImages.width();
    var nH = allImages.height();
    var col=0;
    var currentImgContW;	
    var rW = $(".allImages").width();
    var gridWidthContn = $(window).width()- 445;
    $('#countryPageLeftWrap').css('width',gridWidthContn);
    if(n==1){//1920(1513)
        col = 0;
        $(".currentImage").css({
            "width":gridWidthContn
        });
    }
    else if(n==4){//1920(1513)
        col = 1;
    }	
    else if(n==8){//1920(1513)
        col = 2;
    }	
    else if(n==12){//1920(1513)
        col = 3;
    }	
    else if(n==16){//1920(1513)
        col = 4;
    }
    else if(n==20){//1920(1513)
        col = 5;
    }
	
    createHtmlForCountryPhotos(col,nW,nH);
    rW = $(".allImages").width();
    currentImgContW = parseInt(gridWidthContn - rW);//alert(rH);
	
    if( currentImgContW < 250 ){
        if (col >=1){
            col = col-1;
        }
        createHtmlForCountryPhotos(col,nW,nH);
    }
    rW = $(".allImages").width();
    currentImgContW = parseInt(gridWidthContn - rW);//alert(rH);
	
    if( currentImgContW < 250 ){
        if (col >=1){
            col = col-1;
        }
        createHtmlForCountryPhotos(col,nW,nH);
    }
	
    rW = $(".allImages").width();
    currentImgContW = parseInt(gridWidthContn - rW);//alert(rH);
	
    if( currentImgContW < 250 ){
        if (col >=1){
            col = col-1;
        }
        createHtmlForCountryPhotos(col,nW,nH);
    }
}

function createHtmlForCountryPhotos(col,allImagesW,allImagesH)
{
    var gridWidthContn = $(window).width()- 445;
    //var gridWidthContn = $(window).width()- 445; //alert (gridWidthContn); 
    //alert ( $('#countryPageLeftWrap').width());
	
    var currentImgContW;
    if (col==0){
        $(".allImages").css({
            "display":"none"
        });
    }else{
        $(".allImages").css({
            "display":"inline-block"
        });
        $(".allImages").css({
            "width":(parseInt(6*col))+(parseInt(allImagesW*col))
        });
    }
	
    var rW = $(".allImages").width();
    var rH = (parseInt(4*4))+(parseInt(allImagesH*4));
    currentImgContW = parseInt(gridWidthContn - rW - 5);//alert(rH);
    //console.log("col:"+col+"  allImagesW:"+allImagesW+"   allImagesH:"+allImagesH + "  currentImgContW:"+currentImgContW);
    if (col==0){
        $(".currentImage").css({
            "width":currentImgContW, 
            "height":"450px", 
            "text-align":"center"
        });
    }else{
        $(".currentImage").css({
            "width":currentImgContW, 
            "height":rH, 
            "text-align":"center"
        });
    }
    wM = $('.allImages').width();
    currentImgContW = parseInt(gridWidthContn - wM);//alert(rH);
    //console.log("currentImgContW:"+currentImgContW);
    if( currentImgContW < 250 ){
        if (col >=1){
            col = col-1;
            createHtmlForCountryPhotos(col,allImagesW,allImagesH);
        }
    }
}

<!--Created by Aayushi Narula | 18 sept| for filling Other city field in All booking forms-->
function addOtherCity(formID,value)//general function to add other city filed in the booking forms.
{
    switch(formID)
    {
        case 1://activities 
            if(value=='Other') $("#other_city_field").show();
            else $("#other_city_field").hide();
            break;
        case 2://hotel 
            if(value=='Other') $("#other_city_hotel").show();
            else $("#other_city_hotel").hide();
            break;
        case 3://Car 
            if(value=='Other') $("#other_city_car").show();
            else $("#other_city_car").hide();
            break;
				
        default:
            break;
    }
}

/* Shifted to bookpanel.js on 24June213 dev AN 
function changeState(value){
    var url='/html5/viator/gettelecode/code/'+value;
    $.get(url, function(fsdata) {
        if(fsdata==0){
            document.getElementById("mobcountrycode").value='';
        }
        else{
            if(fsdata.indexOf('-') !== -1 || fsdata.indexOf('+') !== -1)
                document.getElementById("mobcountrycode").value=fsdata;
            else{
                document.getElementById("mobcountrycode").value='+'+fsdata;
            }
        }
    });						
    if(value=='US'){
        var stext='';
        stext+='<select name="state" id="billing_state" style="width:198px;" class="styled">';
        stext+='<option value="">Select State</option><option value="AL">Alabama</option><option value="AK">Alaska</option><option value="AZ">Arizona</option><option value="AR">Arkansas</option><option value="CA">California</option><option value="CO">Colorado</option><option value="CT">Connecticut</option><option value="DE">Delaware</option><option value="DC">District of Columbia</option><option value="FL">Florida</option><option value="GA">Georgia</option><option value="HI">Hawaii</option><option value="ID">Idaho</option><option value="IL">Illinois</option><option value="IN">Indiana</option><option value="IA">Iowa</option><option value="KS">Kansas</option><option value="KY">Kentucky</option><option value="LA">Louisiana</option><option value="ME">Maine</option><option value="MD">Maryland</option><option value="MA">Massachusetts</option><option value="MI">Michigan</option><option value="MN">Minnesota</option><option value="MS">Mississippi</option><option value="MO">Missouri</option><option value="MT">Montana</option><option value="NE">Nebraska</option><option value="NV">Nevada</option><option value="NH">New Hampshire</option><option value="NJ">New Jersey</option><option value="NM">New Mexico</option><option value="NY">New York</option><option value="NC">North Carolina</option><option value="ND">North Dakota</option><option value="OH">Ohio</option><option value="OK">Oklahoma</option><option value="OR">Oregon</option><option value="PA">Pennsylvania</option><option value="RI">Rhode Island</option><option value="SC">South Carolina</option><option value="SD">South Dakota</option><option value="TN">Tennessee</option><option value="TX">Texas</option><option value="UT">Utah</option><option value="VT">Vermont</option><option value="VA">Virginia</option><option value="WA">Washington</option><option value="WV">West Virginia</option><option value="WI">Wisconsin</option><option value="WY">Wyoming</option></select>';
        $('#province_state').show();//div p
        $("#viator_states").html(stext);//stylise div
        $('#other_province_state').hide();//div p
    }
    else if(value=='AU'){
        var stext='';
        stext+='<select name="state" id="billing_state" style="width:198px;" class="styled">';
        stext+='<option value="">Select State</option><option value="ACT">Australian Capital Territory</option><option value="NSW">New South Wales</option><option value="NT">Northern Territory</option><option value="QLD">Queensland</option><option value="SA">South Australia</option><option value="TAS">Tasmania</option><option value="VIC">Victoria</option><option value="WA">Western Australia</option></select>';
        $('#province_state').show();
        $("#viator_states").html(stext);
        $('#other_province_state').hide();
    }
    else if(value=='CA'){
        var stext='';
        stext+='<select name="state" id="billing_state" style="width:198px;" class="styled">';
        stext+='<option value="">Select Province</option><option value="Alberta">Alberta</option><option value="British Columbia">British Columbia</option><option value="Manitoba">Manitoba</option><option value="New Brunswick">New Brunswick</option><option value="Newfoundland and Labrador">Newfoundland</option><option value="Northwest Territories">Northwest Territories</option><option value="Nova Scotia">Nova Scotia</option><option value="Nunavut">Nunavut</option><option value="Ontario">Ontario</option><option value="Prince Edward Island">Prince Edward Island</option><option value="Quebec">Quebec</option><option value="Saskatchewan">Saskatchewan</option><option value="Yukon">Yukon Territory</option></select>';
        $('#province_state').show();
        $("#viator_states").html(stext);
        $('#other_province_state').hide();
    }
    else{                       
        //getCities(value,1);                  
        $('#province_state').hide();
        $('#other_province_state').show();
        document.getElementById("billing_unlisted_state").value="";
    }
}


function changeStateOption(value){
    document.getElementById("billing_unlisted_state").value=value;
}

function changeTextBox(id,bandId){
    document.getElementById("credit_card_firstname").value=document.getElementById("travelerfirstName"+id+"_"+bandId).value;
    document.getElementById("credit_card_lastname").value=document.getElementById("travelerlastName"+id+"_"+bandId).value;
}

function changeFirstNameSelected(id,bandId){
    if(document.getElementById("leadTravellerIndex"+id)!=null && document.getElementById("leadTravellerIndex"+id).checked){
        document.getElementById("credit_card_firstname").value=document.getElementById("travelerfirstName"+id+"_"+bandId).value;
    }
}

function changeLastNameSelected(id,bandId){
    if(document.getElementById("leadTravellerIndex"+id)!=null && document.getElementById("leadTravellerIndex"+id).checked){
        document.getElementById("credit_card_lastname").value=document.getElementById("travelerlastName"+id+"_"+bandId).value;
    }
}
*/

function updateTripInfoForAllPlaces(pushPinType, pushpinData, tabtype){
    try{
        if(welcome_pushpin_data != ''){
            if(pushPinType == 'O'){
                var data = flight_pushpin_data;
                var pushPinColor = 'green';
            }else if((pushPinType == 'D') || (pushPinType == 'P')){
                var data = welcome_pushpin_data;
                var pushPinColor = 'blue';
                var ispushpin = map.IsPushpinExist(data.geo_city_id);
                if (ispushpin != false){
                    if (ispushpin.indexOf("multi-dest-pushpin") >=0 || ispushpin.indexOf("multi-dest-pushpin") >=0){
                        if (destPushPinCounter >= 6){
                            return;
                        }else{
                            if (typeof tabtype != 'undefined'){
                                if (tabtype != "flight") return;
                            }else {
                                return;
                            }
                        }
                    }
                }				
                if(typeof(map.multiDestArr) != 'undefined'){
                    if (map.multiDestArr.length == 1){
                        map.refreshMultiDestArr();
                    }
                }
            }            
            if(data!=''){
                if(data.geo_city_id!=0){
                    map.updateCityStatus(data.geo_city_id, "", pushPinType, data);
                }
            }//end of if block
        }else if((pushpinData != '') && (typeof pushpinData != 'undefined')){
            var data = pushpinData;
            if(data.geo_city_id!=0){                
                map.updateCityStatus(data.geo_city_id, "", pushPinType, data);
            }
        }//end of else if block
    }catch(err){}	
}//end of function updateTripInfoForAllPlaces

function abortAjaxCall(){
    if( hotelAlreadyLoad != null ) {
        hotelAlreadyLoad.abort();
        hotelAlreadyLoad = null;
    }
}//end of function abortAjaxCall

function hideFbFacePile(){
    $("#header").removeClass('welcomeHeader');
    $("#facepile_div").hide();
}//end of function hideFbFacePile

function deletePushPinPopup(key, pushpin, id){
    if(pushpin != 'All'){
        var CityName = map.pushpins[key].data.n;
        $('#delete_city_pushpin').html(CityName);
    }
    $( "#"+id ).dialog({
        resizable: false,
        draggable: false,
        height:110,
        width:380,
        dialogClass:'georama_dialog GeoramaLoginClose',
        modal: true,
        buttons: {
            "Yes": function() {
                $( this ).dialog( "close" );
                if(key != '' && pushpin == ''){
                    map.deletePushPinInfo(key); //to delete single pushpin
                }else if(key != '' && parseInt(pushpin) >= 0){
                    map.deleteSingleDestInfo(key,pushpin); //to delete single pushpin
                }else if(key == '' && pushpin == 'All'){
                    //to delete all pushpins
                    map.ungroupCityNames();
                    deleteAllTripParts();
                    map.refreshMultiDestArr();
                    map.updateTripNavigationBar("A", "");
                }//end of if block
                if((id == 'delete-pushpin-popup') && ($("#frmAddEditTrip").is(':visible'))){
                    getPotientialDestination(global_trip_id);
                }
            },
            "No": function() {
                $( this ).dialog( "close" );
            }
        },
        open: function(event, ui){
            //resetDialogZIndex();
            $(document).bind('scroll',function () { 
                window.scrollTo(0,0);
                $( ".ui-widget.ui-dialog" ).css({
                    'top':'280px'
                });
            });
        },
        close: function(event, ui){ 
            $(document).unbind('scroll'); 
        }	
    });
}/*End of deletePushPinPopup Function*/

function deleteMultiPushPinPopup(key, pushpin, id, showOrg){    
    if(showOrg == "O"){
        var setHt = 280;
    }else{ 
        var setHt = 200;
    }
    $( "#"+id ).dialog({
        resizable: false,
        draggable: false,
        width:490,
        height:setHt,
        dialogClass:'georama_dialog',
        modal: true,
        buttons: {
            "Yes": function() {
                $( this ).dialog( "close" );
                if(key != '' && pushpin == ''){
                    map.deleteSelMultiDestInPopUp(key);
                }//end of if block                
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        },
        open: function(event, ui){
            //resetDialogZIndex();
            $(document).bind('scroll',function () { 
                window.scrollTo(0,0);
                $( ".ui-widget.ui-dialog" ).css({
                    'top':'280px'
                });
            });
        },
        close: function(event, ui){ 
            $(document).unbind('scroll'); 
        }	
    });
}/*End of deleteMultiPushPinPopup Function*/

function validateMultiCitySearData(param){
    if(param == 'welcome'){
        var cities = document.getElementsByName("multicityHdn[]");
        var from = 'multicityHdn_from';
        var to = 'multicityHdn_to';
    }else{
        var cities = document.getElementsByName("multicityBookHdn[]");
        var from = 'multicityBookHdn_from';
        var to = 'multicityBookHdn_to';
    }
    var strPins="";
    var orgCityId="";
    map.refreshMultiDestArr();
    for(var i=1; i<=cities.length; i++){
        var Origin = $("#"+from+i).data('cityData');        
        var Destination = $("#"+to+i).data('cityData');
        //console.log(Origin);
        //		console.log("/////////////////////////");
        //		console.log(Destination);
        if(typeof(Origin) != 'undefined' && typeof(Destination) != 'undefined' ){
            if (Origin.geo_city_id == Destination.geo_city_id && Origin.airportId == Destination.airportId){
                return false;
            }
        }
    }
    return true;
}

function plotFlightMultiCityPushpin(param){
    var cities = '';
    if(param == 'welcome'){
        cities = document.getElementsByName("multicityHdn[]");
        var from = 'multicityHdn_from';
        var to = 'multicityHdn_to';
    }else{
        cities = document.getElementsByName("multicityBookHdn[]");
        var from = 'multicityBookHdn_from';
        var to = 'multicityBookHdn_to';
    }
    map.hideAllYellowPushpin();
	
    var strPins="";
    var orgCityId="";
    map.refreshMultiDestArr();
    for(var i=1; i<=cities.length; i++){
        var Origin = $("#"+from+i).data('cityData');        
        var Destination = $("#"+to+i).data('cityData');
		
        if(typeof(Origin) != 'undefined'){
            try{
                var result = $("#"+from+i).data();
                var data = result.cityData;
                var isValidOrg = true;
                if (i>1){
                    // validate issue when we type manual same city in 'from field' as previous 'to field' city.
                    var LastDestination = $("#"+to+(i-1)).data('cityData');
                    if (LastDestination.geo_city_id == data.geo_city_id){
                        isValidOrg = false;
                    }
                }
                if (isValidOrg == true){
                    if(i == 1){  
                        orgCityId = data.geo_city_id;           
                        var pushpinColor = "green";
                    }else{
                        var pushpinColor = "blue"; 
                        if (map.addNewMultiDesination(data.geo_city_id) == false){
                            pushpinColor = "white";
                        }else{
                            map.changeTabForNewDestination(data.geo_city_id);
                        }
                    //alert("OD:"+destPushPinCounter + "/"+map.multiDestArr);
                    }
                    if (strPins.indexOf("~"+data.geo_city_id+"!")<0){
                        $('#rootvectormap').vectorMap('set', 'label', {
                            "n":data.geo_city_name,
                            "c":data.geo_country_code.toLowerCase(),
                            "d":'',
                            "lat":data.geo_lat,
                            "lon":data.geo_lon, 
                            "pin":1, 
                            "pcolor":pushpinColor, 
                            "key":data.geo_city_id, 
                            "l":5, 
                            "latVar":0, 
                            "lonVar":0
                        });
                    }
                    strPins += "~"+data.geo_city_id+"!";
                }
            }catch(e){                
            }
        }//end of if block
        if(typeof(Destination) != 'undefined'){
            try{
                var result = $("#"+to+i).data();
                var data = result.cityData;
                var pushpinColor = "blue"; 
                if (map.addNewMultiDesination(data.geo_city_id) == false){
                    pushpinColor = "white";
                }else{
                    map.changeTabForNewDestination(data.geo_city_id);
                }
				
                //alert("D:"+destPushPinCounter + "/"+map.multiDestArr);
                if (strPins.indexOf("~"+data.geo_city_id+"!")<0){
                    $('#rootvectormap').vectorMap('set', 'label', {
                        "n":data.geo_city_name,
                        "c":data.geo_country_code.toLowerCase(),
                        "d":'',
                        "lat":data.geo_lat,
                        "lon":data.geo_lon, 
                        "pin":1, 
                        "pcolor":pushpinColor, 
                        "key":data.geo_city_id, 
                        "l":5, 
                        "latVar":0, 
                        "lonVar":0
                    })
                }
                strPins += "~"+data.geo_city_id+"!";
            }catch(e){                
            }
        }//end of if block
    }//end of for loop
    map.resetPushPinColorExcept(strPins, "");
    map.updateTripNavigationBar("A", "");
    //	map.drawTrajectory();
    setTimeout(function(){
        map.drawTrajectory();					
    }, 2000);
}//end of function plotFlightMultiCityPushpin

function html5_storage_support() {
    try {
        return 'localStorage' in window && window['localStorage'] == null;
    } catch (e) {
        return false;
    }//end of catch block
}//end of function html5_storage_support
function clearLocal() {
    clear: localStorage.clear(); 
return false;
}//end of function clearLocal


idleTime = 0;
$(document).ready(function () {
    //Increment the idle time counter every minute.
    var idleInterval = setInterval("timerIncrement()", 60000); // 1 minute

    //Zero the idle timer on mouse movement.
    $(this).mousemove(function (e) {
        idleTime = 0;
    });
    $(this).keypress(function (e) {
        idleTime = 0;
    });
})

function timerIncrement() {
    idleTime = idleTime + 1;    
    if (idleTime > 59) { // 60 minutes
        //alert('Refreshing');
        loggedInCacheClear();
        
        /** disable the click event while page is loading**/
        $('a').each(function(){
            $(this).unbind('click');
            $(this).attr('onclick','javascript:void(0)');                        
        });

    /** disable the click event while page is loading**/
    //window.location.reload();
    }//end of if block
}//end of function timerIncrement

function setFrienddetail(){
    var frnd_detail = (parseInt($(document).width()));
    if(frnd_detail > 1280){
        frnd_detail = frnd_detail - 1050 ;
    }else{
        frnd_detail = 380;
    } 
    if(frnd_detail > 600){
        frnd_detail = 600;
    }
    $(".friendwall").width(frnd_detail);
}

/*dev AN- 29/01/13*/
/*function resizeInfoPanelGrid(){
	$("#aboutLeftWrap").width($(document).width()- 390);
	var leftWidth = $("#aboutLeftWrap").width();
	var gridWidtb;
	var wr = $('#additionalinfo').width(); //alert (wr);
	var wM = $('.aboutGridPhotos').width(); //alert (wM);
	$('#aboutInfoDP').css({"width":wr-wM-8, "float":"left", "height":"303px", "display":"block"});//alert (wM.width());
	var image;
       	if(leftWidth<=1000){//1366(959) resolution
		$('.aboutGridPhotos').css({"max-width":"485px"});
		$('.resizable').each(function(){this.width= 90;});
                gridWidtb= parseInt((leftWidth - 450)/90);
		$('.aboutGridPhotos').width((parseInt(gridWidtb*90))+(parseInt(gridWidtb*6)));
		
	}
	else if(leftWidth>1000 && leftWidth<=1180){// 1440(1033) 
		$('.aboutGridPhotos').css({"max-width":"700px"});
		gridWidtb= parseInt((leftWidth - 480)/100);
		$('.resizable').each(function(){this.width= 100;});
		$('.aboutGridPhotos').width((parseInt(gridWidtb*100))+(parseInt(gridWidtb*6)));
	} 
	else if(leftWidth>1180 && leftWidth<=1320){//1600(1195)1680(1273) 
		$('.aboutGridPhotos').css({"max-width":"735px !important"});
		gridWidtb= parseInt((leftWidth - 520)/130);
		$('.resizable').each(function(){this.width= 120;});
		$('.aboutGridPhotos').width((parseInt(gridWidtb*120))+(parseInt(gridWidtb*6)));//730
	}
	else if(leftWidth>1320 && leftWidth<=1520){//1920(1513)
		$('.aboutGridPhotos').css({"max-width":"900px !important"});
		gridWidtb= parseInt((leftWidth - 700)/160);
		$('.resizable').each(function(){this.width= 160;});
		$('.aboutGridPhotos').width((parseInt(gridWidtb*160))+(parseInt(gridWidtb*6)));
	}
}
*/

function resizeInfoPanelGrid(){
    $("#aboutLeftWrap").width($(window).width()- 385);
    var leftWidth = $("#aboutLeftWrap").width();
    var gridWidtb;
    var wM = $('.aboutGridPhotos').width();
    $('#aboutInfoDP').css({
        "width":leftWidth-wM-8, 
        "float":"left", 
        "height":"303px", 
        "display":"block"
    });
	
    $(".aboutGridPhotos li").css('width','90px');
    var allImages = $(".aboutGridPhotos li");
    var n = allImages.length;
    var nW = allImages.width();
    var nH = allImages.height();
    var col=0;
    var currentImgContW;
    $('#aboutLeftWrap').css('width',leftWidth);
    if(n>=1 && n < 4){//1920(1513)
        col = 0;
        $("#aboutInfoDP").css({
            "width":leftWidth
        });
    }
    else if(n>=4 && n < 8){//1920(1513)
        col = 1;
    }	
    else if(n>=8 && n < 12){//1920(1513)
        col = 2;
    }	
    else if(n>=12 && n < 16){//1920(1513)
        col = 3;
    }	
    else if(n>=16 && n < 20){//1920(1513)
        col = 4;
    }
    else if(n==20){//1920(1513)
        col = 5;
    }
    createHtmlForCityPhotos(col,nW,nH);
}

function createHtmlForCityPhotos(col,allImagesW,allImagesH)
{
     var leftWidth = $(window).width()- 385;
	
    var currentImgContW;
    if (col==0){
        $(".aboutGridPhotos").css({
            "display":"none", 
            "width":"0"
        });
    }else{
        $(".aboutGridPhotos").css({
            "display":"inline-block"
        });
        $(".aboutGridPhotos").css({
            "width":(parseInt(6*col))+(parseInt(allImagesW*col))
        });
    }
	
    var wM = $(".aboutGridPhotos").width();
    var rH = (parseInt(4*4))+(parseInt(allImagesH*4));
    currentImgContW = parseInt(leftWidth - wM - 5);
    if (col==0){
        $("#aboutInfoDP").css({
            "width":currentImgContW, 
            "height":"303px", 
            "text-align":"center"
        });
    }else{
        $("#aboutInfoDP").css({
            "width":currentImgContW, 
            "text-align":"center"
        });
    }
	
    wM = $('.aboutGridPhotos').width();
    currentImgContW = parseInt(leftWidth - wM);
    ;
    if( currentImgContW < 250 ){
        if (col >=1){
            col = col-1;
            createHtmlForCityPhotos(col,allImagesW,allImagesH);
        }
    }
}

function showTripItemsOnBingMap(isClear, tripData,mode){
    var tripId;
    tripId = global_trip_id;
    if(isClear == 1){
        $(this).mapOverlay(2);
    }else{
        isClear = 0;
    }
    var tripId = document.getElementById("tripPlaceId").value;
    bucketId = '';
    var tripPartId = document.getElementById("tripPartId").value;
    var recommand = 0;
    if(typeof tripId == 'undefined'){
        if(mode=='mytrip'){
            tripId = global_trip_id;
        }
        else if(mode=='friendtrip'){
            tripId = friend_global_trip_id;
        }
        
    }//end of if block
    if(tripId){
        if(tripPartId == '' || tripPartId == "undefined"){
            tripPartId = global_trip_part_id;
        }//end of if block
        if(explorePanelMode == 'friend'){
            recommand = 1;
        }//end of if block
        if(typeof tripId == 'undefined'){
            if(mode=='mytrip'){
                tripId = global_trip_id;
            }
            else if(mode=='friendtrip'){
                tripId = friend_global_trip_id;
            }
        }//end of if block        
        
        if((tripData != '') && (typeof(tripData) != 'undefined')){
            if(tripData.totalItems != 0){
                if(isClear == 1){                
                    setZoom(9);
                }
                plotMyTripItems(tripData, isClear,mode);
                $(this).mapOverlay("delete");
            }else{
                $(this).mapOverlay('delete');
            }//end of else block
        }else{
            var itemUrl ='/html5/mytrip/get-item-data/ti/'+tripId+'/bucket/' + bucketId+'/recommand/'+recommand+'/rand/' + parseInt(Math.random() * 99999999);
            $.getJSON(itemUrl, function(result) {                
                if(result.data.totalItems != 0){                
                    setZoom(9);
                    plotMyTripItems(result.data, isClear,mode);
                    $(this).mapOverlay("delete");
                }else{
                    $(this).mapOverlay('delete');
                    var isWidget = $("#my_trip_wrapper").is(':visible');
                    if(isWidget == true){
                        zoomTo100();
                    }
                }//end of else block
            });
        }
    }//end of if block
}//end of function showTripItemsOnBingMap


//code for base64 convertion
"use strict";
jQuery.base64=(function($){
    var _PADCHAR="=",_ALPHA="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",_VERSION="1.0";
    function _getbyte64(s,i){
        var idx=_ALPHA.indexOf(s.charAt(i));
        if(idx===-1){
            throw"Cannot decode base64"
        }
        return idx
    }
    function _decode(s){
        var pads=0,i,b10,imax=s.length,x=[];
        s=String(s);
        if(imax===0){
            return s
        }
        if(imax%4!==0){
            throw"Cannot decode base64"
        }
        if(s.charAt(imax-1)===_PADCHAR){
            pads=1;
            if(s.charAt(imax-2)===_PADCHAR){
                pads=2
            }
            imax-=4
        }
        for(i=0;i<imax;i+=4){
            b10=(_getbyte64(s,i)<<18)|(_getbyte64(s,i+1)<<12)|(_getbyte64(s,i+2)<<6)|_getbyte64(s,i+3);
            x.push(String.fromCharCode(b10>>16,(b10>>8)&255,b10&255))
        }
        switch(pads){
            case 1:
                b10=(_getbyte64(s,i)<<18)|(_getbyte64(s,i+1)<<12)|(_getbyte64(s,i+2)<<6);
                x.push(String.fromCharCode(b10>>16,(b10>>8)&255));
                break;
            case 2:
                b10=(_getbyte64(s,i)<<18)|(_getbyte64(s,i+1)<<12);
                x.push(String.fromCharCode(b10>>16));
                break
        }
        return x.join("")
    }
    function _getbyte(s,i){
        var x=s.charCodeAt(i);
        if(x>255){
            throw"INVALID_CHARACTER_ERR: DOM Exception 5"
        }
        return x
    }
    function _encode(s){
        if(arguments.length!==1){
            throw"SyntaxError: exactly one argument required"
        }
        s=String(s);
        var i,b10,x=[],imax=s.length-s.length%3;
        if(s.length===0){
            return s
        }
        for(i=0;i<imax;i+=3){
            b10=(_getbyte(s,i)<<16)|(_getbyte(s,i+1)<<8)|_getbyte(s,i+2);
            x.push(_ALPHA.charAt(b10>>18));
            x.push(_ALPHA.charAt((b10>>12)&63));
            x.push(_ALPHA.charAt((b10>>6)&63));
            x.push(_ALPHA.charAt(b10&63))
        }
        switch(s.length-imax){
            case 1:
                b10=_getbyte(s,i)<<16;
                x.push(_ALPHA.charAt(b10>>18)+_ALPHA.charAt((b10>>12)&63)+_PADCHAR+_PADCHAR);
                break;
            case 2:
                b10=(_getbyte(s,i)<<16)|(_getbyte(s,i+1)<<8);
                x.push(_ALPHA.charAt(b10>>18)+_ALPHA.charAt((b10>>12)&63)+_ALPHA.charAt((b10>>6)&63)+_PADCHAR);
                break
        }
        return x.join("")
    }
    return{
        decode:_decode,
        encode:_encode,
        VERSION:_VERSION
    }
}(jQuery));


function hasDatepickerHeight() {
    var v_max = -1;
    $("div.hasDatepicker").each(function() {
        var h = $(this).height(); 
        v_max = h > v_max ? h : v_max;
    });
    $("div.hasDatepicker").css('height', v_max);
 
    $("div.ui-datepicker-header").attr("onclick", "setHtForPreNextMonth()");	// dev Pardeeep - 05-06-13
}

function setHtForPreNextMonth(){			// dev Pardeeep - 05-06-13
    $("div.hasDatepicker").css('height', 'auto');
    hasDatepickerHeight();
}

function getAirportNameCorrected(value){			// dev Pardeeep - 18-06-13
    var textval = value.split('&rarr; ').join('');
    textval = textval.split('&nbsp;').join('');
    var arrdata = textval.split(',');
    textval =  arrdata[0] + ',' +  arrdata[1];
    return textval;
}
var intervalToolTip;
function setValidationMsgPos(type){
	clearInterval(intervalToolTip);
	$('.help ').hide(); 
	if(type == 'origin'){
		var lpos = $('#txtHeadOrigin').offset().left;
//		console.log(lpos);
//		$(".selct_orignmsg").offset({
//			left: lpos
//		});	
		$(".selct_orignmsg").css('left' , lpos + 'px');	
		$('.selct_orignmsg ').show();
//		setTimeout(function() { $('.selct_orignmsg ').hide() }, 2000);
		intervalToolTip = setInterval(function() { clearInterval(intervalToolTip); $('.selct_orignmsg ').hide() }, 2000);
	}else if(type == 'dest'){
		var lpos = $('#txtHeadDestination').offset().left;
		$(".selct_destimsg").css('left' , lpos + 'px');	
		$('.selct_destimsg').show();
//		setTimeout(function() { $('.selct_destimsg ').hide() }, 2000);
		intervalToolTip = setInterval(function() { clearInterval(intervalToolTip); $('.selct_destimsg ').hide() }, 2000);
	}
}

//end of code

//plot pushpins for one way and rountrip flight|DEV-SN ON 7/16/2013
function plotFlightPushpin(param,tripType){
    var cities = '';
    if(param == 'welcome'){
        cities = document.getElementsByName("wfcityHdn[]");
    }else{
        cities = document.getElementsByName("fBookHdn[]");
    }
    map.hideAllYellowPushpin();
	
    var strPins="";
    var orgCityId="";
    map.refreshMultiDestArr();
	if(tripType == 'ROUNDTRIP'){
		cityCount=cities.length+1;
	}else{
		cityCount=cities.length;
	}
    for(var i=1; i<=cityCount; i++){
        var Origin = flight_pushpin_data;        
        var Destination = welcome_pushpin_data;
		
        if(typeof(Origin) != 'undefined'){
            try{
               // var result = flight_pushpin_data;
                var isValidOrg = true;
                if (isValidOrg == true){
                    if(i == 1){ 
						var data = flight_pushpin_data; 
                        orgCityId = data.geo_city_id;           
                        var pushpinColor = "green";
                    }else{
						if(i == 3){
							var data = flight_pushpin_data;
						}else{
							var data = welcome_pushpin_data; 
						}
                        var pushpinColor = "blue"; 
                        if (map.addNewMultiDesination(data.geo_city_id) == false){
                            pushpinColor = "white";
                        }else{
                            map.changeTabForNewDestination(data.geo_city_id);
                        }
                    //alert("OD:"+destPushPinCounter + "/"+map.multiDestArr);
                    }
                    if (strPins.indexOf("~"+data.geo_city_id+"!")<0){
                        $('#rootvectormap').vectorMap('set', 'label', {
                            "n":data.geo_city_name,
                            "c":data.geo_country_code.toLowerCase(),
                            "d":'',
                            "lat":data.geo_lat,
                            "lon":data.geo_lon, 
                            "pin":1, 
                            "pcolor":pushpinColor, 
                            "key":data.geo_city_id, 
                            "l":5, 
                            "latVar":0, 
                            "lonVar":0
                        });
                    }
                    strPins += "~"+data.geo_city_id+"!";
                }
            }catch(e){                
            }
        }//end of if block
        /*if(typeof(Destination) != 'undefined'){
            try{
                var result = $("#"+to+i).data();
                var data = result.cityData;
                var pushpinColor = "blue"; 
                if (map.addNewMultiDesination(data.geo_city_id) == false){
                    pushpinColor = "white";
                }else{
                    map.changeTabForNewDestination(data.geo_city_id);
                }
				
                //alert("D:"+destPushPinCounter + "/"+map.multiDestArr);
                if (strPins.indexOf("~"+data.geo_city_id+"!")<0){
                    $('#rootvectormap').vectorMap('set', 'label', {
                        "n":data.geo_city_name,
                        "c":data.geo_country_code.toLowerCase(),
                        "d":'',
                        "lat":data.geo_lat,
                        "lon":data.geo_lon, 
                        "pin":1, 
                        "pcolor":pushpinColor, 
                        "key":data.geo_city_id, 
                        "l":5, 
                        "latVar":0, 
                        "lonVar":0
                    })
                }
                strPins += "~"+data.geo_city_id+"!";
            }catch(e){                
            }
        }//end of if block*/
    }//end of for loop
    map.resetPushPinColorExcept(strPins, "");
    map.updateTripNavigationBar("A", "");
	//alert("D:"+destPushPinCounter +  " / "+map.multiDestArr);
    //	map.drawTrajectory();
    setTimeout(function(){
        map.drawTrajectory();					
    }, 2000);
}//end of function plotFlightPushpin