"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_services_1 = __importDefault(require("../../services/user.services"));
describe("Health Test", function () {
    it("Farmsagora test is healthy", function () {
        expect("hello").toEqual("hello");
    });
});
jest.mock('../../services/user.services', () => ({
    createUser: jest.fn(),
}));
test('should create a user and return the response', () => __awaiter(void 0, void 0, void 0, function* () {
    // Mock the UserServices.createUser to return a predefined data object
    const mockCreateUser = jest.fn().mockResolvedValue({
        STATUS_CODE: 200,
        STATUS: 'success',
        MESSAGE: 'User created successfully',
        DATA: { id: 1, email: 'JohnDoe@gmail.com', password: '12345678' },
    });
    // Assign the mock function to the actual implementation
    user_services_1.default.createUser(mockCreateUser);
    // Prepare a request body object to simulate the request
    const requestBody = { email: 'JohnDoe@gmail.com', password: '12345678' };
    // Send a request to the create function
    // const response = await request(create)
    //   .post('/api/v1/users') // Replace with the actual endpoint URL
    //   .send(requestBody);
    //   console.log(response)
    // Assertions
    // expect(response.statusCode).toBe(200);
    //   expect(response.body).toEqual({
    //     status: 'success',
    //     message: 'User created successfully',
    //     data: { id: 1, email: 'JohnDoe@gmail.com', password:"12345678" },
    //   });
}));
// test('should handle server errors and return the error response', async () => {
//   // Mock the UserServices.createUser to throw an error
//   const mockCreateUser = jest.fn().mockRejectedValue(new Error('Some error message'));
//   // Assign the mock function to the actual implementation
//   UserServices.createUser.mockImplementation(mockCreateUser);
//   // Prepare a request body object to simulate the request
//   const requestBody = { name: 'John Doe' };
//   // Send a request to the create function
//   const response = await request(create)
//     .post('/your-endpoint-url') // Replace with the actual endpoint URL
//     .send(requestBody);
//   // Assertions
//   expect(response.statusCode).toBe(500);
//   expect(response.body).toEqual({
//     status: 'failed',
//     error: 'Some error message',
//   });
// });
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// describe('Google Auth Signup API', () => {  
// Initialize mock before using it
// const findOneMock = jest.spyOn(users, 'findOne');
// const createMock = jest.spyOn(users, 'findOne');
// beforeEach(() => {
//   findOneMock.mockReset();
//   createMock.mockReset();
// });
// afterEach(() => {
//   jest.restoreAllMocks();
// });
// })
