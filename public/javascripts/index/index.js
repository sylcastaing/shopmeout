$(function(){
	console.log("test");
    $('.deplie').hide(); // on masque tout 
    $('.bouton-deplier').click(function(event){
        event.preventDefault(); // on ne suit pas le lien
        $(this).parent().next().slideToggle();
    });
    $('.bouton-replier').click(function(event){
        event.preventDefault(); // on ne suit pas le lien
        $(this).parent().slideToggle();
    });
});