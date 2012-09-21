var ADMIN        = 0;
var AUTHORIZED   = 1;
var UNAUTHORIZED = 9;

function del_like(id) {
	$.ajax({
		url: '/statement/'+id+'/like',
		type: 'DELETE',
		success: function(result) {
			location.href="/";
		}
	});
}

function del_statement(id) {
	if(window.confirm('本当に削除してよろしいいですか？'))
	{
		$.ajax({
			url: '/statement/'+id,
			type: 'DELETE',
			success: function(result) {
				location.href="/";
			}
		});
	}
}

function del_user(id) {
	if(window.confirm('本当に削除してよろしいいですか？'))
	{
		$.ajax({
			url: '/user',
			type: 'DELETE',
			success: function(result) {
				location.href="/";
			}
		});
	}
}

function authorize_user(id) {
	{
		$.ajax({
			url: '/user/'+id,
			type: 'PUT',
			data: "status="+AUTHORIZED,
			success: function(result) {
				location.href="/admin";
			}
		});
	}
}
function unauthorize_user(id) {
	if(window.confirm('本当に認可を取り消していいですか？'))
	{
		$.ajax({
			url: '/user/'+id,
			type: 'PUT',
			data: "status="+UNAUTHORIZED,
			success: function(result) {
				location.href="/admin";
			}
		});
	}
}

function privilege_user(id) {
	{
		$.ajax({
			url: '/user/'+id,
			type: 'PUT',
			data: "status="+ADMIN,
			success: function(result) {
				location.href="/admin";
			}
		});
	}
}

function unprivilege_user(id) {
	if(window.confirm('本当にAdmin権限を取り消していいですか？'))
	{
		$.ajax({
			url: '/user/'+id,
			type: 'PUT',
			data: "status="+AUTHORIZED,
			success: function(result) {
				location.href="/admin";
			}
		});
	}
}

function toggle_response(id) {
	$("#res"+id).toggle().each(function(){
		if($(this).css('display') == 'block'){
			$('textarea', this).focus();
		}
	});
	return false;
}

$(function(){
	/*
	 * setup against CSRF
	 */
	jQuery.ajaxSetup({
		beforeSend: function(xhr) {
			var token = jQuery('meta[name="_csrf"]').attr('content');
			xhr.setRequestHeader('X_CSRF_TOKEN', token);
		}
	});

	/*
	 * automatic link
	 */
	$('.statement-message').each( function(){
		var re = /((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g;
		$(this).html( $(this).html().replace(re, '<a href="$1" target="_blank">$1</a> ') );
	});
});

