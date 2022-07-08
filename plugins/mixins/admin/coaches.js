import Vue from 'vue'

const mixins = {
    data() {
        return {}
    },
    computed: {
        getAllCoachesData() {
            return this.$store.getters["admin/coaches/getAllData"]
        },
        getCoachesCount() {
            return this.$store.getters["admin/coaches/getCount"]
        },
        getCoachesPreiewImage() {
            return this.$store.getters["admin/coaches/edit/getImagePreview"]
        },
    },

    methods: {},
};

Vue.mixin(mixins);