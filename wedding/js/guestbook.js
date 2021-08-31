$(document).ready(function() {

    let $list = document.getElementById('guest-books-list');
    let $postForm = document.getElementById('guest-books-post-form');
    let $postFormMaxLength = document.getElementById('guest-books-post-form-maxLength');
    let $postFormSubmitButton = document.getElementById('guest-books-post-form-submit-button');

    let matchHtmlRegExp = /["'&<>]/;
    const BODY_MAX_LENGTH = 300;
    let dataSources = '';
    let posting = false;

    let guestBookDatas = {
        type:"GET",
        url:"https://script.google.com/macros/s/AKfycbw8OgDmblHw6lbB0Kfunjui_stXJa5c1UlO1vHte3q3kNOJIMDDUEPkaL9OyUvkNLAL/exec",
        timeout:0,
    };

    function handlePostFormSubmit(event) {
        event.preventDefault();
        
        if (posting || !isPostFormValid()) {
            return;
        }
        let postData = getPostFormValues();
        postGuestBook(postData);
    };

    function escapeHtml (string) {
        var str = '' + string;
        var match = matchHtmlRegExp.exec(str);

        if (!match) {
        return str;
        }

        var escape;
        var html = '';
        var index = 0;
        var lastIndex = 0;

        for (index = match.index; index < str.length; index++) {
        switch (str.charCodeAt(index)) {
            case 34: // "
            escape = '&quot;';
            break
            case 38: // &
            escape = '&amp;';
            break
            case 39: // '
            escape = '&#39;';
            break
            case 60: // <
            escape = '&lt;';
            break
            case 62: // >
            escape = '&gt;';
            break
            default:
            continue;
        }

        if (lastIndex !== index) {
            html += str.substring(lastIndex, index);
        }

        lastIndex = index + 1;
        html += escape;
        }

        return lastIndex !== index
        ? html + str.substring(lastIndex, index)
        : html;
    }

    function commaizeNumber(value) {
        return String(value).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    }

    function isSameDay(date1, date2) {
        return date1.getFullYear() === date2.getFullYear()
        && date1.getMonth() === date2.getMonth()
        && date1.getDate() === date2.getDate();
    }

    function isToday(date) {
        return isSameDay(date, new Date());
    }

    function createListItem(item) {
        var $listItem = document.createElement('li');
        var createdAt = new Date(item.Timestamp);
        var created = {
        year: createdAt.getFullYear().toString(),
        month: (createdAt.getMonth() + 1).toString().padStart(2, '0'),
        date: createdAt.getDate().toString().padStart(2, '0'),
        hours: createdAt.getHours().toString().padStart(2, '0'),
        minutes: createdAt.getMinutes().toString().padStart(2, '0')
        };

        var displayDate = isToday(createdAt)
        ? created.hours + ':' + created.minutes
        : created.year + '.' + created.month + '.' + created.date;

        $listItem.innerHTML =
        '<div class="guest-books-list-item-head">' +
        '  <p class="guest-books-list-item-name">' + escapeHtml(item.Name) + '</p>' +
        '</div>' +
        '<div class="guest-books-list-item-body">' +
        '  <p class="guest-books-list-item-content">' +
        '    ' + escapeHtml(item.Content).replace(/(?:\r\n|\r|\n)/g, '<br>') +
        '  </p>' +
        '</div>' +
        '<div class="guest-books-list-item-tail">' +
        '  <p class="guest-books-list-item-time">' +
        '    <time datetime="' + createdAt.toString() + '">' + displayDate + '</time>' +
        '  </p>' +
        '</div>';

        $listItem.classList.add('guest-books-list-item', 'wow', 'fadeInUp');

        return $listItem;
    }

    function appendListItems(items) {
        items.forEach(function (item) {
        $list.appendChild(createListItem(item));
        });
    }

    $('#guest-books-post-form-body-textarea').keyup(function() {
        handlePostFormBodyTextareaChange();
    });

    function getPostFormValues() {
        var name = $('#guest-books-post-form-name-input').val();
        var body = $('#guest-books-post-form-body-textarea').val();
  
        return { Name: name, Content: body };
    }

    function isPostFormValid() {
        var values = getPostFormValues();
        return values.Name.length > 0 && values.Content.length > 0 && values.Content.length <= BODY_MAX_LENGTH;
    }

    function updatePostFormMaxLength() {
        var body = getPostFormValues().Content;
        $postFormMaxLength.innerHTML = body.length + '/' + BODY_MAX_LENGTH;
    }

    function validatePostFormSubmitButton() {
        $postFormSubmitButton.disabled = !isPostFormValid();
    }

    function handlePostFormNameInputChange() {
        validatePostFormSubmitButton();
      }

    function handlePostFormBodyTextareaChange() {
        validatePostFormSubmitButton();
        updatePostFormMaxLength();
    };

    function startPosting() {
        posting = true;
        $postFormSubmitButton.disabled = true;
        $postFormSubmitButton.innerHTML = '등록 중...';
    };

    function endPosting() {
        posting = false;
        $postFormSubmitButton.disabled = false;
        $postFormSubmitButton.innerHTML = '등록';
    };

    function paginationButtonToggle(paginationEntry) {
        let pageNumber = parseInt(paginationEntry.pageNumber);
        let pageRange = parseInt(paginationEntry.pageRange);
        let totalNumber= parseInt(paginationEntry.totalNumber); 
        if (pageNumber * pageRange < totalNumber) {
            $('.guest-books-list-more-button').removeClass('hidden');
        } else {
            $('.guest-books-list-more-button').addClass('hidden');
        };
    };

    function clearGuestBookList() {
        $list.innerHTML = '';
        if(!$('.guest-books-list-more-button').hasClass('hidden')) {
            $('.guest-books-list-more-button').addClass('hidden');
        }
    };

    function guestbookToggle() {
        if ($('.guest-books-post-form').hasClass('hidden')) {
            $('.guest-books-post-form').removeClass('hidden');
            $('.guestbook-start').html('방명록 작성창 숨기기');
        } else {
            $('.guest-books-post-form').addClass('hidden');
            $('.guestbook-start').html('방명록을 작성해보세요.');
        }
    };

    function initGuestBookForm() {
        $('#guest-books-post-form-name-input').val('');
        $('#guest-books-post-form-body-textarea').val('');
        
        handlePostFormNameInputChange();
        handlePostFormBodyTextareaChange();

        endPosting();
        clearGuestBookList();
        setGuestBookList();
        guestbookToggle();
    };

    function setGuestBookList() {
        $.ajax(guestBookDatas).done(function(res){
            //console.log(res.data);
            dataSources = res.data.reverse();
            //appendListItems(dataSource);
            $('#guest-books-list').pagination({
                dataSource : dataSources,
                pageSize:3,
                callback: function(data, pagination) {
                    appendListItems(data);
                    $('.paginationjs').addClass('hidden');
                    paginationButtonToggle(pagination);
                }
            });
    
            $('#guest-books-list-more-button').click(function() {
                let container = $('#guest-books-list');
                container.pagination('next');
            });
        });
    };
    
    $('.guestbook-start').click(function(){
        guestbookToggle();
    });

    $postForm.addEventListener('submit', handlePostFormSubmit);

    function postGuestBook(postData) {
        startPosting();
        $.ajax({
            type:"POST",
            url:"https://script.google.com/macros/s/AKfycbw8OgDmblHw6lbB0Kfunjui_stXJa5c1UlO1vHte3q3kNOJIMDDUEPkaL9OyUvkNLAL/exec",
            timeout:0,
            Headers:{
                'Content-Type':'application/json'
            },
            data: postData,
            success: function(res) {
                if(res.result == 'success') {
                    alert('등록이 완료되었습니다.');
                    initGuestBookForm();
                } else {
                    alert('오류가 발생했어요.. 잠시 후에 다시 시도해주세요.');
                }
            },
            error: function(req, status, error) {
                console.log('code:'+req.status + '\n error : ' + error);
                console.log(req.responseText);
                endPosting();
            }
        });  
    };


    //setGuestBookList();

});



