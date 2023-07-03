import request from 'supertest'
import app from '../../app'

describe('Signin API', () => {
    beforeAll(async () => {
        process.env.jwtsecret = 'jsonwebtoken'
    })
    
    test('login a user status code 200', async () => {
        await request(app)
            .post('/api/v1/users/signup')
            .send({
                email: 'test@test.com',
                password: 'Test1234$'
            })

        const response = await request(app)
            .post('/api/v1/users/signin')
            .send({
                email: 'test@test.com',
                password: 'Test1234$'
            })
        
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('status', 'success')
        expect(response.body.data.token).toBeDefined()
        expect(response.get('Set-Cookie')).toBeDefined()
    })

    test('login a user with invalid password status code 400', async () => {
        await request(app)
            .post('/api/v1/users/signup')
            .send({
                email: 'test@test.com',
                password: 'Test1234$'
            })

        const response = await request(app)
            .post('/api/v1/users/signin')
            .send({
                email: 'test@test.com',
                password: 'West1234$'
            })
        
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('status', 'failed')
        expect(response.body.errors[0]).toHaveProperty('message', 'provide valid email address or password')
        expect(response.get('Set-Cookie')).toBeUndefined()
    })

    test('login a user with invalid email status code 400', async () => {
        await request(app)
            .post('/api/v1/users/signup')
            .send({
                email: 'test@test.io',
                password: 'Test1234$'
            })

        const response = await request(app)
            .post('/api/v1/users/signin')
            .send({
                email: 'test@test.com',
                password: 'West1234$'
            })
        
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('status', 'failed')
        expect(response.body.errors[0]).toHaveProperty('message', 'provide valid email address or password')
        expect(response.get('Set-Cookie')).toBeUndefined()
    })
})