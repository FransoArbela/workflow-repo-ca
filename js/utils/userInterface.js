export const isActivePath = (href, currentPath) => {
  const base = import.meta.env.BASE_URL;
  if (href === "/") {
    return (
      currentPath === "/" ||
      currentPath === "/index.html" ||
      currentPath === `${base}/`
    );
  } else {
    return currentPath.includes(href);
  }
};
