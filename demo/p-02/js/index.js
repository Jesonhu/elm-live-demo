$(function(){

	//header
	(function(){
		var $cart = $('div.header div.h_r_cart');
		var $hide = $('div.header div.h_r_c_hide');

		$cart.hover(function(){
			$(this).find('a').addClass('hover');
			$hide.stop().slideDown();
		},function(){
			$(this).find('a').removeClass('hover');
			$hide.stop().slideUp();
		});
	})();
	
	//nav
	(function(){
		var $search = $('div.n_search');
		var $txt = $('div.n_search .n_s_txt');
		var $btn = $('div.n_search .n_s_btn');
		var $tip = $('div.n_s_tip');
		var $tipA = $('div.n_s_tip a');
		var $list = $('div.n_search .n_s_list');
		var $li = $('div.n_s_list li');
		var $liOne = $('li.n_w_one');
		var $liHide = $('div#n_w_product');
		var $hideUl = $('div.n_w_p_main ul');
		

		//搜索框鼠标移动效果
		$search.hover(function(){
			$(this).addClass('hover');
		},function(){
			$(this).removeClass('hover');
		});
		//搜索按钮鼠标移动效果
		$btn.hover(function(){
			$(this).addClass('hover');
		},function(){
			$(this).removeClass('hover');
		});
		//搜索框内文字鼠标移动效果
		$tipA.hover(function(){
			$(this).addClass('hover');
		},function(){
			$(this).removeClass('hover');
		});

		//搜索框获得焦点效果
		$txt.focus(function(){
			$search.addClass('focus');
			$tip.fadeOut(200);
			$list.show();
		}).blur(function(){
			$search.removeClass('focus');
			$tip.fadeIn(200);
			$list.hide();
		});
		
		//nav选项卡
			//放到navli上时隐藏大盒子显示，并显示对应的ul
		$liOne.hover(function(){
			$liHide.stop().slideDown(300);
			var index = $(this).index();
			$hideUl.eq(index).show().siblings().hide();
		},function(){
			$liHide.stop().slideUp(300);
		});

			//放到隐藏区域也不会消失
		$liHide.hover(function(){
			$(this).stop().show();
		},function(){
			$(this).stop().slideUp(300);
		});
	})();

	//banner
	(function(){
		var $tabLi = $('.b_r_tab li');
		var $picLi = $('.b_r_b_pic li');
		var $btnDiv = $('.b_r_btn div');
		var $banner = $('div.b_r_banner');
		var $leftLi = $('div.b_l_nav li');
		var $subA = $('div.b_l_n_subNav li a');
		var $nav = $('div.b_l_nav');
		var $subwrap =$('div.b_l_n_subNav');
		var index = 0;
		var length = $tabLi.length;
		var timer;
		var arr = ['5E4E40','2A2424','313A49','7F5130','012F46'];
		var number = '';
	
	//轮播
		//hover哪个li添加效果 
		$tabLi.hover(function(){
			$(this).addClass('hover');
		},function(){
			$(this).removeClass('hover');
		}).click(function(){ //click效果
			index = $(this).index();
			banner();
		});
		
		//hover上对应div的效果
		$btnDiv.hover(function(){
			$(this).addClass('hover');
		},function(){//离开
			$(this).removeClass('hover');
		}).click(function(){ //点击左右按钮效果
			var i = $(this).index();
			if (i) // i为真不为0右按钮
			{
				index ++;
				index %= length; //第五个点击再切换到第一个;
			}else
			{
				index --;
				if(index<0)index = length-1;  //第一个再点击切换到第五个
			}
			banner();
		});

		//banner
		function banner(){  
			$picLi.eq(index).stop(true).fadeIn().siblings().stop().fadeOut(true); //图片li对应切换
			$tabLi.eq(index).addClass('click').siblings().removeClass('click'); //切换li效果
			//nva盒子换色
			number = arr[index];
			$nav.css( 'background','#'+number );
		};
		
		//自动轮播
		auto();
		function auto(){
			timer = setInterval(function(){
				index ++;
				if(index>4)index = 0;
				banner();
			},2000);
		}
		
		//自动滚动时鼠标放上去,自动停止效果
		$banner.hover(function(){ 
			clearInterval( timer );
		},function(){ 
			auto();
		});
	//左边菜单
		//一级菜单hover效果
		$leftLi.hover(function(){
			$(this).addClass('hover');
			$(this).find( $subwrap ).show();
		},function(){
			$(this).removeClass('hover');
			$(this).find( $subwrap ).hide();
		});
		
		//子菜单span hover效果
		$subA.find('span').hover(function(){
			$(this).addClass('hover');
		},function(){
			$(this).removeClass('hover');
		});
	})();

	//con1
	(function(){
		var $leftA =$('div.p_c_left a');

		//a 上hover触发效果
		$leftA.hover(function(){
			$(this).addClass('hover');
		},function(){
			$(this).removeClass('hover');
		})
	})();
	
	

	//con2明星产品（模拟后台数据）
		//前台展示形式
		/* <li class="p_c_s_l_li">
						<a href="" class="p_c_s_l_l_img"><img src="images/starGoods/1.jpg" alt="" width="160" height="160" /></a>
						<a href="" class="p_c_s_l_l_title">小米手机4C</a>
						<p class="p_c_s_l_l_detail">骁龙808旗舰手机，爱不释手</p>
						<p class="P_c_s_l_l_price">1099元起</p>
			</li>
		*/

	(function(){
		var $ul = $('div.p_c_s_list ul.p_c_s_l_ul');
		var liLength = miData.starGoods.imgSrc.length;

		for (var i=0;i<liLength ;i++ )
		{
			var oLi = document.createElement('li');
				oLi.className = 'p_c_s_l_li';
				oLi.style.borderTop = '1px solid'+ miData.starGoods.borderColor[i];
			var oA1 = document.createElement('a');
				oA1.className = 'p_c_s_l_l_img';
				oA1.href = '';
			var oA2 = document.createElement('a');
				oA2.className = 'p_c_s_l_l_title';
				oA2.href = '';
				oA2.innerHTML = miData.starGoods.title[i];
			var oP1 = document.createElement('p');
				oP1.className = 'p_c_s_l_l_detail';
				oP1.innerHTML = miData.starGoods.detail[i];
			var oP2 = document.createElement('p');
				oP2.className = 'P_c_s_l_l_price';
				oP2.innerHTML = miData.starGoods.price[i];

			//oA1里面的内容
			var oImg = new Image();
				oImg.src = miData.starGoods.imgSrc[i];
				oImg.alt = '';
				oImg.width = '160';
				oImg.height = '160';

			//添加到dom里面
			$ul[0].appendChild( oLi );
			oLi.appendChild( oA1 );
			oLi.appendChild( oA2 );
			oLi.appendChild( oP1 );
			oLi.appendChild( oP2 );
			oA1.appendChild( oImg );
		}
		
	// 动画效果
		var $titleRA = $('div.p_c_t_right a');
		var $ul = $('ul.p_c_s_l_ul');
		var $li = $('ul.p_c_s_l_ul li');
		var ulIndex = true;
		var $margin = $li.eq(5).position().left; //第六个li距离父元素的left距离
		var timer;

		/*
			//title hover效果
			$titleRA.hover(function(){
				$(this).addClass('hover');
			},function(){
				$(this).removeClass('hover');
			});
		*/
		//title 切换点击效果
		$titleRA.click(function(){
			var i = $(this).index();
			if (i) //点击右按钮
			{
				if (ulIndex) //当前显示前5个li时
				{	
					ulIndex = !ulIndex;
					$ul.stop().animate({
						marginLeft : -$margin + 'px'
					},500);
					toggle();
					//解决点击后轮播马上又换过去的问题
					//clearInterval( timer );
					//auto();
				}
			}else{	//点击左按钮
				if ( !ulIndex ) //当前显示后5个li
				{
					ulIndex = !ulIndex;
					$ul.stop().animate({
						marginLeft : 0+ 'px'
					},500);
					toggle();
					//解决点击后轮播马上又换过去的问题
					//clearInterval( timer );
					//auto();
				}
			}
			//解决点击后轮播马上又换过去的问题
			clearInterval( timer );
			auto();
		});
		
		//toggle
		function toggle(){
			$titleRA.eq(0).toggleClass('move');
			$titleRA.eq(1).toggleClass('move');
		}

		//自动播放
		auto();
		function auto(){
			timer = setInterval(function(){
				if (ulIndex) //当前显示前5个li时
				{	
					$ul.stop().animate({
						marginLeft : -$margin + 'px'
					},500);
				}else{
					$ul.stop().animate({
						marginLeft : 0 + 'px'
					},500);
				}
				ulIndex = !ulIndex;
				toggle();
			},5000);
		};

	})();

	//con4
	(function(){
		var $titleLi = $('.p_c_t_right li');
		var $rightUl =$('div.p_c_w_right>ul');
		var $rightLi = $('div.p_c_w_right>ul>li');
		var $rightHide = $('div.p_c_w_right div.p_c_w_r_hide');
		var index = 0;
		
		//alert( $rightUl.length );
		//title li hover效果
		$titleLi.hover(function(){
			$(this).addClass('hover').siblings().removeClass('hover');
			index = $(this).index();
			$rightUl.eq(index).stop(true).show().siblings().stop(true).hide();
		});

		//right li hover效果
		$rightLi.hover(function(){
			$(this).find('div.p_c_w_r_hide').stop().animate({
				height:'77px',
				opacity : 1
			},500);
		},function(){
			$(this).find('div.p_c_w_r_hide').stop().animate({
				height:'0px',
				opacity : 0
			},500);
		});
	})();

	//con5
	(function(){
		var $a = $('#p_con5_outWrap .p_c_w_list li a.comment');
		var txtLeng = 40;
		
		//文字超出部分显示省略号
		for (var i=0;i<4 ;i++ )
		{	
			var $aTex = $a.eq(i).text();
			var newString = $aTex.substring(0,txtLeng ) + "...";
			if( $aTex.length>txtLeng ){
				 $aTex = $a.eq(i).text( newString );
			}; 
		};
	})();

	//con6
		
	(function(){
		var $outLi = $('.p_c_c_list li.liOut');
		var $subLi = $('.subUl li.subLi');
		var $subUl = $('div.p_c_c_l_subWrap .subUl');
		var $btnSpan = $('.p_c_c_l_s_btn span');
		var $tab = $('li.liOut div.p_c_c_l_s_tab');
		var $tabLi = $('div.p_c_c_l_s_tab li');
		
		var color = '';
		var $length = $subUl.length;
		var $subLiW = $subLi.width();
		var $pIndex = 0; //最外层li index();
		
		//每个外层li上边框添加颜色
		$outLi.each(function(i){  
			switch (i)
			{	
				case 0:
					color = '#f93';
					break;
				case 1:
					color = '#3f9';
					break;
				case 2:
					color = '#ff6';
					break;
				case 3:
					color = '#00f';
					break;
			};
			$(this).css('borderTopColor',color).find('p.title').css('color',color);
		});
		
		//btn span显示
		$outLi.hover(function(){
			//var $pIndex = $(this).index();
			$(this).find( $btnSpan ).show(300);
		},function(){
			$(this).find( $btnSpan ).hide();
		});
		
		//给每个sub Ul添加一个独立标记
		$subUl.each(function(){ 
			this.a = 0;
		});
		
		//btn span被点击
		$btnSpan.click(function(){
			var i = $(this).index();
			 $pIndex = $(this).parent().parent().parent().index(); //找到最外层li的index
			if (i) //点击右按钮
			{
				//$subUl.eq($pIndex)[0].a ++;
				//$subUl.eq($pIndex)[0].a %= $length;

				/*if ( $subUl.eq($pIndex)[0].a == $length-1 )
				{
					//$subUl.eq($pIndex)[0].a --;
					return;
				}*/
				//$subUl.eq($pIndex)[0] 讲jq对象转换为js对象
				if ($subUl.eq($pIndex)[0].a < $length-1)
				{
					$subUl.eq($pIndex)[0].a ++;
				}else{
					return;
				}
			}else{ //点击左按钮
				/*$subUl.eq($pIndex)[0].a --;
				if ($subUl.eq($pIndex)[0].a<0)
				{
					//$subUl.eq($pIndex)[0].a = $length-1;
					return;
				}*/
				if ($subUl.eq($pIndex)[0].a>0)
				{
					$subUl.eq($pIndex)[0].a --;
				}else{
					return;
				}
			}
			$subUl.eq($pIndex).stop(true).animate({marginLeft : -($subUl.eq($pIndex)[0].a)*$subLiW + 'px' },500);
			$outLi.eq($pIndex).find( $tabLi ).eq( $subUl.eq($pIndex)[0].a ).addClass('click').siblings().removeClass('click');
		}).mousedown(function(){
			return false;
		});

		//tab li点击效果
		$tabLi.click(function(){
			var index = $(this).index();
			$pIndex = $(this).parent().parent().parent().parent().index(); //找到最外层li的index
			$subUl.eq($pIndex)[0].a = index;
			$(this).addClass('click').siblings().removeClass('click');
			$subUl.eq($pIndex).stop(true).animate({marginLeft : -($subUl.eq($pIndex)[0].a)*$subLiW + 'px' },500);
		});

	})();

	//con7
	(function(){
		var $titA = $('div.p_c_title a');
		var $liPlay = $('div.p_c_list li i');

		//悬浮效果
		$titA.hover(function(){
			$(this).addClass('hover');
		},function(){
			$(this).removeClass('hover');
		});

		//播放按钮悬浮效果
		$liPlay.hover(function(){
			$(this).addClass('hover');
		},function(){
			$(this).removeClass('hover');
		});
		
	})();
});