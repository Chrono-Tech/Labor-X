import assert from 'assert'
import validator from './validator'

describe('src/utils/validator', () => {
  describe('#required', () => {
    it('should return "Required" when value is falsy', () => {
      assert.equal(validator.required(false), 'Required')
    })
  })
})