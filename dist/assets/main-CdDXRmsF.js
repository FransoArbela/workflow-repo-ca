(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver((o) => {
    for (const s of o)
      if (s.type === "childList")
        for (const i of s.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const s = {};
    return (
      o.integrity && (s.integrity = o.integrity),
      o.referrerPolicy && (s.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (s.credentials = "include")
        : o.crossOrigin === "anonymous"
          ? (s.credentials = "omit")
          : (s.credentials = "same-origin"),
      s
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const s = n(o);
    fetch(o.href, s);
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
  const e = b(f);
  return e ? e.name : null;
}
function w() {
  localStorage.clear();
}
function g(e, t) {
  localStorage.setItem(e, JSON.stringify(t));
}
function b(e) {
  const t = localStorage.getItem(e);
  return t ? JSON.parse(t) : null;
}
const v = (e, t) =>
  e === "/" ? t === "/" || t === "/index.html" : t.includes(e);
function S() {
  const e = document.querySelector("#menu-container"),
    t = window.location.pathname,
    n = y(),
    r = "//",
    o = (i, l) => {
      const a = v(i, t) && l !== "Logo";
      return `<a href="${i}" class="${a ? "text-blue-300" : "text-white hover:text-blue-200"} py-2 px-3 font-medium transition-colors duration-200 ${a ? "font-bold" : ""}">${l}</a>`;
    };
  let s = o(`${r}login/`, "Login");
  n &&
    (s = `
      <span class="text-white mr-4">Hi ${n}</span>
      <button id="logoutButton" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200">
        Logout
      </button>
    `),
    (e.innerHTML = `
    <nav class="flex justify-between items-center p-4 bg-green-800">
      <div class="flex items-center space-x-4">
        ${o(`${r}`, "Logo")}

      </div>
      <div class="flex items-center space-x-4">
      ${o(`${r}`, "Home")}
        ${s}
        ${n ? "" : o(`${r}register/`, "Register")}
      </div>
    </nav>
  `);
}
const d = { apiUrl: "https://api.noroff.dev/api/v1/holidaze/" };
async function L(e) {
  const t = `${d.apiUrl}auth/register`,
    n = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e),
    },
    r = await fetch(t, n),
    o = await r.json();
  if (!r.ok) throw new Error("Sorry, sign up failed.");
  return o;
}
function c(e, t, n) {
  let r;
  typeof e == "string" ? (r = document.querySelector(e)) : (r = e);
  const o = "p-4 mb-4 rounded-lg border";
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
  r.innerHTML = `<div class="${o} ${s}" role="alert">${n}</div>`;
}
const $ = {
  en: {
    registrationSuccess: "Registration successful!",
    invalidationError: "Invalid input",
  },
};
async function x(e) {
  e.preventDefault();
  const t = e.target,
    n = document.querySelector("#message-container");
  n.innerHTML = "";
  const r = new FormData(t),
    o = Object.fromEntries(r.entries());
  try {
    await L(o), c(n, "success", $.en.registrationSuccess), t.reset();
  } catch (s) {
    c(n, "error", s.message);
  }
}
function E() {
  const e = document.querySelector("#registerForm");
  e && e.addEventListener("submit", x);
}
async function O(e) {
  var s, i;
  const t = `${d.apiUrl}auth/login`;
  console.log("Login URL:", t);
  const n = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e),
    },
    r = await fetch(t, n),
    o = await r.json();
  if (!r.ok)
    throw new Error(
      ((i = (s = o.errors) == null ? void 0 : s[0]) == null
        ? void 0
        : i.message) || "Login failed",
    );
  return o;
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
    r = t.querySelector("fieldset"),
    o = t.querySelector('button[type="submit"]');
  n.innerHTML = "";
  const s = new FormData(t),
    i = Object.fromEntries(s.entries()),
    l = T(i.email, i.password);
  if (!l.isValid) {
    const a = l.errors.map((u) => `<p class="text-red-500">${u}</p>`).join("");
    c(n, "error", a);
    return;
  }
  (r.disabled = !0), (o.textContent = "Logging in...");
  try {
    const { accessToken: a, ...u } = await O(i);
    p(a), h(u), (window.location.href = "/");
  } catch (a) {
    c(n, "error", a.message);
  } finally {
    (r.disabled = !1), (o.textContent = "Login");
  }
}
function F() {
  const e = document.querySelector("#loginForm");
  e && e.addEventListener("submit", C);
}
function N() {
  const e = document.querySelector("#logoutButton");
  console.log(e);
  const t = "//";
  e &&
    e.addEventListener("click", () => {
      w(), (window.location.href = `${t}login/`);
    });
}
async function M() {
  var r, o;
  const e = `${d.apiUrl}venues`,
    t = await fetch(e),
    n = await t.json();
  if ((console.log(n), !t.ok))
    throw new Error(
      ((o = (r = n.errors) == null ? void 0 : r[0]) == null
        ? void 0
        : o.message) || "Fetching venues failed",
    );
  return n;
}
function P(e, t) {
  if (t.length === 0) return "<div class='text-center'>No venues found</div>";
  const n = t.map((r) => k(r));
  (e.innerHTML = ""), e.append(...n);
}
const k = (e) => {
  const { media: t, id: n } = e,
    r = document.createElement("a");
  (r.className = "bg-cover bg-center h-64 rounded-lg shadow-md"),
    (r.href = `/venue/?id=${n}`);
  const o = (t == null ? void 0 : t[0]) || "https://placehold.co/400x400";
  return (r.style.backgroundImage = `url(${o})`), r;
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
  var o, s;
  if (!e) throw new Error("No id provided");
  const t = `${d.apiUrl}venues/${e}`,
    n = await fetch(t),
    r = await n.json();
  if ((console.log(r), !n.ok))
    throw new Error(
      ((s = (o = r.errors) == null ? void 0 : o[0]) == null
        ? void 0
        : s.message) || "Fetching venue failed",
    );
  return r;
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
      { name: r } = n;
    V(r), R(r), D(t, n);
  } catch (n) {
    console.log(n), c(t, "error", n.message);
  }
}
function B() {
  const e = "//";
  S(), N();
  const t = window.location.pathname;
  console.log(t),
    t === "/" || t === "/index.html" || t === e
      ? H()
      : t.startsWith("/login")
        ? F()
        : t.startsWith("/register")
          ? E()
          : t.startsWith("/venue/") && A();
}
B();
