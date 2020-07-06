const { postProcess } = require(".");

describe("Post Process", () => {
  it("should empty inputs shorter than 3", () => {
    expect(postProcess("ab")).toEqual("");
    expect(postProcess("abc")).toEqual("abc");
  });
});
