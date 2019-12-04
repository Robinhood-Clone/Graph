let sum = (a,b) => a+b;

test('testing add function', () => {
    expect(sum(1,2)).toBe(3);
})