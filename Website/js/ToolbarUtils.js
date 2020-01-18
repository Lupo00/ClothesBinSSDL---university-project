function moveToCreateNewBin() {
    $("#CreateNewBinPage").show(1000);
    $("#StatusPage").hide(1000);
    if(binInterval != ""){
        clearInterval(binInterval)
        changeFillingOfStatusBin(0,currentBin)
        $("#StatusBinDetails").text("")
        $("#SearchBin").val("")
        binInterval = ""
        currentBin=""
    }
    intervalId = setInterval(changeState, 5000);
    };

    function moveToStatus() {
    $("#StatusPage").show(500);
    $("#CreateNewBinPage").hide();
    $("#SetupIoTDeviceTab").addClass("active")
    if($("#FillDetailsIcon").hasClass("active")){
        $("#Details").hide();
        $("#FillDetailsTab").removeClass("active")
        $("#FillDetailsIcon").addClass("disabled")
        $("#FillDetailsIcon").removeClass("active")
        $("#BinNumber").val("")
        $("#Name").val("")
        $("#Location").val("")
        $("#Owner").val("")
        $("#Mail").val("")
        $("#BinNumberForm").show();
        $("#OtherDeatilsForm").hide();
    }
    if($("#SetLimitIcon").hasClass("active")){
        $("#SetLimit").hide();
        $("#SetLimitTab").removeClass("active")
        $("#SetLimitIcon").addClass("disabled")
        $("#SetLimitIcon").removeClass("active")
    }
    if($("#CongratulationsIcon").hasClass("active")){
        $("#Congratulations").hide();
        $("#step4").removeClass("active")
        $("#CongratulationsIcon").addClass("disabled")
        $("#CongratulationsIcon").removeClass("active")
    }
    $("#SetupIoTDevice").show();
    $("#SetupIoTDeviceIcon").addClass("active")
    $("#SetupIoTDeviceIcon").removeClass("disabled")
    if(intervalId != ""){
        clearInterval(intervalId)
        intervalId = ""
    }
    searchData = getBins()
    console.log(searchData)    
}