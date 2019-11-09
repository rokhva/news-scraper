
module.exports = (router) =>{

    //renders homepage
    router.get("/", (req, res) => {res.render("home")});

    //renders saved articles
    router.get("/saved", (req, res) => {res.render("saved")});

}