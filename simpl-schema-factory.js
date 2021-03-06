import { Tracker } from 'meteor/tracker'
import { check } from 'meteor/check'

const SimpleSchema = require('simpl-schema').default

export const SimpleSchemaFactory = {

  isSimpleSchema (schema) {
    return schema && schema instanceof SimpleSchema
  },

  docId () {
    return this._useTracker
      ? new SimpleSchema({ _id: { type: String } }, { tracker: Tracker })
      : new SimpleSchema({ _id: { type: String } })
  },

  clear () {
    this._defaultPublicFields = null
    this._defaultSchema = {}
    this._useTracker = false
  },

  custom (schema) {
    return new SimpleSchema(schema)
  },

  _defaultSchema: {},

  defaultSchema (schemaObj = null) {
    if (schemaObj && typeof schemaObj === 'object')
      this._defaultSchema = schemaObj
    return this._useTracker
      ? new SimpleSchema(this._defaultSchema, { tracker: Tracker })
      : new SimpleSchema(this._defaultSchema)
  },

  defaultSchemaWith (customSchema) {
    const customSchemaDef = this._useTracker
      ? new SimpleSchema(customSchema, { tracker: Tracker })
      : new SimpleSchema(customSchema)
    customSchemaDef.extend(this.defaultSchema())
    return customSchemaDef
  },

  _defaultPublicFields: {},

  defaultPublicFields (argsObj = null) {
    if (argsObj) {
      this._defaultPublicFields = argsObj
    }
    return this._defaultPublicFields
  },

  defaultPublicFieldsWith (customFields) {
    return Object.assign({}, this.defaultPublicFields(), customFields)
  },

  updateSingleValue (propertyName, propertyType, optional = false) {
    const updateScheme = {}
    const updateSchemeValues = {
      type: propertyType,
      optional: optional
    }
    updateScheme[ propertyName ] = updateSchemeValues
    return new SimpleSchema(updateScheme)
  },

  validateDoc (doc, schema, clean = false) {
    const vc = schema.newContext()
    vc.validate(doc)
    return vc.isValid()
  },

  validate (args) {
    check(args, {
      userId: String,
      collection: Mongo.Collection,
      doc: Object
    })

    //validate doc by Schema
    //return false if failed
    const vc = args.collection.schema.newContext()
    vc.validate(args.doc)
    return vc.isValid()
  },

  useWithAutoForm () {
    SimpleSchema.extendOptions([ 'autoform' ])
  },

  useWith (options) {
    if (typeof options === 'string')
      options = [ options ]
    SimpleSchema.extendOptions(options)
  },

  _useTracker: false,

  useWithTracker (value) {
    this._useTracker = value
  },

  setDefaultMessages (messagesObj) {
    SimpleSchema.setDefaultMessages(messagesObj)
  }

}
