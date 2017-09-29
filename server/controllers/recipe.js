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
router.get('/api/recipe', function(req, res) {
    return res.json({
        'recipe': global.recipe,
        error: false
    });
});
router.post('/api/recipe', function(req, res) {
    if (!req.body.name) {
        return res.json({
            message: "No recipe name",
            error: true
        });
    }
    global.recipe.push(req.body);
    return res.json({
        message: "success",
        error: false
    })
});

router.put('/api/recipe/:recipeId', function(req, res) {
    for (let i = 0; i < global.recipe.length; i++) {
        if (global.recipe[i].id === parseInt(req.params.recipeId, 10)) {
            global.recipe[i].name = req.body.name;
            global.user_id[i].upvote = req.body.upvote;
            return res.json({
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

router.get('/api/recipe/:recipeId', function(req, res) {
    for (let i = 0; i < global.recipe.length; i++) {
        if (global.recipe[i].id === parseInt(req.params.recipeId, 10)) {
            return res.json({
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
router.delete('/api/recipe/:recipeId', function(req, res) {
    for (let i = 0; i < global.recipe.length; i++) {
        if (global.recipe[i].id === parseInt(req.params.recipeId, 10)) {
            global.recipe.splice(i, 1);
            return res.json({
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

router.post('/api/recipe/:recipeId/review', function(req, res) {
    for (let i = 0; i < global.recipe.length; i++) {
        if (global.recipe[i].id === parseInt(req.params.recipeId, 10)) {
            global.review[i].recipeId = req.body.recipeId;
            global.review[i].content = req.body.content;
            return res.json({
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

module.exports = router;