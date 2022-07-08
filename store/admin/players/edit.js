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
    Id: null,
    Image: null,
    ImagePreview: null,
    data: {
        Name: null,
        Activity: null,
        NationalNumber: null,
        DateOfBirth: null,
        Age: null,
        Belt: null,
    },
});

export const getters = {
    getId(state) {
        return state.Id
    },
    getImage(state) {
        return state.Image
    },
    getImagePreview(state) {
        return state.ImagePreview
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
        commit("setName", { key: "Name", value: payload.data().Name })
        commit("setActivity", { key: "Activity", value: payload.data().Activity })
        commit("setNationalNumber", { key: "NationalNumber", value: payload.data().NationalNumber })
        commit("setDateOfBirth", { key: "DateOfBirth", value: payload.data().DateOfBirth })
        commit("setAge", { key: "Age", value: payload.data().Age })
        commit("setBelt", { key: "Belt", value: payload.data().Belt })
        commit("SetImagePreview", { key: "ImagePreview", value: payload.data().Image })
        commit("setId", { key: "Id", value: payload.id })
    },

    editInDB({ commit, state }, payload) {
        const db = getFirestore();
        const docRef = doc(db, "players", payload);
        const colRef = collection(db, "players");
        const storage = getStorage();
        const storageRef = ref(storage, `players/${state.Image?.name + state.Image?.lastModified}`);

        uploadBytes(storageRef, state.Image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(url => {
                let image = state.Image ? url : state.ImagePreview
                return updateDoc(docRef, { ...state.data, Image: image }).then(() => {
                    this.$toast.success("Edited successfully");
                })
            })
        });



    },
};



export const mutations = {
    setId(state, val) {
        state[val.key] = val.value
    },
    SetImagePreview(state, val) {
        state[val.key] = val.value
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
