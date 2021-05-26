$( document ).ready(function() {
    $(window).scrollTop(0);

    var urlVars = getUrlVars();

	
	 $(window).scrollTop(0);
	
	
    $('#btnSubmit').on('click', function(e) {
        toggleCalculate(false);

        $.ajax({
            url: "/campaign/" + urlVars['uid'],
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                $("#linkout").attr("href", "https://acngoogle.my.workfront.com/project/view?ID=" + data['ID']);
                $('#linkout')[0].click();
            },
            error: function (error) {
                // replace this eventually with something else
                console.log(error);
                toggleCalculate(true);
                alert("There was an error, contact an administrator for support.")
            }
        });
    });

    function getUrlVars()
    {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    function toggleCalculate(on) {
        if (on) {
            // enable calculate button
            $("#btnSubmit").attr("value", "Create Campaign");
            $("#btnSubmit").css("background", "#ff8200");
            $("#btnSubmit").css("cursor", "pointer");
            $("#btnSubmit").removeAttr("disabled");
        } else {
            // disable calculate button
            $("#btnSubmit").attr("value", "Working...");
            $("#btnSubmit").css("background", "grey");
            $("#btnSubmit").css("cursor", "auto");
            $("#btnSubmit").attr("disabled", "true");
        }
    }
});
