<template>
  <div class="app-content content">
    <AdminPagesCoachesTable
      :headers="tableHeader"
      :items="getAllCoachesData"
      @deleteItem="deleteItem"
    />
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
const q = query(colRef, orderBy("createdAt", "asc"));
export default {
  layout: "admin",
  name: "coaches",
  async asyncData({ store }) {
    await getDocs(q).then((res) => {
      store.dispatch("admin/coaches/getAllDataFromApi", res);
    });
    return {};
  },
  mounted() {
    this.loadData();
  },
  data() {
    return {
      tableHeader: [
        {
          key: "Name",
          label: this.$t("tables.name"),
          sortable: false,
        },
        {
          key: "Job",
          label: this.$t("tables.job"),
          sortable: false,
        },
        {
          key: "Image",
          label: this.$t("tables.image"),
          sortable: false,
        },
        {
          key: "NationalNumber",
          label: this.$t("tables.national_number"),
          sortable: false,
        },
        {
          key: "StartDate",
          label: this.$t("tables.start_date"),
          sortable: false,
        },
        {
          key: "actions",
          label: this.$t("tables.actions"),
          sortable: false,
        },
      ],
    };
  },
  methods: {
    loadData() {
      onSnapshot(q, (res) => {
        this.$store.dispatch("admin/coaches/getAllDataFromApi", res);
      });
    },
    deleteItem(id) {
      const docRef = doc(db, "admins", id);
      deleteDoc(docRef).then(() => {
        this.$toast.success("Deleted successfully");
        this.loadData();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>