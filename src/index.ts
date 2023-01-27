import { NodePlopAPI } from 'plop'

import component, { GeneratorParams } from './component'

const generator = async (
  plop: NodePlopAPI,
  params: GeneratorParams
): Promise<void> => {
  plop.setHelper('includes', (array, string, options) => {
    if (array.includes(string)) {
      return options.fn(this)
    } else {
      return options.inverse(this)
    }
  })

  plop.setDefaultInclude({ generators: true })
  plop.setGenerator('component', component(params))
}

export = generator
