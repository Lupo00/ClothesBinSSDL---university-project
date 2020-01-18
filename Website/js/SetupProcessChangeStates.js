$(document).on("click",".moveToDetails",function(){
    $("#SetupIoTDevice").hide(500);
    $("#Details").show(500);
    $("#SetupIoTDeviceTab").removeClass("active")
    $("#FillDetailsTab").addClass("active")
    $("#SetupIoTDeviceIcon").addClass("disabled")
    $("#SetupIoTDeviceIcon").removeClass("active")
    $("#FillDetailsIcon").addClass("active")
    $("#FillDetailsIcon").removeClass("disabled")
});

   
$(document).on("click",".congratulations",function(){
    newBinData.Limit = $("#SliderLimitRange").val()
    changeFillingOfLimitBin(0)
    $("#SliderLimitRange").val(0)
    updateDB(newBinData.Id,newBinData)
    // clearInterval(intervalId);
    $("#SetLimit").hide(500);
    $("#Congratulations").show(500);

    $("#SetLimitTab").removeClass("active")
    $("#step4").addClass("active")
    $("#SetLimitIcon").addClass("disabled")
    $("#SetLimitIcon").removeClass("active")
    $("#CongratulationsIcon").addClass("active")
    $("#CongratulationsIcon").removeClass("disabled")
});


function changeState(){ 
    switch(curDemonstrationStep){
        case DEMONSTRATION_STEPS.CONNECT_IOT_TO_BIN: $("#Step1SetupIoTDevice").show();$("#Step2SetupIoTDevice").hide();$("#SetupIoTDeviceStepNumber").html("1");$("#BinImage").show(500);$("#PlugAndSocket").hide(500);setTimeout(disconnectThePlug, 2000); break;
        case DEMONSTRATION_STEPS.PLUG_AND_SOCKET: $("#Step1SetupIoTDevice").hide();$("#Step2SetupIoTDevice").show();$("#SetupIoTDeviceStepNumber").html("2");$("#BinImage").hide(500);$("#PlugAndSocket").show(500);setTimeout(connectThePlug, 2000);break;
    }
    if(curDemonstrationStep == DEMONSTRATION_STEPS.CONNECT_IOT_TO_BIN){
        curDemonstrationStep = DEMONSTRATION_STEPS.PLUG_AND_SOCKET
    }else{
        curDemonstrationStep = DEMONSTRATION_STEPS.CONNECT_IOT_TO_BIN
    }
}