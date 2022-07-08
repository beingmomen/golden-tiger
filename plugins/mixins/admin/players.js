import Vue from 'vue'

const mixins = {
    data() {
        return {}
    },
    computed: {
        getAllPlayersData() {
            return this.$store.getters["admin/players/getAllData"]
        },
        getPlayersCount() {
            return this.$store.getters["admin/players/getCount"]
        },
        getPlayersPreiewImage() {
            return this.$store.getters["admin/players/edit/getImagePreview"]
        },
    },

    methods: {},
};

Vue.mixin(mixins);