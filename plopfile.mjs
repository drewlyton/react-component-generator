export default async function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  await plop.load('./dist/.')
}
