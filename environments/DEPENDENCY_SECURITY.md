# 依存監査20件への対応（2026-10-25）

PR #125（Terraform）と#126（Node24）は2026-10-25にマージ済み。
その後のdevelopを基点に、npmの本番・開発依存を両方監査した。
変更前の`npm audit --audit-level=low`は終了コード1、20パッケージ
（critical 1 / high 13 / moderate 6）を報告した。77件の重複しない
GitHubアドバイザリについて公式APIの影響範囲・修正版を照合した。
「20件」は悪用を実証した攻撃経路数ではない。

## 更新と判断

- Next.js / eslint-config-next / @next/eslint-plugin-nextは15.5.28に揃えた。
  [Next公式リリース](https://github.com/vercel/next.js/releases/tag/v15.5.28)に
  Image OptimizationのRCE、Server ActionsのDoS修正がある。
- [Config Inspector 3.5.0](https://github.com/eslint/config-inspector/releases/tag/v3.5.0)へ更新。
  旧Inspector経由のesbuild等を解消した。Node24は新しいInspectorの対応範囲内。
  `inspect`は検証済みローカル実体を直接起動する。従来のeslint --inspect-configは
  内部でnpx @eslint/config-inspector@latestを実行し、lockの版に固定されていなかった。
- その他は既存の互換範囲内でlockを更新。React19.2.3、ESLint9.39.2、Tailwind3.4.19を維持。
- Nextの固定PostCSSはoverrideで8.5.31に限定指定。
  [PostCSSの公式情報](https://github.com/postcss/postcss/security/advisories/GHSA-fxqj-rqcc-2cmp)を参照。
- Tailwindとpostcss-nested配下だけselector-parserを7.1.6に限定指定。
  [公式アドバイザリ](https://github.com/postcss/postcss-selector-parser/security/advisories/GHSA-rj75-hqrm-r3gf)が示す修正版。
  6→7はメジャー変更（反復中の挿入の安全性変更を含む）なので生成CSSの一致も検証した。

Next16 / Tailwind4への一括移行やnpm audit fix --forceは行っていない。
通常の範囲を超えるoverrideは上記の3経路だけ。上流依存が修正版を要求するように
なったらoverrideを外し、監査・ビルド・CSS比較を再検証する。
CIに`npm audit --audit-level=low`を追加し、開発依存も検査する。
レジストリ障害は脆弱性の検出と区別して診断し、失敗を黙って無視しない。

## 元の20項目との対応

| 監査対象 | 更新前 | 更新後（lock内の全版） | 元の判定 |
|---|---|---|---|
| @eslint/config-inspector | 0.7.1 | 3.5.0 | moderate |
| @humanfs/node | 0.16.7 | 0.16.8 | moderate |
| ajv | 6.12.6 | 6.15.0 | moderate |
| baseline-browser-mapping | 2.9.11 | 2.11.32 | moderate |
| brace-expansion | 1.1.12, 2.0.2 | 1.1.21, 2.1.7 | high |
| browserslist | 4.28.1 | 4.29.4 | high |
| defu | 6.1.4 | 依存経路から除去 | high |
| esbuild | 0.24.2 | 依存経路から除去 | moderate |
| flatted | 3.3.3 | 3.4.4 | high |
| h3 | 1.15.4 | 2.0.8 | high |
| js-yaml | 4.1.1 | 4.3.2 | high |
| minimatch | 3.1.2, 9.0.5 | 3.1.5, 9.0.9 | high |
| nanoid | 3.3.11 | 3.3.20 | high |
| next | 15.5.9 | 15.5.28 | critical |
| picomatch | 2.3.1, 4.0.3 | 2.3.2, 4.0.7 | high |
| postcss | 8.4.31, 8.5.6 | 8.5.31 | high |
| postcss-selector-parser | 6.1.2 | 7.1.6 | moderate |
| sharp | 0.34.5 | 0.35.5 | high |
| source-map-js | 1.2.1 | 1.2.2 | high |
| ws | 8.18.3 | 依存経路から除去 | high |

上表は推移依存を含む。上流の依存が変わって不要になったパッケージを削除したものもある。
監査ルールの無効化や例外リストによる件数削減は行っていない。

## 検証と限界

専用worktree、新しいコンテナタグ、秘密情報を除外したbuild contextを使用する。
元の作業ツリー、node_modules、既存コンテナ、データ、ホストCAは変更しない。
Node24.22.1のdigest・Brotli/CA設定・Terraform Dockerfileはこの変更で維持する。

RED: 更新前イメージで`npm audit --audit-level=low --json`を実行し、実際の20件を理由に失敗。
GREEN: 更新後lockの同じ監査は0件・終了コード0。
互換範囲の更新後は6件残り、override適用後もnpm11.19.1が古いPostCSS lockエントリを
保持して2件残った。npm lsがinvalidと判定したため、該当エントリのみを再解決対象にし、
npm install --package-lock-onlyで公式依存を解決し直した。
手作業で修正版番号だけを書き換えたり監査条件を弱めたりしていない。

ローカルlinux/arm64でクリーンnpm ci、format-check、lint-check、production build、
build後のtsc --noEmitがすべて成功した。Nextが生成する型が必要なのでbuildを先にする。
生成CSSは更新前と2ファイル、計49,740文字がバイト単位で一致した。
Inspectorはネットワークなしで設定を読み込み、静的画面を生成できた。

npm audit 0件は、登録済みのnpm監査項目が当日の依存木に見つからないという意味。
ネイティブライブラリ全体、未知の脆弱性、公開環境の安全性の保証ではない。
静的exportかつimages.unoptimizedの設定を維持するが、開発・ビルド環境も監査対象。
公開・デプロイ、既存コンテナの置換、実ブラウザの画面比較はこのPRでは行わない。

最終イメージの実インストールでもnpm audit --audit-level=lowは0件・exit 0、
npm ls --allもexit 0。npm run inspectによる静的出力をネットワークなしで再確認した。
4ページのHTTP200と不存在URLのHTTP404、Brotli/CA検査、正常TLSと問題証明書2経路の拒否が成功。
これらはローカルlinux/arm64での結果。GitHub CI、amd64、公開環境は別に扱う。
