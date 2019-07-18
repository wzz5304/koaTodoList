import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = Schema(
    {
        carCode: { type: String },
        carTypeName: { type: String },
        driverName: { type: String },
        remark: { type: String },
        createTime: { type: Number },
        operatorName: { type: String }
    },
    {
        collection: 'carTable'
    }
)

export default mongoose.model('carTable', UserSchema);