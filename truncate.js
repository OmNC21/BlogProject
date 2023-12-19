exports.truncate100 = function(string){
    if(string.length > 100){
        return(string.substring(0,100)+"...");
    } else {
        return string;
    }

}