var linebot = require('linebot');
var express = require('express');
var {google} = require('googleapis');
var bot = linebot({
  channelId: '1656499278',
  channelSecret: 'ba7a1f94efcb499010ed160c15c3768a',
  channelAccessToken: 'db87y4+qoT7kBrYGroyjEQSa+WWDI76K8/EOH+JwE9iHFbnr7r6tis+cgnAgGPTAWIvJOQYev3gSuLZYphTtH4HD03L1yj2zVUk2XKrocjGfFhpq04kFGy9zJJbm0fGikR35SvCwwvzef0iysxFvpAdB04t89/1O/w1cDnyilFU='
});

//底下輸入client_secret.json檔案的內容
var myClientSecret={"installed":{"client_id":"411896110031-gigv9d4rmmd98vkeau9u8vql0jg0p81m.apps.googleusercontent.com","project_id":"graceful-path-328110","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"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","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}}

const oauth2Client = new google.auth.OAuth2(
  "411896110031-gigv9d4rmmd98vkeau9u8vql0jg0p81m.apps.googleusercontent.com",
  "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",
  myClientSecret.installed.redirect_uris[0]
);
//底下輸入sheetsapi.json檔案的內容
oauth2Client.credentials ={"access_token":"ya29.a0ARrdaM9l_vSwusmUWH9JCO7RLRWSqfy_--r0ZZdrN364aasQ9R5oxonYSKeWqRnPABHyggZ5KVXYDIIJfV_vkWAI-SPisWnOhwDjdh0l1kuhgt58r0nHQ9sij3ixqRsGlFZX4agqjxPmavQK41OTjqYKZ4CJ","refresh_token":"1//0efJ2xLI3OhW0CgYIARAAGA4SNwF-L9IrwVBAZQ7eZ8_wtOJ6fc-Y-__Ho6i1eEUXKhFBrbARzkNtEIW2glpatU_wzWNbehTdEG0","scope":"https://www.googleapis.com/auth/spreadsheets","token_type":"Bearer","expiry_date":1633433347068}


//試算表的ID，引號不能刪掉
var mySheetId='1W-JBHAhDQWmtrtrc6ykm9N82nl-gqWnIc6zINHMk49E';

var myQuestions=[];
var myQuestionsD=[];
var myQuestionsM=[];
var myQuestionsTotal=[];
var myQuestionsType=[];
var users=[];
var totalSteps=0;
var myReplies=[];
var check=0;

//程式啟動後會去讀取試算表內的問題
getQuestions();
getQuestionsDays();
getQuestionsMonths();
getQuestionsTotal();
getQuestionsType();

function Async(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
			getQuestionsDays();
			getQuestionsMonths();
			getQuestionsTotal();
			getQuestionsType();
            resolve();
        ;} , 100
        );
    });

}




//這是讀取問題的函式
function getQuestions() {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
  auth: oauth2Client,
  spreadsheetId: mySheetId,
  range: encodeURI('question!A1:D2'),
}, function (err, response) {
if (err) {
console.log('讀取問題檔的API產生問題：' + err);
return;
}
var rows = response.data.values;
console.log(response.data);
if (rows.length == 0) {
console.log('No data found.');
} else {
myQuestions = rows;
totalSteps = myQuestions[0].length;
console.log('問題更新完畢！');
}
});
}

function getQuestionsDays() {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
  auth: oauth2Client,
  spreadsheetId: mySheetId,
  range: encodeURI('question!E1:E2'),
}, function (err, response) {
if (err) {
console.log('讀取問題檔的API產生問題：' + err);
return;
}
var rows = response.data.values;
console.log(response.data);
if (rows.length == 0) {
console.log('No data found.');
} else {
myQuestionsD = rows;
console.log('問題更新完畢！');
}
});
}

function getQuestionsMonths() {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
  auth: oauth2Client,
  spreadsheetId: mySheetId,
  range: encodeURI('question!F1:F2'),
}, function (err, response) {
if (err) {
console.log('讀取問題檔的API產生問題：' + err);
return;
}
var rows = response.data.values;
console.log(response.data);
if (rows.length == 0) {
console.log('No data found.');
} else {
myQuestionsM = rows;
console.log('問題更新完畢！');
}
});
}

function getQuestionsTotal() {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
  auth: oauth2Client,
  spreadsheetId: mySheetId,
  range: encodeURI('question!G1'),
}, function (err, response) {
if (err) {
console.log('讀取問題檔的API產生問題：' + err);
return;
}
var rows = response.data.values;
console.log(response.data);
if (rows.length == 0) {
console.log('No data found.');
} else {
myQuestionsTotal = rows;
console.log('問題更新完畢！');
}
});
}

function getQuestionsType() {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
  auth: oauth2Client,
  spreadsheetId: mySheetId,
  range: encodeURI('question!H1:H2'),
}, function (err, response) {
if (err) {
console.log('讀取問題檔的API產生問題：' + err);
return;
}
var rows = response.data.values;
console.log(response.data);
if (rows.length == 0) {
console.log('No data found.');
} else {
myQuestionsType = rows;
console.log('問題更新完畢！');
}
});
}

//這是將取得的資料儲存進試算表的函式
function appendMyRow(userId) {
   var request = {
      auth: oauth2Client,
      spreadsheetId: mySheetId,
      range:encodeURI('answers'),
      insertDataOption: 'INSERT_ROWS',
      valueInputOption: 'RAW',
      resource: {
        "values": [
          users[userId].replies
        ]
      }
   };
   var sheets = google.sheets('v4');
   sheets.spreadsheets.values.append(request, function(err, response) {
      if (err) {
         console.log('The API returned an error: ' + err);
         return;
      }
   });
}

