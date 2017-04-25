(function(){
	//顶部效果
	$('a.on','div#header').parent().prev().find('a').css('border','none');

	//
	$('li','div#header').mouseenter(function(){
		$(this).addClass('hover').children('div.subMenu').stop().slideDown(500).parent().siblings().removeClass('hover').children('div.subMenu').stop().slideUp(500);
	});
	$('div.subMenu','div#header').mouseleave(function(){
		$('li','div#header').removeClass('hover');
		$(this).stop().slideUp(500);
	});
})();


//nav search
(function(){
	var $InputGroup = $('div.n-c-right div.input-group');
	var $NavWrap = $('div#nav');
	var $Wrap = $('div#navWrap')
	var index = 0;
	
	//搜索框效果
	$InputGroup.hover(function(){
		$('em',this).addClass('show');
		$('input',this).addClass('on');
		$('input',this).stop().animate({width:'180px'},200);
	},function(){
		$('em',this).removeClass('show');
		$('input',this).removeClass('on');
		$('input',this).stop().animate({width:'0px'},200);
	});
	
	//导航效果
	$('ul.n-c-list',$NavWrap).mouseenter(function(){
		$Wrap.css('margin-bottom','0px')
		$('div.n-c-subNav',$NavWrap).stop().animate({
			height:'60px'
		},600);
	});
	$('div.n-c-hover',$NavWrap).mouseleave(function(){
		$('div.n-c-subNav',$NavWrap).stop().animate({
			height:'0px'
		},600);
		$('ul.n-c-list li',$NavWrap).children('a').show();
		$('em.row-icon',$NavWrap).hide();
		$Wrap.css('margin-bottom','10px')
	});

	$('ul.n-c-list li',$NavWrap).hover(function(){
		index = $(this).index();
		$(this).addClass('hover').siblings().removeClass('hover');
		let $positionLeft = $(this).position().left; // 当前li相对于ul的偏移量
		$(this).children('a').eq(0).hide()
		.parent().siblings().children('a').show();
		$('div.n-c-s-list ul',$NavWrap).eq(index).show().siblings().hide();
		// console.log( $('em.row-icon',$NavWrap).position().left );
		$('em.row-icon',$NavWrap).show().stop().animate({ 
			left:($positionLeft+55) + 'px' // offset() 获取匹配元素在当前视口的相对偏移 position 获取匹配元素相对父元素的偏移。
		},200);
	});
})();

//无缝轮播
/*
(function(){
	var $carouselS = $('div#banner');
	var $tabLi = $('div.tab li',$banner);
	var $picLiWidth = $('div.b-pic li').width();
	var $picUl = $('div.b-pic ul',$banner);
	var $btnA = $('div.button a',$banner);
	var $length = $('div.tab li',$banner).length;
	var index = 0;
	var _index = 0;
	var timer;
	
	//tab li悬浮
	$tabLi.hover(function(){
		$(this).addClass('hover').siblings().removeClass('hover');
		index = $(this).index();
		$picUl.animate({'margin-left':-index*$picLiWidth + 'px'},200);
	});
	
	//btn点击效果
	$btnA.click(function(){
		var i = $(this).index();
		
		if (i) //点击右按钮的时候
		{	
			index++;
			_index = index;
			if (_index>=$length)
			{
				_index = 0;
			}
		}else{
			index--;
			_index = index;
			if (_index<0)
			{
				_index = $length-1;
			}
		}
		$tabLi.eq(_index).addClass('hover').siblings().removeClass('hover');
		$picUl.animate({'margin-left':-(index+1)*$picLiWidth + 'px'},200,function(){
			console.log( index );
			if (index>=$length)
			{	
				$picUl.css('margin-left','0px');
				index = 0;
			}else if (index<0)
			{
				$picUl.css('margin-left',-$length*$picLiWidth+'px');
				index = $length-1;
			}
		});
	});
	
	//停止自动轮播
	$banner.hover(function(){
		clearInterval( timer );
	},function(){
		auto();
	});

	//自动轮播
	auto();
	function auto(){
		timer = setInterval(function(){
			index ++;
			_index = index;
			if (_index>=$length)
			{
				_index = 0;
			}
			$tabLi.eq(_index).addClass('hover').siblings().removeClass('hover');
			$picUl.animate({'margin-left':-(index+1)*$picLiWidth + 'px'},200,function(){
					if (index>=$length)
					{	
						$picUl.css('margin-left','0px');
						index = 0;
					}
				}
			);
		},3000)
	}
})();
*/

//文字滚动
(function(){
	
	var $scrollWrap = $('div.scroll-wrap');
	var $scrollLi = $('li',$scrollWrap);
	var $scrollUl = $('ul',$scrollWrap)
	var $liLength = $scrollLi.length;
	var speedVal = 30;
	var timer;
	var index = 0;
	
	auto();
	function auto(){
		timer = setInterval(function(){
			index++;
			$scrollUl.animate({'margin-top':-index*speedVal+'px'},500,function(){
				if (index>=4)
				{	
					index = 0;
					$scrollUl.css('margin-top','0px');
					return index;
				}
			});
		},2000)
	};
	$scrollLi.mouseenter(function(){
		clearInterval( timer );
	}).mouseleave(function(){
		auto();
	});
})();
	
//文字偏移
(function(){
	$('div.text-scroll>ul>li').hover(function(){
		$(this).addClass('hover').siblings().removeClass('hover');
	},function(){
		$(this).removeClass('hover');
	});
})();

//有看点
(function(){
	$('div.c7-con ').find('li').hover(function(){
		$(this).find('em.icon').stop().fadeIn().parent().siblings().find('em.icon').stop().fadeOut();
	},function(){
		$(this).find('em.icon').stop().fadeOut();
	})
})();

//mobil
(function(){
	$('div.mob','div#mobil').mouseenter(function(){

		$(this).children('a').css('z-index','9').stop().animate({'top':'-5px'},500).children('div.info').show();
	}).mouseleave(function(){
		$(this).children('a').css('z-index','6').stop().animate({'top':'0px'},500).children('div.info').hide();
	});
})();

//大明星
(function(){
	var $carousel = $('div#con2 div.c-carousel');
	var $picUl = $('div.pic-img ul',$carousel);
	var $picLi = $('div.pic-img ul li',$carousel);
	var $liWidth = $picLi.width();
	var $length = $('div.tab li',$carousel);
	var $bottom = $('div.bottom',$carousel);

	$carousel.mouseenter(function(){
		$bottom.stop().animate({'bottom':'0px'});
	}).mouseleave(function(){
		$bottom.stop().animate({'bottom':'-82px'});
	});

	$bottom.find('li').hover(function(){
		var index = $(this).index();
		$picUl.stop().animate({'margin-left':-$liWidth*(index+1)+'px'});
	});
})();
	
