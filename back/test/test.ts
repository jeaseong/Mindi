import * as chai from "chai";
import chaiHttp = require("chai-http");
import server from "../src/app";

chai.use(chaiHttp);

describe("Users", () => {
  describe("GET /users", () => {
    it("should get info of current user", (done) => {
      chai.request(server)
        .get("/user")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.haveOwnProperty("_id");
          res.body.should.haveOwnProperty("email");
          res.body.should.haveOwnProperty("name");
          res.body.should.haveOwnProperty("recentLogin");
          done();
        });
    });
  });
});