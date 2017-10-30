chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    var requestType = request.request;
    console.log(requestType);
    switch(requestType){
            
        case 'getServiceList':

            var xhr = new XMLHttpRequest();
           // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
           xhr.open('GET',  'http://csgoback.net/api/extension?extension=csgosum-helper&type=subscription&subType=default', false);
           // 3. Отсылаем запрос
           xhr.send();
           if (xhr.status != 200) {
               // обработать ошибку
               sendResponse({
                   action: "NotauthorizeInPage"
               })
           } else {
               var response =  JSON.parse(xhr.response);
             sendResponse( Array(JSON.stringify(response.favourite),JSON.stringify(response.servicesData)));
           }
                

            return (true);
               
            
            break;
        
        case 'getServiceArray':
            var service = request.service;

           var xhr = new XMLHttpRequest();
           xhr.open('GET',  'http://csgoback.net/api/extension?extension=csgosum-helper&type=subscription&subType=loadPrice&service='+service+'&updateTime=60', false);

           xhr.send();
               if (xhr.status != 200) {
                   // обработать ошибку
                   sendResponse({
                       action: "NotauthorizeInPage"
                   })
               } else {
                   
                 var response =  JSON.parse(xhr.response);
                 sendResponse(xhr.response);
                   
               }
            
               return (true);
            
            break;
            
        case 'addToFavorites':
            var name = request.name;
            $.ajax({
                  url: 'http://csgoback.net/ajax/favourite-edit',
                  type: 'POST',
                  dataType: 'json',
                  headers: {
                      "X-Requested-With": "XMLHttpRequest"
                  },
                  data: {
                      type: 'add',
                      service: 'csgosum_plugin',
                      itemName: name
                  },
                  success: function(response){
                      if(response.success == true){
                          localStorage.setItem('favouriteResponse',true);
                          localStorage.setItem('favouriteID', response.favouriteId);
                      }else{
                          localStorage.setItem('favouriteResponse',false);
                      }
                  }
              });
            var data = [];
            data[0] = localStorage.getItem('favouriteResponse');
            data[1] = localStorage.getItem('favouriteID');
            sendResponse(Array(localStorage.getItem('favouriteResponse'),localStorage.getItem('favouriteID'))); 
            localStorage.removeItem('favouriteResponse');
            localStorage.removeItem('favouriteID')
            
            break;
        case 'removeFavourite':
            var id = request.id;
                $.ajax({
                  url: 'http://csgoback.net/ajax/favourite-edit',
                  type: 'POST',
                  dataType: 'json',
                  headers: {
                      "X-Requested-With": "XMLHttpRequest"
                  },
                  data: {
                      type: 'remove',
                      service: 'csgosum_plugin',
                      itemId: id,
                  },
                  success: function(response){
                      
                    localStorage.removeItem('deleteFavourite')
                    localStorage.setItem('deleteFavourite', response.success);
                      
                  }
              });
            
                 sendResponse(localStorage.getItem('deleteFavourite'));
                 localStorage.removeItem('deleteFavourite')
            
           
            break;
    }
    
});
function getThis(){
    var xhr = new XMLHttpRequest();
   // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
   xhr.open('GET',  'http://csgoback.net/api/extension?extension=csgosum-helper&type=subscription&subType=default', false);
   // 3. Отсылаем запрос
   xhr.send();
   if (xhr.status != 200) {
       // обработать ошибку
       sendResponse({
           action: "NotauthorizeInPage"
       })
   } else {
    return xhr.response
   }
}
