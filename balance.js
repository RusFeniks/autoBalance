$(document).ready(function() {

	$('.stat').each(function(index, el) {
		if(localStorage.getItem($(this).attr('id')) != "") {
			$(this).val(localStorage.getItem($(this).attr('id')));
		}
		if(error_checker()) {
			create_stats();
		}
	});

	$('#math').click(function(event) {
		create_stats();
		itr_create();
	});

	$('.itr-creator').on('change', function(event) {
		itr_create();
	});

	$('.stat').on('input', function(event) {
		$(this).val($(this).val().replace(/,/g, '.'));
		if ($.isNumeric($(this).val()) & $(this).val() >= 0 & $(this).val() <= 5 || $(this).val() == "") {
			$(this).css('border', '1px solid #aaa');
			$(this).css('outline-color', '#76C7E1');
			localStorage.setItem($(this).attr('id'), $(this).val());
		} else {
			$(this).css('border', '1px solid red');
			$(this).css('outline-color', 'red');
		}
		
		error_checker();
	});
	itr_create();
});


function create_stats(argument) {

	var summ = 0;
	$('.stat').each(function(index, el) {
		summ += Number($(this).val());
	});

	var Nin = Number($('#Nin').val());
	var Tai = Number($('#Tai').val());
	var Gen = Number($('#Gen').val());
	var Int = Number($('#Int').val());
	var Str = Number($('#Str').val());
	var Spd = Number($('#Spd').val());
	var Chk = Number($('#Chk').val());
	var Rpc = Number($('#Rpc').val());


	var Stats_List = [];
	var temp_t = "";

	temp_t = "walking_frame_rate " + 5;
	Stats_List.push(temp_t);

	temp_t = "walking_speed " + 2 * (1 + Spd * 0.1);
	Stats_List.push(temp_t);

	temp_t = "walking_speedz " + (((5 - Spd) * 0.25) + ((Spd * 0.5).toFixed(2)) * 0.85).toFixed(2);
	Stats_List.push(temp_t);

	temp_t = "running_frame_rate " + 4;
	Stats_List.push(temp_t);

	temp_t = "running_speed " + (12 + (Spd * 1.2));
	Stats_List.push(temp_t);

	temp_t = "running_speedz " + ((8 + (Spd * 2)) / 5);
	Stats_List.push(temp_t);

	temp_t = "jump_height -" + (14 * (1+(Str*0.055))).toPrecision(3);
	Stats_List.push(temp_t);

	temp_t = "jump_distance " + (4 + (Spd + Str));
	Stats_List.push(temp_t);

	temp_t = "jump_distancez " + ((6 + (Spd * 2)) / 5);
	Stats_List.push(temp_t);

	temp_t = "dash_height -" + (10 * (1+((Str)*0.045))).toPrecision(3);
	Stats_List.push(temp_t);

	temp_t = "dash_distance " + (8 + (Str + Spd * 2));
	Stats_List.push(temp_t);

	temp_t = "dash_distancez " + (((Spd + Str)) * 0.5).toPrecision(3);
	Stats_List.push(temp_t);

	temp_t = "";
	Stats_List.push(temp_t);

	temp_t = "Шуншин вперёд: " + (8 * (Spd + Str));
	Stats_List.push(temp_t);

	temp_t = "Шуншин назад: " + ((8 * (Spd + Str))-11);
	Stats_List.push(temp_t);

	temp_t = "Высота прыжка: -" + ((15 + ((12 * (1+((Str + Spd)*0.1))).toPrecision(1))*2));
	Stats_List.push(temp_t);


	temp_t = "Высота доп. деша: -" + ((10 * (1+((Str)*0.1))).toPrecision(3) * 0.5);
	Stats_List.push(temp_t);


	temp_t = "";
	Stats_List.push(temp_t);



	var i = 0;
	$('#head_params').html("");
	var interval1 = setInterval (function () {
			if(!(i < Stats_List.length)) {
				clearInterval(interval1);
				$('#math').attr('disabled', false);
			} else {
			$('#math').attr('disabled', true);
				$('#head_params').append('<div class="row">' + Stats_List[i] + '</div>');
				i++;
			}
		}, 75);

	$('#Summ').val("0");
	var interval2 = setInterval (function () {
			
			if(!(Number($('#Summ').val()) < summ)) {
				clearInterval(interval2);
				$('#Summ').css('animation', 'none;');
				$('#Summ').val(summ);
			} else {
				$('#Summ').val(Number($('#Summ').val()) + 1);
			}
		}, 45);


}

