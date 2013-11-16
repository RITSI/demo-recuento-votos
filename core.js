$( document ).ready(function() {
	$('.progress-bar').attr("aria-valuenow", 0);
	$('.progress-bar').attr("aria-valuemin", 0);
	var totalVotes = 0;

	$( document ).bind("keypress", function( event ) {
	  var target = null;
	  if ( event.which == 49 ) {
	  	target = $('.progress-bar-success');
	  }
	  if ( event.which == 50 ) {
		target = $('.progress-bar-danger');
	  }
	  if ( event.which == 51 ) {
		target = $('.progress-bar-warning');
	  }
	  if ( event.which == 52 ) {
		target = $('.progress-bar-info');
	  }

	  totalVotes = parseInt(totalVotes) + 1;
	  $('#votos-emitidos').text(totalVotes);

	  target.attr("aria-valuenow", parseInt(target.attr("aria-valuenow")) + 1);
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