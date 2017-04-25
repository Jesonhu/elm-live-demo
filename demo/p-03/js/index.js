
//搜索输入框内容显示(placeholder效果实现)
$(function(){
	
	//header_top效果
	(function(){
		var $seaInpText = $('.search_wrap .search_text');
		var $seaLabel = $('.search_wrap label');
		var $topHand = $('li.top_hand');
		var $clearLine = $('li.top_hand > div.clearLine');
		var $clearBox = $('li.top_hand > div.clearBox');
		var $handSubMenu = $('li.top_hand > div.hand_subMenu');
		var $topUser = $('div.top_user');
		var $userHide = $('div.user_hide');
		var $inPro = $('div.index_provice');
		var $proHide = $('div.provice_hide');
		var $proLine = $('div.provice_cl');
		var $menuList = $('div.top_right>ul>li.menu_list');
		var $subMenu = $('div.subMenu_con');
		var $mapsubMenu = $('div.map_subMenu');
		var $mapClearLine = $('li.h_map_con>div.clearLine');
		var $mapClearBox = $('li.h_map_con>div.clearBox');
		var $aWeixin = $('a.weixin');
		var $wxShow = $('a>div.weixin_show');
		var $favo = $('li.menu_favo');

		//登录注册效果
		$topUser.hover(function(){
			$userHide.stop().slideDown(); //显示
		},function(){
			$userHide.stop().slideUp('fast');  //隐藏
		});
		
		//省份效果
		$inPro.hover(function(){
			$proHide.stop().slideDown();
			$proLine.show();
		},function(){
			$proHide.stop().slideUp('fast');
			$proLine.hide();
		});
		
		//我的一号店
		$menuList.eq(0).hover(function(){
			$subMenu.eq(0).stop().show();
		},function(){
			$subMenu.eq(0).stop().hide();
		});
		
		//收藏夹
		$favo.hover(function(){
			$subMenu.eq(1).stop().show();
		},function(){
			$subMenu.eq(1).stop().hide();
		});
		
		//掌上一号店效果
		$topHand.hover(function(){
			//显示
			$handSubMenu.stop().slideDown();
			$clearLine.show();
			$clearBox.show();
		},function(){//隐藏
			$handSubMenu.stop().slideUp('fast');
			$clearLine.hide();
			$clearBox.hide();
		});

		//网站导航
		$menuList.eq(4).hover(function(){
			$mapsubMenu.stop().slideDown();
			$mapClearLine.show();
			$mapClearBox.show();
		},function(){
			$mapsubMenu.stop().slideUp('fast');
			$mapClearLine.hide();
			$mapClearBox.hide();
		});
		
		//微信图标显示
		$aWeixin.hover(function(){
			$wxShow.stop().slideDown();
		},function(){
			$wxShow.stop().slideUp('fast');
		});

		//获得光标
		$seaInpText.focus(function(){
			$seaLabel.css( 'color','#ccc' );
		});
		//输入内容的时候的时候
		$seaInpText.keydown(function(){
			$seaLabel.text('');
		});
	})();

	 // banner大图导航
	(function(){
		//banner图片轮播
		var $banWrap = $('#banner_con');
		var $navLi = $('.b_table li',$banWrap);
		var $imgLi = $('.banner li',$banWrap);
		var $btnA = $('.b_btn a',$banWrap);
		var length = $navLi.length;
		var index = 0;
		var timer;

		//底部导航悬浮效果
		$navLi.hover(function(){
			index = $(this).index();
			$(this).addClass('b_t_on').siblings().removeClass('b_t_on');
			$imgLi.eq(index).stop().fadeIn().siblings().stop().fadeOut();
		});

		//点击两侧按钮
		$btnA.click(function(){
			var i = $(this).index();
			if( i ) //点击右按钮
			{
				index++;
				index %= length;
			}else{
				index--;
				if(index<0)index = length-1;
			}
			$navLi.eq(index).addClass('b_t_on').siblings().removeClass('b_t_on');
			$imgLi.eq(index).stop().fadeIn().siblings().stop().fadeOut();
		});

		//自动轮播
		auto();
		function auto(){
			timer = setInterval(function(){
				index ++;
				index %= length-1;
				$navLi.eq(index).addClass('b_t_on').siblings().removeClass('b_t_on');
				$imgLi.eq(index).stop().fadeIn().siblings().stop().fadeOut();
			},3000)
		};

		//悬浮停止自动轮播
		$banWrap.hover(function(){
			clearInterval( timer );
			$('.b_btn',$(this)).css('display','block');
		},function(){
			auto();
			$('.b_btn',$(this)).css('display','none');
		});

	})();

	// 顶部serch部分
	(function(){
		var $serWrap = $('.search_form');
		var $serInp = $('.search_text',$serWrap);
		var $hide = $('.hide-search',$serWrap);

		$serInp.focus(function(){
			$hide.show().mouseleave(function(){
				$(this).hide();
			})
		}).blur(function(){
			$hide.hide();
		});
	})();

	//一号店专享切换
	(function(){
		var $wrap = $('.b_r_table');
		var $hideWrap = $('.b_r_tableHide',$wrap);
		var $tabLi = $('ul li',$hideWrap);
		var $tabDd = $('dd.has-child',$wrap);
		var $hideCon = $('.con-box',$wrap);
		var $close = $('em.close',$hideCon);
		var index = 0;

		//选项卡切换
		$tabLi.hover(function(){
			index = $(this).index();
			$(this).addClass('active').siblings().removeClass('active');
			$hideCon.find('div.con').eq(index).show().siblings('div.con').hide();
		});

		$tabDd.hover(function(){
			$hideWrap.stop().animate({'top':0},300)
		});

		//点击关闭
		$close.click(function(){
			$hideWrap.stop().animate({'top':186},300)
		});

		$hideWrap.mouseleave(function(){
			$hideWrap.stop().animate({'top':186},300)
		});

	})();

	//carsor
	(function(){
		var mData = jsData.conCarousel;
		var $wrap = $('.con-carousel');
		var $imgList = $('.list',$wrap);
		var $btn = $('.btn',$wrap);
		var $aWid;
		var html = '';

		/*<a href="">
						<div class="fl">
							<p class="class">零食</p>
							<h3>满99减50</h3>
							<p>新活动开始</p>
						</div>
						<img src="images/car01/1.webp" alt="1.webp">
		</a>*/

		for( var i=0;i<mData.length;i++ )
		{
			html += '<a href=""><div class="fl"><p class="class">'+mData[i].className+'</p><h3 style="color:'+mData[i].prferColor+'">'+mData[i].prefer+'</h3><p>新活动开始</p></div><img src="images/car01/'+mData[i].imgUrl+'" alt="1.webp"></a>';
		};
		$imgList.append( html );

		$aWid = $('a',$imgList).width();
		$wrap.hover(function(){
			if( parseInt($imgList.css('margin-left')) == -$aWid*5  )
			{
				$btn.find('a').eq(0).show().siblings().hide();
			}else if( parseInt($imgList.css('margin-left')) == 0 )
			{
				$btn.find('a').eq(1).show().siblings().hide();
			}
		},function(){
			$btn.find('a').hide();
		});

		$btn.find('a').click(function(){
			$(this).index()?$imgList.animate({'margin-left':-$aWid*5+'px'},1000):$imgList.animate({'margin-left':0},1000);
			$(this).hide().siblings().show();
		});


	})();

	
	
});