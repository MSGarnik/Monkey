const difficultlyButton = document.querySelectorAll('.difficultlyButton');
const playAgain = document.getElementById('playAgain');
const sounds = document.querySelectorAll('audio');
const start = document.getElementById('start');
const menu = document.getElementById('menu');
const night = document.getElementById('night');
const day = document.getElementById('day');
const mute = document.getElementById('mute');
const comb = document.getElementById('comb');
const keyImg = ['key13', 'key37', 'key38',
	'key39', 'key40', 'key32', 'key65',
	'key68', 'key90', 'key88', 'key83',
	'key27', 'key87'];
let mutedSound = false;
let loseCount = 0;
let winCount = 0;
let combination = 0;
let country;
let second;
let person;
let speed;
let time;
let deg;

//key combination
comb.onclick = function () {
	combination++;
	document.querySelector('.keyComb').style.display = combination % 2 == 1 ? 'block' : 'none';
}
//key combination styling
document.onkeydown = function (e) {
	keyImg.forEach((key) => {
		if (e.keyCode == key.slice(3)) {
			startGame();
			document.getElementById(key).style.transform = ' perspective(370px) scale3d(1, 1, 5) rotateX(17deg)';
		}
	})
}

//easy or hard
difficultlyButton.forEach(button => {
	button.addEventListener('click', function() {
	  const speedLevels = {
		'easy': 3,
		'medium': 2,
		'hard': 1
	  };
	  const selectedSpeed = speedLevels[this.id];
	  difficultlyButton.forEach(btn => {
		btn.style.boxShadow = '';
	  });
	  this.style.boxShadow = '0px 0px 20px 6px yellow';
	  speed = selectedSpeed;
	  document.getElementById('check').play();
	});
  });



//day or night
day.onclick = function () {
	day.style.boxShadow = ' 0px 0px 20px 6px yellow';
	night.style.boxShadow = ' 0px 0px 0px 0px yellow';
	document.getElementById('monkey').style.width = '120px';
	document.getElementById('monkey').style.height = '120px';
	person = './img/jump.webp';
	country = './img/day.jpg';
	deg = 0;
	document.getElementById('check').play();
}
night.onclick = function () {
	night.style.boxShadow = ' 0px 0px 20px 6px yellow';
	day.style.boxShadow = ' 0px 0px 0px 0px yellow';
	person = './img/fly.gif';
	country = './img/night.jpg';
	deg = 180;
	document.getElementById('check').play();
}

//start game everywhere
function startGame() {
	if (person == undefined || speed == undefined) {
		document.getElementById('h1').style.display = 'block';
	} else {
		document.getElementById('h1').style.display = 'none';
		document.querySelector('.page1').style.display = 'none';
		document.querySelector('.page2').style.display = 'block';
		clearInterval(time);
		goMonkey();

		if (person == './img/fly.gif') {
			document.getElementById('nightRing').play();
		} else {
			document.getElementById('dayRing').play();
		}
		second = speed * 15;
		document.getElementById('time').innerHTML = 'Sec:' + ' ' + second;
	}
}

