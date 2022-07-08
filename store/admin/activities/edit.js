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
    data: {
        Name: null,
    },
    Id: null
});

export const getters = {
    getName(state) {
        return state.data.Name
    },
    getId(state) {
        return state.Id
    },
};

export const actions = {
    getAllDataFromApi({ commit }, payload) {
        commit("setName", { key: "Name", value: payload.data().Name })
        commit("setId", { key: "Id", value: payload.id })
    },

    editInDB({ commit, state }, payload) {
        const db = getFirestore();
        const docRef = doc(db, "activities", payload);
        return updateDoc(docRef, state.data).then(() => {
            this.$toast.success("Edited successfully");
        })
    },
};



export const mutations = {
    setName(state, val) {
        state.data[val.key] = val.value
    },
    setId(state, val) {
        state[val.key] = val.value
    },
};
