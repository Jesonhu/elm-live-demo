window.onload = function(){
	(function(){
		//刷新频率 解决同时开大量定时器卡顿的问题
		window.requestAnimFrame = (function() {
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame || 
				function(callback) {
					window.setTimeout( callback, 1000 / 60 );
				};
		})();

		var oCan = document.getElementById('canvas-bg');
		var cxt = oCan.getContext('2d');
		var timer;
		/*
			1 创建圆形离子对象
			2  绘制圆形离子
			3 自动移动
			4 鼠标事件 线条连接
		*/
		//初始自适应
		oCan.width = oCan.parentNode.offsetWidth;
		oCan.height = oCan.parentNode.offsetHeight;

		//改变窗口时canvas自适应
		window.onresize = function(){
			oCan.width = oCan.parentNode.offsetWidth;
			oCan.height = oCan.parentNode.offsetHeight;
		};

		//初始离子参数设置
		var initParam = {
			n : 500,   //离子数量
			d_dis: 50, //离子间50px范围内就产生连线
			m_dis : 100,  //离子距离鼠标点的范围内产生连线
			m_x : 30*oCan.width/100, //初始鼠标点x坐标 在画布30%
			m_y : 30*oCan.height/100,  //初始鼠标点y坐标 在画布30%
			array : [], //存放离子对象的数组
		};

		//创建离子对象
			//离子构造函数
		function Dots(){
			this.x = Math.random()*oCan.width; //离子圆心随机x坐标
			this.y = Math.random()*oCan.height; //离子圆心随机y坐标
			this.col = 'rgba('+radCol() +','+ radCol() +','+ radCol() +',1)'; //离子随机颜色
			//this.col = 'rgba('+ parseInt(Math.random()*255) +','+ parseInt(Math.random()*255) +','+ parseInt(Math.random()*255) +',1)'; 
			this.radius = Math.random()*5; //随机半径
			//离子移动随机速度
			this.sX = -0.5 + Math.random(); //x方向移动速度
			this.sY = -0.5 + Math.random(); //y方向移动随机速度
		};
			//离子原型
		Dots.prototype = {
			draw : function(){
				cxt.beginPath();
				cxt.fillStyle = this.col;
				cxt.arc(this.x,this.y,this.radius,0,360,false);
				cxt.fill();
			}
		};

			//数组里面添加离子对象
		addArr();
		function addArr(){
			for( var i=0;i<initParam.n;i++ )
			{
				initParam.array.push( new Dots() );
			}
		};

		//绘制出离子
		function drawDots(){
			for( var i=0;i<initParam.n;i++ )
			{
				initParam.array[i].draw();
			}
		};

		//自由移动
		function moveDots(){
			for( var i=0;i<initParam.n;i++ )
			{
				if( initParam.array[i].x < 0 || initParam.array[i].x > oCan.width  ) //离子碰到x轴上
				{
					initParam.array[i].sX = -initParam.array[i].sX; //x方向运动速度取反
					initParam.array[i].sY = initParam.array[i].sY;
				}else if( initParam.array[i].y < 0 || initParam.array[i].y > oCan.height )
				{
					initParam.array[i].sX = initParam.array[i].sX; 
					initParam.array[i].sY = -initParam.array[i].sY; //y方向运动速度取反
				}
				//每次改变圆心让离子动起来
				initParam.array[i].x += initParam.array[i].sX;
				initParam.array[i].y += initParam.array[i].sY;
			}
		};

		//连接线 原理 每次找两个这两个在可以连接的范围内就添加连接线
		function connectDots(){
			for( var i=0;i<initParam.n;i++ )
			{
				for( var j=0;j<initParam.n;j++ )
				{
					var iDot = initParam.array[i];
					var jDot = initParam.array[j];
					if( (iDot.x - jDot.x) < initParam.d_dis && (iDot.y - jDot.y) < initParam.d_dis && (iDot.x - jDot.x) > -initParam.d_dis && (iDot.y - jDot.y) > -initParam.d_dis ) //判断两个相邻点的距离
					{
						if( (iDot.x - initParam.m_x) < initParam.m_dis && (iDot.y - initParam.m_y) < initParam.m_dis && (iDot.x - initParam.m_x) > -initParam.m_dis && (iDot.y - initParam.m_y) > -initParam.m_dis ) //判断点距离鼠标点的距离
						{
							cxt.beginPath();
							cxt.strokeStyle = twoColorMix(iDot.col,jDot.col);
							cxt.moveTo(iDot.x,iDot.y);
							cxt.lineTo(jDot.x,jDot.y);
							cxt.stroke();
						}
					}
				}
			}
		};

		//在canvas盒子上时鼠标点移动函数
		oCan.onmousemove = function(e){
			e = e || event;
			initParam.m_x = e.pageX;
			initParam.m_y = e.pageY;
			clearInterval(timer);
			//鼠标移开画布的时候
			this.onmouseout = function(){
				initParam.m_x = oCan.width*Math.random();
				initParam.m_y = oCan.height*Math.random();
				mouseAutoMove();
			};
		};

		//鼠标点自动移动
		mouseAutoMove();
		function mouseAutoMove(){
			timer = setInterval(function(){
				initParam.m_x = oCan.width*Math.random();
				initParam.m_y = oCan.height*Math.random();
			},3000);
		};

		//离子动画和监听函数
		animateDots()
		function animateDots(){
			cxt.clearRect(0,0,oCan.width,oCan.height); //每次清除画布之前的内容
			drawDots(); //绘制出离子
			moveDots(); //离子动起来
			connectDots();
			requestAnimFrame( animateDots ); //迭代
		};

		//生成随机颜色函数
		function radCol(){
			return parseInt( Math.random()*255 );
		};

		//两种颜色混合
		function twoColorMix(col1,col2){
			var mixColor = [];
			var starIn1 = col1.indexOf('(')+1;
			var endIn1 = col1.indexOf(')');
			var starIn2 = col2.indexOf('(')+1;
			var endIn2 = col2.indexOf(')');
			var length;

			col1 = col1.slice( starIn1,endIn1 );
			col1 = col1.split(',');
			col2 = col2.slice( starIn2,endIn2 );
			col2 = col2.split(',');

			length = col1.length;
			for( var i=0;i<length;i++ )
			{
				mixColor.push( parseInt((col1[i]*1+col2[i]*1)/2) );
			}
			return 'rgba('+ mixColor[0] +','+ mixColor[1] +','+ mixColor[2] +',1)';
		};
		

	})();
}