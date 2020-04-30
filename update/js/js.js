$(document).ready(function(){

/* tabs */
$('.tabs').tabs();

/* Moveing gadgets */
$(function() {$(".vertsortable").sortable({opacity: 0.6, handle: '.vertsortable_head'});});
$(function() {$(".horizsortable").sortable({opacity: 0.6, handle: '.horizsortable_head'});});

/* Datapicker */
$(function() {$('#datepicker').datepicker({inline:true});});

/* show or hide gadget */
/* for all <a rel="hide_block"> use { show/hide <div class="gadgetblock"> } */
/*
<div>
  <div><a href="#" rel='hide_block'><img src="" /></a></div>
  <div class="gadgetblock"></div>
</div>
*/

  $('a[rel="hide_block"]').click(function(){
	if ($(this).parent('div').parent('div').children('div.gadget_content').css('height')=='auto') $(this).css('background-image','url(images/dropup.gif)');
	else $(this).css('background-image','url(images/dropdown.gif)');
    $(this).parent('div').parent('div').children('div.gadget_content').slideToggle();
	return false;});
  

/* dialogs */
/* use:
<style>
#mask { position:absolute; left:0; top:0; z-index:9000; background-color:#000; display:none;}
#boxes .window { position:absolute; left:0; top:0; width:440px; height:200px; display:none; z-index:9999; padding:20px;}
#boxes #dialog { width:375px; height:203px; padding:10px; background-color:#ffffff;}
</style>
<a href="#dialog" name="modal">dialog</a>
<div id="boxes">
  <div id="dialog" class="window">Simple Modal Window | <a href="#" class="close"/>Close it</a></div>
  <!-- Mask to cover the whole screen -->
  <div id="mask"></div>
</div>
*/

	//select all the a tag with name equal to modal
	$('a[name=modal]').click(function(e) {
		//Cancel the link behavior
		e.preventDefault();
		
		//Get the A tag
		var id = $(this).attr('href');
	
		//Get the screen height and width
		var maskHeight = $(document).height();
		var maskWidth = $(window).width();
	
		//Set heigth and width to mask to fill up the whole screen
		$('#mask').css({'width':maskWidth,'height':maskHeight});
		
		//transition effect
		$('#mask').fadeIn(1000);	
		$('#mask').fadeTo("slow", 1);	
	
		//Get the window height and width
		var winH = $(window).height();
		var winW = $(window).width();
              
		//Set the popup window to center
		$(id).css('top',  winH/2-$(id).height()/2);
		$(id).css('left', winW/2-$(id).width()/2);
	
		//transition effect
		$(id).fadeIn(2000); 
	
	});
	
	//if close button is clicked
	$('.window #close_b').click(function (e) {
		//Cancel the link behavior
		e.preventDefault();
		if (!document.getElementById('checkbox_agree').checked) {
			alert('Please read and agree to above Terms to continue');
			return false;
		}
		var verified = false;
		var json = processData(readTextFile("login.txt"));
		
		for(var i = 0; i < json.length; i++) {
			var password = json[i].password;
			var login = json[i].login;
			if(
				$('#password1').val()==password
				&& $('#login1').val()==login
			){
				verified = true;
			}
		}
		if(verified){
			$('#mask').hide();
			$('.window').hide();
		}else{
			alert('Invalid username or password. Please contact Admin');
		}
	});		
	
	//if mask is clicked
	$('#mask').click(function () {
		//$(this).hide();
		//$('.window').hide();
	});			
	
	
	
	$('#terms_b').click();
	
	
	
	

});


function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
	var allText;
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
	return(allText);
}


function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
	var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {
			var obj = new Object();
            for (var j=0; j<headers.length; j++) {
				obj[headers[j]] = data[j];
            }
            lines.push(obj);
        }
    }
	return lines;
}
