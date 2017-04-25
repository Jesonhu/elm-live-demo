/*插件汇总-----Made by Jeson*/

//无缝滚动插件
	//无缝自动轮播
	(function($){
		$.fn.carouselSAuto = function(){
			var $banner = $(this);
			var $tabLi = $('div.tab li',$banner);
			var $picLiWidth = $('div.b-pic>ul>li',$banner).width();
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
					if (index>=$length)
					{	
						$picUl.css('margin-left',-$picLiWidth+'px');
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
								$picUl.css('margin-left',-$picLiWidth+'px');
								index = 0;
							}
						}
					);
				},3000)
			};
		}
	})(jQuery);

	//内容无缝自动轮播
	(function($){
		$.fn.carouselS = function(){
			var $banner = $(this);
			var $tabLi = $('div.tab li',$banner);
			var $picLiWidth = $('div.b-pic>ul>li',$banner).width();
			var $picUl = $('div.b-pic>ul',$banner);
			var $btnA = $('div.button a',$banner);
			var $text = $('div.c3-c-text',$banner);
			var $length = $('div.tab li',$banner).length;
			var timer;
			var index = 0;
			var _index = 0;
			
			//tab li悬浮
			$tabLi.hover(function(){
				$(this).addClass('hover').siblings().removeClass('hover');
				index = $(this).index();
				$picUl.animate({'margin-left':-index*$picLiWidth + 'px'},200);
				$text.children('div').eq(index).show().siblings().hide();
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
				$text.children('div').eq(_index).show().siblings().hide();
				$picUl.animate({'margin-left':-(index+1)*$picLiWidth + 'px'},200,function(){
					if (index>=$length)
					{	
						$picUl.css('margin-left',-$picLiWidth+'px');
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
					$text.children('div').eq(_index).show().siblings().hide();
					$picUl.animate({'margin-left':-(index+1)*$picLiWidth + 'px'},200,function(){
							if (index>=$length)
							{	
								$picUl.css('margin-left',-$picLiWidth+'px');
								index = 0;
							}
						}
					);
				},3000)
			};
		}
	})(jQuery);


//