import Vue from 'vue'

const mixins = {
    data() {
        return {}
    },
    computed: {
        getAllAdminsAndWorkersData() {
            return this.$store.getters["admin/adminsWorkers/getAllData"]
        },
        getAdminsAndWorkersCount() {
            return this.$store.getters["admin/adminsWorkers/getCount"]
        },
        getAdminPreiewImage() {
            return this.$store.getters["admin/adminsWorkers/edit/getImagePreview"]
        },
    },

    methods: {},
};

Vue.mixin(mixins);