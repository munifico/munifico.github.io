var clipboard = new ClipboardJS( '.accountBtn' );
      clipboard.on( 'success', function() {
        alert( '클립보드에 복사되었습니다.' );
      } );
      clipboard.on( 'error', function() {
        alert( '복사를 실패했습니다.' );
      } );