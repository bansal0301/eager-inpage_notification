(function(){

  // We check for features which are not universally supported, and don't try to
  // show the app if it would error.
  if (!window.addEventListener || !window.localStorage)
    return;

  // The INSTALL_OPTIONS constant is inserted by the Eager bundler.  It's value is the
  // value of the options defined in the install.json file.
  var options = INSTALL_OPTIONS;

  // We fake a view count by storing it locally.  It only updates for the currently
  // viewing visitor, making it pretty much useless.
  /*var viewCount = localStorage.fakeViewCount;
  if (viewCount){
    viewCount = parseInt(viewCount, 10);
  } else {
    viewCount = Math.floor(Math.random() * 10000);
  }

  viewCount++;
  localStorage.fakeViewCount = viewCount;

*/
  var el = null;
 var updateElement = function(){
    // We pass in the last element to allow us to restore the removed element
    // when we do live updating of the preview.  Details:
    // https://eager.io/developer/docs/install-json/preview#dealing-with-element-fields
    el = Eager.createElement(options.element, el);
    el.className = 'push-button';
  };

  var update = function(){
    updateElement();
 
 
 el.innerHTML = '<input type = "button" id = "button-push" value = "push me now">' + 'hj' + '</input>';
    push();

	}

  var setOptions = function(opts){
    options = opts;

    update();
  }

  // Since we're adding an element to the body, we need to wait until the DOM is
  // ready before inserting our widget.
  if (document.readyState == 'loading')
    document.addEventListener('DOMContentLoaded', update);
  else
    update();



  // This is used by the preview to enable live updating of the app while previewing.
  // See the preview.handlers section of the install.json file to see where it's used.
  INSTALL_SCOPE = {
    setOptions: setOptions
  };

  
  var push = function()
  {
	  
	if (!('Notification' in window)) {
            document.getElementById('button-push').setAttribute('disabled', 'disabled');
         } else {
            
            var notificationEvents = ['onclick', 'onshow', 'onerror', 'onclose'];
            
            function notifyUser(event) {
               
               var options;
              
               event.preventDefault();
               


            //testing validation               
                 title = "hi" ;     
                                      
                  options = {
                     body: 'Hi',
                     tag: "custom",
                     icon: 'http://pushitnow.izooto.com/uploads/206/1.png',
                  };
               

               Notification.requestPermission(function() {
                  var notification = new Notification(title, options);

                  notificationEvents.forEach(function(eventName) {
                     notification[eventName] = function(event) {
                       // log.innerHTML = 'Event "' + event.type + '" triggered for notification "' + notification.tag + '"<br />' + log.innerHTML;
                     };
                  });
               });
            }
            
            

            
            document.getElementById('button-push').addEventListener('click', notifyUser);
            
         }
    
	  
	  
  }
   
  
  
  
  
  
  
})()
