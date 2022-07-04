const { spec } = require("pactum");

it("Hello World", async () => {
  await spec().get("http://localhost:8000/").expectStatus(200);
});
