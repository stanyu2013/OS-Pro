/**
 * Created by Dhanish on 08/03/16.
 */



function populateReviewImages(results){

    var all_pics = document.getElementById('all_pics');

    console.log("getAllImagesFromPatient function called");
    console.log(page.options.patientid);

    console.log("results "+results.rows.length);

    for(var i = 0; i < results.rows.length; i++){
        console.log(results.rows.item(i));
        all_pics.innerHTML += '<img style="display:block;width:100px;height:150px;margin:0 auto; border: solid 5px black;" src="' + results.rows.item(i).ImageFileName + '"/><br>' +
            '<input type="radio" style="margin-left:50%;" name="image" value="' + results.rows.item(i).ImageFileName + '">';
        //all_pics.innerHTML += '<img src="' + results.rows.item(i).ImageFileName + ' class="thumbnail"/><br>';
    }

}