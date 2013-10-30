function BingMap(options){
	/* Setting option defaults */
	this.defaults =	{
		containerDiv:			"mapDiv"
	};
	
	this.mapDefault = {
		credentials: 			"AhJQ5JAtgnPi_omSWBrBll1mzwDZTtRktFgfeXNlUiR-i3bRuMc2inL0nAbGkRGE",   		/* Bing map API key */
                mapTypeId:			Microsoft.Maps.MapTypeId.auto,
		showBreadcrumb: 		true,
		enableClickableLogo: 	false,
		enableSearchLogo: 		false,
		showDashboard:			false,
		zoom:              		5           /* default zoom level for bin map */
	};
	
	/* Closure for this */
	var my = this;
	/* Evaluate options */
	for(var name in my.defaults) {
		this[name] = (options !== undefined && options[name] !== undefined) ? options[name] : my.defaults[name];
	}

	/* Initiate Bing Map */
	this.map = new Microsoft.Maps.Map(document.getElementById(my.containerDiv), this.mapDefault);
	
        Microsoft.Maps.Events.addHandler(this.map,"mousedown", function (e){
            $("#infoBox").hide();
            $("#rightmenu").hide();  
            $("#bing_attraction_info").hide();
            $("#bing_city_info").hide();
	});
	
	Microsoft.Maps.Events.addHandler(this.map,"viewchangeend", checkMapState);   // Set Slider according to zoom level

	Microsoft.Maps.Events.addHandler(this.map,"viewchangeend", function (e){ setTimeout("checkTile()",1000); }); // Check tile integration
	
	Microsoft.Maps.Events.addHandler(this.map,"rightclick", bingMapRightClick); // Right Click event addition
	
//	Microsoft.Maps.Events.addHandler(pin, 'click', displayInfobox);
	

	
	Microsoft.Maps.loadModule('Microsoft.Maps.Traffic', { callback: trafficModuleLoaded });	 // for traffic module
	
	loadContextMenu(); // loading context menu
}

/*
supporting map related function for home page
*/

var credentials='AhJQ5JAtgnPi_omSWBrBll1mzwDZTtRktFgfeXNlUiR-i3bRuMc2inL0nAbGkRGE';
var bingMap = false;
visibleMap = 'jvector';
var objPoint;
var mapZoomCtr=1;
var mapZoomLevel =0;
var maxZoomLevel=10;
var transitionZoomLevel =3;
var cView=0;
var trafficLayer;
//for add pushpin
var pushpinArray=new Array();
var totpushpin=0;

// for direction map
var directionsManager;
var directionsErrorEventObj;
var directionsUpdatedEventObj; 


function loadContextMenu(){   
   $("#mapDiv").contextMenu({ menu: 'myMenu' }, 
   function(action, el, pos) { contextMenuWork(action, el, pos); });
}

function loadTraffic(){
	//for traffic module edition	 
    $("#rightmenu").hide();
    trafficLayer.show();
    $("#pushpin_ShowTrafic").hide();
    $("#pushpin_HideTrafic").show();
}

function hideTraffic(){
    $("#rightmenu").hide();
    trafficLayer.hide();	
    $("#pushpin_ShowTrafic").show();
    $("#pushpin_HideTrafic").hide();
} 

// For traffic module integration
function trafficModuleLoaded(){
    trafficLayer = new Microsoft.Maps.Traffic.TrafficLayer(bingMap.map);
}

/* Event handler function for slider change*/
function checkMapState(){

  $("#slider").slider( "option", "value", bingMap.map.getZoom()-1); //Set Slider according to zoom level
  //setTimeout("setZooToolBar(bingMap.map.getZoom())",250);
  	/*START- added by AN on 21-12-12| To hide Rotaion buttons on city view*/
	if (bingMap.map.isRotationEnabled())
		$("#bing-zoom .rotview").show();
	else 
		$("#bing-zoom .rotview").hide();
	/*END- added by AN on 21-12-12*/
	if (bingMap.map.getZoom() <=4){
		BingMapZoomOut();
	}
}

//For down zoom level if Tile is not at perticular ZOOM
function checkTile(){
	if(bingMap==false)
			bingMap = new BingMap();
			
	 var czoom =bingMap.map.getZoom();
	 $("#mapDiv img").each(function() { var url=this.src.split("/");
		if(url[url.length-1]=='notile.png'){
			bingMap.map.setView({zoom:czoom-1});
			}
	 });										  
}

//Set Bing Map Right Click MENU
function bingMapRightClick(e){
    MCevent=e;
    document.getElementById('rightmenu').style.top=MCevent.pageY+'PX';
    document.getElementById('rightmenu').style.left=MCevent.pageX+'PX';;
    $("#rightmenu").show();
    $("#myMenu").show();
}

function showBingFromPlan(latitude, longitude){
	$("#welcomeBox").hide();
	$("#PlanBookComponent").hide();	
	if(bingMap==false){
            bingMap = new BingMap();
        }
	visibleMap = 'bing';
	$('#containervectormap').hide();
	$('#flash-zoom').hide();
	$('#bing-zoom').show();
	bingMap.map.setView({zoom:18,center: new Microsoft.Maps.Location(latitude,longitude)});	
        var placePin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(latitude, longitude), null); 
        bingMap.map.entities.push(placePin);	 
	 setZooToolBar(18);
	//setZooToolBar(bingMap.map.getZoom());
}//end of function showBingFromPlan

function hideInfobox(e){
    pinInfobox.setOptions({ visible: false });
}

function removeMyTripPushPin(){    
    if(typeof(activePushpin) != 'undefined'){
        var index = bingMap.map.entities.indexOf(activePushpin);
        activePushpin.setOptions({ visible: false });
        bingMap.map.entities.removeAt(index);
        $("#bing_attraction_info").hide();
    }//end of if block 
}//end of function removeMyTripPushPin
var pinInfobox;

function plotMyTripItems(places, isClear,mode){
    var POILocationArray = new Array();
    if(isClear == 1){
        if(visibleMap == 'bing'){
            if(bingMap.map.entities.getLength()>0){
                while (bingMap.map.entities.getLength() > 0) {
                    try {
                        bingMap.map.entities.clear();
                    }catch (e) {
                    }
                }//end of while block
            }//end of if block
        }//end of if block
    }//end of if block
    
    pinArray = new Array();	
    if(places == undefined || places == 'undefined' || places == ''){
        return;
    }//end of if block    
    var pinImage = new Array();
    var poiData    = 0;
    var ARNSData = 0;
    var hotelData  = 0;
    var hostelData = 0;
    var eventData  = 0;
    var dealData   = 0;    
    var defaultImage = new Array();
    var bucketId = 0;
    if((places.attractionCount != 0) || (places.restaurantCount != 0) || (places.nightlifeCount!= 0) || (places.shoppingCount != 0)){
        ARNSData = places.ARNS;
    }
    if(places.attractionCount){
        pinImage[1] = "/images/poi_01.png";
        defaultImage[1] = '/images/attraction_default.gif';
        bucketId = 1;
    }
    if (places.restaurantCount){        
        pinImage[3] = "/images/restaurant_01.png";
        defaultImage[3] = '/images/restaurant_default.gif';
        bucketId = 3;
    }
    if (places.nightlifeCount){
        pinImage[4] = "/images/nightlife_01.png";
        defaultImage[4] = '/images/nightlife_default.gif';
        bucketId = 4;
    }
    if (places.shoppingCount){        
        pinImage[6] = "/images/bing-shopping-pushpin.png";
        defaultImage[6] = '/images/Shoping_Default.png';
        bucketId = 6;
    }
    if (places.hotelCount){
        hotelData = places.hotel;
        pinImage[11] = "/images/hotel-bing-pin.png";
        defaultImage[11] = '/images/hotel_grid_default.gif';
        bucketId = 11;
    }
    if (places.hostelCount){
        pinImage[16] = "/images/hostel_01.png";
        hostelData = places.hostel;
        bucketId = 16;
    }
    if (places.eventCount){
        pinImage[12] = "/images/events.png";
        //defaultImage[11] = '/images/hotel_grid_default.gif';
        eventData = places.event;
        bucketId = 12;
    }
    if (places.dealCount){
        pinImage[13] = "/images/deals.png";
        dealData = places.deal;
        bucketId = 13;
    }//end of else block    
    
    
    if(ARNSData != '0'){
        $.each(ARNSData, function(i, result){ 
            try{
                var location1 = new Microsoft.Maps.Location(result.data.lat, result.data.lng);
                var pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(result.data.lat, result.data.lng), {icon: pinImage[result.categoryId], height:53, width:43,textOffset:new Microsoft.Maps.Point(0,13)}); 
                POILocationArray.push(location1);
                pin.title = result.data.name;
                pin.description = result.data.description;
                pin.imageUrl = result.data.smallPhotoUrl;
                pin.relegion = 'poi';
                pin.uniqueId = result.data.id;
                pinArray.push(pin); 
                //bingMap.map.entities.push(pin);                
                var infoBoxHtml = getPoiInfoBox(result.data, i, result.id, defaultImage[result.categoryId], places.tripId, mode);                
                pin.setInfoBox(new InfoBox(infoBoxHtml, 'poi'));
                
                Microsoft.Maps.Events.addHandler(pin,"click", function(e){
                    if(e.targetType == 'pushpin'){
                        activePushpin = e.target;
                    }                    
                });
                
                bingMap.map.entities.push(pin);
            }catch(err){ 
                //alert(err);
            }//end of catch block
        });
    }//end of if block 

    if(hotelData != '0'){
        $.each(hotelData, function(i, result){
            try{
                var location1 = new Microsoft.Maps.Location(result.data.Latitude, result.data.Longitude);
                var pin = new Microsoft.Maps.Pushpin(location1, {icon: pinImage[result.categoryId], height:53, width:43,textOffset:new Microsoft.Maps.Point(0,13)});
                POILocationArray.push(location1);
                
                if(toString(result.data.Name).length > 22){ 
                    hotelName = result.data.Name.substring(0, 22) + '...';
                }else{ 
                    hotelName = result.data.Name;
                }
                pin.title = hotelName;
                pin.description = hotelName;
                pin.imageUrl = result.data.imageUrl;
                pin.relegion = 'poi';
                pin.uniqueId= result.data.HotelID;
                pinArray.push(pin);
                var infoBoxHtml = getHotelInfoBox(result.data, i, result.categoryId, result.id, places.tripId, mode);
                pin.setInfoBox(new InfoBox(infoBoxHtml, 'poi'));                
                Microsoft.Maps.Events.addHandler(pin,"click", function(e){
                    if(e.targetType == 'pushpin'){
                        activePushpin = e.target;
                    }                    
                });
                
                bingMap.map.entities.push(pin);
            }catch(err){
                //alert(err);
            }//end of catch block
        });
    }//end of if block
    if(hostelData != '0'){
        $.each(hostelData, function(i, result){ 
            //alert(i+" "+result.data.geo.latitude+" "+result.data.geo.longitude+" "+pinImage[result.categoryId]);
            try{
                if(result.data.geo.latitude == '0.0000000' && result.data.geo.longitude == '0.0000000'){
                }else{                    
                    var location1 = new Microsoft.Maps.Location(result.data.geo.latitude, result.data.geo.longitude);
                    var pin = new Microsoft.Maps.Pushpin(location1, {icon: pinImage[result.categoryId], height:53, width:43,textOffset:new Microsoft.Maps.Point(0,13)}); 
                    POILocationArray.push(location1); 
                    if(toString(result.data.name).length > 22){
                        hostelName = result.data.name.substring(0, 22) + '...';
                    }else{ 
                        hostelName = result.data.name;
                    }//end of else block

                    pin.title = hostelName;
                    pin.description = hostelName;
                    if(typeof(result.data.images) != 'undefined'){
                        pin.imageUrl = result.data.images[0].url;
                    }else{
                        pin.imageUrl = result.data.propertyImage;
                    }
                    pin.relegion = 'poi';
                    pin.uniqueId= result.data.number;
                    pinArray.push(pin); 
                    //bingMap.map.entities.push(pin);
                    var infoBoxHtml = getHostelInfoBox(result.data, i, result.categoryId, result.id, places.tripId, mode);
                    pin.setInfoBox(new InfoBox(infoBoxHtml, 'poi'));                    
                    Microsoft.Maps.Events.addHandler(pin,"click", function(e){
                        if(e.targetType == 'pushpin'){
                            activePushpin = e.target;
                        }                    
                    });                    
                    bingMap.map.entities.push(pin);
                }//end of else block
            }catch(err){
                //alert(err);
            }//end of catch block
	});
    }//end of if block
    if(eventData != '0'){
        $.each(eventData, function(i, result){ 
            try{
                var location1 = new Microsoft.Maps.Location(result.data.latitude, result.data.longitude);
                var pin       = new Microsoft.Maps.Pushpin(location1, {icon: pinImage[result.categoryId], height:53, width:43,textOffset:new Microsoft.Maps.Point(0,13)}); 
                POILocationArray.push(location1);
                pinArray.push(pin);
                pin.title       = result.data.announcementTitle;
                pin.description = result.data.title;
                pin.imageUrl    = result.data.smallPhotoUrl;
                pin.relegion    = 'poi';
                
                var infoBoxHtml = getEventInfoBox(result.data, i, result.categoryId, result.id, places.tripId, mode);
                pin.setInfoBox(new InfoBox(infoBoxHtml, 'poi'));                
                Microsoft.Maps.Events.addHandler(pin,"click", function(e){
                    if(e.targetType == 'pushpin'){
                        activePushpin = e.target;
                    }                    
                });
                
                bingMap.map.entities.push(pin);
            }catch(err){ 
                //alert(err);
            }//end of catch block
	});        
    }//end of if block
    if(dealData != '0'){
        $.each(dealData, function(i, result){ 
            try{
                var location1 = new Microsoft.Maps.Location(result.data.latitude, result.data.longitude);
                var pin = new Microsoft.Maps.Pushpin(location1, {icon: pinImage[result.categoryId], height:53, width:43, textOffset:new Microsoft.Maps.Point(0,13)});
                POILocationArray.push(location1);
                pinArray.push(pin);
                pin.title = result.data.title_short_50;
                pin.description = result.data.title_short_50;
                pin.imageUrl = result.data.image_url;
                pin.relegion = 'poi';
                
                var infoBoxHtml = getDealInfoBox(result.data, i, result.categoryId, result.id, places.tripId, mode);                
                pin.setInfoBox(new InfoBox(infoBoxHtml, 'poi'));                
                
                Microsoft.Maps.Events.addHandler(pin,"click", function(e){
                    if(e.targetType == 'pushpin'){
                        activePushpin = e.target;
                    }                    
                });
                
                bingMap.map.entities.push(pin);
            }catch(err){
                //alert(err);
            }//end of catch block
	});
    }//end of if block
    
    //console.log(POILocationArray);
    if(POILocationArray != ''){
        /*var viewRect = Microsoft.Maps.LocationRect.fromLocations(POILocationArray);
        bingMap.map.setView({bounds: viewRect});    
        $(this).mapOverlay("delete");    */
    }else{
       // zoomTo100();
    }
}//end of function showBingFromPlan

function vectorZoomIn(lat, longi){
}

function centerAndZoom(lat, lng, itemId, pinImage ){
	var center = new Microsoft.Maps.Location(lat, lng);
	if(typeof (bingMap.map) == 'undefined'){
		bingMap = new BingMap();
	}
	bingMap.map.setView({ center: center , zoom: 16});
	if(typeof itemId == 'undefined'){
		return;	
	}
	var defaultpinImage = pinImage;
	
	switch(defaultpinImage){
		case "/images/poi_01_active.png":
			defaultpinImage = "/images/poi_01.png";
			break;
		case "/images/restaurant_01_active.png":
			defaultpinImage = "/images/restaurant_01.png";
			break;
		case "/images/nightlife_01_active.png":
			defaultpinImage = "/images/nightlife_01.png";
			break;
		case "/images/bing-shopping-pushpin-active.png":
			defaultpinImage = "/images/bing-shopping-pushpin.png";
			break;
		case "/images/events_active.png":
			defaultpinImage = "/images/events.png";
			break;	
		case "/images/hotel-bing01-active.png":
			defaultpinImage = "/images/hotel-bing-pin.png";
			break;
		case "/images/hostel_01_active.png":
			defaultpinImage = "/images/hostel_01.png";
			break;
	}//end of swithch block
	
	for (key in pinArray){
		if(pinArray[key].uniqueId==itemId){
			pinArray[key].setOptions({icon: pinImage});
		}else{
			pinArray[key].setOptions({icon: defaultpinImage});
		}
	}
}

