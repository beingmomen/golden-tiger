<template>
  <div class="app-content content">
    <b-card no-body class="card-statistics">
      <b-card-body class="statistics-body">
        <validation-observer ref="form">
          <b-row class="justify-content-between">
            <FormInput
              :label="$t('inputs.name')"
              storeKey="Name"
              :module="module"
            />
            <div class="col-12 text-end">
              <b-button @click="addData" variant="primary" class="add">
                {{ $t("buttons.add") }}
              </b-button>
            </div>
          </b-row>
        </validation-observer>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      module: "admin/activities",
    };
  },
  methods: {
    addData() {
      this.$refs.form.validate().then((res) => {
        if (res) {
          this.$store.dispatch("admin/activities/addToDB").then(() => {
            console.warn("success");
            this.$router.push("/dashboard/activities");
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>