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
              lg="6"
            />
            <FormInput
              :label="$t('inputs.job')"
              storeKey="Job"
              :module="module"
              lg="6"
            />

            <FormInput
              :label="$t('inputs.national_number')"
              storeKey="NationalNumber"
              :module="module"
              lg="6"
            />
            <FormDatePicker
              :title="$t('inputs.start_date')"
              storeKey="StartDate"
              :module="module"
              lg="6"
            />
            <FormFile
              :label="$t('inputs.image')"
              storeKey="Image"
              :module="module"
              lg="12"
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
      module: "admin/adminsWorkers",
    };
  },
  methods: {
    addData() {
      this.$refs.form.validate().then((res) => {
        if (res) {
          this.$store.dispatch("admin/adminsWorkers/addToDB").then(() => {
            console.warn("success");
            this.$router.push("/dashboard/admins-Worker");
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>