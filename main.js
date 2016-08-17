var interval = setInterval(function() {
    if(document.readyState === 'complete') {
        clearInterval(interval);

        var last_known_scroll_position = 0;
        var ticking = false;
        var windows = window.innerHeight;
        var body = document.body.clientHeight;

        function doSomething(scroll_pos) {
            sticky_relocate(scroll_pos);
        }

        window.addEventListener('scroll', function(e) {
            last_known_scroll_position = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    doSomething(last_known_scroll_position);
                    ticking = false;
                });
            }
            ticking = true;
        });

        function sticky_relocate(scroll_pos) {
            var footer = document.querySelector('footer').clientHeight;
            var stickybar = document.querySelector('.sticky-footer').clientHeight;

            if (body - windows - footer + stickybar <= scroll_pos) {
                //change to position relative
                document.querySelector('.sticky-footer').className = document.querySelector('.sticky-footer').className.replace('fixed', 'relative');
            }
            else {
                //change to position fixed
                document.querySelector('.sticky-footer').className = document.querySelector('.sticky-footer').className.replace('relative', 'fixed');
            }
        }
    }
}, 100);
