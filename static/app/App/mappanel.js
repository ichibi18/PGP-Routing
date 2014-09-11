Ext.define('MyPath.mappanel',{
	extend:'Ext.panel.Panel',
	alias:'Widget.mappanel1',
	title: "Test Map",   			
	layout:'fit',
	region:'center',
	split:true,
	showHeader: false,		
	initComponent:function(){		
		this.on('afterrender', function () {					
			var wh = this.ownerCt.getSize();
			Ext.applyIf(this, wh);
					
			var pgp_basemap_cache = new OpenLayers.Layer.NAMRIA(
				'NAMRIA Basemap',
				'http://202.90.149.252/ArcGIS/rest/services/Basemap/PGS_Basemap/MapServer',
				{
					isBaseLayer: true							
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
					new OpenLayers.Control.MousePosition(),
					new OpenLayers.Control.Permalink({anchor: true})
					
				],
				fallThrough: true,							
				projection: 'EPSG:900913'
				}
			);					
				
			//this.map.addControl(new OpenLayers.Control.Permalink({anchor: true}));
			this.map.addLayer(pgp_basemap_cache);			
			
			//if (!this.map.getCenter()) this.map.zoomToMaxExtent();			
			this.map.zoomToMaxExtent();	
		});
		
         // The resize handle is necessary to set the map!
		this.on('resize', function () {
           var size = [document.getElementById(this.id + "-body").offsetWidth, document.getElementById(this.id + "-body").offsetHeight];
           console.log(size);
           this.map.updateSize(size);
         });
		this.callParent();   
    }	
	
});


