import supertest from "supertest";
import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";

describe("POST /api/users", () => {

  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        username: "eling",
      },
    });
  });

  it("should can register new user", async () => {
    const result = await supertest(web)
      .post("/api/users")
      .send({
        username: "eling",
        password: "rahasia",
        name: "Rancang Digital",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("eling");
    expect(result.body.data.name).toBe("Rancang Digital");
    expect(result.body.data.password).toBeUndefined();
  });

});
