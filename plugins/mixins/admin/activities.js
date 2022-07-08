import Vue from 'vue'

const mixins = {
    data() {
        return {}
    },
    computed: {
        getAllActivitiesData() {
            return this.$store.getters["admin/activities/getAllData"]
        },
        getActivitiesCount() {
            return this.$store.getters["admin/activities/getCount"]
        }
    },

    methods: {},
};

Vue.mixin(mixins);