start.onclick = function () {
	startGame();
}
function goMonkey() {
	document.getElementById('page2').style.backgroundImage = 'url(' + country + ')';
	document.getElementById('person').src = person;
	menu.onclick = () => location.reload();
	
	//play again
	playAgain.onclick = function () {
		goMonkey();
		if (person == './img/fly.gif') {
			document.getElementById('nightRing').play();
		} else {
			document.getElementById('dayRing').play();
		}
	}
	document.getElementById('winGame').style.display = 'none';
	document.getElementById('loseGame').style.display = 'none';
	document.getElementById('coin').innerHTML = 'Coins:' + ' ' + 0;
	playAgain.style.display = 'none';
	const bananas = document.querySelectorAll('.banana');
	bananas.forEach((banana) => {
		banana.style.top = Math.round(Math.random() * (innerHeight - 100)) + 'px';
		banana.style.left = Math.round(Math.random() * (innerWidth - 100)) + 'px';
		banana.style.transform = 'rotateY(' + (Math.round(Math.random() * 2) * 180) + 'deg)';
		banana.classList.remove('clearBananas');
	});
	//eating banana  by monkey move
	document.onkeydown = function (e) {
		let ofLeft = document.getElementById('monkey').offsetLeft;
		let ofTop = document.getElementById('monkey').offsetTop;
		let ofLeft1 = document.getElementById('banana').offsetLeft;
		let ofTop1 = document.getElementById('banana').offsetTop;
		let ofLeft2 = document.getElementById('banana1').offsetLeft;
		let ofTop2 = document.getElementById('banana1').offsetTop;
		let ofLeft3 = document.getElementById('banana2').offsetLeft;
		let ofTop3 = document.getElementById('banana2').offsetTop;
		let ofLeft4 = document.getElementById('banana3').offsetLeft;
		let ofTop4 = document.getElementById('banana3').offsetTop;
		let ofLeft5 = document.getElementById('banana4').offsetLeft;
		let ofTop5 = document.getElementById('banana4').offsetTop;
		let ofLeft6 = document.getElementById('banana5').offsetLeft;
		let ofTop6 = document.getElementById('banana5').offsetTop;
		if (e.keyCode == 38 || e.keyCode == 87) {
			ofTop = ofTop - 10;
			if (ofTop <= -100) {
				ofTop = innerHeight;
			}
			document.getElementById('monkey').style.top = ofTop + 'px';
		}
		if (e.keyCode == 40 || e.keyCode == 83) {
			ofTop = ofTop + 10;
			if (ofTop >= innerHeight) {
				ofTop = -100;
			}
			document.getElementById('monkey').style.top = ofTop + 'px'
		}
		if (e.keyCode == 37 || e.keyCode == 65) {
			ofLeft = ofLeft - 10;
			if (ofLeft <= -100) {
				ofLeft = innerWidth + 100;
			}
			document.getElementById('monkey').style.left = ofLeft + 'px';
			document.getElementById('monkey').style.transform = 'rotateY(' + (180 - deg) + 'deg)';
		}
		if (e.keyCode == 39 || e.keyCode == 68) {
			ofLeft = ofLeft + 10;
			if (ofLeft >= innerWidth) {
				ofLeft = -100;
			}
			document.getElementById('monkey').style.left = ofLeft + 'px';
			document.getElementById('monkey').style.transform = 'rotateY(' + deg + 'deg)';
		}

		if (e.keyCode == 90) {
			document.getElementById('monkey').classList.add('monkeyLeft');
		}
		if (e.keyCode == 88) {
			document.getElementById('monkey').classList.add('monkeyRight');
		}
		if (e.keyCode == 32) {
			if (ofTop <= -100) {
				ofTop = innerHeight;
			}
			document.getElementById('monkey').style.top = (ofTop - 80) + 'px';
		}
		if (e.keyCode == 27) {
			location.reload();
		}
		//player coins
		if (ofLeft + 100 > ofLeft1 && ofLeft < ofLeft1 + 20 && ofTop + 150 > ofTop1 && ofTop < ofTop1 + 50) {
			document.getElementById('banana').classList.add('clearBananas');
			document.getElementById('ring').play();
		}
		if (ofLeft + 100 > ofLeft2 && ofLeft < ofLeft2 + 20 && ofTop + 150 > ofTop2 && ofTop < ofTop2 + 50) {
			document.getElementById('banana1').classList.add('clearBananas');
			document.getElementById('ring').play();
		}
		if (ofLeft + 100 > ofLeft3 && ofLeft < ofLeft3 + 20 && ofTop + 150 > ofTop3 && ofTop < ofTop3 + 50) {
			document.getElementById('banana2').classList.add('clearBananas');
			document.getElementById('ring').play();
		}
		if (ofLeft + 100 > ofLeft4 && ofLeft < ofLeft4 + 20 && ofTop + 150 > ofTop4 && ofTop < ofTop4 + 50) {
			document.getElementById('banana3').classList.add('clearBananas');
			document.getElementById('ring').play();
		}
		if (ofLeft + 100 > ofLeft5 && ofLeft < ofLeft5 + 20 && ofTop + 150 > ofTop5 && ofTop < ofTop5 + 50) {
			document.getElementById('banana4').classList.add('clearBananas');
			document.getElementById('ring').play();
		}
		if (ofLeft + 100 > ofLeft6 && ofLeft < ofLeft6 + 20 && ofTop + 150 > ofTop6 && ofTop < ofTop6 + 50) {
			document.getElementById('banana5').classList.add('clearBananas');
			document.getElementById('ring').play();
		}
		let coin = document.getElementsByClassName('clearBananas').length * 5;
		document.getElementById('coin').innerHTML = 'Coins:' + ' ' +coin;
		//winner
		if (coin == 30 || second == 0) {
			document.getElementById('winGame').style.display = 'block';
			document.getElementById('winRing').play();
			document.getElementById('monkey').style.left = '22%';
			document.getElementById('monkey').style.top = '300px';
			playAgain.style.display = 'block';
			document.onkeydown = function (e) {
				if (e.keyCode === 13) {
					goMonkey();
				}
				if (e.keyCode == 27) {
					location.reload();
				}
			};
			clearInterval(time);
			winCount++;
			document.getElementById('wins').innerHTML = 'Win:' + ' ' + winCount;
		}
	}
	//game timer
	second = speed * 15;
	time = setInterval(() => {
		second--;
		document.getElementById('time').innerHTML = 'Sec:' + ' ' + second ;
		if (second == 0) {
			loseCount++;
			document.onkeydown = function (e) {
				if (e.keyCode === 13) {
					goMonkey();
				}
				if (e.keyCode == 27) {
					location.reload();
				}
			};
			document.getElementById('loseRing').play();
			document.getElementById('loseGame').style.display = 'block';
			document.getElementById('loses').innerHTML = 'Lose:' + ' ' + loseCount;
			document.getElementById('monkey').style.left = '22%';
			document.getElementById('monkey').style.top = '300px';
			playAgain.style.display = 'block';
			clearInterval(time);
		}
	}, 1000)
};
//key combination reStyling
document.onkeyup = function () {
	document.getElementById('monkey').classList.remove('monkeyLeft');
	document.getElementById('monkey').classList.remove('monkeyRight');
	for (let i = 0; i < keyImg.length; i++) {
		document.getElementById(keyImg[i]).style.transform = 'scale(1)';
	}
}
//soundsMut
mute.onclick = function mut() {
	const soundMuted = sounds[0].muted;
	sounds.forEach(sound => sound.muted = !soundMuted);
	document.getElementById('muteVol').src = soundMuted ? './img/vol.png' : './img/mute.png';
};
//soundsVolume
document.getElementById('audioVol').oninput = function () {
	sounds.forEach((sound) => {
		sound.volume = document.getElementById('audioVol').value;
		document.querySelector('.volumeCount').innerHTML = Math.floor(document.getElementById('audioVol').value * 100);
	})
}