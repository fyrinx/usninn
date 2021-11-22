const request = require('supertest')
const app = require('../app.js')

describe('Student API', () => {
    it('should show all students', async () => {
        const res =await getAll();
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toEqual(4)
        expect(res.body[0].firstName).toEqual("Petter")
    })
    it('should create a student',async ()=> {
        const res= await request(app).post('/api/students')
        .send({
            firstName: 'Test',
            lastName: 'Testesen', 
            email: 'test@example.com'

        })
        const list=await getAll();
        expect(res.statusCode).toEqual(201)
        expect(list.body.length).toEqual(5)
        
    })
    it('should edit a student',async ()=> {
        const id=5;
        const res= await request(app).put('/api/students/'+id)
        .send({
            firstName: 'Tull',
            lastName: 'Tullingen', 
            email: 'test@example.com'

        })
        const list=await getAll();
        expect(res.statusCode).toEqual(204)
        expect(list.body.length).toEqual(5)
        expect(list.body[4].firstName).toEqual("Tull")
        expect(list.body[4].lastName).toEqual("Tullingen")
        expect(list.body[4].email).toEqual("test@example.com")
        
    })
    it('should delete a student',async()=>{
        const id=5;
        const res= await request(app).delete('/api/students/'+id)
        const list=await getAll();
        expect(res.statusCode).toEqual(200)
        expect(list.body.length).toEqual(4)
    })


    function getAll(){
        return request(app).get('/api/students')
    }
})