# Snippy VS Code Extension

Snippy is an extension built to speed up development in VS Code.

Have you ever found yourself creating similar files over and over again? Maybe you are on a team and want to share code snippets with each other that you can simply drop into the editor?

These are some of the problems that led to the development of Snippy.

![snippy-demo](https://github.com/benlikescode/snippy/assets/63207900/fb1ba333-24e2-473e-8127-f65d22c5c755)

## Installation 💻

1. First, make sure you have an account on [Snippy](https://snippy.app/).
2. Install the VS Code extension from the [extension marketplace](https://marketplace.visualstudio.com/items?itemName=snippy.snippy).
3. Click `Login To Snippy` in the bottom status bar and sign in to your GitHub account.
4. Once signed in, you'll see your default workspace in the status bar.

## What's a Snippy ❓

A Snippy can either be a file template or a code snippet that you create on the [Web App](https://snippy.app/) and can then reuse inside VS Code. At this time, only templates are available so the terms are used interchangeably.

## Templates 🎨

Templates are a combination of files/folders that you use often. Consider a React component which often has a file structure like so:

```
ComponentName
-- ComponentName.tsx
-- ComponentName.Styled.tsx
-- index.ts

```

Instead of creating the folder, then the files, then writing the boilerplate code... you could use a Snippy template that generates this in a few seconds.

### Creating A Template

1. Go to the Snippy [Web App](https://snippy.app/) and when signed in click `New Snippy`.
2. Give your snippy a name.
3. Add any prompts you want (variables you can use to make the template dynamic) - see below for more info on Prompts.
4. Create your file/folder structure as you want it to appear in VS Code.
5. Add the boilerplate code to each file by clicking on the file and adding it in the editor.
6. Click the `Create Snippy` button to save your new template.

### Prompts

You can define prompts when creating your templates which are variables you can use in your file/folder names or within the file content. This allows your boilerplate templates to be dynamic.

Example:

```
  # prompt = What is the name of this React component?
  # variable = name

  You can now use this variable in your template by wrapping it in {{ name }}

  The below example shows a template for a React component:
```

#### {{ name }}.tsx

```jsx
import { FC } from 'react'
import { Styled{{name}} } from '.'

type Props = {}

const {{name}}: FC<Props> = ({}) => {
  return (
    <Styled{{name}}>

    </Styled{{name}}>
  )
}

export default {{name}}

```

### Template Case Converters

If you want to convert the case of a prompt value, you can make use of the following converter helpers:

- toLowerCase
- toUpperCase
- toSnakeCase
- toKebabCase
- toCamelCase
- toPascalCase

Example: `{{ toPascalCase name }}`

### Using A Template

- Right click where you want to add the template and select `Use Snippy Template`
- If your template has prompts, you will be shown an input to enter the value for the prompt

## Workspaces ⚒

Everyone is assigned a default workspace with their Snippy account. You can create additional workspaces to help organize your Snippys and invite other members to share and collaborate.

### Changing Workspaces In VS Code

If you are signed in on the extension, you will see your active workspace in the bottom status bar. Clicking the status bar will open up a list of your workspaces, which you can then select to change into that workspace.

## Roadmap 🗺

- The ability to add code snippets
