/* user data table */
$(function () {
	$("#users").DataTable({
		"order": [] ,
		'aoColumnDefs': [{
			'bSortable': false,
			'aTargets': [], /* 1st one, start by the right */
			"aaSorting": []
		}]
	});

	$("#archieve").DataTable({
		"order": [] ,
		'aoColumnDefs': [{
			'bSortable': false,
			'aTargets': [], /* 1st one, start by the right */
			"aaSorting": []
		}]
	});

	setTimeout(function(){ $('#success-msg').hide() }, 2000);


	/* Enable/Disable user status */
	// $(".usr_status").change(function(){
	//
  //       $(".success-msg").hide();
  //       $(".erorr-msg").hide();
  //       if($(this).data('val')!=""){
  //           var u_id = $(this).data('val');
  //           var usr_tokn = $('input[name="_token"]').val();
	//
  //           var ajax_url = "";
  //           var ustatus = "";
  //           if($(this).prop("checked") == true){
  //               ajax_url = "/admin/user/enableuser/"+u_id;
  //               ustatus = "Enabled";
  //           }else{
  //               ajax_url = "/admin/user/disableuser/"+u_id;
  //               ustatus = "Disabled";
  //           }
	//
  //           $.ajax({
  //               type: "POST",
  //               url: ajax_url,
  //               data:{'_token':usr_tokn},
  //               success: function (response) {
  //                   console.log('response '+response);
  //                   if(response == "success"){
  //                       $(".msg_sec").html('<div class="success-msg">User Status '+ustatus+' Successfully.</div>')
  //                   }else{
  //                       $(".msg_sec").html('<div class="success-msg">Something went wrong.</div>')
  //                   }
	//
  //                   $(".msg_sec").show();
  //               }
  //           });
  //       }
  //   });

	$("#archieve .lead_status").change(function(){
		$(".success-msg").hide();
		$(".erorr-msg").hide();
		if($(this).data('val')!=""){
			var lead_id = $(this).data('lead_id');
			var status_id = $(this).val();
			var row_id  = $(this).data('row_id');

			var usr_tokn = $('input[name="_token"]').val();
			ajax_url = "changestatus";
			 $.ajax({
				type: "POST",
				url: ajax_url,
				data:{'_token':usr_tokn,'status_id':status_id,'lead_id':lead_id},
				success: function (response) {
					if(response == "success"){
						$(".msg_sec").html('<div class="success-msg">Leads Status updated Successfully.</div>');
						if(status_id != 4){
							$('tr.row_'+row_id).hide();
						}
					}else{
						$(".msg_sec").html('<div class="success-msg">Something went wrong.</div>')
					}

					$(".msg_sec").show();
				}
			});
		}
	})
	$("#users .lead_status").change(function(){
		$(".success-msg").hide();
		$(".erorr-msg").hide();
		if($(this).data('val')!=""){
			var lead_id = $(this).data('lead_id');
			var status_id = $(this).val();
			var row_id  = $(this).data('row_id');

			var usr_tokn = $('input[name="_token"]').val();
			ajax_url = "changestatus";
			 $.ajax({
				type: "POST",
				url: ajax_url,
				data:{'_token':usr_tokn,'status_id':status_id,'lead_id':lead_id},
				success: function (response) {
					if(response == "success"){
						$(".msg_sec").html('<div class="success-msg">Leads Status updated Successfully.</div>');
						if(status_id == 4){
							$('tr.row_'+row_id).hide();
						}
					}else{
						$(".msg_sec").html('<div class="success-msg">Something went wrong.</div>')
					}

					$(".msg_sec").show();
				}
			});
		}
	})
	/* End Enable/Disable user status */
	$('#status').change( function() {


		$.fn.dataTable.ext.search.push(
			function( settings, data, dataIndex ) {
				var min =  $('#status').val();
				var age =  data[3]; // use data for the age column
				if ( min == age && min != 'all')
				{
					console.log(1);
					return true;
				}
				if(min == 'all'){
					console.log(2);
					return true;
				}
				return false;
			}
		);
		var table = $('#users').DataTable();
		table.draw();

    });

	/* Enable/Disable image */
	$(".image_status").change(function(){
		$(".success-msg").hide();
		$(".erorr-msg").hide();
		if($(this).data('val')!=""){
			var u_id = $(this).data('val');
			var usr_tokn = $('input[name="_token"]').val();

			var ajax_url = "";
			var ustatus = "";
			if($(this).prop("checked") == true){
				ajax_url = "/admin/user/enableimage/"+u_id;
				ustatus = "Enabled";
			}else{
				ajax_url = "/admin/user/disableimage/"+u_id;
				ustatus = "Disabled";
			}

			$.ajax({
				type: "POST",
				url: ajax_url,
				data:{'_token':usr_tokn},
				success: function (response) {
					console.log('response '+response);
					if(response == "success"){
						$(".msg_sec").html('<div class="success-msg">Image Status '+ustatus+' Successfully.</div>')
					}else{
						$(".msg_sec").html('<div class="success-msg">Something went wrong.</div>')
					}

					$(".msg_sec").show();
				}
			});
		}
	})
	/* End Enable/Disable user status */

 });

