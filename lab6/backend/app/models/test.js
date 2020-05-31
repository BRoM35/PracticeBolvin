module.exports = (mongoose) => {
  const Schema = mongoose.Schema;
  const testSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    questions: {
      type: Array,
      required: false
    }
  });

  return mongoose.model('Test', testSchema);
};
