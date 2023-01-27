export type GeneratorParams = {
  destBasePath: string
  componentFolderPath?: string
}

export default function (params: GeneratorParams) {
  const path = params.componentFolderPath || 'src/components'
  return {
    description: '⚛ React component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Name of the component',
      },
      {
        type: 'checkbox',
        name: 'files',
        message: 'Additional files to create...',
        loop: true,
        choices: [
          {
            name: 'Test',
            value: 'test',
            checked: true,
          },
          {
            name: 'Stories',
            value: 'stories',
            checked: true,
          },
        ],
      },
      {
        type: 'checkbox',
        name: 'features',
        message: 'Attributes of the component to autogenerate...',
        loop: true,
        choices: [
          {
            name: 'With Children',
            value: 'withchildren',
            checked: true,
          },
          {
            name: 'Forward Ref',
            value: 'forwardref',
            checked: false,
          },
        ],
      },
    ],
    actions: (data: unknown) => {
      const { files } = data as { files: string[] }
      const actions = [
        {
          type: 'add',
          path: `${path}/{{pascalCase name}}/{{pascalCase name}}.tsx`,
          templateFile: './templates/component.hbs',
        },
        {
          type: 'add',
          path: `${path}/{{pascalCase name}}/index.ts`,
          templateFile: './templates/component.index.hbs',
        },
      ]
      if (files.includes('test'))
        actions.push({
          type: 'add',
          path: `${path}/{{pascalCase name}}/{{pascalCase name}}.test.tsx`,
          templateFile: './templates/component.test.hbs',
        })
      if (files.includes('stories'))
        actions.push({
          type: 'add',
          path: `${path}/{{pascalCase name}}/{{pascalCase name}}.stories.tsx`,
          templateFile: './templates/component.stories.hbs',
        })

      return actions
    },
  }
}
