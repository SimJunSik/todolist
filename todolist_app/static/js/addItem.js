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
        $(".top-notification-count").hide();
        $(".top-notification_image").removeClass("top-notification_imageshake");
    }
};

// 알림 삭제
const delete_notification = (notification) =>{
    const notification_id = notification.id.split('_')[2];

    fetch('/delete_notification/' + notification_id + '/')
        .then(e => e.json())
        .then(e => {
            console.log(e);
            if(e.result == 'success'){
                $("#notification_" + notification_id).remove();
            }
            else if(e.result == 'failed'){
                alert("알림 삭제 실패");
            }
        });
}