import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = Schema(
    {
        userName: { type: String}, // 页码
        passWord: { type: String} // 页数
    },
    {
        collection: 'user'
    }
)

export default mongoose.model('user', UserSchema);