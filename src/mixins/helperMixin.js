export default {
  data() {
    return {};
  },
  methods: {
    httpCheckStatus(response, redirectRoute = "home") {
      console.log("[helperMixin][httpCheckStatus] response: ", response);

      if (!(response && response.status)) {
        swal({
          title: "Oops!",
          text: "Service temporarily unavailable. Contact support",
          type: "error",
          showConfirmButton: false,
          timer: 2500,
          onClose: () => {},
        }).catch(swal.noop);

        console.error("[helperMixin][httpCheckStatus] response not found");
        return false;
      }

      switch (response.status) {
        case 200:
        case 202:
          return true;
        case 404:
          if (!this.isLoggingOut) {
            this.isLoggingOut = true;
            swal({
              title: "404!",
              text: "Not found",
              type: "error",
              showConfirmButton: false,
              timer: 2000,
              onClose: () => {
                this.$router.push({ name: redirectRoute });
              },
            }).catch(swal.noop);
          }
          return false;
        case 401:
          swal({
            title: "Atenção!",
            text: "Access denied!",
            type: "warning",
            showConfirmButton: false,
            timer: 2000,
            onClose: () => {},
          }).catch(swal.noop);
          return false;
        case 500:
          swal({
            title: "Oops!",
            text: "Service unavailabe",
            type: "warning",
            showConfirmButton: false,
            timer: 2000,
            onClose: () => {},
          }).catch(swal.noop);
          return false;
        case 400:
          swal({
            title: "Oops!",
            text: "Bad request!",
            type: "warning",
            showConfirmButton: false,
            timer: 2000,
            onClose: () => {},
          }).catch(swal.noop);
          return false;
        default:
          return false;
      }
    },
  },
};