/**  Confirm Delete **/
function confirm_delete(url){
	$('#myModal').modal('show')
		.one('click', '#delete', function(e) {
		window.location = url;
	});
}

/**  Confirm Approve **/
/* function confirm_approve(url){
	$('#myModalaprvd').modal('show')
		.one('click', '#approve', function(e) {
		window.location = url;
	});
} */
/**  Confirm Approve **/
// function confirm_approve(url, bitcoin_address, payment_id, user_email, withdraw_amount){
// 	/* alert('url '+url+' bitcoin_id '+ bitcoin_address+' payment_id '+ payment_id+' user_email '+ user_email+' withdraw_amount '+ withdraw_amount); */
// 	/* $('#myModalaprvd').modal('show')
// 		.one('click', '#approve', function(e) {
// 		window.location = url;
// 	}); */


// 	if(bitcoin_address != ""){
// 		var ajax_url = "/blockchain/example/wallet.php";
// 		var usr_tokn = $('input[name="_token"]').val();

// 		$.ajax({
// 			type: "POST",
// 			url: ajax_url,
// 			data:{'_token':usr_tokn, 'bitcoin_address':bitcoin_address, 'payment_id':payment_id, 'user_email':user_email, 'withdraw_amount':withdraw_amount},
// 			dataType: "json",
// 			success: function (response) {
// 				console.log('response '+response);
// 				if(response.type == "success"){
// 					$(".msg_sec").html('<div class="success-msg">Payment has been approved sucessfully.</div>');

// 					update_bitcoin_balance(user_email, withdraw_amount, usr_tokn, payment_id);

// 					 setInterval(function(){
// 						 location.reload();
// 					 },3000);


// 				}else{
// 					$(".msg_sec").html('<div class="error-msg">'+response.msg+'</div>');
// 				}

// 				 $(".msg_sec").show();
// 			}
// 		});
// 	}
// }

// function update_bitcoin_balance(user_email, withdraw_amount, usr_tokn, payment_id){
// 	if(user_email != ""){
// 		var ajax_url = "/update_bitcoin_balance";
// 		$.ajax({
// 			type: "POST",
// 			url: ajax_url,
// 			data:{'_token':usr_tokn, 'user_email':user_email, 'withdraw_amount':withdraw_amount, 'payment_id':payment_id},
// 			success: function (response) {
// 				console.log('response '+response);
// 			}
// 		});
// 	}
// }

/**  Verify/Unverify User**/
function confirm_verify(url,verify_document){
	if(verify_document.trim() == ""){
		$("#veriModal iframe").hide();
		$("#veriModal .no_doc").html("No document found.");
		$("#veriModal .no_doc").show();
	}else{
		$("#veriModal .no_doc").html("");
		$("#veriModal .no_doc").hide();
		$("#veriModal iframe").attr("src",verify_document);
		$("#veriModal iframe").show();
	}

	$('#veriModal').modal('show')
		.one('click', '#verify', function(e) {
		window.location = url;
	});
}

