;(function () {
  const htmlElement = document.querySelector("html")
  if(htmlElement.getAttribute("data-bs-theme") === 'auto') {
    function updateTheme() {
      document.querySelector("html").setAttribute("data-bs-theme",
      window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    }
     window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme)
    updateTheme()
  }
})();

function addEntries(){
  var numOptions = document.getElementById("voteOptions").getElementsByTagName('input').length + 1;

  linebreak = document.createElement("br");
  var newEntrie = document.createElement("input");
  newEntrie.type = "text"; newEntrie.id = "o"+numOptions;
  newEntrie.placeholder = "Opción " + numOptions;

  document.getElementById("voteOptions").appendChild(linebreak);
  document.getElementById("voteOptions").appendChild(newEntrie);

  if ( numOptions >= 9 )
    document.getElementById("addEntrie").style.display = "none";
}