<template>
  <ModalsOverlay
    :is-show="isShow"
    @close="emits('close')"
  >
    <div class="modal-filters">
      <div class="modal-filters__main">
        <div class="modal-filters__header">
          <p class="modal-filters__title">
            Фильтры
          </p>

          <a
            href="#"
            class="modal-filters__close"
            @click.prevent="closeModal()"
          >
            <UIIcon name="close" />
          </a>
        </div>

        <div class="modal-filters__list">
          <div class="modal-filters__item modal-filters-item">
            <div class="modal-filters-item__header">
              <p class="modal-filters-item__title">
                Цена
              </p>
              <UIIcon
                name="arrow"
                class="modal-filters-item__arrow"
              />
            </div>
          </div>

          <div class="modal-filters__item modal-filters-item">
            <div class="modal-filters-item__header">
              <p class="modal-filters-item__title">
                Цена
              </p>
              <UIIcon
                name="arrow"
                class="modal-filters-item__arrow"
              />
            </div>
          </div>

          <div class="modal-filters__item modal-filters-item">
            <div class="modal-filters-item__header">
              <p class="modal-filters-item__title">
                Название фильтра
              </p>
              <UIIcon
                name="arrow"
                class="modal-filters-item__arrow"
              />
            </div>
          </div>

          <div class="modal-filters__item modal-filters-item">
            <div class="modal-filters-item__header">
              <p class="modal-filters-item__title">
                Бесплатная доставка
              </p>
              <UISwitcher />
            </div>
          </div>
        </div>
      </div>

      <div class="modal-filters__footer">
        <div class="modal-filters__buttons">
          <UIButton
            color="gray"
            class="modal-filters__button"
            @click="closeModal()"
          >
            Отмена
          </UIButton>

          <UIButton
            color="yellow"
            class="modal-filters__button"
            @click="closeModal()"
          >
            Применить фильтры
          </UIButton>
        </div>
      </div>
    </div>
  </ModalsOverlay>
</template>

<script setup>
const emits = defineEmits(['close'])

const isShow = ref(true)

const closeModal = () => {
  isShow.value = false
}
</script>

<style lang="scss" scoped>
.modal-filters {
  width: 100vw;
  max-width: 640px;

  display: flex;
  flex-direction: column;

  background: $white;
  border-radius: 40px;

  &__main {
    display: flex;
    flex-direction: column;
    grid-gap: 15px;

    padding: 50px 60px 145px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    @include h2;
  }

  &__close {
    ::v-deep(.ui-icon) svg {
      width: 24px;
      height: 24px;

      path {
        fill: $grayText;
      }
    }
  }

  &__list {
    display: flex;
    flex-direction: column;

    grid-gap: 15px;
  }

  &__footer {
    display: flex;
    flex-direction: column;
    grid-gap: 20px;

    padding: 40px 60px 50px;

    border-top: 1px solid $grayBg2;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
  }

  &__buttons {
    display: flex;
    align-items: center;
    grid-gap: 16px;
  }

  &__button {
    font-weight: 500;
  }
}

.modal-filters-item {
  display: flex;
  flex-direction: column;

  border-bottom: 1px solid $grayBg;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 15px 0;

    cursor: pointer;
  }

  &__title {
    @include text_large;
    font-weight: 700;
  }

  &__arrow {
    transform: rotate(90deg);
  }

  &__block {
    height: 0;
    overflow: hidden;
    transition: height 0.3s;
  }

  &__content {
    padding-top: 5px;
  }
}
</style>