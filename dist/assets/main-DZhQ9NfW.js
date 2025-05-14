(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) n(o);
  new MutationObserver((o) => {
    for (const r of o)
      if (r.type === "childList")
        for (const c of r.addedNodes)
          c.tagName === "LINK" && c.rel === "modulepreload" && n(c);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(o) {
    const r = {};
    return (
      o.integrity && (r.integrity = o.integrity),
      o.referrerPolicy && (r.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (r.credentials = "include")
        : o.crossOrigin === "anonymous"
          ? (r.credentials = "omit")
          : (r.credentials = "same-origin"),
      r
    );
  }
  function n(o) {
    if (o.ep) return;
    o.ep = !0;
    const r = s(o);
    fetch(o.href, r);
  }
})();
const a = "user";
function u() {
  const t = g(a);
  return t ? t.name : null;
}
function d() {
  localStorage.clear();
}
function g(t) {
  const e = localStorage.getItem(t);
  return e ? JSON.parse(e) : null;
}
const f = (t, e) => {
  const s = "//";
  return t === "/"
    ? e === "/" || e === "/index.html" || e === `${s}/`
    : e.includes(t);
};
function p() {
  const t = document.querySelector("#menu-container"),
    e = window.location.pathname,
    s = u(),
    n = "//",
    o = (c, i) => {
      const l = f(c, e) && i !== "Logo";
      return `<a href="${c}" class="${l ? "text-blue-300" : "text-white hover:text-blue-200"} py-2 px-3 font-medium transition-colors duration-200 ${l ? "font-bold" : ""}">${i}</a>`;
    };
  let r = o(`${n}login/`, "Login");
  s &&
    (r = `
      <span class="text-white mr-4">Hi ${s}</span>
      <button id="logoutButton" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200">
        Logout
      </button>
    `),
    (t.innerHTML = `
    <nav class="flex justify-between items-center p-4 bg-green-800">
      <div class="flex items-center space-x-4">
        ${o(`${n}`, "Logo")}

      </div>
      <div class="flex items-center space-x-4">
      ${o(`${n}`, "Home")}
        ${r}
        ${s ? "" : o(`${n}register/`, "Register")}
      </div>
    </nav>
  `);
}
const m = { apiUrl: "https://api.noroff.dev/api/v1/holidaze/" };
function b(t, e, s) {
  let n;
  typeof t == "string" ? (n = document.querySelector(t)) : (n = t);
  const o = "p-4 mb-4 rounded-lg border";
  let r = "";
  switch (e) {
    case "error":
      r = "bg-red-100 border-red-400 text-red-700";
      break;
    case "success":
      r = "bg-green-100 border-green-400 text-green-700";
      break;
    case "warning":
      r = "bg-yellow-100 border-yellow-400 text-yellow-700";
      break;
    default:
      r = "bg-gray-100 border-gray-400 text-gray-700";
  }
  n.innerHTML = `<div class="${o} ${r}" role="alert">${s}</div>`;
}
function y() {
  const t = document.querySelector("#logoutButton");
  console.log(t);
  const e = "//";
  t &&
    t.addEventListener("click", () => {
      d(), (window.location.href = `${e}login/`);
    });
}
async function v() {
  var n, o;
  const t = `${m.apiUrl}venues`,
    e = await fetch(t),
    s = await e.json();
  if ((console.log(s), !e.ok))
    throw new Error(
      ((o = (n = s.errors) == null ? void 0 : n[0]) == null
        ? void 0
        : o.message) || "Fetching venues failed",
    );
  return s;
}
function h(t, e) {
  if (e.length === 0) return "<div class='text-center'>No venues found</div>";
  console.log("renderVenueListtttttttttttttttttttt");
  const s = e.map((n) => w(n));
  console.log("venue Card func", s), (t.innerHTML = ""), t.append(...s);
}
const w = (t) => {
  const { media: e, id: s } = t,
    n = document.createElement("a");
  (n.className = "bg-cover bg-center h-64 rounded-lg shadow-md"),
    (n.href = `/venue/?id=${s}`);
  const o = (e == null ? void 0 : e[0]) || "https://placehold.co/400x400";
  return (n.style.backgroundImage = `url(${o})`), n;
};
async function L() {
  const t = document.querySelector("#venue-container");
  console.log("displayVenuesList");
  try {
    const e = await v();
    console.log("venues from displayVenuesList", e), h(t, e);
  } catch (e) {
    console.log(e), b(t, "error", e.message);
  }
}
function $() {
  const t = "//";
  p(), y();
  const e = window.location.pathname;
  console.log(e), console.log(t), console.log(L()), console.log("i work");
}
$();
