import request from 'supertest'
import app from '../../app'

describe('Signup API', () => {
    beforeEach(async () => {
        process.env.jwtsecret = 'jsonwebtoken'
    })

    test('signup route 201 status code', async () => {
    
       const response = await request(app)
            .post('/api/v1/users/signup')
            .send({
                email: 'test@test.com',
                password: 'Test1234$'
            })
        
        expect(response.status).toBe(201)
        expect(response.body.data).toHaveProperty('email', 'test@test.com')
        expect(response.body).toHaveProperty('status', 'success')
    })

    test('signup invalid email route 400 status code', async () => {

        const response = await request(app)
              .post('/api/v1/users/signup')
              .send({
                    email: 'test@test',
                    password: 'Test1234$'
               })
        const [data] = response.body.errors
        expect(response.status).toBe(400)
        expect(data).toHaveProperty('message', 'provide a valid email address!')
        expect(data).toHaveProperty('field', 'email')
        expect(response.body).toHaveProperty('status', 'failed')
    })

    test('signup invalid password route 400 status code', async () => {

        const response = await request(app)
              .post('/api/v1/users/signup')
              .send({
                    email: 'test@test.com',
                    password: 'test1234$'
               })
        const [data] = response.body.errors
        expect(response.status).toBe(400)
        expect(data).toHaveProperty('message', 'provide a valid password!')
        expect(data).toHaveProperty('field', 'password')
        expect(response.body).toHaveProperty('status', 'failed')
    })

    test('signup cookie session header set 201 status code', async () => {

        const response = await request(app)
              .post('/api/v1/users/signup')
              .send({
                    email: 'test@test.com',
                    password: 'Test1234$'
               })
       
        expect(response.status).toBe(201)
        expect(response.body.data).toHaveProperty('email', 'test@test.com')
        expect(response.body).toHaveProperty('status', 'success')
        expect(response.get("Set-Cookie")).toBeDefined()
    })
})
