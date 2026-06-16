import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * メニューセクションのスタッキングアニメーション。
 * スクロールに応じて各ボックス（番号付き）が画面上部に固定され、
 * 後続のボックスが上に重なっていく演出。
 */
const initMenuStack = (): void => {
  const cards = gsap.utils.toArray<HTMLElement>('.menu .item');
  if (cards.length === 0) return;

  const mm = gsap.matchMedia();

  // モーション設定を尊重し、過度なアニメーションを避ける
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const triggers = cards.map((card) =>
      ScrollTrigger.create({
        trigger: card,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
      })
    );

    return () => triggers.forEach((trigger) => trigger.kill());
  });
};

/**
 * ヘッダーの登場演出（ロード時）。
 * ロゴ・ナビ・予約ボタンを上からふわっと表示する。
 */
const initHeaderIntro = (): void => {
  const header = document.querySelector<HTMLElement>('.header');
  if (!header) return;

  const targets = header.querySelectorAll<HTMLElement>(
    '.header-logo, .nav-item, .contact-link_pc'
  );
  if (targets.length === 0) return;

  gsap.from(targets, {
    autoAlpha: 0,
    y: -24,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.08,
    delay: 0.1,
    clearProps: 'transform,opacity,visibility',
  });
};

/**
 * ヒーロー画像の登場演出（ロード時）。
 * わずかにズームアウトしながらフェードインさせる。
 */
const initHeroIntro = (): void => {
  const heroImage = document.querySelector<HTMLElement>('.hero-image');
  if (!heroImage) return;

  gsap.from(heroImage, {
    autoAlpha: 0,
    scale: 1.08,
    duration: 1.6,
    ease: 'power2.out',
    transformOrigin: 'center center',
    clearProps: 'transform,opacity,visibility',
  });
};

type RevealVars = gsap.TweenVars & {
  scrollStart?: string;
};

/**
 * 指定要素をスクロールに応じてフェードアップ表示する汎用ヘルパー。
 * 各要素ごとに ScrollTrigger を作成する。
 */
const reveal = (targets: HTMLElement[], vars: RevealVars = {}): void => {
  const { scrollStart = 'top 85%', ...tweenVars } = vars;

  targets.forEach((el) => {
    gsap.from(el, {
      autoAlpha: 0,
      y: 40,
      duration: 0.9,
      ease: 'power3.out',
      clearProps: 'transform,opacity,visibility',
      ...tweenVars,
      scrollTrigger: {
        trigger: el,
        start: scrollStart,
      },
    });
  });
};

/**
 * 同一コンテナ内の子要素をまとめてスタッガー表示する。
 */
const revealStagger = (
  container: Element | null,
  childSelector: string,
  vars: RevealVars = {}
): void => {
  if (!container) return;
  const children = gsap.utils.toArray<HTMLElement>(
    container.querySelectorAll(childSelector)
  );
  if (children.length === 0) return;

  const { scrollStart = 'top 78%', ...tweenVars } = vars;

  gsap.from(children, {
    autoAlpha: 0,
    y: 40,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.12,
    clearProps: 'transform,opacity,visibility',
    ...tweenVars,
    scrollTrigger: {
      trigger: container,
      start: scrollStart,
    },
  });
};

/**
 * 各セクションのスクロール連動アニメーションをまとめて初期化。
 */
const initSectionReveals = (): void => {
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const ctx = gsap.context(() => {
      // 見出し（全セクション共通）
      reveal(gsap.utils.toArray<HTMLElement>('.section-title'), {
        x: -40,
        y: 0,
      });

      // ABOUT
      reveal(
        gsap.utils.toArray<HTMLElement>(
          '.about .label, .about .text-wrap .text'
        ),
        { stagger: 0.1 }
      );
      reveal(gsap.utils.toArray<HTMLElement>('.about .deco-wrap-second'), {
        y: 60,
      });

      // MENU（スタッキングは維持しつつ、各カードの中身を表示）
      gsap.utils
        .toArray<HTMLElement>('.menu .item')
        .forEach((item) => {
          const img = item.querySelector<HTMLElement>('.img-wrap');
          const body = item.querySelector<HTMLElement>('.body');

          if (img) {
            gsap.from(img, {
              autoAlpha: 0,
              x: 60,
              duration: 1,
              ease: 'power3.out',
              clearProps: 'transform,opacity,visibility',
              scrollTrigger: { trigger: item, start: 'top 70%' },
            });
          }
          if (body) {
            gsap.from(body, {
              autoAlpha: 0,
              y: 50,
              duration: 1,
              ease: 'power3.out',
              delay: 0.1,
              clearProps: 'transform,opacity,visibility',
              scrollTrigger: { trigger: item, start: 'top 70%' },
            });
          }
        });

      // INFO（行をスタッガー表示 + 背景をパララックス）
      revealStagger(document.querySelector('.info-list'), '.info-row', {
        stagger: 0.08,
      });

      const infoBg = document.querySelector<HTMLElement>('.info-bg');
      const infoSection = document.querySelector<HTMLElement>('.info');
      if (infoBg && infoSection) {
        gsap.to(infoBg, {
          ease: 'none',
          scrollTrigger: {
            trigger: infoSection,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // ACCESS
      reveal(
        gsap.utils.toArray<HTMLElement>('.access .address, .access-map'),
        { stagger: 0.1 }
      );

      // CONTACT
      reveal(gsap.utils.toArray<HTMLElement>('.contact .text'), {});
      reveal(gsap.utils.toArray<HTMLElement>('.contact .tel'), { y: 30 });
      revealStagger(document.querySelector('.contact .sns-list'), '.sns-item', {
        stagger: 0.1,
      });

      // FOOTER
      revealStagger(
        document.querySelector('.footer-inner'),
        '.logo-link, .shop-wrap',
        { scrollStart: 'top 90%' }
      );
    });

    return () => ctx.revert();
  });
};

const onReady = (): void => {
  initHeaderIntro();
  initHeroIntro();
  initMenuStack();
  initSectionReveals();

  // 画像などの読み込み後にレイアウトを再計算
  window.addEventListener('load', () => ScrollTrigger.refresh());
};

if (document.readyState !== 'loading') {
  onReady();
} else {
  document.addEventListener('DOMContentLoaded', onReady);
}
