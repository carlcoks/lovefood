<template>
  <div class="index-menu-card">
    <div
      class="index-menu-card__image"
      @click.prevent="isShowModal = true"
    >
      <img src="@/assets/images/menu-card-example.png" alt="">

      <span class="index-menu-card__discount">
        -25%
      </span>
      
      <button
        :class="['index-menu-card__favorite', { 'active' : isFavorite }]"
        @click.stop.prevent="isFavorite = !isFavorite"
      >
        <UIIcon name="heart" />
      </button>

      <div class="index-menu-card__types">
        <div class="index-menu-card-type">
          <UIIcon name="icon-halal" />
        </div>
        <div class="index-menu-card-type">
          <UIIcon name="icon-hit" />
        </div>
        <div class="index-menu-card-type">
          <UIIcon name="icon-vegan" />
        </div>
        <div class="index-menu-card-type">
          <UIIcon name="icon-hot" />
        </div>
      </div>
    </div>

    <div class="index-menu-card__content">
      <p
        class="index-menu-card__name"
        @click.prevent="isShowModal = true"
      >
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
        class="index-menu-card__button"
      >
        <UIIcon name="add" />
        В корзину
      </UIButton>
    </div>

    <ModalsProduct
      v-if="isShowModal"
      @close="isShowModal = false"
    />
  </div>
</template>

<script setup>
const isFavorite = ref(false)
const isShowModal = ref(false)
</script>

<style lang="scss" scoped>
.index-menu-card {
  display: flex;
  flex-direction: column;
  grid-gap: 12px;

  padding-bottom: 10px;

  background: $white;
  border-radius: 20px;

  @include mq($bp-small) {
    grid-gap: 20px;
  }

  &__image {
    position: relative;
    width: 100%;
    height: 212px;

    border-radius: 20px;
    border: 1px solid $grayBg;
    overflow: hidden;

    cursor: pointer;

    @include mq($bp-small) {
      height: 316px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__discount {
    position: absolute;
    top: 16px;
    left: 16px;

    padding: 4px 12px;

    @include text_mini;
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

    display: flex;
    align-items: center;
    flex-direction: row-reverse;
  }

  &__content {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
  }

  &__name {
    margin-bottom: 12px;

    @include overflow-text;
    @include text_big;
    font-weight: 600;

    cursor: pointer;

    @include mq($bp-small) {
      margin-bottom: 20px;
    }
  }

  &__description {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__info {
    display: none;

    @include mq($bp-small) {
      display: flex;
      align-items: center;

      color: $grayText;
      @include text_mini;

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
  }

  &__price {
    display: flex;
    align-items: center;
    grid-gap: 6px;

    color: $orange;

    @include text_normal;
    font-weight: 600;

    small {
      @include extra_small;
      color: $grayText;
      text-decoration: line-through;
    }
  }

  &__button {
    margin-top: 15px;

    font-weight: 500;
  }
}

.index-menu-card-type {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;

  margin-left: -7px;

  background: $white;
  border-radius: 50%;
  box-shadow: 1px 0px 10px 0px rgba(0, 0, 0, 0.05);

  &:last-child {
    margin-left: 0;
  }

  .ui-icon {
    width: 20px;
    height: 20px;
  }
}
</style>