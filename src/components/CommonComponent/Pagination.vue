<template>
  <el-pagination
    :page-sizes="[5, 10, 20, 50]"
    :page-size.sync="pageSize"
    background
    :current-page.sync="currentPage"
    layout="prev, pager, next, sizes"
    :total="total"
  >
  </el-pagination>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    total: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      // 這裡的資料才是主要操作的資料
      currentPage: 1,
      pageSize: 20,
    };
  },
  methods: {},
  watch: {
    currentPage(n) {
      const vm = this;
      vm.$emit("page", n);
    },
    pageSize(n) {
      const vm = this;
      vm.$emit("size", n);
    },
  },
};
</script>