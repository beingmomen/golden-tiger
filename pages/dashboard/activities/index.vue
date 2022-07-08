<template>
  <div class="app-content content">
    <AdminPagesActivitiesTable
      :headers="tableHeader"
      :items="getAllActivitiesData"
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
const colRef = collection(db, "activities");
const q = query(colRef, orderBy("createdAt", "asc"));
export default {
  layout: "admin",
  async asyncData({ store }) {
    await getDocs(q).then((res) => {
      store.dispatch("admin/activities/getAllDataFromApi", res);
    });
    return {};
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
        this.$store.dispatch("admin/activities/getAllDataFromApi", res);
      });
    },
    deleteItem(id) {
      const docRef = doc(db, "activities", id);
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