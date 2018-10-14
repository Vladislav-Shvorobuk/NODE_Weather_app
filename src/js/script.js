
$(function(){
    $('.container').css('min-height', $(window).height());


    $(".delete").on("click", function(event){
            let index = $(event.target ).attr("id");

            $.ajax({
                type: "DELETE",
                url: "/delete/" + index,
                success: function(res){
                    window.location.href="/";
                }, error: function(err) {
                    console.log(err);
                }
            });
    });
});
 


    
