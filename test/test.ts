import { assertEquals } from "../deps.ts";
import saga from "../mod.ts";

const { test } = Deno;

test("init", () => {
  const map = {};
  const natto = saga(map);
  const { on, emit } = natto;

  assertEquals(map, {});
  assertEquals(typeof natto, "object");
  assertEquals(typeof on, "function");
  assertEquals(typeof emit, "function");
});

test("Listen for event #1", () => {
  const map = {};
  const { on } = saga(map);

  const fn = (message: string) => {
    console.log(message);
  };
  on("message", fn);

  assertEquals(map, { "message": [fn] });
});

test("Listen for event #2", () => {
  const fn = (message: string) => {
    console.log(message);
  };
  const map = { "message": [fn] };
  const { on } = saga(map);

  on("message", fn);

  assertEquals(map, { "message": [fn, fn] });
});

test("Trigger event", () => {
  const map = {};
  const { on, emit } = saga(map);

  let arr: Array<any> = [];
  const fn = (arr: Array<any>, ...args: Array<any>) => {
    arr.push(...args);
  };
  on("message", fn);

  emit("message", arr, "😄");

  assertEquals(arr, ["😄"]);
});

test("Cancel listening event", () => {
  const map = {};
  const { on, emit } = saga(map);

  let arr: Array<any> = [];
  const fn = (arr: Array<any>, ...args: Array<any>) => {
    arr.push(...args);
  };
  const off = on("message", fn);

  emit("message", arr, "😄");

  off();
  assertEquals(map, { message: [] });

  emit("message", arr, "😄");
  assertEquals(arr, ["😄"]);
});

test("listen to all events ", () => {
  const map = {};
  const { on, emit } = saga(map);

  let arr: Array<any> = [];
  const fn = (arr: Array<any>, ...args: Array<any>) => {
    arr.push(...args);
  };
  on("message", fn);
  on("*", fn);

  emit("message", arr, "😄");
  emit("hi", arr, "hi");

  assertEquals(arr, ["😄", "😄", "hi"]);
});
