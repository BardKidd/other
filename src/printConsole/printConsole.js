import Vue from "vue";
const print = (Vue.prototype.print = (logName, obj, type) => {
  type = type || "log";
  if (obj) {
    const log = JSON.parse(JSON.stringify(obj));
    console[type](logName, log);
  } else {
    console[type](`傳入值為: ${obj}`);
  }
});

export default print;
