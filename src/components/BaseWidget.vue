<template>
  <div class="base-app">
    <div v-if="loaded">
      <div class="main">
        <task-manager :mainData="mainData" @reloadData="loadData"/>
      </div>
    </div>
    <div v-else>
      <h2 class="base-widget-loading">loading...</h2>
    </div>
  </div>
</template>
<script>
import TaskManager from "./TaskManager.vue";
export default {
  name: "BaseWidget",
  components: {
    TaskManager,
  },
  data() {
    return {
      loaded: false,
      mainData: [],
    };
  },
  methods: {
    showValue() {},
    loadData() {
      const that = this
      const endpoint = "tasks";
      this.$http
        .get(endpoint)
        .then((response) => {
          if (that.httpCheckStatus(response)) {
            const responseData = response.data.data;
            that.mainData = responseData;
          }
        })
        .catch(function (error) {
          that.httpCheckStatus(error.response);
        });
    },
  },
  mounted() {
    this.loaded = true;
    this.loadData();
  },
};
</script>
