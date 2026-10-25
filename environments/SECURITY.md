# コンテナ再ビルド時のセキュリティ確認（2026-10-25）

今回の目的は、ローカルで適用したBrotli修正が再ビルドで失われないようにすること。
ホスト設定、認証情報、既存コンテナ、依存ロックは変更しない。既存タグ・成果物は
バックアップとして保持し、新しいタグで構築・検証してから利用先を切り替える。
この変更だけで既存コンテナや配布済みイメージが更新されるわけではない。

根拠は[Node.js公式告知](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases)と
[Debian公式追跡情報](https://security-tracker.debian.org/tracker/CVE-2026-111497)。
Debianは修正をバックポートするため、Brotliの上流バージョン番号だけでは判断しない。
以下は2026-10-25時点の基準であり、将来の全脆弱性への安全性を保証しない。

対象はTerraform用Dockerfile。Terraform 1.10.3を公式digestに固定し、
Alpine 3.21のbrotli-libs >=1.1.1-r0、ca-certificates-bundle >=20261020-r0を要求する。
TFLintは従来の0.59.1を維持する。旧master/install_linux.shは404だったため、
[公式リリース](https://github.com/terraform-linters/tflint/releases/tag/v0.59.1)の
アーカイブを取得し、公開SHA-256との一致を必須にした。amd64/arm64以外はビルドを停止する。

```sh
build_context=$(mktemp -d)
cp environments/Dockerfile.terraform "$build_context/Dockerfile"
docker build -t terraform-security:review "$build_context"
sh environments/check-container-security.sh terraform-security:review
```

秘密情報をbuild contextに入れないため、Dockerfileだけの一時ディレクトリからのビルドを推奨する。
ローカルlinux/arm64でビルド、Brotli/CAの最低版、Terraform/TFLint/curlの起動を確認。
amd64の実行検証、クラウドへのplan/applyは未実施。フロントエンドのNode 23からの移行は
別の互換性検証が必要で、このTerraform修正の完了をもって対策済みとはしない。


検査は先に作成し、修正前イメージでは未修正Node/システムBrotliまたは旧Playwright起動経路を
理由に失敗（RED）、修正後のイメージでは成功（GREEN）した。
ShellCheckも実施。GitHub CIの成功やデプロイの成功を意味するものではない。
Python wheel等に独自に内包されたライブラリまですべて修正したという主張ではない。

再ビルドしたcurlでpypi.orgへの正常TLS接続と、問題証明書の検査専用ホスト2経路が
証明書検証エラー（終了コード60）になることを確認した。
