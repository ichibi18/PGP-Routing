//var SourceDest={};	

Ext.define('MyPath.Routing',{
	extend: 'Ext.panel.Panel',	
	width:400,			
	alias: 'widget.Routing',			
	mapContainer:'',   		
	autoScroll:true,
	findRoute:function(Srclat, Srclong, Destlat, Destlong, callback){
			
		Ext.Ajax.request({			
			 url : 'http://localhost:3000/www.yournavigation.org/api/1.0/gosmore.php' +
						'?&flat=' + Srclat +  
						'&flon=' + Srclong +
						'&tlat=' + Destlat + 
						'&tlon=' + Destlong +  
						'&v=motorcar&fast=0&layer=mapnik&instructions=1&format=geojson', 					
			
			//url:'http://localhost:3000/www.yournavigation.org/api/1.0/gosmore.php?format=kml&flat=14.5176184&flon=121.05086449999999&tlat=14.1876712&tlon=121.12508249999996&v=motorcar&fast=1&layer=mapnik&instructions=1&format=geojson',
			success: function(response){
				var obj = Ext.decode(response.responseText);		
				//console.log(obj);	
				callback(obj);					
				
			},
				failure: function(response){
				var obj = Ext.decode(response.responseText);				
				Ext.Msg.alert('Error:', obj);
			}
			
		});
	},
	gCode:function(addr, callback){	  
		var geocoder = new google.maps.Geocoder();					
		geocoder.geocode({ 'address': addr }, function (results, status) {					
			if (status == google.maps.GeocoderStatus.OK) {		
				var xx=results[0].geometry.location.lng();			
				var yy=results[0].geometry.location.lat();		
				SourceDest={a:xx, b:yy};							
			}else{
				console.log("Geocoding failed: " + status); 
				Ext.Msg.alert("Geocoding failed")
			}				
			callback(SourceDest);	
		})		
	},
	initComponent:function(){			
		this.items = this.buildItems();
		this.buttons = this.buildButtons();
		this.callParent();	
	},	
	buildItems:function(){
		return[{		
				xtype: 'textfield',
				value: '',				
				itemId: 'PntA',
				fieldLabel: 'From',  
			},{
				xtype: 'textfield',
				value:'',
				itemId: 'PntB',			
				fieldLabel: 'To', 				
			}];				
	},
	buildButtons:function(){
		return[{
			xtype:'button',				
			itemId:'Route',
			text:'Route',		
			handler:function(){		
			
				var me = this.up('panel');					
				me.update('');
				if  (me.mapContainer.map.getLayersByName('vector_test').length > 0) {				
					 me.mapContainer.map.getLayersByName('vector_test')[0].destroy();					
				}				
				
				var pnt1 = me.getComponent('PntA').getValue();				
				var pnt2 = me.getComponent('PntB').getValue();
				
				var vectorLayer = new OpenLayers.Layer.Vector(	'vector_test', {
					styleMap: new OpenLayers.StyleMap({'default':{
							strokeWidth: 5,
							strokeColor: '#005aff'
					}})
				
				});																		
				
				//Start routing here
				me.gCode(pnt1, function(result){															
						me.gCode(pnt2, function(result1){						
								me.findRoute(result.b, result.a, result1.b, result1.a, function(result2){									
									var coords=result2.coordinates;										
									//console.log(result2.properties.description);										
									me.update(result2.properties.description);
									var Apoints=[];		
									for(var i in coords){
										var coordinate = coords[i];
										Apoints.push(new OpenLayers.Geometry.Point(coordinate[0], coordinate[1]));											
									} 									
									var lineString = new OpenLayers.Geometry.LineString(Apoints).transform('EPSG:4326', 'EPSG:900913');
									var lineFeatures = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Collection([lineString]));	
									vectorLayer.addFeatures([lineFeatures]);
									me.mapContainer.map.addLayers([vectorLayer]);																
									me.mapContainer.map.zoomToExtent(vectorLayer.getDataExtent());					
									
								})
							
						});					
				});	
				
				
				
				
			}				
		}];
	
	}
	
});




