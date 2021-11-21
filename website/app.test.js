const request =require('supertest');
const app=require('./app.js');

function mockSeed(){
    
}

describe("Should get a welcome-message", () => {

  describe("when passed a username and password", () => {
      test("should respond with a 200 status code",async()=>{
          const res= await request(app).get("/")
          expect(res.statusCode).toBe(200)
        })
      
  })

  
})