function clearBingMapEntity(){
    //bingMap.map.entities.clear();
    if(visibleMap == 'bing'){
        while (bingMap.map.entities.getLength() > 0) {
            try {
                bingMap.map.entities.clear();
            }catch (e) {
            }
        }//end of while block
    }//end of if block
}//end of function clearBingMapEntity

function showBing(zoomLevel){
    $(this).mapOverlay(2);
    if( visibleMap == 'bing' ) {  
        clearBingMapEntity();
        if(!isNaN(zoomLevel)){
            bingMap.map.setView({zoom:zoomLevel});
        }		
        $('#flash-zoom').hide();
        $('#bing-zoom').show();
        return false;
    }	
    if(bingMap == false){
        bingMap = new BingMap(); 
    }
    bingMap.map.entities.clear();	
    $('#mapDiv').hide();
    $('#mapDiv').show();
    visibleMap = 'bing';
    $('#bing-zoom').show();
    $('#flash-zoom').hide();	
}//end of function

function showVectorMap(){
//	if( visibleMap == 'jvector') {  
//		return false;
//	}
	// make jvector map visible here
	//$('#mapDiv').fadeOut('slow');
	//$('#containervectormap').fadeIn(2000);

	visibleMap = 'jvector';
	$('#mapDiv').hide();
	$('#containervectormap').show();	
	document.getElementById('containervectormap').style.zIndex ="1";
	document.getElementById('mapDiv').style.zIndex ="0";
	$('#mapDiv').show();
	$('#bing-zoom').hide();
	$('#flash-zoom').show();
	// to hide bing blurb when vector map displayed :: Parveen - 04/09/12
	$('#bing_attraction_info').hide();
}//end of function showVectorMap

function regionClickZoomOutHashUpdate(){	
	var zoomOutHashLocationURL = $.trim(location.hash);
	var zoomOutHashLocationString;
	switch(mapZoomCtr){
		case 3:
			if (parseInt(zoomOutHashLocationURL.lastIndexOf("/")) > parseInt(zoomOutHashLocationURL.indexOf("/"))){
				for (var key in regionArray){
					if (regionArray[key].replace(/ /g, "-") == zoomOutHashLocationURL.substring(zoomOutHashLocationURL.indexOf("/") + 1, zoomOutHashLocationURL.lastIndexOf("/"))){
						zoomOutHashLocationString = zoomOutHashLocationURL.substring(1, zoomOutHashLocationURL.lastIndexOf("/"));
						isPushStateEnabled = true;
						$.bbq.pushState(zoomOutHashLocationString, 2);
						break;
					}
				}
			}
			break;

		case 2:
			if (parseInt(zoomOutHashLocationURL.indexOf("/")) > 0){
				for (var key in regionArray){
					if (regionArray[key].replace(/ /g, "-") == zoomOutHashLocationURL.substring(zoomOutHashLocationURL.indexOf("/") + 1)){					
						zoomOutHashLocationString = zoomOutHashLocationURL.substring(1, zoomOutHashLocationURL.lastIndexOf("/"));
						isPushStateEnabled = true;
						$.bbq.pushState(zoomOutHashLocationString, 2);	
						break;
					}
				}
			}
	}
}

function mapZoomIn(code){
        
	if(	mapZoomLevel < maxZoomLevel){ mapZoomLevel++; mapZoomCtr++;}
	
	if(mapZoomLevel ==1 && (bingMap==false)){
		bingMap = new BingMap(); 
	}
	
	if(mapZoomLevel<3)
	{
		if(visibleMap == 'jvector'){
			$('#rootvectormap').vectorMap('set', 'zoom', {level:'++', code:code});
		}
	}
	
	
	if( visibleMap == 'jvector' && mapZoomLevel >= transitionZoomLevel) {  /* show bing  */
		// make bing map visible here
		$('#mapDiv').hide();
		$('#containervectormap').fadeOut('slow');
		$('#mapDiv').fadeIn(2000);
		
		visibleMap = 'bing';
		$('#bing-zoom').show();
		$('#flash-zoom').hide();
                $('#tripMenu').hide();//added by dev AN
                
		objPoint= $('#rootvectormap').vectorMap('get', 'selectedPin', 1);
		if (objPoint == '[object Object]'){
                    bingMap.map.setView({zoom:5,center: new Microsoft.Maps.Location(objPoint.lat,objPoint.lng)});
		}else{
                    bingMap.map.setView({zoom:5});
		}
                if(['News','Media','Info','Activities','Weather','Friends'].indexOf(activeExploreTab)!=-1 || PanelVisited == 'CountryPanel') {
                    clearBingMapEntity();
                }// dev AN ** for all non-bing pushpins tabs
		//mapZoomLevel = 5;
                
                //showTripItemsOnBingMap(1, '');//added by Vijay/praveen 21-Dec-2012 2:00PM
	}
}

function mapZoomOut(){
	regionClickZoomOutHashUpdate();
	if(mapZoomLevel > 0) mapZoomLevel--;
	mapZoomCtr= mapZoomCtr - 1;
	if(mapZoomCtr<1) mapZoomCtr=1;
	if( visibleMap == 'bing' && mapZoomLevel < transitionZoomLevel) {  /* show jvector  */
		// make jvector map visible here
		$('#containervectormap').fadeIn(2000);
		visibleMap = 'jvector';
		$('#bing-zoom').hide();
		$('#flash-zoom').show();
	}

	if(visibleMap == 'jvector'){
		$('#rootvectormap').vectorMap('set', 'zoom', {level:'--'});					
	}
	
}

function zoomTo100(){
	if (mapZoomLevel == 0 && visibleMap != 'bing') return;
    if(visibleMap == 'bing'){
        //$('#containervectormap').show();
        showVectorMap();
        $('#containervectormap').fadeIn(2000);
        visibleMap = 'jvector';
        $('#bing-zoom').hide();
        $('#flash-zoom').show();
        //bingMap.map.entities.clear();
    }else if(visibleMap == 'jvector'){
        //$('#containervectormap').show();
        $('#containervectormap').fadeIn(2000);
        visibleMap = 'jvector';
        $('#bing-zoom').hide();
        $('#flash-zoom').show();
    }
    mapZoomLevel = 0;
    mapZoomCtr = 1;
	$('#rootvectormap').vectorMap('set', 'zoom', {level:'1'});
	
}//end of function zoomTo100

function zoomBingToLevel(level){
	if(level==2 || level==0)
		zoomTo100(1);
	else
		bingMap.map.setView({zoom:level});

	setZooToolBar(level);
}

/* function used to call from jVector map zooming control */
function setZoom(level){
    if(level == 1){
        $('#rootvectormap').vectorMap('set', 'zoom', {level:'1'});
        mapZoomLevel = 0;
        mapZoomCtr = 1;	
    }else{		
        if(bingMap == false) bingMap = new BingMap();
        visibleMap = 'bing';
        objPoint = $('#rootvectormap').vectorMap('get', 'selectedPin', 1);        
        if (objPoint == '[object Object]'){
            bingMap.map.setView({zoom:level,center: new Microsoft.Maps.Location(objPoint.lat,objPoint.lng)});
        }else{
            bingMap.map.setView({zoom:level});
        }
        //mapZoomLevel = level;
    }
    setZooToolBar(level);
}//end of function setZoom

//Set jVector Zoom bar base on zoom 
function triggerZoom(level)
{   
	if(level==1){ 
	 $("#flash-zoom").hide();
	}else{ 
	 $("#flash-zoom").show();
	}
	
	if(bingMap==false)
			bingMap = new BingMap();

	bingMap.map.setView({zoom:level});
}
//Set Bing Zoom bar base on zoom 
function setZooToolBar(level){ 

	if(level==1){ 
	  document.getElementById('bing-zoom').style.display="none";
	  $('#rootvectormap').vectorMap('set', 'zoom', {level:'1'});
 	  triggerZoom(1);
	}	

	if( level>=2 &&level<4){
	document.getElementById('flash-zoom').style.display="block";
	document.getElementById('bing-zoom').style.display="none";
	 }	
	 
	if(level>=4){
	document.getElementById('bing-zoom').style.display="block";
	$('#containervectormap').fadeOut(2000);
	 $('#flash-zoom').hide();
	}
	
}

//zooming in bing map	
function BingMapZoomIn(){
	
    if(bingMap == false){
        bingMap = new BingMap();
    }	
    var nzoom = bingMap.map.getZoom()+1;
    if(nzoom == 3){nzoom = 4}	
    setZooToolBar(nzoom);		
    bingMap.map.setView({zoom:nzoom});
}//end of function BingMapZoomIn

//zooming out bing map
function BingMapZoomOut(){
	if(bingMap==false)
		bingMap = new BingMap();	
	
   var nzoom = bingMap.map.getZoom()-1;
//alert("mapZoomCtr | nzoom = " + mapZoomCtr + " | " + nzoom);
	if(nzoom<=4){nzoom=2}
		setZooToolBar(nzoom);
	
	if(nzoom == 2 )
	{
		showVectorMap();
		$('#rootvectormap').vectorMap('set', 'zoom', {level:nzoom});
		$('#containervectormap').fadeIn(2000);
		visibleMap = 'jvector';
		$('#bing-zoom').hide();
		$('#flash-zoom').show();
		// this get called only once when we move from bing to vector map via bing zoom out 
		if(mapZoomCtr>=4){
			mapZoomCtr = 3;
		}else{
			if(mapZoomCtr>1) mapZoomCtr--;
		}
		mapZoomLevel = mapZoomCtr-1;
		//////////////////////////////////////////////////////////////////////
	}
	else
	{	
		bingMap.map.setView({zoom:nzoom});
	}

	//if(mapZoomLevel > 0) mapZoomLevel--;
	//mapZoomCtr= mapZoomCtr - 1;
//	if(mapZoomCtr<1) mapZoomCtr=1;
//	
//	mapZoomLevel = nzoom;
//alert("mapZoomCtr = " + mapZoomCtr + " and Map Zoom Level = " + mapZoomLevel);	
}

//Set Rotation of MAP on Bird eye or Hybrid view
function chaneView(v){
	if(bingMap==false)
		bingMap = new BingMap();	
		
	 if(cView+v>360){
		 cView=90;
	 }else if(cView+v<0){
		 cView=270;
	 }else{
		 cView=cView+v
	}
	 bingMap.map.setView({heading:cView});	
}	


//For adding PUshpin and saving Infobox and also edit information of pushpin
function addPushPin(){
	$("#rightmenu").hide();
	if (MCevent.targetType = "map") {
	  var marker={};	
	  var point = new Microsoft.Maps.Point(MCevent.getX(), MCevent.getY());
	  var loc =MCevent.target.tryPixelToLocation(point);
	  var placePin = new Microsoft.Maps.Pushpin(loc); 
		bingMap.map.entities.push(placePin);
	
		marker.pin=placePin;
		marker.title='';
		marker.notes='';
		marker.show=1;
		marker.unid=totpushpin;
		marker.evenobj=MCevent;
		
		pushpinArray[totpushpin++]=(marker);
		
		Microsoft.Maps.Events.addHandler(placePin,"mouseout", function(e){
		});


		Microsoft.Maps.Events.addHandler(placePin,"mouseover", function(e){
		hoverInfobox(marker,e);
		});
		
		Microsoft.Maps.Events.addHandler(placePin,"rightclick", function(e){
				MCevent = e;	
				MCevent.Mtype='new';
				MCevent.MPushPin=placePin;
															  
  
		document.getElementById('rightmenu').style.top=e.pageY+'PX';
		document.getElementById('rightmenu').style.left=e.pageX+'PX';;
		$("#rightmenu").show();
		$("#myMenu").show();		

	 });	 
		 
		 
	if($("#cpin").val()!='')
	{
		var cid=$("#cpin").val();
	} 
	else
	{
		$("#cpin").val($("#cpin").val());
	}
	
  }
}

//open pushpin infobox
function openInfoWindow(mobj){   
  $("#hoverInfoBox").hide();
  updateInfobox(mobj.unid);
  var pinevent=mobj.evenobj;
   //alert(pinevent.pageX);
  pinevent.pageY=80;
  document.getElementById('infoBox').style.top=pinevent.pageY+'PX';
  document.getElementById('infoBox').style.left=pinevent.pageX+'PX';;
  $("#infoBox").show();
}

//save pushpin info
function savePushpinInfo(){
	updateInfobox($("#cpin").val());
	$("#infoBox").hide();
}

//remove pushpin info
function removePushpinInfo(){
	var unid=$("#cpin").val();
	var pinobj=pushpinArray[unid].pin;
	pushpinArray[unid].show=0;
	pinobj.setOptions({visible:false});
	$("#infoBox").hide(); $("#hoverInfoBox").hide();
 }

//update infobox
function updateInfobox(unid){
	if($("#cpin").val()!='')
	{
		var cid=$("#cpin").val();
		var title= $("#title").val();
		var notes= $("#notes").val();
		pushpinArray[cid].title=title;
		pushpinArray[cid].notes=notes;
	} 
	else
	{
		$("#cpin").val(unid);
		$("#title").val(pushpinArray[unid].title);
		$("#notes").val(pushpinArray[unid].notes);
	}
}

//function for edit pushpin
function editPushpin(unid){
 		 openinfowindow(pushpinArray[unid]);
 }

//function for remove pushpin
function removePushpin(unid){
	$("#hoverInfoBox").hide();
	var pinobj=pushpinArray[unid].pin;
	pushpinArray[unid].show=0;
	pinobj.setOptions({visible:false});
    $("#rightmenu").hide();
	$("#myMenu").hide();	
}

//function for hover infobox
function hoverInfobox(pinobj,e){
	pinobj=pushpinArray[pinobj.unid];
	var string='<div class="gradientWhite contextMenu delete"><a href="javascript://" onclick="removePushpin('+pinobj.unid+');">Remove Pushpin</a></div>';
	$("#hoverInfoBox").html(string);
	document.getElementById('hoverInfoBox').style.top=e.pageY+'PX';
	document.getElementById('hoverInfoBox').style.left=e.pageX+'PX';;
	$("#hoverInfoBox").show();
	$("#hoverInfoBox").mouseenter(function(){
	$("#categories").show(); 
	});
	$("#hoverInfoBox").mouseleave(function() {
     $("#hoverInfoBox").hide("slow"); 
	});
}	

/* new direction module in html5 */
function Geocoder() {
}
	Geocoder.prototype={
	getLatLng : function(query,func){
	 $.getJSON('http://dev.virtualearth.net/REST/v1/Locations/' + query+ '?key='+credentials+'&jsonp=?', function(result) 		{	
	var point=new Microsoft.Maps.Location(result.resourceSets[0].resources[0].point.coordinates[0],result.resourceSets[0].resources[0].point.coordinates[1])																																	 
			 func(result.resourceSets[0].resources[0]);
	  }); 
	},
	
			
	getAddress : function(query,func){
	 $.getJSON('http://dev.virtualearth.net/REST/v1/Locations/' + query+ '?key='+credentials+'&jsonp=?', function(result) {
	var point=new Microsoft.Maps.Location(result.resourceSets[0].resources[0].point.coordinates[0],result.resourceSets[0].resources[0].point.coordinates[1])																																	 
			 func(point);
	  }); 
	
	}
};

function setDirectionFrom(){
	$("#rightmenu").hide();
	
	$('#bing-zoom').show();
	$('#flash-zoom').hide();
	
	if(MCevent.targetType=='pushpin' )
	{
		var loc = MCevent.target.getLocation();
	}
	else
	{
    	 var point = new Microsoft.Maps.Point(MCevent.getX(), MCevent.getY());
	 	 var loc =MCevent.target.tryPixelToLocation(point);
	}
	//alert(loc.latitude+','+loc.longitude);
	var CEvent= MCevent;
	var geocoder= new Geocoder();
	geocoder.getLatLng(loc.latitude+','+loc.longitude,function(gobj){
  
	var val=gobj.address.formattedAddress;
	
    updateDirectionBox();
	document.getElementById("otherroute0").value=val;
	document.getElementById("hdnlat0").value=loc.latitude;
	document.getElementById("hdnlon0").value=loc.longitude;
 
	});
}

function setDirectionTo(){
	$("#rightmenu").hide();
	$('#bing-zoom').show();
	$('#flash-zoom').hide();
	
	if(MCevent.targetType=='pushpin' )
	{
		var loc = MCevent.target.getLocation();
	}
	else
	{
    	 var point = new Microsoft.Maps.Point(MCevent.getX(), MCevent.getY());
	 	 var loc =MCevent.target.tryPixelToLocation(point);
	}
	//alert(loc.latitude+','+loc.longitude);
	var CEvent= MCevent;
	var geocoder= new Geocoder();
	geocoder.getLatLng(loc.latitude+','+loc.longitude,function(gobj){
  
	var val=gobj.address.formattedAddress;

	 updateDirectionBox();
	document.getElementById("otherroute1").value=val;
	document.getElementById("hdnlat1").value=loc.latitude;
	document.getElementById("hdnlon1").value=loc.longitude;

	});
		
	//return false;
	//loadContextMenu(); // loading context menu
}

