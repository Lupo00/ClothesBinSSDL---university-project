var FIREBASE_URL = "https://my-bin-project.firebaseio.com"
function updateDB(bin,data)
{
    var element =  ("Bin"+bin in dictOfBins) ? dictOfBins["Bin"+bin] : null
    if(element == null){
        alert("generatedKey doesn't exists, ERROR!")
        return
    }

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", FIREBASE_URL+"/"+"Bin"+bin+"/.json", false );
    xmlHttp.send(null);
    data.Height = JSON.parse(xmlHttp.responseText).Height
    data.curHeight = JSON.parse(xmlHttp.responseText).curHeight
    var json = JSON.stringify(data);
    xmlHttp.open( "PUT", FIREBASE_URL+"/"+"Bin"+bin+"/.json", true ); // false for synchronous request
    xmlHttp.send(json);
    return xmlHttp.responseText;
}

function getDictOfBins(){
    var dict = {}
    var listOfBins = JSON.parse(getAllData(FIREBASE_URL+"/.json"));
    for(var bin in listOfBins){
        dict[bin] = listOfBins[bin]
    }
    return dict
}

function getAllData()
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", FIREBASE_URL+"/.json", false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}


function addDetails(elem){
    newBinData.Name = elem.Name.value
    newBinData.Location = elem.Location.value
    newBinData.Owner = elem.Owner.value
    newBinData.Mail = elem.Mail.value
    $("#BinNumber").val("")
    $("#Name").val("")
    $("#Location").val("")
    $("#Owner").val("")
    $("#Mail").val("")
}

function getBins(){
    while(searchData.length > 0) {
         searchData.pop();
    }
    var listOfBins = JSON.parse(getAllData(FIREBASE_URL+"/.json"));
    for(var bin in listOfBins){
        if("Location" in listOfBins[bin]){
            searchData.push({title: listOfBins[bin]["Location"]})
        }
    }
    return searchData
}


function locationToBin(location){
    var listOfBins = JSON.parse(getAllData(FIREBASE_URL+"/.json"));
    for(var bin in listOfBins){
        if("Location" in listOfBins[bin]){
            if(listOfBins[bin]["Location"] == location){
                return bin
            }
        }
    }
    return null
}


function getCurrentHeightByName(name){
    var listOfBins = JSON.parse(getAllData(FIREBASE_URL+"/.json"));
    if(name in listOfBins && "Height" in listOfBins[name]){
        binHeight = listOfBins[name]["Height"]
        curHeight = listOfBins[name]["curHeight"]


        return (curHeight/binHeight)*100
    }
    return null
}

function checkIfLocationExists(loc){
    var listOfBins = JSON.parse(getAllData(FIREBASE_URL+"/.json"));
    for(var bin in listOfBins){
        if("Location" in listOfBins[bin]){
            if(listOfBins[bin]["Location"] == loc){
                return true
            }
        }
    }
    return false
}