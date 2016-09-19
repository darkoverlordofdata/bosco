/**
 * Properties.ts
 *
 * Persist properties using LocalStorage
 *
 */
module bosco {
  "use strict"


  /**
   * Properties
   * 
   * persisted game settings and scores
   */
  export class Properties {


    private static db = null
    private static dbname = ""
    private static properties = null

    /**
     * Initilize the properties
     * 
     * @param name of property database
     * @param properties table of properties
     */
    public static init(name, properties) {

      if (Properties.db !== null) return

      /** 
       * Initialize the db with the properties 
       * 
       * @param db database
       */
      function initializeDb (db) {

        if (db.isNew()) {
          db.createTable("settings", ["name", "value"])
          db.createTable("leaderboard", ["date", "score"])
          for (var key in properties) {
            if (properties.hasOwnProperty(key)) {
              db.insert("settings", {
                name: key,
                value: properties[key]
              })
            }
          }
          db.commit()
        }
      }

      Properties.dbname = name
      Properties.properties = properties

      // if (window['chrome']) {
      //   chromeStorageDB(Properties.dbname, localStorage, (db) => initializeDb(Properties.db = db))
      // } else {
        initializeDb(Properties.db = new localStorageDB(Properties.dbname))
      // }

    }

    /*
     * Get Game Property from local storage
     *
     * @param property name
     * @return property value
     */
    public static get(prop) {
      return Properties.db.queryAll("settings", {
        query: {
          name: prop
        }
      })[0].value
    }

    /*
     * Set Game Property in local storage
     *
     * @param property name
     * @param property value
     * @return nothing
     */
    public static set = (prop, value) => {
      Properties.db.update("settings", {
        name: prop
      }, (row) => {
        row.value = "" + value
        return row
      })
      Properties.db.commit()
    }

    /**
     * Set the Score
     * 
     * @param score
     */
    public static setScore(score) {
      var today = new Date()
      var mm = (today.getMonth()+1).toString()
      if (mm.length === 1) mm = '0'+mm
      var dd = today.getDate().toString()
      if (dd.length === 1) dd = '0'+dd
      var yyyy = today.getFullYear().toString()
      var yyyymmdd = yyyy+mm+dd

      if (0 === Properties.db.queryAll('leaderboard', {query: {date: yyyymmdd}}).length) {
        Properties.db.insert('leaderboard', {date: yyyymmdd, score: score})
      } else {
        Properties.db.update('leaderboard', {date: yyyymmdd}, (row) => {
          if (score > row.score) {
            row.score = score
          }
          return row
        })
      }
      Properties.db.commit()

    }

    /*
     * Set Game Leaderboard in local storage
     *
     * @param count
     * @return array of scores
     */
    public static getLeaderboard(count) {
      return Properties.db.queryAll('leaderboard', {limit: count, sort: [['score', 'DESC']] })
    }
  }
}