function timeLeft(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));

    return {
        total: t,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
    };
}

/* 👉🏼 Convert LATAN Number to Khmer Number */
function convertToKhmerNumber(number) {
    // Khmer numerals mapping
    const khmerNumerals = {
        '0': '០',
        '1': '១',
        '2': '២',
        '3': '៣',
        '4': '៤',
        '5': '៥',
        '6': '៦',
        '7': '៧',
        '8': '៨',
        '9': '៩'
    };

    // Convert the number to string to process each digit
    const numberStr = number.toString();
    
    // Replace each digit with its Khmer equivalent
    const khmerNumber = numberStr.split('').map(digit => {
        // Handle decimal point
        if (digit === '.') {
            return '.';
        }
        return khmerNumerals[digit] || digit;
    }).join('');

    return khmerNumber;
}
console.log(convertToKhmerNumber('1'))

$(document).ready(function () {
    var today = new Date();
    var deadline = 'January 1 ' + (today.getFullYear() + 1) + ' 00:00:00';
    if (today.getMonth() == 0 && today.getDate() == 1) {
        deadline = 'January 1 ' + today.getFullYear() + ' 00:00:00';
    }
    // var deadline = 'December 31 ' + (today.getFullYear()) + ' 17:53:00';

    $('#header').hover(function () {
        $(this).toggleClass('redlight');
    });

    $('.clock').hover(function () {
        $(this).toggleClass('redlight');
    });

    var setClock = function (newyear) {
        var timeinterval = setInterval(function () {
            var t = timeLeft(newyear);
            $('#days').text(convertToKhmerNumber(t.days));
            $('#hours').text(convertToKhmerNumber(t.hours));
            $('#mins').text((convertToKhmerNumber('0') + convertToKhmerNumber(t.minutes)).slice(-2));
            $('#secs').text((convertToKhmerNumber('0') + convertToKhmerNumber(t.seconds)).slice(-2));
            if (t.total <= 0) {
                clearInterval(timeinterval);
                location.href = 'celebrate.html';
                // var now = new Date();
                // var yearStr = now.getFullYear().toString();
                // $('#header').text('Happy New Year!!!');
                // $('#days').text(yearStr[0]);
                // $('#days-text').text('Happy');
                // $('#hours').text(yearStr[1]);
                // $('#hours-text').text('New');
                // $('#mins').text(yearStr[2]);
                // $('#mins-text').text('Year');
                // $('#secs').text(yearStr[3]);
                // $('#secs-text').text('!!!');
                // $('#info').text('Countdown starts again tomorrow!');
            }
        }, 1000);
    };
    setClock(deadline);
});