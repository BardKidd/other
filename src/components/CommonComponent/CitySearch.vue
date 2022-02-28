<template>
  <div class="filter-block">
    <div class="filter-field">
      <span class="title"> 縣市 </span>
      <select v-model="searchBox.city">
        <option value="">未選擇</option>
        <option v-for="city of allCity" :key="city.City" :value="city.City">
          {{ city.City }}
        </option>
      </select>
    </div>
    <div class="filter-field">
      <span class="title"> 地區 </span>
      <select v-model="searchBox.district">
        <option value="">未選擇</option>
        <option
          v-for="district of allDistricts"
          :key="district.District"
          :value="district.District"
        >
          {{ district.District }}
        </option>
      </select>
    </div>
    <slot name="another"></slot>
    <div class="filter-field">
      <span class="title"> 關鍵字</span>
      <input
        type="text"
        v-model.trim="searchBox.keyword"
        class="pl-2"
        placeholder="請輸入客戶代碼或名稱"
        @keyup.enter="searchData"
      />
    </div>
    <div class="filter-btn-wrap">
      <button type="button" class="btn btn_primary" @click="searchData">
        查詢
      </button>
    </div>
  </div>
</template>

<script>
// import { getAllCity } from "@/commonAPI/api.js";

// 未串接 API，所以改引入 JSON。
import citySearchData from "@/data/Other/CitySearch.json";

export default {
  name: "CitySearch",
  data() {
    return {
      searchBox: {
        city: "",
        district: "",
        keyword: "",
      },
      allCity: [],
      allDistricts: [],
    };
  },
  methods: {
    searchData() {
      const vm = this;
      vm.$emit("searchCustomer", vm.searchBox);
    },
  },
  watch: {
    "searchBox.city"(n) {
      const vm = this;
      vm.searchBox.district = "";
      vm.allDistricts = [];
      if (n) {
        vm.allDistricts = vm.allCity.find((item) => {
          return n === item.City;
        });
        vm.allDistricts = vm.allDistricts.Districts;
      }
    },
  },
  mounted() {
    const vm = this;

    /* --------------------------------------------------------- */
    vm.allCity = citySearchData.Data.CityDistricts;
    // 取得區
    let city = Object.keys(vm.allCity);
    let districts = Object.values(vm.allCity);
    let ts = [];

    for (let i = 0; i < 99; i++) {
      if (!city[i]) break;

      ts.push({
        City: city[i],
        Districts: districts[i],
      });
    }

    vm.$nextTick(() => {
      vm.allCity = ts;
    });
    /* --------------------------------------------------------- */

    // vm.axios.all([getAllCity()]).then(
    //   vm.axios.spread((allCity) => {
    //     if (!allCity.data.ErrorMessage) {
    //       vm.allCity = allCity.data.Data.CityDistricts;

    //       // 取得區
    //       let city = Object.keys(vm.allCity);
    //       let districts = Object.values(vm.allCity);
    //       let ts = [];

    //       for (let i = 0; i < 99; i++) {
    //         if (!city[i]) break;

    //         ts.push({
    //           City: city[i],
    //           Districts: districts[i],
    //         });
    //       }

    //       vm.$nextTick(() => {
    //         vm.allCity = ts;
    //       });
    //     }

    //     vm.$store.commit("ISLOADING", false);
    //   })
    // );
  },
};
</script>
