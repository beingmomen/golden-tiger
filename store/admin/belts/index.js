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
} from "firebase/firestore";


export const state = () => ({
    AllData: [],
    Count: null,
    data: {
        Name: null,
    },
});

export const getters = {
    getAllData(state) {
        return state.AllData
    },
    getCount(state) {
        return state.AllData.length
    },
    getName(state) {
        return state.data.Name
    },

};

export const actions = {

    getAllDataFromApi({ commit }, payload) {
        let arr = []
        payload.forEach((doc) => arr.push({ ...doc.data(), id: doc.id }))
        commit("setAllData", arr)
    },

    addToDB({ state, dispatch }, payload) {
        const db = getFirestore();
        const colRef = collection(db, "belts");
        return addDoc(colRef, {
            ...state.data,
            createdAt: serverTimestamp(),
        }).then(() => {
            this.$toast.success("Added successfully");
            dispatch("resetData")
        }).catch((err) => {
            console.warn("err :::", err)
        });
    },

    resetData({ commit }) {
        commit("setName", { key: "Name", value: null })
    }

};

export const mutations = {
    setAllData(state, val) {
        state.AllData = val
    },
    setName(state, val) {
        state.data[val.key] = val.value
    },

};
