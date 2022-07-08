<template>
  <div class="app-content content">
    <CardsLargeCard :items="statisticsItems" />
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

export default {
  layout: "admin",
  name: "index",
  async asyncData({ store }) {
    const colRefActivities = collection(db, "activities");
    const qActivities = query(colRefActivities, orderBy("createdAt", "asc"));
    await getDocs(qActivities).then((res) => {
      store.dispatch("admin/activities/getAllDataFromApi", res);
    });
    const colRefAdmins = collection(db, "admins");
    const qAdmins = query(colRefAdmins, orderBy("createdAt", "asc"));
    await getDocs(qAdmins).then((res) => {
      store.dispatch("admin/adminsWorkers/getAllDataFromApi", res);
    });
    const colRefCoaches = collection(db, "coaches");
    const qCoaches = query(colRefCoaches, orderBy("createdAt", "asc"));
    await getDocs(qCoaches).then((res) => {
      store.dispatch("admin/coaches/getAllDataFromApi", res);
    });
    const colRefPlayers = collection(db, "players");
    const qPlayers = query(colRefPlayers, orderBy("createdAt", "asc"));
    await getDocs(qPlayers).then((res) => {
      store.dispatch("admin/players/getAllDataFromApi", res);
    });
    const colRefBelts = collection(db, "belts");
    const qBelts = query(colRefBelts, orderBy("createdAt", "asc"));
    await getDocs(qBelts).then((res) => {
      store.dispatch("admin/belts/getAllDataFromApi", res);
    });
    return {};
  },
  mounted() {},
  data() {
    return {
      statisticsItems: [
        {
          icon: "TrendingUpIcon",
          color: "light-primary",
          title: this.getActivitiesCount,
          subtitle: "Activities",
          customClass: "mb-2 mb-xl-0",
        },
        {
          icon: "UserIcon",
          color: "light-info",
          title: "8.549k",
          subtitle: "Admins & Workers",
          customClass: "mb-2 mb-xl-0",
        },
        {
          icon: "BoxIcon",
          color: "light-danger",
          title: "1.423k",
          subtitle: "Coaches",
          customClass: "mb-2 mb-sm-0",
        },
        {
          icon: "DollarSignIcon",
          color: "light-success",
          title: "$9745",
          subtitle: "Players",
          customClass: "",
        },
        {
          icon: "DollarSignIcon",
          color: "light-success",
          title: "$9745",
          subtitle: "Belts",
          customClass: "",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