function confirm_unverify(url,verify_document){
	if(verify_document.trim() == ""){
		$("#unveriModal iframe").hide();
		/* $("#unveriModal .no_doc").html("No document found.");
		$("#unveriModal .no_doc").show(); */
	}else{
		/* $("#unveriModal .no_doc").html("");
		$("#unveriModal .no_doc").hide(); */
		$("#unveriModal iframe").attr("src",verify_document);
		$("#unveriModal iframe").show();
	}

	$('#unveriModal').modal('show')
		.one('click', '#unverify', function(e) {
		window.location = url;
	});
}

 function replaceValidationUI( form ) {
    // Suppress the default bubbles
    form.addEventListener( "invalid", function( event ) {
        event.preventDefault();
    }, true );

    // Support Safari, iOS Safari, and the Android browser—each of which do not prevent
    // form submissions by default
    form.addEventListener( "submit", function( event ) {
        if ( !this.checkValidity() ) {
            event.preventDefault();
        }
    });

    var submitButton = form.querySelector( "button:not([type=button]), input[type=submit]" );
    submitButton.addEventListener( "click", function( event ) {
        var invalidFields = form.querySelectorAll( ":invalid" ),
            errorMessages = form.querySelectorAll( ".error-message" ),
            parent;

        // Remove any existing messages
        for ( var i = 0; i < errorMessages.length; i++ ) {
            errorMessages[ i ].parentNode.removeChild( errorMessages[ i ] );
        }

        for ( var i = 0; i < invalidFields.length; i++ ) {
            parent = invalidFields[ i ].parentNode;
            parent.insertAdjacentHTML( "beforeend", "<div class='error-message'>" +
                invalidFields[ i ].validationMessage +
                "</div>" );
        }

        // If there are errors, give focus to the first invalid field
        if ( invalidFields.length > 0 ) {
            invalidFields[ 0 ].focus();
        }
    });
}

// Replace the validation UI for all forms
var forms = document.querySelectorAll( "form" );
for ( var i = 0; i < forms.length; i++ ) {
    replaceValidationUI( forms[ i ] );
}

//*************************For company registration field*******************************//
	if($('input:radio[name="type"]:checked').val()=='company'){
    $('#is-company').show();
}
$('input:radio[name="type"]').change(
   function(){
       if ($(this).is(':checked') && $(this).val() == 'company') {
          $('#is-company').show();
       }
       else{
           $('#is-company').hide();
       }
   });




/* Drop Zone Js */
Dropzone.autoDiscover = false;
var fileList = new Array;
var i = 0;
var user_id = $('#user_id').val();
var _token =  $('input[name=_token]').val();
  jQuery("div#dropzone").dropzone({
    url: "/admin/save-car-ad-images",
    params: {'user_id':user_id,},
    addRemoveLinks: true,
     headers: {
        'X-CSRF-TOKEN': _token
    },

	init: function() {
	   myDropzone = this;
	  // alert($('#car_ad_id').val())
      var post_id = $('#car_ad_id').val();
      var user_id = $('#user_id').val();

      $.ajax({
        url: '/admin/show_org_image',
        type: 'post',
        data: {request: 'fetch',_token:_token,post_id:post_id,user_id:user_id},
        dataType: 'json',
        success: function(response){
			  $.each(response, function(key,value) {
				var mockFile = { name: value.name, size: value.size};
				myDropzone.emit("addedfile", mockFile);
				myDropzone.emit("thumbnail", mockFile, value.path);
				myDropzone.emit("complete", mockFile);
			  })


			myDropzone.on("removedfile", function (file) {

		    // Remove original image from DB and folder
		 	var rmvFile =file.name
                $.ajax({
                    url: '/admin/remove_car_temp_image', //your php file path to remove specified image
                    type: "POST",
                    data: {
                        filenamenew: rmvFile,
                        type: 'delete',
						image_type :'original',
						post_id:post_id,
						user_id:user_id,
						_token:_token
                    },
                });
			});

          }
         })



	/*  Save File data */
	$(this.element).addClass("dropzone");
	this.on("success", function (file, serverFileName) {
            fileList[i] = {
                "serverFileName": serverFileName,
                "fileName": file.name,
                "fileId": i
            };
            $('.dz-message').show();
            i += 1;
        });
		// When delete image
       this.on("removedfile", function (file) {
		  // alert('ok');
            var rmvFile = "";
            for (var f = 0; f < fileList.length; f++) {
                if (fileList[f].fileName == file.name) {
                    rmvFile = fileList[f].serverFileName;
                }
            }
            if (rmvFile) {
                $.ajax({
                    url: '/admin/remove_car_temp_image', //your php file path to remove specified image
                    type: "POST",
                    data: {
                        filenamenew: rmvFile,
                        type: 'delete',
						image_type :'temp',
						_token:_token
                    },
                });
            }
        });
	}
  });

  jQuery('#classified').change(function(){
var id=jQuery(this).val();
 var data = new FormData();
var _token =  $('input[name=_token]').val();
data.append("_token", _token);
data.append("classified_id", id);
$.ajax({
        url: '/admin/get-sub-cat',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        success: function (data) {
           $("#sub-category").empty();
           $.each(data,function(key,value){
                    $("#sub-category").append('<option value="'+key+'">'+value+'</option>');
                });
          }
        });
});

