require("dotenv").config();
const { spec, e2e, request } = require("pactum");
const connectDB = require("./config/connectDb");
const User = require("./model/User");

const NEWTIMEOUT = 60 * 1000;
jest.setTimeout(NEWTIMEOUT);
request.setBaseUrl("http://localhost:8000");

beforeAll(async () => {
  await connectDB();
  await User.deleteMany({});
});

describe("say Hello World", () => {
  it("Hello", async () => {
    await spec().get("/").expectStatus(200);
  });
});

describe("User Auth", () => {
  it("Register", async () => {
    await spec()
      .patch("/auth")
      .withBody({
        email: "email@email.com",
        password: "password",
        firstname: "firstname",
        lastname: "lastname",
      })
      .expectStatus(201);
  });

  it("Login", async () => {
    await spec()
      .post("/auth")
      .withBody({
        email: "email@email.com",
        password: "password",
      })
      .expectStatus(200)
      .stores("userToken", "accessToken")
      .inspect();
  });
});
