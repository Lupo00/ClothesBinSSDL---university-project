var searchData = [{title: "Demy"}];

var searchFormNode = document.querySelector('.search-form');
var searchInputNode = document.querySelector('.search-input');
var autoCompleteNode = document.querySelector('.search-auto-complete');
var resultNode = document.querySelector('.result');

var input = '';
var results = [];
var selected = -1;
var showAutoComplete = false;

var fuse = new Fuse(
searchData,
{
  keys: ['title'],
  shouldSort: true,
  threshold: 0.5,
  maxPatternLength: 50 });



function renderAutoComplete() {
  if (!showAutoComplete || input.length < 3 || results.length === 0) {
    autoCompleteNode.classList.remove('show');
    return '';
  } else {
    autoCompleteNode.classList.add('show');
  }

  return "\n    <ul>\n      " +

  results.map(function (result, index) {return "\n        <li class='auto-complete-item" + (
    index === selected ? ' selected' : '') + "'>\n          " +
    result.title + "\n        </li>\n      ";}).

  join('') + "\n    </ul>\n  ";


}

function handleSearchSubmit(event) {
  if (event) {
    event.preventDefault();
  }
  if(binInterval != ""){
      clearInterval(binInterval)
  }
  input = searchInputNode.value.trim();
  currentBin = locationToBin(input)

  if(currentBin != null){
  binInterval = setInterval(function() { 
      changeFillingOfStatusBin(getCurrentHeightByName(currentBin),input) }, 500);
  selected = -1;

  document.activeElement.blur();
  autoCompleteNode.innerHTML = renderAutoComplete();
  }else{
    alert("This Bin is not defiend, please choode another bin")
    $("#SearchBin").val("")
  }
//   resultNode.innerHTML = "Searched for: " + input;
}

function handleSearchInput(event) {
  input = event.target.value;
  results = [];
  if (input.length >= 3) {
    results = fuse.search(input).slice(0, 7);
  }
  showAutoComplete = true;
  autoCompleteNode.innerHTML = renderAutoComplete();
}

function updateSearchInput() {
  if (selected === -1) {
    searchInputNode.value = input;
  } else {
    searchInputNode.value = results[selected].title;
  }
  autoCompleteNode.innerHTML = renderAutoComplete();
}

function handleSearchKeyDown(event) {
  switch (event.which) {
    case 38: // Arrow up
      selected = Math.max(--selected, -1);
      updateSearchInput();
      break;
    case 40: // Arrow down
      selected = Math.min(++selected, results.length - 1);
      showAutoComplete = true;
      updateSearchInput();
      break;
    case 9: // Tab
      showAutoComplete = false;
      updateSearchInput();
      break;
    case 27: // Escape
      selected = -1;
      showAutoComplete = false;
      updateSearchInput();
      break;}

}

function handleAutoCompleteClick(event) {
  event.stopPropagation(); // Prevent click from bubbling to window click handler
  searchInputNode.value = event.target.textContent.trim();
  showAutoComplete = false;
  handleSearchSubmit();
}

function handleWindowClick(event) {
  showAutoComplete = false;
  autoCompleteNode.innerHTML = renderAutoComplete();
}

searchFormNode.addEventListener('submit', handleSearchSubmit);
document.querySelector('.search-input-container').addEventListener('keydown', handleSearchKeyDown);
searchInputNode.addEventListener('input', handleSearchInput);
autoCompleteNode.addEventListener('click', handleAutoCompleteClick);
window.addEventListener('click', handleWindowClick);