<template>
  <div class="side-menu">
    <span class="site-name">
      <button class="mb-0 btn" @click="goHome">
        <img style="width: 5rem" class="mr-0" src="@/assets/Images/logo.png" />
      </button>
    </span>
    <div v-for="menu of sideBarData" :key="menu.Label">
      <a
        class="had-sub-menu"
        @click.prevent="menu.IsOpen = !menu.IsOpen"
        :class="{ active: menu.IsOpen }"
        href="javascript:void(0)"
      >
        <div class="icon-wrap">
          <i :class="menu.Icon"></i>
        </div>
        <span>{{ menu.Label }}</span>
      </a>
      <ul class="sub-menu">
        <li v-for="child of menu.Children" :key="child.Link">
          <router-link :to="{ name: child.Link }">
            <span>{{ child.ChildLabel }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  inject: ["reload"],
  data() {
    return {
      sideBarData: [
        {
          IsOpen: false,
          Icon: "far fa-copy",
          Label: "訂單管理",
          Children: [
            {
              Link: "MainStoreOrder",
              ChildLabel: "總店訂單作業",
            },
            {
              Link: "SingleStoreOrder",
              ChildLabel: "單店訂單作業",
            },
            {
              Link: "OrderSearch",
              ChildLabel: "訂單查詢",
            },
          ],
        },
        {
          IsOpen: false,
          Icon: "fas fa-archive",
          Label: "退換貨管理",
          Children: [
            {
              Link: "ReturnWork",
              ChildLabel: "退貨作業",
            },
            {
              Link: "ExchangeJob",
              ChildLabel: "換貨作業",
            },
            {
              Link: "SearchReturnOrder",
              ChildLabel: "退換貨單查詢",
            },
          ],
        },
        {
          IsOpen: false,
          Icon: "fas fa-warehouse",
          Label: "寄倉",
          Children: [
            {
              Link: "PickUpWork",
              ChildLabel: "取貨作業",
            },
            {
              Link: "WareHouseExchange",
              ChildLabel: "換貨作業",
            },
            {
              Link: "SearchWareHouse",
              ChildLabel: "寄倉取換貨單查詢",
            },
          ],
        },
        {
          IsOpen: false,
          Icon: "far fa-user",
          Label: "客戶資訊",
          Children: [
            {
              Link: "CustomerData",
              ChildLabel: "客戶資訊",
            },
          ],
        },
      ],
    };
  },
  methods: {
    goHome() {
      const vm = this;
      vm.$router.push({
        name: "MainStoreOrder",
      });
      vm.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.router-link-exact-active > span {
  color: #cca836;
  font-weight: bold;
}
</style>
