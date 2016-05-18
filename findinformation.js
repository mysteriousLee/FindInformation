var status = "idcard";
var judge = {
    id : 0,
    phone : 0,
    fastmail : 0,
    tv : 0,
};
function GetIdData (value) {
    var table = document.getElementsByClassName('idinformation')[0];
	var newprovince = document.createElement('td');
	var newcity = document.createElement('td');
	var newtown = document.createElement('td');
	var newsex = document.createElement('td');
	var newbirth = document.createElement('td');
    var newtr = document.createElement('tr');
    //var list = document.getElementById('idcard');
	$.ajax({
        type : 'GET',
        dataType : 'jsonp',
        data : {
        	idcard : value,
        	appkey : '9f7ee696768c85e6'
        },//GET 请求中将附加在 URL 后
        success : function (data){
        	newprovince.innerHTML = data.result.province;
        	newcity.innerHTML = data.result.city;
        	newtown.innerHTML = data.result.town;
        	newsex.innerHTML = data.result.sex;
        	newbirth.innerHTML = data.result.birth;
        	newtr.appendChild(newprovince);
        	newtr.appendChild(newcity);
        	newtr.appendChild(newtown);
        	newtr.appendChild(newsex);
        	newtr.appendChild(newbirth);
            table.appendChild(newtr);
        },
     	url : "http://api.jisuapi.com/idcard/query"
     });
}
function GetPhoneData (value) {
    var table = document.getElementsByClassName('phoneinformation')[0];
    var newprovince = document.createElement('td');
    var newcity = document.createElement('td');
    var newcompany = document.createElement('td');
    var newtr = document.createElement('tr');
    $.ajax({
        type : 'GET',
        dataType : 'jsonp',
        data : {
            shouji : value,
            appkey : '9f7ee696768c85e6'
        },//GET 请求中将附加在 URL 后
        success : function (data){
            console.log(data);
            newprovince.innerHTML = data.result.province;
            newcity.innerHTML = data.result.city;
            newcompany.innerHTML = data.result.company;
            newtr.appendChild(newprovince);
            newtr.appendChild(newcity);
            newtr.appendChild(newcompany);
            table.appendChild(newtr);
        },
        url : "http://api.jisuapi.com/shouji/query"
     });
}
function GetfastmailData(value) {
    var table = document.getElementsByClassName('fastmailinformation')[0];
    var tr = [];
    $.ajax({
        type : 'GET',
        dataType : 'jsonp',
        data : {
            type : 'auto',
            number : value,
            appkey : '9f7ee696768c85e6'
        },//GET 请求中将附加在 URL 后
        success : function (data){
            for(var i = 0;i < data.result.list.length;i++){
                tr[i] = document.createElement('tr');
                var newtime = document.createElement('td');
                var newstatus = document.createElement('td');
                var newtype = document.createElement('td');
                var newnumber = document.createElement('td');
                var newdeliverystatus = document.createElement('td'); 
                newtime.innerHTML = data.result.list[i].time;
                newstatus.innerHTML = data.result.list[i].status;
                newtype.innerHTML = data.result.type;
                newnumber.innerHTML = data.result.number;
                if(data.result.deliverystatus == 1)
                    newdeliverystatus.innerHTML = "在途中";
                if(data.result.deliverystatus == 2)
                    newdeliverystatus.innerHTML = "派件中";
                if(data.result.deliverystatus == 3)
                    newdeliverystatus.innerHTML = "已签收";
                if(data.result.deliverystatus == 1)
                    newdeliverystatus.innerHTML = "派送失败（拒签等）";
                tr[i].appendChild(newtime);
                tr[i].appendChild(newstatus);
                tr[i].appendChild(newtype);
                tr[i].appendChild(newnumber);
                tr[i].appendChild(newdeliverystatus);
                table.appendChild(tr[i]);
            }
        },
        url : "http://api.jisuapi.com/express/query"
     });
}
function GettvData (value1,value2) {
    //alert(123);
    var table = document.getElementsByClassName('tvinformation')[0];
    var tr = [];
    $.ajax({
        type : 'GET',
        dataType : 'jsonp',
        data : {
            tvid : value1,
            date : value2,
            appkey : '9f7ee696768c85e6'
        },//GET 请求中将附加在 URL 后
        success : function (data){
            console.log(data);
            for(var i = 0;i < data.result.program.length;i++){
                tr[i] = document.createElement('tr');
                var newtvid = document.createElement('td');
                var newnametv = document.createElement('td');
                var newdate = document.createElement('td');
                var newname = document.createElement('td'); 
                var newstarttime = document.createElement('td');
                newtvid.innerHTML = data.result.tvid;
                newnametv.innerHTML = data.result.name;
                newdate.innerHTML = data.result.date;
                newname.innerHTML = data.result.program[i].name;
                newstarttime.innerHTML = data.result.program[i].starttime;
                tr[i].appendChild(newtvid);
                tr[i].appendChild(newnametv);
                tr[i].appendChild(newdate);
                tr[i].appendChild(newname);
                tr[i].appendChild(newstarttime);
                table.appendChild(tr[i]);
            }
        },
        url : "http://api.jisuapi.com/tv/query"
     });
}
function SendData () {
    var text = document.getElementById('input');
    var inputtvid = document.getElementById("inputtvid");
    var inputtvtime = document.getElementById('inputtvtime');
    console.log(inputtvid);
    console.log(inputtvtime);
    if(status == "idcard"){
        var idcard = document.getElementsByClassName('idinformation')[0];
        if(judge.id == 1){
           var list1 = idcard.getElementsByTagName('tr')[1];
           idcard.removeChild(list1);
        }
       else
           judge.id = 1;
        GetIdData(text.value);
    }
    if(status == "phone"){
        var phone = document.getElementsByClassName('phoneinformation')[0];
        if(judge.phone == 1){
           var list2 = phone.getElementsByTagName('tr')[1]; 
           console.log(list2);
           phone.removeChild(list2);
        }
       else 
           judge.phone = 1;
        GetPhoneData(text.value);
    }
    if(status == "fastmail"){
        var fastmail = document.getElementsByClassName('fastmailinformation')[0];
        if(judge.fastmail == 1){
           var list3 = fastmail.getElementsByTagName('tr');
           var sum = list3.length;
           for(var i = 1;i < sum;i++){
               fastmail.removeChild(list3[1]);
           }
        }
       else
           judge.fastmail = 1;
        GetfastmailData(text.value);
    }
    if(status == "tv"){
        var tv = document.getElementsByClassName('tvinformation')[0];
        if(judge.tv == 1){
           var list4 = tv.getElementsByTagName('tr'); 
           var sum = list4.length;
          // console.log(sum);
            for(var i = 1;i < sum;i++){ 
              tv.removeChild(list4[1]);
           }
        }
       else
           judge.tv = 1;
        GettvData(inputtvid.value,inputtvtime.value);
    }
}
function show (name) {
     var idcard = document.getElementById('idcard');
     var phone = document.getElementById('phone');
     var fastmail = document.getElementById('fastmail');
     var tv = document.getElementById('tv');
     var input = document.getElementById('input');
     var inputtvid = document.getElementById('inputtvid');
     var inputtvtime = document.getElementById('inputtvtime');
     if(idcard.id == name){
        idcard.style.display = "block";
        phone.style.display = "none";
        fastmail.style.display = "none";
        tv.style.display = "none";
        input.style.display = "block";
        inputtvid.style.display = "none";
        inputtvtime.style.display = "none";
        status = "idcard";
     }
     if(phone.id == name){
        idcard.style.display = "none";
        phone.style.display = "block";
        fastmail.style.display = "none";
        tv.style.display = "none";
        input.style.display = "block";
        inputtvid.style.display = "none";
        inputtvtime.style.display = "none";
        status = "phone";
    }  
    if(fastmail.id == name){
        idcard.style.display = "none";
        phone.style.display = "none";
        fastmail.style.display = "block";
        tv.style.display = "none";
        input.style.display = "block";
        inputtvid.style.display = "none";
        inputtvtime.style.display = "none";
        status = "fastmail";
    }
    if(tv.id == name){
        idcard.style.display = "none";
        phone.style.display = "none";
        fastmail.style.display = "none";
        tv.style.display = "block";
        input.style.display = "none";
        inputtvid.style.display = "block";
        inputtvtime.style.display = "block";
        status = "tv";
    }
}

	

	

	
