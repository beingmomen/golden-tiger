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
            <b-col lg="4" md="6" class="mb-3" style="width: 250px">
              <b-container fluid class="p-1 bg-dark">
                <b-row>
                  <b-col class="img-container">
                    <b-img
                      class="img"
                      thumbnail
                      fluid
                      :src="getCoachesPreiewImage"
                    />
                  </b-col>
                </b-row>
              </b-container>
            </b-col>
            <div class="col-12 text-end">
              <b-button @click="editData" variant="primary" class="add">
                {{ $t("buttons.edit") }}
              </b-button>
            </div>
          </b-row>
        </validation-observer>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
  limit,
  startAfter,
} from "firebase/firestore";
const db = getFirestore();
const colRef = collection(db, "coaches");
export default {
  layout: "admin",
  name: "activity-edit",
  async asyncData({ store, params }) {
    const docRef = doc(db, "coaches", params.edit);
    await getDoc(docRef).then((res) => {
      store.dispatch("admin/coaches/edit/getAllDataFromApi", res);
    });
    return {};
  },
  data() {
    return {
      module: "admin/coaches/edit",
    };
  },
  methods: {
    editData() {
      this.$refs.form.validate().then((res) => {
        if (res) {
          this.$store
            .dispatch("admin/coaches/edit/editInDB", this.$route.params.edit)
            .then(() => {
              this.$router.push("/dashboard/coaches");
            });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.img-container {
  width: 250px !important;
  height: 200px;
  .img {
    height: 100%;
    width: 100%;
  }
}
</style>