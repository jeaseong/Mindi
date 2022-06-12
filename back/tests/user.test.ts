import { IUserModel } from "../src/interfaces/IUserModel";

export class TestUserModel implements IUserModel {
  async create(email: string, name: string, password: string) {
    return {
      _id: "asdf1234dfasdf",
      email,
      name
    }
  };

  async update(filter: Object, fieldToUpdate: Object) {
    return {
      _id: "asdf1234dfasdf",
      ...fieldToUpdate
    };
  };

  async delete(userId: string) {
    return;
  }

  async findOne(filter: Object) {
    return {
      _id: "asdf1234dfasdf",
      email: "acorn12345@elice.co.kr",
      name: "acorn",
      password: "asdf1234"
    };
  }

  async findMany(filter: Object) {
    return [
      {
        _id: "asdf1234dfasdf",
        email: "acorn12345@elice.co.kr",
        name: "acorn",
        password: "asdf1234"
      },
      {
        _id: "asdf1234dfaasdf34",
        email: "apple12345@elice.co.kr",
        name: "apple",
        password: "asdf1234"
      }
    ];
  }

  async exists(filter: Object) {
    return true;
  };
}