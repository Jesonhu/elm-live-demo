(function(){
	//navbar li悬浮效果
	$('#topNav ul li').hover(function(){
		$(this).addClass('active').siblings().removeClass('active');
	});

})();

(function(){
	//sub-nav效果
	var $navA = $('div#detail-nav .d-nav li a');
	var $navLi = $('div#detail-nav .d-nav li');
	var $subNav = $('div.sub-nav');
	var $subUl = $('div.sub-nav ul');

	$navLi.hover(function(){
		if ( $(this).hasClass('md') )
		{
			$(this).children('a').addClass('hover').parent().siblings().children('a').removeClass('hover');
		}
		$subNav.show();
		$( $(this).children('a').attr('for') ).show().siblings().hide();
	},function(){
		$subNav.hide();
	});
	
	$subNav.hover(function(){
		$(this).show();
	},function(){
		$(this).hide();
		$navA.removeClass('hover');
	});

})();

(function(){
//con2
	//开启tooltip提示功能
	$(function(){
		$("[data-toggle='tooltip']").tooltip();

	})
})();

(function(){
	$window = $(window);
	var $left = $('#con3 div.c3-left');
	var $right = $('#con3 div.c3-right');
	var $con3 = $('div#con3');
	var $con3offsetTop = $('#con3').offset().top;
	var $windowW = $(window).width(); //当前浏览器窗口的宽度
	
	//初始位置设置
	$left.css({'left':$windowW*(4/12)},{'opacity':0});
	$right.css({'right':-$windowW*(7/12)},{'opacity':0});
	//滚动条滚动到con3时开始动画
	var $scrollTop = $(document).scrollTop();
    console.log( $scrollTop );
		if ( ($scrollTop+100)>$con3offsetTop )
		{
			$left.animate({'left':'0px'},{'opacity':1},1000);
			$right.animate({'right':'0px'},{'opacity':1},1000);
            console.log(1);
		}

//	$con3.hover(function(){
//		$left.fadeIn(1000);
//		$right.fadeIn(1000);
//	});
})();

(function(){
	//con1
	$('div#con1 div.c1-wrap').hover(function(){
		$(this).addClass('hover').siblings().removeClass('hover');
	});
})();