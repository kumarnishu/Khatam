import mongoose from "mongoose"
import { IKeywordTracker } from "../../types/bot.types"
const KeywordTrackerSchema = new mongoose.Schema<IKeywordTracker, mongoose.Model<IKeywordTracker, {}, {}>, {}>({
    phone_number: {
        type: String,
        required: true,
        index: true
    },
    bot_number: {
        type: String,
        required: true,
    },
    is_active: {
        type: Boolean,
        default: true
    },
    skip_main_menu: {
        type: Boolean,
        default: false
    },
    flow: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flow',
        required: true
    }
})

export const KeywordTracker = mongoose.model<IKeywordTracker, mongoose.Model<IKeywordTracker, {}, {}>>("KeywordTracker", KeywordTrackerSchema)