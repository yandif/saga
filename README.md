# saga

⛰️ functional event emitter / pubsub in deno.

### Useage

```javascript
import saga from "https://deno.land/x/saga@0.1/mod.ts";

const { on, emit } = saga();
const arr = [];
const fn = (arr, ...args) => {
  arr.push(...args);
};
const off = on("message", fn);

emit("message", arr, "⛰️");
console.log(arr); //==> ["⛰️"]

off();
emit("message", arr, "⛰️");
console.log(arr); //==> ["⛰️"]

on("*", () => {
  console.log("⛰️");
});
emit("any"); //==> ⛰️
```
