$(document).ready(function(){

    // tramite jquery viene rilevato quando il pulsante che segna l'entrata o l'uscita viene premuto inviando 
    // una richiesta post utilizzando ajax all'indirizzo /api/setio; viene passato l'id del bambino e la data per segnare l'entrata o l'uscita
    $(".inoutbtn").on("click", function(e){
        var todelete = $(this).parent().parent();
        $.ajax({
            type:"POST",
            url: "http://localhost:3000/api/setio",
            data: `id=${$(this).attr('bid')}&date=${new Date()}`,
            datatype: "html",
            success: function(data){
                console.log('kk');
                todelete.remove();
            },
            error: function(){
                alert("Impossibile contattare il serMortativer");
            }
        });
    });
    
    $("#dataacc").on("change", function()
    {
        //console.log();
        window.location.href = `http://localhost:3000${window.location.pathname}?date=${$("#dataacc").val()}`;

    });

    $("#searchbb").on("keyup", function()
    {
        console.log("ciao");
        
        var value = $(this).val().toLowerCase();
        // Loop through all table rows, and hide those who don't match the search query
        $(".squadtable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});