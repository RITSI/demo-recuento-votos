var totalVotes = 0;
var numOptions = 0;
var stackKey = [];

$( document ).ready(function() {
	$('.progress-bar').attr("aria-valuenow", 0);
	$('.progress-bar').attr("aria-valuemin", 0);
	
	buildOptions();
	registerKeys();
});

function registerKeys() {
	$( document ).bind("keypress", function( event ) {
	  target = null;
	  targetLabel = null;
	  addVotes = 0;
	  
	  if(stackKey.length != 0 && event.which == 114){
		switch(stackKey.pop()){
		  case 49:
			targetPos = 0;
			addVotes = -1;
			break;
		  case 50:
			targetPos = 1;
			addVotes = -1;
			break;
		  case 51:
			targetPos = 2;
			addVotes = -1;
			break;
		  case 52:
			targetPos = 3;
			addVotes = -1;
			break;
		}	  
	  } else {
		stackKey.push(event.which);
		switch(event.which){
		  case 49:
			targetPos = 0;
			addVotes = 1;
			break;
		  case 50:
			targetPos = 1;
			addVotes = 1;
			break;
		  case 51:
			targetPos = 2;
			addVotes = 1;
			break;
		  case 52:
			targetPos = 3;
			addVotes = 1;
			break;
		}	  
	  }
	  
	  if(targetPos != null){
		  target = $('#slot-' + targetPos);
		  targetLabel = $('#slot-' + targetPos + '-label');
	  }

/*	  if (event.which >= 49 && event.which <= 57 && event.which < 57 - numOptions ) {
	  	targetPos = event.which - 49;
	  	target = $('#slot-' + targetPos);
	  	targetLabel = $('#slot-' + targetPos + '-label');
	  	addVotes = 1;
	  }*/

	  if (target != null) {
	    target.attr("aria-valuenow", parseInt(target.attr("aria-valuenow")) + addVotes);
	    totalVotes = parseInt(totalVotes) + addVotes;
	    targetLabel.text(target.attr("aria-valuenow"));
	    $('#votos-emitidos').text(totalVotes);
	    updateVotes();
	  }
	});
}

function updateVotes() {
	$(".progress-bar").each(function() {
		Element = $(this);
		Element.attr("style", "width: " + ((parseInt(Element.attr("aria-valuenow"))/totalVotes) * 100).toFixed() + "%;");
	});
}

function buildOptions(options) {
	var defaultOptions = jQuery.parseJSON('{ "question":"Votación", "slots":[ {"slotlabel":"A favor", "barType":"success"}, {"slotlabel":"En contra", "barType":"danger"}, {"slotlabel":"Blanco", "barType":"warning"}, {"slotlabel":"Nulo", "barType":"info"} ]}');

	if (options == null) {
		options = defaultOptions;
	}

	$('#question').text(options.question);

	jQuery.each(options.slots, function(i, slot) {
		var htmlModel = '<h2>' + slot.slotlabel + ' <span id="slot-' + i + '-label">0</span></h2><div class="progress"><div id="slot-' + i + '" class="progress-bar progress-bar-'+ slot.barType + '" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="0" style="width: 0%;"><span class="sr-only"></span></div></div>';	
        $('#option-container').append(htmlModel);
        numOptions += 1;
	});
}