function error_checker() {
	var errors = 0;
	$('.stat').each(function(index, el) {
		if (!($.isNumeric($(this).val()) & $(this).val() >= 0 & $(this).val() <= 5)) {
			errors++;
		}
	});
	console.log('Err:' + errors);
	if(errors == 0) {
		$('#math').attr('disabled', false);
		return true;
	} else {
		$('#math').attr('disabled', true);
		return false;
	}
}

function itr_create() {

	var Nin = Number($('#Nin').val());
	var Tai = Number($('#Tai').val());
	var Gen = Number($('#Gen').val());
	var Int = Number($('#Int').val());
	var Str = Number($('#Str').val());
	var Spd = Number($('#Spd').val());
	var Chk = Number($('#Chk').val());
	var Rpc = Number($('#Rpc').val());


	var bdefend = 0;
	var injury = 0;
	var fall = 0;
	var mp = 0;


	if($('#purpose-attack').prop('checked') == true) {
		$('#rank').show(0);
		$('#kind').show(0);
		$('#mod').hide(0);
		$('#damage-chakra').show(0);
		$('#elem').show(0);
		$('#oth').show(0);

		injury = 10;
		bdefend = 1;
		fall = 10;
		mp = 0;

		if($('#rank-m').prop('checked') == true){
			$('#kind').hide(0);
			$('#damage-chakra').hide(0);
			$('#mod').show(0);

			injury += Str * (1+(Tai)*0.4);
			bdefend += Str + Tai;

			if($('#mod-j').prop('checked') == true) {
				injury += Str;
				bdefend += Str*2;
				fall += Str*2;
			}
			if($('#mod-r').prop('checked') == true) {
				injury += Str+Spd;
				bdefend += Str*2;
				fall += Str*2;
			}
			if($('#mod-s').prop('checked') == true) {
				injury += Str+Spd*2;
				bdefend += (Str+Spd)*2;
				fall += (Str+Spd)*2;
			}
			if($('#mod-p').prop('checked') == true) {
				bdefend += (Str + Tai)*4;
				fall += Str*4;
				injury += Str*2;
			}
			if($('#mod-w').prop('checked') == true) {
				injury += 3 * (1+(Tai + Str)*0.1);
				bdefend += 5 * (1+(Tai + Str)*0.1);
				fall += 3 * (1+(Tai + Str)*0.1);
			}

		} else if ($('#rank-d').prop('checked') == true){
			$('#kind').show(0);
			$('#damage-chakra').show(0);

			injury += 20 + Number($('#damagechakra-polsunok').val());
			mp += 40 + Number($('#damagechakra-polsunok').val());
			bdefend += 10;
			if($('#kind-tai').prop('checked') == true) {
				$('#mod').show(0);

				injury *= (1 + (Tai * 0.05));

				if($('#mod-j').prop('checked') == true) {
					injury += Str;
					bdefend += Str*2;
					fall += Str*2;
				}
				if($('#mod-r').prop('checked') == true) {
					injury += Str+Spd;
					bdefend += Str*2;
					fall += Str*2;
				}
				if($('#mod-s').prop('checked') == true) {
					injury += Str+Spd*2;
					bdefend += (Str+Spd)*2;
					fall += (Str+Spd)*2;
				}
				if($('#mod-p').prop('checked') == true) {
					bdefend += (Str + Tai)*4;
					fall += Str*4;
					injury += Str*2;
				}
				if($('#mod-w').prop('checked') == true) {
					injury += 3 * (1+(Tai + Str)*0.1);
					bdefend += 5 * (1+(Tai + Str)*0.1);
					fall += 3 * (1+(Tai + Str)*0.1);
				}

			} else { $('#mod').hide(0); }
			if($('#kind-nin').prop('checked') == true) {
				injury *= (1 + (Nin * 0.05));
			}
			if($('#kind-gen').prop('checked') == true) {
				injury *= (1 + (Gen * 0.2));
bdefend += 65;
			}

		} else if ($('#rank-c').prop('checked') == true){
			$('#kind').show(0);
			$('#damage-chakra').show(0);

			injury += 40 + Number($('#damagechakra-polsunok').val());
			mp += 80 + Number($('#damagechakra-polsunok').val());
			bdefend += 15;
			if($('#kind-tai').prop('checked') == true) {
				$('#mod').show(0);

				injury *= (1 + (Tai * 0.05));

				if($('#mod-j').prop('checked') == true) {
					injury += Str;
					bdefend += Str*2;
					fall += Str*2;
				}
				if($('#mod-r').prop('checked') == true) {
					injury += Str+Spd;
					bdefend += Str*2;
					fall += Str*2;
				}
				if($('#mod-s').prop('checked') == true) {
					injury += Str+Spd*2;
					bdefend += (Str+Spd)*2;
					fall += (Str+Spd)*2;
				}
				if($('#mod-p').prop('checked') == true) {
					bdefend += (Str + Tai)*4;
					fall += Str*4;
					injury += Str*2;
				}
				if($('#mod-w').prop('checked') == true) {
					injury += 3 * (1+(Tai + Str)*0.1);
					bdefend += 5 * (1+(Tai + Str)*0.1);
					fall += 3 * (1+(Tai + Str)*0.1);
				}

			} else { $('#mod').hide(0); }
			if($('#kind-nin').prop('checked') == true) {
				injury *= (1 + (Nin * 0.05));
			}
			if($('#kind-gen').prop('checked') == true) {
				injury *= (1 + (Gen * 0.2));
bdefend += 65;
			}

		} else if ($('#rank-b').prop('checked') == true){
			$('#kind').show(0);
			$('#damage-chakra').show(0);

			injury += 90 + Number($('#damagechakra-polsunok').val());
			mp += 180 + Number($('#damagechakra-polsunok').val());
			bdefend += 15;
			if($('#kind-tai').prop('checked') == true) {
				$('#mod').show(0);

				injury *= (1 + (Tai * 0.05));

				if($('#mod-j').prop('checked') == true) {
					injury += Str;
					bdefend += Str*2;
					fall += Str*2;
				}
				if($('#mod-r').prop('checked') == true) {
					injury += Str+Spd;
					bdefend += Str*2;
					fall += Str*2;
				}
				if($('#mod-s').prop('checked') == true) {
					injury += Str+Spd*2;
					bdefend += (Str+Spd)*2;
					fall += (Str+Spd)*2;
				}
				if($('#mod-p').prop('checked') == true) {
					bdefend += (Str + Tai)*4;
					fall += Str*4;
					injury += Str*2;
				}
				if($('#mod-w').prop('checked') == true) {
					injury += 3 * (1+(Tai + Str)*0.1);
					bdefend += 5 * (1+(Tai + Str)*0.1);
					fall += 3 * (1+(Tai + Str)*0.1);
				}
			} else { $('#mod').hide(0); }
			if($('#kind-nin').prop('checked') == true) {
				injury *= (1 + (Nin * 0.05));
			}
			if($('#kind-gen').prop('checked') == true) {
				injury *= (1 + (Gen * 0.2));
bdefend += 65;
			}

		} else if ($('#rank-a').prop('checked') == true){
			$('#kind').show(0);
			$('#damage-chakra').show(0);

			injury += 140 + Number($('#damagechakra-polsunok').val());
			mp += 280 + Number($('#damagechakra-polsunok').val());
			bdefend += 15;
			if($('#kind-tai').prop('checked') == true) {
				$('#mod').show(0);

				injury *= (1 + (Tai * 0.05));

				if($('#mod-j').prop('checked') == true) {
					injury += Str;
					bdefend += Str*2;
					fall += Str*2;
				}
				if($('#mod-r').prop('checked') == true) {
					injury += Str+Spd;
					bdefend += Str*2;
					fall += Str*2;
				}
				if($('#mod-s').prop('checked') == true) {
					injury += Str+Spd*2;
					bdefend += (Str+Spd)*2;
					fall += (Str+Spd)*2;
				}
				if($('#mod-p').prop('checked') == true) {
					bdefend += (Str + Tai)*4;
					fall += Str*4;
					injury += Str*2;
				}
				if($('#mod-w').prop('checked') == true) {
					injury += 3 * (1+(Tai + Str)*0.1);
					bdefend += 5 * (1+(Tai + Str)*0.1);
					fall += 3 * (1+(Tai + Str)*0.1);
				}
			} else { $('#mod').hide(0); }
			if($('#kind-nin').prop('checked') == true) {
				injury *= (1 + (Nin * 0.05));
			}
			if($('#kind-gen').prop('checked') == true) {
				injury *= (1 + (Gen * 0.2));
bdefend += 65;
			}

		} else if ($('#rank-s').prop('checked') == true){
			$('#kind').show(0);
			$('#damage-chakra').show(0);

			injury += 200 + Number($('#damagechakra-polsunok').val());
			mp += 400 + Number($('#damagechakra-polsunok').val());
			bdefend += 20;
			if($('#kind-tai').prop('checked') == true) {
				$('#mod').show(0);

				injury *= (1 + (Tai * 0.05));

				if($('#mod-j').prop('checked') == true) {
					injury += Str;
					bdefend += Str*2;
					fall += Str*2;
				}
				if($('#mod-r').prop('checked') == true) {
					injury += Str+Spd;
					bdefend += Str*2;
					fall += Str*2;
				}
				if($('#mod-s').prop('checked') == true) {
					injury += Str+Spd*2;
					bdefend += (Str+Spd)*2;
					fall += (Str+Spd)*2;
				}
				if($('#mod-p').prop('checked') == true) {
					bdefend += (Str + Tai)*4;
					fall += Str*4;
					injury += Str*2;
				}
				if($('#mod-w').prop('checked') == true) {
					injury += 3 * (1+(Tai + Str)*0.1);
					bdefend += 5 * (1+(Tai + Str)*0.1);
					fall += 3 * (1+(Tai + Str)*0.1);
				}
			} else { $('#mod').hide(0); }
			if($('#kind-nin').prop('checked') == true) {
				injury *= (1 + (Nin * 0.05));
			}
			if($('#kind-gen').prop('checked') == true) {
				injury *= (1 + (Gen * 0.2));
bdefend += 65;
			}

		}

		if($('#elem-l').prop('checked') == true) {
			injury += Nin * 2;
			bdefend += Nin * 3;
		}
		if($('#elem-f').prop('checked') == true) {
			injury += (Nin + Spd) * 2;
			fall += Spd * 2;
		}
		if($('#elem-w').prop('checked') == true) {
			bdefend += Chk + Nin;
			fall += Nin + Chk;
			injury += Nin + Chk;
			mp -= Chk;
		}
		if($('#elem-d').prop('checked') == true) {
			fall += (Str + Nin)*3;
			bdefend += (Str + Nin) * 2;
		}
		if($('#elem-k').prop('checked') == true) {
			injury += Nin * 3;
		}



		if($('#oth-explosion').prop('checked') == true) {
			bdefend += 35;
			injury += 5;
			fall += 45;
		}
		if($('#oth-teleport').prop('checked') == true) {
			mp += 25;
		}
		if($('#oth-summon').prop('checked') == true) {
			mp += 50;
		}
		if($('#oth-clone').prop('checked') == true) {
			injury *= 0.5;
			bdefend *= 0.8;
			fall *= 0.8;
			mp += 20;
		}

		if($('#range-s').prop('checked') == true) {
			mp += 10;
		}
		if($('#range-m').prop('checked') == true) {
			mp += 30;
		}
		if($('#range-l').prop('checked') == true) {
			mp += 50;
		}


	$('#damagechakra-visual').html($('#damagechakra-polsunok').val());






	} else {
		$('#rank').hide(0);
		$('#kind').hide(0);
		$('#mod').hide(0);
		$('#damage-chakra').hide(0);
		$('#elem').hide(0);
		$('#oth').hide(0);
	}


	mp *= (1 - (Chk * 0.06));
	injury *= 0.8;
	bdefend /= 2;
	fall *= 0.8;
	injury = Math.round(injury);
	bdefend = Math.round(bdefend);
	fall = Math.round(fall);
	mp = Math.round(mp);
	$("#itr").html("injury: " + injury + " bdefend: " + bdefend + " fall: " + fall + "<hr>mp: " + mp);
}