//LineBot收到user的文字訊息時的處理函式
bot.on('message', function(event) {
	if (event.message.text == "輸入"||check==1) {
	   check=1;
	   if (event.message.type === 'text') {
		  var myId=event.source.userId;
		  if (users[myId]==undefined){
			 users[myId]=[];
			 users[myId].userId=myId;
			 users[myId].step=-1;
			 users[myId].replies=[];
		  }
		  var myStep=users[myId].step;
		  if (myStep===-1)
			 sendMessage(event,myQuestions[0][0]);
		  else{
			 if (myStep==(totalSteps-1))
				sendMessage(event,myQuestions[1][myStep]);
			 else
				sendMessage(event,myQuestions[1][myStep]+'\n'+myQuestions[0][myStep+1]);
			 users[myId].replies[myStep+1]=event.message.text;
		  }
		  myStep++;
		  users[myId].step=myStep;
		  if (myStep>=totalSteps){
			 myStep=-1;
			 users[myId].step=myStep;
			 users[myId].replies[0]=new Date();
			 appendMyRow(myId);
			 check=0;
		  }
	   }
	}
	
	if (event.message.text == "日報"||check==2) {
		check=2;
	    if (event.message.type === 'text') {
		   var myId=event.source.userId;
		   if (users[myId]==undefined){
			 users[myId]=[];
			 users[myId].userId=myId;
			 users[myId].step=-1;
			 users[myId].replies=[];
			}
			var myStep=users[myId].step;
			if (myStep===-1)
			 sendMessage(event,myQuestionsD[0][0]);
			myStep++;
			users[myId].step=myStep;
			if (myStep==1){
				myStep=-1;
				check=0;
				users[myId].step=myStep;
				users[myId].replies[0]=new Date();
				insertinD(event.message.text);
				Async();
				return new Promise((resolve,reject)=>{
					setTimeout(()=>{
					sendMessage(event,myQuestionsD[1][0]);
					resolve();
					;} , 500);
				});
			}
		}
	}
	
	if (event.message.text == "月報"||check==3) {
		check=3;
		if (event.message.type === 'text') {
		   var myId=event.source.userId;
		   if (users[myId]==undefined){
			 users[myId]=[];
			 users[myId].userId=myId;
			 users[myId].step=-1;
			 users[myId].replies=[];
			}
			var myStep=users[myId].step;
			if (myStep===-1)
			sendMessage(event,myQuestionsM[0][0]);
			myStep++;
			users[myId].step=myStep;
			if (myStep==1){
				myStep=-1;
				check=0;
				users[myId].step=myStep;
				users[myId].replies[0]=new Date();
				insertinM(event.message.text);
				Async();
				return new Promise((resolve,reject)=>{
					setTimeout(()=>{
					sendMessage(event,myQuestionsM[1][0]);
					resolve();
					;} , 500);
				});
			}
		}
	}
	
	if (event.message.text == "總報") {
	Async();
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{
		sendMessage(event,myQuestionsTotal[0][0]);
		resolve();
		;} , 500);
	});
	}

	if (event.message.text == "種類"||check==4) {
		check=4;
		if (event.message.type === 'text') {
		   var myId=event.source.userId;
		   if (users[myId]==undefined){
			 users[myId]=[];
			 users[myId].userId=myId;
			 users[myId].step=-1;
			 users[myId].replies=[];
			}
			var myStep=users[myId].step;
			if (myStep===-1)
			sendMessage(event,myQuestionsType[0][0]);
			myStep++;
			users[myId].step=myStep;
			if (myStep==1){
				myStep=-1;
				check=0;
				users[myId].step=myStep;
				users[myId].replies[0]=new Date();
				insertinT(event.message.text);
				Async();
				return new Promise((resolve,reject)=>{
					setTimeout(()=>{
					sendMessage(event,myQuestionsType[1][0]);
					resolve();
					;} , 500);
				});
			}
		}
	}
});


//這是發送訊息給user的函式
function sendMessage(eve,msg){
   eve.reply(msg).then(function(data) {
      // success 
      return true;
   }).catch(function(error) {
      // error 
      return false;
   });
}

function insertinD(chatrecords) {
	var sheets = google.sheets('v4');
	var request = {
	spreadsheetId: mySheetId,
	range: 'present!D2',
	valueInputOption: 'RAW',
	insertDataOption: 'OVERWRITE',
	auth: oauth2Client,
	resource: {
		"values": [[chatrecords]]
	},
	};
	sheets.spreadsheets.values.append(request, function (err, response) {
	if (err) {
	console.log(err);
	console.log('here error');
	}
});
}

function insertinM(chatrecords) {
	var sheets = google.sheets('v4');
	var request = {
	spreadsheetId: mySheetId,
	range: 'present!K2',
	valueInputOption: 'RAW',
	insertDataOption: 'OVERWRITE',
	auth: oauth2Client,
	resource: {
		"values": [[chatrecords]]
	},
	};
	sheets.spreadsheets.values.append(request, function (err, response) {
	if (err) {
	console.log(err);
	console.log('here error');
	}
});
}

function insertinT(chatrecords) {
	var sheets = google.sheets('v4');
	var request = {
	spreadsheetId: mySheetId,
	range: 'present!T2',
	valueInputOption: 'RAW',
	insertDataOption: 'OVERWRITE',
	auth: oauth2Client,
	resource: {
		"values": [[chatrecords]]
	},
	};
	sheets.spreadsheets.values.append(request, function (err, response) {
	if (err) {
	console.log(err);
	console.log('here error');
	}
});
}

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});