var webview = document.querySelector('webview');

var makePetitNicoView = function() {
  // 'smXXXXXXXX' をURLに含んでいたら
  if (webview.getURL().match(/sm[0-9]+/i)) {
    // 動画のDOM以外を極力display: noneにする
    webview.insertCSS('#siteHeader, .videoHeaderOuter, #playerTabWrapper, #enquete-placeholder, #playlist, #wallImageContainer, #videoExplorerExpand, #invisibleAds, #bottomContentTabContainer, #footer { display: none; }');
    webview.insertCSS('#content { padding: 0 !important; }');
    webview.insertCSS('#playerContainerWrapper { padding: 0 !important; }');
    webview.insertCSS('#playerContainer{ left: -8px !important; }');
  }
};

// DOM読み込み完了時に
// ニコニコ動画の動画ページかチェックしてCSSを上書き
webview.addEventListener('dom-ready', makePetitNicoView);

// アドレスバー
var addressbar__button = document.querySelector('.addressbar__button');
// submitがクリックされたら
addressbar__button.addEventListener('click', function() {
  // アドレスバーの中身を見て
  var address = document.querySelector('.addressbar__input').value;
  // WebViewでロードする
  webview.loadURL(address);
});

var addressbarButtonRanking = document.querySelector('.addressbar__button-ranking');
addressbarButtonRanking.addEventListener('click', function() {
  webview.loadURL('http://www.nicovideo.jp/ranking/fav/daily/vocaloid');
});

// カーソルがinputにいる時のエンターキー
document.querySelector('.addressbar__input').onkeyup = function (e) {
  if (e.keyCode == 13) {
    document.querySelector('.addressbar__button').click();
  }
};
