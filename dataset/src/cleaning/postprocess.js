module.exports = (item) => {
  if (item.length < 3) {
    return "";
  }

  return item
    .replace(/(\s|^)(\w{1,2})(\s|$)/gi, "$1$3")
    .replace(/(\s|^)(\d+)(\s|$)/gi, "$1$3")
    .replace(/(\s|^)(\w{1,2})(\s|$)/gi, "$1$3")
    .replace(/-(\s+)?$/g, "")
    .replace(/\s\s+/g, " ")
    .trim();
};
