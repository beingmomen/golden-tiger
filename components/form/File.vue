<template>
  <b-col :lg="lg" :md="md" :sm="sm" class="mt-1">
    <b-form-group>
      <validation-provider #default="{ errors }" :name="label" rules="">
        <label :class="required ? 'required' : ''"> {{ label }}</label>
        <!-- <b-form-input
        style="height: 35px"
        v-model="getContent"
        :disabled="disabled"
      /> -->
        <b-form-file
          style="height: 35px"
          v-model="getContent"
          :class="{ 'file-rtl': dashDir == 'rtl' }"
          :placeholder="$t('inputs.file_placeholder')"
          drop-placeholder="Drop file here..."
          :disabled="disabled"
        />
        <small class="text-danger">{{ errors[0] }}</small>
      </validation-provider>
    </b-form-group>
  </b-col>
</template>

<script>
export default {
  props: {
    label: String,
    module: String,
    storeKey: String,
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    lg: {
      type: String,
      default: "3",
    },
    md: {
      type: String,
      default: "6",
    },
    sm: {
      type: String,
      default: "12",
    },
  },
  mounted() {},
  data() {
    return {};
  },
  computed: {
    getContent: {
      get: function () {
        return this.$store.getters[`${this.module}/get${this.storeKey}`];
      },
      set(val) {
        this.$store.commit(`${this.module}/set${this.storeKey}`, {
          key: this.storeKey,
          value: val,
        });
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.required {
  position: relative;
  &::after {
    position: absolute;
    content: "*";
    font-size: 25px;
    bottom: -6px;
    left: -10px;
    color: #ea5455;
  }
}
</style>