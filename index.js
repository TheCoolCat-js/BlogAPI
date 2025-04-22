// General Stuff for Express
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const users = [];
const admins = [];
const userPosts = [];
const posts = [];
const comments = [];
const videos = [];

app.get("/", (req, res) => {
  res.send(`Error, switch to http://localhost:${port}/users.`);
});

// USERS
app.get("/users", (req, res) => {
  if (users.length === 0) {
    res.send("No users found!");
  } else {
    res.json(users);
  }
});

// ADMINS
app.get("/users/admins", (req, res) => {
  if (admins.length === 0) {
    res.send("No admins found!");
  } else {
    res.json(admins);
  }
});

// USER POSTS
app.get("/users/posts", (req, res) => {
  if (userPosts.length === 0) {
    res.send("No available Posts found!");
  } else {
    res.json(userPosts);
  }
});

// POSTS
app.get("/posts", (req, res) => {
  if (posts.length === 0) {
    res.send("No posts are active!");
  } else {
    res.json(posts);
  }
});

// POST COMMENTS
app.get("/posts/comments", (req, res) => {
  if (comments.length === 0) {
    res.send("No comments found!");
  } else {
    res.json(comments);
  }
});

// VIDEOS
// app.get("/videos", (req, res) => {
//     if (videos.length === 0) {
//       res.send("No videos found!");
//     } else {
//       res.json(videos);
//     }
//   });

app.post("/users", (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    res.status(404).json({ error: "Email, Password and Name are mandatory!" });
    console.log("Error");
  }

  const newUser = {
    id: users.length + 1,
    email,
    password,
    name,
  };
  users.push(newUser);
  res.status(201).json({ newUser });
});

app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "User not found!" });
  }

  res.json(users[index]);
});

app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Requested User not found!" });
  }

  const deletedUser = users.splice(index, 1);
  res.json({ message: "User deleted!" });
});

app.post("/users/admins", (req, res) => {
  const { email, password, name, phoneNumber, adminLvl } = req.body;

  if (!email || !password || !name || !phoneNumber || !adminLvl) {
    res.status(404).json({
      error:
        "Email, Password, Name, Phone Number and Admin Level are mandatory!",
    });
    res.status(404).json({
      error:
        "Admin Levels: 1 - Admin, 2 - Senior Admin, 3 - Head Admin, 4 - COO, 5 - CEO",
    });
  }

  const newAdmin = {
    id: admins.length + 1,
    email,
    password,
    name,
    phoneNumber,
    adminLvl,
  };
  admins.push(newAdmin);
  res.status(201).json({ newAdmin });
});

app.delete("/users/admins/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = admins.findIndex((admin) => admin.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "No admins found." });
  }

  const deletedAdmin = admins.splice(index, 1);
  return res.status(201).json({ message: `Admin succesfully deleted` });
});

app.post("/users/posts", (req, res) => {
  const { name, title, content } = req.body;

  if (!name || !title || !content) {
    res.status(404).json({ error: "Name, Title and Content are mandatory!" });
    console.log("Error");
  }

  const newPost = {
    id: userPosts.length + 1,
    name,
    title,
    content,
  };
  userPosts.push(newPost);
  res.status(201).json({ newPost });
});

app.delete("/users/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = userPosts.findIndex((post) => post.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "No posts found." });
  }

  const deletedAdmin = userPosts.splice(index, 1);
  return res.status(201).json({ message: `Post succesfully deleted` });
});

app.post("/posts", (req, res) => {
  const { username, title, content, likes, comments } = req.body;

  if (!username || !title || !content) {
    res.status(404).json({
      error: "Username, Title, Content, Likes and Comments are mandatory!",
    });
    console.log("Error");
  }

  const newPost = {
    id: posts.length + 1,
    username,
    title,
    content,
    likes,
    comments,
  };
  posts.push(newPost);
  res.status(201).json({ newPost });
});

app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    return res.status(404).json({ error: "Requested post not found!" });
  }

  const deletedPost = posts.splice(postIndex, 1);
  return res.status(201).json({ message: "Post succesfully deleted!" });
});

app.post("/posts/comments", (req, res) => {
  const { username, commentContent, timeSent } = req.body;

  if (!username || !commentContent || !timeSent) {
    res.status(404).json({
      error: "Username, Content, Time Sent are mandatory!",
    });
    console.log("Error");
  }

  const newComment = {
    id: comments.length + 1,
    username,
    commentContent,
    timeSent,
  };
  comments.push(newComment);
  res.status(201).json({ newComment });
});

app.delete("/posts/comments/:id", (req, res) => {
  const commentId = parseInt(req.params.id);
  const commentIndex = comments.findIndex(
    (comment) => comment.id === commentId
  );
  if (commentIndex === -1) {
    res.status(404).json({ error: "Requested Comment not found!" });
  }

  const deletedComments = comments.splice(commentIndex, 1);
  return res.status(201).json({ message: "Comment successfully deleted" });
});

// app.post("/videos", (req, res) => {
//     const { videoSrc, videoTopic, videoHashtags, videoLikes, videoComments, videoShares, videoViews } = req.body;

//     if (!videoSrc || !videoTopic || !videoHashtags || !videoLikes || !videoComments || !videoShares || !videoViews) {
//         res.status(404).json({ error: "Video doesn't match requirements!" })
//     }

//     const newVideo = {
//         videoId: videos.length + 1,
//         videoSrc,
//         videoTopic,
//         videoLikes,
//         videoComments,
//         videoShares,
//         videoViews
//     }

//     videos.push(newVideo)
//     res.status(201).json({ newVideo })
// })

// app.delete("/videos/:id", (req, res) => {
//     const videoId = parseInt(req.params.id);
//     const videoIndex = videos.findIndex(
//       (video) => video.id === videoId
//     );
//     if (videoIndex === -1) {
//       res.status(404).json({ error: "Requested Video not found!" });
//     }
  
//     const deletedVideo = videos.splice(videoIndex, 1);
//     return res.status(201).json({ message: "Video successfully deleted" });
//   });

// STARTS THE APP
app.listen(port, () => {
  console.log(`LoginAPI Started! Listening on port ${port}`);
});
