export const siteConfig = {
  name: "企業名 : 店舗名", //　企業名、店舗名
  title: "ページタイトル",
  description: "ディスクリプション文",
  url: "https://example.com",      // 本番URL（OGPの絶対パス生成にも使う）
  ogImage: "/ogp.png",
  lang: "ja",
  locale: "ja_JP",
  // SNS
  sns: {
    x: "https://x.com", //　x - URL
    instagram: "https://instagram.com", //　instagram - URL
    line: "https://line.com", //　line - URL
    facebook: "https://facebook.com", //　facebook - URL
  },

  //　基本情報
  shop: {
    tel: {
      display: "123-4567-8910", //　表示用
      link: "12345678910", //　tel：リンク用（ハイフンなし）
    },
    email: "example@example.com", //　メールアドレス
    address: "〒123-4567 東京都", //　住所
    access: "東京駅", //　最寄駅
    hours: "10:00～19:00", //　営業時間
    closed: "土日", //　定休日
    seats: "50", //　席数
    parking: "なし", //　駐車場
    reservationUrl: "", //　予約ページURL
    website: "",        //　ホームページURL（別サイトがある場合）
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6477.544978197618!2d139.71582599060827!3d35.73181344954737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188d6ff128b8f1%3A0x681cf2050621738a!2z44CSMTcwLTAwMTMg5p2x5Lqs6YO96LGK5bO25Yy65p2x5rGg6KKL77yS5LiB55uu!5e0!3m2!1sja!2sjp!4v1781078155765!5m2!1sja!2sjp", //　Googleマップ埋め込み用のURL
  },
} as const;