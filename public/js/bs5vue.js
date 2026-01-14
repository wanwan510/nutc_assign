const { createApp, ref } = Vue;

var ContactApp=createApp({
    data(){
        return{
            Contact: []
        }
    }
}).mount("#contactApp");

//req contact data from server
$.ajax({
    url:"/contact_data",
    method:"get",
    dataType:"json",
    success: (result)=>{
        ContactApp.Contact = result;
    }
})
