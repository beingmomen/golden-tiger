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
        Activity: "Choose",
        NationalNumber: null,
        DateOfBirth: null,
        Age: null,
        Belt: "Choose",
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
    getActivity(state) {
        return state.data.Activity
    },
    getNationalNumber(state) {
        return state.data.NationalNumber
    },
    getDateOfBirth(state) {
        return state.data.DateOfBirth
    },
    getAge(state) {
        return state.data.Age
    },
    getBelt(state) {
        return state.data.Belt
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
        const colRef = collection(db, "players");
        const storage = getStorage();
        const storageRef = ref(storage, `players/${state.Image.name + state.Image.lastModified}`);

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
        commit("setActivity", { key: "activity", value: null })
        commit("setNationalNumber", { key: "NationalNumber", value: null })
        commit("setDateOfBirth", { key: "DateOfBirth", value: null })
        commit("setAge", { key: "Age", value: null })
        commit("setBelt", { key: "belt", value: null })
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
    setActivity(state, val) {
        state.data[val.key] = val.value
    },
    setNationalNumber(state, val) {
        state.data[val.key] = val.value
    },
    setDateOfBirth(state, val) {
        state.data[val.key] = val.value
        let birthDate = new Date(val.value);

        // get difference from current date;
        let difference = Date.now() - birthDate.getTime();

        let ageDate = new Date(difference);
        let calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);

        state.data.Age = calculatedAge
    },
    setAge(state, val) {
        state.data[val.key] = val.value
    },
    setBelt(state, val) {
        state.data[val.key] = val.value
    },
};
