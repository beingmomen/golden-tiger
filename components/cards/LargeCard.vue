<template>
  <b-card no-body class="card-statistics">
    <b-card-header>
      <b-card-title>{{ $t("main.statistics") }}</b-card-title>
      <!-- <b-card-text class="mr-25 mb-0"> Updated 1 month ago </b-card-text> -->
    </b-card-header>
    <b-card-body class="statistics-body">
      <b-row>
        <!-- <b-col
          v-for="item in items"
          :key="item.icon"
          md="3"
          sm="6"
          class="mb-2 mb-md-0"
          :class="item.customClass"
        >
          <b-media class="mb-3" no-body>
            <b-media-aside class="mr-2">
              <b-avatar size="48" :variant="item.color">
                <feather-icon size="24" :icon="item.icon" />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{ item.title }}
              </h4>
              <b-card-text class="font-small-3 mb-0"> 
                {{ item.subtitle }}
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col> -->
        <b-col md="3" sm="6" class="mb-2 mb-md-0 mt-4">
          <b-media no-body>
            <b-media-aside class="mr-2">
              <b-avatar size="48" variant="primary">
                <font-awesome-icon :icon="`fa-solid fa-chart-line`" />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">{{ getActivitiesCount }}</h4>
              <b-card-text class="font-small-3 mb-0">
                {{ $t(`sidebar.activities`) }}
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
        <b-col md="3" sm="6" class="mb-2 mb-md-0 mt-4">
          <b-media no-body>
            <b-media-aside class="mr-2">
              <b-avatar size="48" variant="primary">
                <font-awesome-icon :icon="`fa-solid fa-user`" />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{ getAdminsAndWorkersCount }}
              </h4>
              <b-card-text class="font-small-3 mb-0">
                {{ $t(`sidebar.adminsWorker`) }}
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
        <b-col md="3" sm="6" class="mb-2 mb-md-0 mt-4">
          <b-media no-body>
            <b-media-aside class="mr-2">
              <b-avatar size="48" variant="primary">
                <font-awesome-icon :icon="`fa-solid fa-user-ninja`" />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">{{ getCoachesCount }}</h4>
              <b-card-text class="font-small-3 mb-0">
                {{ $t(`sidebar.coaches`) }}
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
        <b-col md="3" sm="6" class="mb-2 mb-md-0 mt-4">
          <b-media no-body>
            <b-media-aside class="mr-2">
              <b-avatar size="48" variant="primary">
                <font-awesome-icon :icon="`fa-solid fa-users`" />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">{{ getPlayersCount }}</h4>
              <b-card-text class="font-small-3 mb-0">
                {{ $t(`sidebar.players`) }}
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
        <b-col md="3" sm="6" class="mb-2 mb-md-0 mt-4">
          <b-media no-body>
            <b-media-aside class="mr-2">
              <b-avatar size="48" variant="primary">
                <font-awesome-icon :icon="`fa-solid fa-bacon`" />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">{{ getBeltsCount }}</h4>
              <b-card-text class="font-small-3 mb-0">
                {{ $t(`sidebar.belts`) }}
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  props: ["items"],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>