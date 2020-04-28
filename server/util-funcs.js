class Filter {
  applyFilter(str, filter) {
    process.env.NODE_ENV === 'development' && this.logInputs(str);
    if (typeof str === typeof '') {
      return str.replace(filter[0], filter[1]);
    } else {
      return str;
    }
  }
  singleQuotes(str) {
    return this.applyFilter(str, [/(['])/g, `''`]);
  }
  spaces(str) {
    return this.applyFilter(str, [/\s/g, '']);
  }

  fileName(str) {
    const newStr = this.applyFilter(str, [/([',./])/g, '']);

    return newStr.replace(/\s/g, '');
  }

  logInputs(str) {
    console.log(str);
  }
}

const filter = new Filter();

module.exports = filter;
