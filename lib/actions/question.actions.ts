'use server';
import { revalidatePath } from 'next/cache';
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import { CreateQuestionParams, GetQuestionsParams } from './shared.types.d';
import User from '@/database/user.model';



export async function getQuestions(params : GetQuestionsParams) {

    try {
        await connectToDatabase();

        const questions = await Question.find({})
           .populate({ path : 'tags', model : Tag })
           .populate({ path : 'author', model : User })
           .sort({ createdAt : -1 })

           return { questions };
    } catch (error) {
        console.log('Error from getQuestion (fn)',error)
    }

};














export async function createQuestion(params : CreateQuestionParams) {
    try {
        await connectToDatabase();

        const { title, explanation, tags, author, path } = params;
        console.log("received Params:", params);

        const question = await Question.create({
            title,
            content : explanation,
            author,
            // path,
        });

        const tagDocuments = [];

        for(const tag of tags) {
            const existingTag = await Tag.findOneAndUpdate(
                { name : { $regex : new RegExp(`^${tag}$`, "i")}},
                { $setOnInsert : { name : tag }, $push : { question : question._id}},
                { upsert : true, new : true },
            )
            tagDocuments.push(existingTag._id);
        }

        await Question.findByIdAndUpdate(question._id, {
            $push : { tags : { $each : tagDocuments }}
        })

        revalidatePath(path);

    } catch (error) {
        console.log('error creating question',error)
    }
};