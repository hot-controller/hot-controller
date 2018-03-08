afterAll(() => {
  (global.__COMPILERS__ || []).forEach(compiler => {
    compiler.close();
  });
});
