export const commonFunction = {
  data() {
    return {
      today: "",
    };
  },
  methods: {
    Guid() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    },
    AddZero(time) {
      return time < 10 ? `0${time}` : time;
    },
    Today() {
      const vm = this;
      let getDate = new Date();
      let year = getDate.getFullYear();
      let month = vm.AddZero(getDate.getMonth() + 1);
      let day = vm.AddZero(getDate.getDate());

      let getToday = `${year}-${month}-${day}`;
      vm.today = getToday;
    },
  },
  mounted() {
    const vm = this;
    vm.Today();
  },
};
