import request  from 'supertest';
import { testServer } from '../../test-server';


describe('todo route testing', () => { 

    beforeAll(async()=>{
        await testServer.start();
    });

    afterAll(()=>{
        testServer.close();
    });
    

    test('should return TODOs api/todos ', async() => { 
        
        const res = await request(testServer.app)
            .get('/api/todos')
            .expect(200);

        console.log(res.body);
    });

});