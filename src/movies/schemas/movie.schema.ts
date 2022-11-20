import * as mongoose from 'mongoose';

export const MovieSchema = new mongoose.Schema({
    titulo: String,
    banner: String,
    descricao: String,
    diretor: String,
    produtor: String,
});