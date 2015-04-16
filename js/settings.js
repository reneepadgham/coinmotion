$(document).ready(function() {
	$('#navprofile').click(function() {
            $("#profile").show();
            $("#bank").hide();
            $("#password").hide();
            $("#two-factor").hide();
            $("#verification").hide();
    });

    $('#navbank').click(function() {
            $("#profile").hide();
            $("#bank").show();
            $("#password").hide();
            $("#two-factor").hide();
            $("#verification").hide();
    });

    $('#navpassword').click(function() {
            $("#profile").hide();
            $("#bank").hide();
            $("#password").show();
            $("#two-factor").hide();
            $("#verification").hide();
    });

    $('#navtwofactor').click(function() {
            $("#profile").hide();
            $("#bank").hide();
            $("#password").hide();
            $("#two-factor").show();
            $("#verification").hide();
    });

    $('#navverification').click(function() {
            $("#profile").hide();
            $("#bank").hide();
            $("#password").hide();
            $("#two-factor").hide();
            $("#verification").show();
    });

    $(".settings-toggles > li > a").click(function () { 
    	$("a").css("font-weight", "300");
    	$(this).css("font-weight", "600");
    });


});