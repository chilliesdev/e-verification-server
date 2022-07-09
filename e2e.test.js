require("dotenv").config();
const { spec, request } = require("pactum");
const connectDB = require("./config/connectDb");
const Student = require("./model/Student");
const User = require("./model/User");

const NEWTIMEOUT = 60 * 1000;
jest.setTimeout(NEWTIMEOUT);
request.setBaseUrl("http://localhost:8000");

beforeAll(async () => {
  await connectDB();
  await User.deleteMany({});
  await Student.deleteMany({});
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
      .withHeaders("Authorization", "Bearer $S{userToken}")
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
      .withHeaders("Authorization", "Bearer $S{userToken}")
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
    await spec()
      .get("/user")
      .withHeaders("Authorization", "Bearer $S{userToken}")
      .expectStatus(200);
  });

  it("Get", async () => {
    await spec()
      .get("/user/$S{userId}")
      .withHeaders("Authorization", "Bearer $S{userToken}")
      .expectStatus(200);
  });

  it("Delete", async () => {
    await spec()
      .delete("/user")
      .withHeaders("Authorization", "Bearer $S{userToken}")
      .withBody({
        id: "$S{userId}",
      })
      .expectStatus(200);
  });
});

describe("Student CRUD", () => {
  it("Create", async () => {
    await spec()
      .post("/student")
      .withHeaders("Authorization", "Bearer $S{userToken}")
      .withBody({
        name: "firstname lastname",
        matricNumber: "Mat 001",
        dataOfBirth: new Date("03/02/1999"),
        level: "100 Level",
        department: "Department 1",
        faculty: "Faculty 2",
      })
      .expectStatus(201)
      .stores("studentId", "_id");
  });

  it("Upate", async () => {
    await spec()
      .patch("/student")
      .withHeaders("Authorization", "Bearer $S{userToken}")
      .withBody({
        id: "$S{studentId}",
        name: "firstname lastname",
        matricNumber: "Mat 002",
        dataOfBirth: new Date("03/02/1999"),
        level: "100 Level",
        department: "Department 1",
        faculty: "Faculty 2",
      })
      .expectStatus(200);
  });

  it("Get All", async () => {
    await spec()
      .get("/student")
      .withHeaders("Authorization", "Bearer $S{userToken}")
      .expectStatus(200);
  });

  it("Get", async () => {
    await spec()
      .get("/student/$S{studentId}")
      .withHeaders("Authorization", "Bearer $S{userToken}")
      .expectStatus(200);
  });

  it("Delete", async () => {
    await spec()
      .delete("/student")
      .withHeaders("Authorization", "Bearer $S{userToken}")
      .withBody({
        id: "$S{studentId}",
      })
      .expectStatus(200);
  });
});
