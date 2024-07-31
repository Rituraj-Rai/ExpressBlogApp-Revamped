const Blog = require('../model/blogModel');

const showAllBlogs = async (req, res) => {
    try{
        const blogs = await Blog.find({});
        console.log("Page Visited!! ip: "+ req.ip);
        res.render('index',{blogs});
    }
    catch (err){
        console.log(err.message);
    }
};

const createBlog = (req, res) => {

    req.body.blog.body = req.sanitize(req.body.blog.body);

    Blog.create(req.body.blog).then((dt)=>{
        res.redirect("/blogs");
        console.log("New Post Added");
        console.log(dt);
    }).catch((err) =>{
        console.log(err)
        res.redirect("/blogs/new");
    });
}

const showBlog = async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.id);
        res.render('show',{ blog });
    }
    catch(err){
        console.log(err);
        res.redirect("/");
    }
}

const updateBlog = async (req, res) => {
    try{
        const newdta = await Blog.findByIdAndUpdate(req.params.id, req.body.blog, { new:true });
        console.log("Post Updated!!");
        console.log(newdta);
        res.redirect('/blogs/'+req.params.id);
    }
    catch (err){
        console.log(err);
        res.redirect("/");
    }
}

const deleteAuth = (req, res, next) => {
    console.log(req.body);
    const { delpwd } = req.body;
    if(delpwd === process.env.DEL_KEY) next();
    else res.send("<h2>Wrong Password, Go back and enter correct one</h2>");
}

const deleteBlog = async (req, res) => {
    try{
        await Blog.findByIdAndDelete(req.params.id);
        console.log("Post Deleted!!");
        res.redirect("/");
    }
    catch (err){
        console.log(err);
        res.send("Post not deleted. err");
    }
}

module.exports = {
    showAllBlogs,
    createBlog,
    updateBlog,
    deleteAuth,
    deleteBlog,
    showBlog
};