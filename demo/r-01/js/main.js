
(function(){
	// 顶部导航滚动效果
	var winHei = $(window).height();
	var scrTop = $(window).scrollTop();
	var topNavHei = $('.navbar').height();

	// 滚动时候触发
	$(window).scroll(function(){
		scrTop = $(window).scrollTop();
		if( scrTop > topNavHei )
		{
			$('#top-nav-wrap').stop().animate({'padding':0},400).css('backgroundColor','#222');
		}else{
			$('#top-nav-wrap').stop().animate({'padding':'20px'},400).css('backgroundColor','rgba(248,248,248,0)');
		}
	})
})(); 