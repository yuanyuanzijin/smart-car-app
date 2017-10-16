mui.plusReady(function () {
	readAllItem();

	document.getElementById("set1").addEventListener("toggle",function(event){
		  if(event.detail.isActive){
		    console.log("你启动了开关");
		    plus.storage.setItem("set1","1");
		    set1 = '1';
		    var length = getLengthFun();
			console.log( "数据存储成功，存储了"+length+"条数据；" );
			getAllItem();
		  }else{
		    console.log("你关闭了开关");  
		    plus.storage.setItem("set1","0");
		    set1 = '0';
		    var length = getLengthFun();
			console.log( "数据存储成功，存储了"+length+"条数据；" );
			getAllItem();
		  }
	})
	
	document.getElementById("set2").addEventListener("toggle",function(event){
		  if(event.detail.isActive){
		    console.log("你启动了开关");
		    plus.storage.setItem("set2","1");
		    set2 = '1';
		    var length = getLengthFun();
			console.log( "数据存储成功，存储了"+length+"条数据；" );
			getAllItem();
		  }else{
		    console.log("你关闭了开关");  
		    plus.storage.setItem("set2","0");
		    set2 = '0';
		    var length = getLengthFun();
			console.log( "数据存储成功，存储了"+length+"条数据；" );
			getAllItem();
		  }
	})
	
	document.getElementById("set3").addEventListener("toggle",function(event){
		  if(event.detail.isActive){
		    console.log("你启动了开关");
		    plus.storage.setItem("set3","1");
		    set3 = '1';
		    var length = getLengthFun();
			console.log( "数据存储成功，存储了"+length+"条数据；" );
			getAllItem();
		  }else{
		    console.log("你关闭了开关");  
		    plus.storage.setItem("set3","0");
		    set3 = '0';
		    var length = getLengthFun();
			console.log( "数据存储成功，存储了"+length+"条数据；" );
			getAllItem();
		  }
	})

function readAllItem(){
	outSet( "设置数据：" );
	var itemLength = getLengthFun();
	for ( var j=0; j < itemLength; j++ ) {
		var key = plus.storage.key(j);
		if(key.indexOf("set1")>-1){
			set1 = plus.storage.getItem(key);
			if(set1 == '1'){
				document.getElementById("set1").className = "mui-switch mui-active";
			}
		}
		if(key.indexOf("set2")>-1){
			set2 = plus.storage.getItem(key);
			if(set2 == '1'){
				document.getElementById("set2").className = "mui-switch mui-active";
			}
		}
		if(key.indexOf("set3")>-1){
			set3 = plus.storage.getItem(key);
			if(set3 == '1'){
				document.getElementById("set3").className = "mui-switch mui-active";
			}
		}
	  console.log(set1+set2+set3);
	};
}

function getLengthFun(){
	return plus.storage.getLength();
}

function getAllItem(){
	outSet( "获取数据：" );
	var itemLength = getLengthFun();
	for ( var j=0; j < itemLength; j++ ) {
		var key = plus.storage.key(j);
	  	var value = plus.storage.getItem(key);
	  	console.log( "key:"+key+"-->value:"+value );
	};
}


})