function addNewRoute(){
	updateDirectionBox();
}

function updateDirectionBox(){
  $("#BingMaster").show();
  $("#directionbox").show(); 
  $("#bingRightPanel").show();
  $("#mapDiv").css("marginLeft","30%");
  $("#mapDiv").width('70%');
}

function closeDirectionBox(){
 	$("#directionbox").hide();
	$("#bingRightPanel").hide();
	$("#mapDiv").css("marginLeft","0%");
	$("#mapDiv").width('100%');
}

// Change according Direction Type in direction panel
function checkDirectionType(){
 	if($("#directiontype").val()=='Transit'){
		$(".transistbaserow").show();
	}else{$(".transistbaserow").hide();}
	
}

function createDirectionsManager() {	
	if(bingMap==false)
		bingMap = new BingMap();
	
    var displayMessage = "";
    if (!directionsManager) {
        directionsManager = new Microsoft.Maps.Directions.DirectionsManager(bingMap.map);
        displayMessage = "Directions Module loaded<BR>";
        displayMessage += "Directions Manager loaded";
    }
    //alert(displayMessage);
    directionsManager.resetDirections();
    directionsErrorEventObj = Microsoft.Maps.Events.addHandler(directionsManager, "directionsError", function (arg) {alert(arg.message);});
    directionsUpdatedEventObj = Microsoft.Maps.Events.addHandler(directionsManager, "directionsUpdated", function () {displayAlert("Directions updated");});
}

function loadDirectionsModule(){
  if (!directionsManager){
	  Microsoft.Maps.loadModule('Microsoft.Maps.Directions', { callback: createDirectionsManager });
  }else{
	  createDirectionsManager();
  }
}

function createDrivingRoute()
{
	if (!directionsManager) { createDirectionsManager(); }
	directionsManager.resetDirections();
	// Set Route Mode to driving 
	directionsManager.setRequestOptions({ routeMode: Microsoft.Maps.Directions.RouteMode.driving });
	var seattleWaypoint = new Microsoft.Maps.Directions.Waypoint({ address: 'Seattle, WA' });
	directionsManager.addWaypoint(seattleWaypoint);
	var tacomaWaypoint = new Microsoft.Maps.Directions.Waypoint({ address: 'Tacoma, WA', location: new Microsoft.Maps.Location(47.255134, -122.441650) });
	directionsManager.addWaypoint(tacomaWaypoint);
	// Set the element in which the itinerary will be rendered
	directionsManager.setRenderOptions({ itineraryContainer: document.getElementById('directionsItinerary') });
	alert('Calculating directions...');
	directionsManager.calculateDirections();
}

function createDirections()
{
	if (!directionsManager)
	{
	  Microsoft.Maps.loadModule('Microsoft.Maps.Directions', { callback: createDrivingRoute });
	}
	else
	{
	  createDrivingRoute();
	}
}

function ZoomCountryLevel(latitude,longitude){
    if(	mapZoomLevel < maxZoomLevel){ mapZoomLevel++; mapZoomCtr++;}
    if(bingMap==false)
            bingMap = new BingMap();

    if(mapZoomLevel >= transitionZoomLevel)
    {  
            bingMap.map.setView({zoom:5,center: new Microsoft.Maps.Location(latitude,longitude)});
            mapZoomLevel = 5;
            $('#containervectormap').hide();
            visibleMap = 'bing';
            $('#bing-zoom').show();
            $('#flash-zoom').hide();
    }			
}//end of function ZoomCountryLevel

// function for clearing directions
function ClearAlldirection(){
 
}

// function  for load view option
function loadViewOption()
{
	$("#bingOptions").show();
	$("#rightmenu").hide();
}

// function  for hide view option
function hideViewOption()
{
	if(bingMap==false)
		bingMap = new BingMap();
		
  $("#bingOptions").hide();
  $("#rightmenu").hide();
  
  bingMap.map.setView({mapTypeId:'auto'});
}

// function for change view option
function changeViewOption()
{
	if(bingMap==false)
		bingMap = new BingMap();
		
	var cmbVal= document.getElementById("cmbViewOptions").value;
	bingMap.map.setView({mapTypeId:cmbVal});
	
}

function updateBreadCrumb(lat,long)
{

	var geocoder= new Geocoder();
	strbc='World';
	geocoder.getLatLng(lat+','+long,function(gobj){
	//alert(gobj.address.formattedAddress);
	arr_addr= gobj.address.formattedAddress.split(',');
  
    strbc+= ' >> ' + gobj.address.countryRegion;
	strbc+= ' >> ' + arr_addr[1];
	strbc+= ' >> ' + arr_addr[0];
	
	document.getElementById("bingBreadcrumb").innerHTML = strbc;
	
	//alert(strbc);
	});	
}

//for Adding Poi this function will be call;
var PoiArray=new Array();
var POILocationArray=new Array();
var pinArray = new Array();

function deleteAllPins(){
	try{
		for(i=0; i<pinArray.length; i++){
			bingMap.map.Children.Remove(pinArray[i]);	
		}
	}catch(err){}
}

function getHostelInfoBox(data, i, bucketId, tripItemId, tripId, panel){
    //data, i, bucketId, tripItemId, tripId, panel
    var infoBoxHtml ='';
    var hostelImage_url = '';
    var description = '';
    if(toString(data.name).length > 22){
        hostelName = data.name.substring(0, 22) + '...';
    }else{ 
        hostelName = data.name;
    }
    if(typeof data.images != 'undefined'){
        hostelImage_url = data.images[0].url.replace('_s.jpg','_l.jpg');
    }else{
        hostelImage_url = data.propertyImage;
    }
    if(typeof data.shortDescription != 'undefined'){ 
        description = data.shortDescription;
    }else{
        description = data.shortintro;
    }
    infoBoxHtml +='<div class="gradientWhite">';
    if(panel == 'mytrip'){
        infoBoxHtml += '<div class="relative" style="display:inline-block;"><a href="javascript://;" onClick="myTripDetailView(' + tripItemId + ', ' + tripId + ');"><img class="thumb loading" src="' + hostelImage_url  +  '" style="float:left;" width="330" height="150" onError="this.src=\'' + '/images/hostel_grid_default.gif' + '\'" /></a>';
    }
    else if(panel == 'friendtrip'){
        infoBoxHtml += '<div class="relative" style="display:inline-block;"><a href="javascript://;" onClick="friendTripDetailView(' + tripItemId + ', ' + tripId + ',\' \');"><img class="thumb loading" src="' + hostelImage_url  +  '" style="float:left;" width="330" height="150" onError="this.src=\'' + '/images/hostel_grid_default.gif' + '\'" /></a>';
    }
    else{        
        infoBoxHtml += '<div class="relative" style="display:inline-block;"><a href="javascript://;" onClick="openhostelDetailPlan(' + data.number + ',' + i +' );"><img class="thumb loading" src="' + hostelImage_url  +  '" style="float:left;" width="330" height="150" onError="this.src=\'' + '/images/hostel_grid_default.gif' + '\'" /></a>';
    }    
    infoBoxHtml +='<div class="absolute black-overlay-bing font_13 attrName" style="width:97%; bottom:0px; vertical-align: middle;">' + hostelName;
    infoBoxHtml +='<a href="javascript://" onclick="showDescription(\'hostel_'+data.number+'\');"><span id="info_button_hostel_'+data.number+'" class="inforIconwhite fr">i</span> </a>';
    infoBoxHtml+= '</div></a></div>';
    if(description.length < 300){
        infoBoxHtml += '<p class="hide relative" id="bingBlurb_text_hostel_' + data.number + '" class="clearfloat"><span class="arrow-up-bingbox"></span>' + description + '</p>';
    }else{
        infoBoxHtml += '<p class="hide relative" id="bingBlurb_text_hostel_' + data.number + '" class="clearfloat"><span class="arrow-up-bingbox"></span>' + description.substring(0,300) + '...</p>';
    }
    
    /*if(data.bedPrices.cheapestDorm != undefined){	
        $.each(data.bedPrices.cheapestDorm, function(j, dprice){ 
            var dormPrice = dprice;
            infoBoxHtml += '<div class="bg_gray font_13 marginT5 marginB5" style="width: 97%; color:slategrey;">Dorms From: ' +dormPrice +' '+j +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+data.avgRating+'% Overall Rating</div>'; 
        });
    }*/
    
    infoBoxHtml +='<div class="clearfloat"></div><div id="">';
    if(panel == 'mytrip'){
        infoBoxHtml +='<div class="fl" id="bing_map_add_to_trip" style="display:inline-block; margin-left:3px;">';
        infoBoxHtml +='<a class="btnIconRemove font_13" onclick="removeItemFromTrip(\''+tripItemId+'\', ' + true + ', \''+""+'\' ,\''+bucketId+'\');" style="top: 0px;" href="javascript://"> Remove </a>';        
        infoBoxHtml +='</div>';
        infoBoxHtml +='<div class="fr"><input class="book_now font_13" type="button" value="View More" onclick="myTripDetailView(' + tripItemId + ', ' + tripId + ');" /></div>';
    }else{
        infoBoxHtml +='<div class="fl" id="bing_map_add_to_trip" style="display:inline-block; margin-left:3px;"></div>';
        infoBoxHtml +='<div class="fr"><input class="book_now font_13" type="button" value="View More" onclick="openhostelDetailPlan(' + data.number + ',' + i +' );" /></div>';        
    }
    
    infoBoxHtml +='</div>';
    infoBoxHtml +='<div class="clearfloat"></div></div>';
    return infoBoxHtml;
}//end of function getHostelInfoBox

function plotHostelDataOnBingMap(hostelData){
    hostelLocationArray = new Array();
    bingMap.map.entities.clear();
    pinArray = new Array();
    if(hostelData == undefined || hostelData == 'undefined' || hostelData == ''){
        return;
    }
	/*dev-SN CHANGES related to bing map outlier|1-14-2013*/
	var cityId = document.getElementById('hdnCityId').value;
	/*dev-SN CHANGES related to bing map outlier|1-14-2013 ends here*/	
    var pinImage = "/images/hostel_01.png";
    $.each(hostelData.result.Properties, function(i, data){ 
        try{
                if(data.geo.latitude == '0.0000000' && data.geo.longitude == '0.0000000'){
                }else{
                    var location1 = new Microsoft.Maps.Location(data.geo.latitude, data.geo.longitude);
                    var pin = new Microsoft.Maps.Pushpin(location1, {icon: pinImage, height:53, width:43,textOffset:new Microsoft.Maps.Point(0,13)}); 
                    hostelLocationArray.push(location1); 
                    if(toString(data.name).length > 22){
                        hostelName = data.name.substring(0, 22) + '...';
                    }else{ 
                        hostelName = data.name;
                    }
                    pin.title = hostelName;
                    pin.description = hostelName;
                    pin.imageUrl = data.images[0].url;
                    pin.relegion = 'poi';
                    pin.uniqueId= data.number;
                    pinArray.push(pin);                        

                    var infoBoxHtml = getHostelInfoBox(data, i);

                    pin.setInfoBox(new InfoBox(infoBoxHtml, 'poi'));
                    bingMap.map.entities.push(pin);		


                    Microsoft.Maps.Events.addHandler(pin,"click", function(e){			  
                            bingAddToTripHostel(i, data.number);
                     });

                    Microsoft.Maps.Events.addHandler(pin,"rightclick", function(e){
                        MCevent = e;	
                        MCevent.Mtype='poi';
                        MCevent.MPushPin=pin;										  
                        $("#hoverInfoBox").hide();											  

                        $("#pushpin_Activity").removeClass('insert').html('');
                        document.getElementById('rightmenu').style.top=e.pageY+'PX';
                        document.getElementById('rightmenu').style.left=e.pageX+'PX';;
                        $("#rightmenu").show();
                        $("#myMenu").show();		
                     });

            }//end of else block
        }catch(err){ alert(err); }
    });
	//added by seema
	//alert(bingMap.map.getZoom());
	/*if(bingMap.map.getZoom()<5){
		bingMap.map.setView({zoom:5}); 
	}//added by seema

   var viewRect = Microsoft.Maps.LocationRect.fromLocations(hostelLocationArray);
   bingMap.map.setView({bounds: viewRect});*/
   /*dev-SN CHANGES related to bing map outlier|1-14-2013*/
   if(typeof cityZoomLevel[cityId]!='undefined' && typeof cityZoomLevel[cityId].points!='undefined' && cityZoomLevel[cityId].points!=0){
		var points=cityZoomLevel[cityId].points;
		var LocationArray=points.split(',');
		hostelLocationArray = new Array();
		var location1 = new Microsoft.Maps.Location(LocationArray[0], LocationArray[1]);
		var location2 = new Microsoft.Maps.Location(LocationArray[2], LocationArray[3]);
		hostelLocationArray.push(location1);
		hostelLocationArray.push(location2);
		
	}
	var viewRect = Microsoft.Maps.LocationRect.fromLocations(hostelLocationArray);
	bingMap.map.setView({bounds: viewRect});
	//alert(zoomlevel);
	if(bingMap.map.getZoom()<5){
            bingMap.map.setView({zoom:5}); 
	}
	else if(typeof cityZoomLevel[cityId]!='undefined' && typeof cityZoomLevel[cityId].points!='undefined' && cityZoomLevel[cityId].points!=0){
			bingMap.map.setView({zoom: 10});
	}/*dev-SN CHANGES related to bing map outlier|1-14-2013|ends here*/
   
	document.getElementById('mapDiv').style.zIndex ="1";
	document.getElementById('containervectormap').style.zIndex ="0";
	visibleMap = 'bing';
	$('#flash-zoom').hide();
	$('#bing-zoom').show();
    $(this).mapOverlay("delete");
}

