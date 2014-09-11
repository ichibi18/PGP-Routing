
Ext.Loader.setConfig({
disableCaching: false,
enabled: true,
paths: {   
    MyPath:'/App'		
	} 
});
Ext.application({
    name: 'OL3EXT4',
	requires:['MyPath.Routing', 'MyPath.mappanel'],
    launch: function () {		
		var mappanel = Ext.create('MyPath.mappanel',{});				
        Ext.create('Ext.container.Viewport', {	
            layout: 'border',						
            items:[				
				{				  	
				  xtype:'Routing',	
				  region:'west',
				  bodyPadding:10,						  
				  mapContainer:mappanel,
				  title:'Route',
				  split:true,				  			  
				  listeners:{
				  }
				  
				},
				mappanel,				
			
				
            ]
        });
		
		
    }
});


