var totalVotes = 0;
var numOptions = 0;
var stackKey = [];
var json;

function generatePoll(){
	$('.progress-bar').attr("aria-valuenow", 0);
	$('.progress-bar').attr("aria-valuemin", 0);

	var question = document.getElementById("title").value;
	
	var colorOptions = ["\"info\"", "\"success\"", "\"danger\"", "\"warning\""];
	var length = document.getElementById("voteOptions").getElementsByTagName('input').length;

	var numParticipantes = 0;
	var participantes = [];
	
	for (var index = 1; index <= length ; index++) {
		var participante = document.getElementById("o"+index).value
		if ( participante != "" ){
			participantes.push("{\"slotlabel\":\"" + participante + "\", \"barType\":" + colorOptions[index%4] + "}");
			numParticipantes++;
		}
	}

	json = "{ \"question\":\"" + question + "\", \"slots\":[ ";
	for (var index = 0; index < participantes.length; ++index) {
		if ( index > 0 )
			json += ","
		json += participantes[index];
	}
	json += (" ]}");

	if ( participantes.length == 0 ){
		buildOptions();
	} else{
		buildOptions(jQuery.parseJSON(json));
		generateTopList(jQuery.parseJSON(json));
	}
	registerKeys();

	document.getElementById("input").style.display = "none";
	document.getElementById("col-lg-12").style.display = "block";
}

function generateTopList( options ){
	jQuery.each(options.slots, function (i, slot) {
		var htmlModel = "<li> Tecla \'" + (i+1) + "\' o click en el contador: " + slot.slotlabel;
		$('#lista').append(htmlModel);
	});
	var htmlModel = '<p id="deshacer" style="margin-top:2em;font-size: 1.2em;text-align:center;"> Tecla r o click aquí: Deshacer voto <p>';
	$('#lista').append(htmlModel);
	$('#deshacer').click(function() {
		var e = jQuery.Event("keypress");
		e.which = 114; 
		$(document).trigger(e);
	  });

}

function registerKeys() {
	$(document).bind("keypress", function (event) {
		target = null;
		targetLabel = null;
		addVotes = 0;
		
		if (stackKey.length != 0 && event.which == 114){
			var aRetirar = stackKey.pop();
			targetPos = aRetirar - 49;
			target = $('#slot-' + targetPos);
			targetLabel = $('#slot-' + targetPos + '-label');
			addVotes = -1;
		} else {
			if (event.which >= 49 && event.which <= 59 && (event.which - 49) < numOptions ) {
				stackKey.push(event.which);
				targetPos = event.which - 49;
				target = $('#slot-' + targetPos);
				targetLabel = $('#slot-' + targetPos + '-label');
				addVotes = 1;
			}
		}

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
	$(".progress-bar").each(function () {
		Element = $(this);
		Element.attr("style", "width: " + ((parseInt(Element.attr("aria-valuenow")) / totalVotes) * 100).toFixed() + "%;");
	});
}

function buildOptions(options) {
	var defaultOptions = jQuery.parseJSON('{ "question":"Votación", "slots":[ {"slotlabel":"A favor", "barType":"success"}, {"slotlabel":"En contra", "barType":"danger"}, {"slotlabel":"Blanco", "barType":"warning"}, {"slotlabel":"Nulo", "barType":"info"} ]}');

	if (options == null) {
		options = defaultOptions;
		generateTopList(defaultOptions);
	}

	$('#question').text(options.question);

	jQuery.each(options.slots, function (i, slot) {
		var htmlModel = '<h2>' + slot.slotlabel + ' <span id="slot-' + i + '-label">0</span></h2><div class="progress"><div id="slot-' + i + '" class="progress-bar progress-bar-' + slot.barType + '" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="0" style="width: 0%;"><span class="sr-only"></span></div></div>';
		$('#option-container').append(htmlModel);
		$('#slot-' + i+'-label').click(function() {
			var e = jQuery.Event("keypress");
			e.which = 49+i; 
			$(document).trigger(e);
		  });
		numOptions += 1;
	});
}
