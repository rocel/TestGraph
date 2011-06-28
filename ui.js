var DATA = {"0":{"x":0,"y":0,"links":["1"]},"1":{"x":0,"y":0,"links":["0"]}};
var listPeopleItems = new Array();;

function draw(width,height) {
	var paper = Raphael(0, 0, width, height);
	var rayon = height/2*0.8;
	init(rayon,width,height);
	drawLinks(paper);
	drawPeople(paper);
	//drawArrow(paper,50,50);
	
}

//Initialise the DATA setting the coordinates of the people
function init(rayon,width,height){
	var nbPeople = length(DATA);
	for(i= 0;i<nbPeople;i++){
		DATA[i]['x'] = Math.cos(i*2*Math.PI/nbPeople)*rayon+width/2;
		DATA[i]['y'] = Math.sin(i*2*Math.PI/nbPeople)*rayon+height/2;
	}
}

//Draw the people
function drawPeople(paper){
	var nbPeople = length(DATA);
	for(i= 0;i<nbPeople;i++){
		var cir = paper.circle(DATA[i]['x'],DATA[i]['y'], 20);
		cir.attr("stroke", "#000");
		cir.attr("fill", "#223fa3");
		cir.attr("stroke-width",3);
		cir.attr("cursor","pointer");
		cir.attr("title",i);
		listPeopleItems[i] = cir;
		cir.click(function (event) {
			toggleColor(this);
			displayInfos(this);
		});
		//cir.drag(move, start, up);
		var t = paper.text(DATA[i]['x'], DATA[i]['y'], i);
		t.attr("font-size",20);
		t.attr("font-weight","bold");
		t.attr("fill","white");
		t.attr("cursor","pointer");
		t.attr("title",i);
		t.click(function (event) {
			toggleColor(this.prev);
			displayInfos(this);
		});
		console.log(t);
	}
}

function toggleColor(obj){
	for(i=0;i<listPeopleItems.length;i++){
		if (obj.id == listPeopleItems[i].id){
			listPeopleItems[i].attr({fill: "red"});
		}else{
			listPeopleItems[i].attr({fill: "#223fa3"});
		}
	}
}

function displayInfos(obj){
	console.log('###############################################');
	console.log(parseInt(obj.attr("x")) + ' - ' + parseInt(obj.attr("y")));
	console.log('###############################################');
	$("#infosNameContent").html(obj.attr("title"));
	linksData = "<ul>";
	for(i = 0 ; i < length(DATA) ; i++){
		for(j = 0 ; j < length(DATA[i]["links"]) ; j++){
			var friendId = DATA[i]["links"][j];
			if(i == obj.attr("title") || (DATA[i]["links"][j] == obj.attr("title"))){
				linksData += "<li>"+i + " &#8594; " + DATA[i]["links"][j] + "</li>";
			}
		}
	}
	linksData += "<ul>";
	$("#infosLinksContent").html(linksData);
	$("#infosName").slideDown(500);
	$("#infosLinks").slideDown(500);
}

//Draw the links
//TODO ------------> UTILISER FORMATION QUADRATIQUE DE BEZIER 
//http://fr.answers.yahoo.com/question/index?qid=20090209045545AATTBpG
function drawLinks(paper){
	for(i= 0;i<length(DATA);i++){
		for(j= 0;j<length(DATA[i]["links"]);j++){
			var friendId = DATA[i]["links"][j];
			var path = 	"M"	+ DATA[i].x + "," + DATA[i].y 
			
			if ( parseInt(i) > parseInt(friendId) ) {
				console.log('********************************');
				console.log('x ->' + (DATA[friendId].x - DATA[i].x)/2);
				console.log('y ->' + (DATA[friendId].y - DATA[i].y)/2);
				console.log('********************************');
				var x = (parseInt(DATA[i].x) + parseInt(DATA[friendId].x))/2;
				var y = (parseInt(DATA[i].y) + parseInt(DATA[friendId].y))/2;
				path 	+= " Q" + x
						+ "," +	y ;
				var cir = paper.circle(x,y, 5);
				cir.attr("fill", "#F11");
			}else{
				console.log('********************************');
				console.log('x ->' + (DATA[friendId].x - DATA[i].x)/2);
				console.log('y ->' + (DATA[friendId].y - DATA[i].y)/2);
				console.log('********************************');
				var x = (parseInt(DATA[i].x) + parseInt(DATA[friendId].x))/2;
				var y = (parseInt(DATA[i].y) + parseInt(DATA[friendId].y))/2;
				path 	+= " Q" + x
						+ "," +	y ;
				var cir = paper.circle(x,y, 5);
				cir.attr("fill", "#1F1");
			}
			
			path +=	" "	+ DATA[friendId].x +","+ DATA[friendId].y;
			console.log(path);
			var bez = paper.path(path);
			bez.attr('stroke-width',3);
			
			var le = bez.getTotalLength();
			console.log("length -->" + le);
			
			var cir = paper.circle(x,y, 5);
			cir.attr("fill", "#1F1");
		}
	}	
}

function drawArrow(paper,x,y){
	var c = paper.path("M"+ (x-5) +","+ (y-5) + "L"+ (x+5) +","+ y);
	c.attr("stroke-width",3);
	var c2 = paper.path("M"+ (x-5) +","+ (y+5) + "L"+ (x+5) +","+ y);
	c2.attr("stroke-width",3);
	
	
}

//Draw the links
function drawLinks2(paper){
	for(i= 0;i<length(DATA);i++){
		for(j= 0;j<length(DATA[i]["links"]);j++){
			var friendId = DATA[i]["links"][j];
			var path = 	"M"	+ DATA[i].x + "," + DATA[i].y ;
			
			if ( parseInt(i) > parseInt(friendId) ) {
				path +=	" Q" + (parseInt(DATA[i].x) + parseInt(DATA[friendId].x))/2+ "," + ((parseInt(DATA[i].y) + parseInt(DATA[friendId].y))/2 - 100); 
			}else{
				path +=	" Q" +  (parseInt(DATA[i].x) + parseInt(DATA[friendId].x))/2+ "," + ((parseInt(DATA[i].y) + parseInt(DATA[friendId].y))/2 + 100);
			}
				path +=	" "	+ DATA[friendId].x +","+ DATA[friendId].y;
			var bez = paper.path(path);
			bez.attr('stroke-width',3);
		}
	}	
}

//Gives the number of attributes
function length(obj) { 
	var count = "__count__", 
	hasOwnProp = Object.prototype.hasOwnProperty; 
	if (typeof obj[count] === "number" && !hasOwnProp.call(obj, count)) { 
		return obj[count]; 
	} 
	count = 0; 
	for (var prop in obj) { 
		if (hasOwnProp.call(obj, prop)) { 
			count++; 
		} 
	} 
	return count; 
}; 


//Drag n' Drop
var start = function () {
    // storing original coordinates
    this.ox = this.attr("cx");
    this.oy = this.attr("cy");
    this.attr({opacity: .5});
},
move = function (dx, dy) {
    // move will be called with dx and dy
    this.attr({cx: this.ox + dx, cy: this.oy + dy});
},
up = function () {
    // restoring state
    this.attr({opacity: 1});
};
