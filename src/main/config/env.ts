export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/clean-node-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || '4s5d5q6uad-23123=d56nu7cq-vbv%$bq'
}
