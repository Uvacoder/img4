const filenamify = require('filenamify');
const slugify = require('slugify')

module.exports = function (plop) {

   


    // create your generators here
    plop.setGenerator('post', {
        description: 'Create a new post',
        prompts: [{
            type: 'input',
            name: 'title',
            message: 'What is the title of the post?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'What is the description of the post?'
        },
        {
            type: 'input',
            name: 'category',
            message: 'What category does it belong in?'
        }
        ], // array of inquirer prompts
        actions: function(data) {

            const todayDate = new Date().toISOString().slice(0,10);
            const path = `src/pages/articles/${todayDate}--${filenamify(data.title).replace(/\s/g, '-').replace(/\./g,'')}/index.md`;

            return [
                {
                type: 'add',
                path,
                templateFile: 'templates/post.hbs',
                data: {
                    ...data,
                    date: new Date().toISOString(),
                    slug: slugify(data.title).replace(/\s/g, '-').replace(/\./g,'')
                }
                }
            ]

            
        }
    });
};