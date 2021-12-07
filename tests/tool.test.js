const request = require('supertest')
const app = require('../app.js')

describe('Tool API', () => {
    it('should show all tools', async () => {
        const res =await getAll();
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toEqual(4)
        expect(res.body[0].toolName).toEqual("Raspberry Pi")
    })
    it('should create a tool',async ()=> {
        const res= await request(app).post('/api/tools')
        .send({
            toolName: 'Strapon',
            toolsIn: 6,
            toolsTotal: 6 

        })
        const list=await getAll();
        expect(res.statusCode).toEqual(200)
        expect(list.body.length).toEqual(5)
        
    })
    it('should edit a tool',async ()=> {
        const id=4;
        const res= await request(app).put('/api/tools/'+id)
        .send({
            toolName: 'Analkuler',
            toolsIn: 6,
            toolsTotal: 7 

        })
        const list=await getAll();
        expect(res.statusCode).toEqual(200)
        expect(list.body.length).toEqual(5)
        expect(list.body[4].toolName).toEqual("Analkuler")
        
        
    })
    it('should delete a tool',async()=>{
        const id=4;
        const res= await request(app).delete('/api/tools/'+id)
        const list=await getAll();
        expect(res.statusCode).toEqual(200)
        expect(list.body.length).toEqual(4)
    })


    function getAll(){
        return request(app).get('/api/tools/')
    }
})