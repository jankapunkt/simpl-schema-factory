# THIS REPOSITORY IS ARCHIVED

[![Build Status](https://travis-ci.org/jankapunkt/simpl-schema-factory.svg?branch=master)](https://travis-ci.org/jankapunkt/simpl-schema-factory)

# simpl-schema-factory

Factory for SimpleSchema instances and publicFields.
Standardizes your schema creation and keeps your code clean and encapsulated.
You can also set a default schema, which gets attached to all your created schemas.

 ### Installation
 
 ```
 meteor add jkuester:simpl-schema-factory
 meteor npm install --save simpl-schema
 ```
 Note: Throws an error, if you do not have the simpl-schema npm installed. No hard dependency on the deprecated aldeed:simple-schema package. 
 
 ### Basic Example

```javascript

const defaultSchemaObj = {
	title: String,
	description: { 
		type:String, 
		optional:true 
	},
	createdAt: Number,
	createdBy:String,
};

// set a default schema for all
// newly created schemas
SimpleSchemaFactory.defaultSchema(defaultSchemaObj);

// creates a new instance of
// the default schema
const defaultSchemaInstance = SimpleSchemaFactory.defaultSchema(); 


const newSchemaObj = {
	count: Number,
	owner: String,
};

// creates a combined schema
// of newSchmaObj and defaultSchemaObj
const newSchemaInstance = SimpleSchemaFactory.defaultSchemaWith(newSchemaObj);

```
	
