function changeFillingOfLimitBin(value){
  $('#SliderLimitValue').html( value+"%" );
  TweenMax.to("#FillAnimation rect", 1, {
    scaleY: value/6.25,
    delay: 0.2,
    transformOrigin: "50% 100%",
    ease: Sine.easeNone,
  }, 1);
      $("#FillingLimitBin").css("fill", rgbFunc(value));
  
}

function changeFillingOfStatusBin(value,binName){
  TweenMax.to("#FillAnimation rect", 1, {
    scaleY: value/6.25,
    delay: 0.2,
    transformOrigin: "50% 100%",
    ease: Sine.easeNone,
  }, 1);
      $("#FillingStatusBin").css("fill", rgbFunc(value));
  $("#StatusBinDetails").text(binName +" - " + (value|0)+"%")
}

function rgbFunc(value){
  var green = 255*value/100
  var red = 255-255*value/100
  return 'rgb(' + green + ',' + red + ',0)';
}