<script type="text/javascript">
	runAllForms();
	loadScript("js/plugin/dropzone/dropzone.min.js");
	var codemp=null;
	
	$(function() 
	{
		var auto3=[];
		//autocompletar(auto2); 

		
		    $.ajax(//Genera Los elementos del autocompletar buscar_usuario
		    {   
		      url: localStorage.server1+'empleadosaceptavisita',  
		      headers:
		      {
		        accept: "application/json",
		      },
		      type: 'GET',
		      dataType:"json",
		      async: false,
		      success:function(data)
		      {
		      	console.log(data);
		     
		        for (var i = 0; i < data.length; i++)     
		        {
		          auto3.push({label: data[i].Nombre });                
		        }
		      }               
		    });//Genera Los elementos del autocompletar buscar_usuario
		    $( "#anfitrionTxt" ).autocomplete(//Autocomplete para buscar usuarios
		    {
		      source:auto3,
		      minLength: 2,
		      open: function() 
		      {
		        $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
		      },
		      close: function() 
		      {
		        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
		      }
		      
		    });//Autocomplete para buscar usuarios
	 






		 $.ajax(//Lista de Ubicaciones
	    {
	          url:localStorage.server1+"ubicacionesempresa",
	          dataType:"json",
	          type: 'GET',
	          cache: false,
	          headers: 
	      {
	        accept: "application/json"
	      
	      },      
	          success: function (data) 
	          {     
	             console.log(data);
	            
	              var listItems= "",auto2=[];
	              if(data.length!=null)
	              {
	            for (var i = 0; i < data.length; i++)
	            {
	                listItems+= "<option value='" + data[i].id_ubicacionempresa + "'>" + data[i].nombre_ubicacion + "</option>";
	              }
	          }
	          else
	            {
	              listItems+= "<option value='" + data.id_ubicacionempresa + "'>" + data.nombre_ubicacion + "</option>";
	            }
	           $("#Empresas").html(listItems);
	           codemp= $("#Empresas").val();
	           
	          }
	      })
	      .done(function(data)
	      {
	        // Aquí se podría mover lo que esta arriba en "success:"
	      })
	      ;  





	    var f = new Date();
    	//$("#ipuerta").empty().append(localStorage.checador);
    	var mes,hora,minuto,segundo;
    	if(f.getMonth()<10)
    	{
    		mes='0'+(f.getMonth()+1);
    	}  	else{
    		mes=f.getMonth()+1;
    	}

    	
    	if(f.getMinutes()<10)
    	{
    		minuto='0'+(f.getMinutes());	
    	}
    	else
    	{
    		minuto=f.getMinutes()
    	}
    	if(f.getSeconds()<10)
    	{
    		segundo='0'+(f.getSeconds());	
    	}else
    	{
    		segundo=f.getSeconds()
    	}
    	console.log(mes+minuto+segundo);
   
    	$("#fingreso").empty().append(f.getDate() + "-" + mes + "-" + f.getFullYear()+" "+f.getHours()+":"+minuto+":"+segundo);
    	var f = new Date();
		$( "#fecha" ).empty().append(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
		
	}
	);

	
	
 
	$(function() 
	{
		
		 
		
	});
	$("#smart-form-register").validate(
				{
					rules:
					{
						
						nombre : 
							{
								required : true,
								minlength : 3,
							},
							Apellido : 
							{
								required : true,
								minlength : 3,
							},
							asunto : 
							{
								required : true,
								minlength : 3,
							},
							articulos : 
							{
								required : true,
								minlength : 3,
							},
							empresa : 
							{
								required : true,
								minlength : 3,
							},
							anfitrion : 
							{
								required : true,
								minlength : 3,
							},
							gaffete : 
							{
								required : true,
								
							}

					},
					messages:
					{
						
						nombre:
						{
							required : 'Ingresa Nombre',
							minlength : 'Minimo 3 Caracteres'
						},
						Apellido:
						{
							required : 'Ingresa Apellido',
							minlength : 'Minimo 3 Caracteres'
						},
						asunto:
						{
							required : 'Ingresa Asunto',
							minlength : 'Minimo 3 Caracteres'
						},
						articulos:
						{
							required : 'Ingresa articulos',
							minlength : 'Minimo 3 Caracteres'
						},
						empresa:
						{
							required : 'Ingresa empresa',
							minlength : 'Minimo 3 Caracteres'
						},
						anfitrion:
						{
							required : 'Ingresa anfitrion',
							minlength : 'Minimo 3 Caracteres'
						},
						gaffete:
						{
							required : 'Ingresa gaffete',
						
						}

					
					},
					submitHandler: function(form) 
					{

						var datos = {};
						
						console.log("si entro");
						
						var nombreS= $('input[name=nombre]').val();
						var apellidos =$('input[name=Apellido]').val();
						datos.nombre  = nombreS+" "+apellidos;
						datos.asunto  =  $('input[name=asunto]').val();
						datos.articulos = $('textarea[name=articulos]').val();
						datos.empresa  =  $('input[name=empresa]').val();
						datos.empresa_visita  =  $('#Empresas  option:selected').text();
						
						
						datos.anfitrion  =  $('input[name=anfitrion]').val();
						datos.gaffete  =  $('input[name=gaffete]').val();
						datos.ingresoEnPuerta  =localStorage.checador;
						//datos.ingresoFecha  =  $('#fingreso').text();
						
						console.log(datos);
						//alert();
						$.ajax(
						{
								method: "POST",
								url: localStorage.server1+"visitantes",
								headers: 
								{
								    accept: "application/json",
								      
								},
								data: datos,
								 error : function(jqXHR, status, error) 
								{
								 	if(error=='Forbidden')
								 	{
								 	alert('El usuario Actual no tiene permisos para Registrar Usuarios');			
								 	}
								 	else
								 	{
								 	alert(error);	
								 	}
						        }

						})
						.done(function(data){


							console.log("Registradors",data);
					
							 $.smallBox({
										title : "Visitante Registrado Correctamente",
										content : "",
										color : "#739E73",
										iconSmall : "fa fa-cloud",
										timeout : 5000
									});		
							 	$.ajax(
									{
											method: "POST",
											url: localStorage.server1+"registrargafette/"+datos.gaffete,
											headers: 
											{
											    accept: "application/json",
											      
											},
											data: datos,
											 error : function(jqXHR, status, error) 
											{
											 	if(error=='Forbidden')
											 	{
											 	alert('El usuario Actual no tiene permisos para Registrar Gafettes');			
											 	}
											 	else
											 	{
											 	alert(error);	
											 	}
									        }

									})
									.done(function(data){


										//console.log("Registradors",data);
								
										 $.smallBox({
													title : "Gaffete Registrado Correctamente",
													content : "",
													color : "#739E73",
													iconSmall : "fa fa-cloud",
													timeout : 5000
												});		
										
										 $('input[name=nombre]').val("");
									 $('input[name=Apellido]').val("");
									$('input[name=gaffete]').val("");
									

									});	

							
							 $('input[name=nombre]').val("");
						 $('input[name=Apellido]').val("");
						$('input[name=gaffete]').val("");
						

						});	

					},//term
					// Do not change code below
					errorPlacement : function(error, element) 
					{
						error.insertAfter(element.parent());
					}

				});
	
	$('#limpiar').click(function(){//Limpiar Formulario
		
		 	$(':input').each(function(){
		 		this.value="";
		 	});
	});

		

</script>