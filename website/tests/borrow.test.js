const request = require('supertest')
const app = require('../app.js')

describe('Borrow API', () => {
    it('should create a borrow',async function () {
            const res = await request(app).post('/api/borrow')
                .send({
                    studentId: 2,
                    toolId: 1,
                    itemCount: 1,
                    deadlineDate: "2021-12-14"
                })
            const list = await getAll();
            //console.log(list.body);
            
            expect(res.statusCode).toEqual(200);
            expect(list.body.length).toEqual(1);

        })
    it('should update the borrow', async function () {
        const res = await request(app).put('/api/borrow/1')
                .send({
                    toolId:1,
                    itemCount:1
                })
        expect(res.statusCode).toEqual(200);
    })



    function getAll(){
        return request(app).get('/api/borrow');
    }
})
