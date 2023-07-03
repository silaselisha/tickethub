import request from 'supertest'
import app from '../../app'

describe('Signout API', () => {
    beforeAll(async () => {
        process.env.jwtsecret = 'jsonwebtoken'
    })

    test('signout user status code 200', async () => {
        await request(app)
            .post('/api/v1/users/signup')
            .send({
                email: 'test@test.com',
                password: 'Test1234$'
            })

        await request(app)
            .post('/api/v1/users/signin')
            .send({
                email: 'test@test.com',
                password: 'Test1234$'
            }).expect(200)

        const resposne = await request(app)
                .get('/api/v1/users/signout')
                .send({})
   
        expect(resposne.status).toBe(200)
        expect(resposne.body).toHaveProperty('data', null)
        expect(resposne.get('Set-Cookie')[0]).toBe('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')
        expect(resposne.body).toHaveProperty('status', 'success')
    })
})