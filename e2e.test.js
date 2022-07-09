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

describe("User Auth", () => {
  it("Register", async () => {
    await spec()
      .patch("/auth")
      .withBody({
        email: "email@email.com",
        password: "password",
        name: "firstname lastname",
        dataOfBirth: new Date("03/02/1999"),
        educationLevel: "BSc",
        position: "Position 1",
        department: "Department 1",
        staffNo: "Staff 1",
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
      .stores("userToken", "accessToken");
  });
});

describe("User CRUD", () => {
  it("Create", async () => {
    await spec()
      .post("/user")
      .withBody({
        email: "email1@email.com",
        password: "password",
        name: "firstname lastname",
        dataOfBirth: new Date("03/02/1999"),
        educationLevel: "BSc",
        position: "Position 1",
        department: "Department 1",
        staffNo: "Staff 2",
      })
      .expectStatus(201)
      .stores("userId", "_id");
  });

  it("Upate", async () => {
    await spec()
      .patch("/user")
      .withBody({
        id: "$S{userId}",
        email: "email2@email.com",
        password: "password",
        name: "firstname1 lastname1",
        dataOfBirth: new Date("03/02/1999"),
        educationLevel: "BSc",
        position: "Position 1",
        department: "Department 1",
        staffNo: "Staff 3",
      })
      .expectStatus(200);
  });

  it("Get All", async () => {
    await spec().get("/user").expectStatus(200);
  });

  it("Get", async () => {
    await spec().get("/user/$S{userId}").expectStatus(200);
  });

  it("Delete", async () => {
    await spec()
      .delete("/user")
      .withBody({
        id: "$S{userId}",
      })
      .expectStatus(200);
  });
});
