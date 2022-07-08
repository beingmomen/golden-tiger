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
              :label="$t('inputs.national_number')"
              storeKey="NationalNumber"
              :module="module"
              lg="6"
            />
            <FormSelect
              :title="$t('inputs.activity')"
              label="Name"
              storeKey="Activity"
              :module="module"
              :allData="[{ id: 0, Name: 'Choose' }, ...getAllActivitiesData]"
              notId
              lg="6"
            />
            <FormSelect
              :title="$t('inputs.belt')"
              label="Name"
              storeKey="Belt"
              :module="module"
              :allData="[{ id: 0, Name: 'Choose' }, ...getAllBeltsData]"
              notId
              lg="6"
            />
            <FormDatePicker
              :title="$t('inputs.date_of_Birth')"
              storeKey="DateOfBirth"
              :module="module"
              lg="6"
            />
            <FormFile
              :label="$t('inputs.image')"
              storeKey="Image"
              :module="module"
              lg="6"
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
const colRefActivity = collection(db, "activities");
const qActivity = query(colRefActivity, orderBy("createdAt", "asc"));
const colRefBelt = collection(db, "belts");
const qBelt = query(colRefBelt, orderBy("createdAt", "asc"));
export default {
  layout: "admin",
  name: "new-player",
  async asyncData({ store }) {
    await getDocs(qActivity).then((res) => {
      store.dispatch("admin/activities/getAllDataFromApi", res);
    });
    await getDocs(qBelt).then((res) => {
      store.dispatch("admin/belts/getAllDataFromApi", res);
    });
    return {};
  },
  data() {
    return {
      module: "admin/players",
    };
  },
  methods: {
    addData() {
      this.$refs.form.validate().then((res) => {
        console.warn("res :::", res);
        // if (res) {
        //   this.$store.dispatch("admin/players/addToDB").then(() => {
        //     console.warn("success");
        //     this.$router.push("/dashboard/players");
        //   });
        // }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>