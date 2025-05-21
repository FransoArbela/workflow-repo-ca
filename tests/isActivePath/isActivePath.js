export function isActivePath(currentPath, href) {
  if (href === "/" && (currentPath === "/" || currentPath === "/index.html")) {
    return true;
  }

  if (currentPath === href) return true;

  if (href !== "/" && currentPath.includes(href)) return true;

  return false;
}
