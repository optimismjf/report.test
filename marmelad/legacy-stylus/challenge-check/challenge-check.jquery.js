if ($('.b-challane-check__editor').length) {
	/* текстовый редактор */
	/*========================*/
	tinymce.init({
		selector: '.b-challane-check__editor textarea',
		height: 720,
		menubar: false,
		plugins: [
		'advlist autolink lists link image charmap print preview anchor textcolor',
		'searchreplace visualblocks code fullscreen',
		'insertdatetime media table contextmenu paste code help wordcount'
		],
		toolbar: 'insert | undo redo |  formatselect | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
		content_css: [
		'//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
		'//www.tinymce.com/css/codepen.min.css'],
		setup : function(ed){
		    ed.on('keyup', function(e){
	    		var textRedactor = $('.mce-tinymce'); 
		    	if (textRedactor.hasClass('error')) {
					hideErrorMessage(textRedactor);
		    	}
		    });
		}
	});
}

// задание
$('.b-challane-check__task-button a').on('click', function(event) {
	event.preventDefault();
	$('.b-challane-check__content--task').slideToggle();
});

// Очистить
$('.b-challane-check__editor-clear').on('click', function(event) {
	event.preventDefault();
	tinyMCE.activeEditor.setContent('');
});