import * as Handlebars from 'handlebars'
import { kebabCase, snakeCase, lowerCase, upperCase, camelCase } from 'lodash'

export const registerHandlebars = () => {
  Handlebars.registerHelper('toLowerCase', (str: string) => lowerCase(str))
  Handlebars.registerHelper('toUpperCase', (str: string) => upperCase(str))
  Handlebars.registerHelper('toSnakeCase', (str: string) => snakeCase(str))
  Handlebars.registerHelper('toKebabCase', (str: string) => kebabCase(str))
  Handlebars.registerHelper('toCamelCase', (str: string) => camelCase(str))
  Handlebars.registerHelper('toPascalCase', (str: string) => {
    const camelCased = camelCase(str)
    return camelCased.charAt(0).toUpperCase() + camelCased.slice(1)
  })
}
