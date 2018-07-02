import assert from 'assert'
import validator from './validator'

describe('src/utils/validator', () => {
  describe('#required', () => {
    it('should return null if value is truthy', () => {
      assert.strictEqual(validator.required('test'), null)
      assert.strictEqual(validator.required(new Date()), null)
    })
    it('should return "Required" if value is falsy', () => {
      assert.strictEqual(validator.required(''), 'Required')
      assert.strictEqual(validator.required(null), 'Required')
    })
  })
})