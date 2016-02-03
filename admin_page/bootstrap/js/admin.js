
/**
 * Created by StreetHustling on 1/21/16.
 */
$(document).ready(function(){
    showCategories();
    showWines();
});

/**
 * This function sends a JSON request to a given url and
 * convert the response into a JSON Object
 * @param u: the url to the page to send the JSON response
 */
function sendRequest(u){
    // Send request to server
    //u a url as a string
    //async is type of request
    var obj=$.ajax({url:u,async:false});
    //Convert the JSON string to object

    var result=$.parseJSON(obj.responseText);


    return result;	//return object
}



function addWine(){

    var name = $('#inputWineName').val();
    var year = $('#inputWineYear').val();
    var desc = $('#wineDesc').val();

    var winery = $('#wineryName option:selected').val();


    var type = $('#wineType option:selected').val();

    var image = desc;


    var theUrl="http://localhost/e_commerce/controller/wine_controller.php?cmd=11&name=" +name+
        "&type="+type+"&year="+year+"&winery="+winery+"&desc="+desc+"&image="+image;
    var obj=sendRequest(theUrl);		//send request to the above url
    if(obj.result===1) {					//check result
        alert("Added Succesfully");
    }
    else{
        alert("Could not Add");
    }
}

var updateId = 0;


$("#adminLogin").click(function(){

    var btnFunction = $("#adminLogin").text();
    if(btnFunction.localeCompare("Add Wine") === 0){
        addWine();
    }else if(btnFunction.localeCompare("Update") === 0){
        updateWineDetails(updateId);
    }
});

function updateWineDetails(id){
    var name = $('#inputWineName').val();
    var year = $('#inputWineYear').val();
    var desc = $('#wineDesc').val();

    var winery = $('#wineryName option:selected').val();


    var type = $('#wineType option:selected').val();

    var image = desc;


    var theUrl="http://localhost/e_commerce/controller/wine_controller.php?cmd=11&name=" +name+
        "&type="+type+"&year="+year+"&winery="+winery+"&desc="+desc+"&image="+image;
    var obj=sendRequest(theUrl);		//send request to the above url
    if(obj.result===1) {					//check result
        alert("Added Succesfully");
    }
    else{
        alert("Could not Add");
    }
}



function getWineries(){

    var theUrl="http://localhost/e_commerce/controller/wine_controller.php?cmd=9";
    var obj=sendRequest(theUrl);		//send request to the above url
    if(obj.result===1) {					//check result
        displayWineries(obj);
    }
    else{
        return false;
    }
}

function displayWineries(obj){
    var winery = '';
    for(var index in obj.winery){
        winery += '<option value="'+obj.winery[index].winery_id+'">'+
            obj.winery[index].winery_name+'</option>';
    }

    $("#wineryName").append(winery);
}


function getWineTypes(){

    var theUrl="http://localhost/e_commerce/controller/wine_controller.php?cmd=3";
    var obj=sendRequest(theUrl);		//send request to the above url
    if(obj.result===1) {					//check result
        displayWineTypes(obj);
    }
    else{
        return false;
    }
}

function displayWineTypes(obj){
    var winery = '';
    for(var index in obj.wine_types){
        winery += '<option value="'+obj.wine_types[index].wine_type_id+'">'+
            obj.wine_types[index].wine_type+'</option>';
    }

    $("#wineType").append(winery);
}



function getGrapeVariety(){

    var theUrl="http://localhost/e_commerce/controller/wine_controller.php?cmd=10";
    var obj=sendRequest(theUrl);		//send request to the above url
    if(obj.result===1) {					//check result
        displayGrapeVariety(obj);
    }
    else{
        return false;
    }
}

function displayGrapeVariety(obj){
    var winery = '';
    for(var index in obj.variety){
        winery += '<option value="'+obj.variety[index].variety_id+'">'+
            obj.variety[index].variety+'</option>';
    }

    $("#wineVariety").append(winery);
}


function getVariety(id){

    var theUrl="http://localhost/e_commerce/controller/wine_controller.php?cmd=8&id="+id;
    var obj=sendRequest(theUrl);		//send request to the above url
    if(obj.result===1) {					//check result
        var variety = '<p>';
        for(var index in obj.wines){
            variety += obj.wines[index].variety

            if(index !== (obj.wines.length - 1)){
                variety += ',';
            }
        }
        variety += '</p>';
        $("#modal-wine-variety").html(variety);
    }
    else{
        return false;
    }
}

function viewWineDetails(id){

    var theUrl="http://localhost/e_commerce/controller/wine_controller.php?cmd=7&id="+id;
    var obj=sendRequest(theUrl);		//send request to the above url
    if(obj.result===1) {					//check result
        displayWinesDetails(obj);
    }
    else{
        return false;
    }
}

