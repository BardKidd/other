// import print from "../printConsole/printConsole.js";
import { commonFunction } from "@/mixins/commonFunction.js";

export const shoppingCardProcessing = {
  mixins: [commonFunction],
  data() {
    return {};
  },
  methods: {
    // 假如同產品的公關、訂購都有打勾，就把它拆成兩筆。
    splitRow(rows) {
      const vm = this;
      rows.forEach((item, index, arr) => {
        if (item.IsOrder && item.IsPR) {
          item.IsPR = false;
          // this.print("item", item);
          let newItem = JSON.parse(JSON.stringify(item));

          newItem.IsPR = true;
          newItem.IsOrder = false;
          newItem.ProductGuid = vm.Guid();
          // this.print("newItem", newItem);
          arr.push(newItem);
        }
      });
    },
    // 依照勾選訂購或公關拆成兩個陣列
    filterTemplate(rows) {
      const vm = this;
      rows.forEach((item) => {
        item.ProductGuid = vm.Guid(); // 元件唯一值
        // 元件預設有一筆資料
        item.DetailRows = [
          {
            Guid: vm.Guid(),
            IsPending: item.InvQty ? false : true, // 是否為掛單，假如產品總量為 0，一進就會是掛單狀態
            store: null,
            orderQuantity: 1,
            warehousesNum: 0,
            IsPartialDelivery: false, // 是否分批
          },
        ];

        if (item.IsOrder && item.IsPR) {
          // 元件的序號，會用 length 是因為每次丟進來的有可能是公關，所以用 index 會出錯。
          item.OrderTemplateId = vm.orderRows.length;
          vm.orderRows.push(item);

          // 防止同個商品兩個都打勾，傳入後兩個 Guid 相同
          let anotherItem = { ...item };
          anotherItem.ProductGuid = vm.Guid();
          anotherItem.DetailRows = [
            {
              Guid: vm.Guid(),
              IsPending: item.InvQty ? false : true, // 是否為掛單，假如產品總量為 0，一進就會是掛單狀態
              store: null,
              orderQuantity: 1,
              warehousesNum: 0,
              IsPartialDelivery: false, // 是否分批
            },
          ];
          anotherItem.PRTemplateId = vm.prRows.length;
          // this.print("anotherItem", anotherItem);
          vm.prRows.push(anotherItem);
        } else {
          if (item.IsOrder) {
            item.OrderTemplateId = vm.orderRows.length;
            vm.orderRows.push(item);
          }
          if (item.IsPR) {
            item.PRTemplateId = vm.prRows.length;
            vm.prRows.push(item);
          }
        }
      });
    },
    // 從訂單查詢過來後要拆成訂單或公關兩個陣列，跟 filterTemplate 結構不太一樣。
    OrderSearchFilter(rows) {
      const vm = this;
      rows.forEach((item) => {
        if (item.IsOrder) {
          item.OrderTemplateId = vm.orderRows.length;
          vm.orderRows.push(item);
        }
        if (item.IsPR) {
          item.PRTemplateId = vm.prRows.length;
          vm.prRows.push(item);
        }
      });
    },
    // 從訂單查詢過來因為 store 只會帶分店 Id，所以在取得分店 API 完成後賦予該 row 分店資料。
    getSelfBranch(rows, allBranch) {
      rows.forEach((item) => {
        allBranch.some((branch) => {
          if (item.store === branch.CustomerID) {
            item.store = branch;
            return true;
          }
        });
      });
    },
  },
};
