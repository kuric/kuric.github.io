;(function($){

	var defaults = {
		'transitionTime' : '3s',
		'offsetY': '5%',
		'offsetX': '10%',
		'autoPlay': true
	}
	//constructor class
	var cardCarousel = function(element, options){
		var widget = element;
		this.config = $.extend({}, defaults, options);
		this.element = element;
		elementInAction = this.element;
		obj = this;
		
		this.init();
	}

	cardCarousel.prototype.init = function(){

		cardCarousel.prototype.autoplay = function(){
			if(obj.config.autoPlay==true){
				this.switchInterval = setInterval(obj.rotateForward, parseInt(obj.config.transitionTime)*1000);
			} else {
				this.switchInterval = undefined;
			}
		}
		function animateRotation ( index, offsetTop, offsetRight, offsetLeft, zIndex) {
			$(".slide[data-index='"+ index +"']").animate({
	        	'top': offsetTop,
	        	'right':offsetRight,
	        	'left': offsetLeft,
	        	'z-index': zIndex
			});
		}
		cardCarousel.prototype.rotateBackward = function(){
				animateRotation(1, obj.config.offsetY, '-'+obj.config.offsetX, obj.config.offsetX, '0');
				animateRotation(2, obj.config.offsetY, '0%', '0%', '10000');
				animateRotation(3, obj.config.offsetY, obj.config.offsetX, '-'+obj.config.offsetX, '0');
				animateRotation(4, '0%', '0%', '0%', '0');
				
				$(".slide").each(function() {
					
				});
				$(".slide[data-index='1']").attr('data-index','');
				$(".slide[data-index='2']").attr('data-index','1');
				$(".slide[data-index='3']").attr('data-index','2');
				$(".slide[data-index='4']").attr('data-index','3');
				$(".slide[data-index='']").attr('data-index','4');
		}
		cardCarousel.prototype.rotateForward = function(){
				animateRotation(1, obj.config.offsetY, obj.config.offsetX, '-'+obj.config.offsetX, '0');
				animateRotation(2, '0%', '0%', '0%', '0');
				animateRotation(3, obj.config.offsetY, '-'+obj.config.offsetX, obj.config.offsetX, '0');
				animateRotation(4, '0%', '0%', '0%', '10000');
				

				$(".slide[data-index='1']").attr('data-index','');
				$(".slide[data-index='4']").attr('data-index','1');
				$(".slide[data-index='3']").attr('data-index','4');
				$(".slide[data-index='2']").attr('data-index','3');
				$(".slide[data-index='']").attr('data-index','2');
		}

	}
	
	$.fn.cardRotate = function(options){
		new cardCarousel(this, options);
		obj.autoplay();
		return this;
	};
	

$(document).ready(function() {

    $('#viewport').hover(function() {
    	if(obj.switchInterval !== undefined) {
    		clearInterval(obj.switchInterval);
    	}
    }, function() {
    	if(obj.config.autoPlay == true) {
    		  obj.switchInterval = setInterval(obj.rotateForward, parseInt(obj.config.transitionTime)*1000);
    	}
    });
    
    $('#next-btn').click(function() {
        obj.rotateForward();
    });

    $('#prev-btn').click(function() {
        obj.rotateBackward();
    });

  });
})(jQuery);

