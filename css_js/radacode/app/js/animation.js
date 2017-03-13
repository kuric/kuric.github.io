document.addEventListener('DOMContentLoaded', init);
let footprintCoordsBottom = ['1%', '22%','5%','-22%','-72%','-120%'];
let footprintCoordsRight = ['-10%', '-33%','-54%','-72%','-77%','-77%'];
let footprintRotateDeg= ['-95', '-85','-70','-45','-20','0'];
function init() {
	if(screen.width >= 1024) {
	let footprint = document.getElementById('footprint');
	footprint.style.display = 'block';
	footprint.style.position = 'absolute';
	footprint.style.bottom = footprintCoordsBottom[0];
	footprint.style.right = footprintCoordsRight[0];
	footprint.style.transform = 'rotate(' + footprintRotateDeg[0] + 'deg)';

	
	sleep(1000, function()
	{
		setFootprint(footprint, 1);
		sleep(1000, function() {
			setFootprint(footprint, 2);
			sleep(1000, function() {
				setFootprint(footprint, 3);
				sleep(1000, function() {
					setFootprint(footprint, 4);
					sleep(1000, function() {
						setFootprint(footprint, 5);
					});
				});
			});
		});
	});
}
}	
function setFootprint(footprint, i) {
	if(screen.width >= 1024) {
		let clone = footprint.cloneNode(true);
		clone.style.bottom = footprintCoordsBottom[i];
		clone.style.right = footprintCoordsRight[i];
		clone.style.transform = 'rotate(' + footprintRotateDeg[i] + 'deg)';
		document.getElementsByClassName('main-logo')[0].appendChild(clone);
	} else {
		let clone = footprint.cloneNode(true);
		clone.style.display = 'none';
	}
}

function sleep(ms, f) {
	return setTimeout(f, ms);
}
function footprintResize() {
	if(screen.width < 1024) {
	let footprints = document.getElementsByClassName('footprint');
	for (let i = 0; i < footprints.length; i+=1) {
		footprints[i].style.display = 'none';
		}
	} else {
		let footprints = document.getElementsByClassName('footprint');
	for (let i = 0; i < footprints.length; i+=1) {
		footprints[i].style.display = 'none';
		}
		init();
	}

}
window.onresize = footprintResize;
