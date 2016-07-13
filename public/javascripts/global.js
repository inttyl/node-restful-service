

var userListData=[];



$(document).ready(function(){

    populateTable();

    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

    $('#addUser button #btnAddUser').on('click', addUser);

});


function populateTable(){

    var tableContent='';


    $.getJSON('/users/userlist', function(data){

        userListData = data;

        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });
        $('#userList table tbody').html(tableContent);

    });
}


function showUserInfo(event){

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) {return arrayItem.username; }).indexOf(thisUserName);

    // Get our User Object
    var thisUserObject = userListData[arrayPosition];

    //Populate Info Box
    $('#userInfoName').text(thisUserObject.fullname);
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);

}


function addUser(event){

    var errorCount = 0;
    var newUser;

    event.preventDefault();

    //VErifie validite du formulaire
    $('#addUser input').each(function(index, val){
        if($(this).val() === '') {
            errorCount++;
        }
    });

    if(errorCount === 0 ){
        user = {
            'username': $('#addUser fieldset input#inputUserName').val(),
            'email':$('#addUser fieldset input#inputUserEmail').val(),
            'fullname':$('#addUser fieldset input#inputUserFullname').val(),
            'age':$('#addUser fieldset input#inputUserAge').val(),
            'location':$('#addUser fieldset input#inputUserLocation').val(),
            'gender':$('#addUser fieldset input#inputUserGender').val()
        };

        

    }else{
        alert("Complete tout le formulaire");
        return false;
    }

}
