$( document ).ready(function() {
	$('.progress-bar').attr("aria-valuenow", 0);
	$('.progress-bar').attr("aria-valuemin", 0);
	var totalVotes = 0;

	$( document ).bind("keypress", function( event ) {
	  var target = null;
	  var addVotes = 0;
	  if ( event.which == 49 ) { //1
	  	target = $('.progress-bar-success');
	  	addVotes = 1;
	  }
	  if ( event.which == 50 ) { //2
		target = $('.progress-bar-danger');
		addVotes = 1;
	  }
	  if ( event.which == 51 ) { //3
		target = $('.progress-bar-warning');
		addVotes = 1;
	  }
	  if ( event.which == 52 ) { //4
		target = $('.progress-bar-info');
		addVotes = 1;
	  }

	  if ( event.which == 113 ) { //q
	  	target = $('.progress-bar-success');
		addVotes = 3;
	  }	
	  if ( event.which == 119 ) { //w
		target = $('.progress-bar-danger');
		addVotes = 3;
	  }
	  if ( event.which == 101 ) { //e
		target = $('.progress-bar-warning');
		addVotes = 3;
	  }
	  if ( event.which == 114 ) { //r
		target = $('.progress-bar-info');
		addVotes = 3;
	  }
	  //q = 113 w = 119 e = 101 r = 114
	  totalVotes = parseInt(totalVotes) + addVotes;
	  $('#votos-emitidos').text(totalVotes);

	  target.attr("aria-valuenow", parseInt(target.attr("aria-valuenow")) + addVotes);
	  target.children().text(target.attr("aria-valuenow") + " votos");

	  $('.progress-bar').attr("aria-valuemax", totalVotes);
	  $('.progress-bar-success').attr("style", "width: " + ((parseInt($('.progress-bar-success').attr("aria-valuenow"))/totalVotes) * 100).toFixed() + "%;");
	  $('.progress-bar-danger').attr("style", "width: " + ((parseInt($('.progress-bar-danger').attr("aria-valuenow"))/totalVotes) * 100).toFixed() + "%;");
	  $('.progress-bar-warning').attr("style", "width: " + ((parseInt($('.progress-bar-warning').attr("aria-valuenow"))/totalVotes) * 100).toFixed() + "%;");
	  $('.progress-bar-info').attr("style", "width: " + ((parseInt($('.progress-bar-info').attr("aria-valuenow"))/totalVotes) * 100).toFixed() + "%;");

	  $('#votos-emitidos').text(totalVotes);
	  $('#votos-favor').text($('.progress-bar-success').attr("aria-valuenow"));
	  $('#votos-blanco').text($('.progress-bar-warning').attr("aria-valuenow"));
	  $('#votos-contra').text($('.progress-bar-danger').attr("aria-valuenow"));
	  $('#votos-nulos').text($('.progress-bar-info').attr("aria-valuenow"));
	});
});