/***plotting pushpins for hostel in book tab|10-11-2012|Dev-SN**/
function plotbHostelDataOnBingMap(hostelData){
	bhostelLocationArray=new Array();
	if(typeof (bingMap.map) == 'undefined'){
		bingMap = new BingMap();
	}
	bingMap.map.entities.clear();
	pinArray=new Array();	
	
	if(hostelData == undefined || hostelData == 'undefined' || hostelData == ''){
		return;
	}
	
	var pinImage = "/images/hostel_01.png";	
	$.each(hostelData.result.Properties, function(i,data){ 
		try{
			if(data.geo.latitude=='0.0000000' && data.geo.longitude=='0.0000000'){
			}
			else{
			var location1=new Microsoft.Maps.Location(data.geo.latitude, data.geo.longitude);
			var pin = new Microsoft.Maps.Pushpin(location1, {icon: pinImage, height:53, width:43,textOffset:new Microsoft.Maps.Point(0,13)}); 
   			bhostelLocationArray.push(location1); 
			if(toString(data.name).length > 22) 
				hostelName = data.name.substring(0, 22) + '...';
			else 
				hotelName = data.name;
			pin.title = hotelName;
			pin.description = hotelName;
			pin.imageUrl = data.images[0].url;
			pin.relegion = 'poi';
			pin.uniqueId= data.number;
   			pinArray.push(pin); 
			var infoBoxHtml ='';
			var hostelImage_url =data.images[0].url.replace('_s.jpg','_l.jpg');;
			infoBoxHtml +='<div class="gradientWhite">';
			infoBoxHtml += '<div class="relative" style="display:inline-block;"><a href="javascript://;" onClick="openhostelbookingDetail(' + data.number + ',' + i +' );"><img class="thumb loading" src="' + hostelImage_url  +  '" style="float:left;" width="330" height="150" onError="this.src=\'' + '/images/hostel_grid_default.gif' + '\'" /></a>';
			infoBoxHtml +='<div class="absolute black-overlay-bing font_13 attrName" style="width:97%; bottom:0px; vertical-align: middle;">' + hotelName;
			infoBoxHtml +='<a href="javascript://" onclick="showDescription(\'bhostel_'+data.number+'\');"><span id="info_button_bhostel_'+data.number+'" class="inforIconwhite fr">i</span> </a>';
			infoBoxHtml+= '</div></a></div>';
			if(data.shortDescription.length < 300){
			infoBoxHtml += '<p class="hide relative" id="bingBlurb_text_bhostel_' + data.number + '" class="clearfloat"><span class="arrow-up-bingbox"></span>' + data.shortDescription + '</p>';
			}else{
			infoBoxHtml += '<p class="hide relative" id="bingBlurb_text_bhostel_' + data.number + '" class="clearfloat"><span class="arrow-up-bingbox"></span>' + data.shortDescription.substring(0,300) + '...</p>';
			}
			if(data.bedPrices.cheapestDorm != undefined){	
				$.each(data.bedPrices.cheapestDorm, function(j,dprice){ 
					var dormPrice=dprice;
					infoBoxHtml += '<div class="bg_gray font_13 marginT5 marginB5" style="width: 97%; color:slategrey;">Dorms From: ' +dormPrice +' '+j +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+data.avgRating+'% Overall Rating</div>'; 
				});
			}
			infoBoxHtml +='<div class="clearfloat"></div><div id="">';
			infoBoxHtml +='<div class="fl" id="bing_map_add_to_trip" style="display:inline-block; margin-left:3px;"></div>';
			infoBoxHtml +='<div class="fr"><input class="book_now font_13" type="button" value="View More" onclick="openhostelbookingDetail(' + data.number + ',' + i +' );" /></div>';
			infoBoxHtml +='</div>';
			infoBoxHtml +='<div class="clearfloat"></div></div>';

			pin.setInfoBox(new InfoBox(infoBoxHtml, 'poi'));
			bingMap.map.entities.push(pin);		
			

			/*Microsoft.Maps.Events.addHandler(pin,"click", function(e){			  
				bingAddToTripHostel(i, data.number);
			 });*/
			
			
			Microsoft.Maps.Events.addHandler(pin,"rightclick", function(e){
								MCevent = e;	
								MCevent.Mtype='poi';
								MCevent.MPushPin=pin;										  
				$("#hoverInfoBox").hide();											  
				
				$("#pushpin_Activity").removeClass('insert').html('');
				document.getElementById('rightmenu').style.top=e.pageY+'PX';
				document.getElementById('rightmenu').style.left=e.pageX+'PX';;
				$("#rightmenu").show();
				$("#myMenu").show();		
			 });
		
		}
		}
		catch(err){ alert(err); }
	});
	//added by seema
	//changes for bingmap outlier issue | 1-15-2013 | dev-SN
	var hostelPoints=hostelData.result.location;
	if(typeof hostelPoints!='undefined' && hostelPoints!=0){
		bhostelLocationArray = new Array();
		var location1 = new Microsoft.Maps.Location(hostelPoints[0], hostelPoints[1]);
		var location2 = new Microsoft.Maps.Location(hostelPoints[2], hostelPoints[3]);
		bhostelLocationArray.push(location1);
		bhostelLocationArray.push(location2);
		
	}
	var viewRect = Microsoft.Maps.LocationRect.fromLocations(bhostelLocationArray);
	bingMap.map.setView({bounds: viewRect});
	//alert(zoomlevel);
	if(bingMap.map.getZoom()<5){
            bingMap.map.setView({zoom:5}); 
	}else if(bingMap.map.getZoom()>12){
		bingMap.map.setView({zoom: 10});
	}else if(typeof hostelPoints!='undefined' && hostelPoints!=0){
			bingMap.map.setView({zoom: 10});
	}
	/*dev-SN CHANGES related to bing map outlier|1-15-2013|ends here*/
	//alert(bingMap.map.getZoom());
  /* var viewRect = Microsoft.Maps.LocationRect.fromLocations(bhostelLocationArray);
   bingMap.map.setView({bounds: viewRect});
   
   if(bingMap.map.getZoom()<5){
		bingMap.map.setView({zoom:5}); 
	}else if(bingMap.map.getZoom()>12){
		bingMap.map.setView({zoom: 10});
	}else{
	    bingMap.map.setView({zoom: 10});
	}*/
   
   if(visibleMap == 'bing'){	
		document.getElementById('mapDiv').style.zIndex ="1";
		document.getElementById('containervectormap').style.zIndex ="0";
		$('#flash-zoom').hide();
		$('#bing-zoom').show();		
	}
	visibleMap = 'bing';
	$(this).mapOverlay("delete");   
	/*document.getElementById('mapDiv').style.zIndex ="1";
	document.getElementById('containervectormap').style.zIndex ="0";
	visibleMap = 'bing';
	$('#flash-zoom').hide();
	$('#bing-zoom').show();
    $(this).mapOverlay("delete");*/
}

function getHotelInfoBox(data, i, bucketId, tripItemId, tripId, panel){
    //data, i, bucketId, defaultImage, tripId, panel
    if(toString(data.Name).length > 22){ 
        hotelName = data.Name.substring(0, 22) + '...';
    }else{ 
        hotelName = data.Name;
    }
    var infoBoxHtml ='';
    var description = '';
    if(typeof data.PropertyDescription != 'undefined'){
        description	= data.PropertyDescription;
       /* if(description.indexOf('Hotel Features. </b><br />') > -1){
            descStarts =  description.indexOf('Hotel Features. </b><br />');	
            description = description.substring(descStarts + 26); 
            descEnds =  description.indexOf('</p>');
            description = description.substring(0,descEnds); 
       }else if(description.indexOf('Resort Features. </b><br />') > -1){
            descStarts =  description.indexOf('Resort Features. </b><br />');	
            description = description.substring(descStarts + 27); 
            descEnds =  description.indexOf('</p>');
            description = description.substring(0,descEnds); 
       }else if(description.indexOf('Property Features. </b><br />') > -1){
            descStarts =  description.indexOf('Property Features. </b><br />');	
            description = description.substring(descStarts + 29); 
            descEnds =  description.indexOf('</p>');
            description = description.substring(0,descEnds); 
       }*/ //commented on June21 as these fields are not coming now. -Dev-R
	   	if(description.length > 300){
			if(description.indexOf('</p>') > -1){
				descEnds =  description.indexOf('</p>');
				description = description.substring(0,descEnds + 4); 
			}else{
				description = description.substring(0,250); 
			}
		}
    }
    infoBoxHtml +='<div class="gradientWhite">';
    if(panel == 'mytrip'){
        infoBoxHtml += '<div class="relative" style="display:inline-block;"><a href="javascript://;" onClick="myTripDetailView(' + tripItemId + ', ' + tripId + ');"><img class="thumb lazyloading" src="' + data.default_img  + '" style = "float:left;" width="330" height="150"  onError="this.src=\'' + '/images/hotel_grid_default.gif' + '\'"/></a>';        
    }
    else if(panel=='friendtrip'){
        infoBoxHtml += '<div class="relative" style="display:inline-block;"><a href="javascript://;" onClick="friendTripDetailView(' + tripItemId + ', ' + tripId + ',\' \');"><img class="thumb lazyloading" src="' + data.default_img  + '" style = "float:left;" width="330" height="150"  onError="this.src=\'' + '/images/hotel_grid_default.gif' + '\'"/></a>';           
    }
    else{
        infoBoxHtml += '<div class="relative" style="display:inline-block;"><a href="javascript://;" onClick="openHotelDetail(' + data.HotelID +',' + i +')"><img class="thumb lazyloading" src="' + data.default_img  + '" style = "float:left;" width="330" height="150"  onError="this.src=\'' + '/images/hotel_grid_default.gif' + '\'"/></a>';
    } 
    infoBoxHtml +='<div class="absolute black-overlay-bing font_13 attrName" style="width:97%; bottom:0px; vertical-align: middle;">' + hotelName;
    if(description != ''){
        infoBoxHtml +='<a href="javascript://" onclick="showDescription(\'hotel_'+data.HotelID+'\');"><span id="info_button_hotel_'+data.HotelID+'" class="inforIconwhite fr">i</span> </a>';
    }
    infoBoxHtml+= '</div></a></div>';
    if(description != ''){
/*        if(description.length < 300){
            infoBoxHtml += '<div class="hide relative" id="bingBlurb_text_hotel_' + data.HotelID + '" class="clearfloat"><span class="arrow-up-bingbox"></span>' + description + '</div>';
        }else{
            infoBoxHtml += '<div class="hide relative" id="bingBlurb_text_hotel_' + data.HotelID + '" class="clearfloat"><span class="arrow-up-bingbox"></span>' + description.substring(0,300)+ '...</div>';
        }*/
		infoBoxHtml += '<div class="hide relative" id="bingBlurb_text_hotel_' + data.HotelID + '" class="clearfloat"><span class="arrow-up-bingbox"></span>' + description + '</div>';
    }
	if(data.LowRate !=null && data.LowRate != 0 ){
    infoBoxHtml += '<div class="bg_gray font_13 marginT5 marginB5" style="width: 97%; color:slategrey;">Starting from: ' + data.LowRate + ' ' + 'USD';
	}
    if(data.PropertyRating != null && data.PropertyRating != 0){
        if(data.PropertyRating == 1){
            infoBoxHtml += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + data.PropertyRating +' Star'; 
        }else{
            infoBoxHtml += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + data.PropertyRating +' Stars'; 
        }
    }
    infoBoxHtml += '</div>';
    infoBoxHtml +='<div class="clearfloat"></div><div id="">';
    if(panel == 'mytrip'){
        infoBoxHtml +='<div  id="bing_map_add_to_trip" class="fl" style="display:inline-block; margin-left:3px;">';        
        infoBoxHtml +='<a class="btnIconRemove font_13" onclick="removeItemFromTrip(\''+tripItemId+'\', ' + true + ', \''+""+'\' ,\''+bucketId+'\');" style="top: 0px;" href="javascript://"> Remove </a>';
        infoBoxHtml +='</div>';
        infoBoxHtml +='<div class="inline_block marginR10 fr"><input class="book_now font_13" type="button" value="View More" onclick="myTripDetailView(' + tripItemId + ', ' + tripId + ');" /></div>';        
    }
    else if(panel=='friendtrip'){
        infoBoxHtml +='<div  id="bing_map_add_to_trip" class="fl" style="display:inline-block; margin-left:3px;">';        
        infoBoxHtml +='</div>';
        infoBoxHtml +='<div class="inline_block marginR10 fr"><input class="book_now font_13" type="button" value="View More" onclick="friendTripDetailView(' + tripItemId + ', ' + tripId + ',\' \');" /></div>';          
    }
    else{
        infoBoxHtml +='<div  id="bing_map_add_to_trip" class="fl" style="display:inline-block; margin-left:3px;"></div>';
        infoBoxHtml +='<div class="inline_block marginR10 fr"><input class="book_now font_13" type="button" value="View More" onclick="openHotelDetail(' + data.HotelID + ',' + i +');" /></div>';
    }    
    infoBoxHtml +='</div>';
    infoBoxHtml +='<div class="clearfloat"></div>';
    
    return infoBoxHtml;
    
}//end of function getHotelInfoBox

