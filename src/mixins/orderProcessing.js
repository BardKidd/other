import print from "../printConsole/printConsole.js";
// import store from "../store";
export const OrderProcessing = {
  data() {
    return {
      branchData: null,
      filterContented: null, // 合併完資料後需檢查庫存量時的格式
      keyData: 0,
    };
  },
  methods: {
    // 將掛單和關聯的合併再一起
    concatRow() {
      this.print("將掛單和關聯的合併再一起1", "這裡?");

      const vm = this;
      // 深層複製，不能改到 store 內的值。
      this.print("store", vm.$store.state.branchStore);
      vm.branchData = JSON.parse(JSON.stringify(vm.$store.state.branchStore));

      // 合併掛單資料
      vm.branchData.forEach((item) => {
        item.productData = item.productData.map((product, index, arr) => {
          // 有掛單關聯的兩筆資料合併
          // 不是掛單，但下一筆是掛單，代表兩行是有關聯的。
          if (
            !product.IsPending &&
            // product?.StoreGuid === arr[index + 1]?.StoreGuid &&
            product?.ProductGuid === arr[index + 1]?.ProductGuid &&
            arr[index + 1]?.IsPending
          ) {
            print("不是掛單，但下一筆是掛單", product);
            {
              return {
                ProductGuid: product.ProductGuid, // 總店訂購判斷，不影響確認訂單 API 運行
                ProductId: product.ItemNo.trim(),
                WhseID: product.WhseID.trim(),
                IsPending: true,
                PendingQuantity: arr[index + 1].orderQuantity,
                PurchaseQuantity:
                  product.orderQuantity + arr[index + 1].orderQuantity, // 訂購數量
                ProductName: product.ItemName, // 產品名稱
                IsFree: product.IsPR || false, // 是否為公關品項
                IsPartialDelivery: arr[index + 1].IsPartialDelivery, // 是否分批
                PartialDeliveryQuantity: arr[index + 1].orderQuantity, // 分批出貨數量
                UnitPrice: product.UnitPrice, // 售價(含稅)
                Subtotal: 0, // 小計會在確認訂單那邊加總，所以這邊給 0
                Specification: product.Specification, // 商品規格
                DepositQuantity:
                  product.warehousesNum + arr[index + 1].warehousesNum, // 寄倉數量
                UOM: product.UOM, // 單位
              };
            }
          }
          // 是掛單，但下一筆不是掛單，代表自己是整批出貨的掛單。
          else if (
            product.IsPending &&
            // product?.StoreGuid !== arr[index + 1]?.StoreGuid &&
            product?.ProductGuid !== arr[index + 1]?.ProductGuid
          ) {
            print("是掛單，但下一筆不是掛單", product);
            {
              return {
                ProductGuid: product.ProductGuid, // 總店訂購判斷，不影響確認訂單 API 運行
                ProductId: product.ItemNo.trim(),
                WhseID: product.WhseID.trim(),
                IsPending: true,
                PendingQuantity: product.orderQuantity,
                PurchaseQuantity: product.orderQuantity, // 訂購數量
                ProductName: product.ItemName, // 產品名稱
                IsFree: product.IsPR || false, // 是否為公關品項
                IsPartialDelivery: product.IsPartialDelivery, // 是否分批
                PartialDeliveryQuantity: product.orderQuantity, // 分批出貨數量
                UnitPrice: product.UnitPrice, // 售價(含稅)
                Subtotal: 0, // 小計會在確認訂單那邊加總，所以這邊給 0
                Specification: product.Specification, // 商品規格
                DepositQuantity: product.warehousesNum, // 寄倉數量
                UOM: product.UOM, // 單位
              };
            }
          }
          // 如果他不是掛單
          else if (!product.IsPending) {
            print("不是掛單的一般項目", product);
            return {
              ProductGuid: product.ProductGuid, // 總店訂購判斷，不影響確認訂單 API 運行
              ProductId: product.ItemNo.trim(),
              WhseID: product.WhseID.trim(),
              IsPending: false,
              PendingQuantity: 0,
              PurchaseQuantity: product.orderQuantity, // 訂購數量
              ProductName: product.ItemName, // 產品名稱
              IsFree: product.IsPR || false, // 是否為公關品項
              IsPartialDelivery: product.IsPartialDelivery, // 是否分批
              PartialDeliveryQuantity: 0, // 分批出貨數量
              UnitPrice: product.UnitPrice, // 售價(含稅)
              Subtotal: 0, // 小計會在確認訂單那邊加總，所以這邊給 0
              Specification: product.Specification, // 商品規格
              DepositQuantity: product.warehousesNum, // 寄倉數量
              UOM: product.UOM, // 單位
            };
          } else {
            print("都不是的判斷", product);

            print("都不是的判斷結果", item.productData);
            return {
              ProductGuid: product.ProductGuid, // 總店訂購判斷，不影響確認訂單 API 運行
              ProductId: product.ItemNo.trim(),
              WhseID: product.WhseID.trim(),
              IsPending: product.IsPending,
              PendingQuantity: product.orderQuantity,
              PurchaseQuantity: product.orderQuantity, // 訂購數量
              ProductName: product.ItemName, // 產品名稱
              IsFree: product.IsPR || false, // 是否為公關品項
              IsPartialDelivery: product.IsPartialDelivery, // 是否分批
              PartialDeliveryQuantity: product.PartialDeliveryQuantity, // 分批出貨數量
              UnitPrice: product.UnitPrice, // 售價(含稅)
              Subtotal: 0, // 小計會在確認訂單那邊加總，所以這邊給 0
              Specification: product.Specification, // 商品規格
              DepositQuantity: product.warehousesNum, // 寄倉數量
              UOM: product.UOM, // 單位
            };
          }
        });
      });

      // 刪除掛單合併完多餘的資料
      let result = [];
      vm.branchData.forEach((item, key) => {
        result.push(JSON.parse(JSON.stringify(item)));
        result[key].productData = [];
        item.productData.forEach((product, index, arr) => {
          if (index === 0) {
            result[key].productData.push(product);
          } else {
            if (product.ProductGuid !== arr[index - 1].ProductGuid) {
              result[key].productData.push(product);
            }
          }
        });
      });

      // 返回結構
      vm.branchData = JSON.parse(JSON.stringify(result));
      this.print("branchData", vm.branchData);
      vm.branchData = vm.branchData.map((item) => {
        return {
          CustomerId: item.store.CustomerID,
          Products: item.productData,
          Store: item.store,
        };
      });

      this.print("返回結構", vm.branchData);
    },
    // 檢查庫存量
    checkInventory() {
      const vm = this;
      vm.$store.commit("ISLOADING", true);

      // 掛單合併邏輯
      vm.concatRow();

      vm.$nextTick(() => {
        // 深層複製
        let filterContent = JSON.parse(JSON.stringify(vm.branchData));
        filterContent.forEach((item) => {
          item.Products = item.Products.map((product) => {
            return {
              ProductId: product.ProductId,
              WhseID: product.WhseID,
              IsPending: product.IsPending,
              PendingQuantity: product.PendingQuantity,
              PurchaseQuantity: product.PurchaseQuantity,
            };
          });
        });

        filterContent = filterContent.map((item) => {
          return {
            CustomerId: item.CustomerId,
            Products: item.Products,
          };
        });

        print("確認訂單格式", filterContent);
        vm.filterContented = {
          Customers: filterContent,
        };
      });
    },
  },
};
