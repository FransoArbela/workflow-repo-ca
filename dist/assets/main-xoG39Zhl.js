(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) o(r);
  new MutationObserver((r) => {
    for (const s of r)
      if (s.type === "childList")
        for (const i of s.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && o(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(r) {
    const s = {};
    return (
      r.integrity && (s.integrity = r.integrity),
      r.referrerPolicy && (s.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === "use-credentials"
        ? (s.credentials = "include")
        : r.crossOrigin === "anonymous"
          ? (s.credentials = "omit")
          : (s.credentials = "same-origin"),
      s
    );
  }
  function o(r) {
    if (r.ep) return;
    r.ep = !0;
    const s = n(r);
    fetch(r.href, s);
  }
})();
const m = "token",
  f = "user";
function p(e) {
  g(m, e);
}
function h(e) {
  g(f, e);
}
function y() {
  const e = v(f);
  return e ? e.name : null;
}
function w() {
  localStorage.clear();
}
function g(e, t) {
  localStorage.setItem(e, JSON.stringify(t));
}
function v(e) {
  const t = localStorage.getItem(e);
  return t ? JSON.parse(t) : null;
}
const b = (e, t) =>
  e === "/" ? t === "/" || t === "/index.html" : t.includes(e);
function S() {
  const e = document.querySelector("#menu-container"),
    t = window.location.pathname,
    n = y(),
    o = (s, i) => {
      const l = b(s, t) && i !== "Logo";
      return `<a href="${s}" class="${l ? "text-blue-300" : "text-white hover:text-blue-200"} py-2 px-3 font-medium transition-colors duration-200 ${l ? "font-bold" : ""}">${i}</a>`;
    };
  let r = o("/login/", "Login");
  n &&
    (r = `
      <span class="text-white mr-4">Hi ${n}</span>
      <button id="logoutButton" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200">
        Logout
      </button>
    `),
    (e.innerHTML = `
    <nav class="flex justify-between items-center p-4 bg-green-800">
      <div class="flex items-center space-x-4">
        ${o("/", "Logo")}

      </div>
      <div class="flex items-center space-x-4">
      ${o("/", "Home")}
        ${r}
        ${n ? "" : o("/register/", "Register")}
      </div>
    </nav>
  `);
}
const u = { apiUrl: "https://api.noroff.dev/api/v1/holidaze/" };
async function L(e) {
  const t = `${u.apiUrl}auth/register`,
    n = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e),
    },
    o = await fetch(t, n),
    r = await o.json();
  if (!o.ok) throw new Error("Sorry, sign up failed.");
  return r;
}
function c(e, t, n) {
  let o;
  typeof e == "string" ? (o = document.querySelector(e)) : (o = e);
  const r = "p-4 mb-4 rounded-lg border";
  let s = "";
  switch (t) {
    case "error":
      s = "bg-red-100 border-red-400 text-red-700";
      break;
    case "success":
      s = "bg-green-100 border-green-400 text-green-700";
      break;
    case "warning":
      s = "bg-yellow-100 border-yellow-400 text-yellow-700";
      break;
    default:
      s = "bg-gray-100 border-gray-400 text-gray-700";
  }
  o.innerHTML = `<div class="${r} ${s}" role="alert">${n}</div>`;
}
const x = {
  en: {
    registrationSuccess: "Registration successful!",
    invalidationError: "Invalid input",
  },
};
async function $(e) {
  e.preventDefault();
  const t = e.target,
    n = document.querySelector("#message-container");
  n.innerHTML = "";
  const o = new FormData(t),
    r = Object.fromEntries(o.entries());
  try {
    await L(r), c(n, "success", x.en.registrationSuccess), t.reset();
  } catch (s) {
    c(n, "error", s.message);
  }
}
function E() {
  const e = document.querySelector("#registerForm");
  e && e.addEventListener("submit", $);
}
async function O(e) {
  var s, i;
  const t = `${u.apiUrl}auth/login`;
  console.log("Login URL:", t);
  const n = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e),
    },
    o = await fetch(t, n),
    r = await o.json();
  if (!o.ok)
    throw new Error(
      ((i = (s = r.errors) == null ? void 0 : s[0]) == null
        ? void 0
        : i.message) || "Login failed",
    );
  return r;
}
function j(e) {
  return /^[^\s@]+@(stud\.noroff\.no|noroff\.no)$/.test(e);
}
function q(e) {
  return e.length >= 8;
}
function T(e, t) {
  const n = [];
  return (
    j(e) || n.push("Please enter a noroff.no or stud.noroff.no email address."),
    q(t) || n.push("Password must be at least 8 characters long."),
    { isValid: n.length === 0, errors: n }
  );
}
async function C(e) {
  e.preventDefault();
  const t = e.target,
    n = document.querySelector("#message-container"),
    o = t.querySelector("fieldset"),
    r = t.querySelector('button[type="submit"]');
  n.innerHTML = "";
  const s = new FormData(t),
    i = Object.fromEntries(s.entries()),
    l = T(i.email, i.password);
  if (!l.isValid) {
    const a = l.errors.map((d) => `<p class="text-red-500">${d}</p>`).join("");
    c(n, "error", a);
    return;
  }
  (o.disabled = !0), (r.textContent = "Logging in...");
  try {
    const { accessToken: a, ...d } = await O(i);
    p(a), h(d), (window.location.href = "/");
  } catch (a) {
    c(n, "error", a.message);
  } finally {
    (o.disabled = !1), (r.textContent = "Login");
  }
}
function F() {
  const e = document.querySelector("#loginForm");
  e && e.addEventListener("submit", C);
}
function N() {
  const e = document.querySelector("#logoutButton");
  console.log(e),
    e &&
      e.addEventListener("click", () => {
        w(), (window.location.href = "/login");
      });
}
async function M() {
  var o, r;
  const e = `${u.apiUrl}venues`,
    t = await fetch(e),
    n = await t.json();
  if ((console.log(n), !t.ok))
    throw new Error(
      ((r = (o = n.errors) == null ? void 0 : o[0]) == null
        ? void 0
        : r.message) || "Fetching venues failed",
    );
  return n;
}
function P(e, t) {
  if (t.length === 0) return "<div class='text-center'>No venues found</div>";
  const n = t.map((o) => k(o));
  (e.innerHTML = ""), e.append(...n);
}
const k = (e) => {
  const { media: t, id: n } = e,
    o = document.createElement("a");
  (o.className = "bg-cover bg-center h-64 rounded-lg shadow-md"),
    (o.href = `/venue/?id=${n}`);
  const r = (t == null ? void 0 : t[0]) || "https://placehold.co/400x400";
  return (o.style.backgroundImage = `url(${r})`), o;
};
async function H() {
  const e = document.querySelector("#venue-container");
  try {
    const t = await M();
    P(e, t);
  } catch (t) {
    console.log(t), c(e, "error", t.message);
  }
}
async function U(e) {
  var r, s;
  if (!e) throw new Error("No id provided");
  const t = `${u.apiUrl}venues/${e}`,
    n = await fetch(t),
    o = await n.json();
  if ((console.log(o), !n.ok))
    throw new Error(
      ((s = (r = o.errors) == null ? void 0 : r[0]) == null
        ? void 0
        : s.message) || "Fetching venue failed",
    );
  return o;
}
function V(e) {
  const t = document.querySelector("h1");
  t && (t.textContent = `Venue details: ${e}`);
}
function R(e) {
  document.title = e;
}
function D(e, t) {
  e.innerHTML = "";
  const n = document.createElement("img");
  (n.src = t.media[0]), (n.alt = t.name), e.append(n);
}
function I(e) {
  const t = window.location.search;
  return new URLSearchParams(t).get(e);
}
async function A() {
  const e = I("id");
  e || (window.location.href = "/");
  const t = document.querySelector("#venue-container");
  try {
    const n = await U(e),
      { name: o } = n;
    V(o), R(o), D(t, n);
  } catch (n) {
    console.log(n), c(t, "error", n.message);
  }
}
function B() {
  S(), N();
  const e = window.location.pathname;
  console.log(e),
    e === "/" || e === "/index.html"
      ? H()
      : e.startsWith("/login")
        ? F()
        : e.startsWith("/register")
          ? E()
          : e.startsWith("/venue/") && A();
}
B();