jQuery('#sub-category').change(function(){
var id=jQuery(this).val();
 var data = new FormData();
var _token =  $('input[name=_token]').val();
data.append("_token", _token);
data.append("sub_id", id);
$.ajax({
        url: '/admin/get-child',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        success: function (data) {
           $("#children").empty();
           $.each(data,function(key,value){
                    $("#children").append('<option value="'+key+'">'+value+'</option>');
                });
          }
        });
});

/* classified Drop Zone Js */
Dropzone.autoDiscover = false;
var fileList = new Array;
var i = 0;
var user_id = $('#user_id').val();
var _token =  $('input[name=_token]').val();
  jQuery("div#dropzone1").dropzone({
    url: "/admin/save-car-ad-images",
    params: {'user_id':user_id,},
    addRemoveLinks: true,
     headers: {
        'X-CSRF-TOKEN': _token
    },
  init: function() {

     myDropzone = this;
     //alert($('#ad_id').val())

      var post_id = $('#classified_ad_id').val();
      var user_id = $('#user_id').val();
      $.ajax({
        url: '/admin/show_org_image_classified',
        type: 'post',
        data: {request: 'fetch',_token:_token,post_id:post_id,user_id:user_id},
        dataType: 'json',
        success: function(response){
        $.each(response, function(key,value) {
        var mockFile = { name: value.name, size: value.size};
        myDropzone.emit("addedfile", mockFile);
        myDropzone.emit("thumbnail", mockFile, value.path);
        myDropzone.emit("complete", mockFile);
        })


      myDropzone.on("removedfile", function (file) {

        //alert(file.name);
      var rmvFile =file.name
                $.ajax({
                    url: '/admin/remove_classified_temp_image', //your php file path to remove specified image
                    type: "POST",
                    data: {
                        filenamenew: rmvFile,
                        type: 'delete',
            image_type :'original',
            post_id:post_id,
            user_id:user_id,
            _token:_token
                    },
                });
      });

          }
         })



  /*  Save File data */
  $(this.element).addClass("dropzone");
  this.on("success", function (file, serverFileName) {
            fileList[i] = {
                "serverFileName": serverFileName,
                "fileName": file.name,
                "fileId": i
            };
            $('.dz-message').show();
            i += 1;
        });
    // When delete image
       this.on("removedfile", function (file) {
       //alert('ok');
            var rmvFile = "";
            for (var f = 0; f < fileList.length; f++) {
                if (fileList[f].fileName == file.name) {
                    rmvFile = fileList[f].serverFileName;
                }
            }
            if (rmvFile) {
                $.ajax({
                    url: '/admin/remove_classified_temp_image', //your php file path to remove specified image
                    type: "POST",
                    data: {
                        filenamenew: rmvFile,
                        type: 'delete',
            image_type :'temp',
            _token:_token
                    },
                });
            }
        });
  }
  });

$(function () {
     $('#simple-color-picker').colorpicker();
 });
