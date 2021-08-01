var CrosshairUrl = "https://media.discordapp.net/attachments/690726930261213245/871251033152712766/crosshair.png"
var Checked = false
var Dimension = 0.4

$(document).ready(function(){
    $(".menu").height(0);
    $("#data").fadeOut(0)
})

window.addEventListener('message', function(event){		
	let data = event.data;
		
    if (data.active != null) {
        if (data.active) {
            $("#data").fadeIn(1000)
            $(".menu").css('transition', '250ms ease-in');
            $(".menu").height(250);
        } else {
            $("#data").fadeOut(150)
            $(".menu").css('transition', '250ms ease-out');
            $(".menu").height(0);
        }
    }

    if (data.dimension != null) {
        var dimension = document.getElementById("dimension")
        var dimension_value = document.getElementById("dimension_value")
            
        dimension_value.value = data.dimension
        dimension.value = data.dimension
        $('.bg').css('transform', 'scale('+data.dimension+')');
    }

    if (data.crosshair != null) {
        var crosshair = document.getElementById("crosshair")
        crosshair.src = data.crosshair
    }

    if (data.checked != null) {
        var click = document.getElementById("click")
        click.checked = (data.checked === 'true')
    }
})

var value_user = false

function ValueFromUser() {
    value_user = true
}

function UpdateCrosshair() {
    if (value_user) {
        var dimension_value = document.getElementById("file-input")
        var crosshair = document.getElementById("crosshair")

        if (dimension_value.value != "") {
            crosshair.src = dimension_value.value
            CrosshairUrl = dimension_value.value
            $.post('http://crosshair_built_in/save_data', JSON.stringify({
                crosshair: CrosshairUrl,
                checked: Checked,
                dimension: Dimension
            }));
        } else {
            crosshair.src = "https://media.discordapp.net/attachments/690726930261213245/871251033152712766/crosshair.png"
            CrosshairUrl = "https://media.discordapp.net/attachments/690726930261213245/871251033152712766/crosshair.png"
            $.post('http://crosshair_built_in/save_data', JSON.stringify({
                crosshair: CrosshairUrl,
                checked: Checked,
                dimension: Dimension
            }));
        }
    }
}

function UpdateValue() {
    console.log(value_user)
    if (value_user) {
        var dimension_value = document.getElementById("dimension_value")

        if (parseFloat(dimension_value.value) < 5.1 && parseFloat(dimension_value.value) > 0.0) {
            var dimension = document.getElementById("dimension")
            dimension.value = dimension_value.value
            $('.bg').css('transform', 'scale('+dimension_value.value+')');
        }
    }
}

$(document).on('input', '#dimension', function() {
    var dimension_value = document.getElementById("dimension_value")
    var value = $(this).val()

    value_user = false
    dimension_value.value = value
    $('.bg').css('transform', 'scale('+value+')');
    Dimension = value
    $.post('http://crosshair_built_in/save_data', JSON.stringify({
        crosshair: CrosshairUrl,
        checked: Checked,
        dimension: Dimension
    }));
});

function DefaultCrosshair() {
    setTimeout(() => {
        if (document.getElementById('click').checked) {
            $.post('http://crosshair_built_in/enable_dcross');
            Checked = true
            $.post('http://crosshair_built_in/save_data', JSON.stringify({
                crosshair: CrosshairUrl,
                checked: Checked,
                dimension: Dimension
            }));
        } else {
            $.post('http://crosshair_built_in/disable_dcross');
            Checked = false
            $.post('http://crosshair_built_in/save_data', JSON.stringify({
                crosshair: CrosshairUrl,
                checked: Checked,
                dimension: Dimension
            }));
        }
    }, 1000);
}

document.onkeyup = function (data) {
	if (data.which == 27) {
		$.post('http://crosshair_built_in/disable', '{}');
	}
};