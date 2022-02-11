<img src = "https://github.com/bsattam/travel-the-world-blog/blob/main/Blog%20app%20images/blog-1.png">
<h3 align = "center">Share your Travelling Experience with fellow Wanderers</h3>

## Motivation
I developed this website while learning backend technologies. I used express for backend server, and mongoDB as database. I used React for frontend.

## Features
- CRUD operations for blogs
- Authentication using bcrypt
- Sorting blogs based on Author or Category
- Compressing images and uploading them on AWS S3

## Demo

Landing Page           |  Uploading New Blog
:-------------------------:|:-------------------------:
![](https://github.com/bsattam/travel-the-world-blog/blob/main/Blog%20app%20images/blog-1.png)  |  ![](https://github.com/bsattam/travel-the-world-blog/blob/main/Blog%20app%20images/blog-2.png)
Reading A Blog             |  List of All Blogs
![](https://github.com/bsattam/travel-the-world-blog/blob/main/Blog%20app%20images/blog-3.png)  |  ![](https://github.com/bsattam/travel-the-world-blog/blob/main/Blog%20app%20images/blog-4.png)

## Environment Variables
To run this project, you will need to add the following environment variables to your .env file

#### SERVER
- DATABASE
- DATABASE_PASSWORD
- AWS_BUCKET_NAME
- AWS_BUCKET_REGION
- AWS_ACCESS_KEY
- AWS_SECRET_KEY

## Local Development
Clone the project
```
https://github.com/bsattam/travel-the-world-blog
```
Install dependencies
```bash
npm install
npm install -D
```
Start the server ( PORT: 5050 )

```
  npm start
```

## Future Plans
- Adding Google Authentication
- Feature to Crop Images while uploading

## Feedback

If you have any feedback, please reach out to me at bsattam@gmail.com

## License

[GPL](https://choosealicense.com/licenses/gpl-3.0/)