function displayWinesDetails(obj){
    $(".modal-title").text(obj.wines[0].wine_name);

    var src = [];
    src[0] = "img/edited/sparkling2.jpg";
    src[1] = "img/edited/red.jpg";
    src[2] = "img/edited/fortified1.jpg";
    src[3] = "img/edited/white.jpg";
    src[4] = "img/edited/sweet.jpg";


    if(obj.wines[0].wine_type === "Sparkling"){
        $(".modal-body img").attr("src", src[0]);
    }else if(obj.wines[0].wine_type === "Red"){
        $(".modal-body img").attr("src", src[1]);
    }else if(obj.wines[0].wine_type === "Fortified"){
        $(".modal-body img").attr("src", src[2]);
    }else if(obj.wines[0].wine_type === "White"){
        $(".modal-body img").attr("src", src[3]);
    }else{
        $(".modal-body img").attr("src", src[4]);
    }

    $("#modal-wine-type").text(obj.wines[0].wine_type);
    $("#modal-winnery-name").text(obj.wines[0].winery_name);
    $("#modal-wine-year").text(obj.wines[0].year);
    $("#modal-wine-price").text("$ "+ obj.wines[0].price);
    $("#modal-wine-region").text(obj.wines[0].region_name);
}


function sort(st){
    //var st = $("#sort_criteria option:selected").val();
    alert(st);

    var theUrl="http://localhost/e_commerce/controller/wine_controller.php?cmd="+st;
    var obj=sendRequest(theUrl);		//send request to the above url
    if(obj.result===1) {					//check result
        displayWinesInDiv(obj);
    }
    else{
        return false;
    }
}


function getWineCategories(st){

    //var st = $("#wine_category option:selected").val();

    alert(st);
    var theUrl= "";
    if(st === 'All'){
        theUrl="http://localhost/e_commerce/controller/wine_controller.php?cmd=1";
    }else{
        theUrl="http://localhost/e_commerce/controller/wine_controller.php?cmd=4&cat="+st;
    }

    var obj=sendRequest(theUrl);		//send request to the above url
    if(obj.result===1) {					//check result
        displayWinesInDiv(obj);
    }
    else{
        return false;
    }
}

/**
 * Function to display wines
 * @returns {boolean}
 */
function showWines(){

    var theUrl="http://localhost/e_commerce/controller/wine_controller.php?cmd=1";
    var obj=sendRequest(theUrl);		//send request to the above url
    if(obj.result===1) {					//check result

        displayWinesInDiv(obj);
    }
    else{
        return false;
    }
}


function showCategories(){
    var theUrl="http://localhost/e_commerce/controller/wine_controller.php?cmd=3";
    var obj=sendRequest(theUrl);		//send request to the above url
    if(obj.result===1) {					//check result

        displayCategoryList(obj);

    }
    else{
        return false;
    }
}


function displayCategoryList(obj){
    var categoryList = "";
    for (var index in obj.wine_types){

        categoryList += '<li><a href="javascript: getWineCategories('+obj.wine_types[index].wine_type+')">'+
            obj.wine_types[index].wine_type+'</a></li>';

    }
    //$("#wine_category").append(categoryList);
}

var searchOption = 1;

function setSearchOption(id){
    searchOption = id;
}

function searchWines(){

    var st = $("#search_input" ).val();
    var theUrl="http://localhost/e_commerce/controller/wine_controller.php?cmd=2&wine="+
        st+"&type="+searchOption;
    var obj=sendRequest(theUrl);		//send request to the above url
    if(obj.result===1) {					//check result
        displayWinesInDiv(obj);
    }
    else{
        return false;
    }
}


function displayWinesInDiv(obj){

    var i = 0
    var wineCollection = "";

    for (var index in obj.wines){


        wineCollection += '<tr>';
        wineCollection += '<td><input type="checkbox"></td>';
        wineCollection += '<td class="mailbox-name"><a href="javascript: alert('+obj.wines[index].wine_id+')">'+
            obj.wines[index].wine_name+'</a></td>';
        wineCollection += '<td class="mailbox-subject"><b>'+obj.wines[index].wine_type+
                '</b> - '+obj.wines[index].winery_name+'</td>';
        wineCollection += '<td class="mailbox-date">$'+obj.wines[index].cost+'</td>';
        wineCollection += '<td class="mailbox-star"><button class="btn btn-default btn-sm" ' +
            'onclick="alert('+obj.wines[index].wine_id+')">' +
            '<i class="fa fa-edit"></i> </button></td>';
        wineCollection += '<td class="mailbox-star"><button class="btn btn-default btn-sm" ' +
            'onclick="alert('+obj.wines[index].wine_id+')">' +
            '<i class="fa fa-trash-o"></i> </button></td>';


        wineCollection += '</tr>';
    }

    $('#wine_collection2').html(wineCollection);
}


function updateWine(id){

    updateId = id;
    getGrapeVariety();
    getWineries();
    getWineTypes();
    getUpdateDetails(id);
    $('#addModal').modal('toggle');
}


function getUpdateDetails(id){
    var theUrl="http://localhost/e_commerce/controller/wine_controller.php?cmd=7&id="+id;
    var obj=sendRequest(theUrl);		//send request to the above url
    if(obj.result===1) {					//check result
        $("#inputWineName").val(obj.wines[0].wine_name);
        $("#inputWineYear").val(obj.wines[0].year);
        $("#adminLogin").text("Update");
    }
    else{
        return false;
    }
}



function showDetails(id){
    viewWineDetails(id);
    getVariety(id);
    $('#myModal').modal('toggle');
}


function showAddForm(){
    $("#adminLogin").text("Add Wine");
    getGrapeVariety();
    getWineries();
    getWineTypes();
    $('#addModal').modal('toggle');
}



$("#search_button").click(function(){
    searchWines();
});




