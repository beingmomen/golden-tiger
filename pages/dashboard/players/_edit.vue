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
              :allData="getAllActivitiesData"
              notId
              lg="6"
            />
            <FormSelect
              :title="$t('inputs.belt')"
              label="Name"
              storeKey="Belt"
              :module="module"
              :allData="getAllBeltsData"
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
            <b-col lg="4" md="6" class="mb-3" style="width: 250px">
              <b-container fluid class="p-1 bg-dark">
                <b-row>
                  <b-col class="img-container">
                    <b-img
                      class="img"
                      thumbnail
                      fluid
                      :src="getPlayersPreiewImage"
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
const colRef = collection(db, "players");
const colRefActivity = collection(db, "activities");
const qActivity = query(colRefActivity, orderBy("createdAt", "asc"));
const colRefBelt = collection(db, "belts");
const qBelt = query(colRefBelt, orderBy("createdAt", "asc"));
export default {
  layout: "admin",
  name: "activity-edit",
  async asyncData({ store, params }) {
    const docRef = doc(db, "players", params.edit);
    await getDoc(docRef).then((res) => {
      store.dispatch("admin/players/edit/getAllDataFromApi", res);
    });
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
      module: "admin/players/edit",
    };
  },
  methods: {
    editData() {
      this.$refs.form.validate().then((res) => {
        if (res) {
          this.$store
            .dispatch("admin/players/edit/editInDB", this.$route.params.edit)
            .then(() => {
              this.$router.push("/dashboard/players");
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