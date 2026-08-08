<script>
import Modal from '../../Modal.vue';
import NextButton from 'dashboard/components-next/button/Button.vue';

export default {
  components: {
    Modal,
    NextButton,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    confirmLabel: {
      type: String,
      default: '',
    },
    cancelLabel: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    show: false,
    resolvePromise: undefined,
    rejectPromise: undefined,
  }),

  methods: {
    showConfirmation() {
      this.show = true;
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });
    },
    confirm() {
      this.resolvePromise(true);
      this.show = false;
    },

    cancel() {
      this.resolvePromise(false);
      this.show = false;
    },
  },
};
</script>

<template>
  <Modal v-model:show="show" :on-close="cancel">
    <div class="h-auto overflow-auto flex flex-col">
      <woot-modal-header
        :header-title="title || $t('CONFIRMATION_MODAL.TITLE')"
        :header-content="description || $t('CONFIRMATION_MODAL.DESCRIPTION')"
      />
      <div class="flex flex-row justify-end gap-2 py-4 px-6 w-full">
        <NextButton
          faded
          type="reset"
          :label="cancelLabel || $t('CONFIRMATION_MODAL.CANCEL')"
          @click="cancel"
        />
        <NextButton
          type="submit"
          :label="confirmLabel || $t('CONFIRMATION_MODAL.CONFIRM')"
          @click="confirm"
        />
      </div>
    </div>
  </Modal>
</template>
