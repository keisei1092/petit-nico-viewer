const {shell} = require('electron');

var webview = document.querySelector('webview');

// アドレスバー
var addressBar = document.querySelector('.addressbar__input');
var addressBarButton = document.querySelector('.addressbar__button');
var title;

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

// ランダムで曲選択
// ここで.videoRankingの中からどれか一つを選択して遷移する
var randomSelect = function() {
  if (webview.getTitle !== title) {
    webview.executeJavaScript(
      (function(){
        var candidates = document.getElementsByClassName('videoRanking');
        var seed = Math.floor(Math.random() * candidates.length);
        var result = candidates[seed];
        location.href = 'http://www.nicovideo.jp/watch/' + result.dataset.id;
      })
      .toString().replace(/function\s*\(\)\{/, '')
      .replace(/}$/,'')
      .trim()
    );
  }
};

// smXXXXXXXX を抽出
var returnVideoId = function(url) {
  var url = webview.getURL();
  return url.match(/sm\d+/);
};

// DOM読み込み完了時に
// ニコニコ動画の動画ページかチェックしてCSSを上書き
webview.addEventListener('dom-ready', makePetitNicoView);

// submitがクリックされたら
addressBarButton.addEventListener('click', function() {
  // WebViewでロードする
  webview.loadURL(addressBar.value);
});

// VOCALOID
var addressBarButtonRankingVocaloid = document.querySelector('.addressbar__button-vocaloid');
addressBarButtonRankingVocaloid.addEventListener('click', function() {
  var rankingUrl = 'http://www.nicovideo.jp/ranking/fav/daily/vocaloid';
  webview.loadURL(rankingUrl);
  addressBar.value = rankingUrl;
});

// VOCALOID Random
var addressBarButtonRankingVocaloidRandom = document.querySelector('.addressbar__button-vocaloid-random');
addressBarButtonRankingVocaloidRandom.addEventListener('click', function() {
  var rankingUrl = 'http://www.nicovideo.jp/ranking/fav/daily/vocaloid';
  title = webview.getTitle();
  webview.loadURL(rankingUrl);
  setTimeout(randomSelect, 1000); // 読み込まれなかったらバッファ時間をもっと大きくしてください
});

// 歌ってみた
var addressBarButtonRankingSing = document.querySelector('.addressbar__button-sing');
addressBarButtonRankingSing.addEventListener('click', function() {
  var rankingUrl = 'http://www.nicovideo.jp/ranking/fav/daily/sing';
  webview.loadURL(rankingUrl);
  addressBar.value = rankingUrl;
});

// 歌ってみた Random
var addressBarButtonRankingSingRandom = document.querySelector('.addressbar__button-sing-random');
addressBarButtonRankingSingRandom.addEventListener('click', function() {
  var rankingUrl = 'http://www.nicovideo.jp/ranking/fav/daily/sing';
  title = webview.getTitle();
  webview.loadURL(rankingUrl);
  setTimeout(randomSelect, 1000); // 読み込まれなかったらバッファ時間をもっと大きくしてください
});

// 踊ってみた
var addressBarButtonRankingDance = document.querySelector('.addressbar__button-dance');
addressBarButtonRankingDance.addEventListener('click', function() {
  var rankingUrl = 'http://www.nicovideo.jp/ranking/fav/daily/dance';
  webview.loadURL(rankingUrl);
  addressBar.value = rankingUrl;
});

// 踊ってみた Random
var addressBarButtonRankingDanceRandom = document.querySelector('.addressbar__button-dance-random');
addressBarButtonRankingDanceRandom.addEventListener('click', function() {
  var rankingUrl = 'http://www.nicovideo.jp/ranking/fav/daily/dance';
  title = webview.getTitle();
  webview.loadURL(rankingUrl);
  setTimeout(randomSelect, 1000); // 読み込まれなかったらバッファ時間をもっと大きくしてください
});

// 検索
var addressBarButtonRankingSearch = document.querySelector('.addressbar__button-search');
addressBarButtonRankingSearch.addEventListener('click', function() {
  var searchUrl = 'http://www.nicovideo.jp/search/' + addressBar.value;
  webview.loadURL(searchUrl);
  addressBar.value = searchUrl;
});

// 関連動画
var addressBarButtonRankingRelated = document.querySelector('.addressbar__button-related');
addressBarButtonRankingRelated.addEventListener('click', function() {
  var videoId = returnVideoId(webview.getURL());
  var searchUrl = 'http://www.nicovideo.jp/search/' + videoId;
  webview.loadURL(searchUrl);
  addressBar.value = searchUrl;
});

// mp3
var addressBarButtonRankingMp3 = document.querySelector('.addressbar__button-mp3');
addressBarButtonRankingMp3.addEventListener('click', function() {
  var exec = require('child_process').exec;
  exec('youtube-dl -x --audio-format mp3 ' + webview.getURL(), function(err, stdout, stderr) {});
});

// Tweet
var addressBarButtonRankingTweet = document.querySelector('.addressbar__button-tweet');
addressBarButtonRankingTweet.addEventListener('click', function() {
  var videoId = returnVideoId(webview.getURL());
  shell.openExternal('https://twitter.com/share?text=' + webview.getTitle() + '&url=' + webview.getURL() + '&hashtags=' + videoId);
});

// カーソルがinputにいる時のエンターキー
document.querySelector('.addressbar__input').onkeyup = function (e) {
  if (e.keyCode == 13) {
    document.querySelector('.addressbar__button').click();
  }
};

