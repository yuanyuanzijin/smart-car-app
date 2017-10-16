		function watchAcc() {
			if ( aid ) {
				return;
			}
			var speed;
			var turningspeed;
			var senddirect;
			var sendleft;
			var sendright;
			var oldspeed = '0';
			var oldturningspeed = '0';
			
			controlmode = '1';

			sendinstruct('A');
				sendinstruct('2');
				sendinstruct('0');
				sendinstruct('0');
				sendinstruct('0');
				sendinstruct('0');
			outSet( "当前加速度变化" );
			aid = plus.accelerometer.watchAcceleration( function ( a ) {
				outSet( "当前加速度变化\n" + "X轴：" + a.xAxis + "\nY轴：" + a.yAxis + "\nZ轴：" + a.zAxis );

				if(Math.abs(a.zAxis) < '2'){
					senddirect = '2';
					sendleft = '00';
					sendright = '00';
				}else{
					if(a.zAxis > '0'){
						senddirect = '0';
					}else{
						senddirect = '1';
					}
					speed = Math.round(50+Math.abs(a.zAxis)*6);
					if(speed >='100'){
						speed = '99';
					}
				
					////屏蔽相似的速度
					if(Math.abs(speed-oldspeed)<='3'){
						speed = oldspeed;
					}
					oldspeed = speed;//
					
					if(Math.abs(a.yAxis) < '2'){
						sendleft = speed;
						sendright = speed;
					}else{
						angle = Math.round(Math.abs(a.yAxis));
						turningspeed = Math.round(speed*(1-angle/25));
						////屏蔽相似的转角
						if(Math.abs(turningspeed-oldturningspeed)<='2'){
							turningspeed = oldturningspeed;
						}
						oldturningspeed = turningspeed;//
						
						if(a.yAxis > '0'){
							sendleft = speed;
							sendright = turningspeed;
						}else{
							sendleft = turningspeed;
							sendright = speed;
						}
					}
					if(sendleft < '10'){
						sendleft = '0' + sendleft;
					}
					if(sendright < '10'){
						sendleft = '0' + sendright;
					}
				}
				
				content = senddirect+sendleft+sendright;
				send(content);
				
			}, function ( e ) {
				outLine( "监听失败:" + e.message );
			},{frequency:100} );
						
			
		}
		
		
		
		function watchStop() {
				sendinstruct('A');
				sendinstruct('2');
				sendinstruct('0');
				sendinstruct('0');
				sendinstruct('0');
				sendinstruct('0');
			controlmode = '0';
			if ( aid ) {
				outSet( "停止监听设备加速度变化" );
				plus.accelerometer.clearWatch( aid );
				aid = null;
			} else {
				outSet( "没有监听设备加速度变化" );
			}

		}
		
function play( url ) {
	if(set2 =='1'){
		p = plus.audio.createPlayer( url );
		p.play( function () {
	
		}, function ( e ) {
			outLine( "播放音频文件\""+url+"\"失败："+e.message );
		} );
	}
}