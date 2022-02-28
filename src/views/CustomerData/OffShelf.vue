<template>
  <div
    id="offshelf"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-centered"
      role="document"
      style="justify-content: center"
    >
      <div class="modal-content" style="width: 500px">
        <div class="modal-header">停用客戶</div>
        <div class="modal-body d-flex" style="align-items: center">
          <div>
            是否確認停用
            <span class="font-weight-bold">
              {{ customer.CustomerFullName }}({{ customer.CustomerID }})
            </span>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn_cancel" data-dismiss="modal">
            關閉
          </button>
          <button type="button" class="btn btn_primary" data-dismiss="modal">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
export default {
  name: "OffShelf",
  props: {
    customer: {
      type: Object,
      required: true,
    },
  },
  destroyed() {
    $(".modal").modal("hide");
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  },
};
</script>
