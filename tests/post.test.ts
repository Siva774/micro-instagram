import request from 'supertest';
import app from 'app';  // Make sure the path is correct

describe('POST /api/posts', () => {
  it('should create a new post', async () => {
    const response = await request(app)
      .post('/api/posts')
      .send({
        user_id: '605b3b2f8c6b8f001f8b4568', // Replace with a valid user ID from your DB
        title: 'My first post',
        description: 'This is a description of my first post',
        images: ['image1.jpg', 'image2.jpg'],
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('My first post');
  });
});