var hotelData1 = '';
function plotHotelDataOnBingMap(hotelData){
	hotelLocationArray = new Array();
	bingMap.map.entities.clear();
	pinArray = new Array();		
	if(hotelData == undefined || hotelData == 'undefined' || hotelData == '')
	return;	
	
	/*dev-SN CHANGES related to bing map outlier|1-14-2013*/
	var cityId = document.getElementById('hdnCityId').value;
	/*dev-SN CHANGES related to bing map outlier|1-14-2013 ends here*/
	
	var pinImage = "/images/hotel-bing-pin.png";	

	$.each(hotelData.hotelList, function(i,data){ 
		try{
			var location1 = new Microsoft.Maps.Location(data.Latitude, data.Longitude);
			var pin = new Microsoft.Maps.Pushpin(location1, {icon: pinImage, height:53, width:43,textOffset:new Microsoft.Maps.Point(0,13)}); 
   			hotelLocationArray.push(location1); 
			if(toString(data.Name).length > 22){ 
                            hotelName = data.Name.substring(0, 22) + '...';
                        }else{ 
                            hotelName = data.Name;
                        }
			pin.title = hotelName;
			pin.description = hotelName;
			//pin.imageUrl = 'http://media1.expedia.com/' + data.imageUrl;
			pin.imageUrl = data.imageUrl;
			pin.relegion = 'poi';
			pin.uniqueId= data.HotelID;
   			pinArray.push(pin); 
			
                        var infoBoxHtml = getHotelInfoBox(data, i);
			
			pin.setInfoBox(new InfoBox(infoBoxHtml, 'poi'));
			bingMap.map.entities.push(pin);		
			

			Microsoft.Maps.Events.addHandler(pin,"click", function(e){
			   if(explorePanelMode == 'friend'){
                                bingRecommendThisHotel(i, data.HotelID);
			   }else{												   
                                bingAddToTripHotel(i, data.HotelID);
			   }
			 });
			Microsoft.Maps.Events.addHandler(pin,"rightclick", function(e){
                            MCevent = e;	
                            MCevent.Mtype='poi';
                            MCevent.MPushPin=pin;										  
                            $("#hoverInfoBox").hide();				
                            $("#pushpin_Activity").removeClass('insert').html('');
                            document.getElementById('rightmenu').style.top=e.pageY+'PX';
                            document.getElementById('rightmenu').style.left=e.pageX+'PX';;
                            $("#rightmenu").show();
                            $("#myMenu").show();		
			 });		
		}catch(err){ alert(err); }
	});
	//alert(bingMap.map.getZoom());
	/*if(bingMap.map.getZoom()<5){
            bingMap.map.setView({zoom:5}); 
	}

   var viewRect = Microsoft.Maps.LocationRect.fromLocations(hotelLocationArray);
   bingMap.map.setView({bounds: viewRect});*/
   /*dev-SN CHANGES related to bing map outlier|1-14-2013*/
   var hotelPoints=hotelData.location;
	if(typeof hotelPoints!='undefined' && hotelPoints!=0){
		hotelLocationArray = new Array();
		var location1 = new Microsoft.Maps.Location(hotelPoints[0], hotelPoints[1]);
		var location2 = new Microsoft.Maps.Location(hotelPoints[2], hotelPoints[3]);
		hotelLocationArray.push(location1);
		hotelLocationArray.push(location2);		
	}
	var viewRect = Microsoft.Maps.LocationRect.fromLocations(hotelLocationArray);
	bingMap.map.setView({bounds: viewRect});
	if(bingMap.map.getZoom()<5){
            bingMap.map.setView({zoom:5}); 
	}else if(bingMap.map.getZoom()>12){
		bingMap.map.setView({zoom: 10});
	}else if(typeof cityZoomLevel[cityId]!='undefined' && typeof cityZoomLevel[cityId].points!='undefined' && cityZoomLevel[cityId].points!=0){
			bingMap.map.setView({zoom: 10});
	}/*dev-SN CHANGES related to bing map outlier|1-14-2013|ends here*/
   
   if(visibleMap == 'bing'){	
            document.getElementById('mapDiv').style.zIndex ="1";
            document.getElementById('containervectormap').style.zIndex ="0";
            $('#flash-zoom').hide();
            $('#bing-zoom').show();		
	}
	visibleMap = 'bing';
	$(this).mapOverlay("delete");
}
/* Added by Aayushi narula | 28 June 2012 | 1:33 pm*/
function plotbHotelDataOnBingMap(hotelData){
	bhotelLocationArray = new Array();
	if(typeof (bingMap.map) == 'undefined'){
            bingMap = new BingMap();
	}		
	bingMap.map.entities.clear();
	pinArray = new Array();	
	
	if(hotelData == undefined || hotelData == 'undefined' || hotelData == '')
	return;	
	
	var pinImage = "/images/hotel-bing-pin.png";	
    if(hotelData.HotelListResponse.HotelList.HotelSummary.length!=null){
	$.each(hotelData.HotelListResponse.HotelList.HotelSummary, function(i,data){
		try{
			var location1=new Microsoft.Maps.Location(data.latitude, data.longitude);
			var pin = new Microsoft.Maps.Pushpin(location1, {icon: pinImage, height:53, width:43,textOffset:new Microsoft.Maps.Point(0,13)}); 
   			bhotelLocationArray.push(location1); 
			if(toString(data.name).length > 22) 
				hotelName = data.name.substring(0, 22) + '...';
			else 
				hotelName = data.name;
			pin.title = hotelName;
			pin.description = hotelName;
			//pin.imageUrl = 'http://media1.expedia.com/' + data.imageUrl;
			pin.imageUrl = data.thumbNailUrl;
			pin.relegion = 'poi';
			pin.uniqueId= data.hotelId;
   			pinArray.push(pin);
			data.thumbNailUrl = data.thumbNailUrl.replace('_t.jpg','_b.jpg');
			var description = '';
/*			if(typeof data.shortDescription != 'undefined'){
			description	= data.shortDescription;
			 if(description.indexOf('Location. </b><br />') > -1){
				descStarts =  description.indexOf('Location. </b><br />') + 20;	
				description = description.substring(descStarts); 
					if(description.indexOf('</p>') > -1){
						descEnds =  description.indexOf('</p>');
						description = description.substring(0,descEnds); 
					}else{
						description = description.substring(0);
					}
				}
			}
*/			var infoBoxHtml ='';
			infoBoxHtml +='<div class="gradientWhite">';
			infoBoxHtml += '<div class="relative" style="display:inline-block;"><a href="javascript://;" onClick="step2('+data.hotelId +',\''+data.supplierType+'\',\''+data.name.replace(/[^a-zA-Z0-9-&://_,!@ ]/g, "")+'\')" ><img class="thumb lazyloading" src="'+getHotelImage(data.thumbNailUrl)+'" style="float:left;" width="330" height="150"/></a>';
			infoBoxHtml +='<div class="absolute black-overlay-bing font_13 attrName" style="width:97%; bottom:0px; vertical-align: middle;">' + hotelName;
			if(description != ''){
			infoBoxHtml +='<a href="javascript://" onclick="showDescription(\'bhotel_'+data.hotelId+'\');"><span id="info_button_bhotel_'+data.hotelId+'" class="inforIconwhite fr">i</span> </a>';
			}
			infoBoxHtml+= '</div></a></div>';
			if(description != ''){
				if(description.length < 174){
				infoBoxHtml += '<p class="hide relative" id="bingBlurb_text_bhotel_' + data.hotelId + '" class="clearfloat"><span class="arrow-up-bingbox"></span>' + description + '</p>';
			}else{
				infoBoxHtml += '<p class="hide relative" id="bingBlurb_text_bhotel_' + data.hotelId + '" class="clearfloat"><span class="arrow-up-bingbox"></span>' + description.substring(0,174)+ '...</p>';
			}
			}
			if(data.supplierType=='E'){	
				if(typeof data.RoomRateDetailsList.RoomRateDetails != 'undefined'){
					var avgNightlyRate = data.RoomRateDetailsList.RoomRateDetails.RateInfo.ChargeableRateInfo["@averageRate"];
					//avgNightlyRate= parseFloat(avgNightlyRate).toFixed(2);
					avgNightlyRate=Math.round(avgNightlyRate);
					if(typeof data.RoomRateDetailsList.RoomRateDetails.RateInfo.ChargeableRateInfo['@averageRate']  != 'undefined'){
						//detailText += '<strong class="priceTag">$' + roundVal(hotel.RoomRateDetailsList.RoomRateDetails.RateInfo.ChargeableRateInfo["@averageRate"],2) + '</strong> ' + hotel.rateCurrencyCode + '<br><small color="">Avg Nightly Rate.</small></span>';				
						
					//infoBoxHtml += '<p class="marginT10 clearfloat bg_gray"><strong>$' + avgNightlyRate + '</strong> ' + data.rateCurrencyCode + 'Avg Nightly Rate.</span></p>';
					infoBoxHtml += '<div class="bg_gray font_13 marginT5 marginB5" style="width: 97%; color:slategrey;"><strong>$' + avgNightlyRate + '</strong> ' + data.rateCurrencyCode + ' Avg Nightly Rate';
					if(data.hotelRating != null && data.hotelRating != 0){
						if(data.PropertyRating == 1){
							infoBoxHtml += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + data.hotelRating + ' Star';
						}else{
							infoBoxHtml += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + data.hotelRating + ' Stars';
						}
					}
					infoBoxHtml += '</div>'; 
	
					}
				}
			}
			infoBoxHtml +='<div id="">';
			infoBoxHtml +='<div class="fl" id="bing_map_add_to_trip" style="display:inline-block; margin-left:3px;"></div>';
			infoBoxHtml += '<div class="fr"><input class="book_now font_13" type="button" value="View More" onClick="step2('+data.hotelId +',\''+data.supplierType+'\',\''+data.name.replace(/[^a-zA-Z0-9-&://_,!@ ]/g, "")+'\')" /></div>';
			infoBoxHtml +='</div>';
			infoBoxHtml +='<div class="clearfloat"></div></div>';


		pin.setInfoBox(new InfoBox(infoBoxHtml, 'poi'));
			bingMap.map.entities.push(pin);		
			

/*			Microsoft.Maps.Events.addHandler(pin,"click", function(e){
			   if(explorePanelMode == 'friend'){
					bingRecommendThisHotel(i, data.HotelID);
			   }else{												   
					bingAddToTripHotel(i, data.HotelID);
			   }
			 });
*/			
			
/*			Microsoft.Maps.Events.addHandler(pin,"rightclick", function(e){
								MCevent = e;	
								MCevent.Mtype='poi';
								MCevent.MPushPin=pin;										  
				$("#hoverInfoBox").hide();											  
				
				$("#pushpin_Activity").removeClass('insert').html('');
				document.getElementById('rightmenu').style.top=e.pageY+'PX';
				document.getElementById('rightmenu').style.left=e.pageX+'PX';;
				$("#rightmenu").show();
				$("#myMenu").show();		
			 });
*/		
		}
		
		catch(err){ alert(err); }
	});
	}else{
		var data=hotelData.HotelListResponse.HotelList.HotelSummary;
		try{
			var location1=new Microsoft.Maps.Location(data.latitude, data.longitude);
			var pin = new Microsoft.Maps.Pushpin(location1, {icon: pinImage, height:53, width:43,textOffset:new Microsoft.Maps.Point(0,13)}); 
   			bhotelLocationArray.push(location1); 
			if(toString(data.name).length > 22) 
				hotelName = data.name.substring(0, 22) + '...';
			else 
				hotelName = data.name;
			pin.title = hotelName;
			pin.description = hotelName;
			//pin.imageUrl = 'http://media1.expedia.com/' + data.imageUrl;
			pin.imageUrl = data.thumbNailUrl;
			pin.relegion = 'poi';
			pin.uniqueId= data.hotelId;
   			pinArray.push(pin);
			data.thumbNailUrl = data.thumbNailUrl.replace('_t.jpg','_b.jpg');
			var description = '';
/*			if(typeof data.shortDescription != 'undefined'){
			description	= data.shortDescription;
			 if(description.indexOf('Location. </b><br />') > -1){
				descStarts =  description.indexOf('Location. </b><br />');	
				description = description.substring(descStarts + 20); 
					if(description.indexOf('</p>') > -1){
						descEnds =  description.indexOf('</p>');
						description = description.substring(0,descEnds); 
					}else{
						description = description.substring(0);
					}
				}
			}
*/			var infoBoxHtml ='';
			infoBoxHtml +='<div class="gradientWhite">';
			infoBoxHtml += '<div class="relative" style="display:inline-block;"><a href="javascript://;" onClick="step2('+data.hotelId +',\''+data.supplierType+'\',\''+data.name.replace(/[^a-zA-Z0-9-&://_,!@ ]/g, "")+'\')" ><img class="thumb lazyloading" src="'+getHotelImage(data.thumbNailUrl)+'" style="float:left;" width="330" height="150"/></a>';
			infoBoxHtml +='<div class="absolute black-overlay-bing font_13 attrName" style="width:97%; bottom:0px; vertical-align: middle;">' + hotelName;
			if(description != ''){
			infoBoxHtml +='<a href="javascript://" onclick="showDescription(\'bhotel_'+data.hotelId+'\');"><span id="info_button_bhotel_'+data.hotelId+'" class="inforIconwhite fr">i</span> </a>';
			}
			infoBoxHtml+= '</div></a></div>';
			if(description != ''){
			if(description.length < 174){
				infoBoxHtml += '<p class="hide relative" id="bingBlurb_text_bhotel_' + data.hotelId + '" class="clearfloat"><span class="arrow-up-bingbox"></span>' + description + '</p>';
			}else{
				infoBoxHtml += '<p class="hide relative" id="bingBlurb_text_bhotel_' + data.hotelId + '" class="clearfloat"><span class="arrow-up-bingbox"></span>' + description.substring(0,174)+ '...</p>';
			}
			}
			if(data.supplierType=='E'){	
				if(typeof data.RoomRateDetailsList.RoomRateDetails != 'undefined'){
					var avgNightlyRate = data.RoomRateDetailsList.RoomRateDetails.RateInfo.ChargeableRateInfo["@averageRate"];
					avgNightlyRate=Math.round(avgNightlyRate);
					if(typeof data.RoomRateDetailsList.RoomRateDetails.RateInfo.ChargeableRateInfo['@averageRate']  != 'undefined'){				
					infoBoxHtml += '<div class="bg_gray font_13 marginT5 marginB5" style="width: 97%; color:slategrey;"><strong>$' + avgNightlyRate + '</strong> ' + data.rateCurrencyCode + ' Avg Nightly Rate';
					if(data.PropertyRating != null && data.PropertyRating != 0){
						if(data.hotelRating == 1){
							infoBoxHtml += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + data.hotelRating + ' Star';
						}else{
							infoBoxHtml += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + data.hotelRating + ' Stars';
						}
					}
					infoBoxHtml += '</div>'; 
						//infoBoxHtml += '<p class="marginT10 clearfloat bg_gray"><strong>$' + avgNightlyRate + '</strong> ' + data.rateCurrencyCode + 'Avg Nightly Rate.</span></p>';				
					}
				}
			}
			infoBoxHtml +='<div id="">';
			infoBoxHtml +='<div class="fl" id="bing_map_add_to_trip" style="display:inline-block; margin-left:3px;"></div>';
			infoBoxHtml += '<div class="fl"><input class="book_now font_13" type="button" value="View More" onClick="step2('+data.hotelId +',\''+data.supplierType+'\',\''+data.name.replace(/[^a-zA-Z0-9-&://_,!@ ]/g, "")+'\')" /></div>';
			infoBoxHtml +='</div>';
			infoBoxHtml +='<div class="clearfloat"></div></div>';


			pin.setInfoBox(new InfoBox(infoBoxHtml, 'poi'));
			bingMap.map.entities.push(pin);		
		}
		
		catch(err){ alert(err); }
	}
	//alert(bingMap.map.getZoom());
	/*changes for bingmap outlier issue | 1-15-2013 | dev-SN*/
	var hotelPoints=hotelData.location;
	if(typeof hotelPoints!='undefined' && hotelPoints!=0){
		bhotelLocationArray = new Array();
		var location1 = new Microsoft.Maps.Location(hotelPoints[0], hotelPoints[1]);
		var location2 = new Microsoft.Maps.Location(hotelPoints[2], hotelPoints[3]);
		bhotelLocationArray.push(location1);
		bhotelLocationArray.push(location2);		
	}
	var viewRect = Microsoft.Maps.LocationRect.fromLocations(bhotelLocationArray);
	bingMap.map.setView({bounds: viewRect});
	//alert(zoomlevel);
	if(bingMap.map.getZoom()<5){
            bingMap.map.setView({zoom:5}); 
	}else if(bingMap.map.getZoom()>12){
		bingMap.map.setView({zoom: 10});
	}else if(typeof hotelPoints!='undefined' && hotelPoints!=0){
			bingMap.map.setView({zoom: 10});
	}
	/*dev-SN CHANGES related to bing map outlier|1-15-2013|ends here*/
	 
	/*var viewRect = Microsoft.Maps.LocationRect.fromLocations(bhotelLocationArray);
	bingMap.map.setView({bounds: viewRect});
	//alert(zoomlevel);
	if(bingMap.map.getZoom()<5){
            bingMap.map.setView({zoom:5}); 
	}//dev-SN CHANGES related to bing map outlier|1-8-2013
	else if(bingMap.map.getZoom()>12){
		bingMap.map.setView({zoom: 10});
	}else{
	    bingMap.map.setView({zoom: 10});
	}*/
   
    if(visibleMap == 'bing'){	
		document.getElementById('mapDiv').style.zIndex ="1";
		document.getElementById('containervectormap').style.zIndex ="0";
		$('#flash-zoom').hide();
		$('#bing-zoom').show();		
	}
	visibleMap = 'bing';
	$(this).mapOverlay("delete");
    /*document.getElementById('mapDiv').style.zIndex ="1";
    document.getElementById('containervectormap').style.zIndex ="0";
    visibleMap = 'bing';
    $('#flash-zoom').hide();
    $('#bing-zoom').show();
    $(this).mapOverlay("delete");*/
}
/* Added by Aayushi narula | 28 June 2012 | 1:33 pm*/

function getEventInfoBox(data, i, bucketId, tripItemId, tripId, panel){
    var infoBoxHtml ='';
    var formattedeventdate;
    var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    var setdate = new Date(data.start_time.replace(/-/g," "));
    var suffix = "AM";
    var hours = setdate.getHours();
    var minutes = setdate.getMinutes();
    if (hours >= 12) {
        suffix = "PM";
        hours = hours - 12;
    }
    if (hours == 0) {
        hours = 12;
    }
    if (minutes < 10){
        minutes = "0" + minutes;
    }
    formattedeventdate = m_names[setdate.getMonth()] + ' ' + setdate.getDate() + ', ' + setdate.getFullYear() + ' at ' + hours + ':' + minutes + ' ' +  suffix;
    infoBoxHtml +='<div class="gradientWhite">';
    if(panel == 'mytrip'){
			if(typeof (data.image.medium) != 'undefined'){
					var event_imageUrl = data.image.medium.url;				
					if(data.image.medium.url.indexOf('medium') > -1){
						event_imageUrl = event_imageUrl.replace('medium','block250');
					}
            infoBoxHtml += '<div class="relative" style="display:inline-block;"><a href="javascript://;" onClick="myTripDetailView(' + tripItemId + ', ' + tripId + ');"><img class="thumb loading" src="' + event_imageUrl  +  '" style="float:left;" width="330" height="150" onError="this.src=\'' + '/images/no-image-event.png' + '\'" /></a>';
        }else{
            infoBoxHtml += '<div class="relative" style="display:inline-block;"><a href="javascript://;" onClick="myTripDetailView(' + tripItemId + ', ' + tripId + ');"><img class="thumb loading" src="/images/no-image-event.png" style="float:left;" width="330" height="150" /></a>';
        }
    }
    else if(panel == 'friendtrip'){
			if(typeof (data.image.medium) != 'undefined'){
					var event_imageUrl = data.image.medium.url;				
					if(data.image.medium.url.indexOf('medium') > -1){
						event_imageUrl = event_imageUrl.replace('medium','block250');
					}
            infoBoxHtml += '<div class="relative" style="display:inline-block;"><a href="javascript://;" onClick="friendTripDetailView(' + tripItemId + ', ' + tripId + ',\' \');"><img class="thumb loading" src="' + event_imageUrl  +  '" style="float:left;" width="330" height="150" onError="this.src=\'' + '/images/no-image-event.png' + '\'" /></a>';
        }else{
            infoBoxHtml += '<div class="relative" style="display:inline-block;"><a href="javascript://;" onClick="friendTripDetailView(' + tripItemId + ', ' + tripId + ',\' \');"><img class="thumb loading" src="/images/no-image-event.png" style="float:left;" width="330" height="150" /></a>';
        }
    }
    
    else{
        if(typeof (data.image.medium) != 'undefined'){
					var event_imageUrl = data.image.medium.url;				
					if(data.image.medium.url.indexOf('medium') > -1){
						event_imageUrl = event_imageUrl.replace('medium','block250');
			}
            infoBoxHtml += '<div class="relative" style="display:inline-block;"><a href="javascript://;" onClick="openEventDetail(' + i +')"><img class="thumb loading" src="' + event_imageUrl +  '" style="float:left;" width="330" height="150" onError="this.src=\'' + '/images/no-image-event.png' + '\'" /></a>';
        }else{
            infoBoxHtml += '<div class="relative" style="display:inline-block;"><a href="javascript://;" onClick="openEventDetail(' + i +')"><img class="thumb loading" src="/images/no-image-event.png" style="float:left;" width="330" height="150" /></a>';
        }        
    }
    infoBoxHtml +='<div class="absolute black-overlay-bing font_13 attrName" style="width:97%; bottom:0px; vertical-align: middle;">' + data.title;
    if(data.venue_name != ''){
        infoBoxHtml +='<a href="javascript://" onclick="showDescription(\'events_'+i+'\');"><span id="info_button_events_'+i+'" class="inforIconwhite fr">i</span> </a>';
    }
    infoBoxHtml+= '</div></a></div>';	
    if(data.venue_name != ''){
        infoBoxHtml += '<p class="hide relative" id="bingBlurb_text_events_' + i + '" class="clearfloat"><span class="arrow-up-bingbox"></span>Venue: ' + data.venue_name + '</p>';
    }
    if(data.start_time != null){ 
        infoBoxHtml += '<div class="bg_gray font_13 marginT5 marginB5" style="width: 96%; color:slategrey;">' + formattedeventdate ; 
        infoBoxHtml += '</div>';
    }
    infoBoxHtml += '<div id="">';
    if(panel == 'mytrip'){
        infoBoxHtml += '<div class="fl" id="bing_map_add_to_trip" style="display:inline-block; margin-left:3px;">';
        infoBoxHtml +='<a class="btnIconRemove font_13" onclick="removeItemFromTrip(\''+tripItemId+'\', ' + true + ', \''+""+'\' ,\''+bucketId+'\');" style="top: 0px;" href="javascript://"> Remove </a>';
        infoBoxHtml +='</div>';
        infoBoxHtml += '<div class="fr"><input class="book_now font_13" type="button" value="View More" onclick="myTripDetailView(' + tripItemId + ', ' + tripId + ');" /></div>';
    }
    else if(panel == 'friendtrip'){
        infoBoxHtml += '<div class="fl" id="bing_map_add_to_trip" style="display:inline-block; margin-left:3px;">';
        infoBoxHtml +='</div>';
        infoBoxHtml += '<div class="fr"><input class="book_now font_13" type="button" value="View More" onclick="friendTripDetailView(' + tripItemId + ', ' + tripId + ',\' \');" /></div>';
    }
    else{
        infoBoxHtml += '<div class="fl" id="bing_map_add_to_trip" style="display:inline-block; margin-left:3px;"></div>';
        infoBoxHtml += '<div class="fr"><input class="book_now font_13" type="button" value="View More" onclick="openEventDetail(' + i + ');" /></div>';        
    }
    infoBoxHtml +='</div>';
    infoBoxHtml +='<div class="clearfloat"></div>';
    return infoBoxHtml;
}//end of function getEventInfoBox

function plotEventDataOnBingMap(eventData){
	eventLocationArray=new Array();
	bingMap.map.entities.clear();
	pinArray=new Array();	
	
	if(eventData == undefined || eventData == 'undefined' || eventData == '')
	return;
	/*dev-SN CHANGES related to bing map outlier|1-14-2013*/
	var cityId = document.getElementById('hdnCityId').value;
	/*dev-SN CHANGES related to bing map outlier|1-14-2013 ends here*/
	
	var pinImage = "/images/events.png";

	$.each(eventData.events.event, function(i, data){ 
            try{
                var location1 = new Microsoft.Maps.Location(data.latitude, data.longitude);
                var pin = new Microsoft.Maps.Pushpin(location1, {icon: pinImage, height:53, width:43,textOffset:new Microsoft.Maps.Point(0,13)}); 
                eventLocationArray.push(location1); 
                pinArray.push(pin); 

                pin.title = data.announcementTitle;
                pin.description = data.title;
                pin.imageUrl = data.smallPhotoUrl;
                pin.relegion = 'poi';
				pin.uniqueId= i;
				
                //var formattedeventdate;
/*                var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
                var setdate = new Date(data.start_time.replace(/-/g," "));
                var suffix = "AM";
                var hours = setdate.getHours();
                var minutes = setdate.getMinutes();
                if (hours >= 12) {
                    suffix = "PM";
                    hours = hours - 12;
                }
                if (hours == 0) {
                    hours = 12;
                }
                if (minutes < 10){
                    minutes = "0" + minutes;
                }*/

                //formattedeventdate = m_names[setdate.getMonth()] + ' ' + setdate.getDate() + ', ' + setdate.getFullYear() + ' at ' + hours + ':' + minutes + ' ' +  suffix;

                var infoBoxHtml = getEventInfoBox(data, i);

                pin.setInfoBox(new InfoBox(infoBoxHtml, 'poi'));
                bingMap.map.entities.push(pin);

                Microsoft.Maps.Events.addHandler(pin,"click", function(e){
                   if(explorePanelMode == 'friend'){
                        bingRecommendThisEvent(i);
                   }else{												   
                        bingAddToTripEvent(i);
                   }
                });

                Microsoft.Maps.Events.addHandler(pin,"rightclick", function(e){
                    MCevent = e;	
                    MCevent.Mtype='poi';
                    MCevent.MPushPin=pin;										  
                    $("#hoverInfoBox").hide();											  

                    $("#pushpin_Activity").removeClass('insert').html('');
                    document.getElementById('rightmenu').style.top=e.pageY+'PX';
                    document.getElementById('rightmenu').style.left=e.pageX+'PX';;
                    $('#flash-zoom').hide();
                    $('#bing-zoom').show();
                    $("#rightmenu").show();
                    $("#myMenu").show();		
                 });		
            }catch(err){ //alert(err); 
			}
	});
	
	/*if(bingMap.map.getZoom()<5){
		bingMap.map.setView({zoom:5}); 
	}
	
   var viewRect = Microsoft.Maps.LocationRect.fromLocations(eventLocationArray);*/
   if(typeof cityZoomLevel[cityId]!='undefined' && typeof cityZoomLevel[cityId].points!='undefined' && cityZoomLevel[cityId].points!=0){
		var points=cityZoomLevel[cityId].points;
		var LocationArray=points.split(',');
		eventLocationArray = new Array();
		var location1 = new Microsoft.Maps.Location(LocationArray[0], LocationArray[1]);
		var location2 = new Microsoft.Maps.Location(LocationArray[2], LocationArray[3]);
		eventLocationArray.push(location1);
		eventLocationArray.push(location2);
		
	}
	var viewRect = Microsoft.Maps.LocationRect.fromLocations(eventLocationArray);
	bingMap.map.setView({bounds: viewRect});
	//alert(zoomlevel);
	if(bingMap.map.getZoom()<5){
            bingMap.map.setView({zoom:5}); 
	}/*dev-SN CHANGES related to bing map outlier|1-8-2013*/
	else if(bingMap.map.getZoom()>12){
		bingMap.map.setView({zoom: 10});
	}else if(typeof cityZoomLevel[cityId]!='undefined' && typeof cityZoomLevel[cityId].points!='undefined' && cityZoomLevel[cityId].points!=0){
			bingMap.map.setView({zoom: 10});
	}/*dev-SN CHANGES related to bing map outlier|1-8-2013|ends here*/
   //bingMap.map.setView({bounds: viewRect});
   if(visibleMap == 'bing'){	
            document.getElementById('mapDiv').style.zIndex ="1";
            document.getElementById('containervectormap').style.zIndex ="0";
            $('#flash-zoom').hide();
            $('#bing-zoom').show();		
	}
        visibleMap = 'bing';
        $(this).mapOverlay("delete");
	/*visibleMap = 'bing';
	document.getElementById('mapDiv').style.zIndex ="1";
	document.getElementById('containervectormap').style.zIndex ="0";
   $(this).mapOverlay("delete");*/

}

function getDealInfoBox(data, i, bucketId, tripItemId, tripId, panel){
    //data, i, bucketId, tripItemId, tripId, panel
    var infoBoxHtml ='';
    infoBoxHtml +='<div class="gradientWhite">';
    
    if(panel == 'mytrip'){
        infoBoxHtml +='<div class="relative" style="display:inline-block;"><a href="javascript://" onclick="myTripDetailView(' + tripItemId + ', ' + tripId + ');"><img src="' + data.image_url + '" class="leftfloat loading"  width="330" height="150" onError="this.src=\'' + '/images/deals_default.gif' + '\'" /></a>';        
    }else if(panel == 'friendtrip'){
        infoBoxHtml +='<div class="relative" style="display:inline-block;"><a href="javascript://" onclick="friendTripDetailView(' + tripItemId + ', ' + tripId + ',\' \');"><img src="' + data.image_url + '" class="leftfloat loading"  width="330" height="150" onError="this.src=\'' + '/images/deals_default.gif' + '\'" /></a>';        
    }
    else{
        infoBoxHtml +='<div class="relative" style="display:inline-block;"><a href="javascript://" onclick="openDealInfo(' + i + ');"><img src="' + data.image_url + '" class="leftfloat loading"  width="330" height="150" onError="this.src=\'' + '/images/deals_default.gif' + '\'" /></a>';
    }    
    infoBoxHtml +='<div class="absolute black-overlay-bing font_13 attrName" style="width:94%; bottom:0px; vertical-align: middle;">' + data.title_short_100;
    infoBoxHtml +='<a href="javascript://" onclick="showDescription(\'deals_'+data.product_id+'\');"><span id="info_button_deals_'+data.product_id+'" class="inforIconwhite fr">i</span> </a>';
    infoBoxHtml+= '</div></a></div>';
    if(data.description.length < 300){
        infoBoxHtml += '<p class="hide relative" id="bingBlurb_text_deals_' + data.product_id + '" class="clearfloat"><span class="arrow-up-bingbox"></span>' + data.description + '</p>';
    }else{
        infoBoxHtml += '<p class="hide relative" id="bingBlurb_text_deals_' + data.product_id + '" class="clearfloat"><span class="arrow-up-bingbox"></span>' + data.description.substring(0,300) + '...</p>';
    }
    infoBoxHtml += '<div class="bg_gray font_13 marginT5 marginB5" style="width: 96%; color:slategrey;"> Value: ' + data.currency_symbol + data.actual_price + '&nbsp;&nbsp;&nbsp; Price: ' + data.currency_symbol + data.deal_price + '</div>'; 

    infoBoxHtml +='<div class="clearfloat"></div><div id="">';
    if(panel == 'mytrip'){    
        infoBoxHtml +='<div class="fl" id="bing_map_add_to_trip" style="display:inline-block; margin-left:3px;">';
        infoBoxHtml +='<a onclick="removeItemFromTrip(\''+tripItemId+'\', ' + true + ', \''+""+'\' ,\''+bucketId+'\');" href="javascript:void(0);" class="btnIconRemove font_13"> Remove</a>';
        infoBoxHtml +='</div>';
        infoBoxHtml += '<div class="fr"><input class="book_now font_13" type="button" value="View More" onclick="myTripDetailView(' + tripItemId + ', ' + tripId + ');" /></div>';
    }
    else if(panel == 'friendtrip'){    
        infoBoxHtml +='<div class="fl" id="bing_map_add_to_trip" style="display:inline-block; margin-left:3px;">';
        infoBoxHtml +='</div>';
        infoBoxHtml += '<div class="fr"><input class="book_now font_13" type="button" value="View More" onclick="friendTripDetailView(' + tripItemId + ', ' + tripId + ',\' \');" /></div>';
    }
    else{
        infoBoxHtml +='<div class="fl" id="bing_map_add_to_trip" style="display:inline-block; margin-left:3px;"></div>';
        infoBoxHtml += '<div class="fr"><input class="book_now font_13" type="button" value="View More" onclick="openDealInfo(' + i + ');" /></div>';
    }    
    infoBoxHtml +='</div>';
    infoBoxHtml +='<div class="clearfloat"></div></div>';
    return infoBoxHtml;
}//end of function getDealInfoBox

function plotDealDataOnBingMap(dealData){
	dealLocationArray=new Array();
	bingMap.map.entities.clear();
	
	if(dealData == undefined || dealData == 'undefined' || dealData == '')
	return;
	
	/*dev-SN CHANGES related to bing map outlier|1-14-2013*/
	var cityId = document.getElementById('hdnCityId').value;
	/*dev-SN CHANGES related to bing map outlier|1-14-2013 ends here*/
	
	pinArray=new Array();	
	var pinImage = "/images/deals.png";

	$.each(dealData.results, function(i, data){ 
            try{
                    var location1 = new Microsoft.Maps.Location(data.latitude, data.longitude);
                    var pin = new Microsoft.Maps.Pushpin(location1, {icon: pinImage, height:53, width:43,textOffset:new Microsoft.Maps.Point(0,13)}); 
                    dealLocationArray.push(location1); 
                    pinArray.push(pin); 

                    pin.title = data.title_short_50;
                    pin.description = data.title_short_50;
                    pin.imageUrl = data.image_url;
                    pin.relegion = 'poi';

                    var infoBoxHtml = getDealInfoBox(data, i);

                    pin.setInfoBox(new InfoBox(infoBoxHtml, 'poi'));
                    bingMap.map.entities.push(pin);

                    Microsoft.Maps.Events.addHandler(pin,"click", function(e){
                            if(explorePanelMode == 'friend'){
                                    bingRecommendThisDeal(i, data.product_id);
                       }else{
                                bingAddToTripDeal(i, data.product_id);
                       }
                    });


                    Microsoft.Maps.Events.addHandler(pin,"rightclick", function(e){
                        MCevent = e;	
                        MCevent.Mtype='poi';
                        MCevent.MPushPin=pin;										  
                        $("#hoverInfoBox").hide();											  

                        $("#pushpin_Activity").removeClass('insert').html('');
                        document.getElementById('rightmenu').style.top=e.pageY+'PX';
                        document.getElementById('rightmenu').style.left=e.pageX+'PX';;
                        $("#rightmenu").show();
                        $("#myMenu").show();		
                    });

            }catch(err){ alert(err); }
	});
	
	/*if(bingMap.map.getZoom()<5){
            bingMap.map.setView({zoom:5}); 
	}
	
   var viewRect = Microsoft.Maps.LocationRect.fromLocations(dealLocationArray);
   bingMap.map.setView({bounds: viewRect});*/
   if(typeof cityZoomLevel[cityId]!='undefined' && typeof cityZoomLevel[cityId].points!='undefined' && cityZoomLevel[cityId].points!=0){
		var points=cityZoomLevel[cityId].points;
		var LocationArray=points.split(',');
		dealLocationArray = new Array();
		var location1 = new Microsoft.Maps.Location(LocationArray[0], LocationArray[1]);
		var location2 = new Microsoft.Maps.Location(LocationArray[2], LocationArray[3]);
		dealLocationArray.push(location1);
		dealLocationArray.push(location2);
		
	}
	var viewRect = Microsoft.Maps.LocationRect.fromLocations(dealLocationArray);
	bingMap.map.setView({bounds: viewRect});
	//alert(zoomlevel);
	if(bingMap.map.getZoom()<5){
            bingMap.map.setView({zoom:5}); 
	}/*dev-SN CHANGES related to bing map outlier|1-8-2013*/
	else if(bingMap.map.getZoom()>12){
		bingMap.map.setView({zoom: 10});
	}else if(typeof cityZoomLevel[cityId]!='undefined' && typeof cityZoomLevel[cityId].points!='undefined' && cityZoomLevel[cityId].points!=0){
			bingMap.map.setView({zoom: 10});
	}/*dev-SN CHANGES related to bing map outlier|1-8-2013|ends here*/
    document.getElementById('mapDiv').style.zIndex ="1";
    document.getElementById('containervectormap').style.zIndex ="0";
    visibleMap = 'bing';
    $('#flash-zoom').hide();
    $('#bing-zoom').show();
   $(this).mapOverlay("delete");
}//end of function plotDealDataOnBingMap

function plotActivityDataOnBingMap(places){
	POILocationArray=new Array();
	bingMap.map.entities.clear();
	pinArray=new Array();	
	var pinImage = "/images/activity_01.png";
		
	$.each(places, function(i,data){ 
		try{
			var location1=new Microsoft.Maps.Location(data.lat, data.lng);
			var pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(data.lat, data.lng), {icon: pinImage, height:53, width:43,textOffset:new Microsoft.Maps.Point(0,13)}); 
   			POILocationArray.push(location1); 
			
			pin.title = data.name;
			//pin.description = data.description;
			pin.imageUrl = data.thumb;
			pin.relegion = 'poi';
			pin.uniqueId= data.refer;
   			pinArray.push(pin); 
			var infoBoxHtml ='';
			infoBoxHtml +='<div class="padding gradientWhite">';
			infoBoxHtml +='<a href="javascript://" onclick="openActivityDetail(\'' + data.refer +'\', ' + i +');" ><img src="' + data.thumb + '" class="leftfloat loading"  width="90" /></a>';			
			if(data.name != null)		
			{infoBoxHtml +='<h3 class="reset"><a href="javascript://" onclick="openActivityDetail(\'' + data.refer +'\', ' + i +');" >' + data.name + '</a></h3>';}
						
			infoBoxHtml += '<div id="cityinfoButton1"><div class="fl"><input class="view" type="button" value="View" onclick="openActivityDetail(\'' + data.refer +'\', ' + i +');" /></div>';			
			//infoBoxHtml += '<span style="" id="bing_map_add_to_trip"><input class="view" type="button" value="Add to Trip" onclick="bingAddToTrip(' + i + ', ' + bucketId + ' );" /></span>';
			//infoBoxHtml += '<span id="bing_map_add_to_trip_'+i+'"></span>';
			infoBoxHtml += '<div class="fl" id="bing_map_add_to_trip" style="display:inline-block; margin-left:3px; margin-top:-3px;"></div>';
			infoBoxHtml +='</div>';			
			infoBoxHtml +='<div class="clearfloat"></div></div>';
			//bingAddToTrip(i, bucketId);
			pin.setInfoBox(new InfoBox(infoBoxHtml, 'poi'));
			bingMap.map.entities.push(pin);	
			
			/*Microsoft.Maps.Events.addHandler(pin,"click", function(e){
			   if(explorePanelMode == 'friend'){
					bingRecommendThisTrip(i, bucketId);
			   }else{				   
				    bingAddToTrip(i, bucketId);
				   }
			});*/				
		
			Microsoft.Maps.Events.addHandler(pin,"rightclick", function(e){
				MCevent = e;	
				MCevent.Mtype='poi';
				MCevent.MPushPin=pin;										  
				$("#hoverInfoBox").hide();											  
				
				$("#pushpin_Activity").removeClass('insert').html('');
				document.getElementById('rightmenu').style.top=e.pageY+'PX';
				document.getElementById('rightmenu').style.left=e.pageX+'PX';;
				$("#rightmenu").show();
				$("#myMenu").show();		
			 });
		
		}
		
		catch(err){ alert(err); }
	});
	
	if(bingMap.map.getZoom()<5){
		bingMap.map.setView({zoom:5}); 
	}
	
   var viewRect = Microsoft.Maps.LocationRect.fromLocations(POILocationArray);
   bingMap.map.setView({bounds: viewRect});
	document.getElementById('mapDiv').style.zIndex ="1";
	document.getElementById('containervectormap').style.zIndex ="0";
	visibleMap = 'bing';
	$('#flash-zoom').hide();
	$('#bing-zoom').show();
   $(this).mapOverlay("delete");
}

function getPoiDefaultImage(id){    
}//end of function getPoiDefaultImage

function getPoiInfoBox(data, i, bucketId, defaultImage, tripId, panel){
    //if panel is mytrip then buckedId contains data.id
    var infoBoxHtml ='';
    var tId = parseInt(tripId);
    infoBoxHtml +='<div class="gradientWhite">';
    data.description = $.trim(data.description);
    if(data.mediumPhotoUrl != 'null' && data.mediumPhotoUrl != null && data.mediumPhotoUrl != undefined)
        if(panel=='mytrip'){
            infoBoxHtml +='<div class="relative" style="display:inline-block;"><a href="javascript://" onclick="myTripDetailView(' + bucketId + ', ' + tId + ');" ><img src="' + data.mediumPhotoUrl + '" class="leftfloat loading"  width="330" height="150" onError="this.src=\'' + defaultImage + '\'"/>';
        }
        else if(panel=='friendtrip'){
            infoBoxHtml +='<div class="relative" style="display:inline-block;"><a href="javascript://" onclick="friendTripDetailView(' + bucketId + ', ' + tId + ',\' \');" ><img src="' + data.mediumPhotoUrl + '" class="leftfloat loading"  width="330" height="150" onError="this.src=\'' + defaultImage + '\'"/>';    
        }
        else{
            infoBoxHtml +='<div class="relative" style="display:inline-block;"><a href="javascript://" onclick="openInfoDetail(' + i + ', ' + bucketId + ');" ><img src="' + data.mediumPhotoUrl + '" class="leftfloat loading"  width="330" height="150" onError="this.src=\'' + defaultImage + '\'"/>';
        }
    if(data.name != null){
        infoBoxHtml +='<div class="absolute black-overlay-bing font_13 attrName" style="width:94%; bottom:0px; vertical-align: middle;">' + data.name;
        if(data.description != ''){
            infoBoxHtml +='<a href="javascript://" onclick="showDescription('+data.id+');"><span id="info_button_'+data.id+'" class="inforIconwhite fr">i</span> </a>';
        }
        infoBoxHtml+= '</div></a></div>';
    }//end of if block			
    if(data.description != ''){
        infoBoxHtml += '<p class="hide relative" id="bingBlurb_text_' + data.id + '" class="clearfloat"><span class="arrow-up-bingbox"></span>' + data.description + '</p>';
    }		
    if(data.checkinCount != null){ 
        infoBoxHtml += '<div class="bg_gray font_13 marginT5 marginB5" style="width: 96%; color:slategrey;">' + data.checkinCount + ' Checkins'; 				
        if(data.tipCount != null){
            infoBoxHtml += ' &bull; ' + data.tipCount + ' Tips';
            infoBoxHtml += '<img align="right" src="/images/poweredByFoursquare_16x16.png">';
            infoBoxHtml += '</div>';
        }//end of if block
    }//end of if block
    infoBoxHtml += '<div id="">';
    if(panel=='mytrip'){
        infoBoxHtml += '<div id="bing_map_add_to_trip" style="display:inline-block; margin-left:5px;" class="fl">';
        infoBoxHtml +='<a class="btnIconRemove font_13" onclick="removeItemFromTrip(\''+bucketId+'\', ' + true + ', \''+""+'\' ,\''+data.categoryId+'\');" style="top: 0px;" href="javascript://"> Remove </a>';
        infoBoxHtml +='</div>';        
        infoBoxHtml += '<div style="display:inline;" class="fr"><input class="book_now font_13" type="button" value="View More" onclick="myTripDetailView(' + bucketId + ', ' + tId + ');" /></div>';
    }
    else if(panel=='friendtrip'){
        infoBoxHtml += '<div id="bing_map_add_to_trip" style="display:inline-block; margin-left:5px;" class="fl">';
        infoBoxHtml +='</div>';        
        infoBoxHtml += '<div style="display:inline;" class="fr"><input class="book_now font_13" type="button" value="View More" onclick="friendTripDetailView(' + bucketId + ', ' + tId + ',\' \');" /></div>'; 
    }
    else{
        infoBoxHtml += '<div id="bing_map_add_to_trip" style="display:inline-block; margin-left:5px;" class="fl"></div>';
        infoBoxHtml += '<div style="display:inline;" class="fr"><input class="book_now font_13" type="button" value="View More" onclick="openInfoDetail(' + i + ', ' + bucketId + ' );" /></div>';
    } 
    infoBoxHtml +='</div>';			
    infoBoxHtml +='<div class="clearfloat"></div></div>';
    return infoBoxHtml;
}//end of function getPoiInfoBox

function plotRecommendedDataOnBingMap(places, bucketId){
    //var zoomlevel = '';
    POILocationArray = new Array();    
    clearBingMapEntity();
    pinArray = new Array();
    /*dev-SN CHANGES related to bing map outlier|1-8-2013*/
    var cityId = document.getElementById('hdnCityId').value;
    
    /*if(typeof cityZoomLevel[cityId]!='undefined'){
        zoomlevel=cityZoomLevel[cityId].cityZoomLevel;
    }*/
    
    /*dev-SN CHANGES related to bing map outlier|1-8-2013 ends here*/
	
	if(places == undefined || places == 'undefined' || places == ''){
            return;
        }
	
	var pinImage = "/images/poi_01.png";
	switch(places[0].categoryId){
            case '1': pinImage = "/images/poi_01.png"; break;
            case '3': pinImage = "/images/restaurant_01.png"; break;
            case '4': pinImage = "/images/nightlife_01.png"; break;
            case '6': pinImage = "/images/bing-shopping-pushpin.png"; break;
            case '8': pinImage = "/images/activity_01.png"; break;	
	}
	
        var defaultImage = new Array();
        defaultImage[1] = '/images/attraction_default.gif';
        defaultImage[3] = '/images/restaurant_default.gif';
        defaultImage[4] = '/images/nightlife_default.gif';
        defaultImage[6] = '/images/Shoping_Default.png';

	$.each(places, function(i, data){ 
            try{
                var location1 = new Microsoft.Maps.Location(data.lat, data.lng);
                var pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(data.lat, data.lng), {icon: pinImage, height:53, width:43,textOffset:new Microsoft.Maps.Point(0,13), id: data.id}); 
                POILocationArray.push(location1); 
			
                pin.title = data.name;
                pin.description = data.description;
                pin.imageUrl = data.mediumPhotoUrl;
                pin.relegion = 'poi';
                pin.uniqueId= data.id;
                pinArray.push(pin); 
                
                var infoBoxHtml = getPoiInfoBox(data, i, bucketId, defaultImage[bucketId], 0, 'plan');
			
                pin.setInfoBox(new InfoBox(infoBoxHtml, 'poi'));
                bingMap.map.entities.push(pin);
                
                Microsoft.Maps.Events.addHandler(pin,"click", function(e){
                   if(explorePanelMode == 'friend'){
                        bingRecommendThisTrip(i, bucketId);
                   }else{				   
                        bingAddToTrip(i, bucketId);
                    }
                });	
                Microsoft.Maps.Events.addHandler(pin,"rightclick", function(e){
                    MCevent = e;	
                    MCevent.Mtype='poi';
                    MCevent.MPushPin=pin;										  
                    $("#hoverInfoBox").hide();											  

                    $("#pushpin_Activity").removeClass('insert').html('');
                    document.getElementById('rightmenu').style.top=e.pageY+'PX';
                    document.getElementById('rightmenu').style.left=e.pageX+'PX';;
                    $("#rightmenu").show();
                    $("#myMenu").show();		
                 });
		
            }catch(err){ alert(err); }
	});	
	
	if(typeof cityZoomLevel[cityId]!='undefined' && typeof cityZoomLevel[cityId].points!='undefined' && cityZoomLevel[cityId].points!=0){
		var points=cityZoomLevel[cityId].points;
		var LocationArray=points.split(',');
		POILocationArray = new Array();
		var location1 = new Microsoft.Maps.Location(LocationArray[0], LocationArray[1]);
		var location2 = new Microsoft.Maps.Location(LocationArray[2], LocationArray[3]);
		POILocationArray.push(location1);
		POILocationArray.push(location2);
		
	}
	var viewRect = Microsoft.Maps.LocationRect.fromLocations(POILocationArray);
	bingMap.map.setView({bounds: viewRect});
	//alert(zoomlevel);
	if(bingMap.map.getZoom()<5){
            bingMap.map.setView({zoom:5}); 
	}/*dev-SN CHANGES related to bing map outlier|1-8-2013*/
	else if(bingMap.map.getZoom()>12){
		bingMap.map.setView({zoom: 10});
	}else if(typeof cityZoomLevel[cityId]!='undefined' && typeof cityZoomLevel[cityId].points!='undefined' && cityZoomLevel[cityId].points!=0){
			bingMap.map.setView({zoom: 10});
	}/*dev-SN CHANGES related to bing map outlier|1-8-2013|ends here*/
	if(visibleMap == 'bing'){	
            document.getElementById('mapDiv').style.zIndex ="1";
            document.getElementById('containervectormap').style.zIndex ="0";
            $('#flash-zoom').hide();
            $('#bing-zoom').show();		
	}
        visibleMap = 'bing';
        $(this).mapOverlay("delete");
}//end of function plotRecommendedDataOnBingMap

function showPoiOnMap(title,category,lat,long,Img,description, address, phone, id, from, widget){
	//alert(title + ', ' + category + ', ' + lat + ', ' + long + ', ' + Img + ',' + id + ', ' + description + ', ' + address + ', ' + widget);	
	//return false;

	if(bingMap==false)
		bingMap = new BingMap();
		
	$("#welcomeBox").hide();
	$("#PlanBookComponent").hide();

	visibleMap = 'bing';
	$('#containervectormap').hide();
	$('#flash-zoom').hide();
	$('#bing-zoom').show();

	 var poiImages = new Array();
	 var eventImages = new Array();
	 var restaurantImages = new Array();
	 var flag=false;
	 
	 eventImages["music"] = "event_01.png";
	 eventImages["conference"] = "event_02.png";
	 eventImages["learning_education"] = "event_03.png";
	 eventImages["family_fun_kids"] = "event_04.png";
	 eventImages["festivals_parades"] = "event_05.png";
	 eventImages["movies_film"] = "event_06.png";
	 eventImages["food"] = "event_07.png";
	 eventImages["fundraisers"] = "event_08.png";
	 eventImages["art"] = "event_09.png";
	 eventImages["support"] = "event_10.png";
	 eventImages["books"] = "event_11.png";
	 eventImages["attractions"] = "event_12.png";
	 eventImages["community"] = "event_13.png";
	 eventImages["business"] = "event_14.png";
	
	 
	 
	 poiImages["active"] = "poi_01.png";
	 poiImages["arts"] = "poi_02.png";
	 poiImages["beautysvc"] = "poi_03.png";
	 poiImages["education"] = "poi_04.png";
	 poiImages["financialservices"] = "poi_05.png";
	 poiImages["food"] = "poi_06.png";
	 poiImages["health"] = "poi_07.png";
	 poiImages["homeservices"] = "poi_08.png";
	 poiImages["hotelstravel"] = "poi_09.png";
	 poiImages["localflavor"] = "poi_10.png";
	 poiImages["massmedia"] = "poi_11.png";
	 poiImages["nightlife"] = "poi_12.png";
	 poiImages["pets"] = "poi_13.png";
	 poiImages["professional"] = "poi_14.png";
	 
	 restaurantImages["afghani"] = "restaurant_01.png";
	 restaurantImages["african"] = "restaurant_02.png";
	 restaurantImages["newamerican"] = "restaurant_03.png";
	 restaurantImages["tradamerican"] = "restaurant_04.png";
	 restaurantImages["asianfusion"] = "restaurant_05.png";
	 restaurantImages["argentine"] = "restaurant_06.png";
	 restaurantImages["bbq"] = "restaurant_07.png";
	 restaurantImages["basque"] = "restaurant_08.png";
	 restaurantImages["belgian"] = "restaurant_09.png";
	 restaurantImages["brasseries"] = "restaurant_10.png";
	 restaurantImages["brazilian"] = "restaurant_11.png";
	 restaurantImages["breakfast_brunch"] = "restaurant_12.png";
	 restaurantImages["british"] = "restaurant_13.png";
	 restaurantImages["buffets"] = "restaurant_14.png";
	
	pinImage = 'poi_01.png'
	switch(widget){
		case 'event' :	
			pinImage = eventImages[category]? eventImages[category] : "event_01.png" ;
			break;
		case 'restaurants' : 
			pinImage = restaurantImages[category]? restaurantImages[category] : "restaurant_01.png" ;
			break;
		case 'poi' : 
			pinImage = poiImages[category]? poiImages[category] : "poi_01.png" ;
			break;
		default : 
			pinImage = 	"poi_01.png";
	}

	pinImage = "/images/" + pinImage;
	
	try{
		var location1=new Microsoft.Maps.Location(lat, long);
		var pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(lat, long), {icon: pinImage, height:53, width:43,textOffset:new Microsoft.Maps.Point(0,13)}); 
		
		//POILocationArray.push(location1);
		
		pin.title = title;
		pin.description = description;
		pin.imageUrl = Img;
		pin.relegion = 'poi';
		var infoBoxHtml ='';
		infoBoxHtml+= ' <div class="relative"><img class="ballTop" src="/images/ballTop.png" /><div class="ballMid">';
		infoBoxHtml +='<div class="padding">';
		infoBoxHtml +='	<img src="' + Img + '" class="leftfloat loading"  width="90" height="60" />';
		infoBoxHtml +='	<h3 class="reset">' + title + '</h3>';
		infoBoxHtml +='	<div class="rightfloat" style="width:230px;">';
		infoBoxHtml +='		<div class="leftfloat ratings"><span class="rating">&nbsp;</span></div>';
		infoBoxHtml +='		<div class="rightfloat" style="width:70px;"><a href="javascript://"><img src="/images/facebook.png" /> <img src="/images/twitter.png" /> <img src="/images/email.png" /></a></div> ';
		infoBoxHtml +='		<p class="clearfloat"><span id="address" >' + address + '</span><span id="phone">' + phone +' </span></p>';
		infoBoxHtml +='	</div>';
		infoBoxHtml +='	<p class="clearfloat">' + description + '</p>';
		infoBoxHtml +='	<div class="leftfloat" style="width:100px;">&nbsp;</div>';
		
		apiId = id;
		ptitle = title;
		ptitle = ptitle.replace("'","\'");
		pdescription = description;
		pdescription = pdescription.replace("'","\'");

		if(flag==false)		
			infoBoxHtml +='	<p class="leftfloat"><a id="addremovetoTrip" href="javascript://" class="addtotrip" onclick="callPoiStore(\''+apiId+'\',\''+widget+'\',\''+bingaddslashes(ptitle)+'\',\''+bingaddslashes(pdescription)+'\',\''+Img+'\',\''+from+'\')">&nbsp;</a></p>';
		else
			infoBoxHtml +='	<p class="leftfloat"><a id="addremovetoTrip" href="javascript://" class="removetotrip" onclick="callPoiRemove(\''+apiId+'\',\''+widget+'\',\''+bingaddslashes(ptitle)+'\',\''+bingaddslashes(pdescription)+'\',\''+Img+'\',\''+from+'\')">&nbsp;</a></p>';		
		
		infoBoxHtml +='	<p style="height:8px;"></p>';
		infoBoxHtml +='	<a class="rightfloat" href="http://www.yelp.com"><img src="images/yelp.png" width="50" height="20"/></a>';
		infoBoxHtml +='	<p style="height:3px;"></p>';
		infoBoxHtml +='</div></div><img class="ballBot" src="/images/ballBot.png" /></div>';
		
		pin.setInfoBox(new InfoBox(infoBoxHtml, 'poi'));
		bingMap.map.entities.push(pin);
	
// "this.className= this.className==\'addtotrip\' ? \'removetotrip\' : \'addtotrip\';		
		
//For showing right menu list		
	
		Microsoft.Maps.Events.addHandler(pin,"rightclick", function(e){
							MCevent = e;	
							MCevent.Mtype='poi';
							MCevent.MPushPin=pin;										  
			$("#hoverInfoBox").hide();											  
			
			$("#pushpin_Activity").removeClass('insert').html('');
			document.getElementById('rightmenu').style.top=e.pageY+'PX';
			document.getElementById('rightmenu').style.left=e.pageX+'PX';;
			$("#rightmenu").show();
			$("#myMenu").show();		
		 });
	
	}
	
	catch(err){ alert(err); }
	if(bingMap.map.getZoom()<5){
		bingMap.map.setView({zoom:5}); 
	}
	
   POILocationArray.push(location1); 
   var viewRect = Microsoft.Maps.LocationRect.fromLocations(POILocationArray);
   bingMap.map.setView({bounds: viewRect});
   

}

function callPoiStore(apiId,type,title,desc,img,from)
{
	//alert(type);
	//alert(title);
	//alert(desc);
	//alert(img);
	
	tripPartId = document.getElementById("tripPartId").value;
	//alert(tripPartId);
	//return false;		
    url = '/tripapi/addpoieventrestaurant/from/'+from+'/apiId/'+apiId+'/objType/'+type+'/title/'+title+'/description/'+desc+'/imgUrl/'+img+'/tripPartId/'+tripPartId+'/rand/' + parseInt(Math.random() * 99999999);

	$.get(url, function(data) {
	 document.getElementById('addremovetoTrip').className ='removetotrip';
	 document.getElementById('addremovetoTrip').onclick = function(){callPoiRemove(data,type,title,desc,img,from);}

	});

}

function callPoiRemove(apiId,type,title,desc,img,from)
{
	tripPartId = document.getElementById("tripPartId").value;
	//alert(tripPartId);
	//return false;

    url = '/tripapi/removepoieventrestaurant/objType/'+type+'/apiId/'+apiId+'/tripPartId/'+tripPartId+'/rand/' + parseInt(Math.random() * 99999999);
	
	$.get(url, function(data) {
	 document.getElementById('addremovetoTrip').className ='addtotrip';
	 document.getElementById('addremovetoTrip').onclick = function(){callPoiStore(apiId,type,title,desc,img,from);}
	});

}

function bingaddslashes(str) {
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

function plotPushPinonBingMap(latitude, longitude){		
    if(bingMap == false){
        bingMap = new BingMap();
    }
    visibleMap = 'bing';	
    bingMap.map.setView({zoom:18,center: new Microsoft.Maps.Location(latitude,longitude)});	
    var placePin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(latitude, longitude), null); 0
    bingMap.map.entities.push(placePin);
}//end of function plotPushPinonBingMap

function showDescription(id){
    if($('#bingBlurb_text_'+id).hasClass('hide') == true){
	$('#info_button_'+id).css('background-color','#FFA500');
	$('#bingBlurb_text_'+id).removeClass('hide');
    }else{
	$('#info_button_'+id).css('background-color','#DDDDDD');
	$('#bingBlurb_text_'+id).addClass('hide');
    }
}//end of function showDescription
/***************************************************************/
  /* Add support for pop-up info boxes. 
  /* Added by Nilay on 10th June, 2011
/***************************************************************/

// InfoBox class
function InfoBox(html, pinType) {
 this.div;  				// Container div element
 this.html = html; 		// HTML to display inside the infobox 
 this.offsetX = 100;
 this.offsetY = 175;
 this.divName = 'bing_city_info';
 this.pushPinOpenEvent = 'mouseover';
 if(pinType == 'poi'){
         this.offsetX = 60;
         this.offsetY = 200;
         this.divName = 'bing_attraction_info';
 }
}

// Add the infobox div to the page
InfoBox.prototype.show = function(e, which) {
 if(which=='click'){
      this.pushPinOpenEvent = which;
 }

 if (this.div == undefined) {
  // Create the container div.
  this.div = document.getElementById(this.divName);
  var mapDiv = document.getElementById('mapDiv');
  //mapDiv.appendChild(this.div);		// to fix the info blurb z-index issue. Aayushi's suggestion
 }
  this.div.innerHTML = this.html;

 // Calculate the pixel position of the pushpin relative to the map control
 var pinLocation = bingMap.map.tryLocationToPixel(e.target.getLocation(), Microsoft.Maps.PixelReference.control);

 // Display the infobox at the correct pixel coordinates
 x = pinLocation.x + 15;
 y = pinLocation.y - 15;
 this.div.style.left = x + "px";
 this.div.style.top = y + "px";
 this.div.style.display = "block";
};

// Hide the infobox
InfoBox.prototype.hide = function(e) {
 if (this.div != undefined)
      if(this.pushPinOpenEvent != 'click'){
              paarent = this;
      setTimeout( function() { paarent.div.style.display = "none";}, 1000 );

              //this.div.style.display = "none";
      }
};

// Extend the Pushpin class to add an InfoBox object
Microsoft.Maps.Pushpin.prototype.setInfoBox = function(infoBox) {
 if (typeof this.infoBox != undefined && this.infoBox != undefined && this.infoBox != null) {
  this.removeInfoBox();
 }
 // Assign the infobox to this pushpin
 this.infoBox = infoBox;

 // Add handlers for mouse events
 this.mouseoverHandler = Microsoft.Maps.Events.addHandler(this, 'mouseup',
  function(e) { 
              //infoBox.show(e); 
      }
 );
  this.clickHandler = Microsoft.Maps.Events.addHandler(this, 'click',
  function(e) { 

              infoBox.show(e, 'click'); 
      }
 );

      /*
      this.mouseoutHander = Microsoft.Maps.Events.addHandler(this, 'mouseout',
              function(e) { infoBox.hide(e); }
      );
      */
}

// Extend the Pushpin class to remove an existing InfoBox object
Microsoft.Maps.Pushpin.prototype.removeInfoBox = function() {
 this.infoBox = null;

 // Remove handlers for mouse events
 Microsoft.Maps.Events.removeHandler(this.mouseoverHandler);
 Microsoft.Maps.Events.removeHandler(this.clickHandler);
 Microsoft.Maps.Events.removeHandler(this.mouseoutHander);
}
/***************************************************************/
//hostels on bing map from modified data in plan panel
function plotHostelDataOnBingMapNew(hostelData){
  hostelLocationArray = new Array();
  bingMap.map.entities.clear();
  pinArray = new Array();
  if(hostelData == undefined || hostelData == 'undefined' || hostelData == '' || hostelData==0){
      return;
  }
      /*dev-SN CHANGES related to bing map outlier|1-14-2013*/
      var cityId = document.getElementById('hdnCityId').value;
      /*dev-SN CHANGES related to bing map outlier|1-14-2013 ends here*/	
  var pinImage = "/images/hostel_01.png";
  $.each(hostelData, function(i, data){ 
      try{
              if((data.latitude == '0.0000000' && data.longitude == '0.0000000') || (data.latitude == '0' && data.longitude == '0')){
              }else{
                  var location1 = new Microsoft.Maps.Location(data.latitude, data.longitude);
                  var pin = new Microsoft.Maps.Pushpin(location1, {icon: pinImage, height:53, width:43,textOffset:new Microsoft.Maps.Point(0,13)}); 
                  hostelLocationArray.push(location1); 
                  if(toString(data.propertyName).length > 22){
                      hostelName = data.propertyName.substring(0, 22) + '...';
                  }else{ 
                      hostelName = data.propertyName;
                  }
                  pin.title = hostelName;
                  pin.description = hostelName;
                  pin.imageUrl = data.propertyImage;
                  pin.relegion = 'poi';
                  pin.uniqueId= data.propertyNumber;
                  pinArray.push(pin);                        

                  var infoBoxHtml = getHostelInfoBoxNew(data, i);

                  pin.setInfoBox(new InfoBox(infoBoxHtml, 'poi'));
                  bingMap.map.entities.push(pin);		


                  Microsoft.Maps.Events.addHandler(pin,"click", function(e){			  
                          bingAddToTripHostel(i, data.propertyNumber);
                   });

                  Microsoft.Maps.Events.addHandler(pin,"rightclick", function(e){
                      MCevent = e;	
                      MCevent.Mtype='poi';
                      MCevent.MPushPin=pin;										  
                      $("#hoverInfoBox").hide();											  

                      $("#pushpin_Activity").removeClass('insert').html('');
                      document.getElementById('rightmenu').style.top=e.pageY+'PX';
                      document.getElementById('rightmenu').style.left=e.pageX+'PX';;
                      $("#rightmenu").show();
                      $("#myMenu").show();		
                   });

          }//end of else block
      }
      catch(err){ alert(err); }
  });
      //added by seema
      //alert(bingMap.map.getZoom());
      /*if(bingMap.map.getZoom()<5){
              bingMap.map.setView({zoom:5}); 
      }//added by seema

 var viewRect = Microsoft.Maps.LocationRect.fromLocations(hostelLocationArray);
 bingMap.map.setView({bounds: viewRect});*/
 /*dev-SN CHANGES related to bing map outlier|1-14-2013*/
 if(typeof cityZoomLevel[cityId]!='undefined' && typeof cityZoomLevel[cityId].points!='undefined' && cityZoomLevel[cityId].points!=0){
              var points=cityZoomLevel[cityId].points;
              var LocationArray=points.split(',');
              hostelLocationArray = new Array();
              var location1 = new Microsoft.Maps.Location(LocationArray[0], LocationArray[1]);
              var location2 = new Microsoft.Maps.Location(LocationArray[2], LocationArray[3]);
              hostelLocationArray.push(location1);
              hostelLocationArray.push(location2);

      }
      var viewRect = Microsoft.Maps.LocationRect.fromLocations(hostelLocationArray);
      bingMap.map.setView({bounds: viewRect});
      //alert(zoomlevel);
      if(bingMap.map.getZoom()<5){
          bingMap.map.setView({zoom:5}); 
      }
      else if(typeof cityZoomLevel[cityId]!='undefined' && typeof cityZoomLevel[cityId].points!='undefined' && cityZoomLevel[cityId].points!=0){
                      bingMap.map.setView({zoom: 10});
      }/*dev-SN CHANGES related to bing map outlier|1-14-2013|ends here*/

      if(visibleMap == 'bing'){	
              document.getElementById('mapDiv').style.zIndex ="1";
              document.getElementById('containervectormap').style.zIndex ="0";
              $('#flash-zoom').hide();
              $('#bing-zoom').show();		
      }
      visibleMap = 'bing';
      $(this).mapOverlay("delete");
      /*document.getElementById('mapDiv').style.zIndex ="1";
      document.getElementById('containervectormap').style.zIndex ="0";
      visibleMap = 'bing';
      $('#flash-zoom').hide();
      $('#bing-zoom').show();
  $(this).mapOverlay("delete");*/
}

function getHostelInfoBoxNew(data, i, bucketId, tripItemId, tripId, panel){
    //data, i, bucketId, tripItemId, tripId, panel
    var infoBoxHtml ='';
    if(toString(data.propertyName).length > 22){
        hostelName = data.propertyName.substring(0, 22) + '...';
    }else{ 
        hostelName = data.propertyName;
    }
   // var hostelImage_url = data.images[0].propertyImage.replace('_s.jpg','_l.jpg');
   var hostelImage_url = data.propertyImage;
    infoBoxHtml +='<div class="gradientWhite">';
    if(panel == 'mytrip'){
        infoBoxHtml += '<div class="relative" style="display:inline-block;"><a href="javascript://;" onClick="myTripDetailView(' + tripItemId + ', ' + tripId + ');"><img class="thumb loading" src="' + hostelImage_url  +  '" style="float:left;" width="330" height="150" onError="this.src=\'' + '/images/hostel_grid_default.gif' + '\'" /></a>';
    }else if(panel == 'friendtrip'){
        infoBoxHtml += '<div class="relative" style="display:inline-block;"><a href="javascript://;" onClick="friendTripDetailView(' + tripItemId + ', ' + tripId + ',\' \');"><img class="thumb loading" src="' + hostelImage_url  +  '" style="float:left;" width="330" height="150" onError="this.src=\'' + '/images/hostel_grid_default.gif' + '\'" /></a>';
    }
    else{        
        infoBoxHtml += '<div class="relative" style="display:inline-block;"><a href="javascript://;" onClick="openhostelDetailPlan(' + data.propertyNumber + ',' + i +' );"><img class="thumb loading" src="' + hostelImage_url  +  '" style="float:left;" width="330" height="150" onError="this.src=\'' + '/images/hostel_grid_default.gif' + '\'" /></a>';
    }    
    infoBoxHtml +='<div class="absolute black-overlay-bing font_13 attrName" style="width:97%; bottom:0px; vertical-align: middle;">' + hostelName;
    infoBoxHtml +='<a href="javascript://" onclick="showDescription(\'hostel_'+data.propertyNumber+'\');"><span id="info_button_hostel_'+data.propertyNumber+'" class="inforIconwhite fr">i</span> </a>';
    infoBoxHtml+= '</div></a></div>';
	if(typeof data.shortintro!='undefined' && data.shortintro!=null){
		if(data.shortintro.length < 300){
			infoBoxHtml += '<p class="hide relative" id="bingBlurb_text_hostel_' + data.propertyNumber + '" class="clearfloat"><span class="arrow-up-bingbox"></span>' + data.shortintro + '</p>';
		}else{
			infoBoxHtml += '<p class="hide relative" id="bingBlurb_text_hostel_' + data.propertyNumber + '" class="clearfloat"><span class="arrow-up-bingbox"></span>' + data.shortintro.substring(0,300) + '...</p>';
		}
	}
   /* if(data.bedPrices.cheapestDorm != undefined){	
        $.each(data.bedPrices.cheapestDorm, function(j, dprice){ 
            var dormPrice = dprice;
            infoBoxHtml += '<div class="bg_gray font_13 marginT5 marginB5" style="width: 97%; color:slategrey;">Dorms From: ' +dormPrice +' '+j +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+data.averageRating+'% Overall Rating</div>'; 
        });
    }*/
    infoBoxHtml +='<div class="clearfloat"></div><div id="">';
    if(panel == 'mytrip'){
        infoBoxHtml +='<div class="fl" id="bing_map_add_to_trip" style="display:inline-block; margin-left:3px;">';
        infoBoxHtml +='<a class="btnIconRemove font_13" onclick="removeItemFromTrip(\''+tripItemId+'\', ' + true + ', \''+""+'\' ,\''+bucketId+'\');" style="top: 0px;" href="javascript://"> Remove </a>';        
        infoBoxHtml +='</div>';
        infoBoxHtml +='<div class="fr"><input class="book_now font_13" type="button" value="View More" onclick="myTripDetailView(' + tripItemId + ', ' + tripId + ');" /></div>';
    }
    else if(panel == 'friendtrip'){
        infoBoxHtml +='<div class="fl" id="bing_map_add_to_trip" style="display:inline-block; margin-left:3px;">';
        infoBoxHtml +='</div>';
        infoBoxHtml +='<div class="fr"><input class="book_now font_13" type="button" value="View More" onclick="friendTripDetailView(' + tripItemId + ', ' + tripId + ',\' \');" /></div>';
    }
    else{
        infoBoxHtml +='<div class="fl" id="bing_map_add_to_trip" style="display:inline-block; margin-left:3px;"></div>';
        infoBoxHtml +='<div class="fr"><input class="book_now font_13" type="button" value="View More" onclick="openhostelDetailPlan(' + data.propertyNumber + ',' + i +' );" /></div>';        
    }
    
    infoBoxHtml +='</div>';
    infoBoxHtml +='<div class="clearfloat"></div></div>';
    return infoBoxHtml;
}//end of function getHostelInfoBox