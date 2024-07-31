const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();

router.get('/', blogController.showAllBlogs);

// NEW -->
router.get('/new',(req,res)=>{
    res.render('new');
});

//CREATE Route -->
router.post('/', blogController.createBlog);

//SHOW Route -->
router.get('/:id', blogController.showBlog);

//UPDATE Route -->
router.put('/:id', blogController.updateBlog);

// DELETE Route -->
router.delete('/:id', blogController.deleteAuth, blogController.deleteBlog);

module.exports = router;