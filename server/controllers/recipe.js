var express = require('express'),
    router = express.Router();

global.recipe = [{
    id: 1,
    name: "Beans",
    upvote: 1
}]
global.review = [{
    recipeId: 1,
    content: "Nice"
}]
router.get('/', (req, res) => {
    return res.status(200).json({
        "message": "my nice API"
    });
});
router.get('/recipe', (req, res) => {
    return res.status(200).json({
        'recipe': global.recipe,
        error: false
    });
});
router.post('/recipe', (req, res) => {
    if (!req.body.name) {
        return res.status(404).json({
            message: "No recipe name",
            error: true
        });
    }
    global.recipe.push(req.body);
    return res.status(201).json({
        message: "success",
        error: false
    })
});

router.put('/recipe/:recipeId', (req, res) => {
    for (let i = 0; i < global.recipe.length; i++) {
        if (global.recipe[i].id === parseInt(req.params.recipeId, 10)) {
            global.recipe[i].name = req.body.name;
            global.user_id[i].upvote = req.body.upvote;
            return res.status(200).json({
                message: "Success",
                error: false
            });
        }
    }
    return res.status(404).json({
        message: "User not found",
        error: true
    });
});

router.get('/recipe/:recipeId', (req, res) => {
    for (let i = 0; i < global.recipe.length; i++) {
        if (global.recipe[i].id === parseInt(req.params.recipeId, 10)) {
            return res.status(200).json({
                recipe: global.recipe[i],
                message: "Success",
                error: false
            });
        }
    }
    return res.status(404).json({
        message: "Failed",
        error: true
    });
})
router.delete('/recipe/:recipeId', (req, res) => {
    for (let i = 0; i < global.recipe.length; i++) {
        if (global.recipe[i].id === parseInt(req.params.recipeId, 10)) {
            global.recipe.splice(i, 1);
            return res.status(204).json({
                message: "Success",
                error: false
            });
        }
    }
    return res.status(404).json({
        message: "Failed",
        error: true
    });

});

router.post('/recipe/:recipesId/review', (req, res) => {
    for (let i = 0; i < global.recipe.length; i++) {
        if (global.recipe[i].id === parseInt(req.params.recipesId, 10)) {
            global.review.push(req.body)
            global.recipe[i].reviewid.push(review[i].id)
            return res.status(200).json({
                message: "Success",
                error: false
            });
        }
    }
    return res.status(404).json({
        message: "User not found",
        error: true
    });
});



console.log("we have the server working")
module.exports = router;