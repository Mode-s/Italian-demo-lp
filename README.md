## アイコンの使用方法

[astro-icon](https://github.com/natemoo-re/astro-icon) を使用しています。
アイコンセットは [mdi](https://icon-sets.iconify.design/mdi/) を使用しています。

### 使い方

使用するコンポーネントで `Icon` をimportして使います。

```astro
---
import { Icon } from 'astro-icon/components';
---

<Icon name="mdi:アイコン名" />
```

アイコン名は [Iconify](https://icon-sets.iconify.design/mdi/) で検索できます。