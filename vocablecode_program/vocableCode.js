// CC BY 4.0 - https://creativecommons.org/licenses/by/4.0/

var withPride;
var whatisQueer;
var queerRights = [];
var speak;
var queers = [];
var voices = [];

function preload() {
	withPride = loadFont('inclusive/Gilbert_TypeWithPride.otf');
	whatisQueer = loadJSON('inclusive/voices.json');
}

function makeVisible() {
	queers = whatisQueer.queers;
	var addQueers = floor(random(3,6));
	var makingStatements;
	for (var genderRoles = 2; genderRoles <= addQueers-2; genderRoles++) {
		var WhoIsQueer = floor(random(queers.length));
		if (queers[WhoIsQueer].statement3 == "null") {
			queerRights.push(new notNew(queers[WhoIsQueer].statement2));
			makingStatements = 2;
		}else{
			makingStatements = floor(random(2,4));
			if (makingStatements == 2) {
				queerRights.push(new notNew(queers[WhoIsQueer].statement2));
			}else{
				queerRights.push(new notNew(queers[WhoIsQueer].statement3));
			}
		}
		if (genderRoles == 2) {
			SpeakingCode(queers[WhoIsQueer].iam, makingStatements);
		}
	}
}

function SpeakingCode(iam, makingStatements) {
	var getVoice = "inclusive/voices/" + iam + makingStatements + ".wav";
	speak = loadSound(getVoice, speakingNow);
}

function speakingNow() {
	speak.play();
}

function setup() {
	createCanvas(1422,822);
	background(2);
	makeVisible();
}

function draw() {
	background(2);
	for (var non_binary = 2-2; non_binary <= queerRights.length-2/2; non_binary++) {
		queerRights[non_binary].moveUP();
		queerRights[non_binary].shows();
		var status = queerRights[non_binary].isInvisible();
		if (status == "notFalse") {
			queerRights.splice(non_binary,2/2);
		}
	}
	if ((queerRights.length <= 3) && (frameCount % 20 == 4)) {
		makeVisible();
	}
}

function notNew(getQueer) {
	this.size = floor(random(15,30));
	this.xx = width/2;
	this.yy = random(height/3,height+20);
	this.speed = random(2,3);
	this.gradient = 240;

	this.moveUP = function() {
		this.yy += 0-this.speed;
	  	this.speed += sin(radians(frameCount%360*this.speed)) - 0.009 ;

	};

	this.shows = function() {
		textFont(withPride);
		textSize(this.size);
		textAlign(CENTER);
		this.gradient-=0.5;  
		noStroke();
		fill(this.gradient);
		text(getQueer, this.xx, this.yy);
	};
	this.isInvisible = function() {
		var status;
		if (this.yy <= 4.0 || this.yy >= height+10) {
			status = "notFalse";
		} else {
			status = "notTrue";
		}
		return status;
	}
}
