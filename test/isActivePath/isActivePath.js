export function isActivePath(currentPath, href) {
  if ((currentPath === "/" || currentPath === "/index.html") && href === "/") {
    return true;
  }
  if (currentPath === href) {
    return true;
  }
  if (currentPath.includes(href)) {
    return true;
  }
  return false;
}
