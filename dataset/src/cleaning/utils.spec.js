const { removeSpecialChars } = require("./utils");

describe("removeSpecialChars", () => {
  it("should remove parentheses and its contents", () => {
    expect(removeSpecialChars("test (test)")).toEqual("test ");
    expect(removeSpecialChars("test(test)")).toEqual("test");
    expect(removeSpecialChars("(test)")).toEqual("");
  });

  it("should remove empty parentheses", () => {
    expect(removeSpecialChars("test()")).toEqual("test");
    expect(removeSpecialChars("()")).toEqual("");
  });
});
