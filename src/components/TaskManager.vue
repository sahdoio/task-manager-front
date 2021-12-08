<template>
  <div class="task-manager">
    <h1>Tasks</h1>
    <br />
    <b-input-group prepend="Task" class="mt-3">
      <b-form-input v-model="taskInput"></b-form-input>
      <b-input-group-append>
        <b-button variant="success" @click="addTask">
          <b-icon icon="plus" aria-hidden="true"></b-icon>
          Add
        </b-button>
      </b-input-group-append>
    </b-input-group>

    <div v-if="hasItems" class="task-list">
      <div
        :class="['task-item', { completed: item.completed }]"
        v-for="item in mainData"
        :key="item.id"
      >
        <label class="task-item-title">
          <span v-b-tooltip.hover title="Complete Task" @click="completeTask(item.id)">
            {{ item.title }}
          </span>
        </label>
        <b-button class="task-item-button" variant="danger" @click="deleteTask(item.id)">
          <b-icon icon="x" aria-hidden="true"></b-icon>
        </b-button>
      </div>
    </div>

    <div v-else class="empty-list">
      <h2>No items available</h2>
    </div>
  </div>
</template>
<script>
export default {
  name: "TaskManager",
  props: {
    taskInput: "",
    mainData: {
      type: Array,
      default: [],
    },
  },
  computed: {
    hasItems() {
      return this.mainData.length > 0;
    },
  },
  data() {
    return {};
  },
  methods: {
    addTask() {
      if (!this.taskInput || this.taskInput === "") {
        swal({
          title: "Oops!",
          text: "Task title required!",
          type: "warning",
          showConfirmButton: false,
          timer: 2000,
          onClose: () => {},
        }).catch(swal.noop);
        return;
      }

      const that = this;
      const payload = {
        title: this.taskInput,
      };
      const endpoint = "tasks";
      this.$http
        .post(endpoint, payload)
        .then((response) => {
          if (that.httpCheckStatus(response)) {
            swal({
              title: "Done!",
              text: "Success!",
              type: "success",
              showConfirmButton: false,
              timer: 2000,
              onClose: () => {},
            }).catch(swal.noop);
            this.$emit("reloadData");
          }
        })
        .catch(function (error) {
          that.httpCheckStatus(error.response);
        });
    },
    completeTask(id) {
      const that = this;
      const endpoint = `tasks/${id}`;
      this.$http
        .patch(endpoint)
        .then((response) => {
          if (that.httpCheckStatus(response)) {
            swal({
              title: "Done!",
              text: "Success!",
              type: "success",
              showConfirmButton: false,
              timer: 2000,
              onClose: () => {},
            }).catch(swal.noop);
            this.$emit("reloadData");
          }
        })
        .catch(function (error) {
          that.httpCheckStatus(error.response);
        });
    },
    deleteTask(id) {
      const that = this;
      const endpoint = `tasks/${id}`;
      this.$http
        .delete(endpoint)
        .then((response) => {
          if (that.httpCheckStatus(response)) {
            swal({
              title: "Done!",
              text: "Success!",
              type: "success",
              showConfirmButton: false,
              timer: 2000,
              onClose: () => {},
            }).catch(swal.noop);
            this.$emit("reloadData");
          }
        })
        .catch(function (error) {
          that.httpCheckStatus(error.response);
        });
    },
  },
};
</script>
