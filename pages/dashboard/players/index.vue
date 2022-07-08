<template>
  <div class="app-content content">
    <AdminPagesPlayersTable
      :headers="tableHeader"
      :items="getAllPlayersData"
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
const colRef = collection(db, "players");
const q = query(colRef, orderBy("createdAt", "asc"));
export default {
  layout: "admin",
  name: "players",
  async asyncData({ store }) {
    await getDocs(q).then((res) => {
      store.dispatch("admin/players/getAllDataFromApi", res);
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
          key: "Image",
          label: this.$t("tables.image"),
          sortable: false,
        },
        {
          key: "Activity.Name",
          label: this.$t("tables.activity"),
          sortable: false,
        },
        {
          key: "Belt",
          label: this.$t("tables.belt"),
          sortable: false,
        },
        {
          key: "NationalNumber",
          label: this.$t("tables.national_number"),
          sortable: false,
        },
        {
          key: "Age",
          label: this.$t("tables.age"),
          sortable: false,
        },
        {
          key: "DateOfBirth",
          label: this.$t("tables.date_of_Birth"),
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
        this.$store.dispatch("admin/players/getAllDataFromApi", res);
      });
    },
    deleteItem(id) {
      const docRef = doc(db, "players", id);
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