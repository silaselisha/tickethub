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

        const authenticatedUser = await request(app)
            .post('/api/v1/users/signin')
            .send({
                email: 'test@test.com',
                password: 'Test1234$'
            }).expect(200)

        const cookie = authenticatedUser.get('Set-Cookie')

        const resposne = await request(app)
                .get('/api/v1/users/current-user')
                .set('Cookie', cookie)
                .send({})

        const { email } = resposne.body.currentUser
   
        expect(resposne.status).toBe(200)
        expect(resposne.body).toHaveProperty('status', 'success')
        expect(email).toBe('test@test.com')
    })
})