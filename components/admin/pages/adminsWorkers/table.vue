<template>
  <b-card no-body class="card-statistics">
    <b-card-body class="statistics-body">
      <b-row class="justify-content-between">
        <b-col md="2" sm="4" class="my-1">
          <b-form-group class="mb-0">
            <label class="d-inline-block text-sm-left mr-50">{{
              $t("tables.per_page")
            }}</label>
            <b-form-select
              id="perPageSelect"
              v-model="perPage"
              size="sm"
              :options="pageOptions"
              class="w-50"
            />
          </b-form-group>
        </b-col>

        <b-col cols="12" sm="6" md="4" class="my-1 text-end">
          <b-button variant="primary" class="add p-0 text-white">
            <nuxt-link
              class="
                text-white
                w-100
                h-100
                d-flex
                justify-content-center
                align-items-center
              "
              :to="`${$route.path}/new`"
            >
              {{ $t("buttons.add") }}
            </nuxt-link>
          </b-button>
        </b-col>

        <b-col cols="12">
          <b-table
            striped
            hover
            responsive
            class="customise-table"
            :per-page="perPage"
            :current-page="currentPage"
            :items="items"
            :fields="headers"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            :filter="filter"
            :filter-included-fields="filterOn"
            @filtered="onFiltered"
          >
            <template #cell()="data">
              <nuxt-link
                :to="`${$route.path}/${data.item.id}`"
                class="table-link"
              >
              </nuxt-link>
              <span>{{ data.value }}</span>
            </template>
            <template #cell(Image)="data">
              <b-avatar class="image-avatar" :src="data.value" />
            </template>

            <template #cell(status)="data">
              <b-badge :variant="status[1][data.value]">
                {{ status[0][data.value] }}
              </b-badge>
            </template>

            <template #cell(actions)="data">
              <trash-icon
                @click="showMsgBoxTwo(data)"
                size="1.5x"
                class="custom-clas mr-50 text-danger"
              ></trash-icon>
            </template>
          </b-table>
        </b-col>

        <b-col cols="12">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="center"
            size="sm"
            class="my-0"
          />
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import { MoreVerticalIcon, Edit2Icon, TrashIcon } from "vue-feather-icons";
export default {
  props: ["headers", "items"],
  data() {
    return {
      perPage: 10,
      pageOptions: [5, 10, 25, 50],
      totalRows: 1,
      currentPage: 1,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },

      status: [
        {
          1: "Current",
          2: "Professional",
          3: "Rejected",
          4: "Resigned",
          5: "Applied",
        },
        {
          1: "light-primary",
          2: "light-success",
          3: "light-danger",
          4: "light-warning",
          5: "light-info",
        },
      ],
    };
  },
  components: {
    MoreVerticalIcon,
    Edit2Icon,
    TrashIcon,
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => ({ text: f.label, value: f.key }));
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length + 1;
  },
  methods: {
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    showMsgBoxTwo(data) {
      console.warn("data :::", data.item.id);
      this.$bvModal
        .msgBoxConfirm(
          `${this.$t("modals.delete_msg")} -- ( ${data.item.Name} )`,
          {
            title: this.$t("modals.delete_confirm"),
            size: "md",
            okVariant: "primary",
            okTitle: this.$t("buttons.yes"),
            cancelTitle: this.$t("buttons.no"),
            cancelVariant: "outline-secondary",
            hideHeaderClose: false,
            centered: false,
          }
        )
        .then((value) => {
          value ? this.$emit("deleteItem", data.item.id) : "";
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.add {
  width: 70px;
  height: 38px;
}

.image-avatar {
  width: 50px;
  height: 50px;
}
</style>