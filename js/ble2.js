
//address=""搜索蓝牙//address=设备mac地址，自动配对给出mac地址的设备
function searchDevices(address) {
	document.getElementById("bt0").style.display = "block";
    document.getElementById("bt1").style.top = "20px";
    setTimeout('document.getElementById("daoyan").style.display = "inline-block";','100');
	var button1 = document.getElementById('bt1');
    button1.disabled=true;
    button1.value='正在搜索...';
    
    //注册类
    var main = plus.android.runtimeMainActivity();
    var IntentFilter = plus.android.importClass('android.content.IntentFilter');
    var BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter");
    var BluetoothDevice = plus.android.importClass("android.bluetooth.BluetoothDevice");
    var BAdapter = BluetoothAdapter.getDefaultAdapter();
    console.log("开始搜索设备");
    var filter = new IntentFilter();
    var bdevice = new BluetoothDevice();
    var on = null;
    var un = null;
    var vlist1 = document.getElementById('list1'); //注册容器用来显示未配对设备
    vlist1.innerHTML = ''; //清空容器
    var vlist2 = document.getElementById('list2'); //注册容器用来显示未配对设备
    vlist2.innerHTML = ''; //清空容器
    
    BAdapter.startDiscovery(); //开启搜索
    var receiver;
    receiver = plus.android.implements('io.dcloud.android.content.BroadcastReceiver', {
        onReceive: function(context, intent) { //实现onReceiver回调函数
            plus.android.importClass(intent); //通过intent实例引入intent类，方便以后的‘.’操作
            console.log(intent.getAction()); //获取action
            if(intent.getAction() == "android.bluetooth.adapter.action.DISCOVERY_FINISHED"){
                main.unregisterReceiver(receiver);//取消监听
                if(connectstatus != '1'){
                	button1.disabled=false;
                	button1.value='重新搜索';
                }
                
                console.log("搜索结束")
            }else{
            BleDevice = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
            //判断是否配对
            if (BleDevice.getBondState() == bdevice.BOND_NONE) {
                console.log("未配对蓝牙设备：" + BleDevice.getName() + '    ' + BleDevice.getAddress());
                //参数如果跟取得的mac地址一样就配对
                if (address == BleDevice.getAddress()) {
                    if (BleDevice.createBond()) { //配对命令.createBond()
                        console.log("配对成功");
                        var li2 = document.createElement('li'); //注册
                        li2.setAttribute('id', BleDevice.getAddress()); //打印机mac地址
                        li2.setAttribute('onclick', 'print(id)'); //注册click点击列表进行打印
                        li2.innerText = BleDevice.getName();
                        
                        li2.setAttribute('style','font-size: 20px;text-decoration: none;')
                        
                        vlist2.appendChild(li2);
                    }
					
                } else {
                    if(BleDevice.getName() != on ){ //判断防止重复添加
                    var li1 = document.createElement('li'); //注册
                    li1.setAttribute('id', BleDevice.getAddress()); //打印机mac地址
                    li1.setAttribute('onclick', 'searchDevices(id)'); //注册click点击列表进行配对
                    on = BleDevice.getName();
                    li1.innerText = on;
                    vlist1.appendChild(li1);
                    }
                }
            } else {
                if(BleDevice.getName() != un ){ //判断防止重复添加
	                console.log("已配对蓝牙设备：" + BleDevice.getName() + '    ' + BleDevice.getAddress());
	                var li2 = document.createElement('li'); //注册
	                li2.setAttribute('id', BleDevice.getAddress()); //打印机mac地址
	                li2.setAttribute('onclick', 'print(id)'); //注册click点击列表进行打印
	                un = BleDevice.getName();               
	                li2.innerText = un;
	                vlist2.appendChild(li2);
	                var caraddress = BleDevice.getAddress();
	                console.log("智能车"+caraddress);
	                if(address == caraddress){
	                	if(set1 == '1'){
	                		print(caraddress);
	                	}else{
		                	mui.confirm("发现智能小车Zijin Car，是否连接？","发现可用设备",["取消","连接"],function(e){
		                		if (e.index == 1) {
		                			document.getElementById("bt1").value = "连接中...";
									print(caraddress);
								} else {
									mui.toast("请点击要连接的设备");
								}
		                	},"div");
	                	}
	                }
                }
            }
          }
        }
    });

    filter.addAction(bdevice.ACTION_FOUND);
    filter.addAction(BAdapter.ACTION_DISCOVERY_STARTED);
    filter.addAction(BAdapter.ACTION_DISCOVERY_FINISHED);
    filter.addAction(BAdapter.ACTION_STATE_CHANGED);

    main.registerReceiver(receiver, filter); //注册监听
}

var device = null,
    BAdapter = null,
    BluetoothAdapter = null,
    uuid = null,
    main = null,
    bluetoothSocket = null;

function print(mac_address) {
    if (!mac_address) {
        mui.toast('请选择蓝牙打印机');
        return;
    }
    

    main = plus.android.runtimeMainActivity();
    BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter");
    UUID = plus.android.importClass("java.util.UUID");
    uuid = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
    BAdapter = BluetoothAdapter.getDefaultAdapter();
    device = BAdapter.getRemoteDevice(mac_address);
    plus.android.importClass(device);
    bluetoothSocket = device.createInsecureRfcommSocketToServiceRecord(uuid);
    plus.android.importClass(bluetoothSocket);

    if (!bluetoothSocket.isConnected()) {
        console.log('检测到设备未连接，尝试连接....');
        document.getElementById("bt1").value = "搜索设备"; 
        bluetoothSocket.connect();
    }

    console.log('设备已连接');

    if (bluetoothSocket.isConnected()) {

        connectstatus = '1';
        var btchange = document.getElementById("bt1");
		btchange.style.backgroundColor = "dodgerblue";
		btchange.disabled = true;
        btchange.value = '已连接';
        
		document.getElementById("daoyan").style.display = "none";
		document.getElementById("bt0").style.display = "none";
        document.getElementById("bt1").style.top = "150px";
        document.getElementById("bt2").style.top = "150px";
        setTimeout('document.getElementById("bt2").style.display = "inline-block"',"300");
        document.getElementById("status").innerHTML = "蓝牙状态：已连接";
		mui.toast('设备连接成功');
    }
}

function closeconnect(){
	bluetoothSocket.close(); //必须关闭蓝牙连接否则意外断开的话打印错误
	connectstatus = '0';
	
	document.getElementById("bt1").style.top = "200px";
	document.getElementById("bt2").style.display = "none";
	document.getElementById("status").innerHTML = "蓝牙状态：未连接";
    var btchange = document.getElementById("bt1");
	btchange.style.backgroundColor = "lightseagreen";
	btchange.disabled = false;
    btchange.value = '开启智能之旅';
	mui.toast("已关闭连接");
}

function sendinstruct(content){
	    var outputStream = bluetoothSocket.getOutputStream();
        plus.android.importClass(outputStream);
        var bytes = plus.android.invoke(content, 'getBytes', 'Ascii');
        outputStream.write(bytes);
        outputStream.flush();
        device = null //这里关键
        //bluetoothSocket.close(); //必须关闭蓝牙连接否则意外断开的话打印错误
}
