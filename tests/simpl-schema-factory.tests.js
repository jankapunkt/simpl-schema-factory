/* eslint-env mocha */
import { assert } from 'meteor/practicalmeteor:chai'
import { Random } from 'meteor/random'

import { SimpleSchemaFactory } from 'meteor/jkuester:simpl-schema-factory'

const isDefined = function (value, type = null, optionalMessage = null) {
  assert.isDefined(value)
  assert.isNotNull(value)
  if (type) assert.typeOf(value, type, optionalMessage)
}

const validateBySchema = function (schema, validObj, invalidObj) {
  isDefined(schema, 'object', 'schema obj')
  isDefined(validObj, 'object', 'validObj')
  isDefined(invalidObj, 'object', 'invalidObj')

  const vc = schema.newContext()
  vc.clean(validObj)
  vc.validate(validObj)
  const isValid = vc.isValid()
  assert.equal(isValid, true, 'should be valid')

  vc.validate(invalidObj)
  const isNotValid = vc.isValid()
  assert.equal(isNotValid, false, 'should be invalid')
}

const getDefaultSchema = function () {
  return {
    title: String,
    code: String,
    description: { type: String, optional: true },
    createdBy: String,
    createdAt: Number
  }
}

const getDefaultPropsWith = function (customProps = {}) {
  return Object.assign({}, {
    title: 'title title',
    code: Random.id(5),
    description: 'aljkd dqwpd ndadpajd nadapdjn asdas dpajüi pk jiüoj ns',
    createdBy: Random.id(),
    createdAt: new Date().getTime()
  }, customProps)
}

describe('Import', function () {
  it('is imported correctly', function () {
    isDefined(SimpleSchemaFactory)
  })
})

describe('SimpleSchemaFactory', function () {

  beforeEach(function () {
    SimpleSchemaFactory.defaultSchema(getDefaultSchema())
    SimpleSchemaFactory.defaultPublicFields({
      title: 1,
      code: 1,
      description: 1,
    })
  })

  afterEach(function () {
    SimpleSchemaFactory.clear()
  })

  it('creates defaultSchema', function () {
    const defaultSchema = SimpleSchemaFactory.defaultSchema()
    validateBySchema(defaultSchema, getDefaultPropsWith(), {})
  })

  it('tests isSimpleSchema', function () {
    const docIdSchema = SimpleSchemaFactory.docId()
    assert.isTrue(SimpleSchemaFactory.isSimpleSchema(docIdSchema))
    assert.isFalse(SimpleSchemaFactory.isSimpleSchema({ title: String }))
  })

  it('creates docId', function () {
    const docIdSchema = SimpleSchemaFactory.docId()
    validateBySchema(docIdSchema, {
      _id: Random.id(17)
    }, {})
  })

  it('creates defaultSchemaWith', function () {
    const customSchema = SimpleSchemaFactory.defaultSchemaWith({ custom: { type: String } }, true)
    validateBySchema(customSchema,
      getDefaultPropsWith({ custom: Random.id(17) }),
      getDefaultPropsWith({ _id: Random.id(17) }))
  })

  it('creates custom', function () {
    const customSchema = SimpleSchemaFactory.custom({
      some: { type: String },
      other: { type: Number }
    })
    validateBySchema(customSchema, {
      some: 'test',
      other: 10000,
    }, {
      some: 'test',
      other: '10000',
    })
  })

  it('creates updateSingleValue', function () {
    const updateSingleValue = SimpleSchemaFactory.updateSingleValue('type', String, false)
    validateBySchema(updateSingleValue, {
      type: 'some type'
    }, {})
  })

  it('creates defaultPublicFields', function () {
    const defaultPublicFields = SimpleSchemaFactory.defaultPublicFields()
    assert.deepEqual(defaultPublicFields, {
      title: 1,
      code: 1,
      description: 1,
    })
  })

  it('creates defaultPublicFieldsWith', function () {
    const defaultPublicFields = SimpleSchemaFactory.defaultPublicFieldsWith({
      custom: 1
    })
    assert.deepEqual(defaultPublicFields, {
      title: 1,
      code: 1,
      description: 1,
      custom: 1,
    })
  })
})
