var api;
var pages;
var count = 1;

$(document).ready(function(){
	$(".movie").keyup(function(e){
		if (e.keyCode == 13){
			if ($(".movie").val().length > 0) {
				api = `https://www.omdbapi.com/?s=${$(".movie").val()}&page=${count}&type=movie`;
				$(".results").html("");
				$.getJSON(api, function(j){
					pages = j.totalResults;
					if (j.Response == "True") {
						$.each(j.Search, function(index, value){
							getFilm(`${value.Poster}`, `${value.Title}`, `${value.Year}`, `${value.imdbID}`)
							focusOnA();
						})
					}
					else if (j.Response == "False") {
						$(".results").prepend(`${j.Error}`);
					}
				});
			}
		}
	});
});

function getFilm(poster, title, year, id) {
	if (poster == "N/A") {
		var poster = "img/notfound.jpg"
	}

	$(".results").append(
		'<div class="col-md-4">\
			<div class="card">\
			  <span class="card-img-top poster" style="background-image: url(' + poster + ')"></span\
			  <ul class="list-group list-group-flush">\
			  	<li class="list-group-item" style="height: 80px">\
			  		<h4 class="card-title">' + title + '</h4>\
			  	</li>\
			    <li class="list-group-item">' + year + '</li>\
			    <li class="list-group-item">\
			  		<a href="http://www.imdb.com/title/' + id +'/" class="card-link" target="_blank">IMDb link</a>\
			  	</li>\
			  </ul>\
			</div>\
		</div>');
};

$(window).scroll(function() {
	if($(window).scrollTop() + $(window).height() == getDocHeight()) {
		count++;
		api = `https://www.omdbapi.com/?s=${$(".movie").val()}&page=${count}&type=movie`;
		if(count<=(Math.ceil(pages/10))){
			console.log(count);
			$.getJSON(api,function (j){
				$.each(j.Search, function(index, value){
					getFilm(`${value.Poster}`, `${value.Title}`, `${value.Year}`, `${value.imdbID}`)
				})
			});
		}
	}
});

function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}

function focusOnA() {
	var form = document.getElementById('up');
	form.style.display = '';
	form.scrollIntoView();
};
