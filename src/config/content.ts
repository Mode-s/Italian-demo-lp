import type { ImageMetadata } from 'astro';
import { siteConfig } from './site';

//　ロゴ画像
import logoImg from '../assets/images/logo.png';

//　メニュー / プランイメージ画像
import item01 from '../assets/images/menu01-v1.png';
import item02 from '../assets/images/menu02-v1.png';
import item03 from '../assets/images/menu03-v1.png';
import item04 from '../assets/images/menu04-v1.png';
import item05 from '../assets/images/menu05-v1.png';

type Logo = { src: ImageMetadata; alt: string; href: string };
type NavItem = { label: string; href: string };
type Item = { image: ImageMetadata; name: string; price?: string; description?: string };

export const content = {
  header: {
    logo: {
      src: logoImg,
      alt: siteConfig.name,
      href: "/",
    } satisfies Logo,
    nav: [
      { label: "ABOUT",   href: "#" },
      { label: "MENU",    href: "#" },
      { label: "INFO",    href: "#" },
      { label: "ACCESS",  href: "#" },
      { label: "CONTACT", href: "#" },
    ] satisfies NavItem[],
  },
  //　メニュー
  menu: {
    title: "MENU",
    items: [
      { image: item01, name: "マルゲリータ", price: "￥1,780", description: "トマトソース、モッツァレラ、バジルの王道ピッツァ。シンプルだからこそ、素材の旨みが際立ちます。" },
      { image: item02, name: "ビアンカ", price: "￥1,880", description: "モッツァレラとリコッタ、グラナバダーノのコク。オリーブオイルが香る、チーズ好きのための一枚。" },
      { image: item03, name: "カルボナーラ", price: "￥1,680", description: "濃厚な卵とチーズのソースに、パンチェッタの旨みを重ねたローマの伝統パスタ。" },
      { image: item04, name: "ブロシュートとルッコラのサラダ", price: "￥1,380", description: "生ハムの塩気とルッコラの苦味が絶妙。グラナチーズとレモンの香りでさっぱりと。" },
      { image: item05, name: "ティラミス", price: "￥680", description: "マスカルポーネのなめらかさと、エスプレッソのほろ苦さが口の中でとろけます。" },
    ] satisfies Item[],
  },
} as const;