function initialize(){
    $("#CreateNewBinPage").hide()
    $("#StatusPage").hide();
    $("#Congratulations").hide()
    $("#OtherDeatilsForm").hide()
    $("#SetLimit").hide();
    $("#Details").hide();
    $("#SetupIoTDeviceStepNumber").html("1");
    $("#PlugAndSocket").hide();
    $("#Step2SetupIoTDevice").hide();
    $("#BinNumberForm").submit(function(e) {
        e.preventDefault();
    });
    $("#OtherDeatilsForm").submit(function(e) {
        e.preventDefault();
    });
}


