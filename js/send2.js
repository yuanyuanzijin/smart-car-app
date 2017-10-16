   		function send(content){
			
			if(content != oldcontent){
				sendinstruct('A');
				sendinstruct(content.slice(0,1));
				sendinstruct(content.slice(1,2));
				sendinstruct(content.slice(2,3));
				sendinstruct(content.slice(3,4));
				sendinstruct(content.slice(4,5));
				oldcontent = content;
				console.log(content.slice(0,1)+content.slice(1,2)+content.slice(2,3)+content.slice(3,4)+content.slice(4,5));
			}
			
			if(set3 == '1'){
				plus.device.vibrate(25);
			}
			
		}