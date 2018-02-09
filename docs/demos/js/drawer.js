 var $body = $(document.body);
 var DRAWER_TOGGLE_SELECTOR = '.drawer-toggle';
 var DRAWER_OPEN = 'drawer-open';
 var $toggle = $(DRAWER_TOGGLE_SELECTOR);

 $toggle.on('click', function() {
     $body.toggleClass(DRAWER_OPEN);
     if ($body.hasClass(DRAWER_OPEN)) {
         $toggle.find('.iconfont').removeClass('icon-menu-fold').addClass('icon-menu-unfold');
         $('#mySidenav').css('width', 0);
         $toggle.css('left', 0);
     } else {
         $toggle.find('.iconfont').removeClass('icon-menu-unfold').addClass('icon-menu-fold');
         $('#mySidenav').css('width', '250px');
         $toggle.css('left', '250px');
     }
 });
