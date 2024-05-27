module.exports = plop => {
    plop.setGenerator('component', {
      description: 'Create a component',
      // User input prompts provided as arguments to the template
      prompts: [
        {
          // Raw text input
          type: 'input',
          // Variable name for this input
          name: 'name',
          // Prompt to display on command line
          message: 'Name:'
        },
        {
          // Raw text input
          type: 'input',
          // Variable name for this input
          name: 'path',
          default: 'src/components',
          // Prompt to display on command line
          message: 'PATH:'
        },
      ],
      actions: [
        {
          // Add a new file
          type: 'add',
          // Path for the new file
          path: '{{path}}/{{pascalCase name}}/index.tsx',
          // Handlebars template used to generate content of new file
          templateFile: 'plop-templates/Component.js.hbs',
        },
        {
          // Add a new file
          type: 'add',
          // Path for the new file
          path: '{{path}}/{{pascalCase name}}/use{{pascalCase name}}.tsx',
          // Handlebars template used to generate content of new file
          templateFile: 'plop-templates/ComponentHook.js.hbs',
        },
      ],
    });
    plop.setGenerator('page', {
      description: 'Create a page',
      // User input prompts provided as arguments to the template
      prompts: [
        {
          // Raw text input
          type: 'input',
          // Variable name for this input
          name: 'name',
          // Prompt to display on command line
          message: 'NAME:'
        },
        {
          // Raw text input
          type: 'input',
          // Variable name for this input
          name: 'path',
          default: 'src/app',
          // Prompt to display on command line
          message: 'PATH:'
        },
      ],
      actions: [
        {
          // Add a new file
          type: 'add',
          // Path for the new file
          path: '{{path}}/{{name}}/page.tsx',
          // Handlebars template used to generate content of new file
          templateFile: 'plop-templates/Page.js.hbs',
        },
      ],
    });
    plop.setGenerator('hook', {
      description: 'Create a hook',
      // User input prompts provided as arguments to the template
      prompts: [
        {
          // Raw text input
          type: 'input',
          // Variable name for this input
          name: 'name',
          // Prompt to display on command line
          message: 'NAME:'
        },
        {
          // Raw text input
          type: 'input',
          // Variable name for this input
          name: 'path',
          default: 'src/hooks',
          // Prompt to display on command line
          message: 'PATH:'
        },
      ],
      actions: [
        {
          // Add a new file
          type: 'add',
          // Path for the new file
          path: '{{path}}/{{camelCase name}}.tsx',
          // Handlebars template used to generate content of new file
          templateFile: 'plop-templates/Hook.js.hbs',
        },
      ],
    });
  };