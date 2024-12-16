const express = require("express");
const UserModel = require("../model/UserModel");
const { isAuthorized } = require("../middleware/auth");
const { signup, login } = require("../controller/AuthController");
const User = require("../model/UserModel");
const jwt = require('jsonwebtoken');
const CategoryArticleController = require("../controller/CategoryArticleController");
const CategoryCourseController = require("../controller/CategoryCourseController");
const ArticleController = require("../controller/ArticleController");
const CourseController = require("../controller/CourseController");
const ForumController = require("../controller/ForumController");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Upload folder
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName); // Save the file with a unique name
    },
});

const upload = multer({ storage });

router.post("/check/role", async function(req, res, next) {
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    res.status(200).json(decoded);
});

router.post("/register", signup);
router.post("/login", login);

router.get("/admin/category/article", CategoryArticleController.list)
router.post("/admin/category/article/add", CategoryArticleController.add)
router.get("/admin/category/article/edit/:id", CategoryArticleController.getEdit)
router.post("/admin/category/article/edit/:id", CategoryArticleController.postEdit)
router.post("/admin/category/article/delete/:id", CategoryArticleController.postDelete)

router.get("/admin/category/course", CategoryCourseController.list)
router.post("/admin/category/course/add", CategoryCourseController.add)
router.get("/admin/category/course/edit/:id", CategoryCourseController.getEdit)
router.post("/admin/category/course/edit/:id", CategoryCourseController.postEdit)
router.post("/admin/category/course/delete/:id", CategoryCourseController.postDelete)

router.get("/article/popular", ArticleController.popularArticle)
router.get("/admin/article", ArticleController.list)
router.post("/admin/article/add", upload.single("image"), ArticleController.add)
router.get("/admin/article/edit/:id", ArticleController.getEdit)
router.get("/detail/article/get/:id", ArticleController.getArticle)
router.post("/article/like/:id", ArticleController.likeArticle)
router.post("/article/comment/:id", ArticleController.commentArticle)
router.post("/forum/like/:id", ForumController.likeForum)
router.post("/forum/comment/:id", ForumController.commentForum)
router.post("/admin/article/edit/:id", upload.single("image"), ArticleController.postEdit)
router.post("/admin/article/delete/:id", upload.single("image"), ArticleController.postDelete)

router.get("/admin/course", CourseController.list)
router.post("/admin/course/add", upload.fields([
    { name: 'image', maxCount: 1 },
  ]), CourseController.add)
router.get("/admin/course/edit/:id", CourseController.getEdit)
router.get("/admin/course/module/:id", CourseController.getModuleEdit)
router.post("/admin/course/edit/:id", upload.fields([
    { name: 'image', maxCount: 1 },
  ]), CourseController.postEdit)
router.post("/admin/course/delete/:id", CourseController.postDelete)
router.post("/user/start/course/:id", CourseController.userStartCourse)
router.post("/user/course/rangkuman/complete/:id", CourseController.userCompleteRangkuman)
router.post("/user/quiz/complete/:id", CourseController.userCompleteQuiz)
router.get("/user/quiz/hasil/:id", CourseController.userQuizResult)
router.get("/user/courses/", CourseController.userCourses)
router.get("/user/forums/", ForumController.getForums)
router.get("/user/forum/get/:id", ForumController.getForum)
router.post("/user/post/forum/", upload.single("image"), ForumController.userPostForum)
router.get("/user/profile/", ForumController.getUser)
router.post("/user/profile/", upload.single("image"), ForumController.postUser)



module.exports = router;
