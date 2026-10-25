# フロントエンドのNode移行（2026-10-25）

Node 23.5.0 / Debian bullseyeからNode 24.22.1 LTS / Debian bookwormへ移行する。
[Node公式リリース](https://nodejs.org/en/blog/release/v24.22.1)はCVE-2026-111497修正とCA更新を含む。
Dockerは公式manifest digestに固定し、CIは`.node-version`を読む。
package.jsonとlockfileのルートenginesを`>=24.22.1 <25`とする。
enginesは要求バージョンの宣言であり、利用者のnpm設定によっては警告だけになる。
ローカルでも`.node-version`と同じ版を選び、実際の`node --version`を確認する。

アプリ依存の解決結果は変更しない。Dockerの依存インストールは`npm ci`を使い、
インストール失敗を成功扱いしない。システムlibbrotli1はDebianの修正版
1.0.9-2+deb12u1以上をビルド時に要求する。
`--no-install-recommends`ではCAが入らないため、ca-certificatesも明示する。
既存のポート、マウント、ユーザー設定は変更しない。ComposeはこのDockerfileを参照する。
Terraform用修正は別PR #125。どちらのマージも自動では行わない。

## ローカル確認方法

秘密ファイルや既存node_modulesを含めず、必要な追跡済みソースのみの一時ディレクトリで構築する。
既存タグを上書きせず、build argsのUSER_NAME/GROUP_NAME/PROJECT_NAME/SERVICE_NAMEと
RUN_NPM_INSTALL_AT_BUILD_TIME=trueを指定する。

```sh
sh environments/check-frontend-security.sh NEW_IMAGE
npm run format-check
npm run lint-check
npm run build
npx --no-install tsc --noEmit
```

npmのコマンドは同じ隔離Node24環境で実行する。Next.jsがnext-env.d.tsを生成する前に
追加のtscを実行すると、画像importの型定義不足で失敗するため、buildの後に置く。
初回はこの順序を誤って失敗したが、アプリの型検査を弱めず順序を直した。

RED: 修正前イメージに対するcheck-frontend-security.shがv23.5.0で失敗。
GREEN: 修正後イメージでNode/Brotliの往復処理・修正エラー定数・システムBrotli・CAを検査する。
最初のcurl試験はCA未導入でエラー77となり、上記CA明示追加の根拠になった。

既存Macのnode_modules、稼働コンテナ、データ、ホストCAは変更しない。
マージ後も旧コンテナの再起動だけではNodeは更新されない。利用再開前にマウントと
データ保存先を確認して新イメージで再作成する。デプロイは別途承認・検証が必要。

## Node移行時点の依存監査（履歴）

2026-10-25追記: 以下はNode移行時点の記録。[後続の依存更新](DEPENDENCY_SECURITY.md)で置き換える。

今回のnpm auditは20件（critical 1 / high 13 / moderate 6）を報告した。
これは監査対象パッケージの件数であり、悪用可能な攻撃経路の実証件数ではない。
Node更新だけではこれらを解消しない。
Next.js 15.5.9のImage Optimizationの問題には
[公式修正版15.5.28](https://github.com/vercel/next.js/releases/tag/v15.5.28)がある。
現在の設定はoutput: export、images.unoptimized: trueであり、静的配信と
Next.jsサーバーを動かす場合の露出は異なる。開発・ビルド環境も含めて影響評価する。
次の作業はNext/関連依存の更新を別変更でローカル回帰検証すること。
`npm audit fix --force`での無差別な更新は行っていない。

## 最終検証結果

2026-10-25、linux/arm64の隔離コンテナでnpm ci、format-check、lint-check、
production build、build後のtsc --noEmitがすべて成功。
4ページ（/, /contact/, /events-reports/, /publications/）の生成とコンテナ内HTTP 200、
存在しないURLの404応答を確認した。最初の補助smokeで生成HTMLが8個以上と仮定して
失敗したため、実際のルート構成を確認し、必要な各ルートの内容・応答を検査する形に直した。
Nodeおよびcurlで正常サイトへのTLS接続成功、問題証明書専用ホスト2経路の拒否を確認。
curlは正常先exit 0、問題証明書exit 60。検証を無効化するオプションは使用していない。
ShellCheck、Compose設定解析、git diff --check、追加文書リンクも確認。
lockfileはルートengines以外の構造が元と完全一致し、依存パッケージは変更されていない。

実ブラウザでの画面比較、linux/amd64、公開サイト・クラウドの検証は未実施。
GitHub CIの結果はローカル成功と区別する。既存Next設定のdevIndicators.appIsrStatusに
非推奨警告が出るが、今回のNode移行によるビルド失敗はない。
