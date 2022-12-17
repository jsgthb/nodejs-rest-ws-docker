const app = require("../../app");
const request = require("supertest");
const mockingoose = require('mockingoose');
const User = require("../../model/User")

describe("POST /users/register", () => {
    const postData = {
        username: "testuser",
        password: "testpassword"
    }

    it("returns status code 201 if username and password are passed and user does not exist", async () => {
        // Mock no duplicate user found
        mockingoose(User).toReturn(null, 'findOne')
        // Mock user insertion
        mockingoose(User).toReturn(postData, 'create')
        const res = await request(app).post("/users/register").send(postData)

        expect(res.statusCode).toEqual(201)
    })

    it("returns status code 400 if no username or password is passed", async () => {
        const res = await request(app).post("/users/register").send({})

        expect(res.statusCode).toEqual(400)
    })

    it("returns status code 409 if user already exists", async () => {
        // Mock already existing user
        mockingoose(User).toReturn(postData, 'findOne')
        const res = await request(app).post("/users/register").send(postData)

        expect(res.statusCode).toEqual(409)
    })
})