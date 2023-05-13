import  {model, models, Schema} from "mongoose";


const PromptSchema = new Schema({
    creator : {
        type: Schema.Types.ObjectId,
        ref : 'User',
    },
    prompt:{
        type: String,
        required: [true, 'Prompt is required'],
    },
    tag: {
        type: [String],
        required: [true, 'Tags is required'],
    }
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);
export default Prompt;