function updateNewBinVariable(elem){
    dictOfBins = getDictOfBins()
    if("Bin"+elem.BinNumber.value in dictOfBins &&
       dictOfBins["Bin"+elem.BinNumber.value]["curHeight"] != undefined &&
       dictOfBins["Bin"+elem.BinNumber.value]["Height"] != undefined){
            newBinData.Id = elem.BinNumber.value
            $("#BinNumberForm").hide(300);
            $("#OtherDeatilsForm").show(500);
    }else{
        alert("Bin number "+elem.BinNumber.value+" is not connected, make sure you connect the bin to electricity")
    }
}

function submitDetails(elem){
    if(validateDetails(elem)){
        addDetails(elem)
        $("#SetLimit").show(500);
        $("#Details").hide(500);
        $("#FillDetailsTab").removeClass("active")
        $("#SetLimitTab").addClass("active")
        $("#FillDetailsIcon").addClass("disabled")
        $("#FillDetailsIcon").removeClass("active")
        $("#SetLimitIcon").addClass("active")
        $("#SetLimitIcon").removeClass("disabled")
        $("#BinNumberForm").show();
        $("#OtherDeatilsForm").hide();
    }
};


function validateDetails(elem){
    if( elem.Description == "" || elem.Location == "" || elem.Owner == "" || elem.Mail == "" ){
        alert("One of the fields are emmpty")
        return false
    }
    if(checkIfLocationExists(elem.Location.value)){
        alert("Your Location exists in the system, please choose another location")
        return false
    }
    return true
}

function connectThePlug(){
    $("#PowerPlug").addClass("connectToPlug");
}

function disconnectThePlug(){
    $("#PowerPlug").removeClass("connectToPlug");
}