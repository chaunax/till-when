module.exports = {

  /**
   * Parses a timerange string into formatted begin and end components
   * @param  {string} timerange - e.g., '9-2PM'
   * @return {object} contains parsed begin and end attributes - e.g., '9:00 AM'
   */

  parse: function(timerange){
    var output = {};
    var begin;
    var end;

    //parse range
    if(timerange.indexOf('to') >= 0){
      timerange = timerange.replace('to', '-');
    }
    if(timerange.indexOf('-') >= 0){
      var times = timerange.split('-');
      begin = times[0].trim();
      end = times[1].trim();
    } else {
      begin = timerange.trim();
    }

    begin = begin || '';
    end = end || '';

    //cleanup inputs
    var beginAntepost = this.parseAntepost(begin);
    var endAntepost = this.parseAntepost(end);
    var beginTime = this.parseTime(begin);
    var endTime = this.parseTime(end);

    if(beginTime && beginAntepost == ''){
      if(endAntepost == '' && endTime != ''){
        endAntepost = 'AM';
        end += endAntepost;
      }
      if(this.parseHour(beginTime) > this.parseHour(endTime)) {
        if(endAntepost == 'AM'){
          beginAntepost = 'PM';
        } else {
          beginAntepost = 'AM';
        }
      } else {
        beginAntepost = endAntepost;
      }
    }

    output.begin = (beginTime + ' ' + beginAntepost).trim();
    output.end = (endTime + ' ' + endAntepost).trim();

    return output;
  },

  /**
   * Parses out the AM/PM portion of a time string
   * @param  {string} timestring - e.g., '2PM'
   * @return {string} AM | PM
   */
  parseAntepost: function(timestring){
    timestring = timestring.trim();
    if(/[0-9 ]PM$/i.test(timestring) || /[0-9 ]P$/i.test(timestring)){
      return 'PM';
    } else if(/[0-9 ]AM$/i.test(timestring) || /[0-9 ]A$/i.test(timestring)){
      return 'AM';
    }{
      return '';
    }
  },

  /**
   * Parses out the time portion of a time string
   * @param  {string} timestring - e.g., '2PM'
   * @return {string} - e.g., '2:00'
   */
  parseTime: function(timestring){
    var timeRE= /[0-9:]+/;
    var timeResult = timeRE.exec(timestring);
    var time = '';
    if(timeResult && timeResult.length > 0){
      time = timeRE.exec(timestring)[0] || '';
      if(time.indexOf(':') == -1){
        time = time.replace(time, time + ':00');
      }
    }
    return time;
  },

  /**
   * Parses out the hour portion of a time string
   * @param  {string} timestring - e.g., '2PM'
   * @return {string} - e.g., '2'
   */
  parseHour: function(timestring){
    var hourRE= /(^[0-1]?[1-9:]+):/;
    var answer = hourRE.exec(timestring);
    return (answer && answer.length > 1) ? answer[1] : '';
  }


};
