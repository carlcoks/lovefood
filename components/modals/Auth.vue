<template>
  <ModalsOverlay
    :is-show="isShow"
    @close="commonStore.toggleShowAuthModal(false)"
  >
    <div class="modal-auth">
      <div class="modal-auth__header">
        <p class="modal-auth__title">
          Вход на сайт
        </p>

        <a
          href="#"
          rel="nofollow"
          class="modal-auth__close"
          @click.prevent="closeModal()"
        >
          <UIIcon name="close" />
        </a>
      </div>
      <p
        class="modal-auth__description"
      >
        {{ step === 'phone' ? 'Укажите номер телефона, чтобы войти на сайт' : 'Отправили код на номер:' }}
        <span
          v-if="step === 'code'"
          class="modal-auth__number"
        >
          {{ phone }}
          <a
            href="#"
            rel="nofollow"
            @click.prevent="step = 'phone'"
          >
            изменить
          </a>
        </span>
      </p>

      <form
        class="modal-auth__form"
        @submit.prevent="onSubmit()"
      >
        <transition
          name="fade"
          mode="out-in"
        >
          <div
            v-if="step === 'phone'"
            class="modal-auth__line"
          >
            <label
              for=""
              class="modal-auth__label"
            >
              Номер телефона
            </label>
            <vue-tel-input
              v-model="phone"
              mode="international"
              :auto-format="true"
              :dropdown-options="{
                showFlags: true,
                showDialCodeInList: true,
                showDialCodeInSelection: true,
                showSearchBox: true
              }"
              :input-options="{
                placeholder: 'Телефон',
                required: true
              }"
            />
          </div>

          <div
            v-else
            class="modal-auth__code"
          >
            <UICodeInput
              :fields="4"
              :field-width="48"
              :field-height="48"
              :is-error="isCodeError"
              @change="onChangeCode"
              @complete="onCompleteCode"
            />
            <div
              v-if="isCodeError"
              class="modal-auth__code-error"
            >
              <UIIcon name="close" />
              Неверный код
            </div>
          </div>
        </transition>

        <p class="modal-auth__note">
          Нажимая кнопку “Продолжить”, Вы принимаете <NuxtLink to="/">условия пользовательского соглашения</NuxtLink> и <NuxtLink to="/">политики конфиденциальности</NuxtLink>
        </p>
        <UIButton
          type="submit"
          color="yellow"
          class="modal-auth__button"
        >
          Продолжить
        </UIButton>
      </form>
    </div>
  </ModalsOverlay>
</template>

<script setup lang="ts">
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'

import { useCommonStore } from '@/store/common'

const commonStore = useCommonStore()

const isShow = ref(true)

const step = ref<'phone' | 'code'>('phone')
const phone = ref(null)
const code = ref(null)
const isCodeError = ref(false)

const closeModal = () => {
  isShow.value = false
}

const sendSms = () => {
  step.value = 'code'
}

const checkCode = () => {
  navigateTo('/lk')
  closeModal()
  // isCodeError.value = true
}

const onSubmit = () => {
  if (step.value === 'phone') {
    sendSms()
  } else if (step.value === 'code') {
    checkCode()
  }
}
</script>

<style lang="scss" scoped>
.modal-auth {
  width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  padding: 20px;

  background: $white;

  @include mq($bp-small) {
    min-height: auto;
    max-width: 442px;

    padding: 50px 60px;

    border-radius: 40px;
  }

  &__close {
    ::v-deep(.ui-icon) svg {
      width: 24px;
      height: 24px;

      path {
        fill: $blackText;
      }
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 20px;
  }

  &__title {
    @include h2;
  }

  &__description {
    display: flex;
    flex-direction: column;
    grid-gap: 10px;

    @include text_big;

    margin-bottom: 40px;
  }

  &__form {
    max-width: 360px;
    margin: 0 auto;
  }

  &__number {
    display: flex;
    align-items: center;
    grid-gap: 10px;

    @include text_normal;
    font-weight: 600;

    a {
      @include text_small;
      font-weight: 500;
      color: $orange;
    }
  }

  &__line {
    display: flex;
    flex-direction: column;
    grid-gap: 10px;
  }

  &__label {
    @include text_small;
    font-weight: 500;
    color: $grayText;
  }

  &__code {
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-gap: 10px;
  }

  &__code-error {
    display: flex;
    align-items: center;
    grid-gap: 10px;

    @include text_small;
    font-weight: 500;
    color: $red;

    ::v-deep(.ui-icon) svg {
      width: 16px;
      height: 16px;

      path {
        fill: $red;
      }
    }
  }

  &__note {
    margin-top: 40px;
    margin-bottom: 12px;

    @include text_mini;

    a {
      color: $blue;
    }
  }

  &__button {
    width: 100%;

    font-weight: 500;
  }
}

::v-deep .vue-tel-input {
  grid-gap: 10px;

  background: none;
  border: 0;
  box-shadow: none !important;

  .vti__selection {
    font-size: 14px;
    font-weight: 600;

    .vti__country-code {
      color: $black;
      margin: 0 5px;
    }

    .vti__dropdown-arrow {
      color: $grayText2;
    }
  }

  .vti__dropdown {
    padding: 0;
    background: none;
  }

  .vti__dropdown-list {
    width: 368px;
    max-height: 270px;

    padding: 20px;

    border: 0;
    border-radius: 20px;
    box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.08);

    &.below {
      top: calc(100% + 12px);
      left: -23px;
    }
  }

  .vti__search_box {
    width: calc(100% - 4px);

    margin: 0;

    border: 0;
  }

  .vti__dropdown-item {
    padding: 8px;

    &.highlighted {
      background-color: #f3f3f333;
    }
  }

  .vti__input {
    padding: 12px 16px;

    @include text_normal;
    font-weight: 500;

    background: $grayBg;
    border-radius: 14px;

    &::-webkit-input-placeholder {
      color: $grayText;
    }
    &:-moz-placeholder {
      color: $grayText;
      opacity:  1;
    }
    &::-moz-placeholder {
      color: $grayText;
      opacity:  1;
    }
    &:-ms-input-placeholder {
      color: $grayText;
    }
    &::-ms-input-placeholder {
      color: $grayText;
    }
    &::placeholder {
      color: $grayText;
    }
  }
}
</style>
