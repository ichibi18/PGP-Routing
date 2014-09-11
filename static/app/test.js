// create a map and draw a simple route
var MyFirstMap = new OpenLayers.Map('map');
var ol_wms = new OpenLayers.Layer.WMS(
          "OpenLayers WMS",
          "http://labs.metacarta.com/wms/vmap0",
          {layers: 'basic'}
      );
MyFirstMap.addLayers([ol_wms]);
MyFirstMap.addControl(new OpenLayers.Control.LayerSwitcher());

MyFirstMap.zoomToMaxExtent();
MyFirstRoute = new YourNavigation.Route(MyFirstMap);
var flat=51.158883504779;
var flon=3.220214843821;
var tlat=51.241492039675;
var tlon=4.472656250021;
MyFirstRoute.waypoint("from").lonlat = new OpenLayers.LonLat(flon,flat);
MyFirstRoute.waypoint("to").lonlat = new OpenLayers.LonLat(tlon,tlat);
MyFirstRoute.draw(MyCallBack);

//display the response from the route request:
function MyCallBack(response) {
  alert(response);
}