import mongoose, { Schema } from 'mongoose';

const subCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    seoTitle: {
        type: String
    },
    seoDescription: {
        type: String
    },
    seoKeywords: {
        type: String
    },
    metaRobots: {
        type: String,
        default: 'index, follow'
    },
    canonicalUrl: {
        type: String
    }
});

subCategorySchema.index({ category: 1 });

const SubCategory = mongoose.models.SubCategory || mongoose.model('SubCategory', subCategorySchema);
export default SubCategory;