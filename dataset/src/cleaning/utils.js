exports.replaceList = (list) => (target) => {
  let output = target;

  for (let i = 0; i < list.length; i++) {
    if (output.includes(list[i])) {
      output = output.replace(list[i], "");
    }
  }

  return output.trim();
};

exports.removeSpecialChars = (target) => target.replace(/\(.*?\)/, "");
