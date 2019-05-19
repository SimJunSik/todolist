// check button 눌렀을 때 완료/미완료 처리
$(document).ready(function(){
    $(".middle-content-listitem-checkbox").change(function(){
        // console.log(this.id);
        const split_id = this.id.split('_');
        const item_id = split_id[2];
        const type = split_id[0];
        let grade_color;

        grade_color = $("#grade_" + item_id).val();

        if(grade_color == '1'){
            grade_color = 'red';
        }
        else if(grade_color == '2'){
            grade_color = 'yellow';
        }
        else if(grade_color == '3'){
            grade_color = 'green';
        }
        else if(grade_color == 'overdue'){
            grade_color = 'black';
        }

        // 완료처리
        if($("#" + this.id).is(":checked")){
            // alert("체크박스 체크 했음!");
            $('#' + type + '_title_' + item_id).css({
                'text-decoration' : 'line-through'
            });
            fetch("/finish_todoitem/" + item_id + "/")
                .then(e => e.json())
                .then(e => {
                    console.log(e);
                    if(e.result == 'failed'){
                        alert("항목 체크에 실패했습니다.");
                    }
                });
            $("#grade_color_" + item_id).css({
                'background-color' : 'gray'
            });
        }
        // 미완료처리
        else{
            // alert("체크박스 체크 해제!");
            $('#' + type + '_title_' + split_id[2]).css({
                'text-decoration' : 'none'
            });
            fetch("/unfinish_todoitem/" + item_id + "/")
                .then(e => e.json())
                .then(e => {
                    console.log(e);
                    if(e.result == 'failed'){
                        alert("항목 체크에 실패했습니다.");
                    }
                });
            $("#grade_color_" + item_id).css({
                'background-color' : grade_color
            });
        }
    });
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

// 더보기 열고 닫기
const toggle_detail = (btn) =>{
    const btn_id = btn.id;
    const split_id = btn_id.split("_");
    const item_id = split_id[1];
    console.log(btn_id);

    const detail_state = $("#" + btn.id).data("detailToggle");
    console.log(detail_state);

    if(detail_state == 'closed'){
        $("#detail_" + item_id).stop().animate({
            'height' : '20%'
        },200);
        $("#" + btn.id).data("detailToggle", 'open');
    }
    else if(detail_state == 'open'){
        $("#detail_" + item_id).stop().animate({
            'height' : '0%'
        },200);
        $("#" + btn.id).data("detailToggle", 'closed');
    }
};

// 마감 있는 To-Do 열고 닫기
const toggle_deadlinelist = (btn) =>{
    const deadlinelist_state = $("#deadline_togglebutton").data('deadlineToggle');
    console.log(deadlinelist_state);

    if(deadlinelist_state == 'open'){
        $("#deadline-list").css({
            'overflow-y' : 'hidden'
        });
        $("#deadline_togglebutton").css({
            'transform' : 'rotate(0deg)'
        });
        $("#deadline_togglebutton").data('deadlineToggle','closed');
        $(".middle-content-deadlinelist").stop().animate({
            'height' : '2vw'
        },200);
    }
    else if(deadlinelist_state == 'closed'){
        $("#deadline-list").css({
            'overflow-y' : 'scroll'
        });
        $("#deadline_togglebutton").css({
            'transform' : 'rotate(180deg)'
        });
        $("#deadline_togglebutton").data('deadlineToggle','open');
        $(".middle-content-deadlinelist").stop().animate({
            'height' : '50%'
        },200);
    }
};

// 일반 To-Do 열고 닫기
const toggle_normallist = (btn) =>{
    const normallist_state = $("#normal_togglebutton").data('normalToggle');
    console.log(normallist_state);

    if(normallist_state == 'open'){
        $("#normal-list").css({
            'overflow-y' : 'hidden'
        });
        $("#normal_togglebutton").css({
            'transform' : 'rotate(0deg)'
        });
        $("#normal_togglebutton").data('normalToggle','closed');
        $(".middle-content-normallist").stop().animate({
            'height' : '2vw'
        },200);
    }
    else if(normallist_state == 'closed'){
        $("#normal-list").css({
            'overflow-y' : 'scroll'
        });
        $("#normal_togglebutton").css({
            'transform' : 'rotate(180deg)'
        });
        $("#normal_togglebutton").data('normalToggle','open');
        $(".middle-content-normallist").stop().animate({
            'height' : '50%'
        },200);
    }
};

// 항목 삭제
const delete_listitem = () =>{
    const listitem_id = $(".check-delete-content").data('listitemId').split('_')[2];
    // console.log(listitem_id);

    fetch("/delete_todoitem/" + listitem_id + "/")
        .then(e => e.json())
        .then(e => {
            // console.log(e);
            if(e.result == 'success'){
                $("#" + listitem_id).remove();
                $("#detail_" + listitem_id).remove();
                $('#mask, .check-delete').hide();
            }
            else if(e.result == 'failed'){
                alert("항목 삭제에 실패했습니다.");
            }
        });
};

// 
const check_delete_listitem = (btn) =>{
    // console.log(btn.id);

    const replace_id = btn.id.replace("deletebutton", "title");

    // console.log(replace_id);

    const title = $("#" + replace_id).html().trim();

    // console.log(title);

    $(".check-delete-content").html(title);
    $(".check-delete-content").attr({
        'data-listitem-id' : btn.id
    });
    // console.log($(".check-delete-content").data('listitemId'));
};

// mask창 띄우기
function wrapWindowByMask(){
    //화면의 높이와 너비를 구한다
    var maskHeight = $(document).height();  
    var maskWidth = $(window).width();  
    
    //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채운다
    $('#mask').css({
        'width':maskWidth,
        'height':maskHeight
    });  
    
    $('#mask').fadeIn(200);   
}

$(document).ready(function(){
    //mask 및 삭제 확인창 띄우기
    $('.middle-content-listitem_deletebutton').click(function(e){
        e.preventDefault();
        wrapWindowByMask();
        $(".check-delete").fadeIn(200);
    });

    //닫기 버튼을 눌렀을 때 꺼지게
    $("#check-delete_cancel").click(function(e){
        e.preventDefault();  
        $('#mask, .check-delete').hide(); 
    })

    //mask 눌렀을 때 꺼지게
    $('#mask').click(function () {  
        $(this).hide();  
        $(".check-delete").hide();
    });      
});

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