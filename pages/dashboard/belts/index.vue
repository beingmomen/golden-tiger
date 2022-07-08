<template>
  <div class="app-content content">
    <AdminPagesBeltsTable
      :headers="tableHeader"
      :items="getAllBeltsData"
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
const colRef = collection(db, "belts");
const q = query(colRef, orderBy("createdAt", "asc"));
export default {
  layout: "admin",
  async asyncData({ store }) {
    await getDocs(q).then((res) => {
      store.dispatch("admin/belts/getAllDataFromApi", res);
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
        this.$store.dispatch("admin/belts/getAllDataFromApi", res);
      });
    },
    deleteItem(id) {
      const docRef = doc(db, "belts", id);
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