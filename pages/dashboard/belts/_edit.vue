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
const colRef = collection(db, "belts");
export default {
  layout: "admin",
  name: "activity-edit",
  async asyncData({ store, params }) {
    const docRef = doc(db, "belts", params.edit);
    await getDoc(docRef).then((res) => {
      store.dispatch("admin/belts/edit/getAllDataFromApi", res);
    });
    return {};
  },
  data() {
    return {
      module: "admin/belts/edit",
    };
  },
  methods: {
    editData() {
      this.$refs.form.validate().then((res) => {
        if (res) {
          this.$store
            .dispatch("admin/belts/edit/editInDB", this.$route.params.edit)
            .then(() => {
              this.$router.push("/dashboard/belts");
            });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>