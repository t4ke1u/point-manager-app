# Point Manager App

## Commands

### yarn

```bash
# パッケージインストール
$ yarn

# 開発サーバーを立てる
$ yarn dev
```

### git

```sh
# 対象ファイルをインデックス（コミット対象）に追加
$ git add {ファイルパス1} {ファイルパス2}...

# 変更したファイルの一覧を出力
$ git status

# 指定したエディタでメッセージを書き、インデックスにある全ファイルをコミット
$ git commit

# メッセージを付け、インデックスにある全ファイルをコミットする
$ git commit -m "{メッセージ}"

# 現在のローカルブランチを origin にプッシュする
$ git push

# 対象ブランチに切り替える
$ git checkout {ブランチ名}

# 対象ブランチを新規作成し、切り替える
$ git checkout -b {ブランチ名}

# ワークツリーにある対象ファイルの変更を取り消す
$ git checkout {ファイルパス}

# 最新の履歴を取得する
$ git fetch

# 対象ブランチを、現在のブランチへマージする
$ git merge {ブランチ名}

# git fetch + git merge
$ git pull
```
