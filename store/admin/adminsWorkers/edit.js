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
        Job: null,
        NationalNumber: null,
        StartDate: null,
    },
});

export const getters = {
    getName(state) {
        return state.data.Name
    },
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
        commit("setName", { key: "Name", value: payload.data().Name })
        commit("setJob", { key: "Job", value: payload.data().Job })
        commit("setNationalNumber", { key: "NationalNumber", value: payload.data().NationalNumber })
        commit("setStartDate", { key: "StartDate", value: payload.data().StartDate })
        commit("setId", { key: "Id", value: payload.id })
        commit("SetImagePreview", { key: "ImagePreview", value: payload.data().Image })
    },

    editInDB({ commit, state }, payload) {
        const db = getFirestore();
        const docRef = doc(db, "admins", payload);
        const colRef = collection(db, "admins");
        const storage = getStorage();
        const storageRef = ref(storage, `admins/${state.Image?.name + state.Image?.lastModified}`);

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
