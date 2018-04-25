var fs = require('fs')
  , Log = require('log')
  , log = new Log('debug', fs.createWriteStream('./log/sb.log'))

const init = function (tableName, execution) {
  var data = {
    tableName: null,
    primaryKey: null,
    queryData: []
  }

  function run (tableName, execution) {
    if (tableName && execution) {
      this.data.tableName = tableName
      if (execution && typeof execution === 'function') {
        execution(this)
      }

      this.toSql()

      console.log('data : ', this.data)
      log.info('data : ' + JSON.stringify(this.data))  
    } else {
      console.log('Sorry something wrong when run')
      log.error('Sorry something wrong when run')      
    }
  }

  function toSql () {
    var arrQuery = []
    this.data.queryData.map((el) => {
      arrQuery.push(el.query)
    })
    var setQuery = 'CREATE TABLE ' + this.data.tableName + ' (' + arrQuery.join(',') + ')'
    console.log(setQuery)
    log.info('Query Result : ' + setQuery)      
  }

  function increments (field, length) {
    var type = field
    var length = length || 100
    var query = '`' + field + '` INT('+ length +') NOT NULL AUTO_INCREMENT, PRIMARY KEY (`' + field + '`)'
    var data = this.mappingQuery(field, query, type)

    this.data.primaryKey = this.data.primaryKey ? this.data.primaryKey : type
    this.validateDuplicateData(type, data)
  }

  function bigIncrements (field, length) {
    var type = field
    var length = length || 100
    var query = '`' + field + '` BIGINT(' + length + ') NOT NULL AUTO_INCREMENT, PRIMARY KEY (`' + field + '`)'
    var data = this.mappingQuery(field, query, type)

    this.data.primaryKey = this.data.primaryKey ? this.data.primaryKey : type
    this.validateDuplicateData(type, data)
  }

  function binary (field, length, notNull) {
    var type = field
    var length = length || 100
    var query = '`' + field + '` BINARY',
        query = notNull === true ? this.notNull(notNull, query) : query
    var data = this.mappingQuery(field, query, type)

    this.pushToQueryData(data)
  }

  function boolean (field, notNull) {
    var type = field
    var query = '`' + field + '` BOOLEAN',
        query = notNull === true ? this.notNull(notNull, query) : query
    var data = this.mappingQuery(field, query, type)

    this.pushToQueryData(data)
  }

  function char (field, length, notNull) {
    var type = field
    var length = length || 100
    var query = '`' + field + '` CHAR(' + length + ')',
        query = notNull === true ? this.notNull(notNull, query) : query
    var data = this.mappingQuery(field, query, type)

    this.pushToQueryData(data)
  }

  function date (field, notNull) {
    var type = field
    var query = '`' + field + '` DATE',
        query = notNull === true ? this.notNull(notNull, query) : query
    var data = this.mappingQuery(field, query, type)

    this.pushToQueryData(data)
  }

  function dateTime (field, notNull) {
    var type = field
    var query = '`' + field + '` DATETIME',
        query = notNull === true ? this.notNull(notNull, query) : query
    var data = this.mappingQuery(field, query, type)

    this.pushToQueryData(data)
  }

  function decimal (field, notNull) {
    var type = field
    var query = '`' + field + '` DECIMAL',
      query = notNull === true ? this.notNull(notNull, query) : query
    var data = this.mappingQuery(field, query, type)

    this.pushToQueryData(data)
  }

  function double (field, notNull) {
    var type = field
    var query = '`' + field + '` DOUBLE',
      query = notNull === true ? this.notNull(notNull, query) : query
    var data = this.mappingQuery(field, query, type)

    this.pushToQueryData(data)
  }

  function enumData (field, dataEnum, notNull) {
    if (dataEnum.length > 0) {
      var resultDataEnum = dataEnum.map((el) => {
        return String(el)
      })
      dataEnum = JSON.stringify(resultDataEnum).replace(/[\][]/g, '')
      var type = field
      var query = '`' + field + '` ENUM(' + dataEnum + ')',
        query = notNull === true ? this.notNull(notNull, query) : query
      var data = this.mappingQuery(field, query, type)

      this.pushToQueryData(data)
    }
  }

  function float (field, notNull) {
    var type = field
    var query = '`' + field + '` FLOAT',
      query = notNull === true ? this.notNull(notNull, query) : query
    var data = this.mappingQuery(field, query, type)

    this.pushToQueryData(data)
  }

  function integer (field, length, notNull) {
    var type = field
    var length = length || 100
    var query = '`' + field + '` INT(' + length + ')',
      query = notNull === true ? this.notNull(notNull, query) : query
    var data = this.mappingQuery(field, query, type)

    this.pushToQueryData(data)
  }

  function json (field, notNull) {
    var type = field
    var query = '`' + field + '` TEXT',
      query = notNull === true ? this.notNull(notNull, query) : query
    var data = this.mappingQuery(field, query, type)

    this.pushToQueryData(data)
  }

  function jsonb (field, notNull) {
    var type = field
    var query = '`' + field + '` TEXT',
      query = notNull === true ? this.notNull(notNull, query) : query
    var data = this.mappingQuery(field, query, type)

    this.pushToQueryData(data)
  }

  function longText (field, notNull) {
    var type = field
    var query = '`' + field + '` LONGTEXT',
      query = notNull === true ? this.notNull(notNull, query) : query
    var data = this.mappingQuery(field, query, type)

    this.pushToQueryData(data)
  }

  function mediumInteger (field, length, notNull) {
    var type = field
    var length = length || 100
    var query = '`' + field + '` MEDIUMINT(' + length + ')',
      query = notNull === true ? this.notNull(notNull, query) : query
    var data = this.mappingQuery(field, query, type)

    this.pushToQueryData(data)
  }

  function mediumBlob (field, notNull) {
    var type = field
    var query = '`' + field + '` MEDIUMBLOB',
      query = notNull === true ? this.notNull(notNull, query) : query
    var data = this.mappingQuery(field, query, type)

    this.pushToQueryData(data)
  }

  function mediumText (field, notNull) {
    var type = field
    var query = '`' + field + '` MEDIUMTEXT',
      query = notNull === true ? this.notNull(notNull, query) : query
    var data = this.mappingQuery(field, query, type)

    this.pushToQueryData(data)
  }

  function smallInteger (field, length, notNull) {
    var type = field
    var length = length || 100
    var query = '`' + field + '` SMALLINT(' + length + ')',
      query = notNull === true ? this.notNull(notNull, query) : query
    var data = this.mappingQuery(field, query, type)

    this.pushToQueryData(data)
  }

  function tinyInteger (field, length, notNull) {
    var type = field
    var length = length || 100
    var query = '`' + field + '` TINYINT(' + length + ')',
      query = notNull === true ? this.notNull(notNull, query) : query
    var data = this.mappingQuery(field, query, type)

    this.pushToQueryData(data)
  }

  function string (field, length, notNull) {
    var type = field
    var length = length || 100
    var query = '`' + field + '` VARCHAR(' + length + ')',
      query = notNull === true ? this.notNull(notNull, query) : query
    var data = this.mappingQuery(field, query, type)

    this.pushToQueryData(data)
  }

  function text (field, notNull) {
    var type = field
    var query = '`' + field + '` TEXT',
      query = notNull === true ? this.notNull(notNull, query) : query
    var data = this.mappingQuery(field, query, type)

    this.pushToQueryData(data)
  }

  function time (field, notNull) {
    var type = field
    var query = '`' + field + '` TIME',
      query = notNull === true ? this.notNull(notNull, query) : query
    var data = this.mappingQuery(field, query, type)

    this.pushToQueryData(data)
  }

  function timestamp (field, notNull) {
    var type = field
    var query = '`' + field + '` TIMESTAMP',
      query = notNull === true ? this.notNull(notNull, query) : query
    var data = this.mappingQuery(field, query, type)

    this.pushToQueryData(data)
  }

  function validateDuplicateData (type, data) {
    if (this.data.queryData.length > 0) {
      this.data.queryData.filter((el) => {
        if (el.type !== type && el.primaryKey === null) {
          this.pushToQueryData(data)
        } else {
          var messages = 'duplicate increments on data : ' + JSON.stringify(el)
          console.log(messages)
          log.error(messages)
        }
      })
    } else {
      this.pushToQueryData(data)
    }
  }

  function notNull (val, queryMaster) {
    if (val === true) {
      queryMaster = queryMaster + ' NOT NULL'
    }

    return queryMaster
  }

  function pushToQueryData (data) {
    this.data.queryData.push(data)
  }

  function mappingQuery (field, query, type) {
    var data = {
      type: type,
      fieldName: field,
      query: query
    }

    return data
  }

  return {
    data,
    run,
    toSql,
    mappingQuery,
    notNull,
    pushToQueryData,
    validateDuplicateData,
    increments,
    bigIncrements,
    binary,
    boolean,
    char,
    date,
    dateTime,
    decimal,
    double,
    enumData,
    float, 
    integer, 
    json, 
    jsonb, 
    longText, 
    mediumInteger, 
    mediumBlob, 
    mediumText, 
    smallInteger, 
    tinyInteger, 
    string, 
    text, 
    time, 
    timestamp
  }
}

module.exports = init