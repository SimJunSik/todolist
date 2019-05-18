// set grade color
$('input[type=radio][name=grade]').change(function() {
    let color_value = '';
    if (this.value == '1') {
        color_value = 'red';
    }
    else if (this.value == '2') {
        color_value = 'yellow';
    }
    else if (this.value == '3') {
        color_value = 'green';
    }
    $(".middle-content-form-grade_color").css({
        'background-color' : color_value,
        'width' : '0vw',
        'height' : '0vw'
    });
    $(".middle-content-form-grade_color").stop().animate({
        'width' : '2vw',
        'height' : '2vw'
    },200);
});

// 알림창 열고 닫기
const toggle_notification = () =>{
    const notification_state = $(".notification").data('notificationState');

    if(notification_state == 'open'){
        $(".notification").stop().animate({
            'right' : '-20%'
        });
        $(".notification").data('notificationState','closed');
    }
    else if(notification_state == 'closed'){
        $(".notification").stop().animate({
            'right' : '0%'
        });
        $(".notification").data('notificationState','open');
    }
};