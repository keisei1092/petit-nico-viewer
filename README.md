petit-nico-viewer
=================

![](./Screen\ Shot\ 2016-08-11\ at\ 18.04.34.png)

* 動画プレイヤー以外の要素を隠します
* カテゴリランキング閲覧機能
  * VOCALOID
  * 歌ってみた
  * 踊ってみた
* カテゴリランキングからランダムで1つ動画をピックアップ
* 単語検索機能
* アドレス直打ち
* 関連動画検索
  * 動画IDから引きます
* ツイート機能
  * メインブラウザが立ち上がります

Usage
-----

```sh
git@github.com:keisei1092/petit-nico-viewer.git
cd petit-nico-viewer
npm install && npm start
```

> [Electron]Pepper Flash pluginを使ってFlash Playerを動作させる - Qiita  
http://qiita.com/sanoani/items/b4457b9c348e007a18aa

こちらを参考にして`PepperFlash/`ディレクトリを作成しプラグインファイルを格納してください

Zoom Factor
-----------

**main.js**

```javascript
mainWindow = new BrowserWindow({
  // width: 672,
  // height: 503,
  width: 504,
  height: 386,
  frame: true,
  resizable: true,
  alwaysOnTop: true,
  webPreferences: {
    // zoomFactor: 1.0,
    zoomFactor: 0.75,
  }
});
```

コメントアウトしてあるキーを切り替えると拡大率を調整できます
