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
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


export const state = () => ({
    AllData: [],
    Count: null,
    Image: null,
    data: {
        Name: null,
        Job: null,
        NationalNumber: null,
        StartDate: null,
    },
});

export const getters = {
    getAllData(state) {
        return state.AllData
    },
    getCount(state) {
        return state.AllData.length
    },
    getImage(state) {
        return state.Image
    },
    getName(state) {
        return state.data.Name
    },
    getJob(state) {
        return state.data.Job
    },
    getNationalNumber(state) {
        return state.data.NationalNumber
    },
    getStartDate(state) {
        return state.data.StartDate
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
        const colRef = collection(db, "admins");
        const storage = getStorage();
        const storageRef = ref(storage, `admins/${state.Image.name + state.Image.lastModified}`);

        uploadBytes(storageRef, state.Image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(url => {
                return addDoc(colRef, {
                    ...state.data,
                    Image: url,
                    createdAt: serverTimestamp(),
                }).then(() => {
                    this.$toast.success("Added successfully");
                    dispatch("resetData")
                }).catch((err) => {
                    console.warn("err :::", err)
                });
            })
        });


    },

    resetData({ commit }) {
        commit("setName", { key: "Name", value: null })
        commit("setJob", { key: "Job", value: null })
        commit("setNationalNumber", { key: "NationalNumber", value: null })
        commit("setStartDate", { key: "StartDate", value: null })
        commit("setImage", { key: "Image", value: null })
    }

};

export const mutations = {
    setAllData(state, val) {
        state.AllData = val
    },
    setImage(state, val) {
        state[val.key] = val.value
    },
    setName(state, val) {
        state.data[val.key] = val.value
    },
    setJob(state, val) {
        state.data[val.key] = val.value
    },
    setNationalNumber(state, val) {
        state.data[val.key] = val.value
    },
    setStartDate(state, val) {
        state.data[val.key] = val.value
    },
};
