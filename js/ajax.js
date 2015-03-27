$(function()
{
	// Variable to store your files
	var files;
	var files2;
	// Add events
	$('input[type=file]').on('change', prepareUpload);
	$('form').on('submit', uploadFiles);

	// Grab the files and set them to our variable
	function prepareUpload(event)
	{
		if(files== undefined)
		files =event.target.files;
	    else
		files2 =event.target.files;
	}

	// Catch the form submit and upload the files
	function uploadFiles(event)
	{
		event.stopPropagation(); // Stop stuff happening
        event.preventDefault(); // Totally stop stuff happening
            var a=true;
			var b=true;
		$("submit").hide();
        $("spinner").show();

        // Create a formdata object and add the files
		var data = new FormData();
		$.each(files, function(key, value)
		{
			data.append(key, value);
		});
        var data2 = new FormData();
		$.each(files2, function(key, value)
		{
			data2.append(key, value);
		});
		
        $.ajax({
            url: 'submit.php?files',
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'json',
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
            success: function(data, textStatus, jqXHR)
            {     
				a=true;
            	if(typeof data.error === 'undefined')
            	{
            		// Success so call function to process the form
            		//submitForm(event, data);
					a=true;
            	}
            	else
            	{
            		// Handle errors here
					a=false;
            		console.log('ERRORS: ' + data.error);
            	}
            },
            error: function(jqXHR, textStatus, errorThrown)
            {
            	// Handle errors here
				a=false;
            	console.log('ERRORS: ' + textStatus);
            	$("spinner").hide();
            }
        });
		$.ajax({
            url: 'submit.php?files',
            type: 'POST',
            data: data2,
            cache: false,
            dataType: 'json',
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
            success: function(data2, textStatus, jqXHR)
            {    
			     b=true;
            	if(typeof data2.error === 'undefined')
            	{
            		// Success so call function to process the form
            		//submitForm(event, data);
					b=true;
            	}
            	else
            	{
            		// Handle errors here
					b=false;
            		console.log('ERRORS: ' + data2.error);
            	}
            },
            error: function(jqXHR, textStatus, errorThrown)
            {
            	// Handle errors here
				b=false;
            	console.log('ERRORS: ' + textStatus);
            	$("spinner").hide();
            }
        });
		if((a== true) && (b== true))
			submitForm(event, data, data2);
    }

    function submitForm(event, data,data2)
	{
		// Create a jQuery object from the form
		$form = $(event.target);
		
		// Serialize the form data
		var formData = $form.serialize();
		// You should sterilise the file names
		$.each(data, function(key, value)
		{
			formData = formData + '&filenames[]=' + value;
		});
        $.each(data2, function(key, value)
		{
			formData = formData + '&filenames[]=' + value;
		});
		$.ajax({
			url: 'submit.php',
            type: 'POST',
            data: formData,
            cache: false,
            dataType: 'json',
            success: function(data, textStatus, jqXHR)
            {
            	if(typeof data.error === 'undefined')
            	{
            		// Success so call function to process the form
            		console.log('SUCCESS: ' + data.success);
            	}
            	else
            	{
            		// Handle errors here
            		console.log('ERRORS: ' + data.error);
            	}
            },
            error: function(jqXHR, textStatus, errorThrown)
            {
            	// Handle errors here
            	console.log('ERRORS: ' + textStatus);
            },
            complete: function()
            {
            	$("spinner").hide();
            }
		});
	}
});