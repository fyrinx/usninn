const request = require('supertest')
const app = require('../app.js')

describe('Borrow API', () => {
    it('should create a borrow',async function () {
            const res = await request(app).post('/api/borrow')
                .send({
                    studentId: 2,
                    toolId: 1,
                    itemCount: 1,
                })
            //const list = await getAll();
            //console.log(list.body);
            console.log(res.statusCode);
            //console.log(list.body.length);
            expect(res.statusCode).toEqual(200);
            //expect(list.body.length).toEqual(1);

        })


    function getAll(){
        return request(app).get('/api/borrow');
    }
})
