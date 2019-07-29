window.logger = process.env.NODE_ENV === 'development' ? console.log.bind(console) : () => {};
