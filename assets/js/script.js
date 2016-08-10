var webview = document.querySelector('webview');

// アドレスバー
var addressBar = document.querySelector('.addressbar__input');
var addressBarButton = document.querySelector('.addressbar__button');

var makePetitNicoView = function() {
  // 'smXXXXXXXX' をURLに含んでいたら
  if (webview.getURL().match(/sm[0-9]+/i)) {
    // 動画のDOM以外を極力display: noneにする
    webview.insertCSS('#siteHeader, .videoHeaderOuter, #playerTabWrapper, #enquete-placeholder, #playlist, #wallImageContainer, #videoExplorerExpand, #invisibleAds, #bottomContentTabContainer, #footer { display: none; }');
    webview.insertCSS('#content { padding: 0 !important; }');
    webview.insertCSS('#playerContainerWrapper { padding: 0 !important; }');
    webview.insertCSS('#playerContainer{ left: -8px !important; }');
  }
  addressBar.value = webview.getURL();
};

// DOM読み込み完了時に
// ニコニコ動画の動画ページかチェックしてCSSを上書き
webview.addEventListener('dom-ready', makePetitNicoView);

// submitがクリックされたら
addressBarButton.addEventListener('click', function() {
  // WebViewでロードする
  webview.loadURL(addressBar.value);
});

var addressBarButtonRankingVocaloid = document.querySelector('.addressbar__button-ranking-vocaloid');
addressBarButtonRankingVocaloid.addEventListener('click', function() {
  var rankingUrl = 'http://www.nicovideo.jp/ranking/fav/daily/vocaloid';
  webview.loadURL(rankingUrl);
  addressBar.value = rankingUrl;
});

var addressBarButtonRankingSing = document.querySelector('.addressbar__button-ranking-sing');
addressBarButtonRankingSing.addEventListener('click', function() {
  var rankingUrl = 'http://www.nicovideo.jp/ranking/fav/daily/sing';
  webview.loadURL(rankingUrl);
  addressBar.value = rankingUrl;
});

var addressBarButtonRankingDance = document.querySelector('.addressbar__button-ranking-dance');
addressBarButtonRankingDance.addEventListener('click', function() {
  var rankingUrl = 'http://www.nicovideo.jp/ranking/fav/daily/dance';
  webview.loadURL(rankingUrl);
  addressBar.value = rankingUrl;
});

// カーソルがinputにいる時のエンターキー
document.querySelector('.addressbar__input').onkeyup = function (e) {
  if (e.keyCode == 13) {
    document.querySelector('.addressbar__button').click();
  }
};
