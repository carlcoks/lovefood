<template>
  <div class="index-menu-card">
    <div class="index-menu-card__image">
      <span class="index-menu-card__discount">
        -25%
      </span>
      
      <button
        :class="['index-menu-card__favorite', { 'active' : isFavorite }]"
        @click.prevent="isFavorite = !isFavorite"
      >
        <UIIcon name="heart" />
      </button>

      <img src="@/assets/images/menu-card-example.png" alt="">

      <!-- <div class="index-menu-card__types"></div> -->
    </div>

    <div class="index-menu-card__content">
      <p class="index-menu-card__name">
        Желтохвост
      </p>

      <div class="index-menu-card__description">
        <p class="index-menu-card__info">
          <span>
            100 гр
          </span>
          <span>
            1680 ₽/шт
          </span>
        </p>

        <p class="index-menu-card__price">
          <small>
            1 880 ₽
          </small>
          1 680 ₽
        </p>
      </div>

      <UIButton
        color="gray"
        class="index-menu-card__add"
      >
        <UIIcon name="add" />
        В корзину
      </UIButton>
    </div>
  </div>
</template>

<script setup>
const isFavorite = ref(false)
</script>

<style lang="scss" scoped>
.index-menu-card {
  display: flex;
  flex-direction: column;
  grid-gap: 20px;

  padding-bottom: 10px;

  background: $white;
  border-radius: 20px;

  &__image {
    position: relative;
    width: 100%;
    height: 316px;

    border-radius: 20px;
    border: 1px solid $grayBg;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__discount {
    @include text_mini;

    position: absolute;
    top: 16px;
    left: 16px;

    padding: 4px 12px;

    font-weight: 600;

    background: $grayBg;
    border-radius: 16px;
  }

  &__favorite {
    position: absolute;
    top: 0;
    right: 0;

    padding: 16px;

    &.active {
      ::v-deep(.ui-icon) svg path {
        fill: $orange;
      }
    }
  }

  &__types {
    position: absolute;
    left: 16px;
    bottom: 16px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
  }

  &__name {
    @include overflow-text;
    white-space: nowrap;

    margin-bottom: 20px;

    font-size: 20px;
    font-weight: 600;
    line-height: 23px;
    letter-spacing: 0.2px;
  }

  &__description {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__info {
    @include text_mini;
    font-weight: 400;
    color: $grayText;

    display: flex;
    align-items: center;

    span {
      display: flex;
      align-items: center;

      &:after {
        content: url('@/assets/svg/dot-middle.svg');
        display: flex;
        align-items: center;
        margin: 0 10px;
      }

      &:last-child {
        &:after {
          display: none;
        }
      }
    }
  }

  &__price {
    @include text_normal;
    font-weight: 600;
    color: $orange;

    display: flex;
    align-items: center;
    grid-gap: 6px;

    small {
      color: $grayText;
      font-weight: 400;
      font-size: 10px;
      line-height: 11.5px;
      text-decoration: line-through;
    }
  }

  &__add {
    margin-top: 15px;
  }
}
</style>