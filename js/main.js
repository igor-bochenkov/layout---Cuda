
//===============JS start=======================================
$(document).ready(function() {
		var w=$(window).outerWidth();
		var h=$(window).outerHeight();
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf("MSIE ");
		var isMobile = {Android: function() {return navigator.userAgent.match(/Android/i);},BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},Windows: function() {return navigator.userAgent.match(/IEMobile/i);},any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}};
	function isIE() {
		ua = navigator.userAgent;
		var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
		return is_ie; 
	}
	if(isIE()){
		$('body').addClass('ie');
	}
	if(isMobile.any()){
		$('body').addClass('touch');
	}

//=================BURGER======================================================================================
$(document).ready(function() {
	$('.header__burger').click(function(event) {
		$('.header__burger,.header__menu').toggleClass('active');
		$('body').toggleClass('lock');
	});
});
//===================IBG=======================================================================================
function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll(".ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();
//==================FILTER=====================================================================================
$('.filter__item').click(function(event) {
		var i=$(this).data('filter');
	if (i==1) {
		$('.portfolio__column').show();
	}else{
		$('.portfolio__column').hide();
		$('.portfolio__column.f_'+i).show();
	}
	$('.filter__item').removeClass('active');
	$(this).addClass('active');

	return false;
});
//==ScrollAnimAtion==================================================================================================================
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	setTimeout(() => {
		animOnScroll();
	}, 300);
}
});
//FORM==============================================================================================
"use strict"

document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

//SEND                                                                                  
	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		let formData = new FormData(form);
		formData.append('image', formImage.files[0]);

		if (error === 0) {
			form.classList.add('sending');
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				formPreview.innerHTML = '';
				form.reset();
				form.classList.remove('sending');
			} else {
				alert("Ошибка");
				form.classList.remove('sending');
			}
		} else {
			alert('Заполните обязательные поля');
		}
	}

//VALID                                                                                 
	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('.req');

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.classList.contains('email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
				formAddError(input);
				error++;
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}
	function formAddError(input) {
		input.parentElement.classList.add('error');
		input.classList.add('error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('error');
		input.classList.remove('error');
	}

	//Функция теста email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
});

//FIELDS(Placeholder)                                                              
$('input,textarea').focus(function(){
	if($(this).val() == $(this).attr('data-value')){
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
		if($(this).attr('data-type')=='pass'){
			$(this).attr('type','password');
		};
		$(this).val('');
	};
	removeError($(this));
});
$('input[data-value], textarea[data-value]').each(function() {
	if (this.value == '' || this.value == $(this).attr('data-value')) {
		if($(this).hasClass('l') && $(this).parent().find('.form__label').length==0){
			$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
		}else{
			this.value = $(this).attr('data-value');
		}
	}
	if(this.value!=$(this).attr('data-value') && this.value!=''){
		$(this).addClass('focus');
		$(this).parent().addClass('focus');
		if($(this).hasClass('l') && $(this).parent().find('.form__label').length==0){
			$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
		}
	}

	$(this).click(function() {
		if (this.value == $(this).attr('data-value')) {
			if($(this).attr('data-type')=='pass'){
				$(this).attr('type','password');
			};
			this.value = '';
		};
	});
	$(this).blur(function() {
		if (this.value == '') {
			if(!$(this).hasClass('l')){
				this.value = $(this).attr('data-value');
			}
				$(this).removeClass('focus');
				$(this).parent().removeClass('focus');
			if($(this).attr('data-type')=='pass'){
				$(this).attr('type','text');
			};
		};
		if($(this).hasClass('vn')){
			formValidate($(this));
		}
	});
});
//============================================================================================================