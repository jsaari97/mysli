const { postProcess } = require(".");

describe("Post Process", () => {
  it("should empty short inputs", () => {
    expect(postProcess("ab")).toEqual("");
    expect(postProcess("abc")).toEqual("abc");
  });

  it("should remove trailing special characters", () => {
    expect(postProcess("-abc-")).toEqual("-abc");
    expect(postProcess("abc-")).toEqual("abc");
    expect(postProcess("abc- ")).toEqual("abc");
    expect(postProcess("abc.")).toEqual("abc");
    expect(postProcess("abc,")).toEqual("abc");
  });

  it("should remove short words", () => {
    expect(postProcess("abc ab a")).toEqual("abc");
    expect(postProcess("ab abc a")).toEqual("abc");
    expect(postProcess("ab 12 abc a")).toEqual("abc");
    expect(postProcess("ab abc-abc a 12")).toEqual("abc-abc");
  });
});
