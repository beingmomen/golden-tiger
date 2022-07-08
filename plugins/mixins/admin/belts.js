import Vue from 'vue'

const mixins = {
    data() {
        return {}
    },
    computed: {
        getAllBeltsData() {
            return this.$store.getters["admin/belts/getAllData"]
        },
        getBeltsCount() {
            return this.$store.getters["admin/belts/getCount"]
        }
    },

    methods: {},
};

Vue.mixin(mixins);