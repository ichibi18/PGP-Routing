Ext.Loader.setConfig({
disableCaching: false,
enabled: true,
paths: {
    GeoExt:'lib/geoext',
    MyPath:'/App'		
	} 
});


Ext.require('MyPath.Panelko');


Ext.application({
    name: 'OL3EXT4',
    launch: function () {
		
		
		/*
        var map = new OpenLayers.Map({});
        
        var wms = new OpenLayers.Layer.WMS(
            "OpenLayers WMS",
            "http://vmap0.tiles.osgeo.org/wms/vmap0?",
            {layers: 'basic'}
        );
        s
        map.addLayers([wms]);
        
        mappanel = Ext.create('GeoExt.panel.Map', {
            title: 'The GeoExt.panel.Map-class',
            map: map,
            center: '12.3046875,51.48193359375',
            zoom: 6,
            stateful: true,
            stateId: 'mappanel',
//            extent: '12.87,52.35,13.96,52.66',
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                    text: 'Current center of the map',
                    handler: function(){
                        var c = GeoExt.panel.Map.guess().map.getCenter();
                        Ext.Msg.alert(this.getText(), c.toString());
                    }
                }]
            }]
        });

        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                mappanel
            ]
        });
		*/
		
			
		
        var mappanel = Ext.create('Ext.panel.Panel', {
            title: "Test Map",     
			layout:'fit',
			split:true,
			showHeader: false,					
			flex:1,
            listeners: {
                afterrender: function () {					
					var wh = this.ownerCt.getSize();
					Ext.applyIf(this, wh);
					
					var pgp_basemap_cache = new OpenLayers.Layer.NAMRIA(
						'NAMRIA Basemap',
						'http://202.90.149.252/ArcGIS/rest/services/Basemap/PGS_Basemap/MapServer',
						{
							isBaseLayer: true
							
						}
					);

					var municipal_boundary = new OpenLayers.Layer.WMS( 
						'Admin Boundary',
						'http://geoserver.namria.gov.ph/geoserver/geoportal/wms', 
						{
							layers: 'geoportal:adminbnd_munic',
							transparent: true 
						},
						{
							isBaseLayer: false,
							opacity: 0.2
						}
					);
					
					var Soil = new OpenLayers.Layer.WMS(
						'Soil',
						'http://geoserver.namria.gov.ph/geoserver/geoportal/wms', 
						{
							layers:'da_soil',
							transparent:false						
						},
						{
							isBaseLayer:false,
							opacity:0.5
						}
					);
					
					var Peace = new OpenLayers.Layer.WMS(
						'Peace',
						'http://geoserver.namria.gov.ph/geoserver/geoportal/wms', 
						{
							layers:'geoportal:cbms_peace',
							transparent:false						
						},
						{
							isBaseLayer:false,
							opacity:0.5
						}
					);
					
					this.map = new OpenLayers.Map(
						// render the map to the body of this panel
						this.body.dom.id,
						{ 
							controls: [
					        	new OpenLayers.Control.Navigation(),
					        	new OpenLayers.Control.LayerSwitcher(),
					        	new OpenLayers.Control.Zoom(),
								new OpenLayers.Control.MousePosition()
							],
							fallThrough: true,							
							projection: 'EPSG:900913'
						}
					);
					
					var vectorLayer = new OpenLayers.Layer.Vector('vector test',
					{
						//isBaseLayer: true,
						isBaseLayer:false,
						
					});
					
					var vectorLine = new OpenLayers.Layer.Vector('vector test',
					{
						//isBaseLayer: true,
						isBaseLayer:false,
						
					});
					
					//Google code added
					
					
					//Google code end here
					
					var epsg900913 = new OpenLayers.Projection('EPSG:900913');
					var epsg4326   = new OpenLayers.Projection('EPSG:4326');
					
					 
					//var p1 = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(121.00,14.58).transform(epsg4326,epsg900913));
					var p1 = new OpenLayers.Geometry.Point(121.00,14.58).transform(epsg4326,epsg900913);	
					var p2 = new OpenLayers.Geometry.Point(13392122,1762684);
					
					
						
					var line1 = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString([p1,p2]));
					vectorLayer.addFeatures([new OpenLayers.Feature.Vector(p1),new OpenLayers.Feature.Vector(p2),line1]);			

					
					
					
					
					//this.map.addLayers([Peace,Soil,municipal_boundary, pgp_basemap_cache]);
					this.map.addLayers([vectorLayer,pgp_basemap_cache]);
					//this.map.addLayer(vectorLayer);											
					this.map.zoomToMaxExtent();	
					
					
                },
                // The resize handle is necessary to set the map!
				resize: function () {
                    var size = [document.getElementById(this.id + "-body").offsetWidth, document.getElementById(this.id + "-body").offsetHeight];
                    console.log(size);
                    this.map.updateSize(size);
                }
            }
        });
        Ext.create('Ext.container.Viewport', {	
            layout: 'hbox',
            items: [
				{ xtype:'Panel1',
				  title:'Route',
				  listeners:{
						posted: function(p1,p2){
							Ext.Msg.alert('Fire', p1+p2);
						}}
				  
				},			
				mappanel			
            ]
        });
		
		
    }
});

