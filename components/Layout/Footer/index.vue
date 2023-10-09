<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <div class="footer__col">
          <a
            href="tel:+79191232340"
            target="_blank"
            class="footer__phone"
          >
            +7 919 123 23 40
          </a>
          <p class="footer__time">
            <UIIcon name="clock" />
            c 9:00 до 20:00
          </p>
        </div>

        <div class="footer__row">

        </div>

        <div class="footer__col">
          <div class="footer__block">
            <p class="footer__title">
              В приложении ещё удобнее
            </p>
            <div class="footer__apps">
              <a
                href="/"
                target="_blank"
                rel="nofollow"
                class="footer-app"
              >
                <img src="@/assets/images/google.png" alt="Google App">
                <div class="footer-app__content">
                  <p class="footer-app__label">
                    Доступно в
                  </p>
                  <p class="footer-app__value">
                    Google Play
                  </p>
                </div>
              </a>
              <a
                href="/"
                target="_blank"
                rel="nofollow"
                class="footer-app"
              >
                <img src="@/assets/images/apple.png" alt="Apple App">
                <div class="footer-app__content">
                  <p class="footer-app__label">
                    Загрузите в
                  </p>
                  <p class="footer-app__value">
                    App Store
                  </p>
                </div>
              </a>
            </div>
          </div>

          <div class="footer__block">
            <p class="footer__title">
              Мы в социальных сетях
            </p>
            <div class="footer__socials">
              <a
                href="/"
                target="_blank"
                rel="nofollow"
                class="footer-social"
              >
                <img src="@/assets/images/socials/ig.png" alt="">
              </a>
              <a
                href="/"
                target="_blank"
                rel="nofollow"
                class="footer-social"
              >
                <img src="@/assets/images/socials/vk.png" alt="">
              </a>
              <a
                href="/"
                target="_blank"
                rel="nofollow"
                class="footer-social"
              >
                <img src="@/assets/images/socials/fb.png" alt="">
              </a>
              <a
                href="/"
                target="_blank"
                rel="nofollow"
                class="footer-social"
              >
                <img src="@/assets/images/socials/tg.png" alt="">
              </a>
              <a
                href="/"
                target="_blank"
                rel="nofollow"
                class="footer-social"
              >
                <img src="@/assets/images/socials/wa.png" alt="">
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <p class="footer__copy">
          ЛюблюЕду © 2021. Все права защищены.
        </p>

        <button
          class="footer__to-top"
        >
          <UIIcon name="arrow" />
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.footer {
  padding: 70px 0 40px;

  background: $grayBg2;

  &__box {
    display: flex;
    flex-direction: column;
  }

  &__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &__col {
    display: flex;
    flex-direction: column;
  }

  &__phone {
    margin-bottom: 9px;

    font-size: 36px;
    font-weight: 700;
    line-height: 41.4px;
    letter-spacing: 0.36px;
  }

  &__time {
    display: flex;
    align-items: center;
    grid-gap: 10px;

    padding-left: 4px;

    color: $grayText;
    font-size: 20px;
    font-weight: 600;
    line-height: 23px;
    letter-spacing: 0.2px;
  }

  &__block {
    display: flex;
    flex-direction: column;
    grid-gap: 20px;

    margin-bottom: 40px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__title {
    color: $grayText2;
    font-size: 24px;
    font-weight: 700;
    line-height: 27.6px;
    letter-spacing: 0.24px;
  }

  &__apps {
    display: flex;
    align-items: flex-start;
    grid-gap: 30px;
  }

  &__socials {
    display: flex;
    align-items: center;
    grid-gap: 40px;
  }

  &__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 50px;
    padding-top: 22px;

    border-top: 1px solid #D9D9D9;
  }

  &__copy {
    color: $grayText;
    font-size: 20px;
    line-height: 23px;
    letter-spacing: 0.2px;
  }

  &__to-top {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 44px;
    height: 44px;
    background: $orange;
    border-radius: 50%;

    .ui-icon {
      transform: rotate(-90deg);
      ::v-deep svg path{
        fill: $white;
      }
    }
  }
}

.footer-app {
  display: flex;
  align-items: center;
  grid-gap: 15px;

  height: 48px;

  padding: 0 20px;

  background: $white;
  border-radius: 14px;

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__label {
    @include text_mini;
    font-weight: 400;
  }

  &__value {
    @include text_normal;
    font-weight: 600;
  }
}